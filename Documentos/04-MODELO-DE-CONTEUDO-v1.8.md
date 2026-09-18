# Modelo de Conteúdo

Versão: 1.8<br>
Status: APROVADO — PROJEÇÃO DE NOVIDADES<br>
Última atualização: 14/09/2026

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
- instituição;
- tipo;
- ano;
- fase;
- área/assunto;
- segmento;
- link da prova oficial;
- link da resolução;
- descrição;
- tags;
- dificuldade.

Esta entidade é destinada ao acervo geral de provas/resoluções e não representa prova interna de uma turma no Cronograma.

## Oportunidade / Data
- título;
- instituição;
- categoria;
- público;
- início de inscrições;
- fim de inscrições;
- data(s) de prova;
- link oficial;
- descrição;
- situação calculada;
- novidade.

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

`publicacao` poderá ser utilizada futuramente em Novidades conforme as regras aprovadas, mas não define a ordenação principal da biblioteca.

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
Novidades é uma projeção automática dos registros originais. Não criar coleção, cópia ou registro editorial independente apenas para alimentar o painel ou a futura visão completa.

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

Somente fontes cuja coleção exista podem ser implementadas. Inscrições e provas datadas de Oportunidades e Datas passam a aplicar este modelo quando sua coleção for criada.

Campos temporais utilizados conforme a fonte:
- `publicacao`, para calcular Novo;
- `dataPrazo`, `prazo`, `dataObjetivo`, `marco.data`, `fimInscricoes` ou `dataProva`, para calcular Atenção;
- `publicacao`, `validade` e `prioridade`, para Avisos.

Item de Cronograma pode participar como Atenção sem `publicacao`, usando `dataPrazo`.

### Destaque de Novidades
Fica previsto para implementação futura, no próprio registro original, o bloco opcional:

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
