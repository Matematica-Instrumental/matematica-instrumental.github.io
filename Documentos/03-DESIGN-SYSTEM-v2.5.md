# Design System — Matemática Instrumental

Versão: 2.5  
Status: APROVADO — VISÃO COMPLETA DE LINKS  
Última atualização: 12/09/2026

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
- o grupo de metadados usa três colunas regulares, sem largura determinada apenas pelo conteúdo;
- cada coluna possui eixo central próprio;
- rótulo e valor compartilham exatamente o mesmo eixo horizontal central;
- os valores não usam alinhamento à esquerda ou à direita;
- metadados permanecem agrupados à direita e não competem com o título.

### Tablet — 834 px
- manter título e os três metadados na mesma faixa horizontal;
- o grupo de metadados usa três colunas regulares com largura suficiente para evitar colisão;
- cada coluna possui eixo central próprio;
- rótulo e valor compartilham exatamente o mesmo eixo horizontal central;
- o hífen do prazo ausente permanece centralizado sob Prazo;
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

### Filtros visuais e listagem
- apresentar somente Busca, Assunto e Tipo;
- os controles continuam visuais e sem comportamento definitivo nesta etapa;
- preservar a listagem em uma coluna, as divisórias e o acento lateral aprovado;
- não adicionar controle de ordenação, botão de limpar, contador ou estado visual de nenhum resultado.

### Corpo opcional
- fica abaixo do cabeçalho do registro;
- descrição usa texto corrido, peso regular e cor secundária, sem superfície ou box interno;
- ausência de descrição não reserva espaço;
- subseções usam título pequeno, atenuado, em caixa alta e com peso forte;
- “RECURSOS” e “GABARITO / RESOLUÇÃO” compartilham exatamente o mesmo tratamento tipográfico, cromático e de espaçamento;
- títulos de subseção não têm sublinhado, hover, cursor de link nem comportamento interativo.

### Recursos vinculados
- mostrar apenas os nomes como links independentes;
- preservar o tratamento de link aprovado, com indicação visual e foco acessível;
- múltiplos recursos usam espaçamento claro e quebra natural;
- não usar URL em texto bruto nem card individual por recurso.

### Gabarito / Resolução programado
Antes da liberação, mostrar somente `Disponível em {data formatada}` abaixo do título da subseção.

A informação temporal:
- tem peso visual secundário;
- usa cor de texto atenuada compatível com a paleta e mantém contraste legível;
- não tem sublinhado, hover ou cursor de link;
- não parece botão, campo desabilitado, badge ou alerta;
- não usa cadeado, ícone, vermelho, verde, texto de bloqueio/indisponibilidade ou contagem regressiva.

A partir da data de liberação, substituir a informação temporal pela apresentação normal dos nomes dos recursos como links.

### Comportamento responsivo do corpo opcional
- em 1440 px, 834 px e 390 px, manter descrição, Recursos e Gabarito/Resolução dentro do registro e na ordem aprovada;
- recursos podem quebrar naturalmente conforme a largura disponível;
- no mobile, textos permanecem dentro do registro, sem overflow horizontal;
- não alterar as composições aprovadas de filtros, selo, título e metadados para acomodar o corpo opcional.

## Para estudar
A visão usa listagem em uma coluna, divisórias discretas e acento lateral amarelo. O registro cujo objetivo já passou usa a variação atenuada aprovada, com fundo, acento e textos secundários discretamente reduzidos, sem prejudicar contraste, leitura ou acesso aos links.

### Filtros visuais
- apresentar somente Busca e Assunto;
- manter os controles apenas como composição visual nesta etapa;
- não adicionar Tipo de objetivo, Data, ordenação, botão de limpar, contador ou estado de nenhum resultado.

### Título e Objetivo
- o título é o elemento visual principal do registro;
- `OBJETIVO` usa rótulo pequeno, atenuado, em caixa alta e com peso forte;
- o conteúdo do objetivo aparece como texto normal, abaixo do cabeçalho, com destaque maior que o resumo/orientação e menor que o título;
- título e objetivo permanecem visual e semanticamente distintos;
- objetivo não recebe badge, fundo próprio, ícone, subcard ou aparência de status;
- `tipoObjetivo` não é renderizado.

### Metadados
- apresentar Assunto e Publicação em todos os registros;
- apresentar a data apenas quando `dataObjetivo` existir;
- o rótulo visual aprovado é `DATA`, sem renomear o campo técnico `dataObjetivo`;
- rótulo e valor compartilham o mesmo eixo horizontal central dentro de cada coluna;
- ausência de data não mostra placeholder, hífen nem espaço reservado.

### Desktop — 1440 px
- título à esquerda e metadados à direita na mesma faixa horizontal;
- título ocupa a largura flexível restante;
- metadados usam colunas regulares e peso visual secundário;
- não permitir sobreposição, overflow ou corte.

### Tablet — 834 px
- preservar a mesma faixa horizontal do desktop;
- título pode quebrar naturalmente;
- metadados permanecem centralizados em seus próprios eixos;
- ajustar larguras e gaps de modo controlado, sem compressão excessiva.

### Mobile — 390 px
- usar o breakpoint `max-width: 767px`;
- o cabeçalho do registro usa fluxo vertical próprio, equivalente a `display: block`, em vez de conservar o grid horizontal do desktop;
- o título ocupa faixa estrutural exclusiva de 100%, com `min-width: 0`, `max-width: 100%` e alinhamento à esquerda;
- os metadados começam somente depois da caixa completa do título;
- com data, usar três colunas iguais: `repeat(3, minmax(0, 1fr))`;
- sem data, usar duas colunas iguais: `repeat(2, minmax(0, 1fr))`;
- cada metadado usa `width: 100%`, `min-width: 0` e centralização de rótulo e valor;
- valores longos podem usar `overflow-wrap: anywhere` e nunca invadem título, outra coluna ou borda;
- não usar margem negativa, transform, posicionamento absoluto ou compensação específica por conteúdo.

### Corpo e links
- ordem: Objetivo, resumo/orientação, Recursos e Leituras relacionadas, quando existirem;
- resumo/orientação em texto corrido, sem card interno;
- títulos `RECURSOS` e `LEITURAS RELACIONADAS` compartilham tratamento discreto de subseção;
- links mostram apenas o nome, têm boa área de toque, foco acessível, quebra natural e não recebem cards individuais;
- Vídeos relacionados não são renderizados nem recebem placeholder nesta etapa.

### Estado atenuado
- derivado fora do componente visual e aplicado somente quando hoje for posterior a `dataObjetivo`;
- preserva legibilidade, acessibilidade e funcionamento dos links;
- não usa tachado, checkbox, ícone de conclusão, badge, status textual, vermelho ou fundo de erro.

## Trabalhos

### Estrutura geral
- usar listagem em uma única coluna, com divisórias discretas e o acento lateral aprovado;
- apresentar somente os filtros visuais Busca e Assunto, sem interatividade definitiva nesta etapa;
- manter o título obrigatório como elemento dominante de cada registro;
- apresentar Assunto, Publicação e o rótulo visual `ENTREGA` como metadados secundários;
- o rótulo público será sempre `ENTREGA`, independentemente do valor técnico de `marco.tipo`;
- não renderizar `APRESENTAÇÃO`, `tags`, pontuação, nota, progresso, formulário, upload, botão de entrega ou etapas.

### Desktop — 1440 px e tablet — 834 px
- título à esquerda e Assunto, Publicação e Entrega à direita na mesma faixa horizontal;
- título ocupa a largura flexível restante e pode quebrar naturalmente;
- cada metadado centraliza rótulo e valor no mesmo eixo;
- não permitir sobreposição, overflow, invasão entre campos ou quebra arbitrária de palavras.

### Mobile — 390 px
- usar o breakpoint `max-width: 767px`;
- título em faixa própria, com 100% da largura útil e alinhamento à esquerda;
- metadados imediatamente abaixo, na ordem Assunto, Publicação e Entrega;
- usar `minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)`, concedendo mais largura a Assunto;
- cada coluna usa `min-width: 0` e centraliza rótulo e valor no mesmo eixo;
- valores permitem quebra entre palavras, mas preservam cada palavra inteira com `overflow-wrap: normal` e `word-break: normal`;
- não usar `word-break: break-all` nem `overflow-wrap: anywhere` nos valores dos metadados.

### Corpo e recursos
- `descricao`, quando presente, aparece como texto corrido abaixo do cabeçalho, sem fundo ou card próprio;
- a ausência de descrição não renderiza placeholder nem reserva espaço;
- `DOCUMENTO DO TRABALHO` identifica exatamente um Recurso vinculado obrigatório;
- `RECURSOS ADICIONAIS` aparece somente quando houver uma ou mais entradas opcionais;
- links mostram apenas o nome do recurso, nunca a URL bruta, permanecem independentes e têm boa área de clique e toque;
- não criar cards internos para documento ou recursos.

### Estado atenuado
- derivado fora do componente visual e aplicado somente quando hoje for posterior a `marco.data`, conforme a noção central de hoje em `America/Sao_Paulo`;
- no próprio dia de `marco.data`, o registro permanece normal;
- conteúdo passado continua visível, legível, acessível e com links funcionais;
- não usar tachado, checkbox, ícone, badge, status textual ou cor de erro.

## Materiais

### Estrutura geral
- usar acervo em uma única coluna, com divisórias discretas e o acento lateral amarelo aprovado;
- apresentar exatamente os filtros visuais Busca, Área, Subárea, Conteúdo e Tipo, sem interatividade definitiva;
- não usar mosaico, sidebar, agrupamentos em cards ou cards internos;
- o título do Material é o elemento dominante de cada registro.

### Tipo, arquivo/link e descrição
- Tipo aparece como metadado textual secundário, sem badge, enum visual, cor específica ou aparência de status;
- `ARQUIVO / LINK` identifica exatamente um Recurso vinculado obrigatório;
- o link apresenta somente o nome do recurso, nunca a URL bruta, e preserva área adequada de clique e toque;
- `descricao`, quando presente, aparece como texto corrido, sem fundo ou card próprio;
- ausência de descrição não gera placeholder nem espaço reservado;
- `publicacao` e `tags` não são renderizados.

### Classificação
- apresentar cada classificação como cadeia tipográfica Área → Subárea → Conteúdo;
- manter cor e peso discretos e coerentes, sem badges coloridos, botões ou superfícies internas;
- separar visualmente cadeias múltiplas dentro do mesmo registro;
- não repetir título, Tipo ou arquivo/link quando houver mais de uma classificação;
- permitir quebra natural entre os elementos da cadeia, preservando palavras inteiras.

### Filtros
- os cinco controles compõem somente a prova visual nesta etapa;
- não adicionar JavaScript, busca real, filtragem, dependência dinâmica, query string, botão de limpar, contador ou estado de nenhum resultado;
- controles seguem o tratamento de superfície, foco e tipografia das demais visões completas.

### Desktop — 1440 px
- cinco filtros na mesma faixa;
- título e Tipo ocupam a mesma região de cabeçalho, com título dominante e Tipo alinhado secundariamente;
- arquivo/link e cadeias classificatórias permanecem claros e escaneáveis.

### Tablet — 834 px
- Busca ocupa a largura total;
- Área, Subárea, Conteúdo e Tipo formam grade 2 × 2;
- título e Tipo preservam a organização do desktop quando houver espaço;
- não permitir sobreposição, corte ou overflow horizontal.

### Mobile — 390 px
- filtros empilhados em uma coluna;
- título ocupa faixa própria de largura total;
- Tipo aparece abaixo do título;
- arquivo/link possui altura mínima adequada ao toque;
- cadeias classificatórias quebram naturalmente, sem `word-break: break-all` nem divisão arbitrária de palavras;
- múltiplas classificações permanecem separadas dentro do mesmo registro;
- não permitir overflow horizontal.

### Elementos ausentes
Não apresentar publicação, tags, prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação, progresso, upload ou botão de entrega.

## Vídeos

### Estrutura geral
- usar biblioteca em cards de mídia, sem aparência de feed social, tarefa, cronograma ou painel administrativo;
- apresentar exatamente os filtros visuais Busca, Área, Subárea, Conteúdo e Prioridade, sem interatividade definitiva;
- não adicionar ordenação visual, botão de limpar, contador ou estado de nenhum resultado;
- cada card apresenta miniatura, duração, prioridade, título, descrição, classificações e a ação `Ver vídeo`.

### Miniatura e duração
- miniatura ocupa área com proporção fixa 16:9 e usa `object-fit` apropriado para não distorcer a imagem;
- uma marca visual simples pode identificar a natureza de vídeo, sem reproduzir controles de player;
- duração aparece sobre a miniatura, com contraste suficiente e localização consistente;
- não usar barra de progresso, controles de reprodução, player, iframe, autoplay ou modal.

### Hierarquia textual e metadados
- título é o elemento textual dominante e quebra naturalmente sem truncamento agressivo;
- descrição usa texto corrido, cor secundária e não recebe card interno;
- prioridade aparece como informação textual neutra e discreta, sem cor de status, alerta, urgência ou ícone de conclusão;
- provedor e tags não possuem apresentação visual aprovada e permanecem ausentes da interface.

### Classificações
- apresentar Área → Subárea → Conteúdo como cadeia tipográfica, coerente com Materiais e sem excesso de badges;
- classificações múltiplas ficam separadas dentro do mesmo card;
- não repetir miniatura, título, descrição ou ação quando houver várias classificações.

### Ação
- usar exatamente `Ver vídeo` como rótulo;
- preservar área adequada de clique e toque e foco visível;
- na rota real, abrir a URL externa do registro em nova aba com proteção contra acesso ao contexto da página de origem;
- não abrir modal nem reproduzir o vídeo dentro do portal.

### Desktop — 1440 px
- cinco filtros na mesma faixa;
- biblioteca em duas colunas;
- cards verticais com miniatura 16:9 acima do conteúdo;
- duração sobre a miniatura, prioridade discreta, título dominante e classificação escaneável.

### Tablet — 834 px
- Busca ocupa toda a largura;
- Área, Subárea, Conteúdo e Prioridade formam grade 2 × 2;
- biblioteca em uma coluna;
- cada card usa composição horizontal, com miniatura à esquerda e conteúdo à direita;
- não permitir deformação, compressão, sobreposição ou overflow horizontal.

### Mobile — 390 px
- filtros empilhados em uma coluna;
- card vertical e miniatura 16:9;
- prioridade, título, descrição, classificação e ação seguem fluxo vertical;
- ação ocupa área adequada ao toque;
- metadados não são comprimidos em colunas estreitas;
- não permitir overflow horizontal.

## Links

### Estrutura geral
- usar grupos de recursos externos organizados por finalidade, sem aparência de Materiais, Vídeos, tarefa, feed social ou painel administrativo;
- não apresentar qualquer filtro, busca, ordenação visual, contador ou estado de nenhum resultado;
- cada grupo apresenta o rótulo `FINALIDADE` e o nome da finalidade;
- cada item apresenta tipo, título, descrição e a ação `Acessar`.

### Hierarquia textual
- o nome da finalidade identifica claramente cada grupo;
- `tipo` usa tratamento textual secundário e discreto;
- `titulo` é o elemento textual dominante do item e quebra naturalmente;
- `descricao` aparece em texto corrido, sem card ou fundo interno;
- não mostrar URL bruta nem logo.

### Metadados ausentes
`acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` permanecem na camada de dados e não aparecem na interface por não possuírem tratamento visual aprovado. Não adicionar prazo, vencimento, status, ativo/inativo, dificuldade, pontuação ou progresso.

### Ação
- usar exatamente `Acessar` como rótulo;
- acompanhar a ação com o ícone externo aprovado;
- preservar área adequada de clique e toque e foco visível;
- na rota real, abrir a URL externa em nova aba com proteção contra acesso ao contexto da página de origem;
- não usar modal, iframe, incorporação ou rastreamento.

### Desktop — 1440 px
- grupos em duas colunas;
- cada coluna preserva seu cabeçalho de finalidade;
- a ação ocupa posição lateral no item, sem competir com título e descrição;
- os textos quebram naturalmente sem overflow horizontal.

### Tablet — 834 px
- grupos em uma coluna;
- finalidade, tipo, título, descrição e ação permanecem integralmente disponíveis;
- manter hierarquia, legibilidade e boa área de interação;
- não permitir sobreposição ou overflow horizontal.

### Mobile — 390 px
- composição integralmente vertical;
- cabeçalho de finalidade, tipo, título, descrição e ação seguem o fluxo do documento;
- ação ocupa largura e área adequadas ao toque;
- não comprimir metadados nem partir palavras arbitrariamente;
- não permitir overflow horizontal.

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
A home aprovada continua sendo referência institucional global. Para a página de turma, passam a prevalecer também os mockups específicos aprovados de desktop, tablet e celular, registrados em `09-MOCKUPS-APROVADOS-v2.3.md`, incluindo o protótipo aprovado do estado aberto do menu interno mobile e as visões completas de Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links.
