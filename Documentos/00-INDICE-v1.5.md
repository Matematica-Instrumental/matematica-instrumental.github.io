# Índice da Documentação — Matemática Instrumental

Versão: 1.5  
Status: APROVADO  
Última atualização: 23/08/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais.
2. `02-ARQUITETURA-DO-SITE-v1.2.md` — páginas, seções, fluxos de navegação e estrutura da página de turma.
3. `03-DESIGN-SYSTEM-v1.2.md` — identidade visual, paletas, cabeçalho, menus, ícones e responsividade.
4. `04-MODELO-DE-CONTEUDO-v1.2.md` — estrutura de turmas, cronogramas, atividades, estudos, trabalhos, materiais, vídeos e demais conteúdos.
5. `05-REGRAS-DE-AUTOMACAO-v1.2.md` — Novidades, prazos, estados automáticos e regras temporais.
6. `06-ARQUITETURA-TECNICA-v1.2.md` — tecnologias, hospedagem, Drive, CMS, formulário e regras de edição/publicação.
7. `07-DECISOES-DO-PROJETO-v1.5.md` — registro vigente das decisões aprovadas, incluindo as rotas da turma e a arquitetura temporal do portal.
8. `08-CHECKLIST-DE-ACEITE-v1.2.md` — critérios de validação antes da publicação.
9. `09-MOCKUPS-APROVADOS-v1.2.md` — referências visuais aprovadas de desktop, tablet e celular para a página de turma.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por decisões posteriores. O `07-DECISOES-DO-PROJETO-v1.5.md` substitui as versões anteriores do registro de decisões.

## Atualização v1.5
A DEC-077 aprovou:
- `America/Sao_Paulo` como timezone oficial de todas as regras baseadas em data;
- uma camada centralizada para fornecer a noção de “hoje” do portal;
- a proibição de depender implicitamente de UTC ou do timezone da máquina de build;
- configuração global e tipada para a expiração dos Avisos;
- `SAIR_NO_DIA_SEGUINTE` como modalidade padrão dos Avisos;
- a materialização dos cálculos temporais durante o build estático;
- rebuild e republicação automáticos diários, pouco depois da meia-noite no timezone oficial;
- implementação posterior do workflow junto à infraestrutura de publicação;
- JavaScript no navegador fora da estratégia principal das automações temporais.

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

