export const TIMEZONE_OFICIAL = 'America/Sao_Paulo' as const;

export const MODALIDADES_VALIDADE_AVISO = {
  SAIR_NA_DATA: 'SAIR_NA_DATA',
  SAIR_NO_DIA_SEGUINTE: 'SAIR_NO_DIA_SEGUINTE',
} as const;

export type ModalidadeValidadeAviso =
  typeof MODALIDADES_VALIDADE_AVISO[keyof typeof MODALIDADES_VALIDADE_AVISO];

export const MODALIDADE_GLOBAL_VALIDADE_AVISOS =
  MODALIDADES_VALIDADE_AVISO.SAIR_NO_DIA_SEGUINTE;

export type PortalDate = `${number}-${number}-${number}`;

const PORTAL_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return days[month - 1] ?? 0;
}

function createPortalDate(
  year: number,
  month: number,
  day: number,
): PortalDate | null {
  if (
    year < 1
    || year > 9999
    || month < 1
    || month > 12
    || day < 1
    || day > daysInMonth(year, month)
  ) {
    return null;
  }

  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function tryNormalizePortalDate(value: unknown): PortalDate | null {
  if (typeof value === 'string') {
    const match = PORTAL_DATE_PATTERN.exec(value);

    if (!match) {
      return null;
    }

    return createPortalDate(
      Number(match[1]),
      Number(match[2]),
      Number(match[3]),
    );
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    if (
      value.getUTCHours() !== 0
      || value.getUTCMinutes() !== 0
      || value.getUTCSeconds() !== 0
      || value.getUTCMilliseconds() !== 0
    ) {
      return null;
    }

    // O parser YAML representa datas sem horário como meia-noite UTC.
    // Os campos UTC recuperam apenas o token civil original do arquivo.
    return createPortalDate(
      value.getUTCFullYear(),
      value.getUTCMonth() + 1,
      value.getUTCDate(),
    );
  }

  return null;
}

export function normalizePortalDate(value: unknown): PortalDate {
  const normalized = tryNormalizePortalDate(value);

  if (!normalized) {
    throw new RangeError('A data deve usar o formato civil YYYY-MM-DD, sem horário.');
  }

  return normalized;
}

const portalDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIMEZONE_OFICIAL,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function getPortalToday(referenceInstant: Date = new Date()): PortalDate {
  const parts = portalDateFormatter.formatToParts(referenceInstant);
  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return normalizePortalDate(`${values.year}-${values.month}-${values.day}`);
}

export function comparePortalDates(
  left: PortalDate,
  right: PortalDate,
): number {
  if (left === right) {
    return 0;
  }

  return left < right ? -1 : 1;
}

export function addPortalDays(
  date: PortalDate,
  days: number,
): PortalDate {
  if (!Number.isInteger(days)) {
    throw new RangeError('A quantidade de dias deve ser um número inteiro.');
  }

  const [year, month, day] = date.split('-').map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day));

  instant.setUTCDate(instant.getUTCDate() + days);

  return normalizePortalDate(instant);
}

export function avisoEstaDentroDaValidade(
  validade: PortalDate,
  hoje: PortalDate,
  modalidade: ModalidadeValidadeAviso = MODALIDADE_GLOBAL_VALIDADE_AVISOS,
): boolean {
  const comparacao = comparePortalDates(validade, hoje);

  if (modalidade === MODALIDADES_VALIDADE_AVISO.SAIR_NA_DATA) {
    return comparacao > 0;
  }

  return comparacao >= 0;
}

export function compromissoEstaVigente(
  dataPrazo: PortalDate,
  hoje: PortalDate,
): boolean {
  return comparePortalDates(dataPrazo, hoje) >= 0;
}

export function itemCronogramaEstaPassado(
  dataPrazo: PortalDate,
  hoje: PortalDate,
): boolean {
  return comparePortalDates(dataPrazo, hoje) < 0;
}

export function periodoLetivoEstaCorrente(
  dataInicial: PortalDate,
  dataFinal: PortalDate,
  hoje: PortalDate,
): boolean {
  return comparePortalDates(dataInicial, hoje) <= 0
    && comparePortalDates(hoje, dataFinal) <= 0;
}

export function gabaritoResolucaoEstaDisponivel(
  dataLiberacao: PortalDate | undefined,
  hoje: PortalDate,
): boolean {
  return dataLiberacao === undefined
    || comparePortalDates(dataLiberacao, hoje) <= 0;
}

export function paraEstudarEstaAtenuado(
  dataObjetivo: PortalDate | undefined,
  hoje: PortalDate,
): boolean {
  return dataObjetivo !== undefined
    && comparePortalDates(dataObjetivo, hoje) < 0;
}

export function trabalhoEstaAtenuado(
  dataMarco: PortalDate,
  hoje: PortalDate,
): boolean {
  return comparePortalDates(dataMarco, hoje) < 0;
}
