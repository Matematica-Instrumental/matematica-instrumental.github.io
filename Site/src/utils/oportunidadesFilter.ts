import type {
  OportunidadeDirecionamentoView,
} from './oportunidades';

const OPORTUNIDADE_ANOS_SERIES_FILTRO = {
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

export const OPORTUNIDADE_FILTER_NAMES = [
  'busca',
  'categoria',
  'situacao',
  'ano',
  'segmento',
  'anoSerie',
  'instituicao',
] as const;

export type OportunidadeFilterName = (typeof OPORTUNIDADE_FILTER_NAMES)[number];
export type OportunidadeFilterValues = Record<OportunidadeFilterName, string>;

export interface OportunidadeFilterable {
  buscaNormalizada: string;
  categoria: string;
  situacao: string;
  anos: readonly string[];
  global: boolean;
  direcionamentos: readonly OportunidadeDirecionamentoView[];
  instituicao: string;
}

export function normalizarFiltroOportunidade(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export function possuiFiltroOportunidadeAtivo(
  filters: OportunidadeFilterValues,
): boolean {
  return Object.values(filters).some((value) => value.trim() !== '');
}

export function anoSerieOportunidadeDisponivelParaSegmento(
  segmentoSelecionado: string,
  segmentoDaOpcao: string,
): boolean {
  return !segmentoSelecionado || segmentoSelecionado === segmentoDaOpcao;
}

function obterSegmentoDoAnoSerie(anoSerie: string): string {
  if (!anoSerie) {
    return '';
  }

  return Object.entries(OPORTUNIDADE_ANOS_SERIES_FILTRO).find(([, anosSeries]) =>
    (anosSeries as readonly string[]).includes(anoSerie),
  )?.[0] ?? '';
}

function correspondeAoDirecionamento(
  oportunidade: OportunidadeFilterable,
  segmento: string,
  anoSerie: string,
): boolean {
  if (!segmento && !anoSerie) {
    return true;
  }

  if (oportunidade.global) {
    return true;
  }

  const segmentoAlvo = segmento || obterSegmentoDoAnoSerie(anoSerie);
  const direcionamentos = segmentoAlvo
    ? oportunidade.direcionamentos.filter(
        (direcionamento) => direcionamento.segmento === segmentoAlvo,
      )
    : oportunidade.direcionamentos;

  if (direcionamentos.length === 0) {
    return false;
  }

  return !anoSerie || direcionamentos.some(
    ({ anosSeries }) => anosSeries === null
      || (anosSeries as readonly string[]).includes(anoSerie),
  );
}

export function oportunidadeCorrespondeAosFiltros(
  oportunidade: OportunidadeFilterable,
  filters: OportunidadeFilterValues,
): boolean {
  const busca = normalizarFiltroOportunidade(filters.busca);

  return (!busca || oportunidade.buscaNormalizada.includes(busca))
    && (!filters.categoria || oportunidade.categoria === filters.categoria)
    && (!filters.situacao || oportunidade.situacao === filters.situacao)
    && (!filters.ano || oportunidade.anos.includes(filters.ano))
    && correspondeAoDirecionamento(
      oportunidade,
      filters.segmento,
      filters.anoSerie,
    )
    && (!filters.instituicao || oportunidade.instituicao === filters.instituicao);
}
