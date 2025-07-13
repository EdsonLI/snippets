/**
 * Snippet External Links Manager
 * Gerencia links externos para os snippets
 * 
 * @author GitHub Copilot
 * @version 1.0.1
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para inicializar os links externos
  function initExternalLinks() {
    // Seleciona todos os botões de link externo
    const externalLinkButtons = document.querySelectorAll('[data-snippet-external-link]');
    
    externalLinkButtons.forEach(button => {
      // Verifica se o botão já foi inicializado
      if (button.getAttribute('data-initialized') === 'true') return;
      
      // Por padrão, esconde o botão se não houver URL válida
      if (!button.getAttribute('href') || button.getAttribute('href') === '#') {
        button.style.display = 'none';
        button.style.visibility = 'hidden';
        button.classList.add('d-none');
      } else {
        // Garante que o botão esteja visível se tiver uma URL válida
        button.style.display = 'inline-flex';
        button.style.visibility = 'visible';
        
        // Remove classes que podem estar escondendo o botão
        button.classList.remove('d-none');
        button.classList.add('d-inline-flex');
        
        // Adiciona título ao passar o mouse
        if (!button.getAttribute('title')) {
          button.setAttribute('title', 'Link para documentação externa');
        }
        
        // Força uma cor de borda para maior visibilidade
        button.style.borderColor = '#5bc0de';
      }
      
      // Marca como inicializado
      button.setAttribute('data-initialized', 'true');
    });
  }
  
  // Inicializa os links externos na carga da página
  setTimeout(initExternalLinks, 100); // Pequeno delay para garantir que os elementos estejam carregados
  
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
      setTimeout(initExternalLinks, 100);
    }
  });
  
  // Configurar o observer para monitorar adições de nós em todo o documento
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Chamar novamente após o DOM estar completamente carregado
  window.addEventListener('load', function() {
    setTimeout(initExternalLinks, 500);
  });
  
  console.info('✅ Snippet External Links: Sistema inicializado com sucesso!');
});
