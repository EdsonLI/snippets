/**
 * Corrige o texto dos filtros para AI, CSS, PHP e SQL
 * Exibe esses termos em letras maiúsculas
 */
document.addEventListener('DOMContentLoaded', function() {
  // Lista de filtros que devem estar em maiúsculas
  const upperCaseFilters = ['ai', 'css', 'php', 'sql'];
  
  // Função para corrigir os filtros existentes
  function fixFilterText() {
    // Pega o container de filtros
    const filtersContainer = document.querySelector('#dynamic-snippets-filters');
    if (!filtersContainer) return;
    
    // Para cada item de filtro
    Array.from(filtersContainer.querySelectorAll('li[data-filter]')).forEach(filterItem => {
      const filterValue = filterItem.getAttribute('data-filter');
      
      // Extrai o nome do filtro a partir do valor (removendo "." e "filter-")
      if (filterValue && filterValue !== '*') {
        const filterName = filterValue.replace('.filter-', '');
        
        // Se é um dos filtros que devem estar em maiúsculas
        if (upperCaseFilters.includes(filterName.toLowerCase())) {
          // Define o texto para maiúsculas
          filterItem.textContent = filterName.toUpperCase();
          console.info(`Filtro corrigido: ${filterName} -> ${filterItem.textContent}`);
        }
      }
    });
  }
  
  // Executa imediatamente
  fixFilterText();
  
  // Executa novamente após um pequeno delay para garantir que pegue filtros dinâmicos
  setTimeout(fixFilterText, 500);
  setTimeout(fixFilterText, 1500);
  
  // Cria uma MutationObserver para observar mudanças no container de filtros
  const observer = new MutationObserver(fixFilterText);
  
  // Inicia a observação no container de filtros
  const filtersContainer = document.querySelector('#dynamic-snippets-filters');
  if (filtersContainer) {
    observer.observe(filtersContainer, { 
      childList: true,      // observa adição/remoção de nós filhos
      subtree: true,        // observa alterações em toda a árvore
      characterData: true,  // observa alterações no conteúdo de texto
      characterDataOldValue: true
    });
  }
});
