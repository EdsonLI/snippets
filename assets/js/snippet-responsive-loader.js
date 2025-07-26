/**
 * Carregador dinâmico para o CSS de responsividade dos snippets
 * Insere o link para o CSS se estiver em uma página de snippets
 */
$(document).ready(function() {
  // Verifica se estamos em uma página de snippets
  if ($('.snippet-actions-float').length || 
      $('.card').length || 
      window.location.href.includes('/coding/') ||
      window.location.href.includes('/snippets_')) {
    
    // Verifica se o CSS já foi carregado
    const cssLoaded = $('link').toArray().some(
      link => link.href && link.href.includes('snippet-actions-responsive.css')
    );
    
    if (!cssLoaded) {
      console.info('📱 Carregando CSS responsivo para os botões de snippet');
      
      // Cria e adiciona o link para o CSS usando jQuery
      $('<link>', {
        rel: 'stylesheet',
        href: '/snippets/assets/css/snippet-actions-responsive.css'
      }).appendTo('head');
    }
  }
});
