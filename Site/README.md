# Matemática Instrumental — Professor Adriano Lima Teixeira

Portal educacional estático para organizar conteúdos, recursos e informações de Matemática para estudantes do Ensino Fundamental — Anos Finais e do Ensino Médio.

## Estado atual

O front-end estrutural está implementado e o saneamento de integridade do conteúdo foi concluído. Configuração de infraestrutura, CMS, inclusão ampla de conteúdo real e publicação são etapas posteriores.

## Stack atual

- Astro 7 em modo de saída estática;
- Node.js `>=22.12.0` e npm, conforme `package.json`;
- HTML, CSS, JavaScript e TypeScript;
- coleções de conteúdo do Astro com registros YAML;
- Git local;
- Formspree para o formulário público de contato já configurado.

Não há adapter de servidor, framework de interface adicional ou banco de dados.

## Estrutura do repositório

- `Documentos/`: documentação normativa e registros aprovados do projeto;
- `Historico/`: materiais históricos preservados;
- `Referencias/`: identidade visual, mockups e demais referências aprovadas;
- `Site/`: aplicação Astro e seus comandos de desenvolvimento.

As áreas mais relevantes dentro de `Site/` são:

- `src/pages/`: rotas públicas e rota técnica de validação;
- `src/components/`: componentes de interface organizados por domínio;
- `src/content/`: registros das coleções Astro;
- `src/content.config.ts`: schemas das coleções;
- `src/utils/`: regras de domínio, rotas e integridade;
- `src/config/`: configurações públicas centralizadas;
- `src/assets/`, `src/styles/` e `public/`: ativos e estilos publicados;
- `tests/`: testes automatizados de integridade.

## Governança

O arquivo `../Documentos/00-INDICE-v5.6.md` aponta as versões vigentes. Documentos marcados como **APROVADO** são a fonte oficial, e o documento aprovado mais recente prevalece quando houver conflito.

Antes do fechamento de uma frente, use `../Documentos/08-CHECKLIST-DE-ACEITE-v4.4.md`. Mudanças de requisito devem ser documentadas e aprovadas antes da alteração correspondente no código. Este README é operacional e não substitui a documentação normativa.

## Ambiente local

Execute os comandos a partir da pasta `Site/`.

```sh
npm install
npm run dev
npm test
npm run build
```

- `npm install`: instala as dependências registradas no lockfile;
- `npm run dev`: inicia o ambiente local de desenvolvimento;
- `npm test`: executa a suíte de integridade;
- `npm run build`: gera o site estático em `dist/`.

Para visualizar um build concluído localmente, use `npm run preview`.

## Build com BASE_URL

O comando abaixo valida a compatibilidade atual com publicação em subcaminho:

```sh
npm run build -- --base /Matematica-Instrumental/
```

Esse prefixo é um cenário técnico de validação e não define necessariamente o endereço público final.

## Conteúdo

O conteúdo é estruturado em 14 coleções Astro. A coleção `turmas` contém atualmente a **Turma A — 2026**; as outras coleções podem permanecer vazias sem invalidar o build.

Fixtures não devem substituir conteúdo real nem ser inseridas nas coleções. Arquivos pedagógicos grandes permanecem em serviços externos, como Google Drive, e o portal armazena metadados e links conforme a arquitetura aprovada.

## Testes e integridade

```sh
npm test
```

A suíte verifica regras de schema e de conjunto, incluindo URLs e caminhos seguros, coerência temporal, regimes e períodos letivos, slugs e rotas canônicas e referências entre registros. O build também executa a validação global do conteúdo antes de gerar as rotas dinâmicas de Turma.

## Rota técnica

`/validacao-turma/` é uma página técnica temporária de referência e regressão. Ela permanece conforme a DEC-076, não integra a navegação pública e mantém suas fixtures isoladas das coleções reais.

Não remova essa rota ou suas fixtures sem decisão e documentação que autorizem a mudança.

## Serviços ainda não configurados

No estado atual:

- não há repositório remoto configurado;
- GitHub Pages não está configurado;
- GitHub Actions não está configurado;
- Pages CMS não está configurado.

Não confunda a compatibilidade técnica já testada com `BASE_URL` com uma configuração de publicação concluída.

## Segurança e direitos

- não versione segredos, tokens ou credenciais;
- não insira credenciais nem dados pessoais no conteúdo;
- respeite autoria, direitos de uso e licenças dos ativos;
- mantenha fontes e licenças registradas quando aplicável;
- preserve as validações vigentes para links, URLs e caminhos internos.
