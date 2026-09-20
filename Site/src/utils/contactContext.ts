export const GENERAL_CONTACT_TECHNICAL_VALUE = 'contato-geral';
export const GENERAL_CONTACT_DISPLAY_VALUE = 'Não se aplica / contato geral';

export interface ContactTurmaOption {
  slug: string;
  nomeExibicao: string;
}

export interface ResolvedContactContext {
  technicalValue: string;
  displayValue: string;
  turmaSlug: string | null;
}

const GENERAL_CONTACT_CONTEXT: ResolvedContactContext = Object.freeze({
  technicalValue: GENERAL_CONTACT_TECHNICAL_VALUE,
  displayValue: GENERAL_CONTACT_DISPLAY_VALUE,
  turmaSlug: null,
});

export function resolveContactContext(
  options: readonly ContactTurmaOption[],
  rawSlug: string | null | undefined,
): ResolvedContactContext {
  const slug = rawSlug?.trim() ?? '';

  if (!slug) {
    return GENERAL_CONTACT_CONTEXT;
  }

  const turma = options.find((option) => option.slug === slug);

  if (!turma) {
    return GENERAL_CONTACT_CONTEXT;
  }

  return {
    technicalValue: turma.slug,
    displayValue: turma.nomeExibicao,
    turmaSlug: turma.slug,
  };
}
