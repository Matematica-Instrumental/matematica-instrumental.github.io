# Checklist de Aceite

Versão: 4.5<br>
Status: APROVADO — PUBLICAÇÃO ATIVA E DEC-106<br>
Última atualização: 26/10/2026


## Atualização v4.5 — publicação e DEC-106

Em 26/10/2026 o portal foi publicado em `https://matematica-instrumental.github.io/` pelo workflow do GitHub Actions. A DEC-106 definiu o Pages CMS e registrou que **Restrict to Domain** não está disponível no plano gratuito do Formspree. As duas ocorrências desse critério deixam de ser pendências e passam a ser marcadas como **não aplicável (N/A)**. Permanecem 8 critérios abertos: conteúdo real (4), CMS (1) e não implementado literalmente (3).

- [x] Portal publicado no GitHub Pages por artefato, com teste e build antes do deploy.
- [x] Restrict to Domain reclassificado como N/A pela DEC-106 (indisponível no plano gratuito); proteção mantida por Formshield e `_gotcha`.

## Reconciliação operacional — Passo 127

A versão 4.3 possuía 538 critérios: 192 marcados e 346 abertos. Esta revisão confrontou os itens abertos com o código atual, as decisões vigentes, os registros de mockups, as aprovações humanas já documentadas e as regressões técnicas existentes. Foram encerrados 336 critérios da categoria A, comprovadamente satisfeitos por implementação e evidência anterior, sem declarar conteúdo, serviço ou teste inexistente.

Permanecem 10 critérios abertos, classificados assim:

- **B — depende de conteúdo real (4):** funcionamento de links reais do Google Drive e os três critérios gerais de licença, registro de fonte/licença e otimização das imagens que vierem a integrar conteúdo;
- **C — depende de CMS (1):** edição de Cronogramas exclusivamente no ambiente de manutenção;
- **D — depende de infraestrutura/publicação (0);**
- **E — depende de configuração externa (2):** as duas ocorrências de **Restrict to Domain**, que aguardam o domínio público definitivo;
- **F — depende de teste humano futuro (0);**
- **G — realmente não implementado (3):** filtros funcionais gerais, busca funcional nas áreas de Turma e ausência literal de dados de teste enquanto a rota técnica `/validacao-turma/` e suas fixtures permanecerem por força da DEC-076.

As fixtures da rota técnica continuam isoladas das coleções reais e fora da navegação pública. Nenhum critério de conteúdo preenchido, CMS, publicação, configuração externa ou aprovação humana futura foi antecipado.

## Saneamento técnico de integridade — Passo 125

- [x] HEAD inicial `b065ebf`, branch `main`, árvore limpa, sem staged, untracked ou remote.
- [x] Campos externos aceitam somente HTTP(S); `javascript:`, `data:`, `ftp:`, `file:` e `mailto:` são rejeitados.
- [x] Recursos mistos aceitam HTTP(S) ou caminho interno absoluto seguro; traversal direto, por barra invertida ou codificado é rejeitado.
- [x] Ativos editoriais locais permanecem restritos a `/...` ou `src/assets/editorial/...`, sem hotlink ou traversal.
- [x] Datas civis continuam canônicas e sem deslocamento por timezone.
- [x] Intervalos de período e destaque exigem início menor ou igual ao fim; publicação não pode ser posterior ao fim do destaque.
- [x] Validade de Aviso e liberação programada são coerentes com a publicação; liberação exige Gabarito/Resolução.
- [x] Regimes bimestral, trimestral e semestral exigem 4, 3 e 2 períodos, respectivamente.
- [x] Períodos usam ordem positiva, única e sequencial, pertencem ao regime/ano correto e não se sobrepõem.
- [x] Slug de Turma usa minúsculas ASCII e kebab-case, identifica o ano letivo e não contém espaços, acentos, barras ou caracteres perigosos.
- [x] Slugs, rotas canônicas, âncoras derivadas e IDs são auditados quanto a colisões.
- [x] Referências inexistentes são detectadas pelo schema tipado e pelo validador global de conjunto.
- [x] `src/utils/contentIntegrity.ts` não renderiza HTML, não depende do navegador e retorna erros determinísticos.
- [x] `npm test` usa somente `node:test`, sem dependência nova, e cobre com sucesso os casos A–T.
- [x] A Turma A — 2026 permanece válida; as outras 13 coleções permanecem vazias e válidas.
- [x] `/validacao-turma/` permanece no arquivo, no build e isolada das coleções, conforme DEC-076.
- [x] Builds normal e com `BASE_URL` geram 16 páginas: 15 rotas de produto e uma rota técnica de validação, sem warnings ou erros.
- [x] As 15 rotas de produto e `/validacao-turma/` respondem 200; visão interna inválida de Turma responde 404.
- [x] Não houve instalação, alteração de lockfile, fixture nova, conteúdo real inventado, stage, commit, push, deploy ou remote.

## Home — contrato final da DEC-104

O contrato final foi consolidado no Passo 118 pela DEC-104 e implementado no Passo 121. Em 12/10/2026, o usuário informou a **aprovação da regressão visual humana da Home real em 1440 px, 834 px e 390 px** e da navegação **/turmas/#turmas-ensino-medio-1o-ano**. O aceite final da implementação real está registrado nesta versão; `09-MOCKUPS-APROVADOS-v3.2.md` permanece vigente como registro da aprovação anterior do protótipo e de suas referências visuais.

Os critérios da Home abaixo usam evidências complementares: aprovação humana do estado real atual; aprovação anterior dos quatro estados do protótipo final e da correção de 834 px; testes e inspeções funcionais do Passo 121; revalidações técnicas do fechamento. A Home real atual apresenta hero, Novidades vazias, cinco atalhos, Ensino Médio → 1º ano e Footer, sem faixa editorial. Estados preenchidos, títulos longos e casos sem turmas não são declarados como dados presentes ou como novas renderizações reais. As seções e evidências das outras frentes permanecem integralmente preservadas; o Passo 118 continua sendo somente documental.

### Estrutura, hero e componentes institucionais

- [x] A ordem visual e a ordem do documento são Cabeçalho e navegação global → Hero + Novidades → Acesso rápido → Acesso às turmas → Matemática além da sala — destaques → Rodapé, considerando a ocultação integral dos blocos condicionais.
- [x] Header, menu global, identidade, paletas, ícones e Footer reutilizam os componentes e o Design System vigentes.
- [x] A frase institucional do Header mantém as três linhas aprovadas pela DEC-067; a imagem histórica não substitui essa decisão.
- [x] O hero mostra exatamente “Bem-vindos ao Matemática Instrumental” e “Conteúdo organizado, claro e objetivo para você aprender mais e melhor.”.
- [x] A ação “Comece por aqui” conduz à âncora interna #acesso-rapido, sem nova rota ou comportamento de cadastro.
- [x] A composição mantém hero e Novidades lado a lado no desktop e adapta seu fluxo às referências vigentes em tablet e mobile.

### Acesso rápido

- [x] A seção Acesso rápido e sua âncora acesso-rapido existem independentemente de conteúdo nas coleções.
- [x] Existem exatamente cinco cards, nesta ordem: Turmas; Provas e Resoluções; Oportunidades e Datas; Matemática além da sala; Falar com o Professor.
- [x] Títulos, descrições curtas e destinos correspondem ao contrato final do 02-ARQUITETURA-DO-SITE-v3.7.md e à DEC-104.
- [x] Os destinos canônicos são /turmas/, /provas-e-resolucoes/, /oportunidades-e-datas/, /matematica-alem-da-sala/ e /falar-com-o-professor/, respeitando BASE_URL.
- [x] Cada card inteiro é um único acesso semântico por link, com ícone, título, descrição legível, foco visível e área de toque adequada.
- [x] A grade se adapta à largura disponível, sem forçar seis posições, criar sexto placeholder ou definir nova quantidade fixa de colunas pela imagem histórica.
- [x] Downloads não aparece e nenhuma rota global Downloads é criada.
- [x] Os cinco cards continuam disponíveis quando Turmas ou Matemática além da sala não possuem registros elegíveis.

### Acesso às turmas

- [x] A fonte é a coleção real turmas; a elegibilidade usa somente arquivada !== true, sem inferir atividade a partir de ano letivo ou calendário.
- [x] O agrupamento usa Segmento → Ano/Série, com Ensino Fundamental antes de Ensino Médio e anos/séries em ordem natural crescente.
- [x] A Home apresenta exatamente um acesso por combinação de segmento e ano/série que possua ao menos uma turma não arquivada.
- [x] Múltiplas turmas no mesmo ano/série não duplicam o acesso, e nenhum card individual de turma aparece diretamente na Home.
- [x] Grupos compostos exclusivamente por turmas arquivadas, anos/séries sem cadastro e segmentos sem grupos elegíveis são omitidos.
- [x] Com os dados reais atuais, a seção apresenta somente Ensino Médio → 1º ano.
- [x] Sem turma elegível, a seção inteira é omitida: sem título, mensagem vazia, placeholder, box vazio ou espaço reservado.
- [x] Cada acesso aponta para o respectivo agrupamento em /turmas/, com âncora exata no padrão turmas-{segmentoSlug}-{anoSerieSlug}.
- [x] Os dois slugs são derivados pela função central normalizeTurmaRouteSegment; a Home e /turmas/ compartilham a mesma regra, sem cópias, índice de renderização ou identificador persistido adicional.
- [x] O acesso de Ensino Médio → 1º ano resolve para /turmas/#turmas-ensino-medio-1o-ano, respeitando BASE_URL.
- [x] A inserção ou reordenação de outros grupos não altera as âncoras dos agrupamentos existentes.
- [x] /turmas/ conserva o contrato da DEC-095, inclusive as turmas arquivadas acessíveis; a exclusão da Home não remove nenhum acesso da página global.
- [x] Cenários sem turmas, com um agrupamento, com vários agrupamentos, com múltiplas turmas no mesmo grupo e com turmas arquivadas foram verificados.

### Novidades e Matemática além da sala

- [x] Novidades preserva o motor derivado e os contratos DEC-096/097/101, com estado exclusivo na precedência Destaque > Atenção > Novo, ordenação vigente e limite de seis aplicado depois da elegibilidade e ordenação.
- [x] A Home usa somente itens projetados pelo motor real, sem reproduzir os exemplos fictícios da imagem histórica, incluir Provas sem decisão própria ou duplicar cadastros.
- [x] Sem Novidades, o painel permanece com “Nenhuma novidade no momento.” em altura natural, sem cards, “Ver todas”, CTA, placeholder ou reserva da altura preenchida.
- [x] Com Novidades, cada item aponta para sua âncora estável em /novidades/ e “Ver todas” usa a rota canônica com BASE_URL.
- [x] A faixa Matemática além da sala ocupa a posição posterior a Acesso às turmas e preserva integralmente DEC-102/103.
- [x] A seleção editorial usa somente destaqueHome === true e arquivado !== true, ordena por publicação decrescente, título pt-BR e ID estável e limita a três sem preenchimento automático.
- [x] Com zero elegíveis, toda a faixa editorial é omitida, sem título, mensagem vazia, placeholder ou espaço reservado; com um, dois e três, somente a quantidade real é apresentada; com quatro ou mais, aparecem os três primeiros elegíveis.
- [x] A seleção da faixa continua independente de destaqueNovidades, sem retornar aos seis atalhos de categorias do mockup antigo.
- [x] Cards editoriais com e sem imagem e com títulos longos preservam leitura e ações em 1440 px, 834 px e 390 px nos casos aprovados anteriormente no protótipo; a imagem apresentada conserva proporção adequada. Não se afirma teste adicional de proporções inexistentes na Home real atual.
- [x] O risco de compressão do card compacto com imagem em 834 px, identificado por inspeção CSS no Passo 117, foi verificado na etapa autorizada de implementação/regressão; ele não foi corrigido ou declarado resolvido no Passo 118.

### Responsividade, acessibilidade e rodapé

- [x] A composição final foi comparada em 1440 px, 834 px e 390 px, usando a imagem histórica reconciliada com a documentação vigente.
- [x] A adaptação mantém a ordem das seções, os cinco cards com seus textos legíveis e a hierarquia Segmento → Ano/Série, sem inventar colunas fixas globais.
- [x] Títulos, descrições, nomes de segmento e ano/série quebram naturalmente, sem partir palavras arbitrariamente, cortar texto ou produzir overflow horizontal.
- [x] Links de cards, ação do hero e acessos por ano/série funcionam por teclado, têm foco visível, contraste e área de toque adequada.
- [x] Âncoras não ficam encobertas pelos elementos de navegação persistentes e funcionam com e sem prefixo de BASE_URL.
- [x] Estados condicionais reorganizam o fluxo sem gaps artificiais, boxes vazios ou alturas reservadas.
- [x] O Footer atual é preservado; redes sociais só recebem links após documentação de URLs oficiais, sem perfis inventados.
- [x] A aprovação humana do protótipo foi registrada antes da implementação no documento 09 v3.2; a aprovação da Home real foi registrada somente após a confirmação humana do Passo 122 neste Checklist v4.2, sem alterar novamente o registro de mockups.

### Evidência final — Home real

Aprovação visual humana informada pelo usuário em 12/10/2026:

- [x] Desktop de 1440 px, tablet de 834 px e mobile de 390 px aprovados na Home real.
- [x] Hero e navegação “Comece por aqui” → #acesso-rapido aprovados.
- [x] Novidades vazias aprovadas com “Nenhuma novidade no momento.”, em altura natural.
- [x] Exatamente cinco cards de Acesso rápido, na ordem e nos destinos da DEC-104, aprovados.
- [x] Acesso às turmas com Ensino Médio → 1º ano aprovado, sem anos/séries institucionais vazios.
- [x] Navegação /turmas/#turmas-ensino-medio-1o-ano aprovada; href e id semânticos compartilham a mesma geração estável.
- [x] Ausência integral da faixa Matemática além da sala com zero elegíveis aprovada, sem título, placeholder ou espaço reservado.
- [x] Correção do card compacto com imagem em 834 px já aprovada no protótipo e preservada exatamente na faixa 621–900 px.
- [x] Header, navegação global, frase institucional e Footer preservados.
- [x] Aprovação anterior dos estados padrão, atual, sem-turmas e robustez do protótipo preservada como evidência histórica; não substitui nem inventa conteúdo na coleção real.
- [x] Testes funcionais A–K, pureza, deduplicação, ordem natural, elegibilidade, estabilidade das âncoras e preservação da DEC-095 passaram no Passo 121.
- [x] Builds do Passo 121 passaram com 17 páginas, zero warnings e zero erros, normal e com BASE_URL, antes da remoção autorizada do protótipo.
- [x] DEC-104 preservada; nenhuma nova DEC criada.

### Evidência técnica de fechamento — Passo 122

Os resultados abaixo são preenchidos somente depois das verificações finais:

- [x] Rota temporária Site/src/pages/validacao-home-final.astro e suas fixtures removidas, sem remover componentes reais ou a referência PNG.
- [x] Auditoria sem resíduos demonstrativos da frente Home em rotas, componentes, utilitários, coleções e HTML construído.
- [x] Mockup Referencias/Mockups/home-v1-aprovada.png preservado apenas como referência de projeto, sem ser carregado ou copiado para assets públicos.
- [x] Build normal final: 16 páginas, zero warnings e zero erros.
- [x] Build final com /Matematica-Instrumental/: 16 páginas, zero warnings e zero erros; links, assets e âncoras validados.
- [x] HTTP final: todas as 16 rotas remanescentes retornam 200; /validacao-home-final/ e visão inválida de turma retornam 404.
- [x] git diff --check final sem erros de whitespace; nenhuma alteração fora da frente Home.

A rota técnica antiga /validacao-turma/, já presente no HEAD 997c22e, permanece fora do escopo. A auditoria não declara ausência absoluta de rotas ou referências históricas de validação no repositório. Nenhum commit, push, deploy ou criação de remote é autorizado por este fechamento; o checkpoint deverá aguardar autorização explícita para commit.

## Identidade
- [x] Logo oficial correta.
- [x] Foto oficial do professor quando prevista.
- [x] Paletas respeitadas.
- [x] Sem mistura arbitrária entre linhas.

## Layout
- [x] Fundo e boxes claramente distintos.
- [x] Fundo cinza coerente.
- [x] Boxes com superfícies/degradês discretos.
- [x] Menu abaixo do cabeçalho no desktop.
- [x] Boa hierarquia visual.
- [x] Página de turma comparada ao mockup específico aprovado, quando existir.

## Menus e navegação da turma
- [x] Menu principal permanece acessível durante a rolagem.
- [x] Menu interno da turma permanece acessível durante a rolagem.
- [x] Ordem correta: Início da turma | Cronogramas | Atividades e listas | Para estudar | Trabalhos | Materiais | Vídeos | Links.
- [x] Item atual do menu interno claramente identificado.
- [x] Menus fixos não encobrem conteúdo.
- [x] Navegação interna compacta e utilizável no celular.
- [x] Contexto Segmento → Ano/Série → Turma permanece claro.

## Ícones
- [x] Mesma família.
- [x] Profissionais.
- [x] Legíveis no celular.

## Responsividade
- [x] Desktop testado contra o mockup aprovado.
- [x] Tablet testado contra a referência aprovada de 834 px.
- [x] No tablet, menu principal 3 × 2 e menu interno 4 × 2 permanecem legíveis e utilizáveis.
- [x] No tablet, a frase institucional aparece em três linhas sem ultrapassar limites.
- [x] No tablet, o botão “Falar com o Professor” permanece no lado direito e aceita quebra controlada quando necessária.
- [x] Celular testado contra a referência aprovada de 390 px.
- [x] No celular, menu principal compacto está visível e utilizável.
- [x] No celular, o controle “Menu da turma” está visível, mostra o item atual e não deixa box vazio.
- [x] No celular, “Ver cronograma completo” permanece dentro do limite, com quebra de linha quando necessária.
- [x] Componentes reorganizados quando necessário.
- [x] Tabelas convertidas para apresentação adequada no celular quando necessário.

## Novidades
- [x] Novidades é derivada dos registros originais e não possui coleção ou cadastro duplicado.
- [x] Cada registro original gera no máximo um item, mesmo quando se aplica a várias turmas.
- [x] Conteúdo global pode participar sem turma.
- [x] Conteúdo com audiência de turmas participa somente quando alcança pelo menos uma turma não arquivada.
- [x] Conteúdo destinado exclusivamente a turmas arquivadas fica excluído, inclusive durante Destaque.
- [x] Cada item apresenta no máximo um estado entre Destaque, Atenção e Novo, nessa precedência.
- [x] Avisos preservam `prioridade`, `publicacao` e `validade`.
- [x] Atividade/Lista sem prazo e Para estudar sem `dataObjetivo` usam janela de Novo de sete dias.
- [x] Cronograma, Atividade/Lista com prazo, Para estudar com `dataObjetivo` e Trabalho usam `publicacao <= hoje < publicacao + 7 dias` para Novo.
- [x] O dia de `publicacao` é elegível como Novo e `publicacao + 7 dias` já está fora da janela.
- [x] Cronograma sem `publicacao` nunca recebe Novo e continua elegível para Atenção pela `dataPrazo`.
- [x] Materiais, Vídeos, Links e editorial sem data crítica usam janela de Novo de dez dias.
- [x] Cronograma, Atividade/Lista com prazo e Para estudar com `dataObjetivo` usam Atenção de D−7 a D e saem em D+1.
- [x] Trabalho usa Atenção de D−7 a D+1 e sai em D+2.
- [x] Oportunidades aplicam as janelas de inscrição e Realização somente a partir da coleção real implementada.
- [x] Item de Cronograma pode entrar como Atenção sem `publicacao`.
- [x] Coincidindo Novo e Atenção, somente Atenção é renderizado.
- [x] Coincidindo Destaque, Atenção e Novo, somente Destaque é renderizado.
- [x] O contrato de `destaqueNovidades` exige `inicio` e `fim`, não oferece ocultação e não supera a exclusão de turmas arquivadas.
- [x] Ordenação global usa estado; depois fim de Destaque, data crítica de Atenção ou publicação de Novo; e título pt-BR, fonte e ID como desempates.
- [x] A ordem física dos arquivos não interfere na ordenação.
- [x] A Home aplica o limite de seis somente depois de elegibilidade, estado e ordenação.
- [x] O painel desktop é compacto, tem altura controlada e usa rolagem interna somente quando necessária.
- [x] Tablet e mobile apresentam versões compactas, legíveis e sem overflow horizontal.
- [x] “Ver todas”, quando houver item, aponta para `/novidades/`.
- [x] `/novidades/` mostra todos os itens ativos, não exige entrada no menu e não mantém histórico próprio.
- [x] O item da Home aponta conceitualmente para o fragmento de sua chave estável na visão completa.
- [x] A visão completa oferece ações para as origens reais e não escolhe arbitrariamente uma turma quando houver várias.
- [x] Não existem páginas individuais de detalhe de Novidade.
- [x] Conteúdo expirado sai de Novidades sem ser apagado da área de origem.
- [x] Sem item ativo, o painel mostra somente “Nenhuma novidade no momento.”, sem cards, Ver todas, CTA ou placeholder.
- [x] Todos os cálculos usam datas civis em `America/Sao_Paulo` e são compatíveis com o rebuild diário.

## Turmas
- [x] Segmento → Ano/Série → Turma.
- [x] Fundamental e Médio diferenciados.
- [x] Nova turma não exige alterar páginas fixas.
- [x] Anos anteriores arquiváveis.
- [x] Não há rótulo público “ativa/inativa”.
- [x] Turma arquivada usa mensagem adequada de ano letivo encerrado.
- [x] Na página global, segmentos seguem a ordem institucional/documental vigente, sem ordenação alfabética conflitante.
- [x] Anos/séries seguem ordem natural crescente dentro do segmento, sem comparação puramente lexicográfica incorreta.
- [x] Dentro do mesmo ano/série, turmas não arquivadas aparecem antes das arquivadas.
- [x] Dentro de cada grupo de arquivamento, turmas usam `ordem` crescente e nome/título como desempate estável.
- [x] Turmas arquivadas permanecem no respectivo ano/série, continuam acessíveis e não formam seção global separada.
- [x] A linguagem de arquivamento é exatamente “Turma arquivada — ano letivo encerrado”.
- [x] Cada turma leva à respectiva rota canônica com respeito ao `BASE_URL`.
- [x] Sem turmas disponíveis, Header, menu global, título Turmas e Footer permanecem, e aparece somente “Nenhuma turma disponível no momento.” após o título.
- [x] O estado vazio global não mostra cards vazios, filtros, CTA, cadastro, matrícula ou mensagem de erro.

## Início da turma
- [x] Identificação da turma visível.
- [x] Avisos da turma visíveis quando existirem.
- [x] Próximos compromissos resumidos.
- [x] Resumos de Atividades, Para estudar, Trabalhos, Materiais, Vídeos e Links.
- [x] Falar com o professor disponível.
- [x] Ausência de conteúdo opcional não produz boxes vazios desnecessários.

## Cronogramas
- [x] Regime bimestral, trimestral e semestral suportado.
- [x] Quantidade correta de períodos: 4, 3 ou 2.
- [x] Todos os períodos aparecem no seletor da mesma área e exatamente um período é selecionado: o corrente quando existir; o primeiro cronológico antes do primeiro; o próximo cronológico entre períodos; e o último cronológico depois do último.
- [x] Período corrente derivado corretamente por data inicial ≤ hoje ≤ data final no timezone `America/Sao_Paulo`.
- [x] Nenhum campo persistido de período atual ou situação manual é usado.
- [x] Período selecionado recebe o destaque aprovado; somente o período realmente corrente recebe a identificação “Período atual” e `aria-current`, sem converter uma seleção fora do intervalo em período corrente.
- [x] Total da etapa do período selecionado aparece separado dos itens.
- [x] Tabela usa exatamente Data/Prazo | Tipo | Descrição/Conteúdo | Valor e apresenta os itens do período selecionado.
- [x] Descrição/Conteúdo recebe a maior largura no desktop.
- [x] Desktop de 1440 px corresponde ao protótipo aprovado.
- [x] Tablet de 834 px preserva as quatro colunas sem rolagem horizontal.
- [x] Mobile de 390 px apresenta seletor sem rolagem horizontal.
- [x] Seletor mobile comporta regimes com dois, três ou quatro períodos.
- [x] No mobile, cada item vira bloco vertical com Data/Prazo e Valor no topo, Tipo abaixo e Descrição/Conteúdo na sequência.
- [x] Item de Cronograma só é considerado passado quando sua data/prazo é anterior a hoje no timezone oficial.
- [x] Item com data/prazo igual ou posterior a hoje mantém aparência normal.
- [x] Item passado permanece acessível.
- [x] Data/Prazo, Tipo e Descrição/Conteúdo de item passado recebem simultaneamente atenuação visual e texto riscado.
- [x] Valor de item passado permanece visível, conserva o valor original e não recebe texto riscado.
- [x] Total da etapa corresponde à soma dos valores de todos os itens do período selecionado que possuam valor.
- [x] Estado temporal não remove nem zera valor e não exclui item passado da soma.
- [x] Item sem valor não exibe zero inventado e não participa da soma.
- [x] Item passado não usa ícone de concluído, checkbox, badge “Passado”, cor de erro nem fundo vermelho.
- [x] Sem campo manual de situação.
- [x] Sem notas individuais.
- [x] Sem pontos previstos/distribuídos, saldo, média ou desempenho.
- [ ] Edição somente no ambiente de manutenção/CMS.
- [x] Componente reutilizável não contém fixtures.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `CronogramasView.astro`.
- [x] Rota real usa somente registros das coleções aprovadas.
- [x] Sem dados reais suficientes, a rota preserva o contexto da turma e não exibe seletor, tabela, mensagem vazia ou placeholder inventados.

## Atividades e listas
- [x] Listagem única da publicação mais recente para a mais antiga.
- [x] Empates de publicação usam título crescente no locale pt-BR, sem novo campo persistido.
- [x] Lista completa visível sem filtro.
- [x] Os únicos filtros visuais são Busca, Assunto e Tipo.
- [x] Filtros permanecem sem interatividade definitiva nesta etapa.
- [x] Sem JavaScript, busca real, `onchange`, filtragem client-side, query string, botão de limpar ou contador.
- [x] Tipos Atividade e Lista de exercícios suportados.
- [x] Prazo permanece opcional no modelo de conteúdo.
- [x] Assunto, Publicação e Prazo aparecem em todos os registros.
- [x] Prazo ausente é exibido exatamente como `-`.
- [x] Desktop de 1440 px mantém título e os três metadados na mesma faixa horizontal.
- [x] No desktop, o grupo de metadados usa três colunas regulares, com rótulo e valor no mesmo eixo central.
- [x] Tablet de 834 px mantém título e os três metadados na mesma faixa horizontal, sem overflow, sobreposição ou corte.
- [x] No tablet, o grupo de metadados usa três colunas regulares, com rótulo e valor no mesmo eixo central.
- [x] No desktop e no tablet, Funções, Hoje, 20 ago, 26 ago e `-` ficam centralizados sob seus respectivos rótulos.
- [x] No desktop e no tablet, as larguras das colunas não são determinadas apenas pelo conteúdo.
- [x] Mobile de 390 px mostra o título em linha própria e os três metadados na linha abaixo.
- [x] No mobile, Assunto, Publicação e Prazo ocupam três colunas iguais de exatamente um terço da largura disponível cada.
- [x] No mobile, a largura das colunas independe do comprimento do conteúdo.
- [x] No mobile, cada bloco ocupa integralmente sua coluna.
- [x] No mobile, rótulos e valores estão centralizados horizontalmente em suas respectivas colunas.
- [x] No mobile, o hífen do prazo ausente está centralizado no terço de Prazo.
- [x] No mobile, Prazo não recebe alinhamento lateral diferente dos demais metadados.
- [x] Desktop de 1440 px e tablet de 834 px preservam a composição horizontal aprovada pela DEC-085.
- [x] Descrição opcional aparece abaixo do cabeçalho como texto corrido, sem box interno.
- [x] Ausência de descrição não renderiza nem reserva espaço.
- [x] Múltiplos Recursos vinculados são suportados como links independentes.
- [x] Recursos mostram somente o nome, nunca a URL em texto bruto.
- [x] Múltiplos recursos têm espaçamento claro e quebra natural, sem card individual.
- [x] Gabarito/resolução opcional.
- [x] Ausência de gabarito não gera campo vazio.
- [x] “GABARITO / RESOLUÇÃO” usa exatamente o mesmo tratamento visual de “RECURSOS” e não é link.
- [x] Sem data de liberação, Recursos de Gabarito/Resolução existentes são apresentados como links.
- [x] Antes da data de liberação, links e nomes dos recursos não são fornecidos à apresentação.
- [x] Antes da data, mostrar somente `Disponível em {data formatada}` como texto secundário legível.
- [x] O estado programado não usa cadeado, ícone, botão desabilitado, campo cinza, status, badge, alerta, cor verde/vermelha, texto de bloqueio/indisponibilidade nem contagem regressiva.
- [x] Na própria data de liberação, os Recursos de Gabarito/Resolução passam a ser apresentados como links.
- [x] Disponibilidade é derivada com a noção central de hoje em `America/Sao_Paulo`, sem booleano ou status persistido.
- [x] Datas visuais seguem o padrão aprovado: Hoje, 20 ago, 26 ago, 27 ago.
- [x] Componente reutilizável recebe dados por propriedades e não contém fixtures.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `ActivitiesListsView.astro`.
- [x] Rota real usa somente registros da coleção da turma.
- [x] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.
- [x] Vídeos relacionados não são renderizados nem recebem placeholder nesta etapa.
- [x] Conteúdo permanece acessível após o prazo.

## Para estudar
- [x] `titulo` e `objetivo` permanecem campos distintos e obrigatórios.
- [x] Título é o elemento principal do registro.
- [x] Objetivo aparece abaixo do cabeçalho, precedido pelo rótulo visual `OBJETIVO`.
- [x] Objetivo tem destaque maior que o resumo/orientação e permanece subordinado ao título.
- [x] Objetivo não usa badge, fundo próprio, ícone nem aparência de status.
- [x] `tipoObjetivo` permanece no modelo e não é renderizado.
- [x] Nenhuma taxonomia ou tratamento visual de `tipoObjetivo` foi inventado.
- [x] Listagem usa `publicacao` decrescente e título crescente no locale pt-BR como desempate.
- [x] Os únicos filtros visuais são Busca e Assunto.
- [x] Filtros permanecem sem JavaScript, busca real, query string, botão de limpar, contador ou estado de nenhum resultado nesta etapa.
- [x] Desktop de 1440 px mantém título e metadados na mesma faixa horizontal.
- [x] Tablet de 834 px mantém título e metadados na mesma faixa horizontal, sem sobreposição ou overflow.
- [x] Assunto e Publicação aparecem em todos os registros.
- [x] `dataObjetivo` permanece opcional.
- [x] Quando `dataObjetivo` existe, seu rótulo visual é exatamente `DATA`.
- [x] O nome técnico permanece `dataObjetivo`.
- [x] Ausência de `dataObjetivo` não mostra placeholder, hífen nem espaço reservado.
- [x] No mobile de 390 px, o cabeçalho usa fluxo vertical próprio e não conserva o grid horizontal de desktop.
- [x] No mobile, o título ocupa faixa exclusiva de 100% e nenhum metadado compartilha essa faixa.
- [x] Metadados começam somente depois do término completo do título.
- [x] No mobile com data, Assunto, Publicação e Data usam três colunas iguais.
- [x] No mobile sem data, Assunto e Publicação usam duas colunas iguais, sem terceira coluna residual.
- [x] Rótulo e valor de cada metadado compartilham o mesmo eixo central.
- [x] Valores longos quebram somente dentro da própria coluna e não invadem o título, outra coluna ou borda.
- [x] O mobile não usa margem negativa, transform, posicionamento absoluto ou compensação por conteúdo.
- [x] `resumoOrientacao` aparece abaixo do Objetivo como texto corrido, sem card interno.
- [x] Múltiplos Recursos vinculados são apresentados apenas pelo nome como links independentes.
- [x] URLs não aparecem em texto bruto e Recursos não recebem cards individuais.
- [x] Leituras relacionadas opcionais usam a mesma linguagem visual de Recursos.
- [x] Ausência de Leituras relacionadas não renderiza nem reserva espaço.
- [x] Vídeos relacionados permanecem nos dados, mas não são renderizados nem recebem placeholder.
- [x] Sem prazo manual ou situação persistida.
- [x] Registro permanece normal durante toda a própria data do objetivo.
- [x] Atenuação ocorre automaticamente somente no dia seguinte, usando a noção central de hoje em `America/Sao_Paulo`.
- [x] Registro atenuado permanece legível, acessível e com links funcionais.
- [x] Registro atenuado não usa tachado, checkbox, ícone de conclusão, badge ou status manual.
- [x] Componente reutilizável recebe dados por propriedades, não contém fixtures e não calcula a regra temporal.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `StudyView.astro`.
- [x] Rota real usa somente registros da coleção da turma.
- [x] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, listagem, mensagem vazia, placeholder ou fixture.

## Trabalhos
- [x] Visão completa corresponde às referências aprovadas de 1440 px, 834 px e 390 px.
- [x] Listagem usa uma única coluna e ordena por `publicacao` decrescente, com `titulo` crescente no locale pt-BR como desempate.
- [x] `titulo` obrigatório é o elemento visual dominante e não usa fallback “Sem título”.
- [x] Somente Busca e Assunto aparecem como filtros visuais nesta etapa, sem JavaScript ou filtragem funcional.
- [x] Assunto, Publicação e Entrega são os únicos metadados apresentados.
- [x] O rótulo visual temporal é sempre `ENTREGA`, inclusive quando o valor técnico de `marco.tipo` é Apresentação.
- [x] `APRESENTAÇÃO` não é renderizado e o valor técnico original de `marco.tipo` continua preservado nos dados.
- [x] Cada registro conserva exatamente um `marco` obrigatório `{ tipo, data }`, sem alteração do enum Entrega | Apresentação.
- [x] No desktop e no tablet, título e os três metadados permanecem na mesma faixa horizontal, sem overflow ou sobreposição.
- [x] No mobile, o título ocupa faixa própria e os metadados usam `minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)`.
- [x] Rótulo e valor de cada metadado estão centralizados no mesmo eixo.
- [x] Valores mobile usam `overflow-wrap: normal` e `word-break: normal`, sem quebra arbitrária interna de palavras.
- [x] `descricao` opcional aparece em texto corrido quando presente e não deixa placeholder nem espaço quando ausente.
- [x] `DOCUMENTO DO TRABALHO` apresenta exatamente um Recurso vinculado obrigatório pelo nome, nunca pela URL bruta.
- [x] `RECURSOS ADICIONAIS` aceita uma ou mais entradas, aparece somente quando houver conteúdo e mostra links independentes pelo nome.
- [x] Documento e recursos não recebem cards internos e mantêm boa área de clique e toque.
- [x] `tags` permanece no modelo e nos dados, mas não é renderizado.
- [x] A atenuação é derivada somente quando hoje for posterior a `marco.data`, usando a noção central de hoje em `America/Sao_Paulo`.
- [x] No próprio dia de `marco.data`, o registro permanece normal.
- [x] Registro atenuado continua legível, acessível e com links funcionais, sem tachado, checkbox, badge, status textual ou ícone.
- [x] Não existem pontuação, nota, média, progresso, formulário, botão Entregar, upload, confirmação de envio ou etapas.
- [x] Componente reutilizável recebe dados por propriedades, não contém fixtures e não calcula a regra temporal.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `WorksView.astro`; os valores técnicos de `marco.tipo` permanecem preservados.
- [x] Rota real usa somente registros da coleção da turma.
- [x] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.

## Materiais
- [x] Visão completa corresponde às referências aprovadas de 1440 px, 834 px e 390 px.
- [x] Acervo usa listagem em uma única coluna, com separações discretas e sem mosaico, sidebar ou cards internos.
- [x] Um registro corresponde a um único Material e exatamente um arquivo/link.
- [x] `titulo` é o elemento visual dominante.
- [x] `tipo` aparece como metadado textual secundário, sem enum visual, cor por tipo ou aparência de status.
- [x] Os únicos filtros visuais são Busca, Área, Subárea, Conteúdo e Tipo.
- [x] Filtros permanecem sem JavaScript, busca real, filtragem, dependência dinâmica, query string, botão de limpar, contador ou estado de nenhum resultado.
- [x] No desktop de 1440 px, os cinco filtros aparecem na mesma faixa.
- [x] No tablet de 834 px, Busca ocupa a largura total e Área, Subárea, Conteúdo e Tipo formam grade 2 × 2.
- [x] No mobile de 390 px, filtros são empilhados, título ocupa faixa própria e Tipo aparece abaixo.
- [x] `arquivoLink` contém exatamente um Recurso vinculado obrigatório.
- [x] A interface mostra o rótulo `ARQUIVO / LINK` e somente o nome do recurso como link, nunca a URL bruta.
- [x] O link possui boa área de clique e toque e não usa card interno.
- [x] Cada classificação apresenta exatamente Área → Subárea → Conteúdo como cadeia tipográfica discreta.
- [x] Classificações não usam badges coloridos, botões ou cards internos.
- [x] Múltiplas classificações permanecem dentro do mesmo Material sem repetir título, Tipo ou arquivo/link.
- [x] Cadeias quebram naturalmente no mobile sem partir palavras arbitrariamente nem gerar overflow horizontal.
- [x] `descricao` opcional aparece como texto corrido quando presente e não gera placeholder nem espaço quando ausente.
- [x] `publicacao` permanece nos dados e não é renderizada nem gera temporalidade.
- [x] `tags` permanece nos dados e não é renderizado.
- [x] Dentro do mesmo Conteúdo, Materiais mais recentemente publicados têm prioridade.
- [x] Nenhuma nova regra global de ordenação entre Conteúdos diferentes foi criada.
- [x] Materiais não possuem prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação ou progresso.
- [x] Componente reutilizável recebe dados por propriedades e não contém fixtures.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `MaterialsView.astro`.
- [x] Rota real usa somente registros da coleção da turma e não duplica Material por classificação.
- [x] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.

## Conteúdo geral
- [ ] Filtros funcionando conforme cada área.
- [ ] Busca funcionando onde prevista.
- [ ] Links do Drive funcionando.
- [x] Informações opcionais ausentes não geram elementos vazios, exceto o Prazo de Atividades e listas, que permanece visível com `-` quando ausente.

## Vídeos
- [x] Biblioteca reutilizável.
- [x] Ordenação por `publicacao` decrescente e, em empate, `titulo` crescente no locale pt-BR.
- [x] Nenhuma ordenação por prioridade, duração ou provedor.
- [x] Filtros visuais exatamente de Busca, Área, Subárea, Conteúdo e Prioridade.
- [x] Filtros sem JavaScript, busca real, filtragem, query string, dependência dinâmica, contador ou estado de nenhum resultado.
- [x] Miniatura alimentada por `miniaturaUrl`, preservada em 16:9 e sem distorção.
- [x] Duração formatada pelo helper existente a partir de `duracaoSegundos`.
- [x] Duração facilmente localizada sobre a miniatura e sem barra de progresso.
- [x] Prioridade Essencial/Recomendado/Complementar como informação textual neutra.
- [x] Prioridade sem aparência de status, alerta, urgência ou conclusão.
- [x] Título dominante e descrição secundária em texto corrido, sem card interno.
- [x] Classificação Área → Subárea → Conteúdo como cadeia tipográfica discreta.
- [x] Múltiplas classificações dentro do mesmo card, sem duplicar miniatura, título, descrição ou URL.
- [x] `provedor` e `tags` preservados nos dados e não renderizados.
- [x] Ação com rótulo exato `Ver vídeo`.
- [x] Na rota real, ação abre a URL do vídeo como link externo simples com boas práticas de segurança.
- [x] Sem modal, player, iframe, autoplay, tela cheia interna, controles de reprodução ou barra de progresso.
- [x] Sem prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação, nota ou progresso.
- [x] Desktop de 1440 px com cinco filtros na mesma faixa e biblioteca em duas colunas.
- [x] Tablet de 834 px com Busca em largura total, demais filtros em grade 2 × 2 e cards horizontais em uma coluna.
- [x] Mobile de 390 px com filtros e cards empilhados, miniatura 16:9 e ação com boa área de toque.
- [x] Nenhum breakpoint apresenta distorção, sobreposição ou overflow horizontal.
- [x] Componente reutilizável recebe dados por propriedades e não contém fixtures.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `VideosView.astro`.
- [x] Rota real usa apenas os registros da coleção de Vídeos da turma.
- [x] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, cards, mensagem vazia, placeholder ou fixture.

## Links
- [x] Links representam recursos externos, não arquivos de Materiais ou Vídeos.
- [x] Dados usam somente `id`, `titulo`, `descricao`, `url`, `finalidade`, `tipo`, `acesso` opcional, `classificacoes` opcionais, `publicacao`, `segmento`, `anoSerie` opcional, `turmas` opcional, `observacaoProfessor` opcional e `tags` opcionais.
- [x] Registros agrupados exclusivamente por `finalidade`.
- [x] Grupos ordenados pelo nome da finalidade e itens por `titulo`, ambos alfabeticamente no locale pt-BR.
- [x] Nenhum agrupamento ou ordenação por `publicacao`, `acesso`, `tipo` ou classificação.
- [x] Nenhum filtro, busca, ordenação visual, botão de limpar, contador ou estado de nenhum resultado.
- [x] Título da visão exatamente `Links`.
- [x] Cada grupo apresenta `FINALIDADE` e o nome da finalidade.
- [x] Cada item apresenta tipo secundário, título dominante, descrição em texto corrido e ação `Acessar`.
- [x] URL bruta e logo não aparecem.
- [x] `acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` permanecem nos dados e não são renderizados.
- [x] Ação real abre a URL externa em nova aba com `rel="noopener noreferrer"` e ícone externo.
- [x] Nenhum modal, iframe, incorporação ou rastreamento.
- [x] Sem prazo, vencimento, status, ativo/inativo, dificuldade, pontuação ou progresso.
- [x] Desktop de 1440 px com grupos em duas colunas e ação lateral.
- [x] Tablet de 834 px com grupos em uma coluna e nenhum overflow horizontal.
- [x] Mobile de 390 px com fluxo vertical, ação em boa área de toque e nenhum overflow horizontal.
- [x] Componente reutilizável recebe os grupos por propriedades e não contém fixtures.
- [x] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `LinksView.astro`.
- [x] Rota real usa apenas registros da coleção `links` aplicáveis à turma.
- [x] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, grupos, mensagem vazia, placeholder ou fixture.

## Matemática além da sala
- [x] Mockup aprovado em 1440 px, 834 px e 390 px nos estados padrão, filtrado, nenhum resultado e vazio.
- [x] Uma única coleção real representa as nove categorias fechadas da DEC-102.
- [x] “Curiosidade / Divulgação” não aparece como categoria adicional; Cultura e Tecnologia não são categorias.
- [x] A página é uma listagem global em cards, sem rota individual de detalhe.
- [x] Ordenação usa publicação decrescente, título pt-BR e ID estável, sem depender da ordem dos arquivos.
- [x] Os únicos filtros são Busca e Categoria, combinados por lógica E.
- [x] Busca ignora caixa e acentos e cobre todos os campos definidos na DEC-102.
- [x] **Limpar filtros** aparece somente com estado ativo.
- [x] Estado vazio mostra exatamente “Nenhum conteúdo disponível no momento.”, sem filtros ou cards.
- [x] Nenhum resultado mostra exatamente “Nenhum conteúdo corresponde aos filtros selecionados.” e preserva filtros.
- [x] Cada card possui no máximo uma ação principal real com um dos quatro rótulos aprovados.
- [x] Ausência de imagem ou ação não gera placeholder, botão desabilitado nem espaço obrigatório.
- [x] Imagens locais possuem texto alternativo, crédito e direito documentados; não há hotlink, raspagem ou cópia não autorizada.
- [x] Conteúdo de Curadoria possui uma ou mais fontes; conteúdo Autoral identifica autoria.
- [x] Vídeos e Links pedagógicos permanecem coleções independentes e não são mesclados automaticamente.
- [x] Não existem prazo, Atenção, dificuldade, pontuação, progresso ou associação a Turma.
- [x] `arquivado` exclui manualmente o registro da página, Home e Novidades sem exclusão da fonte nem expiração automática.
- [x] Novidades usa Novo por dez dias, Destaque inclusivo, precedência Destaque > Novo e no máximo um item por registro.
- [x] Destaque da Home é independente de Novidades, usa somente `destaqueHome: true` e limita a três registros sem preenchimento automático.
- [x] Desktop usa duas colunas; tablet e mobile usam uma coluna, sem overflow horizontal.
- [x] Foco, contraste, hierarquia, leitura e áreas de toque permanecem acessíveis.
- [x] Durante a regressão, o protótipo manteve fixtures exclusivamente na rota temporária, usou ilustrações CSS e apenas destinos `example.invalid`.
- [x] Rota real, Home, `novidades.ts`, `src/content.config.ts`, coleções e schemas não foram alterados na etapa de protótipo.
- [x] Aprovação visual foi registrada no `09-MOCKUPS-APROVADOS-v3.0.md` antes do fechamento da implementação real.
- [x] Protótipo temporário e seis fixtures demonstrativas removidos após a aprovação final.

### Evidência final — Matemática além da sala
Regressão visual final aprovada em 27/09/2026:

- [x] Rota real, estado vazio, Busca, Categoria, combinação em lógica E e limpeza de filtros validados.
- [x] Home validada conforme a DEC-103 para zero, um, dois, três e quatro ou mais elegíveis, sem preenchimento automático.
- [x] Integração com Novidades validada para Novo de dez dias, Destaque inclusivo, precedência, arquivamento, unicidade, chave e destino.
- [x] Direitos e imagens auditados: nenhum ativo externo baixado, hotlink não autorizado, texto de terceiro ou dado pessoal incorporado.
- [x] Coleção real preservada vazia somente com `.gitkeep`, sem YAML fictício.
- [x] Protótipo e fixtures removidos; rota real e componentes reutilizáveis passam a ser a referência técnica vigente.
- [x] Builds normal e com `BASE_URL` validados com 16 páginas, zero warnings e zero erros.

## Provas e Resoluções
- [x] Mockup aprovado em 1440 px, 834 px e 390 px nos estados padrão, filtrado, nenhum resultado e vazio.
- [x] Acervo global distinto de provas internas de Turma e de Oportunidades e Datas.
- [x] Coleção real contém somente os campos obrigatórios e opcionais da DEC-100 e inicia sem conteúdo.
- [x] Prova é obrigatória e Resolução é opcional; ausência de resolução não gera botão, placeholder ou estado desabilitado.
- [x] Segmento, Ano/Série, Tipo e Dificuldade respeitam as taxonomias aprovadas e a relação Segmento/Ano-Série é validada.
- [x] Listagem usa a ordenação determinística da DEC-100, sem depender da ordem dos arquivos.
- [x] Não existe página individual de detalhe.
- [x] Filtros funcionais: Busca, Segmento, Ano/Série, Instituição, Ano, Tipo, Fase, Assunto e Dificuldade quando aplicável.
- [x] Estado inicial usa Todos e busca vazia; filtros combinam por lógica E.
- [x] Ano/Série depende de Segmento e valor incompatível é removido.
- [x] Limpar filtros aparece somente com busca ou filtro ativo e restaura todos os resultados.
- [x] Acervo vazio mostra exatamente “Nenhuma prova ou resolução disponível no momento.”, sem filtros ou cards fictícios.
- [x] Nenhum resultado mostra exatamente “Nenhuma prova ou resolução corresponde aos filtros selecionados.”, preserva controles e permite recuperação imediata.
- [x] Ver prova aparece somente com destino obrigatório válido; Ver resolução somente quando existir recurso válido.
- [x] Links externos usam nova aba e `rel="noopener noreferrer"`; links internos respeitam `BASE_URL`.
- [x] Fonte oficial e condição de uso seguem a DEC-100; nenhum material de terceiros foi copiado ao repositório.
- [x] Durante a regressão, rota real e protótipo reutilizaram os mesmos componentes sem fixtures internas.
- [x] Protótipo e todas as fixtures demonstrativas foram removidos após a aprovação final.
- [x] Foco visível, contagem compreensível, região dinâmica apropriada e navegação por teclado permanecem funcionais.
- [x] Aprovação visual registrada antes da implementação do schema, coleção e filtros reais.
- [x] Rota real `/provas-e-resolucoes/` carrega a coleção e apresenta o estado vazio enquanto não houver registros.
- [x] Protótipo aprovado registrado no documento 09 e mantido temporariamente para regressão.
- [x] CMS, conteúdo acadêmico real, página de detalhe e coleção separada de resoluções não foram criados.

### Evidência final — Provas e Resoluções
Regressão visual final aprovada em 20/09/2026:

- [x] Desktop de 1440 px, tablet de 834 px e mobile de 390 px aprovados.
- [x] Estados padrão, filtrado, nenhum resultado e vazio aprovados.
- [x] Prova com resolução e prova sem resolução aprovadas.
- [x] Filtros funcionais e estado vazio real validados.
- [x] Referência visual preservada no `09-MOCKUPS-APROVADOS-v2.8.md`.
- [x] Rota temporária e fixtures demonstrativas removidas após a validação.

## Oportunidades e Datas
- [x] Categorias restritas a ENEM, Vestibular, CEFET/Instituto Federal, Processo seriado, Concurso, Olimpíada e Evento.
- [x] Marcos usam somente Abertura de inscrições, Encerramento de inscrições, Realização e Divulgação de resultado.
- [x] Abertura e Encerramento aparecem juntas, em ordem válida; múltiplas Realizações são permitidas; Resultado não precede a última Realização.
- [x] Encerramento de inscrições e Realização são as únicas datas críticas de Atenção.
- [x] Situação é derivada em `America/Sao_Paulo`, sem atualização manual diária.
- [x] Situações seguem as condições e a precedência da DEC-101.
- [x] Novo usa `publicacao <= hoje < publicacao + 7 dias`, independentemente da categoria.
- [x] Atenção usa D−7 a D+1, inclusive, e sai em D+2.
- [x] Destaque usa `destaqueNovidades` inclusivo e não altera datas reais.
- [x] Sobreposição respeita Destaque > Atenção > Novo e produz no máximo uma Novidade por registro.
- [x] Itens encerrados permanecem até 90 dias após o último marco e saem em D+91.
- [x] Ordenação coloca itens ativos pelo próximo marco e Encerrados depois, pelo último marco decrescente, com desempates determinísticos.
- [x] Busca, Categoria, Situação, Ano, Segmento, Ano/Série e Instituição são os únicos filtros implementados.
- [x] Filtros usam lógica E; busca ignora caixa e acentos; Segmento restringe Ano/Série.
- [x] **Limpar filtros** aparece somente com estado ativo.
- [x] Item global e item direcionado por Segmento/Ano-Série são representados sem associação arbitrária a Turma.
- [x] **Ver oportunidade**, **Inscrever-se**, **Ver regulamento** e **Ver resultado** só aparecem quando suas condições e URLs reais forem satisfeitas.
- [x] Não existem botão desabilitado, placeholder de ação ou página individual de detalhe.
- [x] Estado vazio mostra exatamente “Nenhuma oportunidade ou data disponível no momento.”, sem filtros ou cards.
- [x] Nenhum resultado mostra exatamente “Nenhuma oportunidade corresponde aos filtros selecionados.” e preserva filtros e limpeza.
- [x] Fonte e link oficial são válidos; materiais de terceiros não são copiados sem autorização.
- [x] Durante a validação, o protótipo usou somente fixtures fictícias locais e ofereceu padrão, vazio, filtrado e nenhum resultado pelos mesmos componentes da rota real; rota e fixtures temporárias foram removidas no fechamento.
- [x] Desktop 1440 px, tablet 834 px e mobile 390 px preservam hierarquia, foco, contraste, toque e ausência de overflow.
- [x] Rota real usa a coleção e o schema definitivos; a coleção vazia produz somente o estado vazio aprovado.
- [x] O mockup aprovado está registrado no `09-MOCKUPS-APROVADOS-v2.9.md`.

### Evidência final — Oportunidades e Datas
- [x] Mockup aprovado nos breakpoints de 1440 px, 834 px e 390 px e nos estados padrão, filtrado, nenhum resultado e vazio.
- [x] Coleção `oportunidades` criada vazia, sem fixture ou conteúdo real fictício.
- [x] Schema, cálculo temporal, retenção, ordenação, busca, filtros e ações implementados conforme a DEC-101.
- [x] Oportunidades integradas a Novidades com chave e destino estáveis e no máximo um item por registro.
- [x] Implementação real aprovada na regressão, incluindo todas as situações temporais, filtros funcionais e estado vazio real.
- [x] Integração com Novidades validada para Novo, Atenção, Destaque, precedência, não duplicação e destino canônico.
- [x] Protótipo temporário e fixtures demonstrativas removidos após a validação; o portal voltou a gerar 16 páginas.

## Comunicação
- [x] Acesso originado de uma turma reconhecida usa automaticamente o `slug` recebido no parâmetro `turma`.
- [x] O parâmetro de turma é resolvido contra a coleção real e texto arbitrário da query não é enviado como identificador.
- [x] Com turma reconhecida, o valor técnico é `turma.slug` e a apresentação somente leitura usa `anoSerie — nome`.
- [x] Sem turma reconhecida, o valor técnico é `contato-geral` e a apresentação é exatamente “Não se aplica / contato geral”.
- [x] A chamada-resumo não exibe texto redundante de identificação automática da turma.
- [x] Nome obrigatório.
- [x] E-mail obrigatório.
- [x] Motivo obrigatório.
- [x] Mensagem obrigatória.
- [x] O botão usa exatamente “Enviar mensagem”, é semântico, funciona por teclado e possui foco visível.
- [x] No estado enviando, o botão fica desabilitado e aparece exatamente “Enviando mensagem…”.
- [x] No estado de sucesso, aparece exatamente “Mensagem enviada com sucesso.”.
- [x] No estado de erro, aparece exatamente “Não foi possível enviar a mensagem. Tente novamente.” e uma nova tentativa é possível.
- [x] Sucesso não redireciona automaticamente e não reapresenta Nome, E-mail, Motivo ou Mensagem.
- [x] A rota real envia diretamente por AJAX ao endpoint público aprovado `https://formspree.io/f/xkjgjoqv`, com método `POST`, `Accept: application/json` e sem redirecionamento.
- [x] A configuração centraliza somente o endpoint público do Formspree e valores técnicos controlados, sem segredo, token, `FORM_ACTION_URL` ou conceitos `ENTRY_...`.
- [x] Validação HTML nativa inválida impede qualquer transporte.
- [x] O payload contém somente `name`, `email`, `motivo`, `message`, `turma`, `subject` e `_gotcha`.
- [x] `subject` usa exatamente “Mensagem pelo portal Matemática Instrumental”; `_gotcha` permanece vazio.
- [x] No envio, o botão fica desabilitado, submissões duplicadas são impedidas e o formulário recebe `aria-busy`.
- [x] Sucesso somente ocorre quando `response.ok`; Nome, E-mail, Motivo e Mensagem são limpos, Turma é preservada e os dados enviados não são reapresentados.
- [x] Falha de rede, resposta HTTP não aceita ou erro informado pelo Formspree preserva os valores, reabilita o botão e permite nova tentativa sem expor detalhe interno.
- [x] Formshield está ativo; CAPTCHA visual está desabilitado; `_gotcha` está visualmente oculto, fora do teclado e não é anunciado.
- [x] **Restrict to Domain** — N/A: indisponível no plano gratuito do Formspree (DEC-106); proteção por Formshield e `_gotcha`.
- [x] A orientação mostra exatamente “Comunicação privada. Os dados deste formulário são enviados pelo Formspree para encaminhamento da mensagem ao professor.”.
- [x] A nota mostra exatamente “Nome, e-mail, motivo e mensagem não são colocados na URL nem armazenados pelo site. O Formspree processa e pode armazenar a submissão para realizar o envio.”.
- [x] Nada publicado no site.
- [x] Dados pessoais fora do GitHub.
- [x] Nome, E-mail, Motivo e Mensagem não aparecem em URL ou query string.
- [x] Nenhuma mensagem é persistida pelo site em conteúdo estático, `localStorage`, `sessionStorage`, IndexedDB ou cookies; o Formspree processa e pode arquivar a submissão externamente.
- [x] Sem analytics, logs deliberados de dados pessoais ou rastreamento do formulário nesta etapa.
- [x] Sem upload de arquivos por alunos ou visitantes.
- [x] Formulário validado em 1440 px, 834 px e 390 px, sem overflow horizontal.
- [x] Labels, inputs, textarea, botão e mensagens preservam contraste, espaçamento e navegação por teclado.
- [x] Mensagens de enviando e sucesso são anunciadas como status e erro é anunciado como alerta.
- [x] Mockup de Falar com o Professor aprovado e registrado para 1440 px, 834 px e 390 px, nos quatro estados e nos contextos com e sem turma.
- [x] A rota real reutiliza os componentes aprovados e não mantém implementação visual independente.
- [x] A regra de resolução da turma está centralizada e é usada pela rota real.
- [x] O protótipo temporário cumpriu sua função, foi removido após o teste manual real aprovado e não é dependência técnica vigente.

### Evidência final — teste manual real do contato
Validação concluída em ambiente local em 20/09/2026, sem registrar os dados pessoais utilizados no teste:

- [x] Transporte real ao Formspree confirmado.
- [x] Estado visual de sucesso confirmado após resposta real válida.
- [x] Caminho de erro previsto confirmado por inspeção e teste local controlado, sem nova submissão externa.
- [x] Dados pessoais permanecem fora do GitHub e do conteúdo estático.
- [x] Turma automática envia o `slug` válido.
- [x] Acesso sem turma envia `contato-geral`.
- [x] Nenhuma informação pessoal é colocada na URL.
- [x] O código do site não persiste a mensagem em `localStorage`, `sessionStorage`, IndexedDB ou cookies.
- [x] Submissões e notificações por e-mail foram recebidas no serviço externo.
- [x] **Restrict to Domain** — N/A: indisponível no plano gratuito do Formspree (DEC-106).

## Imagens
- [ ] Licença compatível.
- [ ] Fonte/licença registrada quando necessário.
- [ ] Imagens otimizadas.

## Qualidade
- [x] Sem links quebrados.
- [ ] Sem dados de teste.
- [x] Sem credenciais no repositório.
- [x] Comparação com os mockups aprovados de desktop, tablet e celular realizada.
- [x] Documentação atualizada antes da aprovação.
- [x] Mockup da página de turma aprovado antes de sua implementação.
