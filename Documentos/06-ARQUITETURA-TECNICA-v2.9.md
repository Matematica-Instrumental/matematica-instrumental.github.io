# Arquitetura Técnica

Versão: 2.9<br>
Status: APROVADO — PUBLICAÇÃO ATIVA E PAGES CMS (DEC-106)<br>
Última atualização: 26/10/2026

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

O portal é estático e está publicado no GitHub Pages como site de usuário, conforme a DEC-105.

### Estado atual

- repositório público `Matematica-Instrumental/matematica-instrumental.github.io`, branch `main`;
- GitHub Pages ativo com fonte "GitHub Actions";
- workflow `.github/workflows/deploy.yml` com `npm ci`, `npm test`, `npm run build`, upload do artefato `Site/dist` e deploy;
- `actions/setup-node` com Node 22 e `check-latest: true`, pois o Astro 7.4 exige Node 22.23.4 ou superior;
- primeira publicação concluída em 26/10/2026 em `https://matematica-instrumental.github.io/`;
- `astro.config.mjs` com `site: 'https://matematica-instrumental.github.io'` e sem `base`;
- commits com o e-mail noreply do GitHub da conta `Matematica-Instrumental`.

### Arquitetura aprovada (DEC-105)

- conta pessoal proprietária: `Matematica-Instrumental`;
- repositório público único: `matematica-instrumental.github.io`;
- branch canônico de desenvolvimento e fonte do projeto: `main`;
- URL pública planejada: `https://matematica-instrumental.github.io/`;
- `site` planejado no Astro: `https://matematica-instrumental.github.io`;
- nenhum `base` explícito, pois a publicação será servida na raiz `/` de um site de usuário;
- GitHub Pages como hospedagem;
- GitHub Actions como mecanismo de teste, build e deploy por artefato do Pages;
- nenhuma publicação direta dos arquivos fonte por branch/pasta e nenhum branch `gh-pages` como fonte canônica;
- Pages CMS depois da estabilização da publicação, conforme a DEC-106.

O cenário `/Matematica-Instrumental/` permanece evidência histórica de compatibilidade com subcaminho e não representa o `base` definitivo aprovado.

### Automação

O workflow é disparado por `push` em `main`, por `workflow_dispatch` e por `schedule`. O rebuild diário da DEC-077 terá como horário operacional pretendido **00:15 em `America/Sao_Paulo`**, implementado conforme a sintaxe e as capacidades vigentes do GitHub Actions no momento da criação.

Falha de teste ou build bloqueará o deploy. Falhas de deploy permanecerão visíveis e não serão convertidas em sucesso. A execução manual permitirá nova tentativa, sem fallback silencioso; notificações externas adicionais não fazem parte da primeira publicação.

### Exposição pública autorizada

O repositório público incluirá o histórico Git e os arquivos rastreados, inclusive documentação, histórico, referências, mockups, identidade visual e foto institucional quando versionados. Segredos e credenciais permanecem proibidos, `.env` permanece excluído e uma auditoria final será obrigatória antes do primeiro push. A aprovação desta arquitetura não autoriza por si só criar o repositório ou executar o push.

`/validacao-turma/` continuará no build conforme a DEC-076 e ficará acessível por URL direta na primeira publicação, embora permaneça fora da navegação pública.

## Arquivos pedagógicos
PDFs e materiais grandes ficam no Google Drive.
O site guarda metadados e links.

## Conteúdo
Evitar arquivo único gigante. Preferir coleções e arquivos independentes.

Registros reutilizáveis devem ser referenciados sem duplicação quando aparecem em múltiplas classificações ou em Novidades.

## Validação de integridade

`src/content.config.ts` aplica schemas por registro e reutiliza validadores puros de `src/utils/contentIntegrity.ts` para URLs, caminhos, datas e slugs. URLs externas aceitam somente HTTP(S). Recursos que documentalmente admitem arquivo/link aceitam HTTP(S) ou caminho absoluto interno seguro. Ativos editoriais locais mantêm os formatos `/...` e `src/assets/editorial/...`; traversal por `../`, `..\` ou forma codificada é inválido.

As datas continuam normalizadas por `portalDate.ts` como datas civis `YYYY-MM-DD`. O schema valida intervalos locais, publicação em relação ao fim de destaque, validade de Aviso e coerência da liberação programada. Regras que exigem cruzamento de arquivos são concentradas em `contentIntegrity.ts`, sem markup e sem dependência do navegador.

O validador global recebe coleções normalizadas, retorna erros determinísticos e legíveis e verifica:

- IDs declarados e referências existentes;
- slugs de Turma, ano letivo no slug, unicidade global e rotas canônicas;
- colisões entre âncoras derivadas de Segmento/Ano-Série;
- existência de regimes e períodos referenciados;
- 4, 3 ou 2 períodos para regimes bimestral, trimestral ou semestral;
- ordem sequencial, intervalo, cronologia, ausência de sobreposição e coerência com o ano letivo.

O adaptador `contentIntegrityBuild.ts` carrega somente coleções que possuam arquivos e as duas rotas dinâmicas de Turma executam `assertCurrentContentIntegrity()` durante a geração estática. Assim, o build falha antes de publicar um conjunto inconsistente, inclusive quando uma coleção individual passa pelo próprio schema, sem emitir avisos para coleções opcionalmente vazias.

Os testes ficam em `tests/contentIntegrity.test.ts` e usam `node:test` com o suporte nativo a TypeScript do Node definido pelo projeto. `npm test` cobre os casos A–T de URL, caminho, datas, regimes, sobreposição, slug, unicidade de rota e referência. Nenhum pacote foi adicionado.

`/validacao-turma/` permanece no build conforme a DEC-076. Suas fixtures continuam locais à rota técnica, não são carregadas pelas coleções e não participam da validação de conteúdo real.

## CMS
O ambiente de manutenção é o **Pages CMS** (DEC-106), gratuito, configurado por `.pages.yml` na raiz do repositório.

- Gravação direta em `main`; cada gravação gera um commit e dispara teste, build e deploy.
- Conteúdo inválido faz o build falhar; o deploy não acontece e o site anterior permanece no ar.
- Acesso somente pela conta GitHub `Matematica-Instrumental`, com o GitHub App instalado apenas no repositório do portal.
- Arquivos (DEC-109): enviados pelo CMS para `Site/public/arquivos/`, publicados em `/arquivos/…`, até 100 MB cada; links do Google Drive continuam aceitos. Todo arquivo enviado é público.
- Imagens de Matemática além da sala (Fase 2) em `Site/src/assets/editorial/`.
- Listas suspensas editáveis no CMS (DEC-107) e cursos como turmas especiais (DEC-108), em validação.
- Os nomes de arquivo criados pelo CMS seguem o campo `id` do registro, pois o carregador do Astro usa o nome do arquivo como identificador. Em Turmas, o identificador usado pelas referências é o `slug`.

Escopo da Fase 1:
- turmas e arquivamento;
- regimes e períodos letivos;
- itens de Cronograma;
- Atividades e listas;
- Para estudar;
- Trabalhos;
- Materiais;
- Vídeos;
- Links;
- classificações Área → Subárea → Conteúdo.

Fase 2: Avisos, Provas, Oportunidades e Matemática além da sala.

As telas e os campos estão descritos em `CMS-TELAS-E-CAMPOS-v1.0.md`.

## Matemática além da sala
A implementação definitiva usará uma única coleção build-time `matematicaAlem`, com entradas YAML independentes em `src/content/matematica-alem/`. A coleção, o loader e o schema estrito permanecem adiados até a aprovação visual. O schema futuro seguirá a DEC-102 e validará as nove categorias fechadas, campos obrigatórios, URLs HTTP(S), autoria/origem, metadados de direitos de imagem, ação principal única, intervalos de `destaqueNovidades` e os campos editoriais opcionais.

Imagens, quando existirem, serão arquivos locais autorizados sob controle do projeto, preferencialmente em `src/assets/editorial/`, com texto alternativo, crédito e direito documentados. Não haverá hotlink, captura automática, raspagem nem imagem externa apenas para preencher card.

A implementação futura deverá concentrar em utilitário próprio:
- carregamento sem dependência da ordem física dos arquivos;
- exclusão de registros arquivados;
- ordenação por publicação, título pt-BR e ID estável;
- normalização da busca sem acento ou distinção de caixa;
- combinação por lógica E de Busca e Categoria;
- preparação de no máximo uma ação principal real por card;
- destinos internos compatíveis com `BASE_URL` e externos com `rel="noopener noreferrer"`.

Componentes reutilizáveis receberão dados por propriedades e não conterão fixtures. A rota será uma listagem global sem página individual. As coleções pedagógicas existentes `videos` e `links` não serão unificadas, migradas ou consultadas automaticamente; vídeo, leitura, site ou recurso editorial poderá ser indicado somente pela ação principal ou por links relacionados do próprio registro.

Novidades consumirá a coleção original sem duplicá-la, aplicará Novo por dez dias e Destaque inclusivo, sem Atenção, conforme as DEC-096 e DEC-102. O bloco próprio da Home consultará somente registros não arquivados com `destaqueHome: true`, no máximo três, sem preenchimento automático. Essas integrações permanecem fora do protótipo.

O protótipo temporário `/validacao-matematica-alem-da-sala/` é autocontido: mantém fixtures fictícias exclusivamente na rota, usa ilustrações CSS e destinos reservados em `example.invalid`, e permite selecionar apenas estados iniciais de regressão pela query string. Ele não altera a rota real, `src/content.config.ts`, Home, `novidades.ts`, coleções, schemas ou componentes definitivos.

## Oportunidades e Datas
A coleção build-time `oportunidades` usa entradas YAML independentes em `src/content/oportunidades/`, inicia vazia e preservada por `.gitkeep`. O ID estável vem da entrada do content layer e não é duplicado no corpo. O schema estrito da DEC-101 valida categorias, URLs HTTP(S), datas por `portalDate.ts`, pareamento e ordem do período de inscrições, quantidade permitida por tipo de marco, relação entre Realização e Divulgação de resultado, direcionamento Segmento/Ano-Série e intervalo de `destaqueNovidades`.

`src/utils/oportunidades.ts` concentra o contrato de dados e:
- carregar a coleção sem depender da ordem física dos arquivos;
- normalizar textos e busca sem acento ou distinção de caixa;
- ordenar marcos e derivar datas críticas, situação, próximo e último marco;
- excluir da projeção pública itens encerrados além de 90 dias;
- produzir opções de filtro e ordenar a listagem de forma determinística;
- gerar ações somente com destinos reais;
- respeitar `BASE_URL` nos destinos internos.

`src/utils/oportunidadesFilter.ts` concentra a combinação pura dos filtros no cliente. A rota real e o protótipo reutilizam os componentes sem fixtures em `src/components/oportunidades/`. O protótipo temporário `/validacao-oportunidades-e-datas/` mantém fixtures exclusivamente no próprio arquivo e usa query string somente para os estados iniciais de regressão. A rota real `/oportunidades-e-datas/` consulta a coleção vazia e renderiza o estado vazio aprovado.

`novidades.ts` carrega Oportunidades como fonte global ou direcionada por Segmento/Ano-Série, sem referência arbitrária a Turma, e gera no máximo uma Novidade por registro. Encerramento de inscrições e Realização alimentam Atenção; `publicacao` alimenta Novo por sete dias; `destaqueNovidades` alimenta Destaque; a precedência permanece Destaque, Atenção e Novo. A ação derivada aponta para o fragmento estável do registro na listagem real.

## Provas e Resoluções
A coleção build-time `provas` usa o loader YAML opcional em `src/content/provas/`, inicialmente vazio e preservado por `.gitkeep`. O ID estável vem da própria entrada do content layer e não é duplicado no corpo. O schema valida os campos e enums da DEC-100, ano de quatro dígitos, lista não vazia de assuntos, compatibilidade entre Segmento e Ano/Série e destinos externos HTTP(S) ou caminhos internos absolutos do portal.

`src/utils/provas.ts` concentra normalização, validação defensiva das relações, ordenação determinística, preparação de links e derivação das opções de filtro, sem markup. `src/utils/provasFilter.ts` concentra a lógica pura de correspondência client-side. Os componentes definitivos em `src/components/provas/` recebem somente dados preparados e são usados pela rota real.

A filtragem é executada no cliente, sem reload ou persistência. A rota real `/provas-e-resolucoes/` consulta a coleção e, enquanto vazia, renderiza somente o estado vazio aprovado. O protótipo `/validacao-provas-e-resolucoes/` cumpriu a regressão final, foi removido e não é dependência técnica vigente; suas fixtures desapareceram com a rota.

Recursos externos usam nova aba com `rel="noopener noreferrer"`; caminhos internos recebem `BASE_URL`. Não há página individual, CMS, coleção separada de resoluções, arquivos acadêmicos ou material de terceiros no repositório.

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
- aviso administrativo quando a soma ultrapassar o total da etapa, emitido pelo build no log do GitHub Actions, sem bloquear o deploy (DEC-039 ajustada pela DEC-106).

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
Formshield está ativo e o CAPTCHA visual permanece desabilitado. O campo `_gotcha` fica visualmente oculto, fora da ordem de teclado, não anunciado por tecnologias assistivas e vazio em submissões legítimas. **Restrict to Domain** não está disponível no plano gratuito do Formspree e não será configurado (DEC-106). O arquivo de submissões do Formspree permanece habilitado.

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
Novidades consome metadados dos registros existentes e é calculada como projeção no build estático. Não criar coleção, arquivo ou cópia independente de conteúdo para a Home ou para a rota `/novidades/`.

O agregador deve:
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

O bloco `destaqueNovidades` é opcional no registro original e exige `inicio` e `fim` quando existir. Não há opção manual `ocultar`. Os schemas das fontes implementadas validam esse intervalo.

A Home aplica `slice(0, 6)` somente após elegibilidade, estado e ordenação. A rota `/novidades/` apresenta todos os itens ativos e não precisa integrar o menu global. Nenhuma estrutura de histórico é persistida.

O painel vazio preserva sua composição e mostra somente “Nenhuma novidade no momento.”. As ações da visão completa são derivadas das referências de turma e URLs já presentes no registro original; várias turmas são mantidas como vários destinos ordenados, sem escolha arbitrária e sem páginas individuais de detalhe.

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
