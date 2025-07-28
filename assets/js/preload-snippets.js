/**
 * Script para pré-carregar todos os snippets antes de inicializar o Isotope
 */
$(document).ready(function() {
  // Lista de snippets para carregar
  const snippetsToLoad = [
    {
      containerId: 'snippet-bootstrap-form-validation-content',
      url: 'coding/main/bootstrap/snippet_bootstrap_form_validation.html'
    },
    {
      containerId: 'snippet-procedure-clean-data-content',
      url: 'coding/main/sql/snippet_procedure_clean_data.html'
    }
    // Adicionar mais snippets aqui conforme necessário
  ];
  
  // Contador de snippets carregados
  let loadedSnippets = 0;
  
  // Função para verificar se todos os snippets foram carregados
  function checkAllSnippetsLoaded() {
    loadedSnippets++;
    if (loadedSnippets === snippetsToLoad.length) {
      console.log('Todos os snippets carregados, inicializando Isotope...');
      // Destacar todos os códigos
      hljs.highlightAll();
      
      // Inicializar o Isotope
      initializeIsotope();
    }
  }
  
  // Função para inicializar o Isotope depois que todos os snippets são carregados
  function initializeIsotope() {
    $('.isotope-layout').each(function() {
      let layout = $(this).attr('data-layout') || 'masonry';
      let filter = $(this).attr('data-default-filter') || '*';
      let sort = $(this).attr('data-sort') || 'original-order';
      
      const $container = $(this).find('.isotope-container');
      
      $container.imagesLoaded(function() {
        const isotope = new Isotope($container[0], {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
        
        // Delegação de evento para garantir clique em todos os filtros, inclusive dinâmicos
        const $parent = $container.closest('.isotope-layout');
        const $filtersContainer = $parent.find('.isotope-filters');
        $filtersContainer.off('click', 'li');
        $filtersContainer.on('click', 'li', function() {
          $filtersContainer.find('li').removeClass('filter-active');
          $(this).addClass('filter-active');
          isotope.arrange({
            filter: $(this).attr('data-filter')
          });
        });
      });
    });
    
    // Configurar os botões de cópia após tudo estar inicializado
    setupCopyButtons();
  }
  
  // Função auxiliar para configurar botões de cópia
  function setupCopyButtons() {
    document.querySelectorAll('.btn-custom[data-target]').forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const codeBlock = document.getElementById(targetId);

        if (codeBlock) {
          const text = codeBlock.textContent.trim();
          navigator.clipboard.writeText(text).then(() => {
            const icon = button.querySelector('iconify-icon');
            if (icon) {
              icon.setAttribute('icon', 'mdi:check');
              setTimeout(() => {
                icon.setAttribute('icon', 'mdi:content-copy');
              }, 1200);
            }
          }).catch(err => {
            console.error('Erro ao copiar o texto:', err);
          });
        }
      });
    });
  }
  
  // Carregar todos os snippets
  snippetsToLoad.forEach(snippet => {
    $(`#${snippet.containerId}`).load(snippet.url, checkAllSnippetsLoaded);
  });
});
