# Regras de Automação

Versão: 2.4<br>
Status: APROVADO — CONTRATO DE MATEMÁTICA ALÉM DA SALA
Última atualização: 27/09/2026

## Estados globais de Novidades
- **Destaque** — promoção editorial dentro do intervalo manual aprovado;
- **Atenção** — proximidade de data crítica;
- **Novo** — conteúdo recentemente publicado.

A precedência é **Destaque > Atenção > Novo**. Cada item renderizado recebe no máximo um estado. Não criar outros estados.

## Regra geral de Novidades
Novidades é uma projeção automática das fontes aprovadas. Não existe coleção duplicada de Novidades.

Um registro original gera no máximo uma Novidade, mesmo quando for aplicável a várias turmas. Conteúdo global pode participar sem associação a turma. Conteúdo com audiência de turmas participa somente quando alcançar pelo menos uma turma não arquivada. Conteúdo destinado exclusivamente a turmas arquivadas não participa.

Ao deixar de ser novidade, o conteúdo permanece em sua área de origem.

Áreas da turma abrangidas, conforme aplicável:
- Cronogramas;
- Atividades e listas;
- Para estudar;
- Trabalhos;
- Materiais;
- Vídeos;
- Links;
- Avisos.

Somente coleções existentes alimentam a implementação. Não criar antecipadamente fontes para inscrições, provas datadas ou outros conteúdos cujas coleções ainda não existam.

Todos os cálculos usam datas civis em `America/Sao_Paulo`.

## Janela de Novo
Atividade/Lista sem prazo e Para estudar sem `dataObjetivo`:

**publicacao <= hoje < publicacao + 7 dias**

Conforme a DEC-097, os conteúdos pedagógicos com data crítica a seguir também usam exatamente a janela:

**publicacao <= hoje < publicacao + 7 dias**

- Cronograma com `dataPrazo` e `publicacao`;
- Atividade/Lista com `prazo`;
- Para estudar com `dataObjetivo`;
- Trabalho com `marco.data`.

O primeiro dia é inclusivo e o instante civil `publicacao + 7 dias` já está fora de Novo. Cronograma sem `publicacao` nunca recebe Novo, mas pode receber Atenção pela `dataPrazo`.

Materiais, Vídeos, Links e conteúdo editorial sem data crítica:

**publicacao <= hoje < publicacao + 10 dias**

Se Novo e Atenção coincidirem, apresentar somente Atenção. Se Destaque também estiver ativo, aplicar a precedência **Destaque > Atenção > Novo**. A DEC-097 não altera nenhuma janela de Atenção definida pela DEC-096.

## Janela de Atenção
Atenção começa em **data crítica − 7 dias**, inclusive.

### Cronogramas
- data crítica: `dataPrazo`;
- pode entrar como Atenção mesmo sem `publicacao`;
- permanece de D−7 até D, inclusive;
- sai em D+1.

### Atividade / Lista com prazo
- data crítica: `prazo`;
- permanece de D−7 até D, inclusive;
- sai em D+1.

### Para estudar com data do objetivo
- data crítica: `dataObjetivo`;
- permanece de D−7 até D, inclusive;
- sai em D+1.

### Trabalho
- data crítica: `marco.data`;
- permanece de D−7 até D+1, inclusive;
- sai em D+2;
- na área Trabalhos, continua acessível após a data crítica com apresentação atenuada.

### Oportunidade — encerramento de inscrições
Na coleção de Oportunidades e Datas:
- data crítica: marco de tipo `Encerramento de inscrições`;
- permanece de D−7 até D+1, inclusive;
- sai em D+2.

### Oportunidade — realização
Na coleção de Oportunidades e Datas:
- data crítica: cada marco de tipo `Realização`;
- permanece de D−7 até D+1, inclusive;
- sai em D+2.

Ao vencer sua janela, o registro sai de Novidades, mas não é apagado da origem.

## Destaque
O contrato prevê no registro original o bloco opcional `destaqueNovidades`, contendo obrigatoriamente `inicio` e `fim`.

Durante **inicio <= hoje <= fim**, o item recebe Destaque, que prevalece sobre Atenção e Novo. A presença do bloco não torna elegível conteúdo cuja audiência seja exclusivamente composta por turmas arquivadas.

Não criar coleção de Destaques nem opção manual de ocultação. O schema permanece inalterado nesta etapa.

## Avisos
Avisos preservam suas regras próprias de `prioridade`, `publicacao` e `validade`. A modalidade de validade continua centralizada conforme a DEC-077.

## Ordenação transversal
Ordenar todos os itens ativos antes de aplicar o limite da Home:

1. Destaque;
2. Atenção;
3. Novo.

Dentro de Destaque:
1. fim de destaque crescente;
2. título no locale pt-BR;
3. fonte;
4. ID estável.

Dentro de Atenção:
1. data crítica crescente;
2. título no locale pt-BR;
3. fonte;
4. ID estável.

Dentro de Novo:
1. `publicacao` decrescente;
2. título no locale pt-BR;
3. fonte;
4. ID estável.

A ordem física dos arquivos nunca é critério.

## Limite, visão completa e histórico
A Home apresenta no máximo seis Novidades, depois da elegibilidade, cálculo de estado e ordenação.

Quando houver itens, a ação **Ver todas** pode levar à rota `/novidades/`. Essa rota apresenta todas as Novidades ativas, não precisa entrar no menu global e não mantém histórico próprio.

Itens expirados permanecem somente nas áreas de origem.

## Destinos
Na Home, cada item usa conceitualmente `/novidades/#<chave-estavel>`.

Na visão completa, o registro apresenta ação ou ações para sua origem real:
- para uma turma, ação para a área correspondente;
- para várias turmas, todas as turmas aplicáveis em ordem institucional, sem escolha arbitrária;
- para conteúdo global ou com URL própria, o destino canônico existente.

Não criar páginas individuais de detalhe.

## Estado vazio
Sem Novidades ativas, preservar o painel e mostrar somente **“Nenhuma novidade no momento.”**, sem cards vazios, Ver todas, CTA ou placeholder adicional.

## Cronogramas — período corrente e período selecionado
O período corrente é calculado automaticamente:

**data inicial ≤ data atual ≤ data final**

- dentro de um período, esse período é simultaneamente corrente e selecionado;
- antes do primeiro período, o primeiro período cronológico é selecionado e não há período corrente;
- entre dois períodos, o próximo período cronológico é selecionado e não há período corrente;
- depois do último período, o último período cronológico é selecionado e não há período corrente.

O período selecionado fornece os itens e o Total da etapa exibidos. Ele usa o destaque visual já aprovado, mas recebe a identificação “Período atual” somente quando também é o período corrente. Seleção fora de um intervalo corrente não transforma o período em corrente.

Não armazenar campo manual de situação, período atual ou período selecionado. Ambos os estados são derivados das datas e da noção central de “hoje” no timezone oficial `America/Sao_Paulo`.

## Cronogramas — itens
A classificação temporal utiliza a noção central de “hoje” no timezone oficial `America/Sao_Paulo`:

- `data/prazo < hoje` → item passado;
- `data/prazo = hoje` → item vigente;
- `data/prazo > hoje` → item futuro/vigente.

O item só passa ao estado passado no dia seguinte à sua data/prazo.

Quando passado:
- permanece acessível e visível no histórico do período;
- Data/Prazo, Tipo e Descrição/Conteúdo recebem simultaneamente atenuação visual discreta e texto riscado (`line-through`);
- o Valor permanece visível, conserva o mesmo valor original e não recebe `line-through`;
- não recebe ícone de concluído, checkbox, badge “Passado”, cor de erro, fundo vermelho nem status textual manual;
- não exige atualização manual.

Itens vigentes e futuros mantêm aparência normal, sem atenuação e sem texto riscado.

O estado temporal afeta somente a apresentação visual. Ele não remove o item, não remove nem zera seu valor, não exclui seu valor do Total da etapa e não altera cálculos da etapa.

O Total da etapa é derivado da soma dos valores de todos os itens do período que possuam valor, independentemente de serem passados, vigentes ou futuros.

## Cronogramas — validação de pontos
No ambiente de edição:
- calcular a soma dos valores individuais do período;
- se a soma ultrapassar o valor total da etapa, mostrar aviso administrativo;
- o aviso não deve aparecer para os alunos;
- o aviso não precisa bloquear a gravação.

Não calcular nem exibir:
- pontos previstos;
- pontos já distribuídos;
- saldo a distribuir.

## Matemática além da sala

### Elegibilidade, arquivamento e ordenação
A listagem pública considera somente registros não arquivados. `arquivado: true` é uma decisão editorial manual: retira o registro da página, dos destaques da Home e de Novidades, mas preserva sua fonte. Não há vencimento, expiração nem arquivamento automático.

Os registros elegíveis usam ordem total determinística:
1. `publicacao` decrescente;
2. `titulo` crescente no locale pt-BR;
3. ID estável crescente.

A ordem física dos arquivos nunca é critério.

### Filtros e busca
Os únicos filtros são **Busca** e **Categoria**. O estado inicial usa busca vazia e **Todas as categorias**. Os controles combinam-se por lógica E.

A busca ignora caixa e acentos e procura em `titulo`, `resumo`, `texto`, `categoria`, `autoria`, nomes das `fontes` e `tags`. **Limpar filtros** aparece somente quando existir busca ou categoria ativa e restaura o estado inicial. A implementação definitiva será client-side, imediata, sem reload, persistência ou query string obrigatória.

Sem registros disponíveis, não renderizar filtros ou cards e mostrar exatamente **“Nenhum conteúdo disponível no momento.”**. Sem correspondência, preservar os filtros e mostrar exatamente **“Nenhum conteúdo corresponde aos filtros selecionados.”**.

### Novidades
Um registro não arquivado pode alimentar Novidades por `publicacao <= hoje < publicacao + 10 dias`, em datas civis de `America/Sao_Paulo`. Não há estado Atenção porque o domínio não possui data crítica.

O bloco opcional `destaqueNovidades` mantém vigência inclusiva em `inicio <= hoje <= fim`. Coincidindo Destaque e Novo, prevalece Destaque; cada registro gera no máximo uma Novidade. Ao fim das janelas, o conteúdo permanece na área de origem.

### Destaques da Home
`destaqueHome: true` torna o registro elegível para o bloco próprio de Matemática além da sala na Home. Esse destaque é independente de `destaqueNovidades`: um campo não implica o outro.

A Home mostra no máximo três registros não arquivados marcados, ordenados por `publicacao` decrescente, `titulo` crescente no locale pt-BR e ID estável. Não preencher vagas com itens sem `destaqueHome` e não duplicar conteúdo para manter o bloco.

## Oportunidades e Datas

### Situação automática
Situação é derivada no build a partir dos marcos e de `hoje` em `America/Sao_Paulo`. Nenhum estado diário é persistido. Aplicar a primeira condição verdadeira nesta ordem:

1. **Inscrições abertas** — existe período de inscrições e `abertura <= hoje <= encerramento`;
2. **Inscrições futuras** — existe período de inscrições e `hoje < abertura`;
3. **Realização hoje** — existe marco Realização com `data = hoje`;
4. **Inscrições encerradas** — `hoje > encerramento` e ainda existe Realização com `data > hoje`;
5. **Realização futura** — não há situação anterior e existe Realização com `data > hoje`;
6. **Aguardando resultado** — todas as Realizações já passaram e existe Divulgação de resultado com `data >= hoje`;
7. **Encerrado** — não há inscrição aberta ou futura, Realização presente ou futura nem resultado pendente.

O pareamento obrigatório de Abertura e Encerramento elimina estados incompletos. Um registro sem inscrições pode entrar diretamente como Realização futura ou Realização hoje. Um registro composto somente por período de inscrições fica Encerrado a partir de D+1 do encerramento.

### Novo, Atenção e Destaque
Oportunidades válidas recebem Novo por `publicacao <= hoje < publicacao + 7 dias`, independentemente da categoria. A janela exige `publicacao`; não existe booleano `novidade`.

As datas críticas são os marcos Encerramento de inscrições e Realização. Para cada um, Atenção vale de D−7 até D+1, inclusive, e sai em D+2. Se mais de uma data crítica estiver simultaneamente nessa janela, usar a data mais próxima em ordem crescente; em empate, Encerramento de inscrições precede Realização. Um registro gera no máximo uma Novidade.

`destaqueNovidades` continua opcional, inclusivo em `inicio <= hoje <= fim` e não altera situação nem marcos reais. A precedência permanece **Destaque > Atenção > Novo**. Ao fim de todas as janelas, o item deixa de Novidades e permanece na área de origem enquanto estiver dentro da retenção.

### Próximo marco e ordenação
`proximoMarco` é o primeiro marco com `data >= hoje`, depois da ordenação cronológica aprovada. `ultimoMarco` é o último marco cronológico.

A listagem usa ordem total determinística:
1. itens cuja situação não seja Encerrado;
2. entre eles, `proximoMarco.data` crescente;
3. em empate, situação na ordem Inscrições abertas, Realização hoje, Inscrições futuras, Inscrições encerradas, Realização futura e Aguardando resultado;
4. `titulo` crescente no locale pt-BR;
5. `id` estável;
6. itens Encerrados depois dos demais, por `ultimoMarco.data` decrescente, `titulo` e `id`.

A ordem física dos arquivos nunca é critério.

### Retenção dos encerrados
Um item Encerrado permanece visível enquanto `hoje <= ultimoMarco + 90 dias`. Em `ultimoMarco + 91 dias`, deixa automaticamente a listagem pública. O registro pode continuar no repositório ou CMS; não há exclusão manual diária, campo de arquivamento temporal nem histórico infinito na página.

### Filtros e busca
Busca, Categoria, Situação, Ano, Segmento, Ano/Série e Instituição combinam-se por lógica E. O estado inicial usa busca vazia e Todos em cada seletor. Ano corresponde quando pelo menos um marco pertence ao ano civil selecionado.

A busca ignora caixa e acentos e procura em `titulo`, `instituicao`, `descricao` e `categoria`. Ao mudar Segmento, as opções de Ano/Série são restringidas e seleção incompatível é removida. Item direcionado ao Segmento inteiro corresponde a qualquer Ano/Série institucional daquele Segmento. Item global corresponde a qualquer Segmento ou Ano/Série selecionado.

**Limpar filtros** aparece somente com busca ou filtro ativo e restaura o estado inicial. A implementação é client-side, imediata, sem reload, query string obrigatória ou persistência. Rota real e protótipo usam a mesma lógica; no protótipo, a query string serve somente para selecionar o estado inicial da regressão.

### Estados sem itens
Sem registros disponíveis, não renderizar filtros ou cards e mostrar exatamente **“Nenhuma oportunidade ou data disponível no momento.”**. Sem correspondência, preservar filtros e Limpar filtros e mostrar exatamente **“Nenhuma oportunidade corresponde aos filtros selecionados.”**.

## Provas e Resoluções

### Ordenação
A listagem global usa ordem total determinística:
1. `ano` decrescente;
2. Segmento na ordem institucional: Ensino Fundamental — Anos Finais, depois Ensino Médio;
3. `anoSerie` em ordem natural crescente dentro do Segmento;
4. `tipo` em ordem alfabética crescente no locale pt-BR;
5. `titulo` em ordem alfabética crescente no locale pt-BR;
6. `id` estável como desempate final.

A ordem física dos arquivos nunca é critério.

### Combinação dos filtros
Busca e filtros de Segmento, Ano/Série, Instituição, Ano, Tipo, Fase, Assunto e Dificuldade usam lógica **E**. Dentro de `assuntos`, o registro corresponde quando contém o assunto selecionado.

A busca textual:
- ignora diferenças de maiúsculas/minúsculas e acentos;
- procura em `titulo`, `instituicao`, `fase` e `assuntos`;
- não altera nem persiste os registros.

Ao mudar Segmento, as opções de Ano/Série são recalculadas e um valor incompatível é removido. **Limpar filtros** restaura busca vazia e todos os seletores em **Todos**. O estado sem correspondência preserva os controles; o estado de acervo vazio não os renderiza.

A implementação é client-side, imediata, sem reload, query string obrigatória ou persistência. Rota real e protótipo reutilizam a mesma lógica. No protótipo, a query string serve somente para selecionar estados iniciais de regressão; depois da inicialização, os controles continuam plenamente funcionais.

### Separação de domínios
O `ano` do acervo classifica uma edição e não produz Atenção, prazo ou estado temporal. As regras dos marcos de tipo Realização são exclusivas da coleção `oportunidades`. Provas e Resoluções não participa de Novidades nesta etapa.

## Gabarito / Resolução de Atividade
A disponibilidade usa a noção central de “hoje” no timezone oficial `America/Sao_Paulo`.

Se `gabaritoResolucao` estiver ausente:
- não renderizar campo vazio, aviso, placeholder ou botão desabilitado.

Se houver recursos em `gabaritoResolucao` e não existir `dataLiberacaoGabarito`:
- considerar o conjunto disponível;
- fornecer os Recursos vinculados para apresentação como links.

Se existir `dataLiberacaoGabarito`, uma única data governa todo o conjunto:
- `hoje < dataLiberacaoGabarito` → indisponível para acesso;
- antes da data, não fornecer links nem nomes dos recursos para apresentação;
- antes da data, fornecer somente a data de disponibilidade para formatação como `Disponível em {data formatada}`;
- `hoje >= dataLiberacaoGabarito` → disponível;
- na própria data e depois dela, fornecer os Recursos vinculados normalmente.

Não persistir `liberado`, `status`, `disponível` ou equivalente. O estado é sempre derivado da data centralizada e não deve ser recalculado de forma independente no componente visual.

O HTML estático materializa o estado no build. A atualização automática publicada continua dependendo do rebuild diário previsto pela DEC-077.

## Mensagens relativas
Quando pertinente:
- encerra em X dias;
- encerra amanhã;
- prova amanhã;
- entrega amanhã.

## Apresentação
Preferir série/ano amplo nas Novidades globais quando não houver necessidade de identificar turma específica.

## Organização global da página Turmas
A listagem global de turmas é derivada dos registros disponíveis e usa ordenação determinística, sem controle de ordenação na interface:

1. segmentos na ordem institucional/documental vigente, e não em ordem alfabética quando houver divergência;
2. anos/séries em ordem natural crescente dentro do segmento;
3. turmas não arquivadas antes das arquivadas dentro do mesmo ano/série;
4. dentro de cada grupo de arquivamento, campo `ordem` crescente;
5. nome/título da turma como desempate estável.

A ordenação natural deve interpretar a progressão numérica de anos/séries e não pode usar comparação puramente lexicográfica quando o resultado for pedagogicamente incorreto.

Turmas arquivadas permanecem no respectivo ano/série, continuam acessíveis e usam exatamente “Turma arquivada — ano letivo encerrado”, sem estado ou rótulo “inativa”.

Quando a consulta global não retornar nenhuma turma, preservar Header, menu global, título **Turmas** e Footer e mostrar somente “Nenhuma turma disponível no momento.” após o título. Não gerar cards vazios, filtros, CTA, cadastro, matrícula ou mensagem de erro.
