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
};
