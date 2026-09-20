import { getCollection, type CollectionEntry } from 'astro:content';
import { applyAstroBaseUrl } from './turmaRoutes';

const provaSources = import.meta.glob(
  '../content/provas/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);

export const PROVA_SEGMENTOS = [
  'Ensino Fundamental — Anos Finais',
  'Ensino Médio',
] as const;

export const PROVA_ANOS_SERIES = {
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

export const PROVA_TIPOS = [
  'ENEM',
  'Vestibular',
  'Concurso',
  'Processo seriado',
  'Olimpíada',
  'Avaliação institucional',
] as const;

export const PROVA_DIFICULDADES = [
  'Básica',
  'Intermediária',
  'Avançada',
] as const;

export type ProvaSegmento = (typeof PROVA_SEGMENTOS)[number];
export type ProvaAnoSerie = (typeof PROVA_ANOS_SERIES)[ProvaSegmento][number];
export type ProvaTipo = (typeof PROVA_TIPOS)[number];
export type ProvaDificuldade = (typeof PROVA_DIFICULDADES)[number];

export interface ProvaRecursoSource {
  nome: string;
  url: string;
}

export interface ProvaSource {
  id: string;
  titulo: string;
  ano: number;
  segmento: ProvaSegmento;
  anoSerie: ProvaAnoSerie;
  tipo: ProvaTipo;
  instituicao: string;
  assuntos: readonly string[];
  prova: ProvaRecursoSource;
  fonte: ProvaRecursoSource;
  fase?: string;
  dificuldade?: ProvaDificuldade;
  descricao?: string;
  resolucao?: ProvaRecursoSource;
  condicaoUso?: string;
  tags?: readonly string[];
}

export interface ProvaRecursoView {
  nome: string;
  href: string;
  externo: boolean;
}

export interface ProvaViewItem extends Omit<
  ProvaSource,
  'prova' | 'fonte' | 'resolucao' | 'tags'
> {
  prova: ProvaRecursoView;
  fonte: ProvaRecursoView;
  resolucao?: ProvaRecursoView;
  tags: string[];
  buscaNormalizada: string;
  assuntosNormalizados: string[];
}

export interface ProvaAnoSerieOption {
  valor: ProvaAnoSerie;
  segmento: ProvaSegmento;
}

export interface ProvasFilterOptions {
  segmentos: ProvaSegmento[];
  anosSeries: ProvaAnoSerieOption[];
  instituicoes: string[];
  anos: number[];
  tipos: ProvaTipo[];
  fases: string[];
  assuntos: string[];
  dificuldades: ProvaDificuldade[];
}

export interface ProvasViewModel {
  itens: ProvaViewItem[];
  opcoes: ProvasFilterOptions;
}

const ordenacaoPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  sensitivity: 'base',
});

const ordenacaoNaturalPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  sensitivity: 'base',
  numeric: true,
});

export function normalizarTextoProva(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizarBuscaProva(value: string): string {
  return normalizarTextoProva(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

function valoresUnicosOrdenados<T extends string>(valores: readonly T[]): T[] {
  return [...new Map(
    valores.map((valor) => [normalizarBuscaProva(valor), valor]),
  ).values()].sort(ordenacaoPtBr.compare);
}

function prepararRecurso(recurso: ProvaRecursoSource): ProvaRecursoView {
  const nome = normalizarTextoProva(recurso.nome);
  const url = recurso.url.trim();
  const externo = /^https?:\/\//i.test(url);

  return {
    nome,
    href: externo ? url : applyAstroBaseUrl(url),
    externo,
  };
}

function validarRelacaoSegmentoAnoSerie(prova: ProvaSource): void {
  const anosSeries = PROVA_ANOS_SERIES[prova.segmento] as readonly string[];

  if (!anosSeries.includes(prova.anoSerie)) {
    throw new Error(
      `A prova "${prova.id}" usa Ano/Série incompatível com o Segmento.`,
    );
  }
}

function normalizarLista(valores: readonly string[]): string[] {
  return valoresUnicosOrdenados(valores.map(normalizarTextoProva));
}

function compararProvas(a: ProvaViewItem, b: ProvaViewItem): number {
  return b.ano - a.ano
    || PROVA_SEGMENTOS.indexOf(a.segmento)
      - PROVA_SEGMENTOS.indexOf(b.segmento)
    || ordenacaoNaturalPtBr.compare(a.anoSerie, b.anoSerie)
    || ordenacaoPtBr.compare(a.tipo, b.tipo)
    || ordenacaoPtBr.compare(a.titulo, b.titulo)
    || ordenacaoPtBr.compare(a.id, b.id);
}

function prepararItem(prova: ProvaSource): ProvaViewItem {
  validarRelacaoSegmentoAnoSerie(prova);

  const assuntos = normalizarLista(prova.assuntos);

  if (assuntos.length === 0) {
    throw new Error(`A prova "${prova.id}" deve possuir ao menos um assunto.`);
  }

  const titulo = normalizarTextoProva(prova.titulo);
  const instituicao = normalizarTextoProva(prova.instituicao);
  const fase = prova.fase
    ? normalizarTextoProva(prova.fase)
    : undefined;
  const descricao = prova.descricao
    ? normalizarTextoProva(prova.descricao)
    : undefined;
  const condicaoUso = prova.condicaoUso
    ? normalizarTextoProva(prova.condicaoUso)
    : undefined;
  const tags = prova.tags ? normalizarLista(prova.tags) : [];
  const buscaNormalizada = normalizarBuscaProva([
    titulo,
    instituicao,
    fase ?? '',
    ...assuntos,
  ].join(' '));

  return {
    ...prova,
    titulo,
    instituicao,
    assuntos,
    fase,
    descricao,
    condicaoUso,
    tags,
    prova: prepararRecurso(prova.prova),
    fonte: prepararRecurso(prova.fonte),
    resolucao: prova.resolucao
      ? prepararRecurso(prova.resolucao)
      : undefined,
    buscaNormalizada,
    assuntosNormalizados: assuntos.map(normalizarBuscaProva),
  };
}

export function prepararProvas(
  fontes: readonly ProvaSource[],
): ProvasViewModel {
  const ids = new Set<string>();

  const itens = fontes.map((fonte) => {
    const id = normalizarTextoProva(fonte.id);

    if (!id || ids.has(id)) {
      throw new Error(`ID de prova ausente ou duplicado: "${id}".`);
    }

    ids.add(id);

    return prepararItem({ ...fonte, id });
  }).sort(compararProvas);

  const segmentos = PROVA_SEGMENTOS.filter((segmento) =>
    itens.some((item) => item.segmento === segmento),
  );
  const anosSeries = segmentos.flatMap((segmento) =>
    PROVA_ANOS_SERIES[segmento]
      .filter((anoSerie) =>
        itens.some((item) =>
          item.segmento === segmento && item.anoSerie === anoSerie,
        ),
      )
      .map((valor) => ({ valor, segmento })),
  );

  return {
    itens,
    opcoes: {
      segmentos: [...segmentos],
      anosSeries,
      instituicoes: valoresUnicosOrdenados(
        itens.map(({ instituicao }) => instituicao),
      ),
      anos: [...new Set(itens.map(({ ano }) => ano))]
        .sort((a, b) => b - a),
      tipos: valoresUnicosOrdenados(itens.map(({ tipo }) => tipo)),
      fases: valoresUnicosOrdenados(
        itens.flatMap(({ fase }) => fase ? [fase] : []),
      ),
      assuntos: valoresUnicosOrdenados(
        itens.flatMap(({ assuntos }) => assuntos),
      ),
      dificuldades: PROVA_DIFICULDADES.filter((dificuldade) =>
        itens.some((item) => item.dificuldade === dificuldade),
      ),
    },
  };
}

export async function getProvasViewModel(): Promise<ProvasViewModel> {
  if (Object.keys(provaSources).length === 0) {
    return prepararProvas([]);
  }

  const entradas = await getCollection('provas');

  return prepararProvas(entradas.map((entrada: CollectionEntry<'provas'>) => ({
    id: entrada.id,
    ...entrada.data,
  })));
}
