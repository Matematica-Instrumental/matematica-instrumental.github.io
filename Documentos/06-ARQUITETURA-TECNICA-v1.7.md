# Arquitetura Técnica

Versão: 1.7<br>
Status: APROVADO — ARQUITETURA DE FALAR COM O PROFESSOR<br>
Última atualização: 20/09/2026

A implementação da página de turma foi formalmente liberada em 22/08/2026, após a aprovação da documentação v1.2, dos mockups de desktop, tablet e celular e da ETAPA 23 — checklist pré-implementação.

A liberação autoriza o início da implementação local. Ela não substitui os testes funcionais nem o `08-CHECKLIST-DE-ACEITE-v2.5.md`, que deverá ser executado novamente antes de commit/publicação final.

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
- nome obrigatório;
- e-mail obrigatório;
- motivo obrigatório;
- mensagem obrigatória.

Não haverá upload de arquivos por alunos ou visitantes.

### Identificação da turma
O mecanismo vigente parte de `getTurmaContactHref`, que acrescenta `?turma=<slug>` ao destino. O `slug` é o identificador URL estável e único definido pela DEC-076 e será o valor técnico enviado quando corresponder a um registro real da coleção `turmas`.

A apresentação usa dados resolvidos do registro, no formato `anoSerie — nome`, sem permitir edição. Se o parâmetro estiver ausente, vazio, inválido ou não corresponder a uma Turma real, usar o valor técnico canônico `contato-geral` e exibir **Não se aplica / contato geral**. Não enviar como identificador qualquer texto arbitrário recebido da query string.

### Transporte futuro
O navegador enviará diretamente ao Google Forms por meio de requisição `POST` compatível com o comportamento confirmado do formulário real. Não haverá backend próprio, banco de dados, proxy no GitHub, credenciais no cliente ou persistência local das mensagens.

A integração ficará isolada da apresentação por uma camada de configuração que mapeará os campos internos aos identificadores reais do Google Forms. Nenhuma URL, `entry.xxxxx` ou credencial será criada por aproximação.

Antes da implementação real, deverão ser fornecidos e validados:
- URL real de submissão do Google Form;
- ID real do campo Nome;
- ID real do campo E-mail;
- ID real do campo Motivo;
- ID real do campo Mensagem;
- ID real e confirmação do campo Turma;
- comportamento permitido pelo Google Forms para submissão em página estática e detecção confiável de sucesso ou erro sem redirecionamento automático.

### Estados técnicos
Os estados de interface são `inicial`, `enviando`, `sucesso` e `erro`. No envio, desabilitar o botão para impedir submissões repetidas. No sucesso, limpar e retirar da apresentação Nome, E-mail, Motivo e Mensagem, manter a confirmação na mesma página e não redirecionar automaticamente. No erro, permitir nova tentativa; valores podem permanecer apenas na memória da página corrente e nunca em armazenamento persistente.

As mensagens de status devem ser anunciadas de forma acessível. O formulário deve funcionar com teclado e o foco visível deve ser preservado.

### Protótipo
`/validacao-falar-com-o-professor/` é uma rota temporária, sem URL externa, IDs de campos, envio real ou dados pessoais. Suas variantes são controladas somente por parâmetros técnicos de demonstração. A rota real `/falar-com-o-professor/` permanece inalterada até aprovação visual e autorização de implementação.

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

## Links
Os registros permanecem hospedados em seus serviços externos. A página estática agrupa os registros aplicáveis à turma por `finalidade` e apresenta `Acessar` como link externo simples para a `url` cadastrada.

Requisitos:
- consumir os registros da coleção `links` sem duplicação;
- agrupar por `finalidade` e ordenar grupos e títulos alfabeticamente no locale pt-BR;
- não ordenar por `publicacao`, `acesso`, `tipo` ou classificação;
- não renderizar filtros nem criar JavaScript de busca, filtragem ou ordenação;
- preservar `acesso`, `classificacoes`, `publicacao`, `observacaoProfessor` e `tags` na camada de dados sem renderizá-los;
- abrir a URL externa em nova aba com `rel="noopener noreferrer"` e ícone externo;
- não mostrar URL bruta ou logo e não incorporar modal, iframe, conteúdo externo ou rastreamento;
- manter fixtures ausentes de `LinksView.astro` e da rota real; o protótipo temporário cumpriu a validação, seu layout foi incorporado ao componente real e a página temporária foi removida;
- quando a coleção aplicável à turma estiver vazia, não renderizar componente, filtros, grupos, mensagem ou fixture.

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

Na visão completa de Links não existem controles de filtro: não há busca, finalidade, tipo, Área, Subárea, Conteúdo, JavaScript, filtragem, query string, ordenação visual, contador ou estado de nenhum resultado.

## Novidades
Novidades deve consumir metadados dos registros existentes e ser calculada como projeção no build estático. Não criar coleção, arquivo ou cópia independente de conteúdo para a Home ou para a futura rota `/novidades/`.

O agregador futuro deve:
- consultar somente coleções existentes e aprovadas;
- gerar no máximo um item por chave estável `fonte + ID`;
- admitir conteúdo global sem turma;
- verificar, quando houver audiência de turmas, a existência de pelo menos uma turma não arquivada;
- excluir conteúdo destinado apenas a turmas arquivadas, inclusive se possuir `destaqueNovidades`;
- calcular datas civis por `portalDate.ts`, em `America/Sao_Paulo`;
- calcular um único estado por item, com precedência Destaque, Atenção e Novo;
- ordenar toda a projeção antes de aplicar o limite de seis itens da Home;
- nunca usar a ordem física dos arquivos;
- respeitar o `BASE_URL` ao gerar `/novidades/`, fragmentos e destinos internos.

Avisos preservam `prioridade`, `publicacao` e `validade`. Item de Cronograma pode entrar como Atenção pela `dataPrazo`, mesmo sem `publicacao`.

O bloco futuro `destaqueNovidades` será opcional no registro original e exigirá `inicio` e `fim` quando existir. Não haverá opção manual `ocultar`. O schema e as coleções não são alterados durante a etapa de documentação e prototipação.

A Home futura aplicará `slice(0, 6)` somente após elegibilidade, estado e ordenação. A rota futura `/novidades/` apresentará todos os itens ativos e não precisará integrar o menu global. Nenhuma estrutura de histórico será persistida.

O painel vazio preservará sua composição e mostrará somente “Nenhuma novidade no momento.”. As ações da visão completa serão derivadas das referências de turma e URLs já presentes no registro original; várias turmas serão mantidas como vários destinos ordenados, sem escolha arbitrária e sem páginas individuais de detalhe.

Não criar cópias independentes de conteúdos apenas para exibi-los como Novo, Atenção ou Destaque.

## Privacidade
- sem dados privados de alunos no GitHub;
- sem notas individuais;
- sem upload de alunos/visitantes;
- sem senhas no repositório;
- sem chaves expostas;
- minimizar coleta de dados.

Especificamente no formulário de contato, Nome, E-mail, Motivo e Mensagem não podem integrar conteúdo estático, Git, URL, query string, logs deliberados, analytics, `localStorage`, `sessionStorage`, IndexedDB ou cookies. O site não conserva cópia local das mensagens enviadas.

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
