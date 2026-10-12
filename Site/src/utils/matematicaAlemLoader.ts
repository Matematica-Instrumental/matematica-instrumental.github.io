import { getCollection } from 'astro:content';
import type { MatematicaAlemCollectionEntry } from './matematicaAlem';

const fontesMatematicaAlem = import.meta.glob(
  '../content/matematica-alem/**/*.{yml,yaml}',
  { query: '?raw', import: 'default' },
);

export async function carregarMatematicaAlem(): Promise<MatematicaAlemCollectionEntry[]> {
  return Object.keys(fontesMatematicaAlem).length > 0
    ? getCollection('matematicaAlem')
    : [];
}
