export const PROVA_FILTER_NAMES = [
  'busca',
  'segmento',
  'anoSerie',
  'instituicao',
  'ano',
  'tipo',
  'fase',
  'assunto',
  'dificuldade',
] as const;

export type ProvaFilterName = (typeof PROVA_FILTER_NAMES)[number];
export type ProvaFilterValues = Record<ProvaFilterName, string>;

export interface ProvaFilterable {
  buscaNormalizada: string;
  segmento: string;
  anoSerie: string;
  instituicao: string;
  ano: string;
  tipo: string;
  fase: string;
  assuntosNormalizados: readonly string[];
  dificuldade: string;
}

export function normalizarFiltroProva(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export function possuiFiltroProvaAtivo(filters: ProvaFilterValues): boolean {
  return Object.values(filters).some((value) => value.trim() !== '');
}

export function anoSerieDisponivelParaSegmento(
  segmentoSelecionado: string,
  segmentoDaOpcao: string,
): boolean {
  return !segmentoSelecionado || segmentoSelecionado === segmentoDaOpcao;
}

export function provaCorrespondeAosFiltros(
  prova: ProvaFilterable,
  filters: ProvaFilterValues,
): boolean {
  const busca = normalizarFiltroProva(filters.busca);
  const assunto = normalizarFiltroProva(filters.assunto);

  return (!busca || prova.buscaNormalizada.includes(busca))
    && (!filters.segmento || prova.segmento === filters.segmento)
    && (!filters.anoSerie || prova.anoSerie === filters.anoSerie)
    && (!filters.instituicao || prova.instituicao === filters.instituicao)
    && (!filters.ano || prova.ano === filters.ano)
    && (!filters.tipo || prova.tipo === filters.tipo)
    && (!filters.fase || prova.fase === filters.fase)
    && (!assunto || prova.assuntosNormalizados.includes(assunto))
    && (!filters.dificuldade || prova.dificuldade === filters.dificuldade);
}
