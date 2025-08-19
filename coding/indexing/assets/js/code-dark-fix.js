/**
 * Script para garantir que os blocos de código tenham fundo escuro
 * Este script reforça os estilos CSS aplicados
 */
$(document).ready(function() {
  // Função para aplicar estilos aos blocos de código
  function applyDarkCodeBlockStyles() {
    $('.code-block-wrapper, .code-block-wrapper pre, .code-block-wrapper code, pre, pre code, .hljs').css({
      'background-color': '#161b22 !important',
      'color': '#e6edf3 !important'
    });
    
    // Aplicar especificamente aos elementos com data-highlighted
    $('[data-highlighted="yes"]').css('background-color', '#161b22 !important');
    
    // Força a aplicação direta via jQuery
    $('.code-block-wrapper').attr('style', 'background-color: transparent !important');
    $('.code-block-wrapper pre, .code-block-wrapper code, pre, code').attr('style', 'background-color: #161b22 !important; color: #e6edf3 !important');
  }
  
  // Aplicar estilos imediatamente
  applyDarkCodeBlockStyles();
  
  // Aplicar estilos após um pequeno delay para garantir que todos os elementos estejam carregados
  setTimeout(applyDarkCodeBlockStyles, 100);
  
  // Configurar MutationObserver para observar mudanças no DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Verificar se o nó adicionado ou seus descendentes contêm elementos de código
          if ($(node).is('.code-block-wrapper, pre, code') || 
              $(node).find('.code-block-wrapper, pre, code').length > 0) {
            applyDarkCodeBlockStyles();
          }
        }
      });
    });
  });
  
  // Iniciar a observação do documento
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
