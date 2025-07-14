/**
 * AUTO SNIPPETS LOADER - VERSÃO ESTÁTICA
 * Carrega automaticamente snippets de todas as subpastas sem PHP
 * Compatível com hospedagem estática como GitHub Pages
 * 
 * @author Edson LI - GitHub Copilot
 * @version 2.0.0 (Static Edition)
 */
document.addEventListener('DOMContentLoaded', function() {
  // Configuração - tudo o que você precisa ajustar está aqui
  const SNIPPETS_CONFIG = {
    baseFolder: 'coding/main',                  // Pasta base onde você coloca suas subpastas de snippets
    containerSelector: '.isotope-container',    // Onde os snippets serão carregados
    filtersContainerSelector: '#dynamic-snippets-filters', // Onde os filtros serão atualizados
    defaultActiveFilter: '*',                   // Filtro padrão ativo
    debug: true                                 // Mostrar mensagens de debug no console
  };

  // Sistema de log para facilitar diagnósticos
  const log = {
    info: (msg) => SNIPPETS_CONFIG.debug && console.info(`📋 [Snippets]: ${msg}`),
    success: (msg) => SNIPPETS_CONFIG.debug && console.log(`✅ [Snippets]: ${msg}`),
    warn: (msg) => console.warn(`⚠️ [Snippets]: ${msg}`),
    error: (msg, err) => console.error(`❌ [Snippets]: ${msg}`, err || '')
  };

  // Estado do carregador - rastreia o que foi carregado
  const state = {
    folders: new Set(),         // Conjunto de pastas descobertas (evita duplicatas)
    snippets: new Map(),        // Mapeia caminhos de snippets para seu status (carregado/falha)
    loadedCount: 0,             // Contador de snippets carregados com sucesso
    totalToLoad: 0,             // Total de snippets a carregar
    filterMap: new Map(),       // Mapeamento de pastas para classes de filtro
    isotopeInitialized: false   // Rastrear se o Isotope já foi inicializado
  };

  /**
   * Lista estática de pastas e snippets (substitui o PHP)
   * Quando você adicionar novas pastas ou arquivos, atualize esta estrutura
   * 
   * Formato: { 
   *   'nome-da-pasta': ['snippet1.html', 'snippet2.html', ...],
   *   ...
   * }
   */  const STATIC_DIRECTORY_MAP = {
    'bootstrap': ['snippet_bootstrap_form_validation.html'/*, 'snippet_bootstrap_form_validation_teste.html'*/],
    'git': ['snippet_git_change_all_message_commits.html'],
    'isotope': ['snippet_isotope_basic_example.html'],
    'jquery': ['snippet_jquery_toggle_example.html'],
    'php': ['snippet_php_cookies_sessions_preferences.html'],
    'sql': ['snippet_procedure_clean_data.html', 'snippet_procedure_report_basic.html'],
    'sweetalert2': ['snippet_sweetalert2_confirmation_example.html', 'snippet_sweetalert2_select_color_radio_example.html']
    // Última atualização: 14/07/2025 19:43:30
  };

  /**
   * Ponto de entrada - inicia o carregamento automático de snippets
   */
  function initAutoSnippets() {
    log.info('Iniciando carregamento automático de snippets...');
    
    // Em vez de buscar pastas via PHP, usamos nossa estrutura estática
    discoverStaticFolders();
  }

  /**
   * Processa nossa estrutura estática de pastas e arquivos
   */
  function discoverStaticFolders() {
    log.info('Carregando estrutura de pastas estáticas...');
    
    // Para cada pasta na nossa estrutura estática
    for (const [folderName, files] of Object.entries(STATIC_DIRECTORY_MAP)) {
      // Adicionar à lista de pastas conhecidas
      state.folders.add(folderName);
      
      // Mapear o nome da pasta para a classe de filtro
      state.filterMap.set(folderName, `filter-${folderName.toLowerCase()}`);
      
      log.info(`Pasta descoberta: ${folderName} com ${files.length} snippets`);
      
      // Adicionar cada arquivo à lista para carregar
      files.forEach(fileName => {
        const snippetPath = `${SNIPPETS_CONFIG.baseFolder}/${folderName}/${fileName}`;
        if (!state.snippets.has(snippetPath)) {
          state.snippets.set(snippetPath, { loaded: false, folder: folderName });
          state.totalToLoad++;
        }
      });
    }
    
    // Atualizar a interface com as pastas descobertas
    updateFiltersUI();
    
    // Carregar todos os snippets descobertos
    loadAllDiscoveredSnippets();
  }

  /**
   * Atualiza a interface de filtros com as pastas descobertas
   */
  function updateFiltersUI() {
    const filtersContainer = document.querySelector(SNIPPETS_CONFIG.filtersContainerSelector);
    if (!filtersContainer) {
      log.warn(`Container de filtros não encontrado: ${SNIPPETS_CONFIG.filtersContainerSelector}`);
      return;
    }
    
    // Verificar se o filtro "All" já existe
    let allFilterExists = false;
    Array.from(filtersContainer.children).forEach(child => {
      if (child.getAttribute('data-filter') === '*') {
        allFilterExists = true;
        // Garantir que tenha a classe filter-active
        child.classList.add('filter-active');
      }
    });
    
    // Adicionar filtro "All" se não existir
    if (!allFilterExists) {
      const allFilter = document.createElement('li');
      allFilter.setAttribute('data-filter', '*');
      allFilter.classList.add('filter-active');
      allFilter.style.cursor = 'pointer';
      allFilter.textContent = 'All';
      filtersContainer.prepend(allFilter);
    }
    
    // Adicionar filtros para cada pasta descoberta
    state.folders.forEach(folder => {
      // Verificar se este filtro já existe
      const filterClass = state.filterMap.get(folder);
      let filterExists = false;
      
      Array.from(filtersContainer.children).forEach(child => {
        if (child.getAttribute('data-filter') === `.${filterClass}`) {
          filterExists = true;
        }
      });
      
      // Criar novo filtro se não existir
      if (!filterExists) {
        const displayName = folder.charAt(0).toUpperCase() + folder.slice(1); // Capitalizar
        const filterItem = document.createElement('li');
        filterItem.setAttribute('data-filter', `.${filterClass}`);
        filterItem.style.cursor = 'pointer';
        filterItem.textContent = displayName;
        filtersContainer.appendChild(filterItem);
        log.info(`Adicionado novo filtro: ${displayName}`);
      }
    });
  }

  /**
   * Carrega todos os snippets descobertos
   * @returns {Promise} Resolução quando todos os snippets forem carregados
   */
  function loadAllDiscoveredSnippets() {
    return new Promise((resolve, reject) => {
      // Se não há snippets para carregar
      if (state.totalToLoad === 0) {
        log.warn('Nenhum snippet encontrado para carregar');
        resolve();
        return;
      }
      
      log.info(`Carregando ${state.totalToLoad} snippets...`);
      
      // Array de promessas para carregar todos os snippets
      const loadPromises = [];
      
      // Para cada snippet na lista
      state.snippets.forEach((snippetInfo, snippetPath) => {
        if (snippetInfo.loaded) return; // Pular se já foi carregado
        
        // Criar uma promessa para carregar este snippet
        const loadPromise = new Promise((resolveLoad) => {
          fetch(snippetPath)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
              }
              return response.text();
            })
            .then(html => {
              // Adicionar o snippet ao container
              const container = document.querySelector(SNIPPETS_CONFIG.containerSelector);
              if (!container) {
                throw new Error(`Container não encontrado: ${SNIPPETS_CONFIG.containerSelector}`);
              }
              
              // Inserir o HTML
              container.insertAdjacentHTML('beforeend', html);
              
              // Marcar como carregado
              snippetInfo.loaded = true;
              state.loadedCount++;
              
              log.info(`Snippet carregado (${state.loadedCount}/${state.totalToLoad}): ${snippetPath}`);
              resolveLoad();
            })
            .catch(err => {
              log.error(`Falha ao carregar snippet: ${snippetPath}`, err);
              resolveLoad(); // Resolver mesmo com erro
            });
        });
        
        loadPromises.push(loadPromise);
      });
      
      // Aguardar que todos os snippets sejam carregados
      Promise.all(loadPromises)
        .then(() => {
          // Destacar todos os blocos de código
          hljs.highlightAll();
          
          // Reinicializar o Isotope
          reinitializeIsotope();
          
          log.success(`${state.loadedCount} snippets carregados com sucesso!`);
          resolve();
        });
    });
  }

  /**
   * Reinicializa o Isotope após o carregamento dos snippets
   */
  function reinitializeIsotope() {
    // Se não houver elementos para organizar, não inicializar
    const containers = document.querySelectorAll(SNIPPETS_CONFIG.containerSelector);
    if (!containers.length) {
      log.warn('Nenhum container Isotope encontrado');
      return;
    }
    
    // Processar cada container
    containers.forEach(container => {
      // Se já existe uma instância do Isotope, destruí-la
      const existingIso = Isotope.data(container);
      if (existingIso) {
        existingIso.destroy();
      }
      
      // Obter opções do elemento pai
      const parent = container.closest('.isotope-layout');
      if (!parent) {
        log.warn(`Container isotope sem elemento pai .isotope-layout`);
        return;
      }
      
      // Obter configurações
      const layout = parent.getAttribute('data-layout') || 'masonry';
      const filter = parent.getAttribute('data-default-filter') || '*';
      const sort = parent.getAttribute('data-sort') || 'original-order';
      
      // Aguardar carregamento de imagens antes de inicializar
      imagesLoaded(container, function() {
        // Criar nova instância do Isotope
        const iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
          transitionDuration: '0.4s'
        });
        
        // Configurar eventos de filtro
        const filterContainer = parent.querySelector('.isotope-filters');
        if (!filterContainer) {
          log.warn('Container de filtros .isotope-filters não encontrado');
          return;
        }
        
        // Clonar toda a lista de filtros para remover todos os eventos atribuídos anteriormente
        const newFilterList = filterContainer.cloneNode(true);
        filterContainer.parentNode.replaceChild(newFilterList, filterContainer);
        
        // Obter referência aos novos botões
        const filterBtns = newFilterList.querySelectorAll('li');
        
        // Garantir que apenas o botão 'All' (primeiro) tenha a classe filter-active
        filterBtns.forEach((btn, index) => {
          if (index === 0) {
            btn.classList.add('filter-active');
          } else {
            btn.classList.remove('filter-active');
          }
        });
        
        // Adicionar novos eventos de clique
        filterBtns.forEach(btn => {
          btn.addEventListener('click', function(e) {
            // Evitar comportamento padrão e propagação
            e.preventDefault();
            e.stopPropagation();
            
            // Remover classe ativa de todos os botões
            filterBtns.forEach(b => b.classList.remove('filter-active'));
            
            // Adicionar classe ativa apenas ao botão clicado
            this.classList.add('filter-active');
            
            // Filtrar os itens
            iso.arrange({
              filter: this.getAttribute('data-filter')
            });
            
            // Atualizar animações AOS se disponível
            if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
              AOS.refresh();
            }
          });
        });
        
        // Layout final
        setTimeout(() => iso.arrange(), 100);
        
        // Marcar como inicializado
        state.isotopeInitialized = true;
        log.success('Isotope reinicializado com sucesso');
      });
    });
    
    // Configurar botões de cópia
    setupCopyButtons();
  }

  /**
   * Configura botões de cópia para todos os snippets e ajusta alinhamento dos botões flutuantes
   */
  function setupCopyButtons() {
    // Garantir que todos os snippet-actions-float estejam alinhados à direita
    document.querySelectorAll('.snippet-actions-float').forEach(actionBar => {
      if (!actionBar.classList.contains('justify-content-end')) {
        actionBar.classList.add('justify-content-end');
      }
    });
    
    // Configurar botões de cópia
    document.querySelectorAll('.btn-custom[data-target]').forEach(button => {
      // Pular se já inicializado
      if (button.hasAttribute('data-copy-initialized')) return;
      
      // Marcar como inicializado
      button.setAttribute('data-copy-initialized', 'true');
      
      // Adicionar evento de clique
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const codeBlock = document.getElementById(targetId);

        if (codeBlock) {
          // Copiar o texto para a área de transferência
          const text = codeBlock.textContent.trim();
          navigator.clipboard.writeText(text)
            .then(() => {
              // Feedback visual
              const icon = button.querySelector('iconify-icon');
              if (icon) {
                const originalIcon = icon.getAttribute('icon');
                icon.setAttribute('icon', 'mdi:check');
                setTimeout(() => {
                  icon.setAttribute('icon', originalIcon || 'mdi:content-copy');
                }, 1200);
              }
            })
            .catch(err => log.error('Erro ao copiar texto', err));
        } else {
          log.error(`Bloco de código não encontrado: ${targetId}`);
        }
      });
    });
  }

  /**
   * MÉTODO PARA ADICIONAR NOVOS SNIPPETS OU PASTAS DINAMICAMENTE
   * Chame esta função quando quiser adicionar snippets ou pastas manualmente
   * @param {string} folder Nome da pasta
   * @param {Array<string>} files Lista de arquivos HTML na pasta
   */
  window.addDynamicSnippets = function(folder, files) {
    log.info(`Adicionando dinamicamente: Pasta ${folder} com ${files.length} snippets`);
    
    // Adicionar à estrutura estática
    STATIC_DIRECTORY_MAP[folder] = files;
    
    // Adicionar ao estado
    state.folders.add(folder);
    state.filterMap.set(folder, `filter-${folder.toLowerCase()}`);
    
    // Adicionar arquivos ao estado
    files.forEach(fileName => {
      const snippetPath = `${SNIPPETS_CONFIG.baseFolder}/${folder}/${fileName}`;
      if (!state.snippets.has(snippetPath)) {
        state.snippets.set(snippetPath, { loaded: false, folder: folder });
        state.totalToLoad++;
      }
    });
    
    // Atualizar interface e carregar snippets
    updateFiltersUI();
    return loadAllDiscoveredSnippets();
  };

  // Iniciar o sistema quando o DOM estiver pronto
  initAutoSnippets();
});
