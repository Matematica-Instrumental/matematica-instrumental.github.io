# Modelo de Conteúdo

Versão: 2.2<br>
Status: APROVADO — COLEÇÃO REAL DE OPORTUNIDADES E DATAS<br>
Última atualização: 20/09/2026

## Princípio
Evitar um único arquivo gigante. Usar registros independentes e reutilizáveis.

Conteúdo não deve ser duplicado apenas para aparecer em Novidades ou em mais de uma classificação.

## Recurso vinculado
Estrutura embutida reutilizável para registros que precisam associar arquivos ou links.

Cada Recurso vinculado possui exatamente:
- nome;
- URL.

Regras:
- não constitui coleção independente;
- não possui id próprio;
- fica embutido no registro que o utiliza;
- pode representar arquivo do Google Drive, documento ou outro link associado;
- não inclui tipo, status, prioridade, descrição ou qualquer outro campo nesta versão.

A implementação técnica poderá usar um schema Zod reutilizável para evitar repetição, sem transformar Recurso vinculado em entidade independente.

## Classificação matemática
Estrutura embutida reutilizável para Materiais, Vídeos e outros conteúdos que utilizem classificação temática estruturada.

Hierarquia conceitual:

**Área → Subárea → Conteúdo**

Cada classificação contém exatamente:
- `area`;
- `subarea`;
- `conteudo`.

Regras:
- um registro pode possuir uma ou várias classificações, conforme o modelo da entidade;
- classificações múltiplas não duplicam o registro;
- a estrutura não constitui coleção independente nesta etapa;
- a implementação poderá usar um schema Zod embutido reutilizável e estrito;
- não adicionar outros campos à classificação nesta versão.

Exemplo de múltiplas classificações para um único registro:
- Geometria → Geometria Plana → Semelhança de Triângulos;
- Álgebra → Proporcionalidade → Razões e Proporções.

## Turma
Campos:
- id;
- nome;
- slug;
- segmento;
- ano/série;
- turma;
- ano letivo;
- descrição, opcional;
- arquivada, quando aplicável;
- ordem.

Não usar campo `ativa/inativa`.

Na interface pública, turma arquivada deve ser indicada por mensagem útil, sem rótulo “inativa”.

## Regime letivo
Campos:
- id;
- nome;
- ano letivo;
- tipo: bimestral / trimestral / semestral;
- turma(s), quando necessário.

Quantidade de períodos:
- bimestral: 4;
- trimestral: 3;
- semestral: 2.

## Período letivo
Campos:
- id;
- regime letivo;
- nome: 1º Bimestre, 2º Trimestre, 1º Semestre etc.;
- data inicial;
- data final;
- valor total da etapa;
- ordem.

O estado de período corrente deve ser calculado pelas datas e não armazenado como situação manual.

## Item de Cronograma
Campos:
- id;
- período letivo;
- turma(s);
- data/prazo;
- tipo;
- descrição/conteúdo;
- valor individual;
- publicação, quando necessário para Novidades;
- ordem, quando necessário.

Não incluir:
- notas individuais;
- pontos previstos;
- pontos distribuídos;
- campo manual de situação.

A soma dos valores dos itens pode ser validada contra o valor total da etapa.

## Atividade / Lista
Campos:
- id;
- tipo: Atividade / Lista de exercícios;
- título;
- descrição;
- assunto;
- segmento;
- ano/série;
- turma(s);
- publicação;
- prazo, opcional;
- recursos, um ou vários Recursos vinculados;
- vídeos relacionados, opcionais;
- tags;
- gabarito/resolução, opcional;
- data de liberação do gabarito, opcional.

Quando `descricao` estiver ausente, a interface não renderiza nem reserva espaço para esse conteúdo.

### Recursos de Atividade / Lista
O campo `recursos` é obrigatório e contém um ou vários Recursos vinculados.

Cada item possui somente:
- nome;
- URL.

### Gabarito / Resolução
O campo técnico `gabaritoResolucao` é opcional.

Quando presente:
- contém um ou vários Recursos vinculados;
- cada item possui somente nome e URL;
- pode reunir Gabarito, Resolução comentada ou ambos.

O campo técnico `dataLiberacaoGabarito` é opcional. Quando informado, uma única data controla a liberação de todo o conjunto existente em `gabaritoResolucao`.

Não criar data de liberação individual por recurso.

Quando `gabaritoResolucao` estiver ausente:
- não renderizar campo vazio;
- não renderizar aviso;
- não renderizar botão desabilitado.

Não usar campo manual de situação.

### Vídeos relacionados de Atividade / Lista
O campo técnico `videosRelacionados` é opcional.

Quando presente:
- é uma lista;
- contém uma ou mais referências tipadas para registros da coleção `videos`;
- não admite array vazio.

Quando ausente, a Atividade/Lista não possui vídeo relacionado.

Não representar a relação por:
- string livre;
- URL duplicada;
- título duplicado;
- objeto parcial do vídeo;
- id sem referência de coleção.

Título, URL, miniatura, duração, provedor, prioridade, classificações, descrição, publicação e demais metadados permanecem exclusivamente no registro original de Vídeo.

## Para estudar
Campos:
- id;
- `titulo`, obrigatório;
- `objetivo`, obrigatório;
- `tipoObjetivo`, opcional;
- `dataObjetivo`, opcional;
- `resumoOrientacao`, obrigatório;
- assunto;
- segmento;
- ano/série;
- turma(s);
- recursos, um ou vários Recursos vinculados;
- `videosRelacionados`, opcional;
- `leiturasRelacionadas`, opcional;
- tags;
- publicação.

### Título, objetivo e tipo de objetivo
`titulo` e `objetivo` são campos distintos e obrigatórios.

O título identifica o registro. O objetivo contém a finalidade pedagógica que o estudante deve estudar ou preparar e não deve ser substituído pelo título nem por uma classificação resumida.

`tipoObjetivo` permanece opcional no modelo. Nesta versão:
- não existe taxonomia controlada aprovada para o campo;
- não existe tratamento visual aprovado;
- sua ausência não permite inferência automática;
- seus valores não são renderizados na visão pública Para estudar;
- exemplos editoriais anteriores como prova, recuperação, concurso, vestibular, ENEM ou olimpíada não constituem enum nem substituem o conteúdo obrigatório de `objetivo`.

Não remover `tipoObjetivo` do schema e não criar novo campo persistido apenas para apresentação.

### Data do objetivo
`dataObjetivo` é opcional e usa a data civil canônica do portal.

O rótulo público aprovado é `DATA`; isso não renomeia o campo técnico. Quando ausente, a interface não apresenta placeholder, hífen ou espaço reservado.

O estado atenuado é derivado de `dataObjetivo` e da noção central de hoje, sem campo persistido de status. Na própria data, o registro permanece normal e somente no dia seguinte passa a apresentação atenuada.

### Recursos de Para estudar
O campo `recursos` contém um ou vários Recursos vinculados.

Cada item possui somente:
- nome;
- URL.

Não criar estrutura adicional.

### Leituras relacionadas
O campo técnico `leiturasRelacionadas` é opcional e contém uma ou várias entradas no mesmo modelo de Recurso vinculado:
- nome;
- URL.

Não criar coleção independente de Leituras para este campo. Essa regra não impede conteúdos editoriais próprios no futuro.

### Vídeos relacionados de Para estudar
O campo técnico `videosRelacionados` é opcional.

Quando presente:
- é uma lista;
- contém uma ou mais referências tipadas para registros da coleção `videos`;
- não admite array vazio.

Quando ausente, o registro de Para estudar não possui vídeo relacionado.

Não representar a relação por:
- string livre;
- URL duplicada;
- título duplicado;
- objeto parcial do vídeo;
- id sem referência de coleção.

Título, URL, miniatura, duração, provedor, prioridade, classificações, descrição, publicação e demais metadados permanecem exclusivamente no registro original de Vídeo.

Não incluir:
- prazo de estudo manual;
- situação manual;
- notas;
- pontos.

## Trabalho
Campos:
- id;
- título;
- descrição breve, opcional;
- assunto;
- segmento;
- ano/série;
- turma(s);
- publicação;
- `marco`, obrigatório:
  - `tipo`: Entrega | Apresentação;
  - `data`, obrigatória;
- `documentoTrabalho`, obrigatório:
  - nome;
  - URL;
- `recursosAdicionais`, opcionais:
  - um ou vários Recursos vinculados, cada um com nome e URL;
- tags.

### Marco de Trabalho
Cada Trabalho possui exatamente um marco principal obrigatório.

O registro escolhe:
- Entrega + data; ou
- Apresentação + data.

Nesta versão:
- não permitir simultaneamente um marco de Entrega e outro de Apresentação;
- não criar múltiplos eventos;
- não criar datas separadas de entrega e apresentação;
- não criar etapas nem cronograma próprio do Trabalho.

Na data do marco, o Trabalho permanece com apresentação normal. A partir do dia seguinte, permanece acessível com apresentação atenuada, derivada por data e nunca persistida como situação manual.

### Documento do Trabalho
`documentoTrabalho` contém exatamente um Recurso vinculado obrigatório:
- nome;
- URL.

Esse documento reúne todas as orientações do Trabalho. Não criar estrutura paralela nem múltiplos documentos principais.

### Recursos adicionais do Trabalho
`recursosAdicionais` é opcional.

Quando presente:
- contém um ou vários Recursos vinculados;
- cada item possui somente nome e URL.

Arquivos complementares pertencem a esse campo. Sua ausência não gera elemento vazio na interface.

Não incluir campos próprios para:
- forma de realização;
- forma de entrega;
- etapas;
- pontuação;
- situação manual.

Não haverá upload de arquivos por alunos ou visitantes.

## Aviso
Campos:
- título;
- texto;
- público;
- segmento;
- ano/série;
- turma(s);
- publicação;
- validade;
- prioridade.

## Material
Cada registro corresponde a exatamente um material e exatamente um arquivo/link.

Campos:
- id;
- título;
- descrição, opcional;
- `tipo`, texto livre obrigatório;
- `classificacoes`, uma ou várias;
- publicação;
- segmento;
- ano/série;
- turma(s);
- `arquivoLink`, obrigatório:
  - nome;
  - URL;
- tags, opcionais.

### Arquivo/link do Material
`arquivoLink` contém exatamente um Recurso vinculado obrigatório:
- nome;
- URL.

Não admitir array nesse campo. Um Material com vários arquivos deve ser modelado como vários registros de Material.

### Classificação de Material
`classificacoes` é obrigatório e contém uma ou várias classificações matemáticas.

Cada classificação possui exatamente:
- `area`;
- `subarea`;
- `conteudo`.

Um Material pode pertencer a múltiplas classificações, inclusive em áreas ou subáreas distintas, sem duplicação do registro.

### Tipo de Material
`tipo` é texto livre obrigatório nesta versão.

Não criar enum fechado enquanto não houver vocabulário controlado aprovado documentalmente. Exemplos editoriais não constituem valores de enum.

Não incluir:
- prazo;
- ativo/inativo;
- prioridade;
- dificuldade;
- estado temporal.

## Vídeo
Biblioteca reutilizável de registros únicos, que podem ser referenciados por diferentes conteúdos sem duplicação.

Campos:
- `id`;
- `titulo`;
- `descricao`;
- `url`, obrigatória;
- `provedor`, obrigatório: YouTube / Vimeo / Outro;
- `miniaturaUrl`, obrigatória;
- `duracaoSegundos`, obrigatória;
- `prioridade`, obrigatória: Essencial / Recomendado / Complementar;
- `classificacoes`, uma ou várias;
- `segmento`;
- `anoSerie`;
- `turmas`, quando necessário;
- `tags`;
- `publicacao`.

### URL do Vídeo
`url` é uma string URL válida e obrigatória.

Identifica a página ou o recurso do vídeo no provedor. Não utilizar Recurso vinculado neste campo e não duplicar nome e URL em outro objeto.

### Provedor do Vídeo
`provedor` é obrigatório e utiliza enum controlado:
- YouTube;
- Vimeo;
- Outro.

Não usar texto livre. A opção Outro permite registrar um provedor não enumerado sem alteração do schema e poderá orientar futuramente o comportamento do player ou modal.

### Miniatura do Vídeo
`miniaturaUrl` é uma string URL válida e obrigatória.

A miniatura é cadastrada explicitamente. Não depender de consulta ao provedor, geração automática, scraping ou API externa durante o build.

A proporção 16:9 é requisito de apresentação. A interface deve exibir a imagem em área 16:9 com tratamento visual apropriado, independentemente de suas dimensões originais.

Não criar entidade ou Recurso vinculado para a miniatura.

### Duração do Vídeo
`duracaoSegundos` é um número inteiro positivo e constitui a representação canônica da duração.

Exemplos:
- 08:42 corresponde a 522 segundos;
- 12:15 corresponde a 735 segundos.

Não persistir a duração canônica como texto MM:SS. A interface deve formatar o valor como MM:SS ou, quando necessário, HH:MM:SS.

### Prioridade do Vídeo
`prioridade` é obrigatória e usa enum fechado:
- Essencial;
- Recomendado;
- Complementar.

Não adicionar outros valores sem atualização documental. Prioridade não é status temporal.

### Classificações de Vídeo
`classificacoes` é obrigatório e contém uma ou mais classificações matemáticas.

Cada classificação contém exatamente:
- `area`;
- `subarea`;
- `conteudo`.

Um mesmo Vídeo pode possuir múltiplas classificações sem duplicação do registro. Não criar coleção independente de classificação.

### Publicação e ordenação de Vídeos
`publicacao` é a data em que o registro passa a integrar e ser publicado na biblioteca do portal.

Não criar uma segunda data de inclusão.

A ordenação padrão da biblioteca e dos resumos é:
1. `publicacao` em ordem decrescente;
2. `titulo` como desempate determinístico.

Os registros mais recentes aparecem primeiro.

Não incluir em Vídeo:
- prazo;
- ativo/inativo;
- estado temporal;
- dificuldade;
- pontuação.

## Prova / Resolução
A entidade representa um item único do acervo global e não uma prova interna de Turma ou uma data de Oportunidades e Datas.

### Campos obrigatórios
- `id` — identificador estável e único gerado pelo loader a partir do caminho do arquivo da entrada, sem duplicação no corpo;
- `titulo` — texto;
- `ano` — inteiro de quatro dígitos referente à edição da prova;
- `segmento` — enum institucional vigente;
- `anoSerie` — valor institucional compatível com o Segmento;
- `tipo` — enum fechado de tipo de prova;
- `instituicao` — texto;
- `assuntos` — lista não vazia de textos;
- `prova` — Recurso vinculado `{ nome, url }` com destino oficial válido;
- `fonte` — Recurso vinculado `{ nome, url }` que identifica a origem oficial.

### Campos opcionais
- `fase` — texto livre para a nomenclatura usada pela instituição;
- `dificuldade` — enum fechado;
- `descricao` — texto;
- `resolucao` — um Recurso vinculado `{ nome, url }`;
- `condicaoUso` — texto estritamente factual sobre licença ou condição de uso verificável;
- `tags` — lista de textos para organização editorial.

### Taxonomias
`segmento` usa exatamente:
- `Ensino Fundamental — Anos Finais`;
- `Ensino Médio`.

`anoSerie` usa o vocabulário institucional compatível:
- Ensino Fundamental — Anos Finais: `6º ano`, `7º ano`, `8º ano`, `9º ano`;
- Ensino Médio: `1º ano`, `2º ano`, `3º ano`.

`tipo` usa exatamente:
- `ENEM`;
- `Vestibular`;
- `Concurso`;
- `Processo seriado`;
- `Olimpíada`;
- `Avaliação institucional`.

`dificuldade`, quando presente, usa exatamente:
- `Básica`;
- `Intermediária`;
- `Avançada`.

`instituicao`, `fase` e os itens de `assuntos` são textos livres normalizados; suas opções de filtro são derivadas dos valores reais e ordenadas no locale pt-BR. Não existe filtro de disciplina, pois o portal é exclusivamente de Matemática.

### Resolução opcional
Uma Prova pode ser publicada sem `resolucao`. `prova` permanece obrigatória e acessível. A ausência de resolução não cria campo vazio, botão desabilitado, placeholder ou status. Quando presente, a resolução é um único recurso associado ao mesmo registro.

### Escopo e relações
Cada registro pertence a um Segmento e a um Ano/Série e não possui associação direta com Turmas. Não duplicar o item por turma. O campo `ano` classifica a edição do acervo e não equivale aos marcos de tipo `Realização` de Oportunidades e Datas. Esta entidade não recebe, nesta etapa, `publicacao`, `destaqueNovidades` ou estado temporal.

O schema está implementado na coleção `provas` de `content.config.ts`. Cada entrada real será um arquivo YAML independente em `src/content/provas/`; a pasta inicia vazia e preservada por `.gitkeep`, sem fixture ou conteúdo acadêmico fictício.

## Oportunidade / Data
A entidade representa uma oportunidade acadêmica ou evento com temporalidade pública. É global por padrão e pode possuir direcionamento amplo por Segmento e Ano/Série, sem referência direta a Turmas.

### Campos obrigatórios
- `id` — identificador estável e único derivado pelo loader do caminho da entrada, sem duplicação no corpo;
- `titulo` — texto não vazio;
- `categoria` — enum fechado;
- `descricao` — texto não vazio;
- `instituicao` — texto não vazio com o organizador ou instituição responsável;
- `publicoAlvo` — texto não vazio;
- `publicacao` — data civil canônica;
- `marcos` — lista não vazia de marcos temporais;
- `linkOficial` — URL HTTP(S) válida da página oficial;
- `fonte` — objeto estrito com `nome` não vazio e `url` HTTP(S) válida.

### Campos opcionais
- `direcionamento` — lista não vazia de objetos `{ segmento, anosSeries? }`; ausência significa item global;
- `local` — texto não vazio, quando houver local físico ou virtual relevante;
- `inscricaoUrl` — URL HTTP(S) válida;
- `regulamentoUrl` — URL HTTP(S) válida;
- `resultadoUrl` — URL HTTP(S) válida;
- `destaqueNovidades` — bloco `{ inicio, fim }` da DEC-096;
- `condicaoUso` — texto factual não vazio, somente quando houver informação verificável.

Não criar `novidade`, `situacao`, `ano`, `dataCritica`, `encerrada`, `ordem`, `arquivada` ou booleanos temporais persistidos. Novidade, situação, anos disponíveis, próximo marco, data crítica ativa, encerramento, retenção e ordenação são projeções derivadas.

O schema está implementado na coleção `oportunidades` de `content.config.ts`. Cada entrada real será um arquivo YAML independente em `src/content/oportunidades/`; a pasta inicia vazia e preservada por `.gitkeep`, sem fixture ou oportunidade fictícia.

### Categorias
`categoria` aceita exatamente:
- `ENEM`;
- `Vestibular`;
- `CEFET/Instituto Federal`;
- `Processo seriado`;
- `Concurso`;
- `Olimpíada`;
- `Evento`.

### Marco temporal
Cada item de `marcos` é um objeto estrito composto exatamente por:
- `tipo` — enum;
- `rotulo` — texto não vazio e inequívoco para apresentação;
- `data` — data civil canônica.

`tipo` aceita exatamente:
- `Abertura de inscrições`;
- `Encerramento de inscrições`;
- `Realização`;
- `Divulgação de resultado`.

Abertura e Encerramento de inscrições são opcionais, mas, quando uma existir, a outra é obrigatória. Cada uma aparece no máximo uma vez e Abertura não pode ser posterior a Encerramento. Pode haver uma ou várias Realizações. Divulgação de resultado aparece no máximo uma vez e não pode preceder a última Realização. O registro deve possuir ao menos uma data crítica: Encerramento de inscrições ou Realização.

Encerramento de inscrições e Realização são críticos para Atenção. Abertura de inscrições e Divulgação de resultado são informativos. Essa propriedade decorre de `tipo` e não é armazenada como booleano. Marcos são exibidos por data crescente; em empate, seguem a ordem dos quatro tipos acima e depois `rotulo` no locale pt-BR.

### Direcionamento
Cada entrada de `direcionamento` contém:
- `segmento` — `Ensino Fundamental — Anos Finais` ou `Ensino Médio`;
- `anosSeries` — lista opcional e não vazia com valores compatíveis com o Segmento.

Sem `anosSeries`, o item alcança todo o Segmento. Sem `direcionamento`, alcança todo o público do portal. Não associar uma Oportunidade a Turma individual nem duplicar o registro por audiência. Os filtros e Novidades usam a descrição ampla do direcionamento.

### Ações derivadas
`linkOficial` produz **Ver oportunidade**. `inscricaoUrl` produz **Inscrever-se** somente durante Inscrições abertas. `regulamentoUrl` produz **Ver regulamento**. `resultadoUrl` produz **Ver resultado** somente quando existir marco Divulgação de resultado com `data <= hoje`. URL ausente nunca produz ação, botão desabilitado ou placeholder.

### Campos deliberadamente ausentes
Não incluir `tags` nesta versão, pois o modelo anterior não as justificava para a área. Não copiar edital, prova, regulamento ou outro material de terceiro para o repositório; guardar somente metadados e links oficiais. `condicaoUso` não é obrigatória nem inferida.

## Curiosidade / Divulgação
- título;
- resumo;
- categoria;
- texto;
- imagem;
- licença da imagem;
- vídeo;
- links;
- tags;
- publicação.

## Link
Área de sites, plataformas, simuladores, calculadoras, ferramentas e serviços externos recomendados.

Campos:
- `id`;
- `titulo`;
- `descricao`;
- `url`, obrigatória;
- `segmento`;
- `anoSerie`, quando aplicável;
- `turmas`, quando aplicável;
- `finalidade`, obrigatória;
- `tipo`, obrigatório;
- `classificacoes`, opcionais e múltiplas;
- `acesso`, opcional: Gratuito / Pago;
- `observacaoProfessor`, opcional;
- `publicacao`;
- `tags`, opcionais.

### URL do Link
`url` é uma string URL válida e obrigatória.

Não utilizar Recurso vinculado para a URL principal. Links representam recursos externos; PDFs, arquivos e documentos do Google Drive permanecem em Materiais.

### Finalidade e tipo do Link
`finalidade` é texto livre não vazio e obrigatório.

`tipo` é texto livre não vazio e obrigatório.

Não criar enum fechado nesta versão. Um vocabulário controlado somente poderá ser adotado após aprovação documental.

### Acesso do Link
`acesso` é opcional e utiliza enum fechado:
- Gratuito;
- Pago.

Quando ausente, nenhuma classificação de acesso é exibida e nenhum valor é inferido automaticamente.

Não representar acesso por booleano e não adicionar Freemium ou outros valores sem nova decisão documental.

### Classificações de Link
`classificacoes` é opcional.

Quando presente:
- contém uma ou mais classificações matemáticas;
- cada classificação possui exatamente `area`, `subarea` e `conteudo`;
- classificações múltiplas não duplicam o registro.

### Ordenação de Links
Links são organizados por finalidade.

Para comportamento determinístico:
1. os grupos de `finalidade` aparecem em ordem alfabética crescente no locale pt-BR;
2. dentro de cada finalidade, `titulo` aparece em ordem alfabética crescente no locale pt-BR.

`publicacao` pode ser utilizada em Novidades conforme as regras aprovadas, mas não define a ordenação principal da biblioteca.

Não criar campo manual `ordem` para Links nesta versão.

### Identidade visual de Links
Links não possuem campo de logo e a interface não deve exigir logos.

Não incluir em Link:
- logo;
- prazo;
- ativo/inativo;
- atenuação;
- prioridade;
- dificuldade;
- pontuação.

## Novidades derivadas
Novidades é uma projeção automática dos registros originais. Não criar coleção, cópia ou registro editorial independente apenas para alimentar o painel ou a visão completa.

Cada registro original gera no máximo uma Novidade, mesmo quando tiver várias classificações ou for aplicável a várias turmas. A projeção preserva uma chave estável composta pela fonte e pelo ID do registro.

Conteúdo global pode participar sem referência a turma. Conteúdo com audiência de turmas somente participa quando alcançar pelo menos uma turma não arquivada. Conteúdo exclusivamente associado a turmas arquivadas não participa.

Áreas abrangidas, conforme aplicável:
- Cronogramas;
- Atividades e listas;
- Para estudar;
- Trabalhos;
- Materiais;
- Vídeos;
- Links;
- Avisos e demais conteúdos editoriais.

Somente fontes cuja coleção exista podem ser implementadas. Oportunidades e Datas passa a aplicar este modelo por meio da coleção `oportunidades`.

Campos temporais utilizados conforme a fonte:
- `publicacao`, para calcular Novo;
- `dataPrazo`, `prazo`, `dataObjetivo`, `marco.data` ou marcos de Oportunidades dos tipos Encerramento de inscrições e Realização, para calcular Atenção;
- `publicacao`, `validade` e `prioridade`, para Avisos.

Item de Cronograma pode participar como Atenção sem `publicacao`, usando `dataPrazo`.

### Destaque de Novidades
O próprio registro original pode usar o bloco opcional implementado:

```yaml
destaqueNovidades:
  inicio: YYYY-MM-DD
  fim: YYYY-MM-DD
```

Quando o bloco existir, `inicio` e `fim` são obrigatórios e usam a data civil canônica do portal. O bloco não constitui coleção, não duplica conteúdo, não oferece opção manual de ocultação e não pode tornar elegível conteúdo destinado exclusivamente a turmas arquivadas.

O schema técnico ainda não é alterado nesta etapa de documentação e prototipação.

## Filtros
Prever conforme a área:
- segmento;
- ano/série;
- turma;
- assunto;
- tipo;
- Área;
- Subárea;
- Conteúdo;
- instituição;
- fase;
- ano;
- categoria;
- prioridade;
- tags;
- busca.

Quando a listagem possuir ordem fixa por publicação, não exibir controle de ordenação desnecessário.

## Arquivamento
Conteúdo antigo pode sair de destaques/Novidades sem ser apagado.

Turmas de anos letivos encerrados podem ser arquivadas e continuar acessíveis conforme a política do portal.
