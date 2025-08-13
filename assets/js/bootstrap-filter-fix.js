/**
 * Script específico para corrigir o posicionamento do filtro Bootstrap
 * Este script substitui o comportamento definido em bootstrap-filter-icon.js
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para remover qualquer formatação personalizada do filtro Bootstrap
  function fixBootstrapFilterPosition() {
    // Seleciona todos os elementos li que têm o atributo data-filter=".filter-bootstrap"
    const bootstrapFilters = document.querySelectorAll('li[data-filter=".filter-bootstrap"]');
    
    bootstrapFilters.forEach(filter => {
      // Remove qualquer wrapper ou ícone personalizado
      const wrapper = filter.querySelector('.bootstrap-icon-wrapper');
      if (wrapper) {
        wrapper.remove();
      }
      
      // Certifica-se de que o estilo inline seja removido
      filter.style.display = '';
      filter.style.alignItems = '';
      filter.style.paddingTop = '';
      filter.style.marginTop = '';
      filter.style.position = '';
      
      // Se o filtro ficou vazio depois de remover o wrapper, restaure o texto
      if (filter.textContent.trim() === '') {
        filter.textContent = 'Bootstrap';
      }
    });
  }

  // Executa a função ao carregar a página
  fixBootstrapFilterPosition();
  
  // E também após um pequeno atraso (para garantir que a função execute após o outro script)
  setTimeout(fixBootstrapFilterPosition, 100);
  setTimeout(fixBootstrapFilterPosition, 500);
  
  // Observador de mutações para detectar quando novos filtros são adicionados ou modificados
  // Usando uma variável para controle de debounce para evitar loops infinitos
  if (window.MutationObserver) {
    let debounceTimer;
    const observer = new MutationObserver(function(mutations) {
      // Verifica se alguma das mutações afetou o elemento do Bootstrap
      let shouldProcess = false;
      for (let mutation of mutations) {
        if (mutation.target.getAttribute && mutation.target.getAttribute('data-filter') === '.filter-bootstrap') {
          shouldProcess = true;
          break;
        }
        
        // Verifica os nós adicionados
        if (mutation.addedNodes && mutation.addedNodes.length) {
          for (let node of mutation.addedNodes) {
            if (node.nodeType === 1 && node.getAttribute && node.getAttribute('data-filter') === '.filter-bootstrap') {
              shouldProcess = true;
              break;
            }
          }
        }
      }
      
      // Só executa se realmente envolver o filtro Bootstrap
      if (shouldProcess) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          fixBootstrapFilterPosition();
        }, 100);
      }
    });
    
    // Observa o elemento que contém os filtros
    const filtersContainer = document.querySelector('.portfolio-filters') || document.querySelector('#filters');
    if (filtersContainer) {
      observer.observe(filtersContainer, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: false
      });
    }
  }
});
