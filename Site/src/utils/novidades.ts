import { getCollection, type CollectionEntry } from 'astro:content';
import {
  addPortalDays,
  avisoEstaDentroDaValidade,
  comparePortalDates,
  getPortalToday,
  type PortalDate,
} from './portalDate';
import {
  applyAstroBaseUrl,
  getTurmaHref,
  getTurmaViewHref,
  normalizeTurmaRouteSegment,
  type TurmaViewId,
} from './turmaRoutes';
import { ORDEM_INSTITUCIONAL_SEGMENTOS } from './turmaContent';
import {
  getOportunidadeHref,
  obterDataCriticaAtencaoOportunidade,
  oportunidadeEstaNaRetencao,
  prepararOportunidade,
} from './oportunidades';
import { getMatematicaAlemCanonicalPath } from './matematicaAlem';

const avisoSources = import.meta.glob(
  '../content/avisos/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const itemCronogramaSources = import.meta.glob(
  '../content/itens-cronograma/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const atividadeListaSources = import.meta.glob(
  '../content/atividades-listas/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const paraEstudarSources = import.meta.glob(
  '../content/para-estudar/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const trabalhoSources = import.meta.glob(
  '../content/trabalhos/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const materialSources = import.meta.glob(
  '../content/materiais/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const videoSources = import.meta.glob(
  '../content/videos/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const linkSources = import.meta.glob(
  '../content/links/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const oportunidadeSources = import.meta.glob(
  '../content/oportunidades/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const matematicaAlemSources = import.meta.glob(
  '../content/matematica-alem/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);

export type EstadoNovidade = 'Destaque' | 'Atenção' | 'Novo';

export interface AcaoNovidade {
  label: string;
  href: string;
  externa?: boolean;
}

export interface Novidade {
  chave: string;
  idOrigem: string;
  estado: EstadoNovidade;
  fonte: string;
  titulo: string;
  temporalidade: string;
  audiencia: string;
  acoes: AcaoNovidade[];
  hrefDetalhe: string;
  inicioElegibilidade: PortalDate;
  fimElegibilidade: PortalDate;
  publicacao?: PortalDate;
  dataCritica?: PortalDate;
  fimDestaque?: PortalDate;
}

export type NovidadeVisual = Pick<
  Novidade,
  | 'chave'
  | 'estado'
  | 'fonte'
  | 'titulo'
  | 'temporalidade'
  | 'audiencia'
  | 'acoes'
  | 'hrefDetalhe'
>;

type TurmaEntry = Pick<CollectionEntry<'turmas'>, 'id' | 'data'>;
type AvisoEntry = Pick<CollectionEntry<'avisos'>, 'id' | 'data'>;
type ItemCronogramaEntry = Pick<CollectionEntry<'itensCronograma'>, 'id' | 'data'>;
type AtividadeListaEntry = Pick<CollectionEntry<'atividadesListas'>, 'id' | 'data'>;
type ParaEstudarEntry = Pick<CollectionEntry<'paraEstudar'>, 'id' | 'data'>;
type TrabalhoEntry = Pick<CollectionEntry<'trabalhos'>, 'id' | 'data'>;
type MaterialEntry = Pick<CollectionEntry<'materiais'>, 'id' | 'data'>;
type VideoEntry = Pick<CollectionEntry<'videos'>, 'id' | 'data'>;
type LinkEntry = Pick<CollectionEntry<'links'>, 'id' | 'data'>;
type OportunidadeEntry = Pick<CollectionEntry<'oportunidades'>, 'id' | 'data'>;
type MatematicaAlemEntry = Pick<CollectionEntry<'matematicaAlem'>, 'id' | 'data'>;

export interface FontesNovidades {
  turmas: TurmaEntry[];
  avisos: AvisoEntry[];
  itensCronograma: ItemCronogramaEntry[];
  atividadesListas: AtividadeListaEntry[];
  paraEstudar: ParaEstudarEntry[];
  trabalhos: TrabalhoEntry[];
  materiais: MaterialEntry[];
  videos: VideoEntry[];
  links: LinkEntry[];
  oportunidades: OportunidadeEntry[];
  matematicaAlem: MatematicaAlemEntry[];
}

export interface ProjetarNovidadesOptions {
  hoje?: PortalDate;
}

interface EstadoCalculado {
  estado: EstadoNovidade;
  inicioElegibilidade: PortalDate;
  fimElegibilidade: PortalDate;
  fimDestaque?: PortalDate;
}

interface CalculoEstadoInput {
  destaqueNovidades?: {
    inicio: PortalDate;
    fim: PortalDate;
  };
  publicacao?: PortalDate;
  diasNovo?: number;
  dataCritica?: PortalDate;
  diasDepoisDataCritica?: number;
}

interface AudienciaResolvida {
  turmas: TurmaEntry[];
  descricao: string;
}

const collatorPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  sensitivity: 'base',
});

const collatorNaturalPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  sensitivity: 'base',
  numeric: true,
});

const meses = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

const ordemEstados: Record<EstadoNovidade, number> = {
  Destaque: 0,
  Atenção: 1,
  Novo: 2,
};

function dataEstaNoIntervalo(
  hoje: PortalDate,
  inicio: PortalDate,
  fim: PortalDate,
): boolean {
  return comparePortalDates(inicio, hoje) <= 0
    && comparePortalDates(hoje, fim) <= 0;
}

function calcularEstado(
  input: CalculoEstadoInput,
  hoje: PortalDate,
): EstadoCalculado | null {
  if (
    input.destaqueNovidades
    && dataEstaNoIntervalo(
      hoje,
      input.destaqueNovidades.inicio,
      input.destaqueNovidades.fim,
    )
  ) {
    return {
      estado: 'Destaque',
      inicioElegibilidade: input.destaqueNovidades.inicio,
      fimElegibilidade: input.destaqueNovidades.fim,
      fimDestaque: input.destaqueNovidades.fim,
    };
  }

  if (input.dataCritica) {
    const inicioAtencao = addPortalDays(input.dataCritica, -7);
    const fimAtencao = addPortalDays(
      input.dataCritica,
      input.diasDepoisDataCritica ?? 0,
    );

    if (dataEstaNoIntervalo(hoje, inicioAtencao, fimAtencao)) {
      return {
        estado: 'Atenção',
        inicioElegibilidade: inicioAtencao,
        fimElegibilidade: fimAtencao,
      };
    }
  }

  if (input.publicacao && input.diasNovo) {
    const fimNovoExclusivo = addPortalDays(input.publicacao, input.diasNovo);

    if (
      comparePortalDates(input.publicacao, hoje) <= 0
      && comparePortalDates(hoje, fimNovoExclusivo) < 0
    ) {
      return {
        estado: 'Novo',
        inicioElegibilidade: input.publicacao,
        fimElegibilidade: addPortalDays(fimNovoExclusivo, -1),
      };
    }
  }

  return null;
}

function formatarData(data: PortalDate): string {
  const [, mes, dia] = data.split('-');

  return `${Number(dia)} ${meses[Number(mes) - 1] ?? ''}`.trim();
}

function formatarTemporalidade(
  estado: EstadoNovidade,
  hoje: PortalDate,
  options: {
    publicacao?: PortalDate;
    dataCritica?: PortalDate;
    fimDestaque?: PortalDate;
    rotuloAtencao?: string;
  },
): string {
  if (estado === 'Destaque' && options.fimDestaque) {
    return `Em destaque até ${formatarData(options.fimDestaque)}`;
  }

  if (estado === 'Atenção' && options.dataCritica) {
    return `${options.rotuloAtencao ?? 'Data'}: ${formatarData(options.dataCritica)}`;
  }

  if (options.publicacao === hoje) {
    return 'Publicado hoje';
  }

  return options.publicacao
    ? `Publicado em ${formatarData(options.publicacao)}`
    : '';
}

function compararTurmas(a: TurmaEntry, b: TurmaEntry): number {
  const indiceSegmentoA = ORDEM_INSTITUCIONAL_SEGMENTOS.indexOf(
    a.data.segmento,
  );
  const indiceSegmentoB = ORDEM_INSTITUCIONAL_SEGMENTOS.indexOf(
    b.data.segmento,
  );

  return indiceSegmentoA - indiceSegmentoB
    || collatorNaturalPtBr.compare(a.data.anoSerie, b.data.anoSerie)
    || a.data.ordem - b.data.ordem
    || collatorPtBr.compare(a.data.nome, b.data.nome)
    || collatorPtBr.compare(a.data.slug, b.data.slug);
}

function criarIndiceTurmas(turmas: TurmaEntry[]): Map<string, TurmaEntry> {
  const indice = new Map<string, TurmaEntry>();

  for (const turma of turmas) {
    for (const identificador of [turma.id, turma.data.id, turma.data.slug]) {
      const existente = indice.get(identificador);

      if (existente && existente.data.id !== turma.data.id) {
        throw new Error(`Identificador de turma duplicado: "${identificador}".`);
      }

      indice.set(identificador, turma);
    }
  }

  return indice;
}

function juntarComE(valores: string[]): string {
  if (valores.length <= 1) {
    return valores[0] ?? '';
  }

  return `${valores.slice(0, -1).join(', ')} e ${valores.at(-1)}`;
}

function descreverTurmas(turmas: TurmaEntry[]): string {
  const grupos = new Map<string, string[]>();

  for (const turma of turmas) {
    const chave = `${turma.data.segmento}\u0000${turma.data.anoSerie}`;
    const nomes = grupos.get(chave) ?? [];

    nomes.push(turma.data.nome);
    grupos.set(chave, nomes);
  }

  return [...grupos.entries()]
    .map(([chave, nomes]) => {
      const [, anoSerie] = chave.split('\u0000');

      return `${anoSerie} — ${juntarComE(nomes)}`;
    })
    .join(' • ');
}

function resolverAudiencia(
  referencias: Array<{ id: string }> | undefined,
  indiceTurmas: Map<string, TurmaEntry>,
  audienciaGlobal: string,
): AudienciaResolvida | null {
  if (referencias === undefined) {
    return {
      turmas: [],
      descricao: audienciaGlobal,
    };
  }

  const turmasUnicas = new Map<string, TurmaEntry>();

  for (const referencia of referencias) {
    const turma = indiceTurmas.get(referencia.id);

    if (turma && !turma.data.arquivada) {
      turmasUnicas.set(turma.data.id, turma);
    }
  }

  const turmasAtivas = [...turmasUnicas.values()].sort(compararTurmas);

  if (turmasAtivas.length === 0) {
    return null;
  }

  return {
    turmas: turmasAtivas,
    descricao: descreverTurmas(turmasAtivas),
  };
}

function criarChave(fonte: string, idOrigem: string): string {
  return `${normalizeTurmaRouteSegment(fonte)}--${normalizeTurmaRouteSegment(idOrigem)}`;
}

function criarAcoesDeTurma(
  turmas: TurmaEntry[],
  viewId: TurmaViewId,
): AcaoNovidade[] {
  return turmas.map(({ data }) => ({
    label: `Abrir na ${data.nome}`,
    href: viewId === 'inicio'
      ? getTurmaHref(data)
      : getTurmaViewHref(data, viewId),
  }));
}

function criarNovidade(input: {
  idOrigem: string;
  fonteChave: string;
  fonte: string;
  titulo: string;
  audiencia: AudienciaResolvida;
  acoes: AcaoNovidade[];
  estado: EstadoCalculado;
  hoje: PortalDate;
  publicacao?: PortalDate;
  dataCritica?: PortalDate;
  rotuloAtencao?: string;
}): Novidade {
  const chave = criarChave(input.fonteChave, input.idOrigem);
  const hrefDetalhe = `${applyAstroBaseUrl('/novidades/')}#${chave}`;

  return {
    chave,
    idOrigem: input.idOrigem,
    estado: input.estado.estado,
    fonte: input.fonte,
    titulo: input.titulo,
    temporalidade: formatarTemporalidade(input.estado.estado, input.hoje, {
      publicacao: input.publicacao,
      dataCritica: input.dataCritica,
      fimDestaque: input.estado.fimDestaque,
      rotuloAtencao: input.rotuloAtencao,
    }),
    audiencia: input.audiencia.descricao,
    acoes: input.acoes,
    hrefDetalhe,
    inicioElegibilidade: input.estado.inicioElegibilidade,
    fimElegibilidade: input.estado.fimElegibilidade,
    publicacao: input.publicacao,
    dataCritica: input.dataCritica,
    fimDestaque: input.estado.fimDestaque,
  };
}

function compararNovidades(a: Novidade, b: Novidade): number {
  const porEstado = ordemEstados[a.estado] - ordemEstados[b.estado];

  if (porEstado) {
    return porEstado;
  }

  let porData = 0;

  if (a.estado === 'Destaque') {
    porData = comparePortalDates(
      a.fimDestaque ?? a.fimElegibilidade,
      b.fimDestaque ?? b.fimElegibilidade,
    );
  } else if (a.estado === 'Atenção') {
    porData = comparePortalDates(
      a.dataCritica ?? a.fimElegibilidade,
      b.dataCritica ?? b.fimElegibilidade,
    );
  } else {
    porData = comparePortalDates(
      b.publicacao ?? b.inicioElegibilidade,
      a.publicacao ?? a.inicioElegibilidade,
    );
  }

  return porData
    || collatorPtBr.compare(a.titulo, b.titulo)
    || collatorPtBr.compare(a.fonte, b.fonte)
    || collatorPtBr.compare(a.idOrigem, b.idOrigem);
}

export function projetarNovidades(
  fontes: FontesNovidades,
  options: ProjetarNovidadesOptions = {},
): Novidade[] {
  const hoje = options.hoje ?? getPortalToday();
  const indiceTurmas = criarIndiceTurmas(fontes.turmas);
  const novidades = new Map<string, Novidade>();

  const adicionar = (novidade: Novidade) => {
    if (novidades.has(novidade.chave)) {
      throw new Error(`Chave de Novidade duplicada: "${novidade.chave}".`);
    }

    novidades.set(novidade.chave, novidade);
  };

  for (const registro of fontes.avisos) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.publico,
    );

    if (
      !audiencia
      || comparePortalDates(data.publicacao, hoje) > 0
      || !avisoEstaDentroDaValidade(data.validade, hoje)
    ) {
      continue;
    }

    const estado: EstadoCalculado = {
      estado: data.prioridade,
      inicioElegibilidade: data.publicacao,
      fimElegibilidade: data.validade,
      fimDestaque: data.prioridade === 'Destaque'
        ? data.validade
        : undefined,
    };

    adicionar(criarNovidade({
      idOrigem: registro.id,
      fonteChave: 'aviso',
      fonte: 'Aviso',
      titulo: data.titulo,
      audiencia,
      acoes: criarAcoesDeTurma(audiencia.turmas, 'inicio'),
      estado,
      hoje,
      publicacao: data.publicacao,
      dataCritica: data.prioridade === 'Atenção' ? data.validade : undefined,
      rotuloAtencao: 'Validade',
    }));
  }

  for (const registro of fontes.itensCronograma) {
    const { data } = registro;
    const audiencia = resolverAudiencia(data.turmas, indiceTurmas, '');
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 7,
      dataCritica: data.dataPrazo,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'cronograma',
      fonte: 'Cronograma',
      titulo: data.descricaoConteudo,
      audiencia,
      acoes: criarAcoesDeTurma(audiencia.turmas, 'cronogramas'),
      estado,
      hoje,
      publicacao: data.publicacao,
      dataCritica: data.dataPrazo,
      rotuloAtencao: 'Data',
    }));
  }

  for (const registro of fontes.atividadesListas) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.anoSerie,
    );
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 7,
      dataCritica: data.prazo,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'atividade-lista',
      fonte: data.tipo,
      titulo: data.titulo,
      audiencia,
      acoes: criarAcoesDeTurma(audiencia.turmas, 'atividades'),
      estado,
      hoje,
      publicacao: data.publicacao,
      dataCritica: data.prazo,
      rotuloAtencao: 'Prazo',
    }));
  }

  for (const registro of fontes.paraEstudar) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.anoSerie,
    );
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 7,
      dataCritica: data.dataObjetivo,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'para-estudar',
      fonte: 'Para estudar',
      titulo: data.titulo,
      audiencia,
      acoes: criarAcoesDeTurma(audiencia.turmas, 'paraEstudar'),
      estado,
      hoje,
      publicacao: data.publicacao,
      dataCritica: data.dataObjetivo,
      rotuloAtencao: 'Data',
    }));
  }

  for (const registro of fontes.trabalhos) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.anoSerie,
    );
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 7,
      dataCritica: data.marco.data,
      diasDepoisDataCritica: 1,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'trabalho',
      fonte: 'Trabalho',
      titulo: data.titulo,
      audiencia,
      acoes: criarAcoesDeTurma(audiencia.turmas, 'trabalhos'),
      estado,
      hoje,
      publicacao: data.publicacao,
      dataCritica: data.marco.data,
      rotuloAtencao: 'Entrega',
    }));
  }

  for (const registro of fontes.oportunidades) {
    const oportunidade = prepararOportunidade({
      id: registro.id,
      ...registro.data,
    }, hoje);
    const marcoCritico = obterDataCriticaAtencaoOportunidade(
      oportunidade.marcos,
      hoje,
    );

    if (!oportunidadeEstaNaRetencao(
      oportunidade.marcos,
      oportunidade.situacao,
      hoje,
    )) {
      continue;
    }

    const estado = calcularEstado({
      destaqueNovidades: oportunidade.destaqueNovidades,
      publicacao: oportunidade.publicacao,
      diasNovo: 7,
      dataCritica: marcoCritico?.data,
      diasDepoisDataCritica: 1,
    }, hoje);

    if (!estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: oportunidade.id,
      fonteChave: 'oportunidade',
      fonte: 'Oportunidade',
      titulo: oportunidade.titulo,
      audiencia: {
        turmas: [],
        descricao: oportunidade.direcionamentoTexto,
      },
      acoes: [{
        label: 'Ver oportunidade',
        href: getOportunidadeHref(oportunidade.id),
      }],
      estado,
      hoje,
      publicacao: oportunidade.publicacao,
      dataCritica: marcoCritico?.data,
      rotuloAtencao: marcoCritico?.tipo === 'Encerramento de inscrições'
        ? 'Inscrições até'
        : 'Realização',
    }));
  }

  for (const registro of fontes.matematicaAlem) {
    const { data } = registro;

    if (data.arquivado === true) {
      continue;
    }

    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 10,
    }, hoje);

    if (!estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: registro.id,
      fonteChave: 'matematica-alem',
      fonte: 'Matemática além da sala',
      titulo: data.titulo,
      audiencia: {
        turmas: [],
        descricao: 'Todos os públicos',
      },
      acoes: [{
        label: 'Ver conteúdo',
        href: applyAstroBaseUrl(getMatematicaAlemCanonicalPath(registro.id)),
      }],
      estado,
      hoje,
      publicacao: data.publicacao,
    }));
  }

  for (const registro of fontes.materiais) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.anoSerie,
    );
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 10,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'material',
      fonte: 'Material',
      titulo: data.titulo,
      audiencia,
      acoes: criarAcoesDeTurma(audiencia.turmas, 'materiais'),
      estado,
      hoje,
      publicacao: data.publicacao,
    }));
  }

  for (const registro of fontes.videos) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.anoSerie,
    );
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 10,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'video',
      fonte: 'Vídeo',
      titulo: data.titulo,
      audiencia,
      acoes: [{ label: 'Ver vídeo', href: data.url, externa: true }],
      estado,
      hoje,
      publicacao: data.publicacao,
    }));
  }

  for (const registro of fontes.links) {
    const { data } = registro;
    const audiencia = resolverAudiencia(
      data.turmas,
      indiceTurmas,
      data.anoSerie ?? data.segmento,
    );
    const estado = calcularEstado({
      destaqueNovidades: data.destaqueNovidades,
      publicacao: data.publicacao,
      diasNovo: 10,
    }, hoje);

    if (!audiencia || !estado) {
      continue;
    }

    adicionar(criarNovidade({
      idOrigem: data.id,
      fonteChave: 'link',
      fonte: 'Link',
      titulo: data.titulo,
      audiencia,
      acoes: [{ label: 'Acessar', href: data.url, externa: true }],
      estado,
      hoje,
      publicacao: data.publicacao,
    }));
  }

  return [...novidades.values()].sort(compararNovidades);
}

export async function carregarFontesNovidades(): Promise<FontesNovidades> {
  const [
    turmas,
    avisos,
    itensCronograma,
    atividadesListas,
    paraEstudar,
    trabalhos,
    materiais,
    videos,
    links,
    oportunidades,
    matematicaAlem,
  ] = await Promise.all([
    getCollection('turmas'),
    Object.keys(avisoSources).length > 0
      ? getCollection('avisos')
      : Promise.resolve([] as AvisoEntry[]),
    Object.keys(itemCronogramaSources).length > 0
      ? getCollection('itensCronograma')
      : Promise.resolve([] as ItemCronogramaEntry[]),
    Object.keys(atividadeListaSources).length > 0
      ? getCollection('atividadesListas')
      : Promise.resolve([] as AtividadeListaEntry[]),
    Object.keys(paraEstudarSources).length > 0
      ? getCollection('paraEstudar')
      : Promise.resolve([] as ParaEstudarEntry[]),
    Object.keys(trabalhoSources).length > 0
      ? getCollection('trabalhos')
      : Promise.resolve([] as TrabalhoEntry[]),
    Object.keys(materialSources).length > 0
      ? getCollection('materiais')
      : Promise.resolve([] as MaterialEntry[]),
    Object.keys(videoSources).length > 0
      ? getCollection('videos')
      : Promise.resolve([] as VideoEntry[]),
    Object.keys(linkSources).length > 0
      ? getCollection('links')
      : Promise.resolve([] as LinkEntry[]),
    Object.keys(oportunidadeSources).length > 0
      ? getCollection('oportunidades')
      : Promise.resolve([] as OportunidadeEntry[]),
    Object.keys(matematicaAlemSources).length > 0
      ? getCollection('matematicaAlem')
      : Promise.resolve([] as MatematicaAlemEntry[]),
  ]);

  return {
    turmas,
    avisos,
    itensCronograma,
    atividadesListas,
    paraEstudar,
    trabalhos,
    materiais,
    videos,
    links,
    oportunidades,
    matematicaAlem,
  };
}

export async function getNovidadesAtivas(
  options: ProjetarNovidadesOptions = {},
): Promise<Novidade[]> {
  return projetarNovidades(await carregarFontesNovidades(), options);
}

export async function getNovidadesDaHome(
  options: ProjetarNovidadesOptions = {},
): Promise<Novidade[]> {
  return (await getNovidadesAtivas(options)).slice(0, 6);
}
