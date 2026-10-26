# Matemática Instrumental — instruções para agentes

1. **Antes de qualquer tarefa**, leia o `Documentos/00-INDICE-*` de maior versão e siga as referências que ele indica.
2. **Fluxo obrigatório:** documentação → mockup → aprovação → código. Não implemente nada sem mockup aprovado.
3. **Custo zero:** use apenas serviços e ferramentas gratuitos (GitHub Pages, GitHub Actions etc.).
4. **Sem segredos nem dados pessoais:** nunca grave chaves, tokens, senhas, e-mails pessoais ou dados de alunos no repositório.
5. **Antes de concluir uma mudança**, rode em `Site/`:
   ```
   npm test
   npm run build
   ```
