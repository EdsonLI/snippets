/**
 * Snippet External Links Manager
 * Gerencia links externos para os snippets
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para inicializar os links externos
  function initExternalLinks() {
    // Seleciona todos os botões de link externo
    const externalLinkButtons = document.querySelectorAll('[data-snippet-external-link]');
    
    externalLinkButtons.forEach(button => {
      // Verifica se o botão já foi inicializado
      if (button.getAttribute('data-initialized') === 'true') return;
      
      // Por padrão, esconde o botão se não houver URL
      if (!button.getAttribute('href') || button.getAttribute('href') === '#') {
        button.style.display = 'none';
      }
      
      // Marca como inicializado
      button.setAttribute('data-initialized', 'true');
    });
  }
  
  // Inicializa os links externos na carga da página
  initExternalLinks();
  
  // Adiciona um observador para detectar novos links adicionados dinamicamente
  const observer = new MutationObserver(mutations => {
    let shouldInit = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Verifica se o próprio nó ou algum filho tem data-snippet-external-link
            if ((node.hasAttribute && node.hasAttribute('data-snippet-external-link')) || 
                (node.querySelector && node.querySelector('[data-snippet-external-link]'))) {
              shouldInit = true;
            }
          }
        });
      }
    });
    
    if (shouldInit) {
      initExternalLinks();
    }
  });
  
  // Configurar o observer para monitorar adições de nós em todo o documento
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.info('✅ Snippet External Links: Sistema inicializado com sucesso!');
});
