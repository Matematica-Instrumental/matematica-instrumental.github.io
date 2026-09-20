# Índice da Documentação — Matemática Instrumental

Versão: 4.5<br>
Status: APROVADO — PROVAS E RESOLUÇÕES CONCLUÍDAS<br>
Última atualização: 20/09/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais; arquivo preservado no pacote aprovado `documentacao-matematica-instrumental-v1.2-APROVADA-IMPLEMENTACAO-LIBERADA.zip`.
2. `02-ARQUITETURA-DO-SITE-v3.3.md` — páginas, seções, fluxos de navegação e implementação funcional, incluindo Provas e Resoluções, Falar com o Professor, Home, `/novidades/`, organização global de Turmas, página de turma e suas sete visões consolidadas.
3. `03-DESIGN-SYSTEM-v2.7.md` — identidade visual, paletas, cabeçalho, menus, ícones, responsividade, composição visual aprovada de Falar com o Professor, menu interno mobile e composição visual completa de Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links.
4. `04-MODELO-DE-CONTEUDO-v2.0.md` — estrutura vigente de conteúdo, incluindo a coleção real Prova/Resolução, projeção derivada de Novidades, destaque editorial futuro, recursos vinculados, classificação matemática reutilizável, Vídeos, Links e vídeos relacionados.
5. `05-REGRAS-DE-AUTOMACAO-v2.1.md` — ordenação e filtros funcionais de Provas e Resoluções, além de elegibilidade, janelas e estados de Novidades, prazos, classificação temporal, Turmas, Cronogramas e liberação derivada de Gabarito/Resolução.
6. `06-ARQUITETURA-TECNICA-v2.3.md` — tecnologias, hospedagem, Drive, CMS, implementação técnica concluída de Provas e Resoluções, componentes definitivos e Formspree, projeção estática de Novidades e recursos externos seguros.
7. `07-DECISOES-DO-PROJETO-v3.9.md` — registro vigente das decisões aprovadas, incluindo a DEC-096 e a DEC-097 sobre Novidades, a DEC-098 e a DEC-099 sobre Falar com o Professor e a DEC-100 sobre Provas e Resoluções.
8. `08-CHECKLIST-DE-ACEITE-v3.6.md` — critérios e evidências finais de Provas e Resoluções, Falar com o Professor, Novidades, página global Turmas e sete visões consolidadas.
9. `09-MOCKUPS-APROVADOS-v2.8.md` — referências visuais aprovadas de Provas e Resoluções, Falar com o Professor, Novidades, página global de Turmas, página de turma e respectivos componentes nos três breakpoints.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `02-ARQUITETURA-DO-SITE-v3.3.md` substitui as versões anteriores da Arquitetura do Site. O `03-DESIGN-SYSTEM-v2.7.md` substitui as versões anteriores do Design System. O `04-MODELO-DE-CONTEUDO-v2.0.md` substitui as versões anteriores do Modelo de Conteúdo. O `05-REGRAS-DE-AUTOMACAO-v2.1.md` substitui as versões anteriores das Regras de Automação. O `06-ARQUITETURA-TECNICA-v2.3.md` substitui as versões anteriores da Arquitetura Técnica. O `07-DECISOES-DO-PROJETO-v3.9.md` substitui as versões anteriores do registro de decisões. O `08-CHECKLIST-DE-ACEITE-v3.6.md` substitui as versões anteriores do Checklist de Aceite. O `09-MOCKUPS-APROVADOS-v2.8.md` substitui as versões anteriores do registro de mockups aprovados.

## Atualização v4.5
A regressão visual final da implementação real de **Provas e Resoluções** foi aprovada nos três breakpoints e nos estados previstos. Foram confirmados os filtros funcionais, a busca sem distinção de caixa ou acentos, a combinação por lógica E, a dependência Segmento/Ano-Série, a limpeza, o estado sem resultados e o estado vazio real da coleção ainda sem registros.

O protótipo temporário `/validacao-provas-e-resolucoes/` cumpriu sua função e foi removido com todas as fixtures demonstrativas. A rota real `/provas-e-resolucoes/`, a coleção `provas`, o schema da DEC-100, os utilitários e os componentes compartilhados passam a ser as referências vigentes. O portal retorna a 16 páginas; o registro visual aprovado permanece no `09-MOCKUPS-APROVADOS-v2.8.md` e nenhuma nova decisão foi criada.

## Atualização v4.4
O mockup de **Provas e Resoluções** foi aprovado em 1440 px, 834 px e 390 px nos estados padrão, filtrado, nenhum resultado e vazio, incluindo cards com e sem resolução. A aprovação está registrada no `09-MOCKUPS-APROVADOS-v2.8.md`; a DEC-100 permanece vigente e nenhuma nova decisão foi necessária.

A rota real `/provas-e-resolucoes/` passa a consumir a coleção `provas`, preparar e ordenar os registros em utilitário central e reutilizar os mesmos componentes do protótipo. Busca e filtros funcionam no cliente sem recarregar a página ou persistir dados. A coleção real começa vazia e preservada por `.gitkeep`, portanto a rota real apresenta o estado vazio aprovado sem fixtures. O protótipo permanece temporariamente como referência de regressão e concentra todas as fixtures demonstrativas.

## Atualização v4.3
A DEC-100 fecha o contrato funcional e de conteúdo de **Provas e Resoluções**. O acervo é global, usa somente listagem, não cria páginas individuais e diferencia a prova obrigatória da resolução opcional. O modelo registra identificação estável, título, ano, Segmento, Ano/Série, tipo, instituição, assuntos, recurso da prova e fonte; fase, dificuldade, descrição, resolução, condição de uso e tags são opcionais conforme o contrato. Prova sem resolução mantém somente **Ver prova**, sem botão desabilitado ou placeholder.

A ordenação é determinística e os filtros futuros combinam Busca, Segmento, Ano/Série, Instituição, Ano, Tipo, Fase, Assunto e Dificuldade em lógica **E**. Foram definidos os estados exatos **“Nenhuma prova ou resolução disponível no momento.”** e **“Nenhuma prova ou resolução corresponde aos filtros selecionados.”**, além das regras de origem oficial, direitos e hospedagem externa.

O protótipo temporário `/validacao-provas-e-resolucoes/` demonstra o contrato com fixtures declaradamente fictícias e variantes de conteúdo, vazio, filtro selecionado e nenhum resultado. Ele não altera `/provas-e-resolucoes/`, não cria coleção, schema definitivo, CMS, conteúdo acadêmico real ou filtros client-side definitivos. O mockup permanece **EM VALIDAÇÃO** e não foi registrado no `09-MOCKUPS-APROVADOS-v2.7.md`.

## Atualização v4.2
O teste manual real de **Falar com o Professor** foi aprovado em ambiente local, sem registrar os dados pessoais utilizados. Foram confirmados o envio real ao Formspree, o estado visual de sucesso, o recebimento das submissões pelo serviço, os valores corretos de Turma e `contato-geral` e as notificações por e-mail. O caminho de erro permanece validado por inspeção e teste local controlado, sem nova submissão externa automática.

O protótipo temporário `/validacao-falar-com-o-professor/` cumpriu sua função e foi removido. A rota real `/falar-com-o-professor/` e os componentes em `src/components/contato/` passam a ser as referências técnicas definitivas, sem alteração dos requisitos ou do visual aprovado no `09-MOCKUPS-APROVADOS-v2.7.md`. O portal volta a gerar 16 páginas. Não foi criada nova decisão; a DEC-099 permanece vigente. **Restrict to Domain** continua como pendência externa até existir domínio público definitivo, sem cadastrar `localhost`.

## Atualização v4.1
A DEC-099 substitui exclusivamente o transporte Google Forms previsto na DEC-098 e na documentação anterior pelo Formspree. O formulário **Falar com o Professor** envia por AJAX, com método `POST` e resposta JSON, diretamente para o endpoint público aprovado `https://formspree.io/f/xkjgjoqv`, sem backend próprio, banco de dados, proxy, segredo ou token no código e sem redirecionamento.

O payload contém somente `name`, `email`, `motivo`, `message`, `turma`, `subject` e `_gotcha`. `subject` usa o valor controlado **“Mensagem pelo portal Matemática Instrumental”**; `turma` usa o `slug` reconhecido ou `contato-geral`; e `_gotcha` permanece vazio, visualmente oculto, fora do teclado e das tecnologias assistivas. Formshield está ativo, CAPTCHA visual está desabilitado, o arquivo de submissões do Formspree está habilitado e não existe upload. A restrição **Restrict to Domain** permanece pendente até a definição do domínio público final e não deve incluir `localhost`.

A rota real mantém os estados inicial, enviando, sucesso e erro. A validação nativa ocorre antes do transporte; enviando desabilita o botão, impede duplicidade e aplica `aria-busy`; sucesso somente ocorre quando `response.ok`, limpa Nome, E-mail, Motivo e Mensagem, preserva Turma e permanece na mesma página; falha de rede, resposta HTTP não aceita ou erro informado pelo serviço preserva os valores e libera nova tentativa. O site não armazena as mensagens; o Formspree processa e pode armazenar a submissão para encaminhá-la ao professor. O protótipo temporário continua compartilhando os componentes e simulando estados por query string, sem endpoint ativo ou transmissão externa. A integração não altera o visual congelado no `09-MOCKUPS-APROVADOS-v2.7.md`.

## Atualização v4.0
A regressão visual de **Falar com o Professor** foi aprovada em 1440 px, 834 px e 390 px. A aprovação abrange estados inicial, enviando, sucesso e erro; contextos com e sem turma; campo Turma somente leitura; botão; mensagens; composição “Antes de enviar”; responsividade e ausência de overflow. A referência foi congelada no `09-MOCKUPS-APROVADOS-v2.7.md`, sem nova decisão e com a DEC-098 preservada.

A interface aprovada foi extraída para componentes reutilizáveis compartilhados pela rota real `/falar-com-o-professor/` e pelo protótipo temporário `/validacao-falar-com-o-professor/`. A resolução do parâmetro `turma` foi centralizada: `slug` reconhecido usa `turma.slug` e `anoSerie — nome`; valor ausente ou desconhecido usa `contato-geral` e “Não se aplica / contato geral”. A rota real permanece sem transmissão enquanto a configuração externa estiver incompleta; não há URL, `entry.xxxxx`, endpoint de teste nem sucesso simulado. O contrato de configuração exige `FORM_ACTION_URL`, `ENTRY_NOME`, `ENTRY_EMAIL`, `ENTRY_MOTIVO`, `ENTRY_MENSAGEM` e `ENTRY_TURMA`.

## Atualização v3.9
A DEC-098 fecha o contrato funcional de **Falar com o Professor**. O formulário único exige Nome, E-mail, Motivo e Mensagem e não admite upload. Quando a origem for uma turma reconhecida, o valor técnico é o `slug` estável da Turma, já transportado pelo parâmetro `turma`, e a interface apresenta `anoSerie — nome`; sem turma reconhecida, o valor técnico canônico é `contato-geral` e a apresentação é “Não se aplica / contato geral”. O envio futuro será direto do navegador para o Google Forms, sem backend próprio, persistência local, dados pessoais em conteúdo estático ou Git e sem informações pessoais na URL. Os estados são inicial, enviando, sucesso e erro; durante o envio o botão fica desabilitado; no sucesso não há redirecionamento automático nem reapresentação dos dados enviados. A integração real continua bloqueada até existirem URL de submissão, IDs reais dos campos, confirmação do campo Turma e validação do comportamento permitido pelo Google Forms.

O protótipo responsivo temporário `Site/src/pages/validacao-falar-com-o-professor.astro` demonstra o contrato em 1440 px, 834 px e 390 px e permanece **EM VALIDAÇÃO**. Ele não integra serviço externo, não envia dados e não altera a rota real `/falar-com-o-professor/`. O `09-MOCKUPS-APROVADOS-v2.6.md` permanece vigente e não registra este protótipo como aprovado.

## Atualização v3.8
A DEC-097 eliminou a última ambiguidade funcional de Novidades: Cronograma, Atividade/Lista com prazo, Para estudar com `dataObjetivo` e Trabalho usam a janela de Novo **`publicacao <= hoje < publicacao + 7 dias`**, calculada em datas civis de `America/Sao_Paulo`. Cronograma sem `publicacao` não recebe Novo, mas pode receber Atenção por `dataPrazo`. Permanecem inalteradas as janelas de Atenção da DEC-096 e a precedência **Destaque > Atenção > Novo**. A implementação vigente já correspondia a essa regra, portanto não exigiu alteração de código nem impacto visual. Após a regressão visual final aprovada, os dois protótipos de Novidades e suas fixtures foram removidos; o `09-MOCKUPS-APROVADOS-v2.6.md` permanece vigente, com os requisitos visuais preservados e as referências atualizadas para a implementação real.

## Atualização v3.7
Os mockups de Novidades foram aprovados e registrados no `09-MOCKUPS-APROVADOS-v2.6.md` nas referências de 1440 px, 834 px e 390 px. A aprovação abrange o painel da Home, a visão completa, os estados Destaque, Atenção e Novo, o estado vazio compacto com altura natural, as ações derivadas por origem e turma e a ausência de histórico próprio, filtros e páginas individuais de detalhe. A DEC-096 permanece como decisão funcional vigente e não foi criada nova decisão. A implementação local do motor derivado, dos componentes reutilizáveis, da integração da Home e da rota `/novidades/` fica liberada conforme esse contrato visual.

## Atualização v3.6
A DEC-096 consolidou Novidades como projeção automática e não duplicada dos registros originais. Foram fechados: participação de conteúdo global e exclusão de conteúdo destinado somente a turmas arquivadas; estados exclusivos Destaque, Atenção e Novo, nessa precedência; janelas de Novo de 7 ou 10 dias; janelas de Atenção de D−7 até D ou D+1 conforme a fonte; contrato futuro de `destaqueNovidades`; ordenação transversal determinística; limite de seis itens na Home; rota futura `/novidades/` sem entrada obrigatória no menu e sem histórico próprio; destinos derivados das origens; e estado vazio exato. Os protótipos temporários `validacao-novidades-home.astro` e `validacao-novidades-lista.astro` são referências para aprovação visual e ainda não alteram a Home nem implementam a rota real.

## Atualização v3.5
O mockup da página global `/turmas/` foi aprovado em 1440 px, 834 px e 390 px e registrado no documento `09-MOCKUPS-APROVADOS-v2.5.md`. A composição aprovada preserva Header, menu global, título Turmas e Footer; organiza a navegação na hierarquia Segmento → Ano/Série → Turma; apresenta cada turma como acesso canônico com nome, ano letivo, descrição quando existente e tratamento discreto de arquivamento; mantém turmas arquivadas no próprio ano/série; e adapta os agrupamentos para três, duas e uma coluna nos respectivos breakpoints, sem filtros, autenticação, aparência administrativa ou overflow horizontal. A página `validacao-turmas.astro` permanece como referência de regressão visual durante a consolidação da rota real.

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
- mockups aprovados da página global de Turmas e da página de turma para desktop, tablet e celular.

## Situação da página global de Turmas
O mockup responsivo da página global de Turmas está aprovado em 1440 px, 834 px e 390 px. A implementação real está liberada conforme a DEC-095 e a referência visual registrada em `09-MOCKUPS-APROVADOS-v2.5.md`.

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
