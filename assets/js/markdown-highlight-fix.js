/**
 * Script para garantir que o highlight.js aplique corretamente o destaque de sintaxe em markdown
 */
document.addEventListener('DOMContentLoaded', function() {
  // Força o rehighlight nos elementos markdown após o carregamento da página
  setTimeout(function() {
    document.querySelectorAll('code.language-md, code.language-markdown').forEach(function(block) {
      hljs.highlightElement(block);
    });
  }, 500);
});
