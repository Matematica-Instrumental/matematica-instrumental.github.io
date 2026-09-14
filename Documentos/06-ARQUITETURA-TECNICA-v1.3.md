# Arquitetura Técnica

Versão: 1.3  
Status: APROVADO — VISÃO COMPLETA DE VÍDEOS
Última atualização: 11/09/2026

A implementação da página de turma foi formalmente liberada em 22/08/2026, após a aprovação da documentação v1.2, dos mockups de desktop, tablet e celular e da ETAPA 23 — checklist pré-implementação.

A liberação autoriza o início da implementação local. Ela não substitui os testes funcionais nem o `08-CHECKLIST-DE-ACEITE-v2.3.md`, que deverá ser executado novamente antes de commit/publicação final.

## Stack prevista
- Astro;
- HTML/CSS/JavaScript;
- Git;
- GitHub;
- GitHub Pages;
- Pages CMS;
- Google Drive;
- Google Forms;
- Google Apps Script opcional.

## ChatGPT
Pode ser usado para planejamento, código, revisão e documentação.
O site publicado não dependerá do ChatGPT nem de API da OpenAI.

## Hospedagem
Site estático, inicialmente no GitHub Pages.

## Arquivos pedagógicos
PDFs e materiais grandes ficam no Google Drive.
O site guarda metadados e links.

## Conteúdo
Evitar arquivo único gigante. Preferir coleções e arquivos independentes.

Registros reutilizáveis devem ser referenciados sem duplicação quando aparecem em múltiplas classificações ou em Novidades.

## CMS
Pages CMS será configurado após a primeira versão funcional.

O CMS deverá permitir manutenção das estruturas aprovadas sem programação cotidiana, incluindo:
- turmas e arquivamento;
- regimes e períodos letivos;
- Cronogramas;
- Atividades e listas;
- Para estudar;
- Trabalhos;
- Materiais;
- Vídeos;
- Links;
- classificações Área → Subárea → Conteúdo.

## Cronogramas
A tabela é editável pelo professor no ambiente de manutenção/CMS.

Na página pública:
- somente leitura;
- nenhuma edição por aluno ou visitante;
- nenhum armazenamento de notas individuais.

Cálculos automáticos permitidos:
- detecção do período corrente por data;
- estado temporal de itens após o prazo;
- soma dos valores individuais;
- aviso administrativo quando a soma ultrapassar o total da etapa.

## Formulário
Um único formulário:
- turma automática;
- nome;
- e-mail obrigatório;
- motivo;
- mensagem.

Não haverá upload de arquivos por alunos ou visitantes.

## Vídeos
Os registros permanecem hospedados no provedor original. A página estática apresenta `miniaturaUrl` em área 16:9 e a ação `Ver vídeo` como link externo simples para a `url` cadastrada.

Requisitos:
- consumir os registros da coleção `videos` sem duplicação;
- ordenar por `publicacao` decrescente e, em empate, por `titulo` crescente no locale pt-BR;
- formatar `duracaoSegundos` pelo helper centralizado existente;
- preservar `provedor` e `tags` na camada de dados sem renderizá-los;
- abrir a URL externa em nova aba com `rel="noopener noreferrer"`;
- não incorporar player, iframe, autoplay, modal, controles de reprodução ou barra de progresso;
- quando a coleção aplicável à turma estiver vazia, não renderizar componente, filtros, cards, mensagem ou fixture.

## Navegação fixa
Nas páginas de turma:
- menu principal do portal persistente durante rolagem;
- menu interno da turma persistente durante rolagem;
- cabeçalho institucional grande não precisa ser persistente;
- evitar sobreposição dos menus sobre o conteúdo;
- prever comportamento específico para desktop, tablet e celular.

## Filtros e classificação
Filtros devem operar sobre os registros existentes sem exigir seleção prévia para exibir a lista completa.

Para estruturas Área → Subárea → Conteúdo:
- filtros podem ser dependentes;
- Subárea deve respeitar a Área selecionada;
- Conteúdo deve respeitar a classificação selecionada;
- registros com múltiplas classificações continuam únicos no armazenamento.

Na visão completa de Vídeos aprovada nesta versão, Busca, Área, Subárea, Conteúdo e Prioridade permanecem apenas visuais: não há JavaScript, filtragem, query string nem dependência dinâmica entre os controles.

## Novidades
Novidades deve consumir metadados dos registros existentes.

Não criar cópias independentes de conteúdos apenas para exibi-los como Novo, Atenção ou Destaque.

## Privacidade
- sem dados privados de alunos no GitHub;
- sem notas individuais;
- sem upload de alunos/visitantes;
- sem senhas no repositório;
- sem chaves expostas;
- minimizar coleta de dados.

## Fluxo
1. documentação;
2. mockup;
3. aprovação do mockup;
4. implementação local;
5. revisão;
6. checklist;
7. commit;
8. publicação;
9. validação responsiva.

## Condição atual
A documentação funcional da página de turma está atualizada nesta versão.

Os mockups visuais de desktop, tablet e celular estão aprovados e a ETAPA 23 foi aprovada.

**Implementação local liberada pela ETAPA 24.**

Antes da publicação, permanecem obrigatórios revisão funcional, execução integral do checklist, validação responsiva, verificação de acessibilidade, links, privacidade, desempenho e ausência de credenciais expostas.
