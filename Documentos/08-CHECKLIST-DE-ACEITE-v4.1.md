# Checklist de Aceite

Versão: 4.1<br>
Status: APROVADO — CONTRATO FINAL DA HOME<br>
Última atualização: 12/10/2026

## Home — contrato final da DEC-104

O contrato final foi consolidado documentalmente em 12/10/2026 a partir de Referencias/Mockups/home-v1-aprovada.png, referência histórica já aprovada, reconciliada pelas decisões posteriores. Esta seção registra critérios **pendentes de implementação e regressão da composição final da Home**. O Passo 118 não criou protótipo, não alterou código e não realizou nova aprovação visual. As evidências concluídas de Novidades e Matemática além da sala nas seções próprias permanecem válidas para suas frentes; não representam aprovação da composição final aqui especificada.

### Estrutura, hero e componentes institucionais

- [ ] A ordem visual e a ordem do documento são Cabeçalho e navegação global → Hero + Novidades → Acesso rápido → Acesso às turmas → Matemática além da sala — destaques → Rodapé, considerando a ocultação integral dos blocos condicionais.
- [ ] Header, menu global, identidade, paletas, ícones e Footer reutilizam os componentes e o Design System vigentes.
- [ ] A frase institucional do Header mantém as três linhas aprovadas pela DEC-067; a imagem histórica não substitui essa decisão.
- [ ] O hero mostra exatamente “Bem-vindos ao Matemática Instrumental” e “Conteúdo organizado, claro e objetivo para você aprender mais e melhor.”.
- [ ] A ação “Comece por aqui” conduz à âncora interna #acesso-rapido, sem nova rota ou comportamento de cadastro.
- [ ] A composição mantém hero e Novidades lado a lado no desktop e adapta seu fluxo às referências vigentes em tablet e mobile.

### Acesso rápido

- [ ] A seção Acesso rápido e sua âncora acesso-rapido existem independentemente de conteúdo nas coleções.
- [ ] Existem exatamente cinco cards, nesta ordem: Turmas; Provas e Resoluções; Oportunidades e Datas; Matemática além da sala; Falar com o Professor.
- [ ] Títulos, descrições curtas e destinos correspondem ao contrato final do 02-ARQUITETURA-DO-SITE-v3.7.md e à DEC-104.
- [ ] Os destinos canônicos são /turmas/, /provas-e-resolucoes/, /oportunidades-e-datas/, /matematica-alem-da-sala/ e /falar-com-o-professor/, respeitando BASE_URL.
- [ ] Cada card inteiro é um único acesso semântico por link, com ícone, título, descrição legível, foco visível e área de toque adequada.
- [ ] A grade se adapta à largura disponível, sem forçar seis posições, criar sexto placeholder ou definir nova quantidade fixa de colunas pela imagem histórica.
- [ ] Downloads não aparece e nenhuma rota global Downloads é criada.
- [ ] Os cinco cards continuam disponíveis quando Turmas ou Matemática além da sala não possuem registros elegíveis.

### Acesso às turmas

- [ ] A fonte é a coleção real turmas; a elegibilidade usa somente arquivada !== true, sem inferir atividade a partir de ano letivo ou calendário.
- [ ] O agrupamento usa Segmento → Ano/Série, com Ensino Fundamental antes de Ensino Médio e anos/séries em ordem natural crescente.
- [ ] A Home apresenta exatamente um acesso por combinação de segmento e ano/série que possua ao menos uma turma não arquivada.
- [ ] Múltiplas turmas no mesmo ano/série não duplicam o acesso, e nenhum card individual de turma aparece diretamente na Home.
- [ ] Grupos compostos exclusivamente por turmas arquivadas, anos/séries sem cadastro e segmentos sem grupos elegíveis são omitidos.
- [ ] Com os dados reais atuais, a seção apresenta somente Ensino Médio → 1º ano.
- [ ] Sem turma elegível, a seção inteira é omitida: sem título, mensagem vazia, placeholder, box vazio ou espaço reservado.
- [ ] Cada acesso aponta para o respectivo agrupamento em /turmas/, com âncora exata no padrão turmas-{segmentoSlug}-{anoSerieSlug}.
- [ ] Os dois slugs são derivados pela função central normalizeTurmaRouteSegment; a Home e /turmas/ compartilham a mesma regra, sem cópias, índice de renderização ou identificador persistido adicional.
- [ ] O acesso de Ensino Médio → 1º ano resolve para /turmas/#turmas-ensino-medio-1o-ano, respeitando BASE_URL.
- [ ] A inserção ou reordenação de outros grupos não altera as âncoras dos agrupamentos existentes.
- [ ] /turmas/ conserva o contrato da DEC-095, inclusive as turmas arquivadas acessíveis; a exclusão da Home não remove nenhum acesso da página global.
- [ ] Cenários sem turmas, com um agrupamento, com vários agrupamentos, com múltiplas turmas no mesmo grupo e com turmas arquivadas foram verificados.

### Novidades e Matemática além da sala

- [ ] Novidades preserva o motor derivado e os contratos DEC-096/097/101, com estado exclusivo na precedência Destaque > Atenção > Novo, ordenação vigente e limite de seis aplicado depois da elegibilidade e ordenação.
- [ ] A Home usa somente itens projetados pelo motor real, sem reproduzir os exemplos fictícios da imagem histórica, incluir Provas sem decisão própria ou duplicar cadastros.
- [ ] Sem Novidades, o painel permanece com “Nenhuma novidade no momento.” em altura natural, sem cards, “Ver todas”, CTA, placeholder ou reserva da altura preenchida.
- [ ] Com Novidades, cada item aponta para sua âncora estável em /novidades/ e “Ver todas” usa a rota canônica com BASE_URL.
- [ ] A faixa Matemática além da sala ocupa a posição posterior a Acesso às turmas e preserva integralmente DEC-102/103.
- [ ] A seleção editorial usa somente destaqueHome === true e arquivado !== true, ordena por publicação decrescente, título pt-BR e ID estável e limita a três sem preenchimento automático.
- [ ] Com zero elegíveis, toda a faixa editorial é omitida, sem título, mensagem vazia, placeholder ou espaço reservado; com um, dois e três, somente a quantidade real é apresentada; com quatro ou mais, aparecem os três primeiros elegíveis.
- [ ] A seleção da faixa continua independente de destaqueNovidades, sem retornar aos seis atalhos de categorias do mockup antigo.
- [ ] Cards editoriais com e sem imagem, com títulos longos e com proporções de imagem variadas preservam leitura e ações em 1440 px, 834 px e 390 px.
- [ ] O risco de compressão do card compacto com imagem em 834 px, identificado por inspeção CSS no Passo 117, foi verificado na etapa autorizada de implementação/regressão; ele não foi corrigido ou declarado resolvido no Passo 118.

### Responsividade, acessibilidade e rodapé

- [ ] A composição final foi comparada em 1440 px, 834 px e 390 px, usando a imagem histórica reconciliada com a documentação vigente.
- [ ] A adaptação mantém a ordem das seções, os cinco cards com seus textos legíveis e a hierarquia Segmento → Ano/Série, sem inventar colunas fixas globais.
- [ ] Títulos, descrições, nomes de segmento e ano/série quebram naturalmente, sem partir palavras arbitrariamente, cortar texto ou produzir overflow horizontal.
- [ ] Links de cards, ação do hero e acessos por ano/série funcionam por teclado, têm foco visível, contraste e área de toque adequada.
- [ ] Âncoras não ficam encobertas pelos elementos de navegação persistentes e funcionam com e sem prefixo de BASE_URL.
- [ ] Estados condicionais reorganizam o fluxo sem gaps artificiais, boxes vazios ou alturas reservadas.
- [ ] O Footer atual é preservado; redes sociais só recebem links após documentação de URLs oficiais, sem perfis inventados.
- [ ] Nenhuma afirmação de implementação ou aprovação visual da Home final foi registrada antes da verificação futura dos critérios pendentes.

## Identidade
- [ ] Logo oficial correta.
- [ ] Foto oficial do professor quando prevista.
- [ ] Paletas respeitadas.
- [ ] Sem mistura arbitrária entre linhas.

## Layout
- [ ] Fundo e boxes claramente distintos.
- [ ] Fundo cinza coerente.
- [ ] Boxes com superfícies/degradês discretos.
- [ ] Menu abaixo do cabeçalho no desktop.
- [ ] Boa hierarquia visual.
- [ ] Página de turma comparada ao mockup específico aprovado, quando existir.

## Menus e navegação da turma
- [ ] Menu principal permanece acessível durante a rolagem.
- [ ] Menu interno da turma permanece acessível durante a rolagem.
- [ ] Ordem correta: Início da turma | Cronogramas | Atividades e listas | Para estudar | Trabalhos | Materiais | Vídeos | Links.
- [ ] Item atual do menu interno claramente identificado.
- [ ] Menus fixos não encobrem conteúdo.
- [ ] Navegação interna compacta e utilizável no celular.
- [ ] Contexto Segmento → Ano/Série → Turma permanece claro.

## Ícones
- [ ] Mesma família.
- [ ] Profissionais.
- [ ] Legíveis no celular.

## Responsividade
- [ ] Desktop testado contra o mockup aprovado.
- [ ] Tablet testado contra a referência aprovada de 834 px.
- [ ] No tablet, menu principal 3 × 2 e menu interno 4 × 2 permanecem legíveis e utilizáveis.
- [ ] No tablet, a frase institucional aparece em três linhas sem ultrapassar limites.
- [ ] No tablet, o botão “Falar com o Professor” permanece no lado direito e aceita quebra controlada quando necessária.
- [ ] Celular testado contra a referência aprovada de 390 px.
- [ ] No celular, menu principal compacto está visível e utilizável.
- [ ] No celular, o controle “Menu da turma” está visível, mostra o item atual e não deixa box vazio.
- [ ] No celular, “Ver cronograma completo” permanece dentro do limite, com quebra de linha quando necessária.
- [ ] Componentes reorganizados quando necessário.
- [ ] Tabelas convertidas para apresentação adequada no celular quando necessário.

## Novidades
- [ ] Novidades é derivada dos registros originais e não possui coleção ou cadastro duplicado.
- [ ] Cada registro original gera no máximo um item, mesmo quando se aplica a várias turmas.
- [ ] Conteúdo global pode participar sem turma.
- [ ] Conteúdo com audiência de turmas participa somente quando alcança pelo menos uma turma não arquivada.
- [ ] Conteúdo destinado exclusivamente a turmas arquivadas fica excluído, inclusive durante Destaque.
- [ ] Cada item apresenta no máximo um estado entre Destaque, Atenção e Novo, nessa precedência.
- [ ] Avisos preservam `prioridade`, `publicacao` e `validade`.
- [ ] Atividade/Lista sem prazo e Para estudar sem `dataObjetivo` usam janela de Novo de sete dias.
- [ ] Cronograma, Atividade/Lista com prazo, Para estudar com `dataObjetivo` e Trabalho usam `publicacao <= hoje < publicacao + 7 dias` para Novo.
- [ ] O dia de `publicacao` é elegível como Novo e `publicacao + 7 dias` já está fora da janela.
- [ ] Cronograma sem `publicacao` nunca recebe Novo e continua elegível para Atenção pela `dataPrazo`.
- [ ] Materiais, Vídeos, Links e editorial sem data crítica usam janela de Novo de dez dias.
- [ ] Cronograma, Atividade/Lista com prazo e Para estudar com `dataObjetivo` usam Atenção de D−7 a D e saem em D+1.
- [ ] Trabalho usa Atenção de D−7 a D+1 e sai em D+2.
- [x] Oportunidades aplicam as janelas de inscrição e Realização somente a partir da coleção real implementada.
- [ ] Item de Cronograma pode entrar como Atenção sem `publicacao`.
- [ ] Coincidindo Novo e Atenção, somente Atenção é renderizado.
- [ ] Coincidindo Destaque, Atenção e Novo, somente Destaque é renderizado.
- [x] O contrato de `destaqueNovidades` exige `inicio` e `fim`, não oferece ocultação e não supera a exclusão de turmas arquivadas.
- [ ] Ordenação global usa estado; depois fim de Destaque, data crítica de Atenção ou publicação de Novo; e título pt-BR, fonte e ID como desempates.
- [ ] A ordem física dos arquivos não interfere na ordenação.
- [ ] A Home aplica o limite de seis somente depois de elegibilidade, estado e ordenação.
- [ ] O painel desktop é compacto, tem altura controlada e usa rolagem interna somente quando necessária.
- [ ] Tablet e mobile apresentam versões compactas, legíveis e sem overflow horizontal.
- [ ] “Ver todas”, quando houver item, aponta para `/novidades/`.
- [x] `/novidades/` mostra todos os itens ativos, não exige entrada no menu e não mantém histórico próprio.
- [ ] O item da Home aponta conceitualmente para o fragmento de sua chave estável na visão completa.
- [ ] A visão completa oferece ações para as origens reais e não escolhe arbitrariamente uma turma quando houver várias.
- [ ] Não existem páginas individuais de detalhe de Novidade.
- [ ] Conteúdo expirado sai de Novidades sem ser apagado da área de origem.
- [ ] Sem item ativo, o painel mostra somente “Nenhuma novidade no momento.”, sem cards, Ver todas, CTA ou placeholder.
- [ ] Todos os cálculos usam datas civis em `America/Sao_Paulo` e são compatíveis com o rebuild diário.

## Turmas
- [ ] Segmento → Ano/Série → Turma.
- [ ] Fundamental e Médio diferenciados.
- [ ] Nova turma não exige alterar páginas fixas.
- [ ] Anos anteriores arquiváveis.
- [ ] Não há rótulo público “ativa/inativa”.
- [ ] Turma arquivada usa mensagem adequada de ano letivo encerrado.
- [ ] Na página global, segmentos seguem a ordem institucional/documental vigente, sem ordenação alfabética conflitante.
- [ ] Anos/séries seguem ordem natural crescente dentro do segmento, sem comparação puramente lexicográfica incorreta.
- [ ] Dentro do mesmo ano/série, turmas não arquivadas aparecem antes das arquivadas.
- [ ] Dentro de cada grupo de arquivamento, turmas usam `ordem` crescente e nome/título como desempate estável.
- [ ] Turmas arquivadas permanecem no respectivo ano/série, continuam acessíveis e não formam seção global separada.
- [ ] A linguagem de arquivamento é exatamente “Turma arquivada — ano letivo encerrado”.
- [ ] Cada turma leva à respectiva rota canônica com respeito ao `BASE_URL`.
- [ ] Sem turmas disponíveis, Header, menu global, título Turmas e Footer permanecem, e aparece somente “Nenhuma turma disponível no momento.” após o título.
- [ ] O estado vazio global não mostra cards vazios, filtros, CTA, cadastro, matrícula ou mensagem de erro.

## Início da turma
- [ ] Identificação da turma visível.
- [ ] Avisos da turma visíveis quando existirem.
- [ ] Próximos compromissos resumidos.
- [ ] Resumos de Atividades, Para estudar, Trabalhos, Materiais, Vídeos e Links.
- [ ] Falar com o professor disponível.
- [ ] Ausência de conteúdo opcional não produz boxes vazios desnecessários.

## Cronogramas
- [ ] Regime bimestral, trimestral e semestral suportado.
- [ ] Quantidade correta de períodos: 4, 3 ou 2.
- [ ] Todos os períodos aparecem no seletor da mesma área e exatamente um período é selecionado: o corrente quando existir; o primeiro cronológico antes do primeiro; o próximo cronológico entre períodos; e o último cronológico depois do último.
- [ ] Período corrente derivado corretamente por data inicial ≤ hoje ≤ data final no timezone `America/Sao_Paulo`.
- [ ] Nenhum campo persistido de período atual ou situação manual é usado.
- [ ] Período selecionado recebe o destaque aprovado; somente o período realmente corrente recebe a identificação “Período atual” e `aria-current`, sem converter uma seleção fora do intervalo em período corrente.
- [ ] Total da etapa do período selecionado aparece separado dos itens.
- [ ] Tabela usa exatamente Data/Prazo | Tipo | Descrição/Conteúdo | Valor e apresenta os itens do período selecionado.
- [ ] Descrição/Conteúdo recebe a maior largura no desktop.
- [ ] Desktop de 1440 px corresponde ao protótipo aprovado.
- [ ] Tablet de 834 px preserva as quatro colunas sem rolagem horizontal.
- [ ] Mobile de 390 px apresenta seletor sem rolagem horizontal.
- [ ] Seletor mobile comporta regimes com dois, três ou quatro períodos.
- [ ] No mobile, cada item vira bloco vertical com Data/Prazo e Valor no topo, Tipo abaixo e Descrição/Conteúdo na sequência.
- [ ] Item de Cronograma só é considerado passado quando sua data/prazo é anterior a hoje no timezone oficial.
- [ ] Item com data/prazo igual ou posterior a hoje mantém aparência normal.
- [ ] Item passado permanece acessível.
- [ ] Data/Prazo, Tipo e Descrição/Conteúdo de item passado recebem simultaneamente atenuação visual e texto riscado.
- [ ] Valor de item passado permanece visível, conserva o valor original e não recebe texto riscado.
- [ ] Total da etapa corresponde à soma dos valores de todos os itens do período selecionado que possuam valor.
- [ ] Estado temporal não remove nem zera valor e não exclui item passado da soma.
- [ ] Item sem valor não exibe zero inventado e não participa da soma.
- [ ] Item passado não usa ícone de concluído, checkbox, badge “Passado”, cor de erro nem fundo vermelho.
- [ ] Sem campo manual de situação.
- [ ] Sem notas individuais.
- [ ] Sem pontos previstos/distribuídos, saldo, média ou desempenho.
- [ ] Edição somente no ambiente de manutenção/CMS.
- [ ] Componente reutilizável não contém fixtures.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `CronogramasView.astro`.
- [ ] Rota real usa somente registros das coleções aprovadas.
- [ ] Sem dados reais suficientes, a rota preserva o contexto da turma e não exibe seletor, tabela, mensagem vazia ou placeholder inventados.

## Atividades e listas
- [ ] Listagem única da publicação mais recente para a mais antiga.
- [ ] Empates de publicação usam título crescente no locale pt-BR, sem novo campo persistido.
- [ ] Lista completa visível sem filtro.
- [ ] Os únicos filtros visuais são Busca, Assunto e Tipo.
- [ ] Filtros permanecem sem interatividade definitiva nesta etapa.
- [ ] Sem JavaScript, busca real, `onchange`, filtragem client-side, query string, botão de limpar ou contador.
- [ ] Tipos Atividade e Lista de exercícios suportados.
- [ ] Prazo permanece opcional no modelo de conteúdo.
- [ ] Assunto, Publicação e Prazo aparecem em todos os registros.
- [ ] Prazo ausente é exibido exatamente como `-`.
- [ ] Desktop de 1440 px mantém título e os três metadados na mesma faixa horizontal.
- [ ] No desktop, o grupo de metadados usa três colunas regulares, com rótulo e valor no mesmo eixo central.
- [ ] Tablet de 834 px mantém título e os três metadados na mesma faixa horizontal, sem overflow, sobreposição ou corte.
- [ ] No tablet, o grupo de metadados usa três colunas regulares, com rótulo e valor no mesmo eixo central.
- [ ] No desktop e no tablet, Funções, Hoje, 20 ago, 26 ago e `-` ficam centralizados sob seus respectivos rótulos.
- [ ] No desktop e no tablet, as larguras das colunas não são determinadas apenas pelo conteúdo.
- [ ] Mobile de 390 px mostra o título em linha própria e os três metadados na linha abaixo.
- [ ] No mobile, Assunto, Publicação e Prazo ocupam três colunas iguais de exatamente um terço da largura disponível cada.
- [ ] No mobile, a largura das colunas independe do comprimento do conteúdo.
- [ ] No mobile, cada bloco ocupa integralmente sua coluna.
- [ ] No mobile, rótulos e valores estão centralizados horizontalmente em suas respectivas colunas.
- [ ] No mobile, o hífen do prazo ausente está centralizado no terço de Prazo.
- [ ] No mobile, Prazo não recebe alinhamento lateral diferente dos demais metadados.
- [ ] Desktop de 1440 px e tablet de 834 px preservam a composição horizontal aprovada pela DEC-085.
- [ ] Descrição opcional aparece abaixo do cabeçalho como texto corrido, sem box interno.
- [ ] Ausência de descrição não renderiza nem reserva espaço.
- [ ] Múltiplos Recursos vinculados são suportados como links independentes.
- [ ] Recursos mostram somente o nome, nunca a URL em texto bruto.
- [ ] Múltiplos recursos têm espaçamento claro e quebra natural, sem card individual.
- [ ] Gabarito/resolução opcional.
- [ ] Ausência de gabarito não gera campo vazio.
- [ ] “GABARITO / RESOLUÇÃO” usa exatamente o mesmo tratamento visual de “RECURSOS” e não é link.
- [ ] Sem data de liberação, Recursos de Gabarito/Resolução existentes são apresentados como links.
- [ ] Antes da data de liberação, links e nomes dos recursos não são fornecidos à apresentação.
- [ ] Antes da data, mostrar somente `Disponível em {data formatada}` como texto secundário legível.
- [ ] O estado programado não usa cadeado, ícone, botão desabilitado, campo cinza, status, badge, alerta, cor verde/vermelha, texto de bloqueio/indisponibilidade nem contagem regressiva.
- [ ] Na própria data de liberação, os Recursos de Gabarito/Resolução passam a ser apresentados como links.
- [ ] Disponibilidade é derivada com a noção central de hoje em `America/Sao_Paulo`, sem booleano ou status persistido.
- [ ] Datas visuais seguem o padrão aprovado: Hoje, 20 ago, 26 ago, 27 ago.
- [ ] Componente reutilizável recebe dados por propriedades e não contém fixtures.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `ActivitiesListsView.astro`.
- [ ] Rota real usa somente registros da coleção da turma.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.
- [ ] Vídeos relacionados não são renderizados nem recebem placeholder nesta etapa.
- [ ] Conteúdo permanece acessível após o prazo.

## Para estudar
- [ ] `titulo` e `objetivo` permanecem campos distintos e obrigatórios.
- [ ] Título é o elemento principal do registro.
- [ ] Objetivo aparece abaixo do cabeçalho, precedido pelo rótulo visual `OBJETIVO`.
- [ ] Objetivo tem destaque maior que o resumo/orientação e permanece subordinado ao título.
- [ ] Objetivo não usa badge, fundo próprio, ícone nem aparência de status.
- [ ] `tipoObjetivo` permanece no modelo e não é renderizado.
- [ ] Nenhuma taxonomia ou tratamento visual de `tipoObjetivo` foi inventado.
- [ ] Listagem usa `publicacao` decrescente e título crescente no locale pt-BR como desempate.
- [ ] Os únicos filtros visuais são Busca e Assunto.
- [ ] Filtros permanecem sem JavaScript, busca real, query string, botão de limpar, contador ou estado de nenhum resultado nesta etapa.
- [ ] Desktop de 1440 px mantém título e metadados na mesma faixa horizontal.
- [ ] Tablet de 834 px mantém título e metadados na mesma faixa horizontal, sem sobreposição ou overflow.
- [ ] Assunto e Publicação aparecem em todos os registros.
- [ ] `dataObjetivo` permanece opcional.
- [ ] Quando `dataObjetivo` existe, seu rótulo visual é exatamente `DATA`.
- [ ] O nome técnico permanece `dataObjetivo`.
- [ ] Ausência de `dataObjetivo` não mostra placeholder, hífen nem espaço reservado.
- [ ] No mobile de 390 px, o cabeçalho usa fluxo vertical próprio e não conserva o grid horizontal de desktop.
- [ ] No mobile, o título ocupa faixa exclusiva de 100% e nenhum metadado compartilha essa faixa.
- [ ] Metadados começam somente depois do término completo do título.
- [ ] No mobile com data, Assunto, Publicação e Data usam três colunas iguais.
- [ ] No mobile sem data, Assunto e Publicação usam duas colunas iguais, sem terceira coluna residual.
- [ ] Rótulo e valor de cada metadado compartilham o mesmo eixo central.
- [ ] Valores longos quebram somente dentro da própria coluna e não invadem o título, outra coluna ou borda.
- [ ] O mobile não usa margem negativa, transform, posicionamento absoluto ou compensação por conteúdo.
- [ ] `resumoOrientacao` aparece abaixo do Objetivo como texto corrido, sem card interno.
- [ ] Múltiplos Recursos vinculados são apresentados apenas pelo nome como links independentes.
- [ ] URLs não aparecem em texto bruto e Recursos não recebem cards individuais.
- [ ] Leituras relacionadas opcionais usam a mesma linguagem visual de Recursos.
- [ ] Ausência de Leituras relacionadas não renderiza nem reserva espaço.
- [ ] Vídeos relacionados permanecem nos dados, mas não são renderizados nem recebem placeholder.
- [ ] Sem prazo manual ou situação persistida.
- [ ] Registro permanece normal durante toda a própria data do objetivo.
- [ ] Atenuação ocorre automaticamente somente no dia seguinte, usando a noção central de hoje em `America/Sao_Paulo`.
- [ ] Registro atenuado permanece legível, acessível e com links funcionais.
- [ ] Registro atenuado não usa tachado, checkbox, ícone de conclusão, badge ou status manual.
- [ ] Componente reutilizável recebe dados por propriedades, não contém fixtures e não calcula a regra temporal.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `StudyView.astro`.
- [ ] Rota real usa somente registros da coleção da turma.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, listagem, mensagem vazia, placeholder ou fixture.

## Trabalhos
- [ ] Visão completa corresponde às referências aprovadas de 1440 px, 834 px e 390 px.
- [ ] Listagem usa uma única coluna e ordena por `publicacao` decrescente, com `titulo` crescente no locale pt-BR como desempate.
- [ ] `titulo` obrigatório é o elemento visual dominante e não usa fallback “Sem título”.
- [ ] Somente Busca e Assunto aparecem como filtros visuais nesta etapa, sem JavaScript ou filtragem funcional.
- [ ] Assunto, Publicação e Entrega são os únicos metadados apresentados.
- [ ] O rótulo visual temporal é sempre `ENTREGA`, inclusive quando o valor técnico de `marco.tipo` é Apresentação.
- [ ] `APRESENTAÇÃO` não é renderizado e o valor técnico original de `marco.tipo` continua preservado nos dados.
- [ ] Cada registro conserva exatamente um `marco` obrigatório `{ tipo, data }`, sem alteração do enum Entrega | Apresentação.
- [ ] No desktop e no tablet, título e os três metadados permanecem na mesma faixa horizontal, sem overflow ou sobreposição.
- [ ] No mobile, o título ocupa faixa própria e os metadados usam `minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)`.
- [ ] Rótulo e valor de cada metadado estão centralizados no mesmo eixo.
- [ ] Valores mobile usam `overflow-wrap: normal` e `word-break: normal`, sem quebra arbitrária interna de palavras.
- [ ] `descricao` opcional aparece em texto corrido quando presente e não deixa placeholder nem espaço quando ausente.
- [ ] `DOCUMENTO DO TRABALHO` apresenta exatamente um Recurso vinculado obrigatório pelo nome, nunca pela URL bruta.
- [ ] `RECURSOS ADICIONAIS` aceita uma ou mais entradas, aparece somente quando houver conteúdo e mostra links independentes pelo nome.
- [ ] Documento e recursos não recebem cards internos e mantêm boa área de clique e toque.
- [ ] `tags` permanece no modelo e nos dados, mas não é renderizado.
- [ ] A atenuação é derivada somente quando hoje for posterior a `marco.data`, usando a noção central de hoje em `America/Sao_Paulo`.
- [ ] No próprio dia de `marco.data`, o registro permanece normal.
- [ ] Registro atenuado continua legível, acessível e com links funcionais, sem tachado, checkbox, badge, status textual ou ícone.
- [ ] Não existem pontuação, nota, média, progresso, formulário, botão Entregar, upload, confirmação de envio ou etapas.
- [ ] Componente reutilizável recebe dados por propriedades, não contém fixtures e não calcula a regra temporal.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `WorksView.astro`; os valores técnicos de `marco.tipo` permanecem preservados.
- [ ] Rota real usa somente registros da coleção da turma.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.

## Materiais
- [ ] Visão completa corresponde às referências aprovadas de 1440 px, 834 px e 390 px.
- [ ] Acervo usa listagem em uma única coluna, com separações discretas e sem mosaico, sidebar ou cards internos.
- [ ] Um registro corresponde a um único Material e exatamente um arquivo/link.
- [ ] `titulo` é o elemento visual dominante.
- [ ] `tipo` aparece como metadado textual secundário, sem enum visual, cor por tipo ou aparência de status.
- [ ] Os únicos filtros visuais são Busca, Área, Subárea, Conteúdo e Tipo.
- [ ] Filtros permanecem sem JavaScript, busca real, filtragem, dependência dinâmica, query string, botão de limpar, contador ou estado de nenhum resultado.
- [ ] No desktop de 1440 px, os cinco filtros aparecem na mesma faixa.
- [ ] No tablet de 834 px, Busca ocupa a largura total e Área, Subárea, Conteúdo e Tipo formam grade 2 × 2.
- [ ] No mobile de 390 px, filtros são empilhados, título ocupa faixa própria e Tipo aparece abaixo.
- [ ] `arquivoLink` contém exatamente um Recurso vinculado obrigatório.
- [ ] A interface mostra o rótulo `ARQUIVO / LINK` e somente o nome do recurso como link, nunca a URL bruta.
- [ ] O link possui boa área de clique e toque e não usa card interno.
- [ ] Cada classificação apresenta exatamente Área → Subárea → Conteúdo como cadeia tipográfica discreta.
- [ ] Classificações não usam badges coloridos, botões ou cards internos.
- [ ] Múltiplas classificações permanecem dentro do mesmo Material sem repetir título, Tipo ou arquivo/link.
- [ ] Cadeias quebram naturalmente no mobile sem partir palavras arbitrariamente nem gerar overflow horizontal.
- [ ] `descricao` opcional aparece como texto corrido quando presente e não gera placeholder nem espaço quando ausente.
- [ ] `publicacao` permanece nos dados e não é renderizada nem gera temporalidade.
- [ ] `tags` permanece nos dados e não é renderizado.
- [ ] Dentro do mesmo Conteúdo, Materiais mais recentemente publicados têm prioridade.
- [ ] Nenhuma nova regra global de ordenação entre Conteúdos diferentes foi criada.
- [ ] Materiais não possuem prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação ou progresso.
- [ ] Componente reutilizável recebe dados por propriedades e não contém fixtures.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `MaterialsView.astro`.
- [ ] Rota real usa somente registros da coleção da turma e não duplica Material por classificação.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.

## Conteúdo geral
- [ ] Filtros funcionando conforme cada área.
- [ ] Busca funcionando onde prevista.
- [ ] Links do Drive funcionando.
- [ ] Informações opcionais ausentes não geram elementos vazios, exceto o Prazo de Atividades e listas, que permanece visível com `-` quando ausente.

## Vídeos
- [ ] Biblioteca reutilizável.
- [ ] Ordenação por `publicacao` decrescente e, em empate, `titulo` crescente no locale pt-BR.
- [ ] Nenhuma ordenação por prioridade, duração ou provedor.
- [ ] Filtros visuais exatamente de Busca, Área, Subárea, Conteúdo e Prioridade.
- [ ] Filtros sem JavaScript, busca real, filtragem, query string, dependência dinâmica, contador ou estado de nenhum resultado.
- [ ] Miniatura alimentada por `miniaturaUrl`, preservada em 16:9 e sem distorção.
- [ ] Duração formatada pelo helper existente a partir de `duracaoSegundos`.
- [ ] Duração facilmente localizada sobre a miniatura e sem barra de progresso.
- [ ] Prioridade Essencial/Recomendado/Complementar como informação textual neutra.
- [ ] Prioridade sem aparência de status, alerta, urgência ou conclusão.
- [ ] Título dominante e descrição secundária em texto corrido, sem card interno.
- [ ] Classificação Área → Subárea → Conteúdo como cadeia tipográfica discreta.
- [ ] Múltiplas classificações dentro do mesmo card, sem duplicar miniatura, título, descrição ou URL.
- [ ] `provedor` e `tags` preservados nos dados e não renderizados.
- [ ] Ação com rótulo exato `Ver vídeo`.
- [ ] Na rota real, ação abre a URL do vídeo como link externo simples com boas práticas de segurança.
- [ ] Sem modal, player, iframe, autoplay, tela cheia interna, controles de reprodução ou barra de progresso.
- [ ] Sem prazo, vencimento, status, atenuação, ativo/inativo, dificuldade, pontuação, nota ou progresso.
- [ ] Desktop de 1440 px com cinco filtros na mesma faixa e biblioteca em duas colunas.
- [ ] Tablet de 834 px com Busca em largura total, demais filtros em grade 2 × 2 e cards horizontais em uma coluna.
- [ ] Mobile de 390 px com filtros e cards empilhados, miniatura 16:9 e ação com boa área de toque.
- [ ] Nenhum breakpoint apresenta distorção, sobreposição ou overflow horizontal.
- [ ] Componente reutilizável recebe dados por propriedades e não contém fixtures.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `VideosView.astro`.
- [ ] Rota real usa apenas os registros da coleção de Vídeos da turma.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, cards, mensagem vazia, placeholder ou fixture.

## Links
- [ ] Links representam recursos externos, não arquivos de Materiais ou Vídeos.
- [ ] Dados usam somente `id`, `titulo`, `descricao`, `url`, `finalidade`, `tipo`, `acesso` opcional, `classificacoes` opcionais, `publicacao`, `segmento`, `anoSerie` opcional, `turmas` opcional, `observacaoProfessor` opcional e `tags` opcionais.
- [ ] Registros agrupados exclusivamente por `finalidade`.
- [ ] Grupos ordenados pelo nome da finalidade e itens por `titulo`, ambos alfabeticamente no locale pt-BR.
- [ ] Nenhum agrupamento ou ordenação por `publicacao`, `acesso`, `tipo` ou classificação.
- [ ] Nenhum filtro, busca, ordenação visual, botão de limpar, contador ou estado de nenhum resultado.
- [ ] Título da visão exatamente `Links`.
- [ ] Cada grupo apresenta `FINALIDADE` e o nome da finalidade.
- [ ] Cada item apresenta tipo secundário, título dominante, descrição em texto corrido e ação `Acessar`.
- [ ] URL bruta e logo não aparecem.
- [ ] `acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` permanecem nos dados e não são renderizados.
- [ ] Ação real abre a URL externa em nova aba com `rel="noopener noreferrer"` e ícone externo.
- [ ] Nenhum modal, iframe, incorporação ou rastreamento.
- [ ] Sem prazo, vencimento, status, ativo/inativo, dificuldade, pontuação ou progresso.
- [ ] Desktop de 1440 px com grupos em duas colunas e ação lateral.
- [ ] Tablet de 834 px com grupos em uma coluna e nenhum overflow horizontal.
- [ ] Mobile de 390 px com fluxo vertical, ação em boa área de toque e nenhum overflow horizontal.
- [ ] Componente reutilizável recebe os grupos por propriedades e não contém fixtures.
- [ ] O protótipo temporário cumpriu a validação, foi removido e sua referência vigente é `LinksView.astro`.
- [ ] Rota real usa apenas registros da coleção `links` aplicáveis à turma.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, grupos, mensagem vazia, placeholder ou fixture.

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
- [ ] Acesso originado de uma turma reconhecida usa automaticamente o `slug` recebido no parâmetro `turma`.
- [ ] O parâmetro de turma é resolvido contra a coleção real e texto arbitrário da query não é enviado como identificador.
- [ ] Com turma reconhecida, o valor técnico é `turma.slug` e a apresentação somente leitura usa `anoSerie — nome`.
- [ ] Sem turma reconhecida, o valor técnico é `contato-geral` e a apresentação é exatamente “Não se aplica / contato geral”.
- [ ] A chamada-resumo não exibe texto redundante de identificação automática da turma.
- [ ] Nome obrigatório.
- [ ] E-mail obrigatório.
- [ ] Motivo obrigatório.
- [ ] Mensagem obrigatória.
- [ ] O botão usa exatamente “Enviar mensagem”, é semântico, funciona por teclado e possui foco visível.
- [ ] No estado enviando, o botão fica desabilitado e aparece exatamente “Enviando mensagem…”.
- [ ] No estado de sucesso, aparece exatamente “Mensagem enviada com sucesso.”.
- [ ] No estado de erro, aparece exatamente “Não foi possível enviar a mensagem. Tente novamente.” e uma nova tentativa é possível.
- [ ] Sucesso não redireciona automaticamente e não reapresenta Nome, E-mail, Motivo ou Mensagem.
- [ ] A rota real envia diretamente por AJAX ao endpoint público aprovado `https://formspree.io/f/xkjgjoqv`, com método `POST`, `Accept: application/json` e sem redirecionamento.
- [ ] A configuração centraliza somente o endpoint público do Formspree e valores técnicos controlados, sem segredo, token, `FORM_ACTION_URL` ou conceitos `ENTRY_...`.
- [ ] Validação HTML nativa inválida impede qualquer transporte.
- [ ] O payload contém somente `name`, `email`, `motivo`, `message`, `turma`, `subject` e `_gotcha`.
- [ ] `subject` usa exatamente “Mensagem pelo portal Matemática Instrumental”; `_gotcha` permanece vazio.
- [ ] No envio, o botão fica desabilitado, submissões duplicadas são impedidas e o formulário recebe `aria-busy`.
- [ ] Sucesso somente ocorre quando `response.ok`; Nome, E-mail, Motivo e Mensagem são limpos, Turma é preservada e os dados enviados não são reapresentados.
- [ ] Falha de rede, resposta HTTP não aceita ou erro informado pelo Formspree preserva os valores, reabilita o botão e permite nova tentativa sem expor detalhe interno.
- [ ] Formshield está ativo; CAPTCHA visual está desabilitado; `_gotcha` está visualmente oculto, fora do teclado e não é anunciado.
- [ ] **Restrict to Domain** permanece pendente até o domínio público final, que será informado sem `https://`; `localhost` não será cadastrado.
- [ ] A orientação mostra exatamente “Comunicação privada. Os dados deste formulário são enviados pelo Formspree para encaminhamento da mensagem ao professor.”.
- [ ] A nota mostra exatamente “Nome, e-mail, motivo e mensagem não são colocados na URL nem armazenados pelo site. O Formspree processa e pode armazenar a submissão para realizar o envio.”.
- [ ] Nada publicado no site.
- [ ] Dados pessoais fora do GitHub.
- [ ] Nome, E-mail, Motivo e Mensagem não aparecem em URL ou query string.
- [ ] Nenhuma mensagem é persistida pelo site em conteúdo estático, `localStorage`, `sessionStorage`, IndexedDB ou cookies; o Formspree processa e pode arquivar a submissão externamente.
- [ ] Sem analytics, logs deliberados de dados pessoais ou rastreamento do formulário nesta etapa.
- [ ] Sem upload de arquivos por alunos ou visitantes.
- [ ] Formulário validado em 1440 px, 834 px e 390 px, sem overflow horizontal.
- [ ] Labels, inputs, textarea, botão e mensagens preservam contraste, espaçamento e navegação por teclado.
- [ ] Mensagens de enviando e sucesso são anunciadas como status e erro é anunciado como alerta.
- [ ] Mockup de Falar com o Professor aprovado e registrado para 1440 px, 834 px e 390 px, nos quatro estados e nos contextos com e sem turma.
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
- [ ] **Restrict to Domain** permanece pendente até existir domínio público definitivo; não cadastrar `localhost`.

## Imagens
- [ ] Licença compatível.
- [ ] Fonte/licença registrada quando necessário.
- [ ] Imagens otimizadas.

## Qualidade
- [ ] Sem links quebrados.
- [ ] Sem dados de teste.
- [ ] Sem credenciais no repositório.
- [ ] Comparação com os mockups aprovados de desktop, tablet e celular realizada.
- [ ] Documentação atualizada antes da aprovação.
- [ ] Mockup da página de turma aprovado antes de sua implementação.
