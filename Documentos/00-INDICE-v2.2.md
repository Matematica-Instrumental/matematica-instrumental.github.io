# Índice da Documentação — Matemática Instrumental

Versão: 2.2  
Status: APROVADO  
Última atualização: 24/08/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais.
2. `02-ARQUITETURA-DO-SITE-v1.5.md` — páginas, seções, fluxos de navegação, estrutura da página de turma e composição responsiva aprovada da visão completa de Cronogramas.
3. `03-DESIGN-SYSTEM-v1.6.md` — identidade visual, paletas, cabeçalho, menus, ícones, responsividade, menu interno mobile e apresentação aprovada da visão completa de Cronogramas.
4. `04-MODELO-DE-CONTEUDO-v1.5.md` — estrutura vigente de conteúdo, incluindo recursos vinculados, classificação matemática reutilizável, Vídeos, Links e vídeos relacionados.
5. `05-REGRAS-DE-AUTOMACAO-v1.4.md` — Novidades, prazos, estados automáticos, classificação temporal e cálculo do Total da etapa.
6. `06-ARQUITETURA-TECNICA-v1.2.md` — tecnologias, hospedagem, Drive, CMS, formulário e regras de edição/publicação.
7. `07-DECISOES-DO-PROJETO-v2.2.md` — registro vigente das decisões aprovadas, incluindo a DEC-084.
8. `08-CHECKLIST-DE-ACEITE-v1.5.md` — critérios de validação antes da publicação, incluindo a visão completa e responsiva de Cronogramas.
9. `09-MOCKUPS-APROVADOS-v1.4.md` — referências visuais aprovadas da página de turma, incluindo o menu interno mobile aberto e a visão completa de Cronogramas.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `02-ARQUITETURA-DO-SITE-v1.5.md` substitui as versões anteriores da Arquitetura do Site. O `03-DESIGN-SYSTEM-v1.6.md` substitui as versões anteriores do Design System. O `04-MODELO-DE-CONTEUDO-v1.5.md` substitui as versões anteriores do Modelo de Conteúdo. O `05-REGRAS-DE-AUTOMACAO-v1.4.md` substitui as versões anteriores das Regras de Automação. O `07-DECISOES-DO-PROJETO-v2.2.md` substitui as versões anteriores do registro de decisões. O `08-CHECKLIST-DE-ACEITE-v1.5.md` substitui as versões anteriores do Checklist de Aceite. O `09-MOCKUPS-APROVADOS-v1.4.md` substitui as versões anteriores do registro de mockups aprovados.

## Atualização v2.2
A DEC-084 aprovou:
- a visão completa de Cronogramas em desktop de 1440 px, tablet de 834 px e mobile de 390 px;
- título, seletor de períodos, destaque derivado do período corrente, Total da etapa separado e as colunas exatas Data/Prazo, Tipo, Descrição/Conteúdo e Valor;
- a tabela de quatro colunas no tablet sem rolagem horizontal;
- o seletor mobile responsivo para dois, três ou quatro períodos, sem rolagem horizontal;
- a apresentação vertical dos itens no mobile, com Data/Prazo e Valor na região superior, Tipo abaixo e Descrição/Conteúdo na sequência;
- a preservação integral das regras das DEC-082 e DEC-083 para item passado e Total da etapa;
- o uso de componente reutilizável alimentado por propriedades, sem fixtures na rota real;
- a preservação do contexto da turma, sem elementos vazios ou conteúdo inventado, quando não houver registros reais suficientes.

## Referências visuais oficiais
Manter na pasta de referências:
- logotipos oficiais;
- símbolo π;
- assinatura da marca;
- foto do professor;
- imagem com as três paletas oficiais;
- mockups aprovados da página de turma para desktop, tablet e celular.

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
