/**
 * Script para limpar estilos inline indesejados em elementos de ação dos snippets
 * Especialmente para os snippets Git que podem ter estilos sobrepostos
 */
$(document).ready(function() {
  // Função para remover estilos inline dos elementos snippet-actions-float dentro de snippet-code
  function cleanInlineStyles() {
    // Seleciona especificamente os snippet-actions-float dentro de snippets de código
    $('.snippet-code .snippet-code-actions').each(function() {
      // Remove os estilos inline aplicados diretamente
      $(this).removeAttr('style');
    });
  }
  
  // Executa inicialmente
  cleanInlineStyles();
  
  // Também executa após pequeno delay para garantir que todos os scripts foram processados
  setTimeout(cleanInlineStyles, 300);
  
  // E em qualquer mudança de visualização (filtros)
  $('.isotope-filters li').on('click', function() {
    setTimeout(cleanInlineStyles, 300);
  });
});
