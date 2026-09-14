# Mockups Aprovados — Página de Turma

Versão: 1.7  
Status: APROVADO — ALINHAMENTO DOS METADADOS DE ATIVIDADES E LISTAS  
Última atualização: 24/08/2026

## Objetivo
Registrar as referências visuais específicas aprovadas para a página de turma. Estes mockups complementam a documentação funcional e o Design System.

A implementação deverá respeitar o conteúdo dos documentos aprovados e usar estes mockups como referência visual. Em caso de conflito, prevalece a documentação aprovada mais recente; qualquer alteração visual relevante deve ser documentada antes de ser implementada.

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
- Referência visual local temporária: `Site/src/pages/validacao-cronogramas.astro`.
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
- Situação: alteração de requisito aprovada em 24/08/2026.
- Referência visual local temporária: `Site/src/pages/validacao-atividades-listas.astro`.
- Larguras de validação: desktop de **1440 px**, tablet de **834 px** e mobile de **390 px**.
- filtros, cores, borda lateral amarela, divisórias, largura geral da área, selos de Tipo, textos das fixtures e elementos compartilhados permanecem preservados.

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

## Regra de aceite visual
Antes de considerar a página de turma concluída, comparar a implementação com as três referências responsivas da página de turma, com o protótipo aprovado do estado aberto do menu interno mobile, com as visões completas de Cronogramas e Atividades e listas em 1440 px, 834 px e 390 px e executar `08-CHECKLIST-DE-ACEITE-v1.8.md`.






