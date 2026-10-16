import { getCollection, type CollectionEntry } from 'astro:content';
import {
  assertContentIntegrity,
  type ContentReferenceIntegrityRecord,
} from './contentIntegrity';

const videoSources = import.meta.glob('../content/videos/**/*.{yml,yaml}');
const avisoSources = import.meta.glob('../content/avisos/**/*.{yml,yaml}');
const regimeLetivoSources = import.meta.glob('../content/regimes-letivos/**/*.{yml,yaml}');
const periodoLetivoSources = import.meta.glob('../content/periodos-letivos/**/*.{yml,yaml}');
const itemCronogramaSources = import.meta.glob('../content/itens-cronograma/**/*.{yml,yaml}');
const atividadeListaSources = import.meta.glob('../content/atividades-listas/**/*.{yml,yaml}');
const paraEstudarSources = import.meta.glob('../content/para-estudar/**/*.{yml,yaml}');
const trabalhoSources = import.meta.glob('../content/trabalhos/**/*.{yml,yaml}');
const materialSources = import.meta.glob('../content/materiais/**/*.{yml,yaml}');
const linkSources = import.meta.glob('../content/links/**/*.{yml,yaml}');
const provaSources = import.meta.glob('../content/provas/**/*.{yml,yaml}');
const oportunidadeSources = import.meta.glob('../content/oportunidades/**/*.{yml,yaml}');
const matematicaAlemSources = import.meta.glob('../content/matematica-alem/**/*.{yml,yaml}');

function optionalCollection<K extends keyof App.ContentEntryMap>(
  collection: K,
  sources: Record<string, unknown>,
): Promise<Array<CollectionEntry<K>>> {
  return Object.keys(sources).length > 0
    ? getCollection(collection)
    : Promise.resolve([]);
}

function getReferenceId(reference: unknown): string {
  if (typeof reference === 'string') {
    return reference;
  }

  if (
    reference
    && typeof reference === 'object'
    && 'id' in reference
    && typeof reference.id === 'string'
  ) {
    return reference.id;
  }

  return '';
}

function appendEntryReferences(
  output: ContentReferenceIntegrityRecord[],
  sourceCollection: string,
  entries: ReadonlyArray<{ id: string; data: unknown }>,
  field: string,
  targetCollection: string,
): void {
  for (const entry of entries) {
    if (!entry.data || typeof entry.data !== 'object' || !(field in entry.data)) {
      continue;
    }

    const value = entry.data[field as keyof typeof entry.data];
    const values = Array.isArray(value) ? value : [value];

    values.forEach((reference, index) => {
      const targetId = getReferenceId(reference);

      if (targetId) {
        output.push({
          sourceCollection,
          sourceId: entry.id,
          field: Array.isArray(value) ? `${field}[${index}]` : field,
          targetCollection,
          targetId,
        });
      }
    });
  }
}

let currentContentIntegrityPromise: Promise<void> | undefined;

export function assertCurrentContentIntegrity(): Promise<void> {
  currentContentIntegrityPromise ??= (async () => {
    const [
      turmas,
      videos,
      avisos,
      regimesLetivos,
      periodosLetivos,
      itensCronograma,
      atividadesListas,
      paraEstudar,
      trabalhos,
      materiais,
      links,
      provas,
      oportunidades,
      matematicaAlem,
    ] = await Promise.all([
      getCollection('turmas'),
      optionalCollection('videos', videoSources),
      optionalCollection('avisos', avisoSources),
      optionalCollection('regimesLetivos', regimeLetivoSources),
      optionalCollection('periodosLetivos', periodoLetivoSources),
      optionalCollection('itensCronograma', itemCronogramaSources),
      optionalCollection('atividadesListas', atividadeListaSources),
      optionalCollection('paraEstudar', paraEstudarSources),
      optionalCollection('trabalhos', trabalhoSources),
      optionalCollection('materiais', materialSources),
      optionalCollection('links', linkSources),
      optionalCollection('provas', provaSources),
      optionalCollection('oportunidades', oportunidadeSources),
      optionalCollection('matematicaAlem', matematicaAlemSources),
    ]);
    const entriesByCollection = {
      turmas,
      videos,
      avisos,
      regimesLetivos,
      periodosLetivos,
      itensCronograma,
      atividadesListas,
      paraEstudar,
      trabalhos,
      materiais,
      links,
      provas,
      oportunidades,
      matematicaAlem,
    };
    const knownIds = Object.fromEntries(
      Object.entries(entriesByCollection).map(([collection, entries]) => [
        collection,
        entries.map(({ id }) => id),
      ]),
    );
    const declaredIds = {
      'turmas.data.id': turmas.map(({ data }) => data.id),
      'videos.data.id': videos.map(({ data }) => data.id),
      'regimesLetivos.data.id': regimesLetivos.map(({ data }) => data.id),
      'periodosLetivos.data.id': periodosLetivos.map(({ data }) => data.id),
      'itensCronograma.data.id': itensCronograma.map(({ data }) => data.id),
      'atividadesListas.data.id': atividadesListas.map(({ data }) => data.id),
      'paraEstudar.data.id': paraEstudar.map(({ data }) => data.id),
      'trabalhos.data.id': trabalhos.map(({ data }) => data.id),
      'materiais.data.id': materiais.map(({ data }) => data.id),
      'links.data.id': links.map(({ data }) => data.id),
    };
    const references: ContentReferenceIntegrityRecord[] = [];

    appendEntryReferences(references, 'videos', videos, 'turmas', 'turmas');
    appendEntryReferences(references, 'avisos', avisos, 'turmas', 'turmas');
    appendEntryReferences(references, 'regimesLetivos', regimesLetivos, 'turmas', 'turmas');
    appendEntryReferences(references, 'itensCronograma', itensCronograma, 'turmas', 'turmas');
    appendEntryReferences(references, 'atividadesListas', atividadesListas, 'turmas', 'turmas');
    appendEntryReferences(references, 'atividadesListas', atividadesListas, 'videosRelacionados', 'videos');
    appendEntryReferences(references, 'paraEstudar', paraEstudar, 'turmas', 'turmas');
    appendEntryReferences(references, 'paraEstudar', paraEstudar, 'videosRelacionados', 'videos');
    appendEntryReferences(references, 'trabalhos', trabalhos, 'turmas', 'turmas');
    appendEntryReferences(references, 'materiais', materiais, 'turmas', 'turmas');
    appendEntryReferences(references, 'links', links, 'turmas', 'turmas');

    assertContentIntegrity({
      turmas: turmas.map(({ id, data }) => ({
        id,
        slug: data.slug,
        segmento: data.segmento,
        anoSerie: data.anoSerie,
        anoLetivo: data.anoLetivo,
      })),
      regimesLetivos: regimesLetivos.map(({ id, data }) => ({
        id,
        anoLetivo: data.anoLetivo,
        tipo: data.tipo,
      })),
      periodosLetivos: periodosLetivos.map(({ id, data }) => ({
        id,
        regimeLetivoId: getReferenceId(data.regimeLetivo),
        dataInicial: data.dataInicial,
        dataFinal: data.dataFinal,
        ordem: data.ordem,
      })),
      itensCronograma: itensCronograma.map(({ id, data }) => ({
        id,
        periodoLetivoId: getReferenceId(data.periodoLetivo),
      })),
      knownIds: { ...knownIds, ...declaredIds },
      references,
    });
  })();

  return currentContentIntegrityPromise;
}
