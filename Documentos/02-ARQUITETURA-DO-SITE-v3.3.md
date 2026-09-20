# Arquitetura Organizacional do Site

Versão: 3.3<br>
Status: APROVADO — PROVAS E RESOLUÇÕES CONCLUÍDAS<br>
Última atualização: 20/09/2026

## Início
- identidade visual no topo;
- foto do professor integrada ao cabeçalho;
- menu principal abaixo do cabeçalho;
- área de apresentação;
- painel de novidades;
- acesso rápido;
- acesso às turmas;
- destaques de Matemática além da sala;
- rodapé institucional.

## Turmas
Hierarquia obrigatória:

**Segmento → Ano/Série → Turma**

### Ensino Fundamental — Anos Finais
6º, 7º, 8º e 9º anos.

### Ensino Médio
1º, 2º e 3º anos.

Na página inicial, priorizar o ano/série, evitando excesso de especificidade por turma.

### Página global de Turmas
A página global `/turmas/` é a porta de entrada pública para as áreas reais das turmas e preserva a hierarquia **Segmento → Ano/Série → Turma**.

#### Organização e ordenação
- ordenar os segmentos pela sequência institucional/documental vigente, com Ensino Fundamental — Anos Finais antes de Ensino Médio; não aplicar ordem alfabética quando ela contrariar essa sequência;
- dentro de cada segmento, ordenar anos/séries em ordem natural crescente, como 6º → 7º → 8º → 9º e 1º → 2º → 3º, sem ordenação puramente lexicográfica;
- dentro do mesmo ano/série, apresentar primeiro as turmas não arquivadas e depois as turmas arquivadas;
- dentro de cada um desses dois grupos, ordenar por `ordem` crescente e usar o nome/título da turma como critério de desempate estável.

Cada turma é o elemento acionável e deve levar à respectiva rota canônica, respeitando o `BASE_URL` configurado.

#### Turmas arquivadas
Turmas arquivadas permanecem dentro do respectivo ano/série, sem seção global separada, e continuam acessíveis. O tratamento visual é discreto e usa exatamente a mensagem “Turma arquivada — ano letivo encerrado”, nunca “inativa”.

#### Estado vazio global
Quando não existir nenhuma turma disponível para a página global, preservar Header, menu global, o título **Turmas** e Footer. Após o título, mostrar somente:

**Nenhuma turma disponível no momento.**

Não renderizar cards vazios, filtros, CTA, cadastro, matrícula nem mensagem de erro.

## Página da turma
A página da turma é uma área própria de navegação, não uma única página longa baseada apenas em âncoras.

### Navegação interna
Ordem aprovada:

**Início da turma | Cronogramas | Atividades e listas | Para estudar | Trabalhos | Materiais | Vídeos | Links**

Cada item abre sua própria visão dentro do contexto da turma.

### Contexto e orientação
- manter a identidade global do portal;
- substituir o bloco de boas-vindas da home pela identificação da turma;
- usar breadcrumb para orientação hierárquica;
- manter visíveis segmento, ano/série, turma e ano letivo;
- não exibir rótulos “ativa/inativa” para turma;
- para turmas arquivadas, usar mensagem útil como “Turma arquivada — ano letivo encerrado”.

### Menus fixos
Durante a rolagem:
- o menu principal do portal permanece acessível;
- o menu interno da turma permanece acessível;
- o item atual da navegação interna fica visualmente destacado;
- o cabeçalho institucional grande, com foto e identidade, não precisa permanecer fixo.

No celular, o menu interno deverá assumir forma compacta adequada aos oito itens.

## Início da turma
Funciona como painel-resumo e não como duplicação das áreas completas.

Ordem recomendada:
1. identificação da turma;
2. avisos da turma;
3. próximos compromissos do Cronograma;
4. Atividades e listas;
5. Para estudar;
6. Trabalhos;
7. Materiais;
8. Vídeos;
9. Links;
10. Falar com o professor.

### Desktop
- primeira faixa em composição aproximada 2/3 + 1/3: identificação da turma + avisos;
- menu interno em largura total;
- próximos compromissos em largura total;
- resumos de conteúdo em duas colunas quando houver espaço;
- chamada final para Falar com o professor.

### Tablet
Referência visual aprovada: largura de mockup de **834 px**.

- identificação e avisos empilhados;
- menu principal reorganizado em grade 3 × 2;
- menu interno da turma reorganizado em grade 4 × 2;
- próximos compromissos apresentados em lista vertical;
- resumos de Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links em uma coluna na referência aprovada;
- chamada final “Falar com o Professor” preservada, com o botão posicionado à direita;
- o texto do botão pode quebrar em mais de uma linha quando necessário;
- menus permanecem acessíveis durante a rolagem.

### Celular
Referência visual aprovada: largura de mockup de **390 px**.

- uma coluna;
- menu principal compacto adequado ao toque;
- menu interno compacto, exibindo de forma explícita “Menu da turma” e o item atual;
- não manter box vazio como substituto do controle de navegação;
- tabelas e compromissos reorganizados em cards/blocos verticais quando necessário;
- “Ver cronograma completo” pode quebrar em duas linhas para respeitar a largura disponível;
- resumos das áreas em uma coluna;
- chamada “Falar com o Professor” adaptada para toque, com ação em largura adequada à tela;
- menus persistentes sem ocupar área excessiva da tela.

## Avisos da turma
- priorizar avisos específicos da turma;
- exibir poucos itens na visão inicial;
- permitir “Ver todos”;
- usar os estados Novo, Atenção e Destaque conforme regras globais.

## Cronogramas
Área responsável pela organização das ações relacionadas à distribuição de pontos.

A visão completa aprovada reúne:
1. título “Cronogramas”;
2. seletor com todos os períodos do regime letivo;
3. seleção automática do período exibido, distinguindo período selecionado de período corrente;
4. Total da etapa em área separada;
5. itens do período selecionado.

### Regimes letivos suportados
- bimestral: 4 bimestres;
- trimestral: 3 trimestres;
- semestral: 2 semestres.

Todos os períodos do ano letivo aparecem na mesma área.

O período corrente é derivado automaticamente pelas datas inicial e final dos períodos, usando a condição **data inicial ≤ hoje ≤ data final** no timezone oficial `America/Sao_Paulo`. Não existe campo persistido `atual` ou equivalente. Pode haver intervalo em que nenhum período esteja corrente.

Quando existe período corrente, ele é também o período selecionado. Quando não existe período corrente, a seleção automática usa a cronologia das datas: antes do primeiro período, seleciona o primeiro; no intervalo entre períodos, seleciona o próximo; depois do último período, seleciona o último. Em termos operacionais, após procurar o período corrente, seleciona-se o primeiro período futuro por `dataInicial` e, se ele não existir, o último período cronológico.

O período selecionado recebe o destaque visual já aprovado e fornece os itens e o Total da etapa exibidos. A identificação “Período atual” aparece somente quando o período selecionado é de fato o período corrente. Um período selecionado antes, entre ou depois dos intervalos letivos não é tratado como corrente e não recebe essa identificação. Não se criam campo persistido, nova cor, novo badge, novo texto ou nova interação.

### Desktop — 1440 px
- seletor de períodos em largura disponível;
- Total da etapa separado da tabela;
- tabela principal com as colunas exatas Data/Prazo, Tipo, Descrição/Conteúdo e Valor;
- Descrição/Conteúdo recebe a maior largura;
- itens passados permanecem visíveis.

### Tablet — 834 px
- preserva a estrutura de título, seletor, Total da etapa e tabela;
- mantém as quatro colunas;
- não usa rolagem horizontal.

### Mobile — 390 px
- seletor responsivo sem rolagem horizontal, capaz de acomodar dois, três ou quatro períodos;
- a tabela deixa de ser visualmente tabular;
- cada item passa a bloco vertical;
- Data/Prazo e Valor ficam na região superior;
- Tipo aparece abaixo;
- Descrição/Conteúdo vem na sequência.

### Itens
Na própria data/prazo, o item permanece vigente e com apresentação normal. A partir do dia seguinte, passa automaticamente ao estado passado e permanece acessível, sem edição nem campo manual de situação.

No item passado:
- Data/Prazo recebe atenuação visual e texto riscado (`line-through`);
- Tipo recebe atenuação visual e texto riscado (`line-through`);
- Descrição/Conteúdo recebe atenuação visual e texto riscado (`line-through`);
- Valor permanece visível, conserva o valor original e não recebe `line-through`.

Itens futuros permanecem com aparência normal.

### Total da etapa
O Total da etapa é derivado da soma dos valores de todos os itens do período que possuam valor. O estado temporal não remove o item nem o valor, não interfere no cálculo e não exclui itens passados da soma. Item sem valor não acrescenta zero visualmente nem é somado.

Não exibir:
- status manual;
- ícone de concluído;
- checkbox;
- notas individuais;
- pontos previstos ou distribuídos;
- saldo;
- média;
- desempenho.

### Ausência de conteúdo real
Quando uma turma não possuir regime, períodos ou itens reais suficientes para compor a visão:
- preservar o contexto institucional e da turma;
- não renderizar seletor vazio;
- não renderizar tabela vazia;
- não inventar período, datas, mensagem de ausência ou placeholder;
- manter a infraestrutura pronta para os registros reais futuros.

O protótipo temporário de Cronogramas cumpriu sua função de validação, o layout aprovado foi incorporado a `CronogramasView.astro` e a página temporária foi removida. A referência vigente é o componente real.

## Atividades e listas
Área para exercícios, atividades e listas de exercícios.

- listagem única;
- ordem fixa: publicação mais recente no topo;
- em empate de publicação, título em ordem alfabética crescente no locale pt-BR;
- sem filtro aplicado, toda a lista permanece visível;
- filtros visuais exclusivamente de Busca, Assunto e Tipo;
- nesta etapa, filtros sem interatividade definitiva, sem JavaScript, sem semântica de busca, estado de nenhum resultado, persistência em URL ou ordenação interativa;
- tipos: Atividade e Lista de exercícios;
- prazo opcional;
- atividades vencidas permanecem acessíveis;
- permitir múltiplos recursos por registro;
- permitir gabarito/resolução opcional;
- gabarito ausente não gera campo vazio, aviso ou botão desabilitado;
- permitir data de liberação do gabarito;
- vídeos relacionados são opcionais no modelo, mas sua apresentação visual permanece adiada.

### Apresentação dos registros
Em todos os registros, exibir os metadados Assunto, Publicação e Prazo. O campo Prazo permanece opcional no modelo de conteúdo; quando não houver data cadastrada, sua apresentação será exatamente `-`.

#### Desktop — 1440 px
- manter o selo de Tipo em linha própria;
- na faixa seguinte, posicionar o título à esquerda e os três metadados agrupados à direita;
- título, Assunto, Publicação e Prazo permanecem na mesma faixa horizontal;
- o título ocupa a largura flexível restante;
- os metadados têm peso visual secundário e não competem com o título.

#### Tablet — 834 px
- manter a mesma organização do desktop;
- título e os três metadados permanecem na mesma faixa horizontal;
- ajustar apenas larguras, espaçamentos e tipografia necessários;
- não permitir overflow horizontal, sobreposição ou texto cortado.

#### Mobile — 390 px
- manter o selo de Tipo em linha própria;
- apresentar o título em linha própria;
- imediatamente abaixo, distribuir Assunto, Publicação e Prazo uniformemente na largura disponível;
- manter os três rótulos legíveis, sem sobreposição nem overflow horizontal.

### Corpo opcional do registro
Abaixo do cabeçalho do registro, a composição pode incluir:
- descrição opcional como texto corrido, sem box interno;
- subseção Recursos, quando houver recursos vinculados;
- subseção GABARITO / RESOLUÇÃO, quando houver conjunto disponível ou liberação futura programada.

Quando a descrição estiver ausente, não renderizar nem reservar espaço.

### Recursos
- `recursos` contém um ou vários Recursos vinculados;
- mostrar somente o nome de cada recurso como link independente;
- nunca mostrar a URL em texto bruto;
- preservar espaçamento claro e quebra natural responsiva;
- não criar card individual para cada recurso.

### Gabarito / Resolução
O título “GABARITO / RESOLUÇÃO” usa o mesmo tratamento visual de “RECURSOS” e nunca é link.

Quando os recursos estiverem liberados:
- mostrar um ou vários Recursos vinculados como links independentes.

Quando existir data futura de liberação:
- não mostrar links;
- não revelar nomes dos recursos;
- mostrar somente `Disponível em {data formatada}` como informação temporal discreta;
- não usar cadeado, ícone, botão desabilitado, campo cinza, badge, alerta, cor de sucesso/erro, texto de bloqueio/indisponibilidade ou contagem regressiva.

Na própria data de liberação, o conjunto inteiro passa a ficar disponível. O estado é derivado da data e da noção central de hoje em `America/Sao_Paulo`, sem campo persistido de situação.

### Implementação e ausência de conteúdo real
- a composição completa fica encapsulada em componente reutilizável que recebe dados preparados por propriedades e não contém fixtures;
- o protótipo temporário cumpriu sua função de validação, o layout aprovado foi incorporado a `ActivitiesListsView.astro` e a página temporária foi removida; a referência vigente é o componente real;
- a rota real usa exclusivamente registros da coleção da turma;
- quando não houver registros reais, preservar o contexto institucional e da turma sem renderizar filtros, listagem, mensagem vazia, placeholder ou fixture;
- não renderizar Vídeos relacionados nem placeholder enquanto sua apresentação estiver adiada.

## Para estudar
Área de roteiros de estudo orientados a um **objetivo concreto**.

### Listagem e filtros
- listagem única em uma coluna;
- registros ordenados por `publicacao` em ordem decrescente;
- em empate de publicação, `titulo` crescente no locale pt-BR;
- filtros visuais exclusivamente de Busca e Assunto;
- nesta etapa, filtros sem interatividade definitiva, JavaScript, busca real, query string, botão de limpar, contador ou estado de nenhum resultado;
- sem filtro aplicado, toda a lista permanece visível.

### Título, objetivo e tipo de objetivo
- `titulo` e `objetivo` são campos obrigatórios e distintos;
- o título é o elemento principal do registro;
- o objetivo aparece abaixo do cabeçalho, precedido pelo rótulo visual `OBJETIVO`;
- o objetivo tem hierarquia superior ao resumo/orientação e subordinada ao título;
- `tipoObjetivo` permanece opcional no modelo, mas não possui taxonomia nem apresentação visual aprovada e não é renderizado;
- não apresentar objetivo ou tipo de objetivo como badge, status, alerta, tarefa ou prazo.

### Metadados e data opcional
Os metadados são Assunto, Publicação e, quando existir, a data do objetivo. O rótulo visual da data é exatamente `DATA`; o nome técnico permanece `dataObjetivo`.

Quando `dataObjetivo` estiver ausente:
- não renderizar o campo;
- não mostrar placeholder, hífen ou “Sem data”;
- não reservar espaço vazio.

### Desktop — 1440 px
- título à esquerda e metadados agrupados à direita na mesma faixa horizontal;
- metadados em colunas regulares, com rótulo e valor no mesmo eixo central;
- título dominante e metadados secundários, sem sobreposição ou overflow.

### Tablet — 834 px
- preservar a organização horizontal do desktop;
- admitir quebra natural do título;
- manter cada metadado centralizado em sua própria coluna;
- não permitir compressão excessiva, sobreposição, overflow ou invasão do título.

### Mobile — 390 px
- breakpoint aprovado: `max-width: 767px`;
- o cabeçalho abandona a grade horizontal e usa composição vertical própria;
- título em faixa exclusiva de 100%, alinhado à esquerda;
- metadados somente abaixo do término completo do título;
- com `dataObjetivo`, metadados em três colunas iguais: Assunto, Publicação e Data;
- sem `dataObjetivo`, metadados em duas colunas iguais: Assunto e Publicação;
- cada metadado ocupa integralmente sua coluna, com rótulo e valor centralizados;
- valores longos quebram somente dentro da própria coluna;
- não usar coluna residual, margem negativa, transform, posicionamento absoluto ou compensação por conteúdo.

### Estado temporal
Quando houver `dataObjetivo`, o estado é derivado pela noção central de hoje no timezone `America/Sao_Paulo`:
- `hoje <= dataObjetivo` → apresentação normal;
- `hoje > dataObjetivo` → apresentação atenuada.

O registro permanece normal durante todo o próprio dia do objetivo e só fica atenuado no dia seguinte. O registro atenuado permanece visível, acessível, legível e com links funcionais, sem tachado, checkbox, ícone, badge ou status manual. Sem `dataObjetivo`, não derivar estado passado por esse campo.

### Corpo do registro
- `resumoOrientacao` aparece abaixo do objetivo como texto corrido, sem card interno;
- `recursos` contém um ou vários Recursos vinculados, mostrados somente pelo nome como links independentes;
- `leiturasRelacionadas`, quando presente, forma subseção opcional com a mesma linguagem visual de Recursos;
- ausência de Leituras relacionadas não renderiza nem reserva espaço;
- `videosRelacionados` permanece preservado nos dados, mas não é renderizado enquanto a visão completa de Vídeos não estiver aprovada;
- não criar cards internos, URL bruta ou placeholder para conteúdo opcional ausente.

### Implementação e ausência de conteúdo real
- a composição completa fica encapsulada em componente reutilizável que recebe dados preparados por propriedades e não contém fixtures;
- o protótipo temporário cumpriu sua função de validação, o layout aprovado foi incorporado a `StudyView.astro` e a página temporária foi removida; a referência vigente é o componente real;
- a regra temporal é preparada fora do componente visual;
- a rota real usa exclusivamente registros da coleção da turma;
- quando não houver registros reais, preservar o contexto institucional e da turma sem renderizar filtros, listagem, mensagem vazia, placeholder ou fixture.

## Trabalhos
Área destinada às propostas de trabalhos da turma.

### Listagem e filtros
- listagem única em uma coluna;
- registros ordenados por `publicacao` em ordem decrescente;
- em empate de publicação, `titulo` crescente no locale pt-BR;
- filtros visuais exclusivamente de Busca e Assunto;
- nesta etapa, filtros sem interatividade definitiva, JavaScript, busca real, query string, botão de limpar, contador ou estado de nenhum resultado.

### Campos e cabeçalho do registro
- `titulo` é obrigatório conforme o Modelo de Conteúdo e o schema vigentes e constitui o elemento principal;
- os metadados são Assunto, Publicação e a data de `marco`;
- na visão da turma, o rótulo visual do metadado temporal é sempre `ENTREGA`;
- o valor técnico de `marco.tipo` permanece Entrega ou Apresentação nos dados e não é exibido;
- cada registro mantém exatamente um `marco` obrigatório e uma única data;
- não criar fallback de título, segundo marco, status ou campo persistido de entrega.

### Desktop — 1440 px
- título à esquerda e Assunto, Publicação e Entrega agrupados à direita na mesma faixa horizontal;
- título dominante e metadados secundários;
- os três metadados usam colunas regulares, com rótulo e valor no mesmo eixo central;
- abaixo do cabeçalho aparecem descrição opcional, Documento do trabalho e Recursos adicionais opcionais.

### Tablet — 834 px
- preservar a organização horizontal do desktop;
- permitir quebra natural do título;
- manter os metadados centralizados em suas próprias colunas;
- não permitir sobreposição, overflow, invasão entre campos ou quebra arbitrária de palavras.

### Mobile — 390 px
- breakpoint aprovado: `max-width: 767px`;
- o título ocupa faixa própria em toda a largura;
- Assunto, Publicação e Entrega aparecem na faixa seguinte;
- a grade dos metadados usa `minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)`;
- Assunto recebe a maior largura;
- rótulo e valor permanecem centralizados no mesmo eixo;
- valores quebram entre palavras, sem `overflow-wrap: anywhere` ou `word-break: break-all`;
- não permitir quebra interna arbitrária, como dividir “proporcionalidade”.

### Corpo do registro
- `descricao`, quando presente, aparece como texto corrido abaixo do cabeçalho, sem card ou fundo próprio;
- ausência de descrição não renderiza nem reserva espaço;
- `documentoTrabalho` contém exatamente um Recurso vinculado obrigatório, apresentado sob o rótulo `DOCUMENTO DO TRABALHO`;
- mostrar somente o nome do documento como link, nunca a URL bruta e sem card interno;
- `recursosAdicionais`, quando presente, contém um ou vários Recursos vinculados apresentados sob `RECURSOS ADICIONAIS` como links independentes;
- ausência de Recursos adicionais não renderiza subseção, placeholder ou espaço;
- `tags` permanece nos dados, sem apresentação visual aprovada nesta visão.

### Estado temporal
O estado usa a noção central de hoje em `America/Sao_Paulo`:
- `hoje <= marco.data` → apresentação normal;
- `hoje > marco.data` → apresentação atenuada.

O trabalho permanece normal durante todo o próprio dia do marco e só fica atenuado no dia seguinte. O registro passado permanece visível, acessível, legível e com links funcionais, sem `line-through`, checkbox, badge, status textual ou ícone de conclusão. Não persistir passado, concluído, atrasado, entregue ou apresentado.

### Elementos ausentes
Não apresentar valor, pontos, nota, média, progresso, formulário, botão Entregar, upload, campo de arquivo, confirmação de envio ou etapas do trabalho.

### Implementação e ausência de conteúdo real
- a composição completa fica em componente reutilizável que recebe dados preparados por propriedades e não contém fixtures;
- o protótipo temporário cumpriu sua função de validação, o layout aprovado foi incorporado a `WorksView.astro` e a página temporária foi removida; a referência vigente é o componente real;
- a regra temporal é preparada fora do componente visual;
- a rota real usa exclusivamente registros da coleção da turma;
- quando não houver registros reais, preservar o contexto institucional e da turma sem renderizar filtros, listagem, mensagem vazia, placeholder ou fixture.

## Materiais
Acervo permanente de recursos pedagógicos da turma.

### Listagem e filtros
- listagem em uma única coluna, com separações discretas entre os registros;
- filtros visuais exatamente de Busca, Área, Subárea, Conteúdo e Tipo;
- nesta etapa, os filtros permanecem sem JavaScript, busca real, filtragem, dependência dinâmica entre os níveis, query string, botão de limpar, contador ou estado de nenhum resultado;
- sem filtro aplicado, todo o acervo permanece acessível;
- não usar mosaico, sidebar ou cards internos.

### Campos e apresentação
- `titulo` é o elemento principal do registro;
- `tipo` é obrigatório, permanece texto livre e aparece como metadado textual secundário, sem enum visual, cor por tipo ou aparência de status;
- `arquivoLink` contém exatamente um Recurso vinculado obrigatório `{ nome, URL }`; a interface mostra somente o nome como link sob o rótulo `ARQUIVO / LINK`, nunca a URL bruta;
- `descricao` permanece opcional e, quando presente, aparece como texto corrido conforme a composição aprovada; sua ausência não renderiza nem reserva espaço;
- `publicacao` e `tags` permanecem preservados nos dados e não são renderizados nesta visão;
- não derivar estado temporal de `publicacao`.

### Classificações
A organização temática obrigatória é:

**Área → Subárea → Conteúdo**

- `classificacoes` contém uma ou várias cadeias tipográficas discretas;
- cada cadeia contém exatamente `area`, `subarea` e `conteudo`;
- um Material com várias classificações continua sendo um único registro;
- título, Tipo e arquivo/link não são repetidos por classificação;
- as cadeias aparecem separadas dentro do mesmo registro, sem badges coloridos, botões ou cards internos;
- dentro do mesmo Conteúdo, priorizar os Materiais mais recentemente publicados;
- não se define nova ordenação global entre Conteúdos diferentes; quando uma ordenação total for tecnicamente necessária, preservar o comportamento existente sem criar requisito editorial.

### Desktop — 1440 px
- os cinco filtros permanecem na mesma faixa;
- título dominante, Tipo secundário, arquivo/link claro e classificações facilmente escaneáveis.

### Tablet — 834 px
- Busca ocupa a largura total;
- Área, Subárea, Conteúdo e Tipo usam grade 2 × 2;
- registros preservam leitura, quebra natural e ausência de sobreposição ou overflow horizontal.

### Mobile — 390 px
- filtros empilhados;
- título em faixa própria e Tipo abaixo;
- arquivo/link com boa área de toque;
- classificações quebram naturalmente, sem partir palavras arbitrariamente;
- classificações múltiplas permanecem dentro do mesmo registro;
- nenhum overflow horizontal.

### Estados e implementação
Materiais não possuem prazo, vencimento, status, atenuação temporal, ativo/inativo, dificuldade, pontuação ou progresso.

A composição completa fica encapsulada em `MaterialsView.astro`, que recebe os registros por propriedades e não contém fixtures. O protótipo temporário cumpriu sua função de validação, o layout aprovado foi incorporado ao componente real e a página temporária foi removida. A referência vigente é `MaterialsView.astro`. A rota real usa somente registros da coleção da turma.

Quando não houver registros reais, preservar Header, menu global, breadcrumb, identificação da turma, menu interno com Materiais ativo, sticky e Footer, sem renderizar filtros, listagem, mensagem vazia, placeholder ou fixture.

## Vídeos
Biblioteca reutilizável de vídeos de apoio.

### Listagem, ordenação e filtros
- registros ordenados por `publicacao` em ordem decrescente;
- em empate de publicação, `titulo` crescente no locale pt-BR;
- não ordenar por prioridade, duração ou provedor;
- filtros visuais exatamente de Busca, Área, Subárea, Conteúdo e Prioridade;
- nesta etapa, filtros sem interatividade definitiva, JavaScript, busca real, query string, dependência dinâmica entre níveis, botão de limpar, contador ou estado de nenhum resultado.

### Campos e apresentação
- `miniaturaUrl` alimenta uma área visual 16:9, sem distorção;
- a duração é formatada fora do componente visual a partir do inteiro positivo `duracaoSegundos`;
- prioridade aparece como informação textual neutra, sem semântica de status, alerta ou urgência;
- título constitui a informação textual dominante;
- descrição aparece como texto corrido secundário;
- `provedor` e `tags` permanecem preservados nos dados e não são renderizados;
- não derivar estado temporal de `publicacao`.

### Classificações
A organização temática obrigatória é:

**Área → Subárea → Conteúdo**

- `classificacoes` contém uma ou várias cadeias tipográficas discretas;
- cada cadeia contém exatamente `area`, `subarea` e `conteudo`;
- classificações adicionais aparecem dentro do mesmo card;
- um vídeo permanece um único registro, sem duplicar miniatura, título, descrição ou URL;
- um registro pode atender a diferentes turmas, anos/séries ou segmentos sem duplicação.

### Ação e reprodução
- a ação visual usa exatamente `Ver vídeo`;
- na rota real, a ação é um link externo simples para a `url` do registro, com boas práticas de segurança;
- o portal não incorpora, reproduz ou simula o player nesta visão;
- não usar modal, iframe, autoplay, barra de progresso ou controles de reprodução.

### Responsividade
- no desktop de 1440 px, os cinco filtros ocupam a mesma faixa e a biblioteca usa duas colunas de cards de mídia;
- no tablet de 834 px, Busca ocupa a largura total, os demais filtros formam grade 2 × 2 e a biblioteca usa uma coluna de cards horizontais, com miniatura à esquerda e conteúdo à direita;
- no mobile de 390 px, filtros e cards ficam empilhados, a miniatura mantém 16:9, os metadados usam fluxo vertical e a ação preserva boa área de toque;
- não permitir distorção, sobreposição ou overflow horizontal.

### Estados e implementação
Vídeos não possuem prazo, vencimento, status, atenuação temporal, ativo/inativo, dificuldade, pontuação, nota ou progresso.

A composição completa fica encapsulada em `VideosView.astro`, que recebe os registros por propriedades e não contém fixtures. O protótipo temporário cumpriu sua função de validação, o layout aprovado foi incorporado ao componente real e a página temporária foi removida. A referência vigente é `VideosView.astro`. A rota real usa somente registros da coleção da turma, preparados pela camada de conteúdo conforme a DEC-080.

Quando não houver registros reais, preservar Header, menu global, breadcrumb, identificação da turma, menu interno com Vídeos ativo, sticky e Footer, sem renderizar filtros, cards, mensagem vazia, placeholder ou fixture.

## Links
Área de sites, plataformas, simuladores, calculadoras, ferramentas e recursos externos recomendados.

### Modelo preservado
Cada registro usa somente os campos vigentes `id`, `titulo`, `descricao`, `url`, `finalidade`, `tipo`, `acesso` opcional, `classificacoes` opcionais, `publicacao`, `segmento`, `anoSerie` opcional, `turmas` opcional, `observacaoProfessor` opcional e `tags` opcionais.

Links não substituem arquivos de Materiais nem registros de Vídeos. Não criar logo, prazo, vencimento, status, ativo/inativo, dificuldade, pontuação ou progresso.

### Agrupamento e ordenação
- agrupar exclusivamente por `finalidade`;
- ordenar os grupos pelo nome da finalidade em ordem alfabética crescente no locale pt-BR;
- dentro de cada grupo, ordenar os itens por `titulo` em ordem alfabética crescente no locale pt-BR;
- não agrupar nem ordenar por `publicacao`, `acesso`, `tipo` ou classificação.

### Filtros
A visão completa de Links não possui filtros. Não renderizar busca, finalidade, tipo, Área, Subárea, Conteúdo, ordenação visual, botão de limpar, contador ou estado de nenhum resultado.

### Conteúdo visível
- título da visão: `Links`;
- cada grupo apresenta `FINALIDADE` e o nome da finalidade;
- cada item apresenta `tipo` como informação secundária, `titulo` como elemento dominante, `descricao` em texto corrido e a ação `Acessar`;
- não mostrar URL bruta nem logo;
- `acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` permanecem preservados na camada de dados, mas não são renderizados por não possuírem tratamento visual aprovado.

### Ação externa
Na rota real, `Acessar` aponta para a `url` do registro, abre o recurso externo em nova aba com `rel="noopener noreferrer"` e inclui o ícone externo aprovado. Não usar modal, iframe, incorporação ou rastreamento.

### Responsividade
- desktop de 1440 px: grupos em duas colunas, cabeçalho de finalidade e ação posicionada lateralmente em cada item;
- tablet de 834 px: uma coluna, preservando todos os conteúdos visíveis sem overflow horizontal;
- mobile de 390 px: fluxo vertical com finalidade, tipo, título, descrição e ação em boa área de toque, sem overflow horizontal.

### Componente e rota real
A composição completa fica encapsulada em `LinksView.astro`, que recebe os grupos por propriedades e não contém fixtures. O protótipo temporário cumpriu sua função de validação, o layout aprovado foi incorporado ao componente real e a página temporária foi removida. A referência vigente é `LinksView.astro`. A rota real usa somente registros da coleção `links` aplicáveis à turma, preparados pela camada de conteúdo.

Quando não houver registros reais, preservar Header, menu global, breadcrumb, identificação da turma, menu interno com Links ativo, sticky e Footer, sem renderizar filtros, grupos, mensagem vazia, placeholder ou fixture.

## Provas e Resoluções
A página constitui acervo global de provas de Matemática e respectivas resoluções quando existentes. Ela não representa prova interna de uma Turma, não cria relação direta com registros de `turmas` e não se confunde com datas futuras de prova mantidas em Oportunidades e Datas.

### Estrutura da página
A experiência é somente uma listagem global. Não existe página individual de detalhe. Cada item apresenta informação suficiente para identificação e acesso direto:
- título;
- instituição;
- ano;
- Segmento;
- Ano/Série;
- tipo;
- fase, quando informada;
- assuntos;
- dificuldade, quando informada;
- descrição, quando informada;
- fonte oficial;
- condição de uso, quando informada;
- ações disponíveis.

### Filtros
A implementação real apresenta:
- Busca;
- Segmento;
- Ano/Série;
- Instituição;
- Ano;
- Tipo;
- Fase;
- Assunto;
- Dificuldade, somente quando houver registros que a utilizem.

O estado inicial equivale a **Todos** em cada dimensão e busca vazia. Os filtros combinam-se por lógica **E**. A busca textual ignora caixa e acentos e considera título, instituição, fase e assuntos. Ao selecionar Segmento, as opções de Ano/Série ficam restritas ao segmento; valor incompatível é limpo. A ação **Limpar filtros** aparece somente quando existir filtro ou busca ativa e retorna ao estado inicial. A implementação é client-side, imediata, sem recarga ou persistência e não depende da ordem física dos arquivos.

A rota real utiliza os componentes definitivos e a filtragem aprovada. O protótipo temporário cumpriu a regressão final e foi removido com suas fixtures; query strings de demonstração não integram o contrato da rota real.

### Estados sem itens
Sem qualquer registro no acervo, preservar Header, navegação, título, texto introdutório e Footer, ocultar filtros inúteis e mostrar somente **“Nenhuma prova ou resolução disponível no momento.”** em altura natural.

Quando existirem registros, mas a combinação ativa não encontrar correspondência, manter os filtros e a ação de limpeza e mostrar **“Nenhuma prova ou resolução corresponde aos filtros selecionados.”**, sem cards fictícios.

### Ações e destinos
**Ver prova** existe em todo registro válido e aponta diretamente para o recurso oficial da prova. **Ver resolução** aparece somente quando houver resolução real. A ausência de resolução não gera botão desabilitado, placeholder ou mensagem de indisponibilidade.

Destinos externos abrem em nova aba com `rel="noopener noreferrer"`; destinos internos futuros respeitam `BASE_URL`. Se o recurso obrigatório da prova não tiver destino válido, o registro é inválido e não pode ser publicado.

### Fontes e direitos
A fonte oficial e sua URL são obrigatórias. Arquivos pedagógicos e materiais grandes permanecem externamente no Google Drive ou na origem oficial; o repositório guarda somente metadados e links. Condição de uso ou licença é registrada apenas quando houver informação verificável. Material de terceiros não é copiado para o repositório sem autorização.

### Implementação real
A rota `/provas-e-resolucoes/` carrega a coleção `provas`, usa o utilitário central `src/utils/provas.ts` para validar relações, normalizar, ordenar e derivar opções e renderiza componentes reutilizáveis em `src/components/provas/`. Não existe conteúdo real inicial; a coleção vazia produz o estado vazio aprovado, sem filtros ou cards.

Após a regressão final aprovada, o protótipo `/validacao-provas-e-resolucoes/` e suas fixtures foram removidos. A referência funcional vigente é a rota real com os componentes em `src/components/provas/`. Não existe rota de detalhe nem coleção separada de resoluções.

## Oportunidades e Datas
- ENEM;
- vestibulares;
- CEFET/institutos;
- processos seriados;
- concursos;
- olimpíadas;
- eventos.

Filtros:
- categoria;
- instituição;
- segmento;
- situação;
- ano.

## Matemática além da sala
- Curiosidades;
- História da Matemática;
- Personalidades;
- Matemática no cotidiano;
- Aplicações;
- Desafios;
- Vídeos;
- Leituras;
- Sites e recursos.

## Falar com o Professor
A página oferece um único formulário de comunicação privada. São obrigatórios:
- Nome;
- E-mail;
- Motivo;
- Mensagem.

Não existe upload de arquivos. O formulário não publica mensagens no portal e não constitui área de comentários.

### Contexto de turma
Quando a página for acessada a partir de uma área de turma, o parâmetro técnico `turma` já existente transporta o `slug` da Turma. O valor é resolvido contra os registros reais da coleção `turmas`; somente uma Turma reconhecida fornece contexto.

Para uma Turma reconhecida:
- valor técnico enviado: `turma.slug`;
- valor exibido: `anoSerie — nome`;
- o contexto é somente leitura e não pode ser editado pelo usuário.

Quando o acesso ocorrer pelo menu global, quando o parâmetro estiver ausente ou quando não corresponder a uma Turma reconhecida:
- valor técnico enviado: `contato-geral`;
- valor exibido: **Não se aplica / contato geral**.

O valor exibido nunca substitui nem modifica o identificador técnico enviado.

### Estados
O formulário possui exatamente quatro estados de interface:
1. inicial — campos disponíveis e botão **Enviar mensagem** habilitado;
2. enviando — botão desabilitado e mensagem **“Enviando mensagem…”**;
3. sucesso — confirmação **“Mensagem enviada com sucesso.”**, sem redirecionamento automático e sem reapresentar os dados pessoais enviados;
4. erro — formulário disponível para nova tentativa e mensagem **“Não foi possível enviar a mensagem. Tente novamente.”**.

O estado de erro pode preservar os valores apenas na memória da página atual para permitir correção ou nova tentativa. Nenhum valor é persistido em `localStorage`, `sessionStorage`, IndexedDB, cookies, conteúdo estático ou repositório.

### Privacidade
Nome, E-mail, Motivo e Mensagem não podem compor a URL ou a query string. O site não armazena mensagens localmente, não cria banco de dados próprio e não grava dados pessoais no Git. Na rota real, o navegador envia esses dados por `POST` diretamente ao Formspree, serviço externo que os processa e pode armazenar a submissão para encaminhamento ao professor; o arquivo de submissões do serviço está habilitado. Não há analytics ou rastreamento do formulário nesta etapa.

A orientação de privacidade usa exatamente **“Comunicação privada. Os dados deste formulário são enviados pelo Formspree para encaminhamento da mensagem ao professor.”**. A nota do formulário usa exatamente **“Nome, e-mail, motivo e mensagem não são colocados na URL nem armazenados pelo site. O Formspree processa e pode armazenar a submissão para realizar o envio.”**.

### Responsividade e validação
A composição deve reutilizar `BaseLayout`, Header, navegação, Footer, tokens e componentes visuais vigentes, sem redesenhar o portal. O formulário deve ser validado em 1440 px, 834 px e 390 px, com labels explícitos, foco visível, navegação por teclado, contraste adequado, boa área de toque e ausência de overflow horizontal.

O protótipo temporário `/validacao-falar-com-o-professor/` cumpriu sua função de validação e foi removido após a aprovação do teste manual real. A rota `/falar-com-o-professor/` reutiliza a composição e os componentes aprovados, realiza envio AJAX direto ao endpoint público do Formspree sem redirecionamento e passa a ser a referência funcional definitiva. O registro visual histórico permanece no `09-MOCKUPS-APROVADOS-v2.7.md`.

## Novidades
Novidades é uma projeção automática dos registros originais e não possui coleção duplicada. Um mesmo registro gera no máximo um item, inclusive quando for aplicável a várias turmas.

Conteúdo global pode participar sem associação a turma. Conteúdo com audiência de turmas participa somente quando alcançar pelo menos uma turma não arquivada. Conteúdo destinado exclusivamente a turmas arquivadas não participa, inclusive durante Destaque.

Somente coleções existentes podem alimentar a implementação de cada etapa. Fontes futuras, como inscrições e provas datadas de Oportunidades e Datas, passam a aplicar o mesmo contrato quando suas coleções forem implementadas.

### Estados e janelas
Cada item ativo apresenta no máximo um estado entre **Destaque**, **Atenção** e **Novo**, nessa ordem de precedência. Avisos preservam sua prioridade, publicação e validade próprias.

Novo utiliza a data civil de `publicacao` no timezone `America/Sao_Paulo`:
- Atividade/Lista sem prazo e Para estudar sem `dataObjetivo`: 7 dias, por `publicacao <= hoje < publicacao + 7 dias`;
- Materiais, Vídeos, Links e conteúdo editorial sem data crítica: 10 dias, por `publicacao <= hoje < publicacao + 10 dias`;
- registros com data crítica também podem receber Novo a partir da publicação, enquanto a respectiva janela estiver ativa.

Atenção começa sete dias antes da data crítica, inclusive:
- Item de Cronograma, Atividade/Lista com prazo e Para estudar com `dataObjetivo`: D−7 até D, com saída em D+1;
- Trabalho: D−7 até D+1, com saída em D+2;
- futuramente, inscrições e provas datadas de Oportunidades e Datas: D−7 até D+1, com saída em D+2.

Item de Cronograma pode entrar como Atenção mesmo sem `publicacao`. Quando Novo e Atenção coincidirem, somente Atenção é apresentado.

O contrato futuro permite no registro original o bloco opcional `destaqueNovidades`, com `inicio` e `fim` obrigatórios. Durante `inicio <= hoje <= fim`, o estado é Destaque. O bloco não duplica o conteúdo, não oferece ocultação manual e não supera a exclusão de audiência composta apenas por turmas arquivadas.

### Ordenação transversal
A lista inteira é ordenada antes de qualquer limite visual:
1. Destaque, Atenção e Novo;
2. em Destaque, `fim` crescente;
3. em Atenção, data crítica crescente;
4. em Novo, `publicacao` decrescente;
5. dentro de cada empate, título no locale pt-BR, fonte e ID estável.

A ordem física dos arquivos nunca é critério de ordenação.

### Painel da Home
A Home apresenta no máximo seis Novidades, depois da elegibilidade, do cálculo de estado e da ordenação. Com pelo menos um item, pode apresentar a ação **Ver todas**, destinada a `/novidades/`.

Quando não existir Novidade ativa, o painel é preservado e mostra somente **“Nenhuma novidade no momento.”**, sem cards vazios, Ver todas, CTA ou placeholder adicional.

### Desktop
Painel lateral compacto, altura controlada, rolagem interna e botão “Ver todas”.

### Tablet
Bloco compacto adaptado.

### Celular
Versão reduzida/compacta, podendo usar expansão ou rolagem horizontal.

As novidades devem privilegiar categorias amplas, como “3º ano”, e não “3º Ano A”, quando a comunicação for global.

### Visão completa futura
A rota `/novidades/` apresenta todas as Novidades ativas, não precisa entrar no menu global e não mantém histórico próprio. Itens expirados continuam somente nas áreas de origem.

Na Home, cada item aponta conceitualmente para `/novidades/#<chave-estavel>`. Na visão completa, o registro correspondente oferece as ações para suas origens reais. Quando alcançar uma turma, há ação para a área correspondente; quando alcançar várias, as turmas aplicáveis aparecem em ordem institucional, sem escolha arbitrária; quando possuir destino global ou URL própria, usa o destino canônico existente. Não são criadas páginas individuais de detalhe.

## Menu principal
- Início
- Turmas
- Provas e Resoluções
- Oportunidades e Datas
- Matemática além da sala
- Falar com o Professor

## Acesso rápido
Boxes visualmente uniformes; não usar uma cor forte diferente para cada box.

## Acesso às turmas
Diferenciação cromática por segmento é desejada:
- Fundamental — Anos Finais;
- Ensino Médio.
