# Mockups Aprovados — Página de Turma

Versão: 2.4  
Status: APROVADO — CONSOLIDAÇÃO PÓS-PROTÓTIPOS  
Última atualização: 12/09/2026

## Objetivo
Registrar as referências visuais específicas aprovadas para a página de turma. Estes mockups complementam a documentação funcional e o Design System.

A implementação deverá respeitar o conteúdo dos documentos aprovados e usar estes mockups como referência visual. Em caso de conflito, prevalece a documentação aprovada mais recente; qualquer alteração visual relevante deve ser documentada antes de ser implementada.

## Desktop
- Etapa consolidada: **ETAPA 18 — Revisão completa do desktop**.
- Situação: aprovada na ETAPA 19.
- Canva — edição: https://www.canva.com/d/rjmWRV0gR1aQ1cY
- Referência local do projeto: pasta/bundle `etapa18-revisao-desktop`.

## Tablet
- Etapa consolidada: **ETAPA 20.5 — Tablet — Contato à direita**.
- Largura de referência do mockup: **834 px**.
- Canva — edição: https://www.canva.com/d/UJYJQqzaqkgjv5K
- Referência local do projeto: pasta/bundle `etapa20-5-contato-direita`.

### Particularidades aprovadas
- frase institucional em três linhas:
  - Matemática:
  - Mais do que uma disciplina,
  - uma ferramenta para a vida!
- menu principal 3 × 2;
- menu interno da turma 4 × 2;
- identificação e avisos empilhados;
- compromissos verticais;
- resumos em uma coluna;
- botão “Falar com o Professor” à direita, com quebra controlada se necessária.

## Celular
- Etapa consolidada: **ETAPA 21.1 — Mobile — Ajustes do menu e cronograma**.
- Largura de referência do mockup: **390 px**.
- Canva — edição: https://www.canva.com/d/7c4vIlm02XEnvdD
- Referência local do projeto: pasta/bundle `etapa21-1-mobile-ajustes`.

### Particularidades aprovadas
- layout em uma coluna;
- menu principal compacto;
- menu interno compacto com “Menu da turma” e item atual;
- sem box branco vazio antes de “Próximos compromissos”;
- compromissos em cards/blocos verticais;
- “Ver cronograma completo” com quebra controlada quando necessário;
- área “Falar com o Professor” adaptada para toque;
- rodapé reorganizado para a largura móvel.

### Estado aberto do menu interno mobile
- Situação: aprovado em 23/08/2026.
- Largura de referência: **390 px**.
- Referência local temporária: `Site/src/pages/validacao-menu-mobile.astro`.
- a caixa compacta permanece como cabeçalho;
- a lista vertical das oito visões surge imediatamente abaixo e forma continuação visual do controle;
- “Início da turma” representa o item ativo na prova visual aprovada;
- fundo opaco, borda coerente, separadores discretos e linhas adequadas ao toque;
- chevron voltado para cima no estado aberto;
- sem drawer, modal, overlay de tela ou select nativo;
- menu principal, cabeçalho do menu da turma e lista aberta formam uma região sticky superior opaca, sem vazamento visual;
- desktop e tablet não são alterados por este refinamento.

## Visão completa de Cronogramas
- Situação: aprovada em 24/08/2026.
- Referência vigente: `Site/src/components/turma/CronogramasView.astro`; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.

### Desktop — 1440 px
- título “Cronogramas”;
- seletor com todos os períodos do regime letivo;
- período corrente destacado e identificado por “Período atual”;
- Total da etapa apresentado em área separada;
- tabela principal com as colunas exatas Data/Prazo, Tipo, Descrição/Conteúdo e Valor;
- Descrição/Conteúdo recebe a maior largura;
- itens passados permanecem visíveis.

### Tablet — 834 px
- mesma estrutura do desktop;
- tabela de quatro colunas preservada;
- ausência de rolagem horizontal.

### Mobile — 390 px
- seletor de períodos em grade responsiva sem rolagem horizontal;
- composição apta a regimes de dois, três ou quatro períodos;
- a tabela deixa de ser visualmente tabular;
- cada item passa a bloco vertical;
- Data/Prazo e Valor ocupam a região superior;
- Tipo aparece abaixo;
- Descrição/Conteúdo vem na sequência.

### Item passado
Conforme a DEC-082 refinada pela DEC-083:
- Data/Prazo recebe atenuação e `line-through`;
- Tipo recebe atenuação e `line-through`;
- Descrição/Conteúdo recebe atenuação e `line-through`;
- Valor permanece normal, sem `line-through`, e continua integralmente contabilizado.

### Total da etapa
- é derivado da soma dos valores de todos os itens do período que possuam valor;
- o estado temporal não interfere no cálculo;
- item passado continua participando normalmente da soma;
- não recebe `line-through`.

### Elementos ausentes por decisão
Não usar:
- status manual;
- ícone de concluído;
- checkbox;
- tachado no Valor;
- notas individuais;
- pontos previstos ou distribuídos;
- saldo;
- média;
- desempenho.

## Visão de Atividades e listas
- Situação: visão completa aprovada em 26/08/2026.
- Referência vigente: `Site/src/components/turma/ActivitiesListsView.astro`; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- filtros, cores, borda lateral amarela, divisórias, largura geral da área, selos de Tipo, textos usados na validação e elementos compartilhados permanecem preservados;
- listagem em uma coluna;
- registros apresentados do mais recente para o mais antigo pela Publicação;
- empates resolvidos por título crescente no locale pt-BR;
- filtros visuais somente de Busca, Assunto e Tipo, ainda sem interatividade definitiva;
- tipos visuais: Atividade e Lista de exercícios.

### Metadados obrigatoriamente visíveis
- Assunto, Publicação e Prazo aparecem em todos os registros;
- o campo Prazo permanece opcional no modelo de conteúdo;
- quando não houver prazo cadastrado, exibir exatamente `-`;
- não usar “Sem prazo”, “Não informado” nem omitir o campo.

### Desktop — 1440 px
- selo de Tipo em linha própria;
- título à esquerda e os três metadados agrupados à direita na mesma faixa horizontal;
- título permanece como elemento visual principal;
- metadados têm peso visual secundário;
- o grupo de metadados usa três colunas regulares;
- em cada coluna, rótulo e valor compartilham exatamente o mesmo eixo central;
- larguras não são determinadas apenas pelo conteúdo.

### Tablet — 834 px
- mesma organização horizontal do desktop;
- título e os três metadados permanecem na mesma faixa;
- o grupo de metadados usa três colunas regulares;
- em cada coluna, rótulo e valor compartilham exatamente o mesmo eixo central;
- o hífen do prazo ausente permanece centralizado sob Prazo;
- ajustes controlados de largura, gaps e tipografia;
- ausência de overflow horizontal, sobreposição ou texto cortado.

### Mobile — 390 px
- selo de Tipo em linha própria;
- título em linha própria;
- Assunto, Publicação e Prazo imediatamente abaixo;
- três colunas iguais, cada uma com exatamente um terço da largura disponível;
- cada bloco ocupa integralmente sua coluna, independentemente do comprimento do conteúdo;
- rótulos centralizados horizontalmente;
- valores centralizados horizontalmente;
- nenhum valor usa alinhamento lateral diferente, inclusive Prazo;
- o hífen do prazo ausente permanece centralizado no terceiro terço;
- sem bordas ou aparência de tabela;
- ausência de overflow horizontal e sobreposição.

### Corpo opcional aprovado
- fica abaixo do cabeçalho do registro;
- descrição opcional como texto corrido, sem box interno;
- ausência de descrição sem elemento nem espaço reservado;
- Recursos e Gabarito/Resolução aparecem apenas quando aplicáveis;
- a inclusão do corpo opcional não altera filtros, selo, título, metadados nem responsividade aprovada.

### Recursos
- título de seção “RECURSOS”;
- um ou vários nomes apresentados como links independentes;
- URLs não aparecem em texto bruto;
- espaçamento claro entre múltiplos recursos;
- quebra natural responsiva;
- sem card individual por recurso.

### Gabarito / Resolução disponível
- título exato “GABARITO / RESOLUÇÃO”;
- mesmo tratamento visual do título “RECURSOS”;
- título sem aparência ou comportamento de link;
- um ou vários nomes de recursos apresentados como links independentes.

### Gabarito / Resolução programado
Antes da data de liberação, apresentar:

**GABARITO / RESOLUÇÃO**  
**Disponível em 27 ago**

- a data é fixture exclusiva da referência temporária;
- não mostrar link nem nome de recurso antes da liberação;
- informação temporal discreta, atenuada e legível;
- sem sublinhado, hover ou cursor de link;
- sem cadeado, ícone, botão desabilitado, campo cinza, badge, alerta, vermelho, verde, texto de bloqueio/indisponibilidade ou contagem regressiva.

A partir da própria data de liberação, a informação temporal dá lugar aos nomes dos recursos liberados como links.

### Vídeos relacionados
- suporte conceitual preservado no modelo;
- apresentação visual adiada até a aprovação da visão completa de Vídeos;
- sem conteúdo, seção ou placeholder nesta referência.

### Ausência de registros na rota real
- preservar Header, menu global, breadcrumb, identificação da turma, menu interno ativo, sticky e Footer;
- não renderizar filtros, listagem, mensagem de nenhum resultado, placeholder ou fixture.

## Visão completa de Para estudar
- Situação: visão completa aprovada em 26/08/2026.
- Referência vigente: `Site/src/components/turma/StudyView.astro`; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- listagem em uma coluna, divisórias discretas e acento lateral aprovado;
- registros ordenados por Publicação, do mais recente para o mais antigo, com título crescente no locale pt-BR como desempate;
- filtros visuais somente de Busca e Assunto, sem interatividade definitiva;
- `tipoObjetivo` não possui apresentação visual.

### Título e Objetivo
- título como elemento visual principal e conteúdo textual preservado;
- objetivo apresentado separadamente, abaixo do cabeçalho;
- rótulo exato `OBJETIVO`, com tratamento discreto de informação pedagógica;
- conteúdo do objetivo com hierarquia superior ao resumo/orientação e subordinada ao título;
- sem badge, fundo próprio, ícone, subcard ou aparência de status.

### Metadados e Data
- Assunto e Publicação aparecem em todos os registros;
- quando `dataObjetivo` existe, a interface usa o rótulo visual exato `DATA`;
- o nome técnico continua `dataObjetivo`;
- quando a data está ausente, não mostrar placeholder, hífen nem espaço reservado;
- cada rótulo permanece centralizado no mesmo eixo horizontal de seu valor.

### Desktop — 1440 px
- título à esquerda e metadados à direita na mesma faixa horizontal;
- título dominante e metadados secundários em colunas regulares;
- ausência de sobreposição, overflow ou corte.

### Tablet — 834 px
- mesma organização horizontal do desktop;
- título pode quebrar naturalmente;
- metadados permanecem centralizados dentro de suas colunas;
- ausência de compressão excessiva, invasão do título, sobreposição ou overflow.

### Mobile — 390 px
- breakpoint aprovado: `max-width: 767px`;
- cabeçalho em fluxo vertical próprio, sem conservar a grade horizontal de desktop;
- título ocupa faixa exclusiva de 100%, alinhada à esquerda;
- metadados começam somente abaixo do término completo do título;
- com data, Assunto, Publicação e Data formam três colunas iguais;
- sem data, Assunto e Publicação formam duas colunas iguais, sem coluna vazia;
- rótulos e valores ficam centralizados em seus próprios eixos;
- valores longos, como “Matemática básica”, quebram somente dentro da própria coluna;
- sem margem negativa, transform, posicionamento absoluto ou compensação específica por conteúdo.

### Corpo do registro
Ordem aprovada:
1. Objetivo;
2. resumo/orientação;
3. Recursos;
4. Leituras relacionadas, quando existirem.

- Recursos e Leituras relacionadas usam títulos discretos de subseção;
- links mostram somente o nome, permanecem independentes, acessíveis e com boa área de toque;
- sem URL bruta, card individual ou espaço reservado para subseção ausente;
- Vídeos relacionados não são apresentados nem recebem placeholder nesta etapa.

### Estado atenuado
- quando hoje é posterior a `dataObjetivo`, o registro usa a atenuação aprovada em textos, fundo e acento lateral;
- durante toda a própria data do objetivo, a apresentação permanece normal;
- registro atenuado continua legível, acessível e com links funcionais;
- sem tachado, checkbox, ícone de conclusão, badge ou status manual.

### Ausência de registros na rota real
- preservar Header, menu global, breadcrumb, identificação da turma, menu interno Para estudar ativo, sticky e Footer;
- não renderizar filtros, listagem, mensagem de nenhum resultado, placeholder ou fixture.

## Visão completa de Trabalhos
- Situação: visão completa aprovada em 26/08/2026.
- Referência vigente: `Site/src/components/turma/WorksView.astro`; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- listagem em uma única coluna, divisórias discretas e acento lateral aprovado;
- registros ordenados por Publicação, do mais recente para o mais antigo, com título crescente no locale pt-BR como desempate;
- filtros visuais somente de Busca e Assunto, sem interatividade definitiva;
- título obrigatório como elemento visual principal;
- `tags` e o valor técnico de `marco.tipo` não possuem apresentação visual nesta visão.

### Metadados e rótulo temporal
- Assunto, Publicação e Entrega aparecem em todos os registros;
- o rótulo visual é sempre `ENTREGA`, independentemente de `marco.tipo` ser Entrega ou Apresentação;
- `APRESENTAÇÃO` não aparece na interface, sem alterar o valor técnico armazenado;
- a data apresentada vem do único `marco.data` obrigatório;
- rótulo e valor de cada metadado permanecem centralizados no mesmo eixo.

### Desktop — 1440 px
- título à esquerda e Assunto, Publicação e Entrega à direita na mesma faixa horizontal;
- título dominante e metadados secundários em colunas regulares;
- ausência de sobreposição, overflow ou corte.

### Tablet — 834 px
- mesma organização horizontal do desktop;
- título pode quebrar naturalmente;
- metadados permanecem centralizados em suas colunas;
- ausência de invasão entre campos, quebra arbitrária de palavras, sobreposição ou overflow.

### Mobile — 390 px
- breakpoint aprovado: `max-width: 767px`;
- título ocupa faixa própria de 100%, alinhada à esquerda;
- Assunto, Publicação e Entrega aparecem imediatamente abaixo;
- colunas nas proporções `minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)`, dando maior largura a Assunto;
- cada coluna usa `min-width: 0` e centraliza rótulo e valor no mesmo eixo;
- valores permitem quebra entre palavras com `overflow-wrap: normal` e `word-break: normal`;
- palavras como “proporcionalidade” não podem ser partidas arbitrariamente;
- não usar `word-break: break-all` nem `overflow-wrap: anywhere` nos valores dos metadados.

### Corpo do registro
Ordem aprovada:
1. descrição, quando houver;
2. Documento do trabalho;
3. Recursos adicionais, quando existirem.

- descrição é texto corrido, sem card ou fundo próprio, e não reserva espaço quando ausente;
- `DOCUMENTO DO TRABALHO` apresenta exatamente um recurso obrigatório;
- `RECURSOS ADICIONAIS` apresenta uma ou mais entradas opcionais somente quando existirem;
- links mostram apenas os nomes, nunca as URLs brutas, são independentes e têm boa área de clique e toque;
- documento e recursos não usam cards internos.

### Estado atenuado
- durante toda a própria data de `marco.data`, o registro permanece normal;
- somente quando hoje é posterior a `marco.data`, o registro usa a atenuação aprovada em textos, fundo e acento lateral;
- regra derivada pela noção central de hoje em `America/Sao_Paulo`, sem status persistido;
- registro atenuado continua visível, legível, acessível e com links funcionais;
- sem tachado, checkbox, ícone de conclusão, badge ou status textual.

### Ausência de registros na rota real
- preservar Header, menu global, breadcrumb, identificação da turma, menu interno Trabalhos ativo, sticky e Footer;
- não renderizar filtros, listagem, mensagem de nenhum resultado, placeholder ou fixture.

## Visão completa de Materiais
- Situação: visão completa aprovada em 11/09/2026.
- Referência vigente: `Site/src/components/turma/MaterialsView.astro`; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- acervo permanente em uma única coluna, com divisórias discretas e acento lateral amarelo;
- título do Material como elemento dominante e Tipo como metadado textual secundário;
- exatamente um arquivo/link por registro, apresentado pelo nome sob `ARQUIVO / LINK`;
- classificações como cadeias tipográficas Área → Subárea → Conteúdo;
- múltiplas classificações separadas dentro do mesmo registro, sem repetir título, Tipo ou arquivo/link;
- descrição opcional em texto corrido quando presente;
- publicação e tags preservadas nos dados e sem apresentação visual;
- ausência de prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação e progresso.

### Filtros visuais
- exatamente Busca, Área, Subárea, Conteúdo e Tipo;
- sem JavaScript, busca real, filtragem, dependência dinâmica entre níveis, query string, botão de limpar, contador ou estado de nenhum resultado.

### Desktop — 1440 px
- cinco filtros na mesma faixa;
- título dominante, Tipo secundário, arquivo/link claro e classificações escaneáveis.

### Tablet — 834 px
- Busca em largura total;
- Área, Subárea, Conteúdo e Tipo em grade 2 × 2;
- registros sem sobreposição, corte ou overflow horizontal.

### Mobile — 390 px
- filtros empilhados;
- título em faixa própria e Tipo abaixo;
- arquivo/link com boa área de toque;
- classificações com quebra natural, preservando palavras inteiras;
- múltiplas classificações dentro do mesmo registro;
- nenhum overflow horizontal.

### Dados e rota real
- componente reutilizável sem fixtures e alimentado por propriedades;
- o protótipo temporário e suas fixtures foram removidos após a incorporação do layout aprovado ao componente real;
- rota real usa registros da coleção da turma sem duplicação por classificação;
- sem registros reais, a rota preserva o contexto institucional e da turma sem filtros, lista, mensagem vazia, placeholder ou fixture.

## Visão completa de Vídeos
- Situação: visão completa aprovada em 11/09/2026.
- Referência vigente: `Site/src/components/turma/VideosView.astro`; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- biblioteca pedagógica em cards de mídia, sem aparência de feed social, tarefa, cronograma ou painel administrativo;
- título do Vídeo como elemento textual dominante e descrição como texto corrido secundário;
- duração sobre a miniatura, prioridade textual discreta e ação `Ver vídeo`;
- publicação, provedor e tags preservados nos dados e sem apresentação visual;
- ausência de prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação, nota e progresso.

### Filtros visuais
- exatamente Busca, Área, Subárea, Conteúdo e Prioridade;
- sem JavaScript, busca real, filtragem, dependência dinâmica entre níveis, query string, botão de limpar, contador ou estado de nenhum resultado.

### Miniatura e duração
- `miniaturaUrl` apresentada em área com proporção 16:9;
- imagem preservada sem distorção por tratamento apropriado de `object-fit`;
- marca gráfica simples identifica a natureza de vídeo, sem simular controles completos;
- duração formatada pelo helper existente a partir de `duracaoSegundos` e posicionada sobre a miniatura;
- sem barra de progresso, player, iframe, autoplay ou controles de reprodução.

### Prioridade, título e descrição
- prioridade usa tratamento textual neutro, sem cores de status, alerta, urgência ou ícone de conclusão;
- título permanece facilmente escaneável e quebra naturalmente;
- descrição aparece sem card ou fundo próprio;
- provedor e tags não aparecem na interface.

### Classificações
- uma ou várias cadeias tipográficas Área → Subárea → Conteúdo;
- cadeias adicionais ficam dentro do mesmo card e usam separação discreta;
- um vídeo continua sendo um único item, sem repetir miniatura, título, descrição ou URL;
- não usar taxonomia como coleção excessiva de badges.

### Ação Ver vídeo
- rótulo exato `Ver vídeo`;
- área adequada de clique e toque e foco visível;
- na rota real, abre a `url` do registro em nova aba como link externo simples e seguro;
- não abre modal nem reproduz vídeo dentro do portal.

### Desktop — 1440 px
- cinco filtros na mesma faixa;
- biblioteca em duas colunas;
- cards verticais, com miniatura 16:9 acima do conteúdo;
- título, descrição, prioridade, duração e classificação claramente escaneáveis.

### Tablet — 834 px
- Busca em largura total;
- Área, Subárea, Conteúdo e Prioridade em grade 2 × 2;
- vídeos em uma única coluna;
- cada card é horizontal, com miniatura à esquerda e conteúdo à direita;
- nenhuma deformação, compressão, sobreposição ou rolagem horizontal.

### Mobile — 390 px
- filtros empilhados;
- card vertical e miniatura 16:9;
- prioridade, título, descrição, classificação e ação em fluxo vertical;
- ação com boa área de toque;
- metadados sem compressão em colunas estreitas;
- nenhum overflow horizontal.

### Dados e rota real
- componente reutilizável sem fixtures e alimentado por propriedades;
- ordenação preparada por `publicacao` decrescente e título crescente no locale pt-BR como desempate;
- o protótipo temporário e suas fixtures foram removidos após a incorporação do layout aprovado ao componente real;
- rota real usa registros da coleção `videos` aplicáveis à turma;
- sem registros reais, a rota preserva Header, menu global, breadcrumb, identificação da turma, menu interno Vídeos ativo, sticky e Footer sem filtros, cards, mensagem vazia, placeholder ou fixture.

## Visão completa de Links

### Estrutura geral
- título da visão exatamente `Links`;
- nenhum filtro, busca, ordenação visual, botão de limpar, contador ou estado de nenhum resultado;
- recursos externos agrupados por `finalidade`;
- cada grupo apresenta `FINALIDADE` e o nome da finalidade;
- grupos e itens preservam a ordem alfabética crescente no locale pt-BR definida pela camada de conteúdo.

### Item de link
- `tipo` como informação secundária;
- `titulo` como elemento visual dominante;
- `descricao` em texto corrido;
- ação `Acessar` acompanhada do ícone externo;
- sem URL bruta, logo, card interno de classificação ou tratamento de acesso.

### Dados sem apresentação visual
- `acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` permanecem preservados na camada de dados;
- nenhum desses campos é renderizado por ausência de tratamento visual aprovado;
- não apresentar prazo, vencimento, status, ativo/inativo, dificuldade, pontuação ou progresso.

### Ação Acessar
- rótulo exato `Acessar`;
- área adequada de clique e toque e foco visível;
- na rota real, abre a `url` do registro em nova aba como link externo simples e seguro;
- não mostra URL bruta e não usa modal, iframe, incorporação ou rastreamento.

### Desktop — 1440 px
- grupos em duas colunas;
- cada coluna possui seu cabeçalho de finalidade;
- ação posicionada lateralmente em cada item;
- tipo, título e descrição mantêm hierarquia clara e sem overflow horizontal.

### Tablet — 834 px
- grupos em uma coluna;
- cabeçalho de finalidade e todos os dados visíveis são preservados;
- ação permanece facilmente alcançável;
- nenhuma sobreposição ou rolagem horizontal.

### Mobile — 390 px
- composição vertical;
- finalidade, tipo, título, descrição e ação seguem o fluxo do documento;
- ação possui boa área de toque;
- textos quebram naturalmente sem partir palavras arbitrariamente nem gerar overflow horizontal.

### Dados e rota real
- componente reutilizável sem fixtures e alimentado por grupos recebidos por propriedades;
- finalidade dos grupos e títulos dos itens ordenados alfabeticamente no locale pt-BR;
- o protótipo temporário com os exemplos `Explorar gráficos` e `Praticar problemas` cumpriu a validação e foi removido após a incorporação do layout aprovado a `LinksView.astro`, referência vigente;
- rota real usa registros da coleção `links` aplicáveis à turma;
- sem registros reais, a rota preserva Header, menu global, breadcrumb, identificação da turma, menu interno Links ativo, sticky e Footer sem filtros, grupos, mensagem vazia, placeholder ou fixture.

## Regra de aceite visual
Antes de considerar a página de turma concluída, comparar a implementação com as três referências responsivas da página de turma, com o protótipo aprovado do estado aberto do menu interno mobile, com as visões completas de Cronogramas, Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links em 1440 px, 834 px e 390 px e executar `08-CHECKLIST-DE-ACEITE-v2.5.md`.

