/**
 * Script específico para adicionar o ícone SVG do Bootstrap ao filtro
 */
document.addEventListener('DOMContentLoaded', function() {
  
  // SVG do Bootstrap (exatamente o mesmo usado em tech-icons-universal.js)
  const bootstrapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bootstrap-icon-svg">
    <path fill="#7952B3" d="M333.5,201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4,238.2,333.5,225,333.5,201.4z M517,188.6 c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1,0-55.8,28.1-54.7,58.5c1,29.3-0.3,67.2-9.8,98.1 c-9.6,31-25.7,50.6-52.2,53.1v28.5c26.4,2.5,42.6,22.1,52.2,53.1c9.5,30.9,10.9,68.8,9.8,98.1c-1.1,30.5,22.7,58.5,54.7,58.5h328.7 c32.1,0,55.8-28.1,54.7-58.5c-1-29.3,0.3-67.2,9.8-98.1c9.6-31,25.7-50.6,52.1-53.1v-28.5C542.7,239.2,526.5,219.6,517,188.6z M300.2,375.1h-97.9V136.8h97.4c43.4,0,71.7,23.4,71.7,59.4c0,25.3-19.1,47.9-43.5,51.8v1.3c33.2,3.6,55.5,26.6,55.5,58.3 C383.4,349.7,352.1,375.1,300.2,375.1z M290.2,266.4h-50.1v78.4h52.3c34.2,0,52.3-13.7,52.3-39.5 C344.7,279.6,326.1,266.4,290.2,266.4z"/>
  </svg>`;

  // Função para adicionar o ícone do Bootstrap nos filtros
  function addBootstrapFilterIcon() {
    // Seleciona todos os elementos li que têm o atributo data-filter=".filter-bootstrap"
    const bootstrapFilters = document.querySelectorAll('li[data-filter=".filter-bootstrap"]');
    
    bootstrapFilters.forEach(filter => {
      // Verifica se o ícone já foi adicionado
      if (filter.querySelector('.bootstrap-icon-wrapper')) return;
      
      // Cria o wrapper para o ícone
      const wrapper = document.createElement('span');
      wrapper.className = 'bootstrap-icon-wrapper';
      wrapper.innerHTML = bootstrapSvg;
      
      // Guarda o texto atual
      const originalText = filter.textContent.trim();
      
      // Limpa o filtro e adiciona o ícone + texto
      filter.innerHTML = '';
      filter.appendChild(wrapper);
      filter.appendChild(document.createTextNode(originalText));
      
      // Adiciona estilo para alinhar o texto corretamente
      filter.style.display = 'flex';
      filter.style.alignItems = 'center';
      
      console.log('Ícone Bootstrap adicionado ao filtro:', filter);
    });
  }

  // Executa a função ao carregar a página
  addBootstrapFilterIcon();
  
  // E também após um pequeno atraso (para pegar filtros carregados dinamicamente)
  setTimeout(addBootstrapFilterIcon, 500);
  setTimeout(addBootstrapFilterIcon, 1000);
  
  // Observador de mutações para detectar quando novos filtros são adicionados
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          // Se novos nós forem adicionados, verifica se há novos filtros do Bootstrap
          addBootstrapFilterIcon();
        }
      });
    });
    
    // Observa o elemento que contém os filtros (geralmente portfolio-flters ou #filters)
    const filtersContainer = document.querySelector('.portfolio-filters') || document.querySelector('#filters');
    if (filtersContainer) {
      observer.observe(filtersContainer, { 
        childList: true, 
        subtree: true 
      });
    }
  }
});
