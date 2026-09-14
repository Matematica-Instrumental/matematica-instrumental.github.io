# Modelo de Conteúdo

Versão: 1.3  
Status: APROVADO — RECURSOS VINCULADOS E RELAÇÕES FUTURAS COM VÍDEOS
Última atualização: 23/08/2026

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
Para Materiais, Vídeos e outros conteúdos que utilizem classificação temática estruturada, prever:

**Área → Subárea → Conteúdo**

Um registro pode possuir uma ou várias classificações.

Exemplo de múltiplas classificações para um único registro:
- Geometria → Geometria Plana → Semelhança de Triângulos;
- Álgebra → Proporcionalidade → Razões e Proporções.

O registro continua único mesmo quando aparece em diferentes pontos da hierarquia.

## Turma
Campos:
- id;
- nome;
- slug;
- segmento;
- ano/série;
- turma;
- ano letivo;
- descrição;
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
`videosRelacionados` permanece um campo funcional aprovado e opcional.

Sua representação definitiva será uma relação tipada com registros da coleção `videos`, sem duplicação de título, URL, duração, prioridade, classificação ou demais metadados.

A implementação desse campo no schema técnico fica adiada até a criação da coleção `videos`. Até lá:
- o campo pode permanecer ausente do schema técnico temporário;
- nenhum conteúdo real deverá utilizá-lo;
- não representar a relação por strings soltas, títulos, URLs duplicadas ou IDs sem referência de coleção.

## Para estudar
Campos:
- id;
- título;
- objetivo, obrigatório;
- tipo de objetivo, quando útil;
- data do objetivo, opcional;
- resumo/orientação;
- assunto;
- segmento;
- ano/série;
- turma(s);
- recursos, um ou vários Recursos vinculados;
- vídeos relacionados, opcionais;
- leituras relacionadas, opcionais;
- tags;
- publicação.

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
`videosRelacionados` permanece um campo funcional aprovado e opcional.

Sua representação definitiva será uma relação tipada com registros da coleção `videos`, sem duplicação de título, URL, duração, prioridade, classificação ou demais metadados.

A implementação desse campo no schema técnico fica adiada até a criação da coleção `videos`. Até lá:
- o campo pode permanecer ausente do schema técnico temporário;
- nenhum conteúdo real deverá utilizá-lo;
- não representar a relação por strings soltas, títulos, URLs duplicadas ou IDs sem referência de coleção.

Exemplos de objetivo:
- prova;
- recuperação;
- concurso;
- vestibular;
- ENEM;
- olimpíada;
- atividade;
- outro objetivo pertinente.

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
- entrega/apresentação;
- documento do trabalho;
- recursos adicionais, um ou vários;
- tags.

Todas as orientações ficam no documento do trabalho.

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
Cada registro corresponde a exatamente um material.

Campos:
- id;
- título;
- descrição, opcional;
- tipo;
- classificações, uma ou várias;
- publicação;
- segmento;
- ano/série;
- turma(s);
- arquivo/link único;
- tags, opcionais.

Não incluir prazo.

### Classificação de Material
Cada classificação possui:
- Área;
- Subárea;
- Conteúdo.

Um material pode ter várias classificações, inclusive em áreas ou subáreas distintas.

## Vídeo
Biblioteca reutilizável.

Campos:
- id;
- título;
- URL;
- provedor;
- descrição;
- classificações, uma ou várias;
- segmento;
- ano/série;
- turma(s), quando necessário;
- prioridade: Essencial / Recomendado / Complementar;
- tags;
- duração;
- publicação/inclusão.

Não usar campo `ativo/inativo`.

Não incluir prazo.

### Classificação de Vídeo
Cada classificação possui:
- Área;
- Subárea;
- Conteúdo.

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

## Site ou recurso externo
Campos:
- id;
- nome;
- descrição;
- URL;
- segmento;
- ano/série, quando aplicável;
- turma(s), quando aplicável;
- finalidade;
- tipo;
- classificações matemáticas, opcionais e múltiplas;
- gratuito/pago, quando relevante;
- observação do professor, opcional;
- publicação;
- tags, opcionais.

Não incluir prazo nem ativo/inativo.

## Novidades derivadas
Novas inserções relevantes devem gerar referência automática em Novidades sem duplicar o registro original.

Áreas abrangidas, conforme aplicável:
- Cronogramas;
- Atividades e listas;
- Para estudar;
- Trabalhos;
- Materiais;
- Vídeos;
- Links;
- Avisos e demais conteúdos editoriais.

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
