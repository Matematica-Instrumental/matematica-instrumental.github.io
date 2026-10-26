# Índice da Documentação — Matemática Instrumental

Versão: 5.8<br>
Status: APROVADO — PUBLICAÇÃO ATIVA E DEC-106 (PAGES CMS)<br>
Última atualização: 26/10/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais; arquivo preservado no pacote aprovado `documentacao-matematica-instrumental-v1.2-APROVADA-IMPLEMENTACAO-LIBERADA.zip`.
2. `02-ARQUITETURA-DO-SITE-v3.7.md` — páginas, seções e fluxos de navegação, incluindo o contrato final da Home pela DEC-104 e as integrações vigentes de Matemática além da sala, a implementação real de Oportunidades e Datas, Provas e Resoluções, Falar com o Professor, Home, `/novidades/`, organização global de Turmas, página de turma e suas sete visões consolidadas.
3. `03-DESIGN-SYSTEM-v2.7.md` — identidade visual, paletas, cabeçalho, menus, ícones, responsividade, composição visual aprovada de Falar com o Professor, menu interno mobile e composição visual completa de Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos e Links.
4. `04-MODELO-DE-CONTEUDO-v2.5.md` — estrutura vigente de conteúdo, incluindo os contratos de URL/caminho seguro, datas civis, regimes/períodos, slugs/rotas e integridade entre registros, além do conteúdo preservado da versão anterior.
5. `05-REGRAS-DE-AUTOMACAO-v2.5.md` — seleção automática de anos/séries elegíveis na Home, ordenação, filtros, busca, arquivamento e integrações de Matemática além da sala, além das automações implementadas de Oportunidades e Datas, Provas e Resoluções, Novidades, prazos, Turmas e Cronogramas.
6. `06-ARQUITETURA-TECNICA-v2.9.md` — tecnologias, infraestrutura publicada no GitHub Pages e Actions, Pages CMS (DEC-106), hospedagem, validação de integridade, Formspree, projeção estática de Novidades e recursos externos seguros.
7. `07-DECISOES-DO-PROJETO-v4.5.md` — registro vigente das decisões aprovadas, incluindo a DEC-106 sobre o Pages CMS, a DEC-105 sobre a arquitetura de publicação no GitHub Pages, a DEC-104 sobre o contrato final da Home e as decisões anteriores.
8. `08-CHECKLIST-DE-ACEITE-v4.5.md` — publicação ativa, reclassificação de Restrict to Domain, reconciliação operacional dos critérios comprovados, pendências classificadas, evidências do saneamento técnico de integridade e aceites preservados das frentes anteriores.
9. `09-MOCKUPS-APROVADOS-v3.2.md` — aprovação visual humana do protótipo final da Home e da correção do card compacto com imagem em 834 px, referência histórica reconciliada pela DEC-104 e referências visuais preservadas das outras frentes; o aceite posterior da Home real está registrado no Checklist v4.2.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `02-ARQUITETURA-DO-SITE-v3.7.md` substitui as versões anteriores da Arquitetura do Site. O `03-DESIGN-SYSTEM-v2.7.md` substitui as versões anteriores do Design System. O `04-MODELO-DE-CONTEUDO-v2.5.md` substitui as versões anteriores do Modelo de Conteúdo. O `05-REGRAS-DE-AUTOMACAO-v2.5.md` substitui as versões anteriores das Regras de Automação. O `06-ARQUITETURA-TECNICA-v2.9.md` substitui as versões anteriores da Arquitetura Técnica. O `07-DECISOES-DO-PROJETO-v4.5.md` substitui as versões anteriores do registro de decisões. O `08-CHECKLIST-DE-ACEITE-v4.5.md` substitui as versões anteriores do Checklist de Aceite. O `09-MOCKUPS-APROVADOS-v3.2.md` substitui as versões anteriores do registro de mockups aprovados.

## Documento em validação

- `CMS-TELAS-E-CAMPOS-v1.0.md` — **EM VALIDAÇÃO.** Telas, campos, rótulos e ajudas do Pages CMS (Fase 1). Funciona como mockup da frente de CMS e precisa ser aprovado antes da criação do `.pages.yml`.

## Atualização v5.8

Em 26/10/2026 a DEC-105 foi implementada: o repositório público `Matematica-Instrumental/matematica-instrumental.github.io` foi criado, o GitHub Pages usa "GitHub Actions" como fonte e o portal está no ar em `https://matematica-instrumental.github.io/`. O workflow passou a usar `check-latest: true` no Node 22, pois o Astro 7.4 exige Node 22.23.4 ou superior.

A DEC-106 definiu o Pages CMS gratuito como ambiente de manutenção: gravação direta em `main`, acesso somente pela conta `Matematica-Instrumental`, Fase 1 com Turmas, regimes e períodos, itens de Cronograma, Atividades e listas, Para estudar, Trabalhos, Materiais, Vídeos, Links e classificações, e Fase 2 com Avisos, Provas, Oportunidades e Matemática além da sala. Não haverá upload de arquivos pedagógicos. O aviso da soma do Cronograma (DEC-039) passa a ser emitido pelo build, sem bloquear o deploy. Restrict to Domain do Formspree foi declarado indisponível no plano gratuito e não será usado.

Foram criados `06-ARQUITETURA-TECNICA-v2.9.md`, `07-DECISOES-DO-PROJETO-v4.5.md`, `08-CHECKLIST-DE-ACEITE-v4.5.md` e `CMS-TELAS-E-CAMPOS-v1.0.md`. Nenhum código foi alterado nesta atualização.

## Atualização v5.7

Em 16/10/2026, a DEC-105 formalizou a arquitetura de publicação no GitHub Pages antes de qualquer configuração externa. A conta pessoal proprietária será `Matematica-Instrumental`; o repositório público único será `matematica-instrumental.github.io`; e `main` permanecerá como branch canônico de desenvolvimento e fonte do projeto. O usuário autorizou conscientemente a futura exposição pública dos arquivos rastreados e do histórico Git, condicionada a uma auditoria final antes do primeiro push. Não foi criado repositório, remote, workflow, Pages ou deploy neste passo.

A URL planejada é `https://matematica-instrumental.github.io/`, sem domínio próprio na primeira publicação. O valor planejado de `site` no Astro é `https://matematica-instrumental.github.io`; `base` não será definido explicitamente porque o site de usuário será servido na raiz `/`. `/Matematica-Instrumental/` permanece somente como evidência histórica de compatibilidade com subcaminho, não como base de produção.

GitHub Actions fará teste, build do Astro e deploy por artefato ao Pages, sem publicação direta dos arquivos fonte e sem branch `gh-pages` canônico. Os gatilhos planejados são `push` em `main`, `workflow_dispatch` e `schedule`; o rebuild diário terá horário operacional pretendido de 00:15 em `America/Sao_Paulo`. Falhas de teste ou build bloquearão o deploy, falhas de deploy permanecerão visíveis e a execução manual permitirá nova tentativa sem fallback silencioso.

`/validacao-turma/` continuará temporariamente no build e ficará acessível por URL direta conforme a DEC-076, fora da navegação pública. Pages CMS permanece aprovado, mas escopo, branch, autenticação, permissões e workflow editorial serão decididos na Fase C, depois da estabilização do Pages. Após ativação e validação da URL pública, o Formspree receberá `matematica-instrumental.github.io` em **Restrict to Domain**, sem `https://` e sem `localhost`.

Foram criados `06-ARQUITETURA-TECNICA-v2.8.md` e `07-DECISOES-DO-PROJETO-v4.4.md`. O Checklist v4.4 e o README permanecem vigentes e inalterados, pois nenhuma infraestrutura foi implementada e seus estados continuam factuais.

## Atualização v5.6

Em 16/10/2026, o README starter do Astro foi substituído por documentação operacional do projeto real, cobrindo identificação, objetivo, stack configurada, estrutura, governança, ambiente local, build com `BASE_URL`, conteúdo, testes de integridade, rota técnica, serviços ainda não configurados, segurança e estado factual do portal. O README não declara remote, GitHub Pages, GitHub Actions ou Pages CMS como configurados.

Os arquivos vazios `Site/src/utils/dates.js` e `Site/src/utils/temporalStates.js` foram removidos após confirmação de 0 bytes, ausência de imports, exports, referências por nome ou requisito documental. A lógica temporal vigente permanece centralizada nos utilitários realmente utilizados. `/validacao-turma/` e suas fixtures permanecem intactas conforme a DEC-076.

O Checklist v4.4 reconciliou 346 critérios anteriormente abertos com evidências já existentes: 336 critérios comprovadamente implementados foram encerrados e 10 permaneceram abertos. As pendências foram classificadas em conteúdo real (4), CMS (1), infraestrutura/publicação (0), configuração externa (2), teste humano futuro (0) e não implementado literalmente (3).

A Arquitetura Técnica v2.7 permaneceu vigente naquele fechamento, pois a remoção de arquivos vazios e a documentação operacional não alteravam a arquitetura então aprovada. Nenhuma nova DEC foi criada naquela atualização. As versões anteriores permanecem preservadas.

## Atualização v5.5

Em 16/10/2026 foi concluído o saneamento técnico de integridade anterior ao CMS, sem criação de nova decisão. O contrato existente foi endurecido com validadores reutilizáveis para URLs externas HTTP(S), caminhos internos absolutos seguros e ativos locais controlados, rejeitando protocolos não autorizados e path traversal. Datas civis continuam canônicas e sem deslocamento de timezone; intervalos, destaque e liberação programada recebem validação de coerência.

O utilitário `Site/src/utils/contentIntegrity.ts` valida de forma determinística regras entre registros: IDs e referências, slug e rota canônica de Turma, colisões de agrupamento, quantidade e ordem de períodos por regime, intervalos, sobreposição e ano letivo. A validação é executada no build e possui testes A–T pelo runner nativo do Node, sem dependência adicional.

A Turma A — 2026 permaneceu válida e as outras 13 coleções permaneceram vazias e válidas. A rota técnica `/validacao-turma/` foi preservada integralmente conforme a DEC-076, com fixtures isoladas do conteúdo real. Os builds normal e com `BASE_URL` continuam previstos com 16 páginas: 15 rotas de produto e uma rota técnica de validação.

Foram atualizados somente `00-INDICE`, `04-MODELO-DE-CONTEUDO`, `06-ARQUITETURA-TECNICA` e `08-CHECKLIST-DE-ACEITE`. Naquele fechamento, a Especificação Geral v1.2, a Arquitetura do Site v3.7, as Regras de Automação v2.5, as Decisões v4.3 e os demais documentos permaneceram vigentes e inalterados.

## Atualização v5.4

Em 12/10/2026, o usuário confirmou a **aprovação da regressão visual humana da Home real** em **1440 px, 834 px e 390 px** e da navegação **`/turmas/#turmas-ensino-medio-1o-ano`**. Foram aprovados o hero, o painel Novidades vazio com **“Nenhuma novidade no momento.”**, os **cinco cards de Acesso rápido**, o Acesso às turmas com **Ensino Médio → 1º ano**, a ausência integral da faixa Matemática além da sala com zero elegíveis e a preservação da composição institucional.

A aprovação anterior do protótipo final, inclusive seus quatro estados e a correção do card editorial compacto com imagem em **834 px**, continua registrada como evidência histórica. A Home real atual não contém cards editoriais nem Novidades preenchidas; esses casos não são apresentados como conteúdo real ou como novo teste visual neste fechamento. A correção restrita a **621–900 px** permanece preservada nos componentes.

O fechamento do Passo 122 é registrado em `08-CHECKLIST-DE-ACEITE-v4.2.md`; `09-MOCKUPS-APROVADOS-v3.2.md` permanece inalterado como registro da aprovação anterior do protótipo. Naquele fechamento, a **DEC-104** e `07-DECISOES-DO-PROJETO-v4.3.md` permaneceram inalterados e não foi criada nova decisão. As versões anteriores dos documentos e as evidências das outras frentes continuam preservadas.

A remoção autorizada abrange somente `Site/src/pages/validacao-home-final.astro` e suas fixtures locais, sem remover componentes reais, dados, âncoras semânticas, correção responsiva, documentação ou `Referencias/Mockups/home-v1-aprovada.png`. O PNG é referência do projeto, não um asset publicado. A rota técnica antiga `/validacao-turma/`, já existente no HEAD anterior, fica fora desta frente; a contagem prevista de 16 páginas não deve ser descrita como 16 rotas exclusivamente de produção.

**Situação da Home: HOME REAL APROVADA — FECHAMENTO TÉCNICO CONCLUÍDO.** Os builds finais normal e com `BASE_URL` geraram 16 páginas sem warnings ou erros; links, assets e âncoras foram validados; todas as 16 rotas geradas responderam 200; `/validacao-home-final/` e uma visão interna inválida de turma responderam 404; a auditoria final não encontrou resíduos demonstrativos. O checkpoint será preparado sem executar commit, push, deploy ou criar remote.

## Atualização v5.3

O usuário confirmou em 12/10/2026 a **aprovação visual humana do protótipo final da Home** em **1440 px, 834 px e 390 px**, nos estados **padrão**, **real atual**, **sem turmas** e **robustez**. A aprovação inclui hero + Novidades, cinco cards de Acesso rápido, Acesso às turmas e Matemática além da sala quando elegíveis, além dos casos de títulos longos e comportamento mobile.

A correção do card editorial compacto com imagem em **834 px**, restrita à media query de **621–900 px** em `MatematicaAlemCard.astro`, também foi aprovada pelo usuário. Devem ser preservadas as regras `flex: 0 0 31%`, `width: auto`, `min-width: 0` e `min-height: 0`, sem ampliar seu alcance para outros breakpoints sem necessidade.

A aprovação está registrada no novo `09-MOCKUPS-APROVADOS-v3.2.md` **antes da implementação funcional da Home real**, autorizada no Passo 121 conforme a **DEC-104**, que permanece vigente. Nenhuma nova decisão foi criada. As versões anteriores dos documentos são preservadas como histórico; os outros documentos vigentes continuam inalterados.

A referência `/validacao-home-final/` permanece temporariamente com suas quatro variantes até a regressão final. Fixtures continuam exclusivamente na rota temporária e não podem integrar as coleções, a Home real, Novidades ou as áreas reais de Turmas e Matemática além da sala.

**Situação da Home: PROTÓTIPO FINAL APROVADO — IMPLEMENTAÇÃO FUNCIONAL LIBERADA.** A aprovação humana informada pelo usuário corresponde ao protótipo, não à Home real. A implementação e sua regressão final não estão declaradas concluídas por este registro; os critérios de `08-CHECKLIST-DE-ACEITE-v4.1.md` continuam a verificar após a implementação.

## Atualização v5.2
A **DEC-104 — Contrato final da Home** consolida a referência visual histórica já aprovada `Referencias/Mockups/home-v1-aprovada.png` com os requisitos posteriores. A ordem final é: Header e menu global; hero com Novidades; Acesso rápido; Acesso às turmas quando elegível; Matemática além da sala quando elegível; Footer.

O hero usa **“Bem-vindos ao Matemática Instrumental”**, o texto **“Conteúdo organizado, claro e objetivo para você aprender mais e melhor.”** e **“Comece por aqui”** para `#acesso-rapido`. O Acesso rápido é sempre presente com cinco cards inteiros acionáveis: Turmas, Provas e Resoluções, Oportunidades e Datas, Matemática além da sala e Falar com o Professor. Downloads não integra o contrato e nenhuma rota global nova é criada.

O acesso às turmas é derivado da coleção real, considera exclusivamente `arquivada !== true`, agrupa por Segmento e Ano/Série e apresenta um acesso por combinação elegível. Segmentos seguem a ordem institucional e anos/séries a ordem natural crescente; não há preenchimento de anos sem turma nem limite artificial. O destino é o agrupamento em `/turmas/` com âncora compartilhada `turmas-{segmentoSlug}-{anoSerieSlug}`, derivada pela normalização vigente e sem índices de renderização. Com zero turmas não arquivadas, a seção inteira é omitida. A DEC-095 continua preservando arquivadas na página global.

As DEC-096/097, as integrações posteriores de Novidades e as DEC-102/103 permanecem vigentes. A imagem não restaura notícias fictícias, a antiga ordem de estados, todos os anos institucionais, seis atalhos de categoria ou o nome “Materiais Além da Sala”. Header, navegação e Footer já aprovados permanecem preservados; redes sociais somente poderão ser acionáveis após documentação das URLs oficiais.

O Modelo de Conteúdo passa a usar **`acao`**, alinhado ao schema e aos componentes de Matemática além da sala já aprovados. A DEC-102 não exige outra chave literal; a correção é exclusivamente de nomenclatura documental.

Foram atualizados os documentos 00, 02, 04, 05, 07, 08 e 09. A Especificação Geral v1.2, o Design System v2.7 e a Arquitetura Técnica v2.6 permanecem vigentes, pois não mudam objetivos gerais, identidade global, stack ou transporte. As novas regras de seleção da Home são documentadas no 05, sem alteração de código.

**Situação da Home: CONTRATO FINAL DEFINIDO — PRONTO PARA PROTÓTIPO/IMPLEMENTAÇÃO.** Este passo não cria protótipo, não altera arquivos do site, não executa build e não declara a implementação final ou uma nova validação visual concluídas. Os critérios novos de Home no Checklist v4.1 permanecem pendentes; as evidências das frentes anteriormente encerradas são preservadas.

## Atualização v5.1
A regressão visual final de **Matemática além da sala** foi aprovada em 1440 px, 834 px e 390 px nos estados padrão, filtrado, nenhum resultado e vazio. Foram validados a rota real, o estado vazio da coleção, os filtros Busca e Categoria, a busca sem distinção de caixa ou acentos, a combinação em lógica E, a integração editorial com Novidades e a faixa da Home conforme a DEC-103.

O protótipo temporário `/validacao-matematica-alem-da-sala/` cumpriu sua função e foi removido com as seis fixtures demonstrativas. A coleção real `matematicaAlem` permanece vazia e preservada somente por `.gitkeep`; a rota `/matematica-alem-da-sala/`, os componentes compartilhados, a integração da Home e `novidades.ts` passam a ser as referências técnicas vigentes. A auditoria confirmou ausência de imagens externas baixadas, hotlinks não autorizados, textos copiados, dados pessoais e conteúdo fictício na coleção real. O portal voltou a gerar 16 páginas nos builds normal e com `BASE_URL`, sem warnings ou erros. As DEC-102 e DEC-103 permanecem vigentes e o registro visual aprovado continua no `09-MOCKUPS-APROVADOS-v3.0.md`.

## Atualização v5.0
O mockup de **Matemática além da sala** foi aprovado em 1440 px, 834 px e 390 px nos estados padrão, filtrado, nenhum resultado e vazio. A aprovação inclui cards com e sem composição visual, conteúdo Autoral e de Curadoria, fontes, créditos, ações e os filtros Busca e Categoria. A referência está registrada no `09-MOCKUPS-APROVADOS-v3.0.md`.

A implementação real está liberada conforme as DEC-102 e DEC-103. A coleção deverá iniciar vazia; as seis fixtures continuarão restritas ao protótipo temporário, que será preservado para regressão final e reutilizará os mesmos componentes da rota real.

## Atualização v4.9
A DEC-103 resolve o comportamento da faixa própria de **Matemática além da sala** na Home quando não houver destaques elegíveis. Com zero registros não arquivados marcados por `destaqueHome: true`, a faixa não é renderizada: não há título, estado vazio, placeholder nem reserva de espaço vertical.

Com um ou dois elegíveis, a Home mostra somente a quantidade existente; com três ou mais, mostra no máximo três conforme a ordenação aprovada. Nunca preencher vagas com registros sem `destaqueHome: true`. A decisão afeta exclusivamente a faixa da Home e não altera o estado vazio da rota `/matematica-alem-da-sala/`, que permanece **“Nenhum conteúdo disponível no momento.”**.

## Atualização v4.8
A DEC-102 fecha o contrato editorial e funcional de **Matemática além da sala**. A área será uma listagem global sem páginas individuais, alimentada futuramente por uma única coleção editorial, com as categorias vigentes Curiosidades, História da Matemática, Personalidades, Matemática no cotidiano, Aplicações, Desafios, Vídeos, Leituras e Sites e recursos. Busca e Categoria serão os únicos filtros; a ordenação será publicação decrescente, título pt-BR e ID estável. Vídeos e Links das áreas de turma não serão misturados à coleção global.

O protótipo temporário `/validacao-matematica-alem-da-sala/` usa somente fixtures fictícias, ilustrações abstratas em CSS e destinos `example.invalid`, com variantes padrão, vazio, filtrado e nenhum resultado. A rota real `/matematica-alem-da-sala/`, a Home, `novidades.ts`, `content.config.ts` e as coleções reais permanecem inalterados. O mockup está **EM VALIDAÇÃO** e não integra o `09-MOCKUPS-APROVADOS-v2.9.md`.

## Atualização v4.7
O mockup de **Oportunidades e Datas** foi aprovado em 1440 px, 834 px e 390 px nos estados padrão, filtrado, nenhum resultado e vazio, incluindo situações temporais, múltiplos marcos e item encerrado. A aprovação está registrada no `09-MOCKUPS-APROVADOS-v2.9.md`; a DEC-101 permanece vigente e nenhuma nova decisão foi criada.

A rota real `/oportunidades-e-datas/` consome a coleção vazia `oportunidades` e deriva situação, retenção, ordenação, ações e opções em utilitário central. A regressão final confirmou os estados temporais, os filtros funcionais, a busca sem distinção de caixa ou acentos, a dependência Segmento/Ano-Série, o estado vazio real e a integração com Novidades pelas janelas de Novo, Atenção e Destaque aprovadas, sem duplicação. A coleção real permanece vazia e preservada por `.gitkeep`; o protótipo temporário `/validacao-oportunidades-e-datas/` e todas as suas fixtures foram removidos após a validação. O portal voltou a gerar 16 páginas, sem alteração da DEC-101 nem do mockup aprovado no `09-MOCKUPS-APROVADOS-v2.9.md`.

## Atualização v4.6
A DEC-101 fecha o contrato de **Oportunidades e Datas**. A área global reúne ENEM, Vestibular, CEFET/Instituto Federal, Processo seriado, Concurso, Olimpíada e Evento em listagem única, sem página individual. Cada registro usa publicação e uma lista estruturada de marcos dos tipos Abertura de inscrições, Encerramento de inscrições, Realização e Divulgação de resultado. Encerramento de inscrições e Realização são as únicas datas críticas para Atenção; situação, próximo marco, encerramento e retenção são derivados em datas civis de `America/Sao_Paulo`.

Oportunidades usam Novo por sete dias a partir de `publicacao`, Destaque pelo bloco opcional `destaqueNovidades` e a precedência **Destaque > Atenção > Novo**. Itens encerrados permanecem na origem até 90 dias após o último marco e depois deixam automaticamente a listagem, sem exclusão manual diária. Busca e os filtros futuros usam lógica E; o protótipo responsivo `/validacao-oportunidades-e-datas/` contém somente fixtures fictícias e variantes de conteúdo, vazio, filtrado e nenhum resultado. A rota real permanece shell, sem coleção, schema, conteúdo ou filtros definitivos. O mockup ainda está **EM VALIDAÇÃO** e não altera o `09-MOCKUPS-APROVADOS-v2.8.md`.

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
- mockup histórico aprovado da Home `Referencias/Mockups/home-v1-aprovada.png`, reconciliado pela DEC-104 e registrado no `09-MOCKUPS-APROVADOS-v3.2.md`;
- logotipos oficiais;
- símbolo π;
- assinatura da marca;
- foto do professor;
- imagem com as três paletas oficiais;
- mockups aprovados da página global de Turmas e da página de turma para desktop, tablet e celular.

## Situação da Home
O mockup completo histórico está disponível em `Referencias/Mockups/home-v1-aprovada.png` e foi inspecionado na consolidação do contrato final. A DEC-104 fecha hero, cinco atalhos, seleção e destinos de anos/séries, ordem final, estados de ausência e preservação das regras mais recentes.

A Home real foi implementada no Passo 121 conforme DEC-104, reutilizando os componentes aprovados. Em 12/10/2026, o usuário aprovou a regressão visual humana da implementação real em 1440 px, 834 px e 390 px e o destino `/turmas/#turmas-ensino-medio-1o-ano`. O aceite e o fechamento técnico finais estão registrados no `08-CHECKLIST-DE-ACEITE-v4.2.md`; o `09-MOCKUPS-APROVADOS-v3.2.md` permanece como registro da aprovação anterior do protótipo.

O estado real aprovado contém hero, Novidades vazias, cinco atalhos, Ensino Médio → 1º ano e Footer, sem faixa editorial com zero elegíveis. A aprovação anterior do protótipo e da correção de 834 px permanece histórica, sem exigir fixtures na Home real. O Passo 122 autoriza remover somente a rota temporária da Home após essa regressão, preservando a implementação e a referência PNG.

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
