# Arquitetura Técnica

Versão: 2.1<br>
Status: APROVADO — PROTÓTIPO DE PROVAS E RESOLUÇÕES<br>
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
- Formspree;
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

## Provas e Resoluções
Nesta etapa existe somente a rota temporária `/validacao-provas-e-resolucoes/`, construída com `BaseLayout`, componentes globais e fixtures locais declaradamente fictícias. Ela pode selecionar estados de demonstração por query string, sem alterar a rota real `/provas-e-resolucoes/`.

Não criar ainda:
- coleção em `content.config.ts`;
- diretório de conteúdo real;
- integração com CMS;
- filtro client-side definitivo;
- página individual;
- arquivos acadêmicos no repositório.

Após a aprovação visual, a implementação real poderá criar coleção própria em arquivos independentes, aplicar o schema documentado, ordenar deterministicamente e filtrar no cliente. Recursos externos usam URLs validadas; links externos usam nova aba e `rel="noopener noreferrer"`; links internos respeitam `BASE_URL`.

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

### Transporte Formspree
O navegador envia diretamente ao Formspree por AJAX, com método `POST`, sem backend próprio, banco de dados, proxy no GitHub, credenciais no cliente ou persistência local das mensagens. O endpoint público aprovado é `https://formspree.io/f/xkjgjoqv`, centralizado em `src/config/contactForm.ts`; ele é configuração pública do transporte e não constitui segredo ou token.

A requisição usa `FormData`, envia o cabeçalho `Accept: application/json` e contém somente:
- `name` — Nome;
- `email` — E-mail;
- `motivo` — Motivo;
- `message` — Mensagem;
- `turma` — `turma.slug` reconhecido ou `contato-geral`;
- `subject` — valor controlado **Mensagem pelo portal Matemática Instrumental**;
- `_gotcha` — honeypot vazio.

Não há campo de upload. Nenhum dado pessoal é inserido na URL, query string, logs deliberados ou armazenamento do navegador. O resultado somente entra em sucesso quando `response.ok`; falha de rede, resposta HTTP não aceita ou erro informado pelo Formspree entram em erro. O retorno é tratado como JSON e não existe redirecionamento automático.

### Estados técnicos
Os estados de interface são `inicial`, `enviando`, `sucesso` e `erro`. A validação HTML nativa é executada antes do transporte. No envio, desabilitar o botão, impedir submissões repetidas e aplicar `aria-busy` ao formulário. No sucesso, limpar Nome, E-mail, Motivo e Mensagem, não reapresentar os dados enviados, preservar Turma, manter a confirmação na mesma página e não redirecionar. No erro, preservar os valores somente na memória da página corrente, reabilitar o botão e permitir nova tentativa.

As mensagens de status devem ser anunciadas de forma acessível. O formulário deve funcionar com teclado e o foco visível deve ser preservado. Os textos são exatamente **“Enviando mensagem…”**, **“Mensagem enviada com sucesso.”** e **“Não foi possível enviar a mensagem. Tente novamente.”**.

### Proteção contra abuso e configuração externa
Formshield está ativo e o CAPTCHA visual permanece desabilitado. O campo `_gotcha` fica visualmente oculto, fora da ordem de teclado, não anunciado por tecnologias assistivas e vazio em submissões legítimas. A opção **Restrict to Domain** será configurada somente após a definição do domínio público final, com o domínio sem `https://`; `localhost` não deve ser incluído. O arquivo de submissões do Formspree permanece habilitado.

### Componentes e implementação definitiva
A composição aprovada da rota `/falar-com-o-professor/` é fornecida pelos componentes em `src/components/contato/`. A resolução do parâmetro `turma` permanece centralizada em um único utilitário e não pode ser reimplementada na rota.

O protótipo temporário `/validacao-falar-com-o-professor/` cumpriu sua função de validação e foi removido após a aprovação do teste manual real. A rota real e seus componentes passam a ser a única referência técnica vigente; o registro visual histórico permanece no `09-MOCKUPS-APROVADOS-v2.7.md`.

### Contrato de configuração
`src/config/contactForm.ts` centraliza somente o endpoint público do Formspree e os valores técnicos controlados necessários ao payload. Não existem `FORM_ACTION_URL`, conceitos `ENTRY_...`, segredo, token ou valor fictício. O endpoint é usado exclusivamente pela rota real de contato.

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

Especificamente no formulário de contato, Nome, E-mail, Motivo e Mensagem não podem integrar conteúdo estático, Git, URL, query string, logs deliberados, analytics, `localStorage`, `sessionStorage`, IndexedDB ou cookies. O site não conserva cópia local das mensagens enviadas. O Formspree é serviço externo, processa e pode armazenar a submissão para encaminhar a mensagem ao professor; seu arquivo de submissões está habilitado.

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
