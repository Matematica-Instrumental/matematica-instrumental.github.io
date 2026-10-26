# Telas e Campos do CMS — Fase 1

Versão: 1.0<br>
Status: EM VALIDAÇÃO — MOCKUP DA FRENTE DE CMS (DEC-106)<br>
Última atualização: 26/10/2026

## Objetivo
Descrever, antes de qualquer código, como o professor verá o Pages CMS: o menu, as telas de cada coleção, os rótulos e as ajudas de cada campo. Este documento funciona como o mockup da frente de CMS. O `.pages.yml` só será criado depois da aprovação.

## Regras gerais
- Rótulos e ajudas em português; os nomes técnicos dos campos (`id`, `slug`, `publicacao` etc.) não mudam, para manter os schemas e o conteúdo atual.
- O nome de cada arquivo novo é o valor do campo **Identificador** (`id`), seguido de `.yaml`. Por isso o Identificador deve ser escrito em minúsculas, sem acentos e com hífens, e não deve ser alterado depois de criado.
- Datas aparecem com seletor de data e são gravadas como `AAAA-MM-DD`, sem horário.
- Campos de seleção com lista fechada aparecem como menu; campos de texto livre aparecem como caixa de texto.
- Referências a outros registros (turmas, vídeos, regime, período) aparecem como busca por nome. Em Turmas, o valor gravado é o `slug` (por exemplo `turma-a-2026`), que é o identificador usado pelo site.
- "Recurso" é sempre um par **Nome** + **Link** (HTTP(S) ou caminho interno iniciado por `/`). Não há envio de arquivos: PDFs e documentos ficam no Google Drive.
- O CMS não mostra erros de regra de negócio na tela. Se algo estiver inválido, o build no GitHub Actions falha, o site anterior continua no ar e o erro aparece no log.

## Menu lateral

| Ordem | Item do menu | Pasta | Fase |
|---|---|---|---|
| 1 | Turmas | `Site/src/content/turmas` | 1 |
| 2 | Regimes letivos | `Site/src/content/regimes-letivos` | 1 |
| 3 | Períodos letivos | `Site/src/content/periodos-letivos` | 1 |
| 4 | Cronograma (itens) | `Site/src/content/itens-cronograma` | 1 |
| 5 | Atividades e listas | `Site/src/content/atividades-listas` | 1 |
| 6 | Para estudar | `Site/src/content/para-estudar` | 1 |
| 7 | Trabalhos | `Site/src/content/trabalhos` | 1 |
| 8 | Materiais | `Site/src/content/materiais` | 1 |
| 9 | Vídeos | `Site/src/content/videos` | 1 |
| 10 | Links | `Site/src/content/links` | 1 |

Avisos, Provas, Oportunidades e Matemática além da sala ficam fora do menu até a Fase 2.

## Blocos reutilizados

**Classificação** (lista, pelo menos 1): Área · Subárea · Conteúdo — três textos obrigatórios. Exemplo: Álgebra · Funções · Função afim.

**Destaque em Novidades** (opcional): Início · Fim — duas datas; o fim deve ser igual ou posterior ao início e à publicação.

**Segmento** (menu): Ensino Fundamental — Anos Finais · Ensino Médio.

**Ano/Série** (menu): 6º ano · 7º ano · 8º ano · 9º ano · 1º ano · 2º ano · 3º ano.

## Telas

Legenda: **(obr.)** obrigatório · **(opc.)** opcional.

### 1. Turmas
Lista mostra: Nome · Ano letivo · Arquivada.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | Ex.: `ensino-medio-1o-ano-turma-a-2026`. |
| Nome (obr.) | `nome` | texto | Ex.: Turma A — 2026. |
| Endereço da página (obr.) | `slug` | texto | Minúsculas e hífens, com o ano. Ex.: `turma-a-2026`. Não alterar depois de publicada. |
| Segmento (obr.) | `segmento` | menu | |
| Ano/Série (obr.) | `anoSerie` | menu | Deve pertencer ao segmento. |
| Turma (obr.) | `turma` | texto | Ex.: A. |
| Ano letivo (obr.) | `anoLetivo` | número | Ex.: 2026. |
| Descrição (obr.) | `descricao` | texto longo | |
| Arquivada (opc.) | `arquivada` | sim/não | Marque ao fim do ano letivo. A turma sai das listas ativas. |
| Ordem (obr.) | `ordem` | número | Posição na lista de turmas. |

### 2. Regimes letivos
Lista mostra: Nome · Ano letivo · Tipo.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | Ex.: `regime-2026-bimestral`. |
| Nome (obr.) | `nome` | texto | Ex.: Bimestres 2026. |
| Ano letivo (obr.) | `anoLetivo` | número | |
| Tipo (obr.) | `tipo` | menu | bimestral (4 períodos) · trimestral (3) · semestral (2). |
| Turmas (opc.) | `turmas` | busca, várias | Deixe vazio se o regime vale para todas as turmas do ano. |

### 3. Períodos letivos
Lista mostra: Nome · Data inicial · Data final.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | Ex.: `2026-1o-bimestre`. |
| Regime letivo (obr.) | `regimeLetivo` | busca | |
| Nome (obr.) | `nome` | texto | Ex.: 1º Bimestre. |
| Data inicial (obr.) | `dataInicial` | data | |
| Data final (obr.) | `dataFinal` | data | Igual ou posterior à inicial; sem sobrepor outro período do regime. |
| Valor total da etapa (obr.) | `valorTotalEtapa` | número | Pontos da etapa. Usado no aviso de soma do Cronograma. |
| Ordem (obr.) | `ordem` | número | 1, 2, 3… na ordem das datas. |

### 4. Cronograma (itens)
Lista mostra: Data/Prazo · Tipo · Descrição.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | Ex.: `2026-1b-prova-funcoes`. |
| Período letivo (obr.) | `periodoLetivo` | busca | |
| Turmas (obr.) | `turmas` | busca, várias | |
| Data/Prazo (obr.) | `dataPrazo` | data | No dia seguinte o item aparece como cumprido. |
| Tipo (obr.) | `tipo` | texto | Ex.: Prova, Trabalho, Lista. |
| Descrição/Conteúdo (obr.) | `descricaoConteudo` | texto longo | |
| Valor (opc.) | `valorIndividual` | número | Sem valor, o item não entra na soma. Se a soma passar do total da etapa, o build avisa no log, sem bloquear. |
| Publicação (opc.) | `publicacao` | data | Preencha para aparecer em Novidades. |
| Ordem (opc.) | `ordem` | número | Desempate entre itens da mesma data. |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

### 5. Atividades e listas
Lista mostra: Título · Tipo · Publicação.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | |
| Tipo (obr.) | `tipo` | menu | Atividade · Lista de exercícios. |
| Título (obr.) | `titulo` | texto | |
| Descrição (opc.) | `descricao` | texto longo | |
| Assunto (obr.) | `assunto` | texto | |
| Segmento (obr.) · Ano/Série (obr.) | `segmento` · `anoSerie` | menu | |
| Turmas (obr.) | `turmas` | busca, várias | |
| Publicação (obr.) | `publicacao` | data | |
| Prazo (opc.) | `prazo` | data | |
| Recursos (obr., 1 ou mais) | `recursos` | lista de Recurso | Link do Drive da atividade ou lista. |
| Vídeos relacionados (opc.) | `videosRelacionados` | busca, várias | |
| Etiquetas (obr., pode ficar vazia) | `tags` | lista de textos | |
| Gabarito/resolução (opc.) | `gabaritoResolucao` | lista de Recurso | |
| Liberar gabarito em (opc.) | `dataLiberacaoGabarito` | data | Exige gabarito; igual ou posterior à publicação. |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

### 6. Para estudar
Lista mostra: Título · Objetivo · Publicação.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | |
| Título (obr.) | `titulo` | texto | |
| Objetivo (obr.) | `objetivo` | texto | Ex.: Prova do 2º bimestre, ENEM, OBMEP. |
| Tipo do objetivo (opc.) | `tipoObjetivo` | texto | |
| Data do objetivo (opc.) | `dataObjetivo` | data | |
| Resumo da orientação (obr.) | `resumoOrientacao` | texto longo | |
| Assunto (obr.) | `assunto` | texto | |
| Segmento (obr.) · Ano/Série (obr.) | `segmento` · `anoSerie` | menu | |
| Turmas (obr.) | `turmas` | busca, várias | |
| Recursos (obr., 1 ou mais) | `recursos` | lista de Recurso | |
| Vídeos relacionados (opc.) | `videosRelacionados` | busca, várias | |
| Leituras relacionadas (opc.) | `leiturasRelacionadas` | lista de Recurso | |
| Etiquetas (obr., pode ficar vazia) | `tags` | lista de textos | |
| Publicação (obr.) | `publicacao` | data | |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

### 7. Trabalhos
Lista mostra: Título · Marco · Publicação.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | |
| Título (obr.) | `titulo` | texto | |
| Descrição (opc.) | `descricao` | texto longo | |
| Assunto (obr.) | `assunto` | texto | |
| Segmento (obr.) · Ano/Série (obr.) | `segmento` · `anoSerie` | menu | |
| Turmas (obr.) | `turmas` | busca, várias | |
| Publicação (obr.) | `publicacao` | data | |
| Marco (obr.) | `marco` | Tipo (menu: Entrega · Apresentação) + Data | |
| Documento do trabalho (obr.) | `documentoTrabalho` | Recurso | |
| Recursos adicionais (opc.) | `recursosAdicionais` | lista de Recurso | |
| Etiquetas (obr., pode ficar vazia) | `tags` | lista de textos | |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

### 8. Materiais
Lista mostra: Título · Tipo · Publicação.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | |
| Título (obr.) | `titulo` | texto | |
| Descrição (opc.) | `descricao` | texto longo | |
| Tipo (obr.) | `tipo` | texto | Ex.: Apostila, Resumo, Mapa mental. |
| Classificações (obr.) | `classificacoes` | lista de Classificação | |
| Publicação (obr.) | `publicacao` | data | |
| Segmento (obr.) · Ano/Série (obr.) | `segmento` · `anoSerie` | menu | |
| Turmas (obr.) | `turmas` | busca, várias | |
| Arquivo/link (obr.) | `arquivoLink` | Recurso | Link do Drive. |
| Etiquetas (opc.) | `tags` | lista de textos | |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

### 9. Vídeos
Lista mostra: Título · Prioridade · Publicação.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | |
| Título (obr.) | `titulo` | texto | |
| Descrição (obr.) | `descricao` | texto longo | |
| Link do vídeo (obr.) | `url` | texto | HTTP(S). |
| Plataforma (obr.) | `provedor` | menu | YouTube · Vimeo · Outro. |
| Miniatura (obr.) | `miniaturaUrl` | texto | Link HTTP(S) da imagem de capa. |
| Duração em segundos (obr.) | `duracaoSegundos` | número | Ex.: 12 min 30 s = 750. |
| Prioridade (obr.) | `prioridade` | menu | Essencial · Recomendado · Complementar. |
| Classificações (obr.) | `classificacoes` | lista de Classificação | |
| Segmento (obr.) · Ano/Série (obr.) | `segmento` · `anoSerie` | menu | |
| Turmas (opc.) | `turmas` | busca, várias | |
| Etiquetas (obr., pode ficar vazia) | `tags` | lista de textos | |
| Publicação (obr.) | `publicacao` | data | |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

### 10. Links
Lista mostra: Título · Finalidade · Tipo.

| Rótulo | Campo | Tipo | Ajuda |
|---|---|---|---|
| Identificador (obr.) | `id` | texto | |
| Título (obr.) | `titulo` | texto | |
| Descrição (obr.) | `descricao` | texto longo | |
| Link (obr.) | `url` | texto | HTTP(S). PDFs e arquivos do Drive vão em Materiais. |
| Finalidade (obr.) | `finalidade` | texto | Agrupa os links na página. Ex.: Calculadoras. |
| Tipo (obr.) | `tipo` | texto | Ex.: Simulador, Plataforma. |
| Acesso (opc.) | `acesso` | menu | Gratuito · Pago. |
| Classificações (opc.) | `classificacoes` | lista de Classificação | |
| Publicação (obr.) | `publicacao` | data | |
| Segmento (obr.) | `segmento` | menu | |
| Ano/Série (opc.) | `anoSerie` | menu | |
| Turmas (opc.) | `turmas` | busca, várias | |
| Observação do professor (opc.) | `observacaoProfessor` | texto longo | |
| Etiquetas (opc.) | `tags` | lista de textos | |
| Destaque em Novidades (opc.) | `destaqueNovidades` | bloco | |

## Limites conhecidos do Pages CMS
- Não esconde campos conforme outro campo (por exemplo, Ano/Série não se filtra pelo Segmento). A coerência é verificada no build.
- Não calcula a soma do Cronograma na tela; o aviso aparece no log do build (DEC-039 ajustada pela DEC-106).
- Excluir um registro usado por outro (por exemplo, uma turma ainda referenciada) faz o build falhar até a referência ser corrigida.

## Pontos para validação
1. Classificação Área → Subárea → Conteúdo: na Fase 1 fica como texto livre, como no schema atual. Uma lista fixa de áreas e subáreas exigiria aprovação de vocabulário controlado.
2. Ano/Série aparece como menu fechado em todas as telas, embora alguns schemas aceitem texto livre. O menu evita grafias diferentes.
3. Ordem do menu lateral e colunas mostradas em cada lista.
