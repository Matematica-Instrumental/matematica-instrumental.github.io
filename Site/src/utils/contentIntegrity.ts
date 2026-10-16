export const REGIME_PERIOD_COUNTS = {
  bimestral: 4,
  trimestral: 3,
  semestral: 2,
} as const;

export type RegimeType = keyof typeof REGIME_PERIOD_COUNTS;

export interface DestaqueNovidadesInterval {
  inicio: string;
  fim: string;
}

export interface TurmaIntegrityRecord {
  id: string;
  slug: string;
  segmento: string;
  anoSerie: string;
  anoLetivo: number;
}

export interface RegimeLetivoIntegrityRecord {
  id: string;
  anoLetivo: number;
  tipo: RegimeType;
}

export interface PeriodoLetivoIntegrityRecord {
  id: string;
  regimeLetivoId: string;
  dataInicial: string;
  dataFinal: string;
  ordem: number;
}

export interface ItemCronogramaIntegrityRecord {
  id: string;
  periodoLetivoId: string;
}

export interface ContentReferenceIntegrityRecord {
  sourceCollection: string;
  sourceId: string;
  field: string;
  targetCollection: string;
  targetId: string;
}

export interface ContentIntegrityInput {
  turmas?: readonly TurmaIntegrityRecord[];
  regimesLetivos?: readonly RegimeLetivoIntegrityRecord[];
  periodosLetivos?: readonly PeriodoLetivoIntegrityRecord[];
  itensCronograma?: readonly ItemCronogramaIntegrityRecord[];
  knownIds?: Readonly<Record<string, readonly string[]>>;
  references?: readonly ContentReferenceIntegrityRecord[];
}

export interface ContentIntegrityIssue {
  code: string;
  path: string;
  message: string;
}

const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/;
const TURMA_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasUnsafeDecodedPath(path: string): boolean {
  let decoded = path;

  for (let pass = 0; pass < 3; pass += 1) {
    try {
      const next = decodeURIComponent(decoded);

      if (next === decoded) {
        break;
      }

      decoded = next;
    } catch {
      return true;
    }
  }

  if (decoded.includes('\\') || CONTROL_CHARACTER_PATTERN.test(decoded)) {
    return true;
  }

  const pathname = decoded.split(/[?#]/, 1)[0];

  return pathname.split('/').some((segment) => segment === '..');
}

export function isHttpUrl(value: string): boolean {
  const candidate = value.trim();

  if (!candidate || CONTROL_CHARACTER_PATTERN.test(candidate)) {
    return false;
  }

  try {
    const url = new URL(candidate);

    return (url.protocol === 'http:' || url.protocol === 'https:')
      && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function isSafeInternalPath(value: string): boolean {
  const candidate = value.trim();

  return /^\/(?!\/)/.test(candidate)
    && !/\s/.test(candidate)
    && !hasUnsafeDecodedPath(candidate);
}

export function isSafeLinkedResourceTarget(value: string): boolean {
  return isHttpUrl(value) || isSafeInternalPath(value);
}

export function isSafeLocalAssetPath(value: string): boolean {
  const candidate = value.trim();

  if (
    !candidate
    || candidate === '/'
    || candidate === 'src/assets/editorial/'
    || /[?#]/.test(candidate)
    || /\s/.test(candidate)
  ) {
    return false;
  }

  return (
    isSafeInternalPath(candidate)
    || candidate.startsWith('src/assets/editorial/')
  ) && !hasUnsafeDecodedPath(candidate);
}

export function isChronologicalInterval(
  start: string,
  end: string,
): boolean {
  return start <= end;
}

export function isPublicationCompatibleWithHighlight(
  publication: string,
  highlight: DestaqueNovidadesInterval | undefined,
): boolean {
  return highlight === undefined || publication <= highlight.fim;
}

export function isValidTurmaSlug(slug: string): boolean {
  return TURMA_SLUG_PATTERN.test(slug);
}

export function normalizeContentRouteSegment(value: string): string {
  const normalized = value
    .replaceAll('º', 'o')
    .replaceAll('ª', 'a')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

  if (!normalized) {
    throw new Error(`Não foi possível gerar um segmento de URL para "${value}".`);
  }

  return normalized;
}

export function getTurmaIntegrityCanonicalPath(
  turma: Pick<TurmaIntegrityRecord, 'segmento' | 'anoSerie' | 'slug'>,
): string {
  return [
    '/turmas',
    normalizeContentRouteSegment(turma.segmento),
    normalizeContentRouteSegment(turma.anoSerie),
    turma.slug,
    '',
  ].join('/');
}

function getTurmaGroupIdentity(
  turma: Pick<TurmaIntegrityRecord, 'segmento' | 'anoSerie'>,
): string {
  return [
    normalizeContentRouteSegment(turma.segmento),
    normalizeContentRouteSegment(turma.anoSerie),
  ].join('/');
}

function addDuplicateIssues(
  issues: ContentIntegrityIssue[],
  code: string,
  label: string,
  values: ReadonlyArray<{ value: string; path: string }>,
): void {
  const firstPathByValue = new Map<string, string>();

  for (const { value, path } of values) {
    const firstPath = firstPathByValue.get(value);

    if (firstPath) {
      issues.push({
        code,
        path,
        message: `${label} duplicado: "${value}" (primeira ocorrência em ${firstPath}).`,
      });
    } else {
      firstPathByValue.set(value, path);
    }
  }
}

function validateTurmas(
  turmas: readonly TurmaIntegrityRecord[],
  issues: ContentIntegrityIssue[],
): void {
  addDuplicateIssues(
    issues,
    'duplicate-turma-slug',
    'Slug de Turma',
    turmas.map((turma) => ({
      value: turma.slug,
      path: `turmas.${turma.id}.slug`,
    })),
  );
  addDuplicateIssues(
    issues,
    'duplicate-turma-route',
    'Rota canônica de Turma',
    turmas.map((turma) => ({
      value: getTurmaIntegrityCanonicalPath(turma),
      path: `turmas.${turma.id}`,
    })),
  );

  const rawGroupByNormalizedGroup = new Map<string, string>();

  for (const turma of turmas) {
    const path = `turmas.${turma.id}`;

    if (!isValidTurmaSlug(turma.slug)) {
      issues.push({
        code: 'invalid-turma-slug',
        path: `${path}.slug`,
        message: `O slug "${turma.slug}" deve usar minúsculas ASCII e kebab-case, sem espaços, acentos ou barras.`,
      });
    }

    if (!turma.slug.split('-').includes(String(turma.anoLetivo))) {
      issues.push({
        code: 'turma-slug-missing-school-year',
        path: `${path}.slug`,
        message: `O slug "${turma.slug}" deve identificar o ano letivo ${turma.anoLetivo} para evitar colisões.`,
      });
    }

    const normalizedGroup = getTurmaGroupIdentity(turma);
    const rawGroup = `${turma.segmento}\u0000${turma.anoSerie}`;
    const firstRawGroup = rawGroupByNormalizedGroup.get(normalizedGroup);

    if (firstRawGroup && firstRawGroup !== rawGroup) {
      issues.push({
        code: 'conflicting-turma-group-anchor',
        path,
        message: `Segmento/Ano-Série colidem no agrupamento normalizado "${normalizedGroup}".`,
      });
    } else {
      rawGroupByNormalizedGroup.set(normalizedGroup, rawGroup);
    }
  }
}

function validateKnownIds(
  knownIds: Readonly<Record<string, readonly string[]>>,
  issues: ContentIntegrityIssue[],
): Map<string, Set<string>> {
  const idsByCollection = new Map<string, Set<string>>();

  for (const collection of Object.keys(knownIds).sort()) {
    const ids = knownIds[collection] ?? [];

    addDuplicateIssues(
      issues,
      'duplicate-content-id',
      `ID da coleção ${collection}`,
      ids.map((id, index) => ({
        value: id,
        path: `${collection}[${index}].id`,
      })),
    );
    idsByCollection.set(collection, new Set(ids));
  }

  return idsByCollection;
}

function validateReferences(
  references: readonly ContentReferenceIntegrityRecord[],
  idsByCollection: ReadonlyMap<string, ReadonlySet<string>>,
  issues: ContentIntegrityIssue[],
): void {
  for (const reference of references) {
    const targetIds = idsByCollection.get(reference.targetCollection);

    if (!targetIds?.has(reference.targetId)) {
      issues.push({
        code: 'missing-content-reference',
        path: `${reference.sourceCollection}.${reference.sourceId}.${reference.field}`,
        message: `Referência inexistente para ${reference.targetCollection}."${reference.targetId}".`,
      });
    }
  }
}

function validateAcademicPeriods(
  regimes: readonly RegimeLetivoIntegrityRecord[],
  periods: readonly PeriodoLetivoIntegrityRecord[],
  issues: ContentIntegrityIssue[],
): void {
  const regimeById = new Map(regimes.map((regime) => [regime.id, regime]));

  for (const period of periods) {
    const path = `periodosLetivos.${period.id}`;
    const regime = regimeById.get(period.regimeLetivoId);

    if (!regime) {
      issues.push({
        code: 'missing-academic-regime',
        path: `${path}.regimeLetivo`,
        message: `O período referencia o regime inexistente "${period.regimeLetivoId}".`,
      });
      continue;
    }

    if (!isChronologicalInterval(period.dataInicial, period.dataFinal)) {
      issues.push({
        code: 'invalid-academic-period-interval',
        path: `${path}.dataFinal`,
        message: 'A data final do período deve ser igual ou posterior à data inicial.',
      });
    }

    const expectedYear = String(regime.anoLetivo).padStart(4, '0');

    if (
      !period.dataInicial.startsWith(`${expectedYear}-`)
      || !period.dataFinal.startsWith(`${expectedYear}-`)
    ) {
      issues.push({
        code: 'academic-period-year-mismatch',
        path,
        message: `As datas do período devem pertencer ao ano letivo ${regime.anoLetivo}.`,
      });
    }
  }

  for (const regime of regimes) {
    const expectedCount = REGIME_PERIOD_COUNTS[regime.tipo];
    const regimePeriods = periods
      .filter((period) => period.regimeLetivoId === regime.id)
      .sort((a, b) => a.ordem - b.ordem || a.dataInicial.localeCompare(b.dataInicial));
    const path = `regimesLetivos.${regime.id}`;

    if (regimePeriods.length !== expectedCount) {
      issues.push({
        code: 'academic-period-count-mismatch',
        path,
        message: `O regime ${regime.tipo} exige ${expectedCount} períodos; foram encontrados ${regimePeriods.length}.`,
      });
    }

    const orders = regimePeriods.map((period) => period.ordem);
    const expectedOrders = Array.from(
      { length: regimePeriods.length },
      (_, index) => index + 1,
    );

    if (orders.some((order, index) => order !== expectedOrders[index])) {
      issues.push({
        code: 'invalid-academic-period-order',
        path,
        message: `As ordens dos períodos devem ser únicas e sequenciais a partir de 1; recebidas: ${orders.join(', ') || 'nenhuma'}.`,
      });
    }

    for (let index = 1; index < regimePeriods.length; index += 1) {
      const previous = regimePeriods[index - 1];
      const current = regimePeriods[index];

      if (current.dataInicial <= previous.dataFinal) {
        issues.push({
          code: 'overlapping-academic-periods',
          path: `periodosLetivos.${current.id}.dataInicial`,
          message: `O período "${current.id}" sobrepõe o período "${previous.id}" no regime "${regime.id}".`,
        });
      }

      if (current.dataInicial < previous.dataInicial) {
        issues.push({
          code: 'academic-period-chronology-mismatch',
          path: `periodosLetivos.${current.id}.ordem`,
          message: `A ordem do período "${current.id}" não acompanha a cronologia do regime "${regime.id}".`,
        });
      }
    }
  }
}

export function validateContentIntegrity(
  input: ContentIntegrityInput,
): ContentIntegrityIssue[] {
  const issues: ContentIntegrityIssue[] = [];
  const turmas = input.turmas ?? [];
  const regimes = input.regimesLetivos ?? [];
  const periods = input.periodosLetivos ?? [];
  const items = input.itensCronograma ?? [];
  const knownIds = {
    ...(input.knownIds ?? {}),
    turmas: input.knownIds?.turmas ?? turmas.map(({ id }) => id),
    regimesLetivos: input.knownIds?.regimesLetivos
      ?? regimes.map(({ id }) => id),
    periodosLetivos: input.knownIds?.periodosLetivos
      ?? periods.map(({ id }) => id),
    itensCronograma: input.knownIds?.itensCronograma
      ?? items.map(({ id }) => id),
  };
  const idsByCollection = validateKnownIds(knownIds, issues);

  validateTurmas(turmas, issues);
  validateAcademicPeriods(regimes, periods, issues);

  for (const item of items) {
    if (!idsByCollection.get('periodosLetivos')?.has(item.periodoLetivoId)) {
      issues.push({
        code: 'missing-academic-period',
        path: `itensCronograma.${item.id}.periodoLetivo`,
        message: `O item referencia o período inexistente "${item.periodoLetivoId}".`,
      });
    }
  }

  validateReferences(input.references ?? [], idsByCollection, issues);

  return issues.sort((a, b) =>
    a.path.localeCompare(b.path, 'pt-BR')
    || a.code.localeCompare(b.code, 'pt-BR')
    || a.message.localeCompare(b.message, 'pt-BR'),
  );
}

export function assertContentIntegrity(input: ContentIntegrityInput): void {
  const issues = validateContentIntegrity(input);

  if (issues.length === 0) {
    return;
  }

  throw new Error([
    `Falha na integridade global do conteúdo (${issues.length} erro(s)):`,
    ...issues.map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`),
  ].join('\n'));
}
