import type { CollectionEntry } from 'astro:content';
import {
  comparePortalDates,
  type PortalDate,
} from './portalDate';

export const CATEGORIAS_MATEMATICA_ALEM = [
  'Curiosidades',
  'História da Matemática',
  'Personalidades',
  'Matemática no cotidiano',
  'Aplicações',
  'Desafios',
  'Vídeos',
  'Leituras',
  'Sites e recursos',
] as const;

export type CategoriaMatematicaAlem = typeof CATEGORIAS_MATEMATICA_ALEM[number];
export type OrigemMatematicaAlem = 'Autoral' | 'Curadoria';
export type RotuloAcaoMatematicaAlem =
  | 'Saiba mais'
  | 'Ver fonte'
  | 'Assistir'
  | 'Acessar conteúdo';

export interface FonteMatematicaAlem {
  nome: string;
  url: string;
}

export interface ImagemMatematicaAlem {
  arquivo: string;
  alt: string;
  credito: string;
  direito: 'Própria' | 'Domínio público' | 'Licenciada';
  licenca: string;
  fonteUrl?: string;
  licencaUrl?: string;
}

export interface MatematicaAlemData {
  titulo: string;
  categoria: CategoriaMatematicaAlem;
  resumo: string;
  texto: string;
  publicacao: PortalDate;
  origem: OrigemMatematicaAlem;
  autoria: string;
  fontes?: FonteMatematicaAlem[];
  imagem?: ImagemMatematicaAlem;
  acao?: {
    rotulo: RotuloAcaoMatematicaAlem;
    url: string;
  };
  linksRelacionados?: Array<{
    titulo: string;
    url: string;
  }>;
  tags?: string[];
  destaqueNovidades?: {
    inicio: PortalDate;
    fim: PortalDate;
  };
  destaqueHome?: boolean;
  arquivado?: boolean;
}

export interface MatematicaAlemEntryLike {
  id: string;
  data: MatematicaAlemData;
}

export type MatematicaAlemCollectionEntry = Pick<
  CollectionEntry<'matematicaAlem'>,
  'id' | 'data'
>;

export interface MatematicaAlemItem extends MatematicaAlemData {
  id: string;
  anchorId: string;
  publicacaoFormatada: string;
  buscaNormalizada: string;
  imagemResolvida?: ImagemMatematicaAlem & {
    src: string;
  };
}

export interface MatematicaAlemViewModel {
  itens: MatematicaAlemItem[];
  categorias: readonly CategoriaMatematicaAlem[];
}

export interface FiltrosMatematicaAlem {
  busca: string;
  categoria: string;
}

const collatorPtBr = new Intl.Collator('pt-BR', {
  usage: 'sort',
  sensitivity: 'base',
});

const formatadorData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function normalizarBuscaMatematicaAlem(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizarSegmento(value: string): string {
  const segmento = normalizarBuscaMatematicaAlem(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

  return segmento || 'conteudo';
}

export function getMatematicaAlemAnchorId(id: string): string {
  return `conteudo-${normalizarSegmento(id)}`;
}

export function getMatematicaAlemCanonicalPath(id?: string): string {
  const caminho = '/matematica-alem-da-sala/';

  return id ? `${caminho}#${getMatematicaAlemAnchorId(id)}` : caminho;
}

function formatarPublicacao(publicacao: PortalDate): string {
  const [ano, mes, dia] = publicacao.split('-').map(Number);
  const formatada = formatadorData.format(new Date(Date.UTC(ano, mes - 1, dia)));

  return formatada.replace(/\bde\b/g, '').replace(/\s+/g, ' ').trim();
}

function compararEntradas(
  a: MatematicaAlemEntryLike,
  b: MatematicaAlemEntryLike,
): number {
  return comparePortalDates(b.data.publicacao, a.data.publicacao)
    || collatorPtBr.compare(a.data.titulo, b.data.titulo)
    || collatorPtBr.compare(a.id, b.id);
}

function criarIndiceDeBusca(data: MatematicaAlemData): string {
  return normalizarBuscaMatematicaAlem([
    data.titulo,
    data.resumo,
    data.texto,
    data.categoria,
    data.autoria,
    ...(data.fontes?.map(({ nome }) => nome) ?? []),
    ...(data.tags ?? []),
  ].join(' '));
}

export function prepararMatematicaAlem(
  entradas: readonly MatematicaAlemEntryLike[],
  resolverImagem: (arquivo: string) => string = (arquivo) => arquivo,
): MatematicaAlemViewModel {
  const itens = entradas
    .filter(({ data }) => data.arquivado !== true)
    .sort(compararEntradas)
    .map(({ id, data }): MatematicaAlemItem => ({
      ...data,
      id,
      anchorId: getMatematicaAlemAnchorId(id),
      publicacaoFormatada: formatarPublicacao(data.publicacao),
      buscaNormalizada: criarIndiceDeBusca(data),
      imagemResolvida: data.imagem
        ? { ...data.imagem, src: resolverImagem(data.imagem.arquivo) }
        : undefined,
    }));

  return {
    itens,
    categorias: CATEGORIAS_MATEMATICA_ALEM,
  };
}

export function possuiFiltroMatematicaAlemAtivo(
  filtros: FiltrosMatematicaAlem,
): boolean {
  return Boolean(filtros.busca.trim() || filtros.categoria);
}

export function conteudoMatematicaAlemCorrespondeAosFiltros(
  item: MatematicaAlemItem,
  filtros: FiltrosMatematicaAlem,
): boolean {
  const busca = normalizarBuscaMatematicaAlem(filtros.busca);

  return (!busca || item.buscaNormalizada.includes(busca))
    && (!filtros.categoria || item.categoria === filtros.categoria);
}

export function selecionarDestaquesHomeMatematicaAlem(
  entradas: readonly MatematicaAlemEntryLike[],
  limite = 3,
  resolverImagem: (arquivo: string) => string = (arquivo) => arquivo,
): MatematicaAlemItem[] {
  if (!Number.isInteger(limite) || limite < 0) {
    throw new RangeError('O limite de destaques da Home deve ser um inteiro não negativo.');
  }

  const elegiveis = entradas.filter(({ data }) => (
    data.destaqueHome === true && data.arquivado !== true
  ));

  return prepararMatematicaAlem(elegiveis, resolverImagem).itens.slice(0, limite);
}
