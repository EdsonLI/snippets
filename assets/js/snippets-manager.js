/**
 * AUTO SNIPPETS LOADER
 * Carrega automaticamente snippets de todas as subpastas em coding/main
 * Apenas crie pastas e adicione snippets HTML - o resto é automático!
 * 
 * @author Edson LI - GitHub Copilot
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
  // Configuração - tudo o que você precisa ajustar está aqui
  const SNIPPETS_CONFIG = {
    baseFolder: 'coding/main',                      // Pasta base onde você coloca suas subpastas de snippets
    containerSelector: '.isotope-container',        // Onde os snippets serão carregados
    filtersContainerSelector: '#dynamic-snippets-filters', // Onde os filtros serão atualizados
    defaultActiveFilter: '*',                       // Filtro padrão ativo
    scanInterval: 0,                                // 0 para desativar, ou tempo em ms para scanear por novos snippets
    debug: true                                     // Mostrar mensagens de debug no console
  };

  // Sistema de log para facilitar diagnósticos
  const log = {
    info: (msg) => SNIPPETS_CONFIG.debug && console.info(`[Snippets]: ${msg}`),
    success: (msg) => SNIPPETS_CONFIG.debug && console.log(`✅ [Snippets]: ${msg}`),
    warn: (msg) => console.warn(`[Snippets]: ${msg}`),
    error: (msg, err) => console.error(`${msg}`, err || '')
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
   * Ponto de entrada - inicia o carregamento automático de snippets
   */
  function initAutoSnippets() {
    log.info('Iniciando carregamento automático de snippets...');
    
    // Procurar por pastas e snippets
    discoverFolders()
      .then(setupPeriodicScan)
      .catch(err => log.error('Falha na inicialização', err));
  }

  /**
   * Descobre todas as pastas e snippets disponíveis
   * @returns {Promise} Resolução quando a descoberta inicial estiver concluída
   */
  function discoverFolders() {
    return new Promise((resolve, reject) => {
      // Buscar a lista de pastas no diretório base
      log.info(`Buscando pastas em: ${SNIPPETS_CONFIG.baseFolder}`);
      
      // Usar o timestamp para evitar cache
      const timestamp = new Date().getTime();
      
      fetch(`assets/php/list_directories.php?path=${SNIPPETS_CONFIG.baseFolder}&_t=${timestamp}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
          }
          // Verificar o tipo de conteúdo
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Resposta inválida (não é JSON): ${contentType}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data.success) {
            throw new Error(data.message || 'Falha ao listar diretórios');
          }
          
          log.info(`Pastas encontradas: ${data.directories.join(', ')}`);
          
          // Processar cada pasta encontrada
          const folderPromises = data.directories.map(folderName => {
            // Adicionar à lista de pastas conhecidas
            state.folders.add(folderName);
            
            // Mapear o nome da pasta para a classe de filtro
            state.filterMap.set(folderName, `filter-${folderName.toLowerCase()}`);
            
            // Descobrir snippets nesta pasta
            return discoverSnippetsInFolder(folderName);
          });
          
          return Promise.all(folderPromises);
        })
        .then(() => {
          // Atualizar a interface com as pastas descobertas
          updateFiltersUI();
          
          // Carregar todos os snippets descobertos
          return loadAllDiscoveredSnippets();
        })
        .then(resolve)
        .catch(err => {
          log.error('Erro na descoberta de pastas', err);
          
          // Tentar fazer uma solicitação direta via XHR para ver a resposta bruta
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `assets/php/list_directories.php?path=${SNIPPETS_CONFIG.baseFolder}&debug=1&_t=${timestamp}`, false);
          xhr.send();
          
          log.error('Resposta bruta:', xhr.responseText);
          
          // Mesmo com erro, tentar usar uma lista padrão
          const defaultFolders = ['sql', 'bootstrap', 'php'];
          log.warn(`Usando lista padrão de pastas: ${defaultFolders.join(', ')}`);
          
          defaultFolders.forEach(folder => {
            state.folders.add(folder);
            state.filterMap.set(folder, `filter-${folder.toLowerCase()}`);
          });
          
          // Continuar com as pastas padrão
          updateFiltersUI();
          loadAllDiscoveredSnippets().then(resolve);
        });
    });
  }

  /**
   * Descobre snippets em uma pasta específica
   * @param {string} folderName - Nome da pasta para verificar
   * @returns {Promise} Resolução quando a descoberta de snippets estiver concluída
   */
  function discoverSnippetsInFolder(folderName) {
    return new Promise((resolve, reject) => {
      const folderPath = `${SNIPPETS_CONFIG.baseFolder}/${folderName}`;
      const timestamp = new Date().getTime();
      
      log.info(`Buscando snippets em: ${folderPath}`);
      
      fetch(`assets/php/list_files.php?path=${folderPath}&ext=html&_t=${timestamp}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
          }
          // Verificar o tipo de conteúdo
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Resposta inválida (não é JSON): ${contentType}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data.success) {
            throw new Error(data.message || `Falha ao listar arquivos em ${folderPath}`);
          }
          
          if (data.files.length === 0) {
            log.info(`Nenhum snippet encontrado na pasta ${folderName}`);
            return;
          }
          
          log.info(`Encontrados ${data.files.length} snippets na pasta ${folderName}: ${data.files.join(', ')}`);
          
          // Adicionar cada arquivo à lista de snippets para carregar
          data.files.forEach(file => {
            const snippetPath = `${folderPath}/${file}`;
            if (!state.snippets.has(snippetPath)) {
              state.snippets.set(snippetPath, { loaded: false, folder: folderName });
              state.totalToLoad++;
            }
          });
        })
        .then(resolve)
        .catch(err => {
          log.error(`Erro ao descobrir snippets em ${folderName}`, err);
          
          // Tentar fazer uma solicitação direta via XHR para ver a resposta bruta
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `assets/php/list_files.php?path=${folderPath}&ext=html&debug=1&_t=${timestamp}`, false);
          xhr.send();
          
          log.error(`Resposta bruta para ${folderName}:`, xhr.responseText);
          resolve(); // Continuar mesmo com erro
        });
    });
  }

  /**
   * Atualiza a interface de filtros com as pastas descobertas
   */
  function updateFiltersUI() {
    const $filtersContainer = $(SNIPPETS_CONFIG.filtersContainerSelector);
    if (!$filtersContainer.length) {
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
      // Adicionar atributos para melhorar experiência mobile
      allFilter.setAttribute('role', 'button');
      allFilter.setAttribute('tabindex', '0');
      allFilter.setAttribute('touch-action', 'manipulation');
      allFilter.setAttribute('data-mobile-enhanced', 'true');
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
        // Verificar formatação específica para cada pasta
        let displayName;
        if (folder.toLowerCase() === 'git') {
          displayName = 'git'; // Minúsculas para git
        } else if (folder.toLowerCase() === 'ai') {
          displayName = 'IA'; // Mudar AI para IA
        } else if (['css', 'php', 'sql'].includes(folder.toLowerCase())) {
          displayName = folder.toUpperCase(); // Tudo maiúsculo para CSS, PHP, SQL
        } else {
          displayName = folder.charAt(0).toUpperCase() + folder.slice(1); // Capitalizar para os outros
        }
        
        const filterItem = document.createElement('li');
        filterItem.setAttribute('data-filter', `.${filterClass}`);
        filterItem.style.cursor = 'pointer';
        // Adicionar atributos para melhorar experiência mobile
        filterItem.setAttribute('role', 'button');
        filterItem.setAttribute('tabindex', '0');
        filterItem.setAttribute('touch-action', 'manipulation');
        filterItem.setAttribute('data-mobile-enhanced', 'true');
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
          const timestamp = new Date().getTime();
          fetch(`${snippetPath}?_t=${timestamp}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
              }
              return response.text();
            })
            .then(html => {
              // Adicionar o snippet ao container
              const $container = $(SNIPPETS_CONFIG.containerSelector);
              if (!$container.length) {
                throw new Error(`Container não encontrado: ${SNIPPETS_CONFIG.containerSelector}`);
              }
              
              try {
                // Verificar se o HTML parece válido
                if (!html.includes('portfolio-item') || !html.includes('isotope-item')) {
                  log.warn(`HTML do snippet ${snippetPath} parece inválido: ${html.substring(0, 100)}...`);
                }
                
                // Inserir o HTML
                $container.append(html);
                
                // Marcar como carregado
                snippetInfo.loaded = true;
                state.loadedCount++;
                
                log.info(`Snippet carregado (${state.loadedCount}/${state.totalToLoad}): ${snippetPath}`);
              } catch (insertError) {
                log.error(`Erro ao inserir HTML: ${insertError.message}`, insertError);
                log.warn(`HTML problemático: ${html.substring(0, 100)}...`);
              }
              
              resolveLoad();
            })
            .catch(err => {
              log.error(`Falha ao carregar snippet: ${snippetPath}`, err);
              
              // Tentar fazer uma solicitação direta via XHR para ver a resposta bruta
              try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `${snippetPath}?debug=1&_t=${timestamp}`, false);
                xhr.send();
                
                log.error(`Resposta bruta para ${snippetPath}:`, 
                         xhr.responseText ? xhr.responseText.substring(0, 200) + '...' : 'Vazia');
              } catch (xhrErr) {
                log.error('Erro ao fazer requisição XHR:', xhrErr);
              }
              
              resolveLoad(); // Resolver mesmo com erro
            });
        });
        
        loadPromises.push(loadPromise);
      });
      
      // Aguardar que todos os snippets sejam carregados
      Promise.all(loadPromises)
        .then(() => {
          // Verificar se algum snippet foi carregado
          if (state.loadedCount === 0) {
            log.warn('Nenhum snippet foi carregado com sucesso. Tentando abordagem alternativa...');
            
            // Tentar carregar diretamente os snippets que sabemos que existem
            return loadFallbackSnippets();
          }
          
          return true;
        })
        .then(() => {
          // Destacar todos os blocos de código
          try {
            hljs.highlightAll();
          } catch (hlErr) {
            log.error('Erro ao destacar código:', hlErr);
          }
          
          // Reinicializar o Isotope
          reinitializeIsotope();
          
          log.success(`${state.loadedCount} snippets carregados com sucesso!`);
          resolve();
        });
    });
  }
  
  /**
   * Carrega snippets conhecidos como fallback
   * @returns {Promise} Resolução quando os snippets de fallback forem carregados
   */
  function loadFallbackSnippets() {
    return new Promise((resolve) => {
      log.warn('Carregando snippets de fallback...');
      
      const fallbackSnippets = [
        {
          path: 'coding/main/sql/snippet_procedure_clean_data.html',
          folder: 'sql'
        },
        {
          path: 'coding/main/bootstrap/snippet_bootstrap_form_validation.html',
          folder: 'bootstrap'
        },
        {
          path: 'coding/main/php/snippet_php_cookies_sessions_preferences.html',
          folder: 'php'
        }
      ];
      
      // Tentar carregar cada snippet de fallback
      const loadPromises = fallbackSnippets.map(snippet => {
        return fetch(snippet.path)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            }
            return response.text();
          })
          .then(html => {
            const $container = $(SNIPPETS_CONFIG.containerSelector);
            if ($container.length) {
              $container.append(html);
              state.loadedCount++;
              log.info(`Snippet de fallback carregado: ${snippet.path}`);
            }
          })
          .catch(err => {
            log.error(`Falha ao carregar snippet de fallback: ${snippet.path}`, err);
          });
      });
      
      Promise.all(loadPromises)
        .then(() => {
          log.info(`${state.loadedCount} snippets de fallback carregados`);
          resolve();
        })
        .catch(resolve); // Continuar mesmo com erros
    });
  }

  /**
   * Configura verificação periódica de novas pastas e snippets
   */
  function setupPeriodicScan() {
    if (SNIPPETS_CONFIG.scanInterval > 0) {
      log.info(`Escaneamento periódico configurado a cada ${SNIPPETS_CONFIG.scanInterval}ms`);
      setInterval(() => {
        log.info('Procurando por novos snippets...');
        discoverFolders();
      }, SNIPPETS_CONFIG.scanInterval);
    }
  }

  /**
   * Reinicializa o Isotope após o carregamento dos snippets
   */
  function reinitializeIsotope() {
    // Se não houver elementos para organizar, não inicializar
    const $containers = $(SNIPPETS_CONFIG.containerSelector);
    if (!$containers.length) {
      log.warn('Nenhum container Isotope encontrado');
      return;
    }
    
    // Processar cada container
    $containers.each(function() {
      const $container = $(this);
      // Se já existe uma instância do Isotope, destruí-la
      const existingIso = Isotope.data(this);
      if (existingIso) {
        existingIso.destroy();
      }
      
      // Obter opções do elemento pai
      const parent = $container.closest('.isotope-layout')[0];
      if (!parent) {
        log.warn(`Container isotope sem elemento pai .isotope-layout`);
        return;
      }
      
      // Obter configurações
      const layout = parent.getAttribute('data-layout') || 'masonry';
      const filter = parent.getAttribute('data-default-filter') || '*';
      const sort = parent.getAttribute('data-sort') || 'original-order';
      
      // Aguardar carregamento de imagens antes de inicializar
      if ($container[0]) {
        imagesLoaded($container[0], function() {
          // Criar nova instância do Isotope
          const iso = new Isotope($container[0], {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort,
            transitionDuration: '0.4s'
          });
          
          // Configurar eventos de filtro
          const $filterContainer = $(parent).find('.isotope-filters');
          if ($filterContainer.length) {
            const $filterBtns = $filterContainer.find('li');
            
            // Remover eventos anteriores e readicionar
            $filterBtns.each(function() {
              const $btn = $(this);
              const $newBtn = $btn.clone(false);
              $btn.replaceWith($newBtn);
              
              // Adicionar novo evento
              $newBtn.on('click', function() {
                $filterBtns.removeClass('filter-active');
                $(this).addClass('filter-active');
                
                iso.arrange({
                  filter: $(this).data('filter')
                });
                
                // Atualizar animações AOS se disponível
                if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
                  AOS.refresh();
                }
              });
            });
          }
          
          // Layout final
          setTimeout(() => iso.arrange(), 100);
          
          // Marcar como inicializado
          state.isotopeInitialized = true;
          log.success('Isotope reinicializado com sucesso');
        });
      }
    });
    
    // Configurar botões de cópia
    setupCopyButtons();
  }

  /**
   * Configura botões de cópia para todos os snippets
   * Usa a implementação global definida em copy-buttons-manager.js
   */
  function setupCopyButtons() {
    // Usar a implementação global se disponível
    if (typeof window.setupCopyButtons === 'function') {
      window.setupCopyButtons({
        logger: log  // Passar o logger do snippets-manager
      });
    } else {
      log.error('Global setupCopyButtons function not found!');
    }
  }

  // Detectar se estamos no ambiente local ou em produção
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' || 
                      window.location.hostname.includes('192.168.');
                      
  // Se não conseguirmos acessar a API PHP, usar uma implementação direta
  function useFallbackImplementation() {
    log.warn('Usando implementação de fallback para descoberta de pastas');
    
    // Pastas conhecidas
    const knownFolders = ['sql', 'bootstrap', 'php'];
    
    // Adicionar pastas conhecidas
    knownFolders.forEach(folder => {
      state.folders.add(folder);
      state.filterMap.set(folder, `filter-${folder.toLowerCase()}`);
    });
    
    // Arquivos conhecidos
    const knownFiles = {
      'sql': ['snippet_procedure_clean_data.html'],
      'bootstrap': ['snippet_bootstrap_form_validation.html'],
      'php': ['snippet_php_cookies_sessions_preferences.html']
    };
    
    // Adicionar snippets conhecidos
    knownFolders.forEach(folder => {
      const files = knownFiles[folder] || [];
      files.forEach(file => {
        const snippetPath = `${SNIPPETS_CONFIG.baseFolder}/${folder}/${file}`;
        state.snippets.set(snippetPath, { loaded: false, folder: folder });
        state.totalToLoad++;
      });
    });
    
    // Atualizar a interface
    updateFiltersUI();
    
    // Carregar os snippets
    loadAllDiscoveredSnippets();
  }
  
  // Verificar primeiro se a API PHP está acessível
  fetch('assets/php/test.php?_=' + new Date().getTime())
    .then(response => {
      if (!response.ok || !response.headers.get('content-type').includes('application/json')) {
        throw new Error('API PHP indisponível');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.success) {
        // A API está funcionando, iniciar o sistema normalmente
        log.info('API PHP detectada, usando descoberta automática');
        initAutoSnippets();
      } else {
        // A API não está funcionando corretamente, usar fallback
        useFallbackImplementation();
      }
    })
    .catch(() => {
      // Erro ao acessar a API, usar fallback
      useFallbackImplementation();
    });
});
