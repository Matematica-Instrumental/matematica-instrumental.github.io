import { defineCollection, reference } from 'astro:content';
import { glob, type Loader, type LoaderContext } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  comparePortalDates,
  normalizePortalDate,
  tryNormalizePortalDate,
} from './utils/portalDate';
import {
  isChronologicalInterval,
  isHttpUrl,
  isPublicationCompatibleWithHighlight,
  isSafeLinkedResourceTarget,
  isSafeLocalAssetPath,
  isValidTurmaSlug,
} from './utils/contentIntegrity';

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

const categoriaMatematicaAlemSchema = z.enum([
  'Curiosidades',
  'História da Matemática',
  'Personalidades',
  'Matemática no cotidiano',
  'Aplicações',
  'Desafios',
  'Vídeos',
  'Leituras',
  'Sites e recursos',
]);

const origemMatematicaAlemSchema = z.enum(['Autoral', 'Curadoria']);

const rotuloAcaoMatematicaAlemSchema = z.enum([
  'Saiba mais',
  'Ver fonte',
  'Assistir',
  'Acessar conteúdo',
]);

const direitoImagemMatematicaAlemSchema = z.enum([
  'Própria',
  'Domínio público',
  'Licenciada',
]);

const tipoMarcoOportunidadeSchema = z.enum([
  'Abertura de inscrições',
  'Encerramento de inscrições',
  'Realização',
  'Divulgação de resultado',
]);

const textoObrigatorioSchema = z.string().trim().min(1);

const urlRecursoSchema = textoObrigatorioSchema.refine(
  isSafeLinkedResourceTarget,
  {
    message: 'Use uma URL HTTP(S) válida ou um caminho interno iniciado por /.',
  },
);

const recursoProvaSchema = z.strictObject({
  nome: textoObrigatorioSchema,
  url: urlRecursoSchema,
});

const httpUrlSchema = textoObrigatorioSchema.refine(isHttpUrl, {
  message: 'Use uma URL HTTP(S) válida; outros protocolos não são permitidos.',
});

const portalDateSchema = z
  .union([z.string(), z.date()])
  .refine((value) => tryNormalizePortalDate(value) !== null, {
    message: 'Use uma data civil válida no formato YYYY-MM-DD, sem horário.',
  })
  .transform((value) => normalizePortalDate(value));

const recursoVinculadoSchema = z.strictObject({
  nome: textoObrigatorioSchema,
  url: urlRecursoSchema.optional(),
  arquivo: urlRecursoSchema.optional(),
}).superRefine(({ url, arquivo }, context) => {
  if (Boolean(url) === Boolean(arquivo)) {
    context.addIssue({
      code: 'custom',
      path: ['url'],
      message: 'Informe um link ou um arquivo enviado, mas não os dois.',
    });
  }
}).transform(({ nome, url, arquivo }) => ({
  nome,
  url: (url ?? arquivo) as string,
}));

const identificadorListaSchema = textoObrigatorioSchema.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  {
    message: 'Use somente minúsculas ASCII, números e hífens no identificador.',
  },
);

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

function validatePublicationHighlightOrder(
  publicacao: string | undefined,
  destaqueNovidades: { inicio: string; fim: string } | undefined,
  addIssue: (issue: {
    code: 'custom';
    path: string[];
    message: string;
  }) => void,
): void {
  if (
    publicacao
    && !isPublicationCompatibleWithHighlight(publicacao, destaqueNovidades)
  ) {
    addIssue({
      code: 'custom',
      path: ['destaqueNovidades', 'fim'],
      message: 'O fim de destaqueNovidades deve ser igual ou posterior à publicação.',
    });
  }
}

const marcoOportunidadeSchema = z.strictObject({
  tipo: tipoMarcoOportunidadeSchema,
  rotulo: textoObrigatorioSchema,
  data: portalDateSchema,
});

const fonteOportunidadeSchema = z.strictObject({
  nome: textoObrigatorioSchema,
  url: httpUrlSchema,
});

const fonteMatematicaAlemSchema = z.strictObject({
  nome: textoObrigatorioSchema,
  url: httpUrlSchema,
});

const acaoMatematicaAlemSchema = z.strictObject({
  rotulo: rotuloAcaoMatematicaAlemSchema,
  url: httpUrlSchema,
});

const linkRelacionadoMatematicaAlemSchema = z.strictObject({
  titulo: textoObrigatorioSchema,
  url: httpUrlSchema,
});

const arquivoImagemMatematicaAlemSchema = textoObrigatorioSchema.refine(
  isSafeLocalAssetPath,
  {
    message: 'Use um caminho local iniciado por / ou src/assets/editorial/. Hotlink externo não é permitido.',
  },
);

const imagemMatematicaAlemSchema = z.strictObject({
  arquivo: arquivoImagemMatematicaAlemSchema,
  alt: textoObrigatorioSchema,
  credito: textoObrigatorioSchema,
  direito: direitoImagemMatematicaAlemSchema,
  licenca: textoObrigatorioSchema,
  fonteUrl: httpUrlSchema.optional(),
  licencaUrl: httpUrlSchema.optional(),
}).superRefine(({ direito, fonteUrl, licencaUrl }, context) => {
  if (direito !== 'Própria' && !fonteUrl) {
    context.addIssue({
      code: 'custom',
      path: ['fonteUrl'],
      message: 'Imagem de Domínio público ou Licenciada exige fonteUrl.',
    });
  }

  if (direito === 'Licenciada' && !licencaUrl) {
    context.addIssue({
      code: 'custom',
      path: ['licencaUrl'],
      message: 'Imagem Licenciada exige licencaUrl.',
    });
  }
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

const classificacoes = defineCollection({
  loader: optionalYamlGlob('./src/content/classificacoes'),
  schema: z.strictObject({
    id: identificadorListaSchema,
    area: textoObrigatorioSchema,
    subarea: textoObrigatorioSchema,
    conteudo: textoObrigatorioSchema,
  }),
});

function defineListaNomeada(base: string) {
  return defineCollection({
    loader: optionalYamlGlob(base),
    schema: z.strictObject({
      id: identificadorListaSchema,
      nome: textoObrigatorioSchema,
    }),
  });
}

const tiposCronograma = defineListaNomeada('./src/content/tipos-cronograma');
const tiposMaterial = defineListaNomeada('./src/content/tipos-material');
const finalidadesLink = defineListaNomeada('./src/content/finalidades-link');
const tiposLink = defineListaNomeada('./src/content/tipos-link');

const turmas = defineCollection({
  loader: glob({
    base: './src/content/turmas',
    pattern: '**/*.{yml,yaml}',
  }),
  schema: z.object({
    id: z.string(),
    nome: z.string(),
    slug: textoObrigatorioSchema.refine(isValidTurmaSlug, {
      message: 'Use somente minúsculas ASCII e kebab-case, sem espaços, acentos ou barras.',
    }),
    segmento: segmentoSchema,
    anoSerie: anoSerieProvaSchema,
    turma: z.string(),
    anoLetivo: z.number().int(),
    descricao: z.string(),
    arquivada: z.boolean().optional(),
    ordem: z.number().int(),
  }).superRefine(({ slug, anoLetivo, segmento, anoSerie }, context) => {
    if (!slug.split('-').includes(String(anoLetivo))) {
      context.addIssue({
        code: 'custom',
        path: ['slug'],
        message: `O slug deve identificar o ano letivo ${anoLetivo} para evitar colisões.`,
      });
    }

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

const videos = defineCollection({
  loader: optionalYamlGlob('./src/content/videos'),
  schema: z.strictObject({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string(),
    url: httpUrlSchema,
    provedor: z.enum(['YouTube', 'Vimeo', 'Outro']),
    miniaturaUrl: httpUrlSchema,
    duracaoSegundos: z.number().int().positive(),
    prioridade: z.enum([
      'Essencial',
      'Recomendado',
      'Complementar',
    ]),
    classificacoes: z.array(reference('classificacoes')).min(1),
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1).optional(),
    // O Pages CMS omite listas vazias ao salvar.
    tags: z.array(z.string()).default([]),
    publicacao: portalDateSchema,
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({ publicacao, destaqueNovidades }, context) => {
    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
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
  }).superRefine(({ publicacao, validade }, context) => {
    if (!isChronologicalInterval(publicacao, validade)) {
      context.addIssue({
        code: 'custom',
        path: ['validade'],
        message: 'A validade do aviso deve ser igual ou posterior à publicação.',
      });
    }
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
    ordem: z.number().int().positive(),
  }).superRefine(({ dataInicial, dataFinal }, context) => {
    if (!isChronologicalInterval(dataInicial, dataFinal)) {
      context.addIssue({
        code: 'custom',
        path: ['dataFinal'],
        message: 'A data final deve ser igual ou posterior à data inicial.',
      });
    }
  }),
});

const itensCronograma = defineCollection({
  loader: optionalYamlGlob('./src/content/itens-cronograma'),
  schema: z.object({
    id: z.string(),
    periodoLetivo: reference('periodosLetivos'),
    turmas: z.array(reference('turmas')).min(1),
    dataPrazo: portalDateSchema,
    tipo: reference('tiposCronograma'),
    descricaoConteudo: z.string(),
    valorIndividual: z.number().nonnegative().optional(),
    publicacao: portalDateSchema.optional(),
    ordem: z.number().int().optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({ publicacao, destaqueNovidades }, context) => {
    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
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
    // O Pages CMS omite listas vazias ao salvar.
    tags: z.array(z.string()).default([]),
    gabaritoResolucao: z.array(recursoVinculadoSchema).min(1).optional(),
    dataLiberacaoGabarito: portalDateSchema.optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({
    publicacao,
    gabaritoResolucao,
    dataLiberacaoGabarito,
    destaqueNovidades,
  }, context) => {
    if (dataLiberacaoGabarito && !gabaritoResolucao) {
      context.addIssue({
        code: 'custom',
        path: ['dataLiberacaoGabarito'],
        message: 'dataLiberacaoGabarito exige gabaritoResolucao.',
      });
    }

    if (
      dataLiberacaoGabarito
      && comparePortalDates(dataLiberacaoGabarito, publicacao) < 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['dataLiberacaoGabarito'],
        message: 'A liberação programada deve ser igual ou posterior à publicação.',
      });
    }

    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
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
    // O Pages CMS omite listas vazias ao salvar.
    tags: z.array(z.string()).default([]),
    publicacao: portalDateSchema,
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({ publicacao, destaqueNovidades }, context) => {
    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
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
    // O Pages CMS omite listas vazias ao salvar.
    tags: z.array(z.string()).default([]),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({ publicacao, destaqueNovidades }, context) => {
    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
  }),
});

const materiais = defineCollection({
  loader: optionalYamlGlob('./src/content/materiais'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string().optional(),
    tipo: reference('tiposMaterial'),
    classificacoes: z.array(reference('classificacoes')).min(1),
    publicacao: portalDateSchema,
    segmento: segmentoSchema,
    anoSerie: z.string(),
    turmas: z.array(reference('turmas')).min(1),
    arquivoLink: recursoVinculadoSchema,
    tags: z.array(z.string()).optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({ publicacao, destaqueNovidades }, context) => {
    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
  }),
});

const links = defineCollection({
  loader: optionalYamlGlob('./src/content/links'),
  schema: z.strictObject({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string(),
    url: httpUrlSchema,
    finalidade: reference('finalidadesLink'),
    tipo: reference('tiposLink'),
    acesso: z.enum(['Gratuito', 'Pago']).optional(),
    classificacoes: z
      .array(reference('classificacoes'))
      .min(1)
      .optional(),
    publicacao: portalDateSchema,
    segmento: segmentoSchema,
    anoSerie: z.string().optional(),
    turmas: z.array(reference('turmas')).min(1).optional(),
    observacaoProfessor: z.string().optional(),
    tags: z.array(z.string()).optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
  }).superRefine(({ publicacao, destaqueNovidades }, context) => {
    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
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
  }).superRefine(({
    publicacao,
    marcos,
    direcionamento,
    destaqueNovidades,
  }, context) => {
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

    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
  }),
});

const matematicaAlem = defineCollection({
  loader: optionalYamlGlob('./src/content/matematica-alem'),
  schema: z.strictObject({
    titulo: textoObrigatorioSchema,
    categoria: categoriaMatematicaAlemSchema,
    resumo: textoObrigatorioSchema,
    texto: textoObrigatorioSchema,
    publicacao: portalDateSchema,
    origem: origemMatematicaAlemSchema,
    autoria: textoObrigatorioSchema,
    fontes: z.array(fonteMatematicaAlemSchema).min(1).optional(),
    imagem: imagemMatematicaAlemSchema.optional(),
    acao: acaoMatematicaAlemSchema.optional(),
    linksRelacionados: z.array(linkRelacionadoMatematicaAlemSchema).min(1).optional(),
    tags: z.array(textoObrigatorioSchema).min(1).optional(),
    destaqueNovidades: destaqueNovidadesSchema.optional(),
    destaqueHome: z.boolean().optional(),
    arquivado: z.boolean().optional(),
  }).superRefine(({
    publicacao,
    origem,
    fontes,
    destaqueNovidades,
  }, context) => {
    if (origem === 'Curadoria' && !fontes?.length) {
      context.addIssue({
        code: 'custom',
        path: ['fontes'],
        message: 'Conteúdo de Curadoria exige ao menos uma fonte.',
      });
    }

    validatePublicationHighlightOrder(
      publicacao,
      destaqueNovidades,
      (issue) => context.addIssue(issue),
    );
  }),
});

export const collections = {
  classificacoes,
  tiposCronograma,
  tiposMaterial,
  finalidadesLink,
  tiposLink,
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
