import { getCollection, type CollectionEntry } from 'astro:content';
import { getTurmaHref } from './turmaRoutes';
import {
  avisoEstaDentroDaValidade,
  comparePortalDates,
  compromissoEstaVigente,
  gabaritoResolucaoEstaDisponivel,
  getPortalToday,
  itemCronogramaEstaPassado,
  paraEstudarEstaAtenuado,
  periodoLetivoEstaCorrente,
  trabalhoEstaAtenuado,
  type PortalDate,
} from './portalDate';

const avisoSources = import.meta.glob(
  '../content/avisos/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const itemCronogramaSources = import.meta.glob(
  '../content/itens-cronograma/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const periodoLetivoSources = import.meta.glob(
  '../content/periodos-letivos/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);
const regimeLetivoSources = import.meta.glob(
  '../content/regimes-letivos/**/*.{yml,yaml}',
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

export interface AvisoDaTurma {
  estado: 'Novo' | 'Atenção' | 'Destaque';
  referencia: string;
  texto: string;
}

export interface ProximoCompromissoDaTurma {
  data: string;
  tipo: string;
  descricao: string;
  valor?: number;
}

export interface PeriodoCronogramasDaTurma {
  id: string;
  nome: string;
  corrente: boolean;
  selecionado: boolean;
  itensCronograma: ItemCronogramaDaTurma[];
  totalEtapa: number;
}

export interface ItemCronogramaDaTurma {
  data: PortalDate;
  tipo: string;
  descricao: string;
  valor?: number;
  passado: boolean;
}

export interface CronogramasDaTurma {
  periodos: PeriodoCronogramasDaTurma[];
  periodoCorrente?: PeriodoCronogramasDaTurma;
  periodoSelecionado: PeriodoCronogramasDaTurma;
}

export interface IntervaloPeriodoLetivo {
  id: string;
  dataInicial: PortalDate;
  dataFinal: PortalDate;
}

export interface SelecaoPeriodoLetivo {
  periodoCorrente?: IntervaloPeriodoLetivo;
  periodoSelecionado: IntervaloPeriodoLetivo;
}

type DadosAtividadeLista = CollectionEntry<'atividadesListas'>['data'];

export interface GabaritoResolucaoDaTurma {
  recursos?: NonNullable<DadosAtividadeLista['gabaritoResolucao']>;
  disponivelEm?: PortalDate;
}

export type AtividadeListaDaTurma = Omit<
  DadosAtividadeLista,
  'gabaritoResolucao'
> & {
  gabaritoResolucao?: GabaritoResolucaoDaTurma;
};

export type ItemParaEstudarDaTurma =
  CollectionEntry<'paraEstudar'>['data'] & {
    atenuado: boolean;
  };

export type TrabalhoDaTurma =
  CollectionEntry<'trabalhos'>['data'] & {
    atenuado: boolean;
  };

export type MaterialDaTurma = CollectionEntry<'materiais'>['data'];

export type VideoDaTurma = CollectionEntry<'videos'>['data'];

export type LinkDaTurma = CollectionEntry<'links'>['data'];

export interface GrupoLinksDaTurma {
  finalidade: string;
  itens: LinkDaTurma[];
}

export interface TurmaDashboardData {
  avisos: AvisoDaTurma[];
  proximosCompromissos: ProximoCompromissoDaTurma[];
  atividades: AtividadeListaDaTurma[];
  paraEstudar: ItemParaEstudarDaTurma[];
  trabalhos: TrabalhoDaTurma[];
  materiais: MaterialDaTurma[];
  videos: VideoDaTurma[];
  links: GrupoLinksDaTurma[];
}

export type TurmaContentContext = Pick<
  CollectionEntry<'turmas'>['data'],
  'id' | 'slug' | 'segmento' | 'anoSerie' | 'anoLetivo'
>;

export type TurmaGlobalSource = Pick<
  CollectionEntry<'turmas'>['data'],
  | 'id'
  | 'nome'
  | 'slug'
  | 'segmento'
  | 'anoSerie'
  | 'anoLetivo'
  | 'descricao'
  | 'arquivada'
  | 'ordem'
>;

export interface TurmaGlobalViewData {
  nome: string;
  anoLetivo: number;
  descricao?: string;
  arquivada: boolean;
  href: string;
}

export interface AnoSerieTurmasViewData {
  nome: string;
  turmas: TurmaGlobalViewData[];
}

export interface SegmentoTurmasViewData {
  nome: string;
  anosSeries: AnoSerieTurmasViewData[];
}

interface LeituraComHojeOptions {
  hoje?: PortalDate;
}

interface LeituraTemporalOptions extends LeituraComHojeOptions {
  limite?: number;
}

const LIMITE_AVISOS_E_COMPROMISSOS = 3;
const LIMITE_RESUMOS_DE_CONTEUDO = 2;

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

const ordenacaoPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
});

const ordenacaoNaturalPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  numeric: true,
});

export const ORDEM_INSTITUCIONAL_SEGMENTOS = [
  'Ensino Fundamental — Anos Finais',
  'Ensino Médio',
] as const;

function compararTurmasGlobais(
  turmaA: TurmaGlobalSource,
  turmaB: TurmaGlobalSource,
): number {
  return Number(Boolean(turmaA.arquivada))
    - Number(Boolean(turmaB.arquivada))
    || turmaA.ordem - turmaB.ordem
    || ordenacaoPtBr.compare(turmaA.nome, turmaB.nome);
}

export function prepararSegmentosTurmas(
  turmas: readonly TurmaGlobalSource[],
): SegmentoTurmasViewData[] {
  const turmasPorId = new Map<string, TurmaGlobalSource>();

  for (const turma of turmas) {
    if (turmasPorId.has(turma.id)) {
      throw new Error(`Turma duplicada na listagem global: "${turma.id}".`);
    }

    turmasPorId.set(turma.id, turma);
  }

  return ORDEM_INSTITUCIONAL_SEGMENTOS.flatMap((segmento) => {
    const turmasDoSegmento = [...turmasPorId.values()].filter(
      (turma) => turma.segmento === segmento,
    );

    if (turmasDoSegmento.length === 0) {
      return [];
    }

    const anosSeries = [...new Set(
      turmasDoSegmento.map((turma) => turma.anoSerie),
    )]
      .sort((anoSerieA, anoSerieB) =>
        ordenacaoNaturalPtBr.compare(anoSerieA, anoSerieB),
      )
      .map((anoSerie) => ({
        nome: anoSerie,
        turmas: turmasDoSegmento
          .filter((turma) => turma.anoSerie === anoSerie)
          .sort(compararTurmasGlobais)
          .map((turma) => ({
            nome: turma.nome,
            anoLetivo: turma.anoLetivo,
            descricao: turma.descricao || undefined,
            arquivada: Boolean(turma.arquivada),
            href: getTurmaHref(turma),
          })),
      }));

    return [{ nome: segmento, anosSeries }];
  });
}

export async function getSegmentosTurmasGlobais(): Promise<
  SegmentoTurmasViewData[]
> {
  const turmas = await getCollection('turmas');

  return prepararSegmentosTurmas(turmas.map(({ data }) => data));
}

export function formatarDataResumo(data: PortalDate): string {
  const [, mes, dia] = data.split('-');

  return `${dia} ${meses[Number(mes) - 1] ?? ''}`.trim();
}

export function formatarReferenciaPublicacao(
  publicacao: PortalDate,
  hoje: PortalDate = getPortalToday(),
): string {
  if (publicacao === hoje) {
    return 'Hoje';
  }

  return formatarDataResumo(publicacao);
}

export function selecionarPeriodoLetivo(
  periodos: readonly IntervaloPeriodoLetivo[],
  hoje: PortalDate = getPortalToday(),
): SelecaoPeriodoLetivo | null {
  if (periodos.length === 0) {
    return null;
  }

  const periodosCronologicos = [...periodos].sort((a, b) =>
    comparePortalDates(a.dataInicial, b.dataInicial)
    || comparePortalDates(a.dataFinal, b.dataFinal)
    || a.id.localeCompare(b.id, 'pt-BR'),
  );
  const periodosCorrentes = periodosCronologicos.filter((periodo) =>
    periodoLetivoEstaCorrente(
      periodo.dataInicial,
      periodo.dataFinal,
      hoje,
    ),
  );

  if (periodosCorrentes.length > 1) {
    return null;
  }

  const [periodoCorrente] = periodosCorrentes;
  const periodoSelecionado = periodoCorrente
    ?? periodosCronologicos.find((periodo) =>
      comparePortalDates(periodo.dataInicial, hoje) > 0,
    )
    ?? periodosCronologicos.at(-1);

  if (!periodoSelecionado) {
    return null;
  }

  return periodoCorrente
    ? { periodoCorrente, periodoSelecionado }
    : { periodoSelecionado };
}

function referenciaIncluiTurma(
  referencias: Array<{ id: string }>,
  turmaId: string,
): boolean {
  return referencias.some((referencia) => referencia.id === turmaId);
}

function conteudoEhAplicavelATurma(
  conteudo: {
    segmento: TurmaContentContext['segmento'];
    anoSerie?: string;
    turmas?: Array<{ id: string }>;
  },
  turma: TurmaContentContext,
): boolean {
  return conteudo.segmento === turma.segmento
    && (conteudo.anoSerie === undefined || conteudo.anoSerie === turma.anoSerie)
    && (
      conteudo.turmas === undefined
      || referenciaIncluiTurma(conteudo.turmas, turma.slug)
    );
}

export function formatarDuracaoVideo(
  duracaoSegundos: number,
): string {
  if (!Number.isInteger(duracaoSegundos) || duracaoSegundos <= 0) {
    throw new RangeError('A duração do vídeo deve ser um inteiro positivo.');
  }

  const horas = Math.floor(duracaoSegundos / 3600);
  const minutos = Math.floor((duracaoSegundos % 3600) / 60);
  const segundos = duracaoSegundos % 60;

  if (horas > 0) {
    return [horas, minutos, segundos]
      .map((parte) => String(parte).padStart(2, '0'))
      .join(':');
  }

  return [minutos, segundos]
    .map((parte) => String(parte).padStart(2, '0'))
    .join(':');
}

export async function getAvisosDaTurma(
  turmaId: string,
  options: LeituraTemporalOptions = {},
): Promise<AvisoDaTurma[]> {
  if (Object.keys(avisoSources).length === 0) {
    return [];
  }

  const hoje = options.hoje ?? getPortalToday();
  const limite = options.limite ?? LIMITE_AVISOS_E_COMPROMISSOS;
  const avisos = await getCollection('avisos', ({ data }) =>
    referenciaIncluiTurma(data.turmas, turmaId)
    && comparePortalDates(data.publicacao, hoje) <= 0
    && avisoEstaDentroDaValidade(data.validade, hoje),
  );

  return avisos
    .sort((a, b) => {
      const porPublicacao = comparePortalDates(
        b.data.publicacao,
        a.data.publicacao,
      );

      return porPublicacao || a.data.titulo.localeCompare(b.data.titulo, 'pt-BR');
    })
    .slice(0, limite)
    .map(({ data }) => ({
      estado: data.prioridade,
      referencia: formatarReferenciaPublicacao(data.publicacao, hoje),
      texto: data.texto,
    }));
}

export async function getProximosCompromissosDaTurma(
  turmaId: string,
  options: LeituraTemporalOptions = {},
): Promise<ProximoCompromissoDaTurma[]> {
  if (Object.keys(itemCronogramaSources).length === 0) {
    return [];
  }

  const hoje = options.hoje ?? getPortalToday();
  const limite = options.limite ?? LIMITE_AVISOS_E_COMPROMISSOS;
  const itens = await getCollection('itensCronograma', ({ data }) =>
    referenciaIncluiTurma(data.turmas, turmaId)
    && compromissoEstaVigente(data.dataPrazo, hoje),
  );

  return itens
    .sort((a, b) => {
      const porData = comparePortalDates(
        a.data.dataPrazo,
        b.data.dataPrazo,
      );
      const porOrdem = (a.data.ordem ?? Number.MAX_SAFE_INTEGER)
        - (b.data.ordem ?? Number.MAX_SAFE_INTEGER);

      return porData
        || porOrdem
        || a.data.descricaoConteudo.localeCompare(
          b.data.descricaoConteudo,
          'pt-BR',
        );
    })
    .slice(0, limite)
    .map(({ data }) => ({
      data: data.dataPrazo,
      tipo: data.tipo,
      descricao: data.descricaoConteudo,
      valor: data.valorIndividual,
    }));
}

export async function getCronogramasDaTurma(
  turma: TurmaContentContext,
  options: LeituraComHojeOptions = {},
): Promise<CronogramasDaTurma | null> {
  if (
    Object.keys(regimeLetivoSources).length === 0
    || Object.keys(periodoLetivoSources).length === 0
    || Object.keys(itemCronogramaSources).length === 0
  ) {
    return null;
  }

  const hoje = options.hoje ?? getPortalToday();
  const regimes = await getCollection('regimesLetivos', ({ data }) =>
    data.anoLetivo === turma.anoLetivo
    && (
      data.turmas === undefined
      || referenciaIncluiTurma(data.turmas, turma.slug)
    ),
  );

  if (regimes.length !== 1) {
    return null;
  }

  const [regime] = regimes;
  const quantidadeEsperada = {
    bimestral: 4,
    trimestral: 3,
    semestral: 2,
  }[regime.data.tipo];
  const periodos = await getCollection('periodosLetivos', ({ data }) =>
    data.regimeLetivo.id === regime.id,
  );

  periodos.sort((a, b) =>
    a.data.ordem - b.data.ordem
    || comparePortalDates(a.data.dataInicial, b.data.dataInicial)
    || a.data.nome.localeCompare(b.data.nome, 'pt-BR'),
  );

  if (periodos.length !== quantidadeEsperada) {
    return null;
  }

  const selecaoPeriodo = selecionarPeriodoLetivo(
    periodos.map(({ id, data }) => ({
      id,
      dataInicial: data.dataInicial,
      dataFinal: data.dataFinal,
    })),
    hoje,
  );

  if (!selecaoPeriodo) {
    return null;
  }

  const idsPeriodos = new Set(periodos.map(({ id }) => id));
  const itens = await getCollection('itensCronograma', ({ data }) =>
    idsPeriodos.has(data.periodoLetivo.id)
    && referenciaIncluiTurma(data.turmas, turma.slug),
  );

  itens.sort((a, b) => {
    const porData = comparePortalDates(
      a.data.dataPrazo,
      b.data.dataPrazo,
    );
    const porOrdem = (a.data.ordem ?? Number.MAX_SAFE_INTEGER)
      - (b.data.ordem ?? Number.MAX_SAFE_INTEGER);

    return porData
      || porOrdem
      || a.data.descricaoConteudo.localeCompare(
        b.data.descricaoConteudo,
        'pt-BR',
      );
  });

  const periodosComDados = periodos.map(({ data, id }) => {
    const itensCronograma = itens
      .filter((item) => item.data.periodoLetivo.id === id)
      .map((item) => ({
        data: item.data.dataPrazo,
        tipo: item.data.tipo,
        descricao: item.data.descricaoConteudo,
        valor: item.data.valorIndividual,
        passado: itemCronogramaEstaPassado(item.data.dataPrazo, hoje),
      }));

    return {
      id,
      nome: data.nome,
      corrente: id === selecaoPeriodo.periodoCorrente?.id,
      selecionado: id === selecaoPeriodo.periodoSelecionado.id,
      itensCronograma,
      totalEtapa: itensCronograma.reduce(
        (total, item) => item.valor === undefined
          ? total
          : total + item.valor,
        0,
      ),
    };
  });
  const periodoCorrente = periodosComDados.find(({ corrente }) => corrente);
  const periodoSelecionado = periodosComDados.find(
    ({ selecionado }) => selecionado,
  );

  if (!periodoSelecionado) {
    return null;
  }

  return periodoCorrente
    ? {
        periodos: periodosComDados,
        periodoCorrente,
        periodoSelecionado,
      }
    : {
        periodos: periodosComDados,
        periodoSelecionado,
      };
}

export async function getAtividadesListasDaTurma(
  turmaId: string,
  options: LeituraComHojeOptions = {},
): Promise<AtividadeListaDaTurma[]> {
  if (Object.keys(atividadeListaSources).length === 0) {
    return [];
  }

  const hoje = options.hoje ?? getPortalToday();
  const atividades = await getCollection('atividadesListas', ({ data }) =>
    referenciaIncluiTurma(data.turmas, turmaId),
  );

  return atividades
    .sort((a, b) => {
      const porPublicacao = comparePortalDates(
        b.data.publicacao,
        a.data.publicacao,
      );

      return porPublicacao
        || ordenacaoPtBr.compare(a.data.titulo, b.data.titulo);
    })
    .map(({ data }) => {
      const {
        gabaritoResolucao,
        ...dados
      } = data;

      if (!gabaritoResolucao) {
        return dados;
      }

      if (
        gabaritoResolucaoEstaDisponivel(
          data.dataLiberacaoGabarito,
          hoje,
        )
      ) {
        return {
          ...dados,
          gabaritoResolucao: {
            recursos: gabaritoResolucao,
          },
        };
      }

      return {
        ...dados,
        gabaritoResolucao: {
          disponivelEm: data.dataLiberacaoGabarito,
        },
      };
    });
}

export async function getItensParaEstudarDaTurma(
  turmaId: string,
  options: LeituraComHojeOptions = {},
): Promise<ItemParaEstudarDaTurma[]> {
  if (Object.keys(paraEstudarSources).length === 0) {
    return [];
  }

  const hoje = options.hoje ?? getPortalToday();
  const itens = await getCollection('paraEstudar', ({ data }) =>
    referenciaIncluiTurma(data.turmas, turmaId),
  );

  return itens
    .sort((a, b) => {
      const porPublicacao = comparePortalDates(
        b.data.publicacao,
        a.data.publicacao,
      );

      return porPublicacao
        || a.data.titulo.localeCompare(b.data.titulo, 'pt-BR');
    })
    .map(({ data }) => ({
      ...data,
      atenuado: paraEstudarEstaAtenuado(data.dataObjetivo, hoje),
    }));
}

export async function getTrabalhosDaTurma(
  turmaId: string,
  options: LeituraComHojeOptions = {},
): Promise<TrabalhoDaTurma[]> {
  if (Object.keys(trabalhoSources).length === 0) {
    return [];
  }

  const hoje = options.hoje ?? getPortalToday();
  const trabalhos = await getCollection('trabalhos', ({ data }) =>
    referenciaIncluiTurma(data.turmas, turmaId),
  );

  return trabalhos
    .sort((a, b) => {
      const porPublicacao = comparePortalDates(
        b.data.publicacao,
        a.data.publicacao,
      );

      return porPublicacao
        || a.data.titulo.localeCompare(b.data.titulo, 'pt-BR');
    })
    .map(({ data }) => ({
      ...data,
      atenuado: trabalhoEstaAtenuado(data.marco.data, hoje),
    }));
}

function getChavesConteudo(material: MaterialDaTurma): Set<string> {
  return new Set(
    material.classificacoes.map(({ area, subarea, conteudo }) =>
      [area, subarea, conteudo].join('\u0000'),
    ),
  );
}

function materiaisCompartilhamConteudo(
  chavesA: Set<string>,
  chavesB: Set<string>,
): boolean {
  return [...chavesA].some((chave) => chavesB.has(chave));
}

export function ordenarMateriaisPorPublicacaoNoMesmoConteudo(
  materiais: MaterialDaTurma[],
): MaterialDaTurma[] {
  const registros = materiais.map((material, indice) => ({
    material,
    indice,
    chavesConteudo: getChavesConteudo(material),
  }));
  const pais = registros.map((_, indice) => indice);

  const encontrarGrupo = (indice: number): number => {
    if (pais[indice] !== indice) {
      pais[indice] = encontrarGrupo(pais[indice]);
    }

    return pais[indice];
  };

  const unirGrupos = (indiceA: number, indiceB: number) => {
    const grupoA = encontrarGrupo(indiceA);
    const grupoB = encontrarGrupo(indiceB);

    if (grupoA !== grupoB) {
      pais[grupoB] = grupoA;
    }
  };

  for (let indiceA = 0; indiceA < registros.length; indiceA += 1) {
    for (
      let indiceB = indiceA + 1;
      indiceB < registros.length;
      indiceB += 1
    ) {
      if (
        materiaisCompartilhamConteudo(
          registros[indiceA].chavesConteudo,
          registros[indiceB].chavesConteudo,
        )
      ) {
        unirGrupos(indiceA, indiceB);
      }
    }
  }

  const grupos = new Map<number, typeof registros>();

  registros.forEach((registro, indice) => {
    const grupo = encontrarGrupo(indice);
    const registrosDoGrupo = grupos.get(grupo) ?? [];

    registrosDoGrupo.push(registro);
    grupos.set(grupo, registrosDoGrupo);
  });

  return [...grupos.values()]
    .sort((a, b) => a[0].indice - b[0].indice)
    .flatMap((grupo) => grupo
      .sort((a, b) =>
        comparePortalDates(
          b.material.publicacao,
          a.material.publicacao,
        ) || a.indice - b.indice,
      )
      .map(({ material }) => material));
}

export async function getMateriaisDaTurma(
  turmaId: string,
): Promise<MaterialDaTurma[]> {
  if (Object.keys(materialSources).length === 0) {
    return [];
  }

  const materiais = await getCollection('materiais', ({ data }) =>
    referenciaIncluiTurma(data.turmas, turmaId),
  );

  return ordenarMateriaisPorPublicacaoNoMesmoConteudo(
    materiais.map(({ data }) => data),
  );
}

export async function getVideosDaTurma(
  turma: TurmaContentContext,
): Promise<VideoDaTurma[]> {
  if (Object.keys(videoSources).length === 0) {
    return [];
  }

  const videos = await getCollection('videos', ({ data }) =>
    conteudoEhAplicavelATurma(data, turma),
  );

  return videos
    .sort((a, b) => {
      const porPublicacao = comparePortalDates(
        b.data.publicacao,
        a.data.publicacao,
      );

      return porPublicacao
        || ordenacaoPtBr.compare(a.data.titulo, b.data.titulo);
    })
    .map(({ data }) => data);
}

export async function getLinksDaTurma(
  turma: TurmaContentContext,
): Promise<GrupoLinksDaTurma[]> {
  if (Object.keys(linkSources).length === 0) {
    return [];
  }

  const links = await getCollection('links', ({ data }) =>
    conteudoEhAplicavelATurma(data, turma),
  );
  const grupos = new Map<string, LinkDaTurma[]>();

  for (const { data } of links) {
    const itens = grupos.get(data.finalidade) ?? [];

    itens.push(data);
    grupos.set(data.finalidade, itens);
  }

  return [...grupos.entries()]
    .sort(([finalidadeA], [finalidadeB]) =>
      ordenacaoPtBr.compare(finalidadeA, finalidadeB),
    )
    .map(([finalidade, itens]) => ({
      finalidade,
      itens: itens.sort((a, b) =>
        ordenacaoPtBr.compare(a.titulo, b.titulo),
      ),
    }));
}

function limitarGruposLinks(
  grupos: GrupoLinksDaTurma[],
  limite: number,
): GrupoLinksDaTurma[] {
  let itensRestantes = limite;

  return grupos.flatMap((grupo) => {
    if (itensRestantes === 0) {
      return [];
    }

    const itens = grupo.itens.slice(0, itensRestantes);

    itensRestantes -= itens.length;

    return itens.length > 0
      ? [{ ...grupo, itens }]
      : [];
  });
}

export async function getTurmaDashboardData(
  turma: TurmaContentContext,
  options: LeituraComHojeOptions = {},
): Promise<TurmaDashboardData> {
  const hoje = options.hoje ?? getPortalToday();
  const [
    avisos,
    proximosCompromissos,
    atividades,
    paraEstudar,
    trabalhos,
    materiais,
    videos,
    links,
  ] = await Promise.all([
    getAvisosDaTurma(turma.slug, { hoje }),
    getProximosCompromissosDaTurma(turma.slug, { hoje }),
    getAtividadesListasDaTurma(turma.slug, { hoje }),
    getItensParaEstudarDaTurma(turma.slug, { hoje }),
    getTrabalhosDaTurma(turma.slug, { hoje }),
    getMateriaisDaTurma(turma.slug),
    getVideosDaTurma(turma),
    getLinksDaTurma(turma),
  ]);

  return {
    avisos,
    proximosCompromissos,
    atividades: atividades.slice(0, LIMITE_RESUMOS_DE_CONTEUDO),
    paraEstudar: paraEstudar.slice(0, LIMITE_RESUMOS_DE_CONTEUDO),
    trabalhos: trabalhos.slice(0, LIMITE_RESUMOS_DE_CONTEUDO),
    materiais: materiais.slice(0, LIMITE_RESUMOS_DE_CONTEUDO),
    videos: videos.slice(0, LIMITE_RESUMOS_DE_CONTEUDO),
    links: limitarGruposLinks(links, LIMITE_RESUMOS_DE_CONTEUDO),
  };
}
