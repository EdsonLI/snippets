# Toggle de Tema - Guia de Implementação

Este diretório (`coding/indexing/`) agora conta com um sistema de toggle de tema claro/escuro implementado para todas as páginas.

## Arquivos Principais

1. **`assets/theme-toggle.css`** - Estilos CSS para o toggle de tema
2. **`assets/theme-toggle.js`** - JavaScript que gerencia a troca de temas
3. **`index.html`** - Página principal com toggle implementado

## Como Funciona

### Para Páginas que são Fragmentos HTML
- As páginas como `snippets_bootstrap.html`, `snippets_css.html`, etc. são fragmentos HTML que são carregados dentro do `index.html`
- O toggle no `index.html` automaticamente funciona para todos esses fragmentos
- **Nenhuma ação adicional é necessária** para essas páginas

### Para Páginas Standalone (como `snippets_jquery.html`)
- Páginas completas com `<!DOCTYPE html>` precisam implementar o toggle individualmente
- A página `snippets_jquery.html` já tem o toggle implementado e funcionando

## Como Adicionar Toggle a uma Nova Página Standalone

Se você criar uma nova página HTML completa neste diretório, siga estes passos:

### 1. Adicione os recursos CSS e JS no `<head>`:

```html
<!-- Iconify for animated theme toggle icon -->
<script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>

<!-- CSS e JS para toggle de tema -->
<link href="assets/theme-toggle.css" rel="stylesheet">
<script src="assets/theme-toggle.js" defer></script>
```

### 2. Adicione o botão no `<body>`:

```html
<!-- Toggle de Tema -->
<button id="themeToggle" class="btn btn-sm theme-toggle-btn" type="button" title="Alternar tema" aria-label="Alternar tema">
  <iconify-icon id="theme-icon" icon="line-md:light-dark" style="vertical-align: middle;"></iconify-icon>
</button>
```

### 3. Certifique-se de ter Bootstrap CSS:

O sistema assume que você está usando Bootstrap para o botão. Se não estiver usando Bootstrap, adicione:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

## Personalização

### Temas Disponíveis
- **theme-dark** (padrão): Fundo escuro com texto claro
- **theme-light**: Fundo claro com texto escuro

### Variáveis CSS Disponíveis
```css
:root {
  --snippet-bg: #161b22;          /* Fundo do código */
  --snippet-fg: #e6edf3;          /* Texto do código */
  --snippet-card-bg: #fff;        /* Fundo dos cards */
  --snippet-card-fg: #222;        /* Texto dos cards */
  --snippet-border: #6610f2;      /* Cor da borda principal */
}
```

## Persistência
O tema escolhido pelo usuário é salvo no `localStorage` com a chave `snippetTheme` e será mantido entre as sessões.

## Debug
O sistema inclui funções de debug disponíveis no console:
```javascript
window.snippetTheme.setTheme('theme-dark');     // Força tema escuro
window.snippetTheme.getCurrentTheme();          // Retorna tema atual
window.snippetTheme.getSavedTheme();           // Retorna tema salvo
```
