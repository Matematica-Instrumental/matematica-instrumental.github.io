import { getCollection, type CollectionEntry } from 'astro:content';
import {
  addPortalDays,
  comparePortalDates,
  getPortalToday,
  type PortalDate,
} from './portalDate';
import {
  applyAstroBaseUrl,
  normalizeTurmaRouteSegment,
} from './turmaRoutes';

const oportunidadeSources = import.meta.glob(
  '../content/oportunidades/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);

export const OPORTUNIDADE_CATEGORIAS = [
  'ENEM',
  'Vestibular',
  'CEFET/Instituto Federal',
  'Processo seriado',
  'Concurso',
  'Olimpíada',
  'Evento',
] as const;

export const OPORTUNIDADE_TIPOS_MARCO = [
  'Abertura de inscrições',
  'Encerramento de inscrições',
  'Realização',
  'Divulgação de resultado',
] as const;

export const OPORTUNIDADE_SITUACOES = [
  'Inscrições abertas',
  'Inscrições futuras',
  'Realização hoje',
  'Inscrições encerradas',
  'Realização futura',
  'Aguardando resultado',
  'Encerrado',
] as const;

export const OPORTUNIDADE_SEGMENTOS = [
  'Ensino Fundamental — Anos Finais',
  'Ensino Médio',
] as const;

export const OPORTUNIDADE_ANOS_SERIES = {
  'Ensino Fundamental — Anos Finais': [
    '6º ano',
    '7º ano',
    '8º ano',
    '9º ano',
  ],
  'Ensino Médio': [
    '1º ano',
    '2º ano',
    '3º ano',
  ],
} as const;

export type OportunidadeCategoria = (typeof OPORTUNIDADE_CATEGORIAS)[number];
export type OportunidadeTipoMarco = (typeof OPORTUNIDADE_TIPOS_MARCO)[number];
export type OportunidadeSituacao = (typeof OPORTUNIDADE_SITUACOES)[number];
export type OportunidadeSegmento = (typeof OPORTUNIDADE_SEGMENTOS)[number];
export type OportunidadeAnoSerie =
  (typeof OPORTUNIDADE_ANOS_SERIES)[OportunidadeSegmento][number];

export interface OportunidadeMarcoSource {
  tipo: OportunidadeTipoMarco;
  rotulo: string;
  data: PortalDate;
}

export interface OportunidadeDirecionamentoSource {
  segmento: OportunidadeSegmento;
  anosSeries?: readonly OportunidadeAnoSerie[];
}

export interface OportunidadeSource {
  id: string;
  titulo: string;
  categoria: OportunidadeCategoria;
  descricao: string;
  instituicao: string;
  publicoAlvo: string;
  publicacao: PortalDate;
  marcos: readonly OportunidadeMarcoSource[];
  linkOficial: string;
  fonte: {
    nome: string;
    url: string;
  };
  direcionamento?: readonly OportunidadeDirecionamentoSource[];
  local?: string;
  inscricaoUrl?: string;
  regulamentoUrl?: string;
  resultadoUrl?: string;
  destaqueNovidades?: {
    inicio: PortalDate;
    fim: PortalDate;
  };
  condicaoUso?: string;
}

export interface OportunidadeMarcoView extends OportunidadeMarcoSource {
  critico: boolean;
  dataFormatada: string;
}

export interface OportunidadeAcaoView {
  rotulo: 'Ver oportunidade' | 'Inscrever-se' | 'Ver regulamento' | 'Ver resultado';
  href: string;
  primaria?: boolean;
}

export interface OportunidadeDirecionamentoView {
  segmento: OportunidadeSegmento;
  anosSeries: OportunidadeAnoSerie[] | null;
}

export interface OportunidadeViewItem extends Omit<
  OportunidadeSource,
  | 'marcos'
  | 'fonte'
  | 'direcionamento'
  | 'inscricaoUrl'
  | 'regulamentoUrl'
  | 'resultadoUrl'
> {
  anchorId: string;
  marcos: OportunidadeMarcoView[];
  fonte: {
    nome: string;
    href: string;
  };
  direcionamentos: OportunidadeDirecionamentoView[];
  direcionamentoTexto: string;
  global: boolean;
  situacao: OportunidadeSituacao;
  encerrado: boolean;
  proximoMarco?: OportunidadeMarcoView;
  ultimoMarco: OportunidadeMarcoView;
  acoes: OportunidadeAcaoView[];
  anos: string[];
  buscaNormalizada: string;
  destinoInterno: string;
}

export interface OportunidadeAnoSerieOption {
  valor: OportunidadeAnoSerie;
  segmento: OportunidadeSegmento;
}

export interface OportunidadesFilterOptions {
  categorias: OportunidadeCategoria[];
  situacoes: OportunidadeSituacao[];
  anos: string[];
  segmentos: OportunidadeSegmento[];
  anosSeries: OportunidadeAnoSerieOption[];
  instituicoes: string[];
}

export interface OportunidadesViewModel {
  itens: OportunidadeViewItem[];
  opcoes: OportunidadesFilterOptions;
}

export interface PrepararOportunidadesOptions {
  hoje?: PortalDate;
}

const ordenacaoPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  sensitivity: 'base',
});

const ordemSituacoesAtivas: Record<Exclude<OportunidadeSituacao, 'Encerrado'>, number> = {
  'Inscrições abertas': 0,
  'Realização hoje': 1,
  'Inscrições futuras': 2,
  'Inscrições encerradas': 3,
  'Realização futura': 4,
  'Aguardando resultado': 5,
};

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

export function normalizarTextoOportunidade(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizarBuscaOportunidade(value: string): string {
  return normalizarTextoOportunidade(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export function formatarDataOportunidade(data: PortalDate): string {
  const [ano, mes, dia] = data.split('-').map(Number);

  return `${dia} ${meses[mes - 1] ?? ''} ${ano}`.trim();
}

export function marcoEhCritico(tipo: OportunidadeTipoMarco): boolean {
  return tipo === 'Encerramento de inscrições' || tipo === 'Realização';
}

export function ordenarMarcosOportunidade(
  marcos: readonly OportunidadeMarcoSource[],
): OportunidadeMarcoSource[] {
  return [...marcos].sort((a, b) =>
    comparePortalDates(a.data, b.data)
    || OPORTUNIDADE_TIPOS_MARCO.indexOf(a.tipo)
      - OPORTUNIDADE_TIPOS_MARCO.indexOf(b.tipo)
    || ordenacaoPtBr.compare(a.rotulo, b.rotulo),
  );
}

export function calcularSituacaoOportunidade(
  marcos: readonly OportunidadeMarcoSource[],
  hoje: PortalDate,
): OportunidadeSituacao {
  const ordenados = ordenarMarcosOportunidade(marcos);
  const abertura = ordenados.find(({ tipo }) => tipo === 'Abertura de inscrições');
  const encerramento = ordenados.find(({ tipo }) => tipo === 'Encerramento de inscrições');
  const realizacoes = ordenados.filter(({ tipo }) => tipo === 'Realização');
  const resultado = ordenados.find(({ tipo }) => tipo === 'Divulgação de resultado');

  if (
    abertura
    && encerramento
    && comparePortalDates(abertura.data, hoje) <= 0
    && comparePortalDates(hoje, encerramento.data) <= 0
  ) {
    return 'Inscrições abertas';
  }

  if (abertura && comparePortalDates(hoje, abertura.data) < 0) {
    return 'Inscrições futuras';
  }

  if (realizacoes.some(({ data }) => data === hoje)) {
    return 'Realização hoje';
  }

  const existeRealizacaoFutura = realizacoes.some(
    ({ data }) => comparePortalDates(data, hoje) > 0,
  );

  if (
    encerramento
    && comparePortalDates(hoje, encerramento.data) > 0
    && existeRealizacaoFutura
  ) {
    return 'Inscrições encerradas';
  }

  if (existeRealizacaoFutura) {
    return 'Realização futura';
  }

  const todasRealizacoesPassaram = realizacoes.every(
    ({ data }) => comparePortalDates(data, hoje) < 0,
  );

  if (
    todasRealizacoesPassaram
    && resultado
    && comparePortalDates(resultado.data, hoje) >= 0
  ) {
    return 'Aguardando resultado';
  }

  return 'Encerrado';
}

export function obterProximoMarcoOportunidade(
  marcos: readonly OportunidadeMarcoSource[],
  hoje: PortalDate,
): OportunidadeMarcoSource | undefined {
  return ordenarMarcosOportunidade(marcos).find(
    ({ data }) => comparePortalDates(data, hoje) >= 0,
  );
}

export function obterUltimoMarcoOportunidade(
  marcos: readonly OportunidadeMarcoSource[],
): OportunidadeMarcoSource {
  const ultimo = ordenarMarcosOportunidade(marcos).at(-1);

  if (!ultimo) {
    throw new Error('Uma oportunidade deve possuir ao menos um marco.');
  }

  return ultimo;
}

export function oportunidadeEstaNaRetencao(
  marcos: readonly OportunidadeMarcoSource[],
  situacao: OportunidadeSituacao,
  hoje: PortalDate,
): boolean {
  if (situacao !== 'Encerrado') {
    return true;
  }

  const ultimoMarco = obterUltimoMarcoOportunidade(marcos);

  return comparePortalDates(hoje, addPortalDays(ultimoMarco.data, 90)) <= 0;
}

export function obterDataCriticaAtencaoOportunidade(
  marcos: readonly OportunidadeMarcoSource[],
  hoje: PortalDate,
): OportunidadeMarcoSource | undefined {
  return ordenarMarcosOportunidade(marcos)
    .filter(({ tipo, data }) =>
      marcoEhCritico(tipo)
      && comparePortalDates(addPortalDays(data, -7), hoje) <= 0
      && comparePortalDates(hoje, addPortalDays(data, 1)) <= 0,
    )[0];
}

export function getOportunidadeAnchorId(id: string): string {
  return `oportunidade--${normalizeTurmaRouteSegment(id)}`;
}

export function getOportunidadeHref(id: string): string {
  return `${applyAstroBaseUrl('/oportunidades-e-datas/')}#${getOportunidadeAnchorId(id)}`;
}

function validarMarcos(
  id: string,
  marcos: readonly OportunidadeMarcoSource[],
): void {
  if (marcos.length === 0) {
    throw new Error(`A oportunidade "${id}" deve possuir ao menos um marco.`);
  }

  const aberturas = marcos.filter(({ tipo }) => tipo === 'Abertura de inscrições');
  const encerramentos = marcos.filter(({ tipo }) => tipo === 'Encerramento de inscrições');
  const realizacoes = marcos.filter(({ tipo }) => tipo === 'Realização');
  const resultados = marcos.filter(({ tipo }) => tipo === 'Divulgação de resultado');

  if (aberturas.length > 1 || encerramentos.length > 1 || resultados.length > 1) {
    throw new Error(`A oportunidade "${id}" repete um tipo de marco que admite no máximo uma ocorrência.`);
  }

  if ((aberturas.length === 1) !== (encerramentos.length === 1)) {
    throw new Error(`A oportunidade "${id}" deve parear Abertura e Encerramento de inscrições.`);
  }

  if (
    aberturas[0]
    && encerramentos[0]
    && comparePortalDates(aberturas[0].data, encerramentos[0].data) > 0
  ) {
    throw new Error(`A oportunidade "${id}" possui Abertura posterior ao Encerramento.`);
  }

  if (encerramentos.length === 0 && realizacoes.length === 0) {
    throw new Error(`A oportunidade "${id}" deve possuir ao menos uma data crítica.`);
  }

  const ultimaRealizacao = ordenarMarcosOportunidade(realizacoes).at(-1);

  if (
    resultados[0]
    && ultimaRealizacao
    && comparePortalDates(resultados[0].data, ultimaRealizacao.data) < 0
  ) {
    throw new Error(`A oportunidade "${id}" possui Resultado anterior à última Realização.`);
  }
}

function validarDirecionamentos(
  id: string,
  direcionamentos: readonly OportunidadeDirecionamentoSource[],
): void {
  const segmentos = new Set<OportunidadeSegmento>();

  for (const direcionamento of direcionamentos) {
    if (segmentos.has(direcionamento.segmento)) {
      throw new Error(`A oportunidade "${id}" repete o Segmento no direcionamento.`);
    }

    segmentos.add(direcionamento.segmento);

    const permitidos = OPORTUNIDADE_ANOS_SERIES[direcionamento.segmento] as readonly string[];

    if (
      direcionamento.anosSeries
      && direcionamento.anosSeries.some((anoSerie) => !permitidos.includes(anoSerie))
    ) {
      throw new Error(`A oportunidade "${id}" possui Ano/Série incompatível com o Segmento.`);
    }
  }
}

function formatarListaComE(valores: readonly string[]): string {
  if (valores.length <= 1) {
    return valores[0] ?? '';
  }

  return `${valores.slice(0, -1).join(', ')} e ${valores.at(-1)}`;
}

function formatarAnosSeries(anosSeries: readonly OportunidadeAnoSerie[]): string {
  const ordinais = anosSeries.map((anoSerie) => anoSerie.replace(/ ano$/, ''));

  return ordinais.length === 1
    ? `${ordinais[0]} ano`
    : `${formatarListaComE(ordinais)} anos`;
}

export function descreverDirecionamentoOportunidade(
  direcionamentos: readonly OportunidadeDirecionamentoSource[] | undefined,
): string {
  if (!direcionamentos || direcionamentos.length === 0) {
    return 'Global';
  }

  return direcionamentos.map(({ segmento, anosSeries }) =>
    anosSeries && anosSeries.length > 0
      ? `${segmento} • ${formatarAnosSeries(anosSeries)}`
      : segmento,
  ).join(' • ');
}

function normalizarDirecionamentos(
  direcionamentos: readonly OportunidadeDirecionamentoSource[] | undefined,
): OportunidadeDirecionamentoView[] {
  return (direcionamentos ?? [])
    .map(({ segmento, anosSeries }) => ({
      segmento,
      anosSeries: anosSeries
        ? [...anosSeries].sort((a, b) => {
            const ordem = OPORTUNIDADE_ANOS_SERIES[segmento] as readonly string[];

            return ordem.indexOf(a) - ordem.indexOf(b);
          })
        : null,
    }))
    .sort((a, b) =>
      OPORTUNIDADE_SEGMENTOS.indexOf(a.segmento)
      - OPORTUNIDADE_SEGMENTOS.indexOf(b.segmento),
    );
}

function prepararAcoes(
  fonte: OportunidadeSource,
  situacao: OportunidadeSituacao,
  hoje: PortalDate,
): OportunidadeAcaoView[] {
  const acoes: OportunidadeAcaoView[] = [{
    rotulo: 'Ver oportunidade',
    href: fonte.linkOficial.trim(),
    primaria: true,
  }];

  if (situacao === 'Inscrições abertas' && fonte.inscricaoUrl) {
    acoes.push({ rotulo: 'Inscrever-se', href: fonte.inscricaoUrl.trim() });
  }

  if (fonte.regulamentoUrl) {
    acoes.push({ rotulo: 'Ver regulamento', href: fonte.regulamentoUrl.trim() });
  }

  const resultadoAlcancado = fonte.marcos.some(({ tipo, data }) =>
    tipo === 'Divulgação de resultado'
    && comparePortalDates(data, hoje) <= 0,
  );

  if (fonte.resultadoUrl && resultadoAlcancado) {
    acoes.push({ rotulo: 'Ver resultado', href: fonte.resultadoUrl.trim() });
  }

  return acoes;
}

export function prepararOportunidade(
  fonte: OportunidadeSource,
  hoje: PortalDate = getPortalToday(),
): OportunidadeViewItem {
  const id = normalizarTextoOportunidade(fonte.id);

  if (!id) {
    throw new Error('Uma oportunidade deve possuir ID estável.');
  }

  validarMarcos(id, fonte.marcos);
  validarDirecionamentos(id, fonte.direcionamento ?? []);

  const marcos = ordenarMarcosOportunidade(fonte.marcos).map((marco) => ({
    ...marco,
    rotulo: normalizarTextoOportunidade(marco.rotulo),
    critico: marcoEhCritico(marco.tipo),
    dataFormatada: formatarDataOportunidade(marco.data),
  }));
  const situacao = calcularSituacaoOportunidade(marcos, hoje);
  const direcionamentos = normalizarDirecionamentos(fonte.direcionamento);
  const titulo = normalizarTextoOportunidade(fonte.titulo);
  const instituicao = normalizarTextoOportunidade(fonte.instituicao);
  const descricao = normalizarTextoOportunidade(fonte.descricao);
  const publicoAlvo = normalizarTextoOportunidade(fonte.publicoAlvo);
  const direcionamentoTexto = descreverDirecionamentoOportunidade(direcionamentos.map(
    ({ segmento, anosSeries }) => ({
      segmento,
      anosSeries: anosSeries ?? undefined,
    }),
  ));
  const proximoMarco = obterProximoMarcoOportunidade(marcos, hoje) as OportunidadeMarcoView | undefined;
  const ultimoMarco = obterUltimoMarcoOportunidade(marcos) as OportunidadeMarcoView;
  const anchorId = getOportunidadeAnchorId(id);

  return {
    ...fonte,
    id,
    titulo,
    instituicao,
    descricao,
    publicoAlvo,
    local: fonte.local ? normalizarTextoOportunidade(fonte.local) : undefined,
    condicaoUso: fonte.condicaoUso
      ? normalizarTextoOportunidade(fonte.condicaoUso)
      : undefined,
    anchorId,
    marcos,
    fonte: {
      nome: normalizarTextoOportunidade(fonte.fonte.nome),
      href: fonte.fonte.url.trim(),
    },
    direcionamentos,
    direcionamentoTexto,
    global: direcionamentos.length === 0,
    situacao,
    encerrado: situacao === 'Encerrado',
    proximoMarco,
    ultimoMarco,
    acoes: prepararAcoes(fonte, situacao, hoje),
    anos: [...new Set(marcos.map(({ data }) => data.slice(0, 4)))].sort(),
    buscaNormalizada: normalizarBuscaOportunidade([
      titulo,
      instituicao,
      descricao,
      fonte.categoria,
    ].join(' ')),
    destinoInterno: getOportunidadeHref(id),
  };
}

export function compararOportunidades(
  a: OportunidadeViewItem,
  b: OportunidadeViewItem,
): number {
  if (a.encerrado !== b.encerrado) {
    return a.encerrado ? 1 : -1;
  }

  if (a.encerrado && b.encerrado) {
    return comparePortalDates(b.ultimoMarco.data, a.ultimoMarco.data)
      || ordenacaoPtBr.compare(a.titulo, b.titulo)
      || ordenacaoPtBr.compare(a.id, b.id);
  }

  const proximoA = a.proximoMarco?.data ?? '9999-12-31';
  const proximoB = b.proximoMarco?.data ?? '9999-12-31';
  const situacaoA = a.situacao as Exclude<OportunidadeSituacao, 'Encerrado'>;
  const situacaoB = b.situacao as Exclude<OportunidadeSituacao, 'Encerrado'>;

  return comparePortalDates(proximoA, proximoB)
    || ordemSituacoesAtivas[situacaoA] - ordemSituacoesAtivas[situacaoB]
    || ordenacaoPtBr.compare(a.titulo, b.titulo)
    || ordenacaoPtBr.compare(a.id, b.id);
}

function valoresUnicosOrdenados<T extends string>(valores: readonly T[]): T[] {
  return [...new Map(
    valores.map((valor) => [normalizarBuscaOportunidade(valor), valor]),
  ).values()].sort(ordenacaoPtBr.compare);
}

function prepararOpcoes(itens: readonly OportunidadeViewItem[]): OportunidadesFilterOptions {
  const possuiGlobal = itens.some(({ global }) => global);
  const segmentos = OPORTUNIDADE_SEGMENTOS.filter((segmento) =>
    possuiGlobal
    || itens.some(({ direcionamentos }) =>
      direcionamentos.some((direcionamento) => direcionamento.segmento === segmento),
    ),
  );
  const anosSeries = segmentos.flatMap((segmento) => {
    const possuiSegmentoCompleto = possuiGlobal || itens.some(({ direcionamentos }) =>
      direcionamentos.some((direcionamento) =>
        direcionamento.segmento === segmento && direcionamento.anosSeries === null,
      ),
    );

    return OPORTUNIDADE_ANOS_SERIES[segmento]
      .filter((anoSerie) =>
        possuiSegmentoCompleto
        || itens.some(({ direcionamentos }) =>
          direcionamentos.some((direcionamento) =>
            direcionamento.segmento === segmento
            && direcionamento.anosSeries?.includes(anoSerie),
          ),
        ),
      )
      .map((valor) => ({ valor, segmento }));
  });

  return {
    categorias: OPORTUNIDADE_CATEGORIAS.filter((categoria) =>
      itens.some((item) => item.categoria === categoria),
    ),
    situacoes: OPORTUNIDADE_SITUACOES.filter((situacao) =>
      itens.some((item) => item.situacao === situacao),
    ),
    anos: [...new Set(itens.flatMap(({ anos }) => anos))].sort((a, b) => b.localeCompare(a)),
    segmentos: [...segmentos],
    anosSeries,
    instituicoes: valoresUnicosOrdenados(itens.map(({ instituicao }) => instituicao)),
  };
}

export function prepararOportunidades(
  fontes: readonly OportunidadeSource[],
  options: PrepararOportunidadesOptions = {},
): OportunidadesViewModel {
  const hoje = options.hoje ?? getPortalToday();
  const ids = new Set<string>();
  const anchors = new Set<string>();

  const itens = fontes.flatMap((fonte) => {
    const item = prepararOportunidade(fonte, hoje);

    if (ids.has(item.id) || anchors.has(item.anchorId)) {
      throw new Error(`ID ou fragmento de oportunidade duplicado: "${item.id}".`);
    }

    ids.add(item.id);
    anchors.add(item.anchorId);

    return oportunidadeEstaNaRetencao(item.marcos, item.situacao, hoje)
      ? [item]
      : [];
  }).sort(compararOportunidades);

  return {
    itens,
    opcoes: prepararOpcoes(itens),
  };
}

type OportunidadeEntry = Pick<CollectionEntry<'oportunidades'>, 'id' | 'data'>;

export async function getOportunidadesViewModel(
  options: PrepararOportunidadesOptions = {},
): Promise<OportunidadesViewModel> {
  if (Object.keys(oportunidadeSources).length === 0) {
    return prepararOportunidades([], options);
  }

  const entradas = await getCollection('oportunidades');

  return prepararOportunidades(entradas.map((entrada: OportunidadeEntry) => ({
    id: entrada.id,
    ...entrada.data,
  })), options);
}
