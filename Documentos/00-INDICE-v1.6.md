# Índice da Documentação — Matemática Instrumental

Versão: 1.6  
Status: APROVADO  
Última atualização: 23/08/2026

## Objetivo
Este índice identifica a documentação aprovada vigente do portal **Matemática Instrumental — Professor Adriano Lima Teixeira**.

Em caso de conflito entre propostas antigas, conversas, mockups rejeitados e documentos marcados como **APROVADO**, prevalece a documentação aprovada mais recente.

## Documentos vigentes
1. `01-ESPECIFICACAO-GERAL-v1.2.md` — objetivos, público, princípios e requisitos gerais.
2. `02-ARQUITETURA-DO-SITE-v1.2.md` — páginas, seções, fluxos de navegação e estrutura da página de turma.
3. `03-DESIGN-SYSTEM-v1.2.md` — identidade visual, paletas, cabeçalho, menus, ícones e responsividade.
4. `04-MODELO-DE-CONTEUDO-v1.3.md` — estrutura de turmas, cronogramas, atividades, estudos, recursos vinculados, trabalhos, materiais, vídeos e demais conteúdos.
5. `05-REGRAS-DE-AUTOMACAO-v1.2.md` — Novidades, prazos, estados automáticos e regras temporais.
6. `06-ARQUITETURA-TECNICA-v1.2.md` — tecnologias, hospedagem, Drive, CMS, formulário e regras de edição/publicação.
7. `07-DECISOES-DO-PROJETO-v1.6.md` — registro vigente das decisões aprovadas, incluindo as rotas da turma, a arquitetura temporal e o modelo de recursos vinculados.
8. `08-CHECKLIST-DE-ACEITE-v1.2.md` — critérios de validação antes da publicação.
9. `09-MOCKUPS-APROVADOS-v1.2.md` — referências visuais aprovadas de desktop, tablet e celular para a página de turma.

Os documentos v1.2 permanecem vigentes nas matérias que não foram alteradas por versões ou decisões posteriores. O `04-MODELO-DE-CONTEUDO-v1.3.md` substitui a versão anterior do Modelo de Conteúdo. O `07-DECISOES-DO-PROJETO-v1.6.md` substitui as versões anteriores do registro de decisões.

## Atualização v1.6
A DEC-078 aprovou:
- o modelo embutido reutilizável Recurso vinculado, composto exatamente por nome e URL;
- `recursos` obrigatório, com um ou vários Recursos vinculados, em Atividade/Lista;
- `gabaritoResolucao` opcional, com um ou vários Recursos vinculados;
- uma única `dataLiberacaoGabarito` opcional para controlar a liberação de todo o conjunto;
- `recursos` com um ou vários Recursos vinculados em Para estudar;
- `leiturasRelacionadas` opcional, com uma ou várias entradas do mesmo modelo e sem coleção independente;
- a permanência funcional de `videosRelacionados` como relação opcional com a futura coleção `videos`;
- o adiamento da implementação técnica dessa relação até a coleção `videos` existir;
- a referência tipada a registros reutilizáveis de vídeo, sem duplicação de seus metadados.
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
