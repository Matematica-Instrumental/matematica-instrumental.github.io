# Arquitetura Organizacional do Site

Versão: 1.5  
Status: APROVADO — VISÃO COMPLETA DE CRONOGRAMAS
Última atualização: 24/08/2026

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
- sem filtro aplicado, toda a lista permanece visível;
- filtros: busca, assunto e tipo;
- prazo opcional;
- atividades vencidas permanecem acessíveis;
- permitir múltiplos recursos por registro;
- permitir gabarito/resolução opcional;
- gabarito ausente não gera campo vazio, aviso ou botão desabilitado;
- permitir data de liberação do gabarito;
- vídeos relacionados são opcionais.

## Para estudar
Área de roteiros de estudo orientados a um **objetivo concreto**.

Exemplos de objetivo:
- prova;
- recuperação;
- concurso;
- vestibular;
- ENEM;
- olimpíada;
- atividade ou outro objetivo pertinente.

Regras:
- todo registro deve indicar o objetivo;
- permitir múltiplos recursos/links;
- permitir vídeos e leituras relacionados;
- não usar prazo de estudo manual;
- quando houver data do objetivo, o roteiro permanece normal até a data e passa a apresentação atenuada a partir do dia seguinte;
- permanece acessível para consulta histórica;
- listagem única por publicação, mais recente primeiro;
- filtros: busca e assunto;
- sem filtro aplicado, todos os registros são exibidos.

## Trabalhos
Área destinada às propostas de trabalhos da turma.

- listagem única por publicação, mais recente primeiro;
- filtros: busca e assunto;
- cada trabalho possui documento próprio com todas as orientações;
- a página não cria campos separados para forma de realização, forma de entrega ou etapas;
- permitir múltiplos recursos adicionais;
- não haverá upload de alunos ou visitantes;
- não armazenar pontuação do trabalho nesta área;
- não criar relações obrigatórias com outras áreas;
- após a data de entrega/apresentação, o registro permanece disponível com apresentação atenuada.

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
