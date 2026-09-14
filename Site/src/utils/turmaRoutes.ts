export interface TurmaRouteData {
  segmento: string;
  anoSerie: string;
  slug: string;
}

export const TURMA_VIEWS = [
  { id: 'inicio', label: 'Início da turma', slug: null },
  { id: 'cronogramas', label: 'Cronogramas', slug: 'cronogramas' },
  {
    id: 'atividades',
    label: 'Atividades e listas',
    slug: 'atividades-e-listas',
  },
  { id: 'paraEstudar', label: 'Para estudar', slug: 'para-estudar' },
  { id: 'trabalhos', label: 'Trabalhos', slug: 'trabalhos' },
  { id: 'materiais', label: 'Materiais', slug: 'materiais' },
  { id: 'videos', label: 'Vídeos', slug: 'videos' },
  { id: 'links', label: 'Links', slug: 'links' },
] as const;

export type TurmaView = (typeof TURMA_VIEWS)[number];
export type TurmaViewId = TurmaView['id'];
export type TurmaViewLabel = TurmaView['label'];
export type TurmaInternalView = Exclude<TurmaView, { slug: null }>;
export type TurmaInternalViewSlug = TurmaInternalView['slug'];

export const TURMA_INTERNAL_VIEWS = TURMA_VIEWS.filter(
  (view): view is TurmaInternalView => view.slug !== null,
);

export interface TurmaRouteParams {
  segmento: string;
  anoSerie: string;
  turma: string;
}

export function normalizeTurmaRouteSegment(value: string): string {
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

function validateTurmaSlug(slug: string): string {
  if (normalizeTurmaRouteSegment(slug) !== slug) {
    throw new Error(
      `O slug de turma "${slug}" deve estar em minúsculas, sem acentos e em kebab-case.`,
    );
  }

  return slug;
}

export function getTurmaRouteParams(
  turma: TurmaRouteData,
): TurmaRouteParams {
  return {
    segmento: normalizeTurmaRouteSegment(turma.segmento),
    anoSerie: normalizeTurmaRouteSegment(turma.anoSerie),
    turma: validateTurmaSlug(turma.slug),
  };
}

export function getTurmaCanonicalPath(turma: TurmaRouteData): string {
  const params = getTurmaRouteParams(turma);

  return `/turmas/${params.segmento}/${params.anoSerie}/${params.turma}/`;
}

export function getTurmaViewCanonicalPath(
  turma: TurmaRouteData,
  viewId: TurmaViewId,
): string {
  const basePath = getTurmaCanonicalPath(turma);
  const view = TURMA_VIEWS.find(({ id }) => id === viewId);

  if (!view) {
    throw new Error(`Visão de turma desconhecida: "${viewId}".`);
  }

  return view.slug ? `${basePath}${view.slug}/` : basePath;
}

export function applyAstroBaseUrl(pathname: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const baseWithLeadingSlash = baseUrl.startsWith('/')
    ? baseUrl
    : `/${baseUrl}`;
  const normalizedBase = baseWithLeadingSlash.endsWith('/')
    ? baseWithLeadingSlash
    : `${baseWithLeadingSlash}/`;

  return `${normalizedBase}${pathname.replace(/^\/+/, '')}`;
}

export function getTurmaHref(turma: TurmaRouteData): string {
  return applyAstroBaseUrl(getTurmaCanonicalPath(turma));
}

export function getTurmaViewHref(
  turma: TurmaRouteData,
  viewId: TurmaViewId,
): string {
  return applyAstroBaseUrl(getTurmaViewCanonicalPath(turma, viewId));
}

export function getTurmaContactHref(turma: TurmaRouteData): string {
  const contactHref = applyAstroBaseUrl('/falar-com-o-professor/');
  const turmaSlug = validateTurmaSlug(turma.slug);

  return `${contactHref}?turma=${encodeURIComponent(turmaSlug)}`;
}
