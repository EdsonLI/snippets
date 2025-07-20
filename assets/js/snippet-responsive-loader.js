/**
 * Carregador dinâmico para o CSS de responsividade dos snippets
 * Insere o link para o CSS se estiver em uma página de snippets
 */
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se estamos em uma página de snippets
  if (document.querySelector('.snippet-actions-float') || 
      document.querySelector('.card') || 
      document.location.href.includes('/coding/') ||
      document.location.href.includes('/snippets_')) {
    
    // Verifica se o CSS já foi carregado
    const cssLoaded = Array.from(document.querySelectorAll('link')).some(
      link => link.href && link.href.includes('snippet-actions-responsive.css')
    );
    
    if (!cssLoaded) {
      console.info('📱 Carregando CSS responsivo para os botões de snippet');
      
      // Cria o elemento link para o CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = '/snippets/assets/css/snippet-actions-responsive.css';
      
      // Adiciona ao head
      document.head.appendChild(cssLink);
    }
  }
});
