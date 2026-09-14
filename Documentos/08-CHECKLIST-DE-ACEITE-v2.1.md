# Checklist de Aceite

Versão: 2.1  
Status: APROVADO — VISÃO COMPLETA DE TRABALHOS
Última atualização: 26/08/2026

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
- [ ] Novo/Atenção/Destaque funcionando.
- [ ] Novas inserções relevantes alimentam Novidades automaticamente.
- [ ] Novidades não duplicam o registro de conteúdo.
- [ ] Prazos automáticos corretos.
- [ ] Conteúdo vencido sai de Novidades sem ser apagado.
- [ ] Rolagem interna no desktop quando prevista.
- [ ] Versões adaptadas para tablet/celular.

## Turmas
- [ ] Segmento → Ano/Série → Turma.
- [ ] Fundamental e Médio diferenciados.
- [ ] Nova turma não exige alterar páginas fixas.
- [ ] Anos anteriores arquiváveis.
- [ ] Não há rótulo público “ativa/inativa”.
- [ ] Turma arquivada usa mensagem adequada de ano letivo encerrado.

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
- [ ] Todos os períodos aparecem no seletor da mesma área.
- [ ] Período corrente derivado corretamente por data inicial ≤ hoje ≤ data final no timezone `America/Sao_Paulo`.
- [ ] Nenhum campo persistido de período atual ou situação manual é usado.
- [ ] Período corrente recebe destaque e a identificação “Período atual”.
- [ ] Total da etapa aparece separado dos itens.
- [ ] Tabela usa exatamente Data/Prazo | Tipo | Descrição/Conteúdo | Valor.
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
- [ ] Total da etapa corresponde à soma dos valores de todos os itens do período que possuam valor.
- [ ] Estado temporal não remove nem zera valor e não exclui item passado da soma.
- [ ] Item sem valor não exibe zero inventado e não participa da soma.
- [ ] Item passado não usa ícone de concluído, checkbox, badge “Passado”, cor de erro nem fundo vermelho.
- [ ] Sem campo manual de situação.
- [ ] Sem notas individuais.
- [ ] Sem pontos previstos/distribuídos, saldo, média ou desempenho.
- [ ] Edição somente no ambiente de manutenção/CMS.
- [ ] Componente reutilizável não contém fixtures.
- [ ] Página temporária de validação mantém suas fixtures locais e usa o componente reutilizável.
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
- [ ] Página temporária de validação mantém suas fixtures locais e reutiliza o componente.
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
- [ ] Página temporária mantém exclusivamente suas fixtures e reutiliza o componente.
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
- [ ] Página temporária mantém exclusivamente suas fixtures, conserva os valores técnicos de `marco.tipo` e reutiliza o componente.
- [ ] Rota real usa somente registros da coleção da turma.
- [ ] Sem registros reais, a rota preserva o contexto da turma e não renderiza filtros, lista, mensagem vazia, placeholder ou fixture.

## Materiais
- [ ] Organização Área → Subárea → Conteúdo funcionando.
- [ ] Um registro corresponde a um único material/arquivo/link.
- [ ] Múltiplas classificações por material funcionam sem duplicar o registro.
- [ ] Filtro por Área funcionando.
- [ ] Filtro por Subárea funcionando.
- [ ] Filtro por Conteúdo funcionando.
- [ ] Lista/acervo completo acessível sem filtro.
- [ ] Materiais não possuem prazo.

## Conteúdo geral
- [ ] Filtros funcionando conforme cada área.
- [ ] Busca funcionando onde prevista.
- [ ] Links do Drive funcionando.
- [ ] Informações opcionais ausentes não geram elementos vazios, exceto o Prazo de Atividades e listas, que permanece visível com `-` quando ausente.

## Vídeos
- [ ] Biblioteca reutilizável.
- [ ] Classificação Área → Subárea → Conteúdo funcionando.
- [ ] Múltiplas classificações sem duplicação de registro.
- [ ] Prioridades Essencial/Recomendado/Complementar funcionando.
- [ ] Sem campo ativo/inativo.
- [ ] Sem prazo.
- [ ] Miniatura correta 16:9.
- [ ] Modal responsivo.
- [ ] Tela cheia quando suportada.
- [ ] Alternativa para abrir no provedor.
- [ ] Carregamento do iframe após interação quando possível.

## Links
- [ ] Links representam recursos externos, não arquivos de Materiais ou Vídeos.
- [ ] Agrupamento por finalidade quando previsto.
- [ ] Classificação matemática opcional funciona quando usada.
- [ ] Filtros funcionam conforme definidos.
- [ ] Sem prazo.
- [ ] Sem ativo/inativo.
- [ ] Recurso abre no serviço externo apropriado.

## Provas e oportunidades
- [ ] Filtros corretos.
- [ ] Links oficiais corretos.
- [ ] Datas corretas.
- [ ] Regras de prazo funcionando.
- [ ] Uso de materiais de terceiros respeita direitos.

## Comunicação
- [ ] Turma automática.
- [ ] A chamada-resumo não exibe texto redundante de identificação automática da turma.
- [ ] Nome obrigatório.
- [ ] E-mail obrigatório.
- [ ] Motivo obrigatório.
- [ ] Mensagem obrigatória.
- [ ] Nada publicado no site.
- [ ] Dados pessoais fora do GitHub.
- [ ] Sem upload de arquivos por alunos ou visitantes.

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



