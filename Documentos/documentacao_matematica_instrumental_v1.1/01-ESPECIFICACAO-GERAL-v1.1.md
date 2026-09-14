# Especificação Geral do Portal

Versão: 1.1  
Status: APROVADO  
Última atualização: 21/08/2026

## Identidade
Nome: **Matemática Instrumental**  
Responsável: **Professor Adriano Lima Teixeira**

## Público
Estudantes do Ensino Fundamental — Anos Finais e Ensino Médio.

## Objetivo
Oferecer um portal educacional organizado, profissional e simples de manter para:
- atividades e listas;
- roteiros de estudo orientados a objetivos;
- avisos;
- trabalhos;
- cronogramas de distribuição de pontos;
- materiais pedagógicos;
- vídeos, podcasts, artigos, portais e sites;
- provas e resoluções;
- concursos, vestibulares, ENEM, processos seriados, olimpíadas e oportunidades;
- divulgação matemática;
- comunicação privada aluno → professor.

## Princípios
O portal deverá ser:
- profissional;
- atraente;
- intuitivo;
- funcional;
- responsivo;
- rápido;
- escalável;
- simples de manter;
- orientado a conteúdo reutilizável, evitando duplicação desnecessária;
- independente do ChatGPT em produção.

## Restrições
- sem cadastro de alunos;
- sem comentários públicos;
- sem armazenamento de notas individuais;
- sem upload de arquivos por alunos ou visitantes;
- arquivos pedagógicos no Google Drive;
- sem dependência de API da OpenAI;
- compatível com hospedagem gratuita.

## Manutenção
Deve ser possível criar e editar, sem programação cotidiana:
- anos letivos;
- turmas;
- regimes e períodos letivos;
- cronogramas de distribuição de pontos;
- atividades e listas;
- avisos;
- roteiros de estudo;
- trabalhos;
- materiais;
- vídeos;
- links e recursos externos;
- provas resolvidas;
- oportunidades;
- curiosidades, personalidades, leituras e sites recomendados.

## Crescimento
A estrutura deve suportar muitos anos, dezenas de turmas e grande volume de conteúdos com filtros, busca, classificação e arquivamento.

Conteúdos matemáticos que exijam classificação temática poderão usar a hierarquia:

**Área → Subárea → Conteúdo**

Um mesmo registro poderá possuir múltiplas classificações quando o conteúdo pertencer a mais de uma área, subárea ou conteúdo.

## Página de turma
Cada turma terá uma área própria, organizada por:

**Segmento → Ano/Série → Turma**

A navegação interna será:

**Início da turma | Cronogramas | Atividades e listas | Para estudar | Trabalhos | Materiais | Vídeos | Links**

O contexto da turma deve permanecer claro em todas as áreas.

## Novidades
Novas inserções relevantes nas áreas da turma devem alimentar automaticamente as informações de Novidades, sem duplicar o conteúdo original.

O conteúdo deixa de ser novidade conforme as regras automáticas, mas permanece em sua área de origem.

## Imagens
Imagens externas só poderão ser usadas se forem:
- próprias;
- de domínio público; ou
- licenciadas para reprodução.

Quando aplicável, registrar autor, fonte, licença e URL da licença.

## Comunicação
Campos mínimos:
- turma automática;
- nome obrigatório;
- e-mail obrigatório;
- motivo obrigatório;
- mensagem obrigatória.

A comunicação é privada e não publica mensagens no portal.

## Responsividade
Desktop, tablet e celular terão adaptações próprias de layout.

Menus e componentes devem ser reorganizados conforme o dispositivo, e não apenas reduzidos.
