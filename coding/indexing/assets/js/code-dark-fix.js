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
  
  // Aplicar também quando o conteúdo for carregado via AJAX
  $(document).on('DOMNodeInserted', '.code-block-wrapper, pre, code', function() {
    applyDarkCodeBlockStyles();
  });
});
