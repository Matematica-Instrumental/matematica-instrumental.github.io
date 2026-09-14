# Regras de Automação

Versão: 1.3  
Status: APROVADO — ESTADO TEMPORAL DE ITENS DO CRONOGRAMA
Última atualização: 22/08/2026

## Estados globais de Novidades
- **Novo** — conteúdo recente.
- **Atenção** — prazo ou ação relevante.
- **Destaque** — promoção editorial.

## Regra geral de Novidades
Novas inserções relevantes nas áreas do portal devem gerar automaticamente uma referência em Novidades, sem necessidade de cadastrar a mesma informação duas vezes.

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

## Conteúdo com data objetiva
Conteúdo com data objetiva terá permanência em Novidades calculada automaticamente.

Ao vencer, sai de Novidades, mas não é apagado.

## Inscrição
Concurso, vestibular, ENEM ou processo seletivo:
- permanecer até o dia seguinte ao fim das inscrições.

## Prova
- permanecer até o dia seguinte à data da prova.

## Trabalho
- permanecer em Novidades até o dia seguinte à entrega/apresentação;
- na área Trabalhos, continuar acessível após essa data com apresentação visual atenuada.

## Atividade / Lista com prazo
- permanecer relevante até a data do prazo;
- no dia seguinte ao prazo, pode receber apresentação visual atenuada;
- não remover o registro da área Atividades e listas;
- não exigir campo manual de situação.

## Para estudar
Quando houver data do objetivo:
- manter apresentação normal até a data do objetivo, inclusive;
- a partir do dia seguinte, manter o roteiro acessível com apresentação atenuada;
- não exigir prazo de estudo ou situação manual.

Quando não houver data do objetivo:
- manter apresentação normal até edição ou remoção administrativa.

## Cronogramas — período corrente
O período corrente é calculado automaticamente:

**data inicial ≤ data atual ≤ data final**

- período corrente recebe destaque visual;
- períodos anteriores e futuros permanecem disponíveis com menor ênfase;
- não armazenar campo manual de situação do período.

Pode haver intervalo entre períodos em que nenhum período esteja corrente.

## Cronogramas — itens
A classificação temporal utiliza a noção central de “hoje” no timezone oficial `America/Sao_Paulo`:

- `data/prazo < hoje` → item passado;
- `data/prazo = hoje` → item vigente;
- `data/prazo > hoje` → item futuro/vigente.

O item só passa ao estado passado no dia seguinte à sua data/prazo.

Quando passado:
- permanece acessível e visível no histórico do período;
- recebe simultaneamente atenuação visual discreta e texto riscado (`line-through`);
- o tratamento alcança Data/Prazo, Tipo, Descrição/Conteúdo e Valor;
- não recebe ícone de concluído, checkbox, badge “Passado”, cor de erro, fundo vermelho nem status textual manual;
- não exige atualização manual.

Itens vigentes e futuros mantêm aparência normal, sem atenuação e sem texto riscado.

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
Quando houver gabarito/resolução com data futura de liberação:
- antes da data, não exibir botão de acesso;
- na data de liberação, disponibilizar automaticamente;
- se não houver gabarito, não exibir campo vazio, aviso ou botão desabilitado.

## Aviso com validade
- permanecer até a data definida;
- permitir saída no próprio dia ou no dia seguinte, conforme configuração.

## Conteúdo sem data crítica
Aplicar período padrão configurável em Novidades, inicialmente 7 a 10 dias conforme o tipo.

Exemplos:
- Materiais;
- Vídeos;
- Links;
- outros conteúdos editoriais sem data crítica.

Esses conteúdos permanecem em suas áreas após sair de Novidades.

## Destaque manual
Permitir ativação e data final manual para o estado editorial Destaque.

## Sobrescrita
Automações de Novidades podem ser substituídas manualmente quando houver necessidade editorial.

Estados temporais próprios das áreas, quando definidos como calculados por data, não devem exigir manutenção cotidiana.

## Mensagens relativas
Quando pertinente:
- encerra em X dias;
- encerra amanhã;
- prova amanhã;
- entrega amanhã.

## Apresentação
Preferir série/ano amplo nas Novidades globais quando não houver necessidade de identificar turma específica.

## Histórico
“Ver todas” poderá manter histórico separado do painel compacto.

