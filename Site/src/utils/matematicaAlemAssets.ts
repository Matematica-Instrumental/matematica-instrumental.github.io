import { applyAstroBaseUrl } from './turmaRoutes';

const ativosEditoriais = import.meta.glob<{ default: string }>(
  '../assets/editorial/**/*.{avif,gif,jpeg,jpg,png,svg,webp}',
  { eager: true, query: '?url' },
);

export function resolverImagemMatematicaAlem(arquivo: string): string {
  if (arquivo.startsWith('/')) {
    return applyAstroBaseUrl(arquivo);
  }

  const chave = arquivo.replace(/^src\/assets\//, '../assets/');
  const ativo = ativosEditoriais[chave]?.default;

  if (!ativo) {
    throw new Error(`Imagem editorial não encontrada: "${arquivo}".`);
  }

  return ativo;
}
