# Design System — Matemática Instrumental

Versão: 1.8  
Status: APROVADO — REFINAMENTO MOBILE DE ATIVIDADES E LISTAS
Última atualização: 24/08/2026

## Direção visual
Profissional, contemporânea, organizada, sóbria, amigável e não infantil.

## Cabeçalho
- cabeçalho maior;
- identidade visual em destaque;
- logo com forte presença horizontal;
- foto do professor ao lado do nome/identidade;
- menu abaixo do cabeçalho;
- menu ocupando a largura disponível no desktop.

Nas páginas de turma, manter o mesmo padrão institucional da home.

O cabeçalho institucional grande não precisa permanecer fixo durante a rolagem.

### Frase institucional no cabeçalho
No desktop, no tablet e no mobile, usar a apresentação aprovada em três linhas explícitas:

**Matemática:**  
**Mais do que uma disciplina,**  
**uma ferramenta para a vida!**

As quebras são deliberadas e não dependem do wrapping automático do viewport.

## Menus fixos
Nas páginas de turma:
- o menu principal do portal deve permanecer acessível durante a rolagem;
- o menu interno da turma também deve permanecer acessível;
- o item atual do menu interno deve ter destaque discreto e consistente;
- evitar que os menus fixos ocultem títulos ou conteúdos;
- no celular, usar versão compacta da navegação interna em vez de comprimir oito itens.

## Navegação interna da turma
Ordem:

**Início da turma | Cronogramas | Atividades e listas | Para estudar | Trabalhos | Materiais | Vídeos | Links**

No desktop, priorizar barra horizontal em largura disponível.

No tablet, reorganizar conforme a largura disponível.

No celular, usar menu compacto adequado ao toque.

### Controle compacto no celular
Referência de validação: **390 px**.

#### Estado fechado
- preservar a caixa compacta aprovada;
- exibir “Menu da turma”;
- exibir o nome da visão atual;
- exibir chevron indicando possibilidade de expansão;
- manter borda, cantos, cores, dimensões e posição sticky aprovados.

#### Estado aberto
- a caixa compacta permanece como cabeçalho do controle;
- imediatamente abaixo, apresentar lista vertical com as oito visões na ordem aprovada;
- a lista deve ser continuação visual do cabeçalho, dentro do mesmo shell;
- usar fundo totalmente opaco, borda coerente, separadores discretos e linhas adequadas ao toque;
- manter a visão atual destacada em azul e com fundo suave;
- usar links HTML reais para as visões quando houver contexto real da turma;
- orientar o chevron para cima;
- não usar drawer, modal, overlay de tela ou select nativo;
- não exibir simultaneamente a composição desktop/tablet.

#### Acessibilidade e interação
- usar botão semântico para alternar o estado;
- informar o estado por `aria-expanded`;
- associar o botão à lista por `aria-controls`;
- manter a lista fechada fora da navegação por teclado;
- preservar o comportamento nativo de Enter e Space;
- fechar por Escape;
- não persistir o estado entre páginas.

#### Comportamento sticky aberto
- menu principal permanece sticky no topo;
- cabeçalho e lista do menu da turma formam uma única região opaca imediatamente abaixo;
- conteúdo continua rolando por baixo sem aparecer através da região ou de suas bordas;
- não criar vazamento lateral, sobreposição indevida ou overflow horizontal.

O estado aberto aprovado tem como referência visual local temporária `Site/src/pages/validacao-menu-mobile.astro`.

Desktop e tablet permanecem inalterados.

## Fundo e seções
- fundo geral cinza;
- boxes claramente diferenciados;
- degradês discretos para mais claro ou mais escuro;
- evitar fundo e boxes com mesma aparência;
- bordas e sombras discretas;
- cantos arredondados coerentes com a home aprovada.

## Página de turma — composição visual
### Desktop
- faixa inicial aproximada 2/3 + 1/3 para identificação da turma e avisos;
- próximos compromissos em largura total;
- resumos de Atividades/Para estudar, Trabalhos/Materiais e Vídeos/Links em duas colunas quando houver espaço;
- boxes vazios não devem ser mantidos apenas para preservar a grade; o layout deve se reorganizar.

### Tablet
Referência aprovada: **834 px**.

- cabeçalho reorganizado em duas faixas;
- frase institucional em três linhas conforme regra acima;
- menu principal em grade 3 × 2;
- identificação e avisos empilhados;
- menu interno em grade 4 × 2;
- próximos compromissos em lista vertical;
- seis resumos em uma coluna na referência aprovada;
- chamada “Falar com o Professor” com ação no lado direito, admitindo quebra controlada no texto do botão;
- não reduzir o desktop mecanicamente.

### Celular
Referência aprovada: **390 px**.

- uma coluna;
- menu principal em controle compacto;
- menu interno em controle compacto adequado ao toque, mostrando o item atual;
- o controle compacto deve ocupar o box destinado à navegação, sem deixar container branco vazio;
- tabelas e compromissos convertidos em cards ou estruturas verticais quando necessário;
- links de ação longos, como “Ver cronograma completo”, podem quebrar em linhas controladas;
- componentes reorganizados para leitura e toque;
- chamada “Falar com o Professor” adaptada para a largura da tela.

## Identificação da turma
- título principal: ano/série e turma;
- segmento como identificação secundária;
- ano letivo visível sem competir com o título;
- não exibir “ativa/inativa”;
- turma arquivada deve usar mensagem humana e útil, como “Turma arquivada — ano letivo encerrado”.

## Segmentos
Fundamental e Médio podem usar cores diferentes, de forma elegante e coerente.

A cor do segmento deve atuar como acento visual, não como preenchimento dominante da página.

## Paletas oficiais

### Linha 1
`#2484BF` `#41CAD9` `#F2C335` `#D9B036` `#0D0D0D`

### Linha 2
`#3557F2` `#0320A6` `#F2C335` `#FFD452` `#A68114`

### Linha 3
`#3585A6` `#41BEF2` `#F2C335` `#4814A6` `#7229F2`

**Regra:** cada linha é um conjunto cromático próprio. Não misturar arbitrariamente cores de linhas diferentes.

## Acesso rápido
Visual uniforme, sem uma cor forte distinta por opção.

## Ícones
- uma única família visual;
- profissionais;
- coerentes;
- preferencialmente SVG;
- estilo outline limpo e contemporâneo;
- evitar mistura de outline, preenchido, 3D e emojis.

## Estados visuais globais
- Novo;
- Atenção;
- Destaque.

Preferir selos e ícones consistentes.

## Estados temporais calculados
Quando conteúdo com data já tiver passado:
- não exigir alteração manual;
- usar redução discreta de ênfase visual quando a regra da área determinar permanência histórica;
- preservar legibilidade e acessibilidade;
- não usar opacidade tão baixa que prejudique leitura.

## Cronogramas
A visão completa usa uma única composição reutilizável e mantém a hierarquia visual aprovada:
1. título “Cronogramas”;
2. seletor de períodos;
3. Total da etapa em superfície separada;
4. itens do período exibido.

### Seletor de períodos
- apresenta todos os períodos do regime letivo;
- o período corrente recebe fundo suave, cor primária, marcador inferior e o texto “Período atual”;
- períodos anteriores e futuros permanecem disponíveis com menor ênfase;
- não usa rolagem horizontal;
- no mobile, a grade responsiva comporta dois, três ou quatro períodos;
- com três períodos, o último pode ocupar a largura completa da última linha;
- os estados decorrem das datas reais, sem status manual.

### Total da etapa
- aparece separado da tabela ou dos blocos de itens;
- conserva destaque discreto e legível;
- não recebe `line-through`;
- não sugere redução causada pelo estado temporal dos itens.

### Desktop — 1440 px
- tabela limpa e em largura disponível;
- colunas exatas: Data/Prazo, Tipo, Descrição/Conteúdo e Valor;
- Descrição/Conteúdo recebe a maior largura;
- Valor permanece alinhado à direita;
- itens passados permanecem visíveis.

### Tablet — 834 px
- preserva título, seletor, Total da etapa e tabela;
- mantém as quatro colunas legíveis;
- reduz espaçamentos e larguras de apoio de modo controlado;
- não cria rolagem horizontal.

### Mobile — 390 px
- a tabela deixa de ser visualmente tabular;
- cada item é apresentado como bloco vertical;
- Data/Prazo ocupa o topo à esquerda e Valor o topo à direita;
- Tipo aparece abaixo;
- Descrição/Conteúdo vem na sequência;
- os rótulos das quatro informações permanecem identificáveis;
- não há rolagem horizontal.

### Item passado
Quando Data/Prazo é anterior a hoje:
- Data/Prazo, Tipo e Descrição/Conteúdo recebem simultaneamente atenuação visual discreta e texto riscado (`line-through`);
- Valor permanece com aparência normal, sem atenuação que sugira invalidação e sem `line-through`;
- não usar ícone de concluído, checkbox, badge “Passado”, status textual manual, cor de erro ou fundo vermelho.

Itens na própria data/prazo ou no futuro mantêm aparência normal.

### Elementos não previstos
Não apresentar notas individuais, pontos previstos/distribuídos, saldo, média, desempenho ou mensagens e placeholders não aprovados.

## Atividades e listas
Cada registro preserva a listagem com divisórias, selo de Tipo em linha própria e título como elemento visual principal.

Os metadados Assunto, Publicação e Prazo aparecem em todos os registros, com peso visual secundário. Quando o prazo opcional não estiver cadastrado, exibir exatamente `-` como valor de Prazo.

### Desktop — 1440 px
- título à esquerda e bloco dos três metadados à direita na mesma faixa horizontal;
- título ocupa a largura flexível restante;
- metadados permanecem agrupados, alinhados de maneira consistente e sem competir com o título.

### Tablet — 834 px
- manter título e os três metadados na mesma faixa horizontal;
- ajustar larguras, gaps e tipografia somente o necessário para caber;
- não permitir overflow horizontal, sobreposição ou corte de texto.

### Mobile — 390 px
- selo de Tipo e título ocupam linhas próprias;
- Assunto, Publicação e Prazo aparecem imediatamente abaixo do título;
- os metadados formam três colunas iguais, cada uma ocupando exatamente um terço da largura disponível;
- a largura de cada coluna independe do comprimento do rótulo ou do valor;
- cada bloco ocupa integralmente sua coluna;
- rótulo e valor ficam centralizados horizontalmente dentro do respectivo terço;
- nenhum valor usa alinhamento à esquerda ou à direita, inclusive o Prazo;
- quando o Prazo estiver ausente, o hífen permanece centralizado na terceira coluna;
- não usar larguras por conteúdo, `margin-left: auto`, `justify-content: space-between` ou colunas `max-content` como mecanismo da composição mobile;
- rótulos e valores permanecem legíveis, sem sobreposição nem overflow horizontal.

## Materiais
Apresentar agrupamento hierárquico:

**Área → Subárea → Conteúdo**

Grupos podem ser expandidos/recolhidos quando necessário para controlar o comprimento da página.

## Vídeos
- miniatura 16:9;
- título;
- descrição breve;
- prioridade, quando aplicável;
- player em modal responsivo;
- tela cheia quando suportada;
- alternativa para abrir no provedor;
- carregar iframe somente após interação, quando possível.

## Informações opcionais
Como regra geral, quando um campo opcional não possuir conteúdo:
- não exibir rótulo vazio;
- não exibir botão desabilitado sem função;
- não reservar espaço visual desnecessário.

A apresentação de Prazo em Atividades e listas é exceção explícita: o campo continua opcional no modelo, mas o rótulo Prazo permanece visível e o valor ausente é representado exatamente por `-`.

## Imagens
Somente próprias ou com direito de reprodução compatível.

## Responsividade
Desktop, tablet e celular devem reorganizar componentes, e não apenas reduzi-los.

## Referência visual
A home aprovada continua sendo referência institucional global. Para a página de turma, passam a prevalecer também os mockups específicos aprovados de desktop, tablet e celular, registrados em `09-MOCKUPS-APROVADOS-v1.6.md`, incluindo o protótipo aprovado do estado aberto do menu interno mobile.




