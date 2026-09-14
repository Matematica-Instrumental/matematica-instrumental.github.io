# Arquitetura Técnica

Versão: 1.1  
Status: APROVADO — IMPLEMENTAÇÃO CONDICIONADA AO MOCKUP DA PÁGINA DE TURMA  
Última atualização: 21/08/2026

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
Hospedados no provedor original, exibidos por miniatura e player incorporado.

Requisitos:
- miniatura 16:9;
- player em modal responsivo;
- tela cheia quando suportada;
- alternativa para abrir no provedor;
- carregar iframe somente após interação, quando possível.

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

Antes de programar a página de turma, ainda é obrigatório produzir e aprovar seu mockup visual.
