# Índice da Documentação — Matemática Instrumental

Versão: 2.4  
Status: APROVADO  
Última atualização: 24/08/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais.
2. `02-ARQUITETURA-DO-SITE-v1.6.md` — páginas, seções, fluxos de navegação, estrutura da página de turma e composição responsiva aprovada das visões de Cronogramas e Atividades e listas.
3. `03-DESIGN-SYSTEM-v1.8.md` — identidade visual, paletas, cabeçalho, menus, ícones, responsividade, menu interno mobile e apresentação aprovada das visões de Cronogramas e Atividades e listas, incluindo o refinamento mobile dos metadados.
4. `04-MODELO-DE-CONTEUDO-v1.5.md` — estrutura vigente de conteúdo, incluindo recursos vinculados, classificação matemática reutilizável, Vídeos, Links e vídeos relacionados.
5. `05-REGRAS-DE-AUTOMACAO-v1.4.md` — Novidades, prazos, estados automáticos, classificação temporal e cálculo do Total da etapa.
6. `06-ARQUITETURA-TECNICA-v1.2.md` — tecnologias, hospedagem, Drive, CMS, formulário e regras de edição/publicação.
7. `07-DECISOES-DO-PROJETO-v2.4.md` — registro vigente das decisões aprovadas, incluindo a DEC-086.
8. `08-CHECKLIST-DE-ACEITE-v1.7.md` — critérios de validação antes da publicação, incluindo o refinamento mobile da visão de Atividades e listas.
9. `09-MOCKUPS-APROVADOS-v1.6.md` — referências visuais aprovadas da página de turma, incluindo o refinamento mobile da visão de Atividades e listas.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `02-ARQUITETURA-DO-SITE-v1.6.md` substitui as versões anteriores da Arquitetura do Site. O `03-DESIGN-SYSTEM-v1.8.md` substitui as versões anteriores do Design System. O `04-MODELO-DE-CONTEUDO-v1.5.md` substitui as versões anteriores do Modelo de Conteúdo. O `05-REGRAS-DE-AUTOMACAO-v1.4.md` substitui as versões anteriores das Regras de Automação. O `07-DECISOES-DO-PROJETO-v2.4.md` substitui as versões anteriores do registro de decisões. O `08-CHECKLIST-DE-ACEITE-v1.7.md` substitui as versões anteriores do Checklist de Aceite. O `09-MOCKUPS-APROVADOS-v1.6.md` substitui as versões anteriores do registro de mockups aprovados.

## Atualização v2.4
A DEC-086 refinou a apresentação mobile de Atividades e listas:
- Assunto, Publicação e Prazo permanecem imediatamente abaixo do título;
- os três blocos ocupam exatamente um terço da largura disponível cada, independentemente do comprimento do conteúdo;
- rótulos e valores são centralizados horizontalmente em suas respectivas colunas;
- o hífen do prazo ausente também permanece centralizado no terço de Prazo;
- não se usam larguras determinadas pelo conteúdo, alinhamentos laterais específicos, `margin-left: auto`, `space-between` ou colunas `max-content` no mobile;
- desktop de 1440 px e tablet de 834 px permanecem conforme a DEC-085, sem alteração.

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




