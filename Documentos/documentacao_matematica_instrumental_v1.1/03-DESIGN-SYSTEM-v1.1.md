# Design System — Matemática Instrumental

Versão: 1.1  
Status: APROVADO  
Última atualização: 21/08/2026

## Direção visual
Profissional, contemporânea, organizada, sóbria, amigável e não infantil.

## Cabeçalho
- cabeçalho maior;
- identidade visual em destaque;
- logo com forte presença horizontal;
- foto do professor ao lado do nome/identidade;
- menu abaixo do cabeçalho;
- menu ocupando a largura disponível no desktop.

Nas páginas de turma, manter o mesmo padrão institucional da home.

O cabeçalho institucional grande não precisa permanecer fixo durante a rolagem.

## Menus fixos
Nas páginas de turma:
- o menu principal do portal deve permanecer acessível durante a rolagem;
- o menu interno da turma também deve permanecer acessível;
- o item atual do menu interno deve ter destaque discreto e consistente;
- evitar que os menus fixos ocultem títulos ou conteúdos;
- no celular, usar versão compacta da navegação interna em vez de comprimir oito itens.

## Navegação interna da turma
Ordem:

**Início da turma | Cronogramas | Atividades e listas | Para estudar | Trabalhos | Materiais | Vídeos | Links**

No desktop, priorizar barra horizontal em largura disponível.

No tablet, reorganizar conforme a largura disponível.

No celular, usar seletor/menu compacto adequado ao toque.

## Fundo e seções
- fundo geral cinza;
- boxes claramente diferenciados;
- degradês discretos para mais claro ou mais escuro;
- evitar fundo e boxes com mesma aparência;
- bordas e sombras discretas;
- cantos arredondados coerentes com a home aprovada.

## Página de turma — composição visual
### Desktop
- faixa inicial aproximada 2/3 + 1/3 para identificação da turma e avisos;
- próximos compromissos em largura total;
- resumos de Atividades/Para estudar, Trabalhos/Materiais e Vídeos/Links em duas colunas quando houver espaço;
- boxes vazios não devem ser mantidos apenas para preservar a grade; o layout deve se reorganizar.

### Tablet
- identificação e avisos podem ser empilhados;
- usar uma ou duas colunas conforme a largura real;
- não reduzir o desktop mecanicamente.

### Celular
- uma coluna;
- menus compactos e persistentes;
- tabelas convertidas em cards ou estruturas verticais quando necessário;
- componentes reorganizados para leitura e toque.

## Identificação da turma
- título principal: ano/série e turma;
- segmento como identificação secundária;
- ano letivo visível sem competir com o título;
- não exibir “ativa/inativa”;
- turma arquivada deve usar mensagem humana e útil, como “Turma arquivada — ano letivo encerrado”.

## Segmentos
Fundamental e Médio podem usar cores diferentes, de forma elegante e coerente.

A cor do segmento deve atuar como acento visual, não como preenchimento dominante da página.

## Paletas oficiais

### Linha 1
`#2484BF` `#41CAD9` `#F2C335` `#D9B036` `#0D0D0D`

### Linha 2
`#3557F2` `#0320A6` `#F2C335` `#FFD452` `#A68114`

### Linha 3
`#3585A6` `#41BEF2` `#F2C335` `#4814A6` `#7229F2`

**Regra:** cada linha é um conjunto cromático próprio. Não misturar arbitrariamente cores de linhas diferentes.

## Acesso rápido
Visual uniforme, sem uma cor forte distinta por opção.

## Ícones
- uma única família visual;
- profissionais;
- coerentes;
- preferencialmente SVG;
- estilo outline limpo e contemporâneo;
- evitar mistura de outline, preenchido, 3D e emojis.

## Estados visuais globais
- Novo;
- Atenção;
- Destaque.

Preferir selos e ícones consistentes.

## Estados temporais calculados
Quando conteúdo com data já tiver passado:
- não exigir alteração manual;
- usar redução discreta de ênfase visual quando a regra da área determinar permanência histórica;
- preservar legibilidade e acessibilidade;
- não usar opacidade tão baixa que prejudique leitura.

## Cronogramas
- tabela limpa no desktop;
- período corrente com destaque visual;
- períodos anteriores e futuros disponíveis com menor ênfase;
- ações após o prazo podem receber tratamento visual de concluídas/cumpridas sem coluna manual de situação;
- no celular, converter linhas da tabela em cards ou blocos verticais.

## Materiais
Apresentar agrupamento hierárquico:

**Área → Subárea → Conteúdo**

Grupos podem ser expandidos/recolhidos quando necessário para controlar o comprimento da página.

## Vídeos
- miniatura 16:9;
- título;
- descrição breve;
- prioridade, quando aplicável;
- player em modal responsivo;
- tela cheia quando suportada;
- alternativa para abrir no provedor;
- carregar iframe somente após interação, quando possível.

## Informações opcionais
Quando um campo opcional não possuir conteúdo:
- não exibir rótulo vazio;
- não exibir botão desabilitado sem função;
- não reservar espaço visual desnecessário.

## Imagens
Somente próprias ou com direito de reprodução compatível.

## Responsividade
Desktop, tablet e celular devem reorganizar componentes, e não apenas reduzi-los.

## Referência visual
O mockup aprovado da página inicial continua sendo referência visual obrigatória até aprovação de mockup específico da página de turma.
