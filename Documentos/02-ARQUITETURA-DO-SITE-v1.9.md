# Arquitetura Organizacional do Site

Versão: 1.9  
Status: APROVADO — VISÃO COMPLETA DE TRABALHOS
Última atualização: 26/08/2026

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
3. destaque automático do período corrente;
4. Total da etapa em área separada;
5. itens do período exibido.

### Regimes letivos suportados
- bimestral: 4 bimestres;
- trimestral: 3 trimestres;
- semestral: 2 semestres.

Todos os períodos do ano letivo aparecem na mesma área.

O período corrente é derivado automaticamente pelas datas inicial e final dos períodos, usando a condição **data inicial ≤ hoje ≤ data final** no timezone oficial `America/Sao_Paulo`. Não existe campo persistido `atual` ou equivalente. Pode haver intervalo em que nenhum período esteja corrente.

O período corrente recebe destaque visual e a identificação “Período atual”. Períodos anteriores ou futuros permanecem disponíveis com menor ênfase.

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
- a página temporária de validação conserva as fixtures locais e reutiliza o componente;
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
- a página temporária de validação conserva as fixtures locais e reutiliza o componente;
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
- a página temporária conserva as fixtures locais e reutiliza o componente;
- a regra temporal é preparada fora do componente visual;
- a rota real usa exclusivamente registros da coleção da turma;
- quando não houver registros reais, preservar o contexto institucional e da turma sem renderizar filtros, listagem, mensagem vazia, placeholder ou fixture.

## Materiais
Acervo permanente de recursos pedagógicos da turma.

Organização temática obrigatória:

**Área → Subárea → Conteúdo**

Regras:
- um registro corresponde a um único material e um único arquivo/link;
- um material pode possuir múltiplas classificações;
- o mesmo registro pode aparecer em mais de um ponto da hierarquia sem ser duplicado;
- materiais não têm prazo;
- agrupamento principal por Área → Subárea → Conteúdo;
- dentro do mesmo conteúdo, priorizar os mais recentemente publicados;
- filtros devem atender aos três níveis de classificação;
- busca e filtro por tipo podem ser usados adicionalmente;
- sem filtro aplicado, todo o acervo permanece acessível.

## Vídeos
Biblioteca reutilizável de vídeos de apoio.

Organização temática:

**Área → Subárea → Conteúdo**

Regras:
- um vídeo pode possuir múltiplas classificações;
- um registro pode atender a diferentes turmas, anos/séries ou segmentos sem duplicação;
- filtros: busca, Área, Subárea, Conteúdo e prioridade;
- prioridades: Essencial, Recomendado e Complementar;
- dentro de um conteúdo, ordenar por prioridade e, dentro da mesma prioridade, pelos mais recentes;
- não usar ativo/inativo;
- vídeos não têm prazo;
- miniatura 16:9;
- player em modal responsivo;
- alternativa para abrir no provedor.

## Links
Área de sites, plataformas, simuladores, calculadoras, ferramentas e recursos externos recomendados.

Regras:
- não usar Links como substituto de Materiais ou Vídeos;
- agrupamento principal por finalidade;
- classificação matemática Área → Subárea → Conteúdo é opcional e pode ser múltipla;
- filtros podem incluir busca, finalidade, tipo, Área, Subárea e Conteúdo;
- sem filtro aplicado, todos os recursos são exibidos;
- não têm prazo;
- não usam ativo/inativo;
- abrir no serviço externo apropriado.

## Provas e Resoluções
Abranger ENEM, vestibulares, concursos, processos seriados, olimpíadas e outras instituições.

Filtros:
- instituição;
- ano;
- tipo;
- fase;
- assunto;
- dificuldade, quando aplicável;
- busca.

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

## Novidades
Novas inserções relevantes nas áreas da turma devem aparecer automaticamente em Novidades, sem cadastro duplicado.

### Desktop
Painel lateral compacto, altura controlada, rolagem interna e botão “Ver todas”.

### Tablet
Bloco compacto adaptado.

### Celular
Versão reduzida/compacta, podendo usar expansão ou rolagem horizontal.

As novidades devem privilegiar categorias amplas, como “3º ano”, e não “3º Ano A”, quando a comunicação for global.

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
