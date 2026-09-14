# Mockups Aprovados — Página de Turma

Versão: 1.3  
Status: APROVADO — ESTADO ABERTO DO MENU INTERNO MOBILE  
Última atualização: 23/08/2026

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

## Regra de aceite visual
Antes de considerar a página de turma concluída, comparar a implementação com as três referências responsivas acima, com o protótipo aprovado do estado aberto do menu interno mobile e executar `08-CHECKLIST-DE-ACEITE-v1.2.md`.
