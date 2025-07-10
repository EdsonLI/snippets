/**
 * Gerenciador dinâmico de snippets
 * Carrega automaticamente snippets de subpastas e configura filtros Isotope
 */
document.addEventListener('DOMContentLoaded', function() {
  // Configuração
  const snippetsConfig = {
    baseFolder: 'coding/main', // Pasta base onde estão as subpastas de snippets
    containerSelector: '#dynamic-snippets-container', // Seletor do container onde os snippets serão carregados
    filtersContainerSelector: '#dynamic-snippets-filters', // Seletor do container onde os filtros serão adicionados
    defaultActiveFilter: '*' // Filtro padrão ativo inicialmente
  };

  // Estado interno
  const state = {
    folders: [], // Lista de pastas encontradas
    loadedSnippets: 0, // Contagem de snippets carregados
    totalSnippets: 0, // Total de snippets a carregar
    filterMap: {} // Mapeamento de pastas para classes de filtro
  };

  /**
   * Inicializa o carregamento dinâmico de snippets
   */
  function initDynamicSnippets() {
    // Primeiro passo: obter a lista de subpastas
    fetchFolders(snippetsConfig.baseFolder)
      .then(folders => {
        state.folders = folders;
        return Promise.all(folders.map(folder => fetchSnippetsInFolder(`${snippetsConfig.baseFolder}/${folder}`)));
      })
      .then(snippetsLists => {
        // Criar filtros para cada pasta
        setupFilters(state.folders);
        
        // Calcular o total de snippets para carregar
        state.totalSnippets = snippetsLists.flat().length;
        
        // Carregar todos os snippets
        return loadAllSnippets(snippetsLists);
      })
      .then(() => {
        console.log('Todos os snippets foram carregados com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao carregar snippets:', error);
      });
  }

  /**
   * Obtém a lista de subpastas na pasta base
   * @param {string} basePath - Caminho base para buscar subpastas
   * @returns {Promise<Array<string>>} - Lista de nomes de subpastas
   */
  function fetchFolders(basePath) {
    return new Promise((resolve, reject) => {
      // Usar uma requisição AJAX para obter a lista de pastas
      // Como estamos em ambiente local, vamos simular com um array predefinido
      // Em produção, você precisaria de um endpoint PHP que liste as pastas
      
      // Simulação:
      $.ajax({
        url: 'assets/php/list_folders.php',
        data: { path: basePath },
        dataType: 'json',
        success: function(data) {
          if (data.success && data.folders) {
            resolve(data.folders);
          } else {
            console.warn('Não foi possível obter a lista de pastas. Usando lista padrão.');
            // Lista padrão das pastas que sabemos que existem
            resolve(['sql', 'bootstrap']);
          }
        },
        error: function() {
          console.warn('Erro ao acessar o endpoint. Usando lista padrão.');
          // Lista padrão em caso de erro
          resolve(['sql', 'bootstrap']);
        }
      });
    });
  }

  /**
   * Obtém a lista de snippets em uma pasta
   * @param {string} folderPath - Caminho da pasta para buscar snippets
   * @returns {Promise<Array<Object>>} - Lista de objetos de snippet
   */
  function fetchSnippetsInFolder(folderPath) {
    return new Promise((resolve, reject) => {
      // Usar uma requisição AJAX para obter a lista de arquivos na pasta
      $.ajax({
        url: 'assets/php/list_files.php',
        data: { path: folderPath },
        dataType: 'json',
        success: function(data) {
          if (data.success && data.files) {
            resolve(data.files);
          } else {
            console.warn(`Não foi possível obter a lista de arquivos para ${folderPath}. Usando lista padrão.`);
            
            // Lista padrão baseada no caminho da pasta
            if (folderPath.endsWith('sql')) {
              resolve([{
                path: `${folderPath}/snippet_procedure_clean_data.html`,
                name: 'snippet_procedure_clean_data.html',
                folder: 'sql'
              }]);
            } else if (folderPath.endsWith('bootstrap')) {
              resolve([{
                path: `${folderPath}/snippet_bootstrap_form_validation.html`,
                name: 'snippet_bootstrap_form_validation.html',
                folder: 'bootstrap'
              }]);
            } else {
              // Pasta desconhecida
              resolve([]);
            }
          }
        },
        error: function() {
          console.warn(`Erro ao acessar o endpoint para ${folderPath}. Usando lista padrão.`);
          
          // Lista padrão em caso de erro
          if (folderPath.endsWith('sql')) {
            resolve([{
              path: `${folderPath}/snippet_procedure_clean_data.html`,
              name: 'snippet_procedure_clean_data.html',
              folder: 'sql'
            }]);
          } else if (folderPath.endsWith('bootstrap')) {
            resolve([{
              path: `${folderPath}/snippet_bootstrap_form_validation.html`,
              name: 'snippet_bootstrap_form_validation.html',
              folder: 'bootstrap'
            }]);
          } else {
            // Pasta desconhecida
            resolve([]);
          }
        }
      });
    });
  }

  /**
   * Configura os filtros com base nas pastas encontradas
   * @param {Array<string>} folders - Lista de nomes de pastas
   */
  function setupFilters(folders) {
    // Mapear nomes de pastas para classes de filtro
    folders.forEach(folder => {
      state.filterMap[folder] = `filter-${folder.toLowerCase()}`;
    });
    
    // Adicionar filtros ao container de filtros
    const $filtersContainer = $(snippetsConfig.filtersContainerSelector);
    
    // Adicionar o filtro "All"
    $filtersContainer.append(`
      <li data-filter="*" class="filter-active" style="cursor: pointer;">All</li>
    `);
    
    // Adicionar um filtro para cada pasta
    folders.forEach(folder => {
      const displayName = folder.charAt(0).toUpperCase() + folder.slice(1); // Capitalizar
      $filtersContainer.append(`
        <li data-filter=".${state.filterMap[folder]}" style="cursor: pointer;">${displayName}</li>
      `);
    });
  }

  /**
   * Carrega todos os snippets de todas as pastas
   * @param {Array<Array<Object>>} snippetsLists - Lista de listas de snippets por pasta
   */
  function loadAllSnippets(snippetsLists) {
    return new Promise((resolve, reject) => {
      // Manter controle de quantos snippets foram carregados
      let loadedCount = 0;
      const totalCount = snippetsLists.flat().length;
      
      // Se não houver snippets, resolver imediatamente
      if (totalCount === 0) {
        resolve();
        return;
      }
      
      // Carregar cada snippet
      snippetsLists.forEach(snippets => {
        snippets.forEach(snippet => {
          // Carregar o snippet
          $.ajax({
            url: snippet.path,
            dataType: 'html',
            success: function(data) {
              // Adicionar o snippet ao container
              $(snippetsConfig.containerSelector).append(data);
              
              // Atualizar contador
              loadedCount++;
              
              // Se todos os snippets foram carregados, reinicializar o Isotope
              if (loadedCount === totalCount) {
                // Destacar código
                hljs.highlightAll();
                
                // Reinicializar o Isotope
                reinitializeIsotope();
                
                // Resolver a promessa
                resolve();
              }
            },
            error: function() {
              console.error(`Erro ao carregar snippet: ${snippet.path}`);
              loadedCount++;
              
              if (loadedCount === totalCount) {
                // Mesmo com erro, tentamos inicializar com os snippets que foram carregados
                reinitializeIsotope();
                resolve();
              }
            }
          });
        });
      });
    });
  }

  /**
   * Reinicializa o Isotope após o carregamento de todos os snippets
   */
  function reinitializeIsotope() {
    // Encontrar e destruir todas as instâncias do Isotope
    $('.isotope-container').each(function() {
      const iso = Isotope.data(this);
      if (iso) {
        iso.destroy();
      }
    });
    
    // Reinicializar o Isotope para todos os containers
    $('.isotope-layout').each(function() {
      const layout = $(this).attr('data-layout') || 'masonry';
      const filter = $(this).attr('data-default-filter') || '*';
      const sort = $(this).attr('data-sort') || 'original-order';
      const container = $(this).find('.isotope-container')[0];
      
      // Aguardar o carregamento das imagens
      $(container).imagesLoaded(function() {
        // Inicializar uma nova instância do Isotope
        const iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
          transitionDuration: '0.4s'
        });
        
        // Configurar os eventos de filtro
        const filterBtns = $(container).closest('.isotope-layout').find('.isotope-filters li');
        filterBtns.off('click').on('click', function() {
          filterBtns.removeClass('filter-active');
          $(this).addClass('filter-active');
          iso.arrange({
            filter: $(this).attr('data-filter')
          });
          
          // Executar a animação AOS se disponível
          if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
            AOS.refresh();
          }
        });
        
        // Executar um layout final após um pequeno atraso
        setTimeout(function() {
          iso.arrange();
        }, 100);
      });
    });
    
    // Configurar botões de cópia
    setupCopyButtons();
  }

  /**
   * Configura os botões de cópia para os snippets
   */
  function setupCopyButtons() {
    document.querySelectorAll('.btn-custom[data-target]').forEach(button => {
      // Verificar se o botão já foi inicializado
      if (button.hasAttribute('data-copy-initialized')) return;
      
      // Marcar o botão como inicializado
      button.setAttribute('data-copy-initialized', 'true');
      
      // Adicionar evento de clique
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
        } else {
          console.error('Bloco de código não encontrado para o ID:', targetId);
        }
      });
    });
  }

  // Inicializar quando o DOM estiver pronto
  if ($(snippetsConfig.containerSelector).length) {
    // Se o container existe, inicializar
    initDynamicSnippets();
  } else {
    console.warn(`Container de snippets não encontrado: ${snippetsConfig.containerSelector}`);
  }
});
