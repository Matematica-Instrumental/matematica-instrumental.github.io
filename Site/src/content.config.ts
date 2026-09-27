import { defineCollection, reference } from 'astro:content';
import { glob, type Loader, type LoaderContext } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  comparePortalDates,
  normalizePortalDate,
  tryNormalizePortalDate,
} from './utils/portalDate';

const segmentoSchema = z.enum([
  'Ensino Fundamental — Anos Finais',
  'Ensino Médio',
]);

const anoSerieProvaSchema = z.enum([
  '6º ano',
  '7º ano',
  '8º ano',
  '9º ano',
  '1º ano',
  '2º ano',
  '3º ano',
]);

const tipoProvaSchema = z.enum([
  'ENEM',
  'Vestibular',
  'Concurso',
  'Processo seriado',
  'Olimpíada',
  'Avaliação institucional',
]);

const dificuldadeProvaSchema = z.enum([
  'Básica',
  'Intermediária',
  'Avançada',
]);

const categoriaOportunidadeSchema = z.enum([
  'ENEM',
  'Vestibular',
  'CEFET/Instituto Federal',
  'Processo seriado',
  'Concurso',
  'Olimpíada',
  'Evento',
]);

const tipoMarcoOportunidadeSchema = z.enum([
  'Abertura de inscrições',
  'Encerramento de inscrições',
  'Realização',
  'Divulgação de resultado',
]);

const textoObrigatorioSchema = z.string().trim().min(1);

const urlRecursoProvaSchema = z.string().trim().refine((value) => {
  if (/^\/(?!\/)/.test(value)) {
    return true;
  }

  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}, {
  message: 'Use uma URL HTTP(S) válida ou um caminho interno iniciado por /.',
});

const recursoProvaSchema = z.strictObject({
  nome: textoObrigatorioSchema,
  url: urlRecursoProvaSchema,
});

const httpUrlSchema = z.string().trim().refine((value) => {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}, {
  message: 'Use uma URL HTTP(S) válida.',
});

const portalDateSchema = z
  .union([z.string(), z.date()])
  .refine((value) => tryNormalizePortalDate(value) !== null, {
    message: 'Use uma data civil válida no formato YYYY-MM-DD, sem horário.',
  })
  .transform((value) => normalizePortalDate(value));

const recursoVinculadoSchema = z.strictObject({
  nome: z.string(),
  url: z.url(),
});

const classificacaoMatematicaSchema = z.strictObject({
  area: z.string(),
  subarea: z.string(),
  conteudo: z.string(),
});

const marcoTrabalhoSchema = z.strictObject({
  tipo: z.enum(['Entrega', 'Apresentação']),
  data: portalDateSchema,
});

const destaqueNovidadesSchema = z
  .strictObject({
    inicio: portalDateSchema,
    fim: portalDateSchema,
  })
  .superRefine(({ inicio, fim }, context) => {
    if (comparePortalDates(fim, inicio) < 0) {
      context.addIssue({
        code: 'custom',
        path: ['fim'],
        message: 'O fim de destaqueNovidades deve ser igual ou posterior ao início.',
      });
    }
  });

const marcoOportunidadeSchema = z.strictObject({
  tipo: tipoMarcoOportunidadeSchema,
  rotulo: textoObrigatorioSchema,
  data: portalDateSchema,
});

const fonteOportunidadeSchema = z.strictObject({
  nome: textoObrigatorioSchema,
  url: httpUrlSchema,
});

const direcionamentoOportunidadeSchema = z.strictObject({
  segmento: segmentoSchema,
  anosSeries: z.array(anoSerieProvaSchema).min(1).optional(),
}).superRefine(({ segmento, anosSeries }, context) => {
  if (!anosSeries) {
    return;
  }

  const permitidos = segmento === 'Ensino Fundamental — Anos Finais'
    ? ['6º ano', '7º ano', '8º ano', '9º ano']
    : ['1º ano', '2º ano', '3º ano'];

  anosSeries.forEach((anoSerie, index) => {
    if (!permitidos.includes(anoSerie)) {
      context.addIssue({
        code: 'custom',
        path: ['anosSeries', index],
        message: `O Ano/Série "${anoSerie}" não pertence ao Segmento "${segmento}".`,
      });
    }
  });

  if (new Set(anosSeries).size !== anosSeries.length) {
    context.addIssue({
      code: 'custom',
      path: ['anosSeries'],
      message: 'Não repita Ano/Série no mesmo direcionamento.',
    });
  }
});

function optionalYamlGlob(base: string): Loader {
  const loader = glob({
    base,
    pattern: '**/*.{yml,yaml}',
  });

  return {
    ...loader,
    name: `optional-yaml-glob:${base}`,
    async load(context: LoaderContext) {
      const logger = new Proxy(context.logger, {
        get(target, property) {
          if (property === 'warn') {
            return (message: string) => {
              if (!message.startsWith('No files found matching')) {
                target.warn(message);
              }
            };
          }

          const value = Reflect.get(target, property, target);

          return typeof value === 'function' ? value.bind(target) : value;
        },
      });
      const loaderContext = new Proxy(context, {
        get(target, property, receiver) {
          if (property === 'logger') {
            return logger;
          }

          return Reflect.get(target, property, receiver);
        },
      });

      context.store.clear();
      await loader.load(loaderContext);
    },
  };
}

const turmas = defineCollection({
  loader: glob({
    base: './src/content/turmas',
    pattern: '**/*.{yml,yaml}',
  }),
  schema: z.object({
    id: z.string(),
    nome: z.string(),
    slug: z.string(),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turma: z.string(),
    anoLetivo: z.number().int(),
    descricao: z.string(),
    arquivada: z.boolean().optional(),
    ordem: z.number().int(),
  }),
});

const videos = defineCollection({
  loader: optionalYamlGlob('./src/content/videos'),
  schema: z.strictObject({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string(),
    url: z.url(),
    provedor: z.enum(['YouTube', 'Vimeo', 'Outro']),
    miniaturaUrl: z.url(),
    duracaoSegundos: z.number().int().positive(),
    prioridade: z.enum([
      'Essencial',
      'Recomendado',
      'Complementar',
    ]),
    classificacoes: z.array(classificacaoMatematicaSchema).min(1),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1).optional(),
    tags: z.array(z.string()),
    publicacao: portalDateSchema,
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const avisos = defineCollection({
  loader: optionalYamlGlob('./src/content/avisos'),
  schema: z.object({
    titulo: z.string(),
    texto: z.string(),
    publico: z.string(),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1),
    publicacao: portalDateSchema,
    validade: portalDateSchema,
    prioridade: z.enum(['Novo', 'Atenção', 'Destaque']),
  }),
});

const regimesLetivos = defineCollection({
  loader: optionalYamlGlob('./src/content/regimes-letivos'),
  schema: z.object({
    id: z.string(),
    nome: z.string(),
    anoLetivo: z.number().int(),
    tipo: z.enum(['bimestral', 'trimestral', 'semestral']),
    turmas: z.array(reference('turmas')).min(1).optional(),
  }),
});

const periodosLetivos = defineCollection({
  loader: optionalYamlGlob('./src/content/periodos-letivos'),
  schema: z.object({
    id: z.string(),
    regimeLetivo: reference('regimesLetivos'),
    nome: z.string(),
    dataInicial: portalDateSchema,
    dataFinal: portalDateSchema,
    valorTotalEtapa: z.number().nonnegative(),
    ordem: z.number().int(),
  }),
});

const itensCronograma = defineCollection({
  loader: optionalYamlGlob('./src/content/itens-cronograma'),
  schema: z.object({
    id: z.string(),
    periodoLetivo: reference('periodosLetivos'),
    turmas: z.array(reference('turmas')).min(1),
    dataPrazo: portalDateSchema,
    tipo: z.string(),
    descricaoConteudo: z.string(),
    valorIndividual: z.number().nonnegative().optional(),
    publicacao: portalDateSchema.optional(),
    ordem: z.number().int().optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const atividadesListas = defineCollection({
  loader: optionalYamlGlob('./src/content/atividades-listas'),
  schema: z.object({
    id: z.string(),
    tipo: z.enum(['Atividade', 'Lista de exercícios']),
    titulo: z.string(),
    descricao: z.string().optional(),
    assunto: z.string(),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1),
    publicacao: portalDateSchema,
    prazo: portalDateSchema.optional(),
    recursos: z.array(recursoVinculadoSchema).min(1),
    videosRelacionados: z.array(reference('videos')).min(1).optional(),
    tags: z.array(z.string()),
    gabaritoResolucao: z.array(recursoVinculadoSchema).min(1).optional(),
    dataLiberacaoGabarito: portalDateSchema.optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const paraEstudar = defineCollection({
  loader: optionalYamlGlob('./src/content/para-estudar'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    objetivo: z.string(),
    tipoObjetivo: z.string().optional(),
    dataObjetivo: portalDateSchema.optional(),
    resumoOrientacao: z.string(),
    assunto: z.string(),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1),
    recursos: z.array(recursoVinculadoSchema).min(1),
    videosRelacionados: z.array(reference('videos')).min(1).optional(),
    leiturasRelacionadas: z.array(recursoVinculadoSchema).min(1).optional(),
    tags: z.array(z.string()),
    publicacao: portalDateSchema,
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const trabalhos = defineCollection({
  loader: optionalYamlGlob('./src/content/trabalhos'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string().optional(),
    assunto: z.string(),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1),
    publicacao: portalDateSchema,
    marco: marcoTrabalhoSchema,
    documentoTrabalho: recursoVinculadoSchema,
    recursosAdicionais: z.array(recursoVinculadoSchema).min(1).optional(),
    tags: z.array(z.string()),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const materiais = defineCollection({
  loader: optionalYamlGlob('./src/content/materiais'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string().optional(),
    tipo: z.string(),
    classificacoes: z.array(classificacaoMatematicaSchema).min(1),
    publicacao: portalDateSchema,
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1),
    arquivoLink: recursoVinculadoSchema,
    tags: z.array(z.string()).optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const links = defineCollection({
  loader: optionalYamlGlob('./src/content/links'),
  schema: z.strictObject({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string(),
    url: z.url(),
    finalidade: z.string().trim().min(1),
    tipo: z.string().trim().min(1),
    acesso: z.enum(['Gratuito', 'Pago']).optional(),
    classificacoes: z
      .array(classificacaoMatematicaSchema)
      .min(1)
      .optional(),
    publicacao: portalDateSchema,
    segmento: segmentoSchema,
    anoSerie: z.string().optional(),
    turmas: z.array(reference('turmas')).min(1).optional(),
    observacaoProfessor: z.string().optional(),
    tags: z.array(z.string()).optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }),
});

const provas = defineCollection({
  loader: optionalYamlGlob('./src/content/provas'),
  schema: z.strictObject({
    titulo: textoObrigatorioSchema,
    ano: z.number().int().min(1000).max(9999),
    segmento: segmentoSchema,
    anoSerie: anoSerieProvaSchema,
    tipo: tipoProvaSchema,
    instituicao: textoObrigatorioSchema,
    assuntos: z.array(textoObrigatorioSchema).min(1),
    prova: recursoProvaSchema,
    fonte: recursoProvaSchema,
    fase: textoObrigatorioSchema.optional(),
    dificuldade: dificuldadeProvaSchema.optional(),
    descricao: textoObrigatorioSchema.optional(),
    resolucao: recursoProvaSchema.optional(),
    condicaoUso: textoObrigatorioSchema.optional(),
    tags: z.array(textoObrigatorioSchema).min(1).optional(),
  }).superRefine(({ segmento, anoSerie }, context) => {
    const anosSeriesPermitidos = segmento === 'Ensino Fundamental — Anos Finais'
      ? ['6º ano', '7º ano', '8º ano', '9º ano']
      : ['1º ano', '2º ano', '3º ano'];

    if (!anosSeriesPermitidos.includes(anoSerie)) {
      context.addIssue({
        code: 'custom',
        path: ['anoSerie'],
        message: `O Ano/Série "${anoSerie}" não pertence ao Segmento "${segmento}".`,
      });
    }
  }),
});

const oportunidades = defineCollection({
  loader: optionalYamlGlob('./src/content/oportunidades'),
  schema: z.strictObject({
    titulo: textoObrigatorioSchema,
    categoria: categoriaOportunidadeSchema,
    descricao: textoObrigatorioSchema,
    instituicao: textoObrigatorioSchema,
    publicoAlvo: textoObrigatorioSchema,
    publicacao: portalDateSchema,
    marcos: z.array(marcoOportunidadeSchema).min(1),
    linkOficial: httpUrlSchema,
    fonte: fonteOportunidadeSchema,
    direcionamento: z.array(direcionamentoOportunidadeSchema).min(1).optional(),
    local: textoObrigatorioSchema.optional(),
    inscricaoUrl: httpUrlSchema.optional(),
    regulamentoUrl: httpUrlSchema.optional(),
    resultadoUrl: httpUrlSchema.optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
    condicaoUso: textoObrigatorioSchema.optional(),
  }).superRefine(({ marcos, direcionamento }, context) => {
    const aberturas = marcos.filter(({ tipo }) => tipo === 'Abertura de inscrições');
    const encerramentos = marcos.filter(({ tipo }) => tipo === 'Encerramento de inscrições');
    const realizacoes = marcos.filter(({ tipo }) => tipo === 'Realização');
    const resultados = marcos.filter(({ tipo }) => tipo === 'Divulgação de resultado');

    if (aberturas.length > 1) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'Use no máximo uma Abertura de inscrições.',
      });
    }

    if (encerramentos.length > 1) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'Use no máximo um Encerramento de inscrições.',
      });
    }

    if ((aberturas.length === 1) !== (encerramentos.length === 1)) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'Abertura e Encerramento de inscrições devem aparecer juntos.',
      });
    }

    if (
      aberturas[0]
      && encerramentos[0]
      && comparePortalDates(aberturas[0].data, encerramentos[0].data) > 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'A Abertura de inscrições não pode ser posterior ao Encerramento.',
      });
    }

    if (resultados.length > 1) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'Use no máximo uma Divulgação de resultado.',
      });
    }

    const ultimaRealizacao = realizacoes
      .map(({ data }) => data)
      .sort(comparePortalDates)
      .at(-1);

    if (
      resultados[0]
      && ultimaRealizacao
      && comparePortalDates(resultados[0].data, ultimaRealizacao) < 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'A Divulgação de resultado não pode preceder a última Realização.',
      });
    }

    if (encerramentos.length === 0 && realizacoes.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['marcos'],
        message: 'Cadastre ao menos uma data crítica: Encerramento de inscrições ou Realização.',
      });
    }

    if (direcionamento) {
      const segmentos = direcionamento.map(({ segmento }) => segmento);

      if (new Set(segmentos).size !== segmentos.length) {
        context.addIssue({
          code: 'custom',
          path: ['direcionamento'],
          message: 'Não repita Segmento no direcionamento.',
        });
      }
    }
  }),
});

export const collections = {
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
};
