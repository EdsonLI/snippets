/**
 * Ajuste dos botões de snippets
 * Reposiciona o botão de copiar quando não há link externo
 */
document.addEventListener('DOMContentLoaded', function() {
  function adjustCopyButtons() {
    // Encontra todos os contêineres de ações
    const actionContainers = document.querySelectorAll('.snippet-actions-float');
    
    actionContainers.forEach(container => {
      // Encontra o link externo
      const externalLink = container.querySelector('[data-snippet-external-link]');
      
      // Encontra o botão de copiar
      const copyButton = container.querySelector('button[data-target]');
      
      if (copyButton) {
        // Verifica se o link externo está ausente ou oculto
        if (!externalLink || 
            externalLink.style.display === 'none' || 
            externalLink.classList.contains('d-none')) {
          
          // Adiciona classe para ajustar a margem direita
          copyButton.classList.add('last-button-right');
          copyButton.style.marginRight = '2px';
        } else {
          // Remove a classe se o link externo estiver presente
          copyButton.classList.remove('last-button-right');
          copyButton.style.marginRight = '';
        }
      }
    });
  }
  
  // Executar imediatamente
  adjustCopyButtons();
  
  // Executar após um pequeno delay
  setTimeout(adjustCopyButtons, 200);
  
  // Executar quando a página estiver totalmente carregada
  window.addEventListener('load', function() {
    adjustCopyButtons();
    setTimeout(adjustCopyButtons, 300);
  });
});
