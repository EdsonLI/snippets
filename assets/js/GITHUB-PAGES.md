# Suporte ao GitHub Pages

Este documento explica como o projeto foi adaptado para funcionar tanto no ambiente de desenvolvimento local quanto no GitHub Pages.

## Problemas e Soluções

### 1. Caminhos de Arquivos

**Problema**: Os caminhos absolutos (`/assets/...`) não funcionam no GitHub Pages porque o site está hospedado em um subdiretório (`/snippets/`).

**Solução**: Detecção automática de ambiente para ajustar os caminhos:

```javascript
const isGitHubPages = window.location.hostname === 'edsonli.github.io';
const basePath = isGitHubPages ? '/snippets' : '';

// Uso nos caminhos
const path = `${basePath}/assets/js/...`;
```

### 2. Scripts PHP no GitHub Pages

**Problema**: O GitHub Pages não suporta PHP, portanto o script `list_files.php` usado para descobrir snippets não funciona.

**Solução**: Implementamos uma lista estática de snippets para cada categoria que é usada quando o site está no GitHub Pages:

```javascript
// Verifica se estamos no GitHub Pages
if (SNIPPETS_CONFIG.isGitHubPages) {
  // Usa snippets predefinidos para cada categoria
  folders.forEach(folderName => {
    if (staticSnippetsMap[folderName]) {
      state.discoveredFiles[folderName] = staticSnippetsMap[folderName];
      // ...
    }
  });
}
```

## Como Funciona

1. **Detecção de Ambiente**: Verifica o hostname para determinar se está no GitHub Pages
2. **Ajuste de Caminhos**: Adiciona o prefixo `/snippets/` quando necessário
3. **Alternativa ao PHP**: Usa uma lista predefinida de snippets quando PHP não está disponível
4. **Tratamento de Erros**: Implementa fallbacks e logging detalhado para facilitar a depuração

## Adicionando Novos Snippets no GitHub Pages

Para adicionar novos snippets que funcionem no GitHub Pages:

1. Crie o arquivo HTML do snippet na pasta apropriada
2. Adicione o nome do arquivo ao objeto `staticSnippetsMap` na categoria correspondente no arquivo `snippets-core.js`

Exemplo:

```javascript
const staticSnippetsMap = {
  'bootstrap': [
    'snippet_bootstrap_accordion.html',
    'snippet_bootstrap_alert.html',
    'seu_novo_snippet.html', // Adicione aqui
    // ...
  ],
  // outras categorias...
};
```

## Testando

Para testar o comportamento no GitHub Pages localmente, você pode:

1. Forçar o modo GitHub Pages adicionando temporariamente esta linha no console:
   ```javascript
   window.location.hostname = 'edsonli.github.io';
   ```

2. Ou modificar a verificação no código para sempre usar os snippets estáticos:
   ```javascript
   const isGitHubPages = true; // Forçar modo GitHub Pages para testes
   ```

## Considerações Futuras

- Considerar usar uma API estática (JSON) para listar snippets ao invés de PHP
- Implementar um processo de build que gere automaticamente a lista de snippets disponíveis
- Criar uma versão híbrida que tente primeiro carregar dinamicamente e caia para estático em caso de falha
