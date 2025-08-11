/**
 * Script para adicionar o ícone SVG do Bootstrap aos snippets
 * Insere automaticamente o SVG do Bootstrap em elementos com a classe id-tech-bootstrap
 */
document.addEventListener('DOMContentLoaded', function() {
  // SVG do Bootstrap a ser inserido
  const bootstrapSVG = `
    <span class="bootstrap-icon-wrapper">
      <svg viewBox="0 0 118 94" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" class="bootstrap-icon-svg">
        <path fill="#7952B3" d="M24.5 45.4h24.1c1.1-.1 3.3-.5 5.4-2.1 1.9-1.4 3.5-4.1 3.5-8.4 0-4.4-1.4-7.2-3.5-8.7-2.1-1.6-4.5-1.9-5.4-1.9H24.5V45.4zm-11.4-32h38.3c4.6 0 12 1.1 18.5 6.5 5.3 4.4 8.6 10.8 8.6 19.4 0 7.6-2.7 13.8-7.6 18.3-6.9 6.5-16.8 6.8-19.5 6.8H13.1V13.4z"></path>
        <path fill="#FFFFFF" d="M42.7 56.9H24.5v14.3h19.7c1.4 0 4.4-.2 7.1-2.3 1.9-1.5 3.4-4.1 3.4-8.3 0-3.5-1.4-6.3-3.4-7.8-2.8-2.1-6.3-2-7.7-2h-1l.1 6.1zm-18.2-32h22.6c1.3 0 4-.1 6.3-1.9 1.4-1.1 2.9-3.2 2.9-6.8 0-2.8-1-5.1-2.9-6.5-2.1-1.5-4.7-1.6-6.3-1.6H24.5V24.9zM13 0v81.4h35.2c3.3 0 11.6-.3 18.8-5.6 6.3-4.7 10.1-12 10.1-20.9 0-10.5-4.8-16.8-7.6-19.6-2.3-2.3-5.1-4-8.2-5.3 4.8-2.9 7.9-8 7.9-15.1 0-7.5-3.2-12.2-5.8-14.8C57.2 0 47.8 0 45.1 0H13z"></path>
      </svg>
    </span>
  `;

  // Função para adicionar o SVG
  function addBootstrapSVG() {
    // Encontra todos os elementos que contêm o identificador do Bootstrap sem o SVG
    const bootstrapElements = document.querySelectorAll('.id-tech-bootstrap:not(:has(.bootstrap-icon-wrapper))');
    
    // Para cada elemento encontrado, adiciona o SVG do Bootstrap
    bootstrapElements.forEach(element => {
      // Verifica se o elemento já tem o SVG (evita duplicação)
      if (!element.querySelector('.bootstrap-icon-wrapper')) {
        // Guarda o texto original
        const originalText = element.textContent.trim();
        
        // Limpa o conteúdo e adiciona o SVG + texto original
        element.innerHTML = bootstrapSVG + originalText;
        
        console.log('Bootstrap SVG adicionado a:', element);
      }
    });
  }

  // Executa a função inicialmente
  addBootstrapSVG();
  
  // Também executa após um pequeno atraso para garantir que elementos dinâmicos sejam processados
  setTimeout(addBootstrapSVG, 1000);
  
  // Para snippets carregados dinamicamente
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          // Se novos nós foram adicionados, verifica se precisam do SVG
          addBootstrapSVG();
        }
      });
    });
    
    // Observa mudanças no documento
    observer.observe(document.body, { childList: true, subtree: true });
  }
});
