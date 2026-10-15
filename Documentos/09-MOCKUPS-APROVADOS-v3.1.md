# Mockups Aprovados — Home, Matemática além da sala, Oportunidades e Datas, Provas e Resoluções, Falar com o Professor, Novidades, Página Global de Turmas e Página de Turma

Versão: 3.1<br>
Status: APROVADO — HOME RECONCILIADA<br>
Última atualização: 12/10/2026

## Objetivo
Registrar a referência histórica aprovada da Home e sua reconciliação documental, além das referências visuais específicas aprovadas para Matemática além da sala, Oportunidades e Datas, Provas e Resoluções, Falar com o Professor, Novidades, para a página global de Turmas e para a página de turma. Estes mockups complementam a documentação funcional e o Design System.

A implementação deverá respeitar o conteúdo dos documentos aprovados e usar estes mockups como referência visual. Em caso de conflito, prevalece a documentação aprovada mais recente; qualquer alteração visual relevante deve ser documentada antes de ser implementada.

## Home — referência histórica aprovada e contrato reconciliado

- Referência local: Referencias/Mockups/home-v1-aprovada.png.
- Situação da imagem: mockup histórico completo da Home já aprovado antes deste passo; arquivo localizado e inspecionado em 12/10/2026.
- A imagem reúne três composições: desktop, tablet e mobile. A regressão futura usa as larguras vigentes de 1440 px, 834 px e 390 px; o PNG não constitui nova renderização da Home atual nem aprovação visual de sua implementação final.
- Contrato final: DEC-104, em conjunto com os requisitos posteriores já aprovados, especialmente DEC-067, DEC-095, DEC-096/097/101 e DEC-102/103.
- O Passo 118 consolida somente documentação e especificação. Não criou protótipo, alterou código ou corrigiu riscos CSS.

### Ordem final da composição

1. Cabeçalho e navegação global.
2. Apresentação/hero + painel Novidades.
3. Acesso rápido.
4. Acesso às turmas, quando houver turma elegível.
5. Matemática além da sala — destaques, quando houver conteúdo elegível.
6. Rodapé.

Essa ordem é preservada no documento e na adaptação responsiva. A ocultação de um bloco condicional recompõe o fluxo, sem espaço reservado. Não há decisão posterior que exija a faixa editorial antes de Acesso rápido; a enumeração arquitetural anterior não estabelece uma ordem visual contrária ao mockup.

### Hero e elementos institucionais

- Saudação exata: **Bem-vindos ao Matemática Instrumental**.
- Apresentação exata: **Conteúdo organizado, claro e objetivo para você aprender mais e melhor.**
- Ação exata: **Comece por aqui**, como navegação interna para #acesso-rapido.
- Identidade visual e composição geral seguem o conceito da imagem reconciliado com os componentes e o Design System vigentes.
- Header e menu global conservam seus contratos atuais; a frase institucional permanece nas três linhas da DEC-067.
- Hero e Novidades compartilham a faixa superior no desktop e seguem as adaptações responsivas já aprovadas para tablet e mobile.

### Acesso rápido

A seção sempre existe, mesmo com coleções vazias. São exatamente cinco cards, nesta ordem, sem Downloads e sem criação de rota nova:

| Título | Descrição curta | Rota global canônica |
|---|---|---|
| Turmas | Acesse os conteúdos organizados por segmento, ano/série e turma. | /turmas/ |
| Provas e Resoluções | Consulte provas de Matemática e resoluções, quando disponíveis. | /provas-e-resolucoes/ |
| Oportunidades e Datas | Acompanhe oportunidades acadêmicas e datas importantes. | /oportunidades-e-datas/ |
| Matemática além da sala | Explore curiosidades, história, aplicações, desafios e recursos de Matemática. | /matematica-alem-da-sala/ |
| Falar com o Professor | Envie uma mensagem privada ao professor. | /falar-com-o-professor/ |

Cada card inteiro é um único link, respeita BASE_URL, mantém ícone, título e descrição curta legíveis, foco visível e área adequada de clique/toque. A grade adapta os cinco cards à largura disponível, sem reservar uma sexta posição ou criar placeholder. A imagem histórica orienta o padrão visual, mas não autoriza extrapolar uma nova quantidade fixa de colunas para a grade com cinco cards; ajustes de medidas, gaps e distribuição serão conferidos no protótipo/regressão seguinte.

### Acesso às turmas

- Fonte única: coleção real turmas.
- Elegibilidade: arquivada !== true; não inferir atividade por ano letivo, data ou calendário.
- Agrupamento: segmento e ano/série, com Ensino Fundamental antes de Ensino Médio e anos/séries em ordem natural crescente.
- Um único acesso por combinação de segmento e ano/série que possua pelo menos uma turma elegível, mesmo quando houver várias turmas naquele grupo.
- Não apresentar caixas individuais de turma diretamente na Home, anos/séries sem turma elegível ou segmentos vazios.
- Com os dados reais atuais, o resultado esperado é somente **Ensino Médio → 1º ano**.
- Cada acesso conduz ao agrupamento correspondente na página global /turmas/; essa página mantém a listagem concreta das turmas e o contrato integral da DEC-095, inclusive arquivadas.
- Âncora exata: turmas-{segmentoSlug}-{anoSerieSlug}, usando a função central normalizeTurmaRouteSegment para os dois segmentos e a mesma regra compartilhada entre Home e /turmas/.
- Exemplo: /turmas/#turmas-ensino-medio-1o-ano, respeitando BASE_URL.
- Não usar índice de renderização, posição de grupo, cópias divergentes da normalização ou novo campo persistido de âncora. Inserir outros grupos não altera o destino existente.
- Turmas arquivadas não tornam um ano/série elegível na Home.
- Sem turma elegível, ocultar toda a seção: sem título, mensagem vazia, placeholder, box vazio ou espaço reservado. A rota global permanece acessível pelo card Turmas de Acesso rápido.

### Novidades

O painel preserva integralmente DEC-096/097 e sua implementação aprovada, com os contratos das fontes já incorporadas, incluindo DEC-101. A Home recebe no máximo seis itens reais projetados pelo motor, após elegibilidade, estado e ordenação; a precedência é **Destaque > Atenção > Novo**. Itens conservam chaves e destinos estáveis e “Ver todas” conduz a /novidades/, com BASE_URL.

Com zero itens, o painel permanece e apresenta exatamente **Nenhuma novidade no momento.** em altura natural, sem cards, “Ver todas”, CTA, placeholder ou altura reservada. Os exemplos do PNG não são dados reais nem redefinem fontes, estados, ordem ou temporalidade.

### Matemática além da sala — destaques

A faixa posterior a Acesso às turmas segue integralmente DEC-102/103: somente destaqueHome === true, exclusão por arquivado === true, no máximo três registros, publicação decrescente, título pt-BR e ID estável, sem preenchimento automático e com seleção independente de destaqueNovidades.

Com zero elegíveis, toda a faixa é omitida, sem título, mensagem vazia, placeholder ou espaço reservado. Com um ou dois, mostrar somente a quantidade real; com três ou mais, respeitar o limite e a ordenação. O conjunto antigo de seis atalhos editoriais não retorna à Home.

### Conflitos históricos reconciliados

| Representação na imagem histórica | Contrato final vigente |
|---|---|
| Seis cards em Acesso rápido, incluindo Downloads | Cinco destinos globais existentes; nenhum Downloads, sexta posição vazia ou nova rota. |
| “Materiais Além da Sala” na navegação e em atalhos | Nome e rota atuais de Matemática além da sala, sem restaurar nomenclatura antiga. |
| Novidades demonstrativas, incluindo “Coleção de provas resolvidas”, com ordem Novo → Atenção → Destaque | Motor real e fontes aprovadas, máximo seis, precedência Destaque > Atenção > Novo; não integrar Provas a Novidades por causa do PNG. |
| Todos os sete anos/séries institucionais desenhados | Somente grupos com turma não arquivada; dados reais atuais produzem Ensino Médio → 1º ano. |
| Seis atalhos de categorias na faixa editorial | Seleção real de até três destaques pela DEC-102/103; zero omite toda a faixa. |
| Cabeçalho sem a frase institucional posterior | Header vigente com a frase em três linhas definida pela DEC-067. |
| Navegação antiga cinza e barra extensa no mobile | Componentes globais e comportamento responsivo já aprovados; não reverter menu ou CSS institucional com base na referência antiga. |
| Ícones de redes sociais e Footer histórico | Footer atual fora do escopo funcional; links sociais somente após documentação de URLs oficiais, sem inventar perfis. |

### Regressão futura e limites deste registro

A implementação final da Home ainda depende de protótipo/regressão autorizados. Conferir composição, ordem, espaçamentos, legibilidade, foco, teclado, toque e ausência de overflow em 1440 px, 834 px e 390 px, preservando quebra natural e adaptação à largura disponível. Não extrapolar nova grade global ou colunas fixas a partir dos seis cards do PNG.

Verificar os cinco cards sempre presentes; zero, um e vários agrupamentos de turmas; múltiplas turmas no mesmo grupo; arquivadas; âncoras estáveis após inserção de novos grupos; destinos com BASE_URL; Novidades preenchidas e vazias; e faixa editorial com zero, um, dois, três e quatro ou mais elegíveis, com e sem imagem. O risco de compressão da variante compacta com imagem em 834 px, apontado por inspeção CSS no Passo 117, continua pendente de verificação/correção na etapa autorizada; não foi resolvido neste passo.

A aprovação histórica da imagem, as aprovações específicas anteriores de Novidades/Matemática além da sala e a definição documental do contrato não equivalem à aprovação visual da Home final. Os critérios novos permanecem pendentes em 08-CHECKLIST-DE-ACEITE-v4.1.md.

## Oportunidades e Datas
- Situação: mockup aprovado em 20/09/2026.
- Referência vigente: rota real `/oportunidades-e-datas/` e componentes em `Site/src/components/oportunidades/`; a rota temporária `/validacao-oportunidades-e-datas/` foi usada na aprovação e removida após a regressão final.
- Larguras aprovadas: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- Estados aprovados: padrão, filtrado, nenhum resultado e vazio.
- Variações aprovadas: todas as situações temporais, múltiplos marcos no mesmo item e item encerrado ainda dentro da retenção.

### Composição aprovada
- abertura com título **Oportunidades e Datas** e texto introdutório;
- aviso explícito de conteúdo demonstrativo somente no protótipo;
- painel de filtros com Busca, Categoria, Situação, Ano, Segmento, Ano/Série e Instituição;
- contagem de resultados e indicação da ordenação pelo próximo marco útil;
- cards em duas colunas no desktop e uma coluna em tablet e mobile;
- categoria e situação como identificadores discretos, seguidos por título, instituição, descrição, público-alvo, direcionamento e local quando existente;
- linha do tempo com marcos em ordem cronológica e identificação das datas críticas;
- fonte oficial e somente as ações reais aplicáveis;
- item encerrado com tratamento atenuado, sem perda de legibilidade.

### Estados
- padrão: todos os itens elegíveis e filtros no estado inicial;
- filtrado: controles selecionados, **Limpar filtros**, contagem atualizada e somente itens correspondentes;
- nenhum resultado: filtros e limpeza preservados, sem cards, com a mensagem exata **“Nenhuma oportunidade corresponde aos filtros selecionados.”**;
- vazio: título e contexto preservados, sem filtros ou cards, com a mensagem exata **“Nenhuma oportunidade ou data disponível no momento.”** em altura natural.

### Situações e marcos
- situações aprovadas: Inscrições abertas, Inscrições futuras, Realização hoje, Inscrições encerradas, Realização futura, Aguardando resultado e Encerrado;
- um card pode apresentar Abertura de inscrições, Encerramento de inscrições, uma ou várias Realizações e Divulgação de resultado;
- Encerramento de inscrições e Realização recebem a identificação discreta de data crítica para Atenção;
- o item Encerrado permanece visualmente presente enquanto estiver dentro da retenção aprovada.

### Responsividade e acessibilidade
- desktop de 1440 px: filtros em grade ampla e cards em duas colunas;
- tablet de 834 px: filtros em duas colunas e cards em uma coluna;
- mobile de 390 px: filtros, metadados, marcos e ações em fluxo vertical e largura integral;
- textos longos quebram naturalmente e não existe overflow horizontal;
- labels persistentes, foco visível, navegação por teclado, contraste e áreas de toque adequadas;
- situações e datas críticas não dependem somente de cor.

### Implementação aprovada
Durante a regressão, a rota real e o protótipo reutilizaram os mesmos componentes. A implementação real foi aprovada nos quatro estados, nas situações temporais e nos filtros previstos; a coleção real permanece vazia e apresenta o estado vazio aprovado. O protótipo e suas fixtures foram removidos após a validação, preservando este registro como referência visual vigente.

## Provas e Resoluções
- Situação: mockup aprovado em 20/09/2026.
- Referência de regressão: rota temporária `/validacao-provas-e-resolucoes/`, posteriormente compartilhada com os componentes reais em `Site/src/components/provas/`.
- Larguras aprovadas: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- Estados aprovados: padrão, filtrado, nenhum resultado e vazio.
- Variações de conteúdo aprovadas: prova com resolução e prova sem resolução.

### Composição aprovada
- abertura com título **Provas e Resoluções**, texto introdutório e identificação discreta da referência no protótipo;
- aviso explícito de conteúdo demonstrativo somente no protótipo;
- painel de filtros em superfície branca com Busca, Segmento, Ano/Série, Instituição, Ano, Tipo, Fase, Assunto e Dificuldade;
- contagem de resultados e indicação da ordenação por edições mais recentes;
- cards em duas colunas no desktop e uma coluna em tablet e mobile;
- tipo e segmento como identificadores discretos, seguidos por título e instituição;
- metadados de Ano, Ano/Série, Fase e Dificuldade somente quando aplicáveis;
- assuntos em marcadores neutros, descrição, fonte oficial e condição de uso quando existente;
- ações **Ver prova** e **Ver resolução** com hierarquia visual clara.

### Estados
- padrão: todos os itens e filtros no estado inicial;
- filtrado: controles selecionados, ação **Limpar filtros**, contagem atualizada e somente os itens correspondentes;
- nenhum resultado: filtros e ação de limpeza preservados, sem cards, com a mensagem exata **“Nenhuma prova ou resolução corresponde aos filtros selecionados.”**;
- vazio: título e contexto preservados, sem filtros ou cards, com a mensagem exata **“Nenhuma prova ou resolução disponível no momento.”** em altura natural.

### Prova com e sem resolução
- prova com resolução apresenta **Ver prova** e **Ver resolução**;
- prova sem resolução mantém **Ver prova** e não apresenta ação secundária, botão desabilitado, placeholder ou espaço reservado.

### Responsividade e acessibilidade
- desktop de 1440 px: filtros em grade ampla e cards em duas colunas;
- tablet de 834 px: filtros em duas colunas e cards em uma coluna;
- mobile de 390 px: filtros, cards e ações em fluxo vertical e largura integral;
- textos longos quebram naturalmente, sem overflow horizontal;
- labels persistentes, foco visível, navegação por teclado, contraste e áreas de toque adequadas;
- filtros e ações não dependem somente de cor.

### Implementação aprovada
A rota real e o protótipo devem reutilizar os mesmos componentes. As fixtures permanecem exclusivamente no protótipo; a coleção real começa vazia e a rota real apresenta o estado vazio. O protótipo permanece temporariamente para regressão nos quatro estados aprovados.

## Falar com o Professor
- Situação: regressão visual aprovada em 20/09/2026.
- Referências vigentes: `Site/src/components/contato/ContactPage.astro`, `Site/src/components/contato/ContactIntro.astro`, `Site/src/components/contato/ContactForm.astro`, a rota real `/falar-com-o-professor/` e o protótipo temporário `/validacao-falar-com-o-professor/`.
- Larguras aprovadas: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- Contextos aprovados: com turma reconhecida e sem turma.
- Estados aprovados: inicial, enviando, sucesso e erro.

### Composição aprovada
- abertura com identificação da página e orientação de comunicação privada;
- box **Antes de enviar** com orientações e indicação de ausência de upload;
- formulário em superfície branca, com labels persistentes e campos em largura adequada;
- campos obrigatórios Nome, E-mail, Motivo e Mensagem;
- campo Turma somente leitura, sem aparência de campo editável;
- botão primário com rótulo exato **Enviar mensagem**;
- foco visível, navegação por teclado, contraste e áreas de toque adequadas;
- nenhuma largura aprovada apresenta overflow horizontal.

### Contexto de turma
- com `slug` reconhecido, a apresentação usa `anoSerie — nome` e o valor técnico preserva `turma.slug`;
- sem turma ou com `slug` desconhecido, a apresentação usa **Não se aplica / contato geral** e o valor técnico é `contato-geral`;
- texto arbitrário da query não é apresentado como turma real.

### Estados
- inicial: formulário disponível e botão **Enviar mensagem**;
- enviando: botão desabilitado e mensagem **“Enviando mensagem…”**;
- sucesso: confirmação **“Mensagem enviada com sucesso.”**, sem redirecionamento e sem reapresentação dos dados pessoais;
- erro: mensagem **“Não foi possível enviar a mensagem. Tente novamente.”**, com formulário preservado para nova tentativa.

### Responsividade
- desktop de 1440 px: orientação e formulário em colunas, com largura confortável de leitura;
- tablet de 834 px: composição reorganizada verticalmente, sem redução mecânica do desktop;
- mobile de 390 px: fluxo de uma coluna, controles em largura integral, botão com boa área de toque e mensagens com quebra natural;
- Header, menu global e Footer permanecem os componentes institucionais vigentes.

### Implementação e protótipo
A rota real e o protótipo reutilizam os mesmos componentes. O protótipo permanece temporariamente para regressão e pode selecionar estado e turma por query string sem transmissão. A ausência de configuração externa mantém o envio da rota real desativado com segurança e não altera a referência visual aprovada.

## Novidades
- Situação: painel da Home e visão completa aprovados em 16/09/2026; regressão visual final da implementação real aprovada em 18/09/2026.
- Referências vigentes: `Site/src/components/novidades/NewsPanel.astro`, `Site/src/components/novidades/NewsList.astro`, a Home real e a rota real `/novidades/`. Os protótipos temporários `Site/src/pages/validacao-novidades-home.astro` e `Site/src/pages/validacao-novidades-lista.astro` cumpriram a validação, suas fixtures foram removidas e as páginas temporárias deixaram de existir após a aprovação final.
- Larguras aprovadas: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- Estados visuais exclusivos: **Destaque**, **Atenção** e **Novo**, com as cores, os selos e a hierarquia demonstrados nos protótipos.

### Painel da Home
- painel lateral compacto no desktop, adaptado para tablet e mobile;
- título `Novidades`, indicação editorial discreta e ação `Ver todas` somente quando houver itens;
- até seis itens compactos, já ordenados pelo motor derivado;
- cada item apresenta estado, temporalidade, título, fonte e audiência e aponta para a âncora estável correspondente em `/novidades/`;
- o estado preenchido preserva as alturas aprovadas e rolagem interna somente na lista de itens;
- o estado vazio usa altura natural e mostra somente “Nenhuma novidade no momento.” após o título, sem `Ver todas`, cards, scrollbar interna, CTA ou reserva de altura equivalente à lista cheia.

### Visão completa
- rota real prevista: `/novidades/`;
- título `Novidades` e abertura editorial conforme o protótipo aprovado;
- lista de todas as Novidades ativas, sem limite de seis;
- cada item apresenta estado, fonte, título, temporalidade, audiência e ações derivadas da origem;
- quando houver uma turma aplicável, a ação conduz à área correspondente; quando houver várias, todas as turmas ativas são preservadas em ordem institucional; Vídeos e Links mantêm suas ações externas aprovadas;
- não há filtros, pesquisa, histórico próprio nem páginas individuais de detalhe;
- o estado vazio conserva Header, menu global, abertura, Footer e a mensagem exata “Nenhuma novidade no momento.” em altura natural, sem cards, filtros, histórico ou CTA inventado.

### Responsividade
- em **1440 px**, o painel da Home ocupa a coluna lateral e a visão completa usa cards horizontais com ações laterais;
- em **834 px**, o painel reorganiza os itens em duas colunas dentro da altura aprovada e a visão completa preserva leitura horizontal sem overflow;
- em **390 px**, painel e visão completa usam fluxo vertical, boa área de toque, quebra natural e nenhum overflow horizontal.

## Página global de Turmas
- Situação: aprovada em 14/09/2026.
- Referência de regressão visual: `Site/src/pages/validacao-turmas.astro`.
- Larguras aprovadas: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- Hierarquia visual obrigatória: **Segmento → Ano/Série → Turma**.

### Composição aprovada
- preservar Header, menu global, título **Turmas** e Footer;
- não apresentar subtítulo não aprovado;
- usar o segmento como agrupador visual de primeiro nível, com diferenciação cromática discreta;
- usar ano/série como segundo nível, sempre associado às turmas correspondentes;
- usar a turma como elemento acionável, em card com nome dominante, ano letivo, descrição quando existente e indicação de acesso;
- não mostrar slug, id, `ordem`, campos técnicos, dados administrativos ou controles de edição;
- não assumir aparência de dashboard administrativo, tabela de banco de dados, sistema escolar ou área autenticada;
- não apresentar filtros, pesquisa, matrícula, cadastro ou login.

### Turmas arquivadas
- permanecem dentro do respectivo ano/série e depois das turmas não arquivadas;
- continuam acionáveis e acessíveis;
- usam tratamento visual neutro e discreto, sem aparência de erro;
- exibem exatamente “Turma arquivada — ano letivo encerrado”;
- não recebem seção própria nem rótulo “inativa”.

### Desktop — 1440 px
- conteúdo amplo com largura útil de referência de 1240 px;
- segmentos claramente delimitados e organizados em fluxo vertical;
- até três agrupamentos de ano/série por linha quando houver largura disponível;
- cartões de turma com hierarquia imediata e sem densidade de painel administrativo.

### Tablet — 834 px
- largura útil de referência de 750 px;
- até dois agrupamentos de ano/série por linha quando houver largura disponível;
- hierarquia integralmente preservada, sem compressão artificial, sobreposição ou rolagem horizontal.

### Mobile — 390 px
- largura útil de referência de 354 px;
- fluxo vertical para segmentos, anos/séries e turmas;
- nome completo da turma e área de toque adequada;
- ausência de tabela horizontal, corte ou overflow lateral.

### Estado vazio global
Quando não houver nenhuma turma, preservar Header, menu global, título **Turmas** e Footer e mostrar somente “Nenhuma turma disponível no momento.” após o título, sem grupos, cards, filtros, CTA ou mensagem de erro.

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

**GABARITO / RESOLUÇÃO**<br>
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

## Matemática além da sala
- Situação: mockup aprovado em 27/09/2026.
- Referência técnica vigente: rota real `/matematica-alem-da-sala/` e componentes em `Site/src/components/matematica-alem/`. O protótipo `/validacao-matematica-alem-da-sala/` cumpriu sua função e foi removido com as fixtures após a regressão final já registrada em `00-INDICE-v5.1.md` e `08-CHECKLIST-DE-ACEITE-v4.0.md`; essa atualização de referência não constitui nova aprovação.
- Referências responsivas aprovadas: desktop de 1440 px, tablet de 834 px e mobile de 390 px.
- Estados aprovados: padrão, filtrado, nenhum resultado e vazio.

### Estrutura geral
- Header, menu global e Footer reutilizam os componentes vigentes do portal;
- introdução editorial com o título `Matemática além da sala`, texto de contexto e tratamento gráfico discreto;
- listagem global sem página individual de detalhe;
- conteúdo em duas colunas no desktop e uma coluna no tablet e no mobile;
- contador de resultados acompanha a listagem quando houver conteúdo;
- nenhum overflow horizontal nos três breakpoints.

### Filtros e estados
- exatamente Busca e Categoria;
- estado inicial com busca vazia e `Todas as categorias`;
- **Limpar filtros** aparece somente quando houver estado ativo;
- estado filtrado preserva os controles e apresenta apenas os cards correspondentes;
- nenhum resultado preserva filtros e limpeza e mostra exatamente `Nenhum conteúdo corresponde aos filtros selecionados.`;
- estado vazio preserva a introdução, oculta filtros e cards e mostra exatamente `Nenhum conteúdo disponível no momento.`;
- controles possuem labels explícitos, foco visível e boa área de toque.

### Cards editoriais
- categoria e publicação aparecem como metadados de abertura;
- título é o elemento dominante, seguido por resumo e texto editorial;
- autoria, origem e fontes aparecem em hierarquia secundária;
- tags usam tratamento discreto e não constituem filtro nesta versão;
- cards com e sem composição visual coexistem sem reservar área vazia quando a imagem estiver ausente;
- composição visual ocupa área controlada, preserva proporção, crédito legível e ausência de distorção;
- o protótipo usa somente composições abstratas em CSS, sem imagem externa ou ativo de terceiro.

### Fontes, créditos e ações
- Curadoria apresenta uma ou mais fontes identificadas;
- composição visual apresenta crédito legível sem encobrir conteúdo essencial;
- cada card possui no máximo uma ação principal entre `Saiba mais`, `Ver fonte`, `Assistir` e `Acessar conteúdo`;
- ausência de ação não produz botão desabilitado, placeholder ou espaço obrigatório;
- ação externa usa nova aba, `rel="noopener noreferrer"`, foco visível e ícone externo coerente com o portal.

### Desktop — 1440 px
- introdução ampla e hierarquia editorial preservada;
- Busca e Categoria na mesma faixa, com limpeza lateral quando ativa;
- cards em duas colunas;
- cards com composição visual usam imagem lateral e conteúdo com largura suficiente para leitura;
- cards sem imagem preservam a mesma hierarquia sem área visual vazia.

### Tablet — 834 px
- introdução adaptada à largura útil do portal;
- Busca e Categoria permanecem claros e sem compressão;
- cards em uma coluna, com composição visual lateral quando aplicável;
- fontes, créditos, tags e ação preservam leitura e área de toque;
- nenhuma sobreposição ou rolagem horizontal.

### Mobile — 390 px
- introdução, filtros e cards em fluxo vertical;
- Busca, Categoria e Limpar filtros ocupam a largura disponível;
- composição visual fica acima do conteúdo e mantém crédito legível;
- título, resumo, texto, autoria, fontes, tags e ação quebram naturalmente;
- ação ocupa boa área de toque;
- nenhum corte, sobreposição ou overflow horizontal.

### Variantes aprovadas
- padrão: seis fixtures fictícias, ordenadas para demonstrar variedade editorial;
- filtrado: Busca e Categoria ativas, um resultado e limpeza visível;
- nenhum resultado: zero cards, controles preservados, limpeza visível e mensagem exata;
- vazio: nenhum filtro, card ou fixture visível e mensagem exata em altura natural;
- a aprovação inclui cards com e sem composição visual, conteúdo Autoral e de Curadoria, fontes, créditos e as quatro ações possíveis.

### Limites da referência
- as fixtures pertencem exclusivamente ao protótipo e não podem integrar a coleção, a Home ou Novidades reais;
- a coleção real inicia vazia;
- a implementação deve compartilhar componentes e contrato entre rota real e protótipo, sem copiar fixtures para componentes;
- a faixa da Home segue a DEC-103 e não pertence ao estado vazio da página;
- nenhuma página individual, CMS, imagem externa ou conteúdo editorial real foi aprovado por este mockup.

## Regra de aceite visual
Antes de considerar uma implementação visual concluída, comparar as páginas e os componentes reais com os requisitos aprovados correspondentes em 1440 px, 834 px e 390 px. Para a composição final da Home, executar os critérios pendentes da DEC-104: ordem, hero, cinco cards, agrupamentos e âncoras semânticas de turmas, estados condicionais, destinos com `BASE_URL` e acessibilidade nos três breakpoints; usar a imagem histórica reconciliada, sem tratar o Passo 118 como aprovação visual. Para Matemática além da sala, comparar os quatro estados, cards com e sem composição visual, fontes, créditos, ações, filtros e ausência de overflow usando os componentes compartilhados. Para Oportunidades e Datas, comparar os quatro estados, as sete situações temporais, os marcos múltiplos, o item encerrado e a ausência de overflow usando os componentes compartilhados. Para Falar com o Professor, comparar os contextos com e sem turma, os quatro estados e a ausência de overflow usando os componentes compartilhados. Para Novidades, a comparação final do painel da Home, da visão completa e dos estados vazios foi concluída antes da remoção dos dois protótipos; regressões futuras devem usar este registro e as referências reais vigentes, sem restaurar fixtures ou rotas temporárias. Para a página de turma, comparar as três referências responsivas, o estado aberto do menu interno mobile e as visões completas de Cronogramas, Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links. Executar `08-CHECKLIST-DE-ACEITE-v4.1.md`.
