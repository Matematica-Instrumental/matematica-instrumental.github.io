import assert from 'node:assert/strict';
import test from 'node:test';
import {
  findCronogramaSumWarnings,
  isChronologicalInterval,
  isHttpUrl,
  isSafeInternalPath,
  isValidTurmaSlug,
  validateContentIntegrity,
  type PeriodoLetivoIntegrityRecord,
  type RegimeType,
  type TurmaIntegrityRecord,
} from '../src/utils/contentIntegrity.ts';

function buildAcademicPeriods(
  regimeLetivoId: string,
  type: RegimeType,
): PeriodoLetivoIntegrityRecord[] {
  const ranges = {
    bimestral: [
      ['2026-01-01', '2026-02-28'],
      ['2026-03-01', '2026-04-30'],
      ['2026-05-01', '2026-06-30'],
      ['2026-07-01', '2026-08-31'],
    ],
    trimestral: [
      ['2026-01-01', '2026-04-30'],
      ['2026-05-01', '2026-08-31'],
      ['2026-09-01', '2026-12-31'],
    ],
    semestral: [
      ['2026-01-01', '2026-06-30'],
      ['2026-07-01', '2026-12-31'],
    ],
  }[type];

  return ranges.map(([dataInicial, dataFinal], index) => ({
    id: `${regimeLetivoId}-periodo-${index + 1}`,
    regimeLetivoId,
    dataInicial,
    dataFinal,
    ordem: index + 1,
  }));
}

function validateRegime(type: RegimeType) {
  const regimeId = `regime-${type}`;

  return validateContentIntegrity({
    regimesLetivos: [{ id: regimeId, anoLetivo: 2026, tipo: type }],
    periodosLetivos: buildAcademicPeriods(regimeId, type),
  });
}

function turma(
  id: string,
  slug: string,
  overrides: Partial<TurmaIntegrityRecord> = {},
): TurmaIntegrityRecord {
  return {
    id,
    slug,
    segmento: 'Ensino Médio',
    anoSerie: '1º ano',
    anoLetivo: 2026,
    ...overrides,
  };
}

test('A. aceita URL HTTPS válida', () => {
  assert.equal(isHttpUrl('https://example.com/recurso'), true);
});

test('B. aceita URL HTTP válida quando permitida', () => {
  assert.equal(isHttpUrl('http://example.com/recurso'), true);
});

test('C. rejeita javascript:', () => {
  assert.equal(isHttpUrl('javascript:alert(1)'), false);
});

test('D. rejeita data:', () => {
  assert.equal(isHttpUrl('data:text/plain,conteudo'), false);
});

test('E. rejeita ftp:', () => {
  assert.equal(isHttpUrl('ftp://example.com/arquivo.pdf'), false);
  assert.equal(isHttpUrl('file:///arquivo.pdf'), false);
  assert.equal(isHttpUrl('mailto:professor@example.com'), false);
});

test('F. aceita caminho interno seguro', () => {
  assert.equal(isSafeInternalPath('/materiais/arquivo.pdf'), true);
});

test('G. rejeita path traversal ../', () => {
  assert.equal(isSafeInternalPath('/materiais/../segredo.txt'), false);
  assert.equal(isSafeInternalPath('/materiais/..\\segredo.txt'), false);
  assert.equal(isSafeInternalPath('/materiais/%2e%2e/segredo.txt'), false);
});

test('H. aceita intervalo com início anterior ou igual ao fim', () => {
  assert.equal(isChronologicalInterval('2026-01-01', '2026-01-02'), true);
  assert.equal(isChronologicalInterval('2026-01-01', '2026-01-01'), true);
});

test('I. rejeita data inicial posterior à final', () => {
  assert.equal(isChronologicalInterval('2026-01-02', '2026-01-01'), false);
});

test('J. rejeita destaque com intervalo invertido', () => {
  assert.equal(isChronologicalInterval('2026-03-02', '2026-03-01'), false);
});

test('K. aceita regime bimestral com 4 períodos', () => {
  assert.deepEqual(validateRegime('bimestral'), []);
});

test('L. aceita regime trimestral com 3 períodos', () => {
  assert.deepEqual(validateRegime('trimestral'), []);
});

test('M. aceita regime semestral com 2 períodos', () => {
  assert.deepEqual(validateRegime('semestral'), []);
});

test('N. detecta quantidade incompatível de períodos', () => {
  const regimeId = 'regime-bimestral';
  const issues = validateContentIntegrity({
    regimesLetivos: [{ id: regimeId, anoLetivo: 2026, tipo: 'bimestral' }],
    periodosLetivos: buildAcademicPeriods(regimeId, 'bimestral').slice(0, 3),
  });

  assert.equal(
    issues.some(({ code }) => code === 'academic-period-count-mismatch'),
    true,
  );
});

test('O. detecta períodos sobrepostos', () => {
  const regimeId = 'regime-semestral';
  const periods = buildAcademicPeriods(regimeId, 'semestral');

  periods[1] = { ...periods[1], dataInicial: periods[0].dataFinal };

  const issues = validateContentIntegrity({
    regimesLetivos: [{ id: regimeId, anoLetivo: 2026, tipo: 'semestral' }],
    periodosLetivos: periods,
  });

  assert.equal(
    issues.some(({ code }) => code === 'overlapping-academic-periods'),
    true,
  );
});

test('P. aceita slug de Turma válido', () => {
  assert.equal(isValidTurmaSlug('turma-a-2026'), true);
});

test('Q. rejeita slug com espaço, maiúscula ou acento', () => {
  for (const slug of ['turma a-2026', 'Turma-a-2026', 'túrma-a-2026']) {
    assert.equal(isValidTurmaSlug(slug), false, slug);
  }
});

test('R. detecta slug de Turma duplicado', () => {
  const issues = validateContentIntegrity({
    turmas: [
      turma('turma-1', 'turma-a-2026'),
      turma('turma-2', 'turma-a-2026'),
    ],
  });

  assert.equal(
    issues.some(({ code }) => code === 'duplicate-turma-slug'),
    true,
  );
});

test('S. detecta rota canônica duplicada', () => {
  const issues = validateContentIntegrity({
    turmas: [
      turma('turma-1', 'turma-a-2026'),
      turma('turma-2', 'turma-a-2026'),
    ],
  });

  assert.equal(
    issues.some(({ code }) => code === 'duplicate-turma-route'),
    true,
  );
});

test('T. detecta referência inexistente', () => {
  const issues = validateContentIntegrity({
    knownIds: {
      videos: ['video-1'],
      turmas: [],
    },
    references: [{
      sourceCollection: 'videos',
      sourceId: 'video-1',
      field: 'turmas[0]',
      targetCollection: 'turmas',
      targetId: 'turma-inexistente',
    }],
  });

  assert.equal(
    issues.some(({ code }) => code === 'missing-content-reference'),
    true,
  );
});

test('U. avisa quando a soma do cronograma passa do total da etapa', () => {
  const warnings = findCronogramaSumWarnings(
    [{ id: 'p1', nome: '1º Bimestre', valorTotalEtapa: 25 }],
    [
      { periodoLetivoId: 'p1', turmaIds: ['turma-a-2026'], valorIndividual: 15 },
      { periodoLetivoId: 'p1', turmaIds: ['turma-a-2026'], valorIndividual: 12.5 },
      { periodoLetivoId: 'p1', turmaIds: ['turma-a-2026'] },
    ],
  );

  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].soma, 27.5);
  assert.match(warnings[0].message, /1º Bimestre/);
});

test('V. não avisa quando a soma é igual ao total ou por turma separada', () => {
  const warnings = findCronogramaSumWarnings(
    [{ id: 'p1', nome: '1º Bimestre', valorTotalEtapa: 25 }],
    [
      { periodoLetivoId: 'p1', turmaIds: ['turma-a-2026'], valorIndividual: 0.1 },
      { periodoLetivoId: 'p1', turmaIds: ['turma-a-2026'], valorIndividual: 24.9 },
      { periodoLetivoId: 'p1', turmaIds: ['turma-b-2026'], valorIndividual: 20 },
    ],
  );

  assert.deepEqual(warnings, []);
});

test('W. detecta identificador de lista diferente do nome do arquivo', () => {
  const issues = validateContentIntegrity({
    listEntries: [
      { collection: 'tiposMaterial', entryId: 'apostila', declaredId: 'apostila' },
      { collection: 'tiposMaterial', entryId: 'resumo', declaredId: 'resumos' },
    ],
  });

  assert.deepEqual(
    issues.map(({ code, path }) => [code, path]),
    [['list-entry-id-mismatch', 'tiposMaterial.resumo.id']],
  );
});

test('X. aceita curso sem segmento e detecta rota de curso duplicada', () => {
  const curso = {
    id: 'curso-1',
    tipo: 'Curso' as const,
    slug: 'preparatorio-cefet-2027',
    anoLetivo: 2027,
  };

  assert.deepEqual(validateContentIntegrity({ turmas: [curso] }), []);

  const issues = validateContentIntegrity({
    turmas: [curso, { ...curso, id: 'curso-2' }],
  });

  assert.equal(
    issues.some(({ code }) => code === 'duplicate-turma-route'),
    true,
  );
});
