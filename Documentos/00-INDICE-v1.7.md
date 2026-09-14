# Índice da Documentação — Matemática Instrumental

Versão: 1.7  
Status: APROVADO  
Última atualização: 23/08/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais.
2. `02-ARQUITETURA-DO-SITE-v1.2.md` — páginas, seções, fluxos de navegação e estrutura da página de turma.
3. `03-DESIGN-SYSTEM-v1.2.md` — identidade visual, paletas, cabeçalho, menus, ícones e responsividade.
4. `04-MODELO-DE-CONTEUDO-v1.4.md` — estrutura vigente de conteúdo, incluindo recursos vinculados, Trabalhos, Materiais e classificação matemática reutilizável.
5. `05-REGRAS-DE-AUTOMACAO-v1.2.md` — Novidades, prazos, estados automáticos e regras temporais.
6. `06-ARQUITETURA-TECNICA-v1.2.md` — tecnologias, hospedagem, Drive, CMS, formulário e regras de edição/publicação.
7. `07-DECISOES-DO-PROJETO-v1.7.md` — registro vigente das decisões aprovadas, incluindo os modelos de Trabalhos e Materiais.
8. `08-CHECKLIST-DE-ACEITE-v1.2.md` — critérios de validação antes da publicação.
9. `09-MOCKUPS-APROVADOS-v1.2.md` — referências visuais aprovadas de desktop, tablet e celular para a página de turma.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `04-MODELO-DE-CONTEUDO-v1.4.md` substitui as versões anteriores do Modelo de Conteúdo. O `07-DECISOES-DO-PROJETO-v1.7.md` substitui as versões anteriores do registro de decisões.

## Atualização v1.7
A DEC-079 aprovou:
- um único `marco` obrigatório por Trabalho, com tipo Entrega ou Apresentação e data obrigatória;
- atenuação derivada do Trabalho a partir do dia seguinte à data do marco;
- `documentoTrabalho` obrigatório, com exatamente um Recurso vinculado;
- `recursosAdicionais` opcional, com um ou vários Recursos vinculados;
- `arquivoLink` obrigatório em Material, com exatamente um Recurso vinculado e sem array;
- `tipo` de Material como texto livre obrigatório;
- classificação matemática embutida e estrita, composta exatamente por `area`, `subarea` e `conteudo`;
- `classificacoes` obrigatório em Material, com uma ou várias entradas sem duplicação do registro.
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
