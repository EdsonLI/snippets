/**
 * Ajuste dos botões de snippets
 * Reposiciona o botão de copiar quando não há link externo
 * Garante consistência de posicionamento entre desktop e mobile
 */
document.addEventListener('DOMContentLoaded', function() {
  function adjustCopyButtons() {
    // Encontra todos os contêineres de ações
    const actionContainers = document.querySelectorAll('.snippet-actions-float');
    
    actionContainers.forEach(container => {
      // Garantir posicionamento consistente para o container
      ensureProperPosition(container);
      
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
  
  // Função para garantir posição adequada do container
  function ensureProperPosition(container) {
    // Força o posicionamento absoluto e as margens corretas
    container.style.position = 'absolute';
    container.style.top = '5px';
    container.style.right = '5px';
    container.style.margin = '0';
    container.style.padding = '0';
    container.style.zIndex = '100';
    
    // Remove qualquer transform que possa estar interferindo
    container.style.transform = 'none';
    
    // Verifica se está dentro de um card com título
    const parentCard = container.closest('.card');
    if (parentCard) {
      const cardTitle = parentCard.querySelector('h5, h6');
      if (cardTitle && container.compareDocumentPosition(cardTitle) & Node.DOCUMENT_POSITION_PRECEDING) {
        container.style.top = '10px'; // Ajusta o top quando está dentro de um card com título
      }
    }
  }
  
  // Executar imediatamente
  adjustCopyButtons();
  
  // Executar após um pequeno delay
  setTimeout(adjustCopyButtons, 200);
  
  // Executar quando a página estiver totalmente carregada
  window.addEventListener('load', function() {
    adjustCopyButtons();
    setTimeout(adjustCopyButtons, 300);
    setTimeout(adjustCopyButtons, 1000); // Ajuste adicional após carregamento completo
  });
  
  // Observar redimensionamentos da janela (importante para orientação de dispositivos móveis)
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      adjustCopyButtons();
    }, 100);
  });
  
  // Executar quando o conteúdo for alterado (útil para carregamentos dinâmicos)
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(function(mutations) {
      let shouldAdjust = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length || 
            mutation.target.classList && 
            mutation.target.classList.contains('snippet-actions-float')) {
          shouldAdjust = true;
        }
      });
      
      if (shouldAdjust) {
        setTimeout(adjustCopyButtons, 50);
      }
    });
    
    // Observar o corpo do documento para mudanças
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
});
