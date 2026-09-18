# Regras de Automação

Versão: 1.9<br>
Status: APROVADO — DEC-097 E JANELAS DE NOVIDADES
Última atualização: 18/09/2026

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

### Inscrição futura
Quando a coleção correspondente existir:
- data crítica: `fimInscricoes`;
- permanece de D−7 até D+1, inclusive;
- sai em D+2.

### Prova datada futura
Quando a coleção de Oportunidades e Datas existir:
- data crítica: `dataProva`;
- permanece de D−7 até D+1, inclusive;
- sai em D+2.

Ao vencer sua janela, o registro sai de Novidades, mas não é apagado da origem.

## Destaque
O contrato futuro prevê no registro original o bloco opcional `destaqueNovidades`, contendo obrigatoriamente `inicio` e `fim`.

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

Quando houver itens, a ação **Ver todas** pode levar à rota `/novidades/`. Essa rota futura apresenta todas as Novidades ativas, não precisa entrar no menu global e não mantém histórico próprio.

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
