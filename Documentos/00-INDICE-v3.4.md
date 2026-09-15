# Índice da Documentação — Matemática Instrumental

Versão: 3.4  
Status: APROVADO — ORGANIZAÇÃO GLOBAL DA PÁGINA TURMAS  
Última atualização: 14/09/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais; arquivo preservado no pacote aprovado `documentacao-matematica-instrumental-v1.2-APROVADA-IMPLEMENTACAO-LIBERADA.zip`.
2. `02-ARQUITETURA-DO-SITE-v2.5.md` — páginas, seções, fluxos de navegação, organização global de Turmas, estrutura da página de turma e composição completa responsiva aprovada das visões de Cronogramas, Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links.
3. `03-DESIGN-SYSTEM-v2.5.md` — identidade visual, paletas, cabeçalho, menus, ícones, responsividade, menu interno mobile e composição visual completa de Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links.
4. `04-MODELO-DE-CONTEUDO-v1.7.md` — estrutura vigente de conteúdo, incluindo a distinção entre título, objetivo e tipo de objetivo em Para estudar, recursos vinculados, classificação matemática reutilizável, Vídeos, Links e vídeos relacionados.
5. `05-REGRAS-DE-AUTOMACAO-v1.7.md` — Novidades, prazos, estados automáticos, classificação temporal, ordenação determinística da página global Turmas, seleção automática de período em Cronogramas, cálculo do Total da etapa e liberação derivada de Gabarito/Resolução.
6. `06-ARQUITETURA-TECNICA-v1.5.md` — tecnologias, hospedagem, Drive, CMS, formulário, edição/publicação e implementação técnica das visões de Vídeos e Links como recursos externos seguros.
7. `07-DECISOES-DO-PROJETO-v3.4.md` — registro vigente das decisões aprovadas, incluindo a DEC-095 sobre organização global, arquivamento e estado vazio da página Turmas.
8. `08-CHECKLIST-DE-ACEITE-v2.7.md` — critérios de validação antes da publicação, incluindo organização, ordenação, arquivamento e estado vazio da página global Turmas, além das referências vigentes das sete visões consolidadas.
9. `09-MOCKUPS-APROVADOS-v2.4.md` — referências visuais aprovadas da página de turma e respectivos componentes reais nos três breakpoints.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `02-ARQUITETURA-DO-SITE-v2.5.md` substitui as versões anteriores da Arquitetura do Site. O `03-DESIGN-SYSTEM-v2.5.md` substitui as versões anteriores do Design System. O `04-MODELO-DE-CONTEUDO-v1.7.md` substitui as versões anteriores do Modelo de Conteúdo. O `05-REGRAS-DE-AUTOMACAO-v1.7.md` substitui as versões anteriores das Regras de Automação. O `06-ARQUITETURA-TECNICA-v1.5.md` substitui as versões anteriores da Arquitetura Técnica. O `07-DECISOES-DO-PROJETO-v3.4.md` substitui as versões anteriores do registro de decisões. O `08-CHECKLIST-DE-ACEITE-v2.7.md` substitui as versões anteriores do Checklist de Aceite. O `09-MOCKUPS-APROVADOS-v2.4.md` substitui as versões anteriores do registro de mockups aprovados.

## Atualização v3.4
A DEC-095 fechou as regras de produto da página global `/turmas/`:
- segmentos seguem a ordem institucional/documental vigente, com Ensino Fundamental — Anos Finais antes de Ensino Médio;
- anos/séries seguem ordem natural crescente dentro do segmento;
- no mesmo ano/série, turmas não arquivadas precedem as arquivadas e cada grupo usa `ordem` crescente com nome/título como desempate estável;
- turmas arquivadas permanecem no respectivo ano/série, continuam acessíveis, não formam seção global separada e usam exatamente “Turma arquivada — ano letivo encerrado”;
- sem turmas disponíveis, Header, menu global, título Turmas e Footer são preservados e aparece somente “Nenhuma turma disponível no momento.” após o título, sem cards vazios, filtros, CTA, cadastro, matrícula ou mensagem de erro.

## Atualização v3.3
A DEC-094 encerrou a lacuna D09 ao distinguir, na visão de Cronogramas, o período corrente opcional do período sempre selecionado quando houver dados suficientes. Dentro de um período, ele é corrente e selecionado; antes do primeiro período, seleciona-se o primeiro cronologicamente; entre períodos, seleciona-se o próximo cronologicamente; depois do último, seleciona-se o último. Fora de um período corrente, a seleção não recebe a identificação “Período atual”. Os itens e o Total da etapa pertencem sempre ao período selecionado, sem alterar as regras de valor das DEC-082 e DEC-083 nem criar campo persistido, novo texto, nova cor ou interação.

## Atualização v3.2
Os protótipos temporários das visões de Cronogramas, Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links cumpriram sua função de validação. Os layouts aprovados foram incorporados, respectivamente, a `CronogramasView.astro`, `ActivitiesListsView.astro`, `StudyView.astro`, `WorksView.astro`, `MaterialsView.astro`, `VideosView.astro` e `LinksView.astro`, que passam a ser as referências vigentes. As sete páginas temporárias foram removidas, sem alteração de requisitos visuais ou funcionais e sem criação de nova decisão.

## Atualização v3.1
A DEC-093 consolidou a visão completa de Links nos três breakpoints:
- recursos externos agrupados por `finalidade`, com grupos e títulos ordenados alfabeticamente no locale pt-BR;
- ausência total de filtros, busca, ordenação visual e estado de nenhum resultado;
- cabeçalho de finalidade e, em cada item, `tipo` secundário, `titulo` dominante, `descricao` e ação `Acessar`;
- `acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` preservados na camada de dados e sem apresentação visual;
- ação externa simples e segura na rota real, sem URL bruta, logo, modal, iframe, incorporação ou rastreamento;
- componente reutilizável sem fixtures e rota real baseada na coleção `links`; o protótipo temporário cumpriu a validação e foi removido;
- ausência de registros reais sem filtros, grupos, mensagem vazia, placeholder ou fixture;
- responsividade aprovada para 1440 px, 834 px e 390 px.

## Atualização v3.0
A DEC-092 consolidou a visão completa de Vídeos nos três breakpoints:
- biblioteca pedagógica em cards de mídia, sem prazo, status, atenuação, progresso, pontuação ou aparência de feed social;
- filtros visuais exatamente de Busca, Área, Subárea, Conteúdo e Prioridade, sem interatividade definitiva;
- ordenação por `publicacao` decrescente e, em empate, `titulo` crescente no locale pt-BR, sem prioridade, duração ou provedor como critérios;
- miniatura proveniente de `miniaturaUrl` em área 16:9, duração formatada pelo helper existente e prioridade textual neutra;
- título dominante, descrição secundária e uma ou várias cadeias Área → Subárea → Conteúdo dentro do mesmo card, sem duplicação;
- `provedor` e `tags` preservados nos dados e sem apresentação visual;
- ação `Ver vídeo` como link externo simples e seguro na rota real, sem modal, player, iframe, autoplay ou barra de progresso;
- componente reutilizável sem fixtures e rota real sem estado vazio inventado;
- responsividade aprovada para 1440 px, 834 px e 390 px.

## Atualização v2.9
A DEC-091 consolidou a visão completa de Materiais nos três breakpoints:
- acervo permanente em uma única coluna, sem prazo, status, atenuação ou outros estados temporais;
- filtros visuais exatamente de Busca, Área, Subárea, Conteúdo e Tipo, sem interatividade definitiva;
- título dominante e Tipo como metadado textual secundário;
- exatamente um `arquivoLink` por Material, apresentado somente pelo nome;
- uma ou várias classificações Área → Subárea → Conteúdo dentro do mesmo registro, sem duplicação;
- descrição opcional conforme o desenho aprovado;
- `publicacao` e `tags` preservadas nos dados e sem apresentação visual;
- dentro do mesmo Conteúdo, prioridade para publicação mais recente, sem nova regra global entre Conteúdos diferentes;
- componente reutilizável sem fixtures e rota real sem estado vazio inventado;
- responsividade aprovada para 1440 px, 834 px e 390 px.

## Atualização v2.8
A DEC-090 consolidou a visão completa de Trabalhos nos três breakpoints:
- título obrigatório conforme Modelo de Conteúdo e schema vigentes;
- filtros visuais exclusivamente de Busca e Assunto, ainda sem interatividade definitiva;
- ordenação por Publicação decrescente e título crescente como desempate determinístico;
- `marco.tipo` preservado tecnicamente no enum Entrega ou Apresentação, enquanto a visão da turma usa sempre o rótulo visual `ENTREGA`;
- atenuação derivada somente no dia seguinte a `marco.data`, usando `America/Sao_Paulo`;
- descrição opcional, Documento do trabalho obrigatório e Recursos adicionais opcionais;
- tags preservadas nos dados e sem apresentação visual;
- mobile com título em faixa própria e metadados na proporção `1.6fr | 1fr | 1fr`, sem quebra arbitrária interna de palavras;
- componente reutilizável sem fixtures e rota real sem estado vazio inventado.

## Atualização v2.7
A DEC-089 consolidou a visão completa de Para estudar nos três breakpoints:
- título e objetivo permanecem campos distintos, com o objetivo apresentado como informação pedagógica abaixo do cabeçalho;
- `tipoObjetivo` permanece no modelo, sem apresentação visual ou taxonomia aprovada;
- filtros visuais exclusivamente de Busca e Assunto, ainda sem interatividade definitiva;
- ordenação por Publicação decrescente e título crescente como desempate determinístico;
- rótulo visual `DATA` para o campo técnico opcional `dataObjetivo`;
- atenuação derivada somente no dia seguinte à data do objetivo, usando `America/Sao_Paulo`;
- Recursos e Leituras relacionadas como links independentes; Vídeos relacionados permanecem sem apresentação;
- no mobile, título em faixa exclusiva e metadados abaixo em duas ou três colunas iguais;
- componente reutilizável sem fixtures e rota real sem estado vazio inventado.

## Atualização v2.6
A DEC-088 consolidou a visão completa de Atividades e listas nos três breakpoints:
- listagem por Publicação decrescente e título crescente como desempate determinístico;
- filtros visuais exclusivamente de Busca, Assunto e Tipo, ainda sem interatividade definitiva;
- tipos Atividade e Lista de exercícios;
- metadados e Prazo opcional preservados conforme as DEC-085, DEC-086 e DEC-087;
- descrição opcional, múltiplos Recursos vinculados e Gabarito/Resolução disponível;
- liberação futura de Gabarito/Resolução derivada da data centralizada, sem revelar links ou nomes antes da data;
- Vídeos relacionados permanecem sem apresentação visual;
- componente reutilizável sem fixtures e rota real sem estado vazio inventado.

## Referências visuais oficiais
Manter na pasta de referências:
- logotipos oficiais;
- símbolo π;
- assinatura da marca;
- foto do professor;
- imagem com as três paletas oficiais;
- mockups aprovados da página de turma para desktop, tablet e celular.

## Situação da página de turma
Os mockups específicos de desktop, tablet e celular estão aprovados, assim como os refinamentos documentados posteriormente.

As condições prévias para implementação permanecem cumpridas:
1. documentação aprovada;
2. mockups de desktop, tablet e celular aprovados;
3. ETAPA 23 — checklist pré-implementação aprovada;
4. ETAPA 24 — liberação formal para implementação aprovada em 22/08/2026.

**Situação atual: IMPLEMENTAÇÃO LIBERADA.**

## Regra de trabalho
**Documentação primeiro, mockup depois, implementação por último.**

Qualquer alteração relevante deve seguir:
1. registrar a decisão;
2. atualizar o documento correspondente;
3. atualizar ou criar mockup, se houver impacto visual;
4. aprovar a nova versão;
5. somente então alterar o código.


