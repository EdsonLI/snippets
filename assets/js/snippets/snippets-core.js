/**
 * Arquivo consolidado com funcionalidades centrais para gerenciamento de snippets
 * Combina as funcionalidades de snippet-loader.js, snippets-manager.js, 
 * snippet-external-links.js e snippet-scroll-indicator.js
 * 
 * Esta versão foi otimizada para compatibilidade universal com todos os ambientes,
 * incluindo GitHub Pages, usando uma abordagem JavaScript pura sem dependências de back-end.
 * 
 * @author EdsonLI e GitHub Copilot
 * @version 1.1.0 (jQuery - Universal Compatibility)
 */

$(function() {
  "use strict";
  
  // Detecção automática do ambiente (GitHub Pages ou desenvolvimento local)
  const isGitHubPages = window.location.hostname === 'edsonli.github.io';
  const basePath = isGitHubPages ? '/snippets' : '';
  
  // Configuração para o gerenciador de snippets
  const SNIPPETS_CONFIG = {
    // Seletores principais
    containerSelector: '.isotope-container',
    filtersContainerSelector: '.portfolio-filters',
    portfolioItemSelector: '.isotope-item',
    
    // Caminhos padrão - ajustados para GitHub Pages quando necessário
    basePath: basePath, // Caminho base para o repositório
    codingPath: `${basePath}/coding`,
    indexingPath: `${basePath}/coding/indexing`,
    
    // Opções de isotope
    isotopeOptions: {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry',
      transitionDuration: '0.5s'
    },
    
    // Configurações específicas de caminhos
    pathMapping: {
      'coding': `${basePath}/coding/main`,
      'indexing': `${basePath}/coding/indexing`
    },
    
    // Controle de carregamento
    maxSnippetsPerFolder: 10,
    scanInterval: 8000,
    
    // Informação sobre ambiente para ajustes de caminhos
    isGitHubPages: isGitHubPages,
    
    // Debug
    debug: true
  };
  
  // Estado interno
  const state = {
    loadedFolders: [],
    discoveredFiles: {},
    loadedSnippets: [],
    isotopeInitialized: false,
    scanning: false,
    loadedCount: 0,
    fallbackLoaded: false
  };
  
  // Sistema de logs
  const log = {
    info: (msg) => SNIPPETS_CONFIG.debug && console.info(`📌 [Snippets]: ${msg}`),
    success: (msg) => SNIPPETS_CONFIG.debug && console.log(`✅ [Snippets]: ${msg}`),
    warn: (msg) => console.warn(`⚠️ [Snippets]: ${msg}`),
    error: (msg, err) => console.error(`❌ [Snippets]: ${msg}`, err || '')
  };
  
  /**
   * =================================
   * CARREGADOR DE SNIPPETS
   * =================================
   */
  
  /**
   * Carrega um snippet dinamicamente no DOM
   * @param {string} snippetPath - Caminho para o arquivo de snippet HTML
   * @param {function} callback - Função a ser chamada após o carregamento (opcional)
   */
  function loadDynamicSnippet(snippetPath, callback) {
    // Adicionar timestamp para evitar cache
    const timestamp = new Date().getTime();
    const url = `${snippetPath}?_t=${timestamp}`;
    
    log.info(`Carregando snippet: ${url}`);
    
    // Fazer a requisição AJAX para o arquivo HTML
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'html',
      success: function(html) {
        log.success(`Snippet carregado com sucesso: ${snippetPath}`);
        
        // Elemento container para snippets
        const $container = $(SNIPPETS_CONFIG.containerSelector);
        
        if ($container.length) {
          // Adicionar o HTML ao container
          $container.append(html);
          
          // Reinicializar o Isotope para organizar os novos elementos
          setTimeout(function() {
            reinitializeIsotope();
            
            // Inicializar botões de cópia
            setupCopyButtons();
            
            // Chamar o callback se fornecido
            if (typeof callback === 'function') {
              callback(html);
            }
          }, 300);
        } else {
          log.error(`Container não encontrado: ${SNIPPETS_CONFIG.containerSelector}`);
        }
      },
      error: function(xhr, status, error) {
        log.error(`Erro ao carregar snippet ${snippetPath}`, error);
        
        // Tentar novamente após 1 segundo em caso de erro
        if (typeof callback === 'function') {
          setTimeout(function() {
            loadDynamicSnippet(snippetPath, callback);
          }, 1000);
        }
      }
    });
  }
  
  // Expor a função globalmente
  window.loadDynamicSnippet = loadDynamicSnippet;
  
  /**
   * =================================
   * GERENCIADOR DE SNIPPETS
   * =================================
   */
  
  /**
   * Lista estática de arquivos de snippets disponíveis no projeto
   */
  const staticSnippetsMap = {
    'bootstrap': [
      'snippet_bootstrap_accordion.html',
      'snippet_bootstrap_alert.html',
      'snippet_bootstrap_form_validation.html',
      'snippet_bootstrap_card.html',
      'snippet_bootstrap_carousel.html',
      'snippet_bootstrap_modal.html'
    ],
    'css': [
      'snippet_css_flexbox_basics.html',
      'snippet_css_grid_layout.html',
      'snippet_css_media_queries.html',
      'snippet_css_transitions.html',
      'snippet_css_variables.html'
    ],
    'html': [
      'snippet_html_basic_structure.html',
      'snippet_html_form.html',
      'snippet_html_tables.html',
      'snippet_html_semantic_elements.html'
    ],
    'javascript': [
      'snippet_js_async_await.html',
      'snippet_js_dom_manipulation.html',
      'snippet_js_fetch_api.html',
      'snippet_js_promises.html'
    ],
    'jquery': [
      'snippet_jquery_ajax_basic.html',
      'snippet_jquery_animations.html',
      'snippet_jquery_dom_manipulation.html',
      'snippet_jquery_event_handling.html'
    ],
    'php': [
      'snippet_php_database_connection.html',
      'snippet_php_file_handling.html',
      'snippet_php_form_processing.html'
    ],
    'git': [
      'snippet_git_basic_commands.html',
      'snippet_git_branching.html',
      'snippet_git_workflow.html'
    ],
    'ai': [
      'snippet_ai_prompt_engineering.html',
      'snippet_ai_chatgpt_api.html'
    ],
    'outros': [
      'snippet_markdown_syntax.html',
      'snippet_regex_patterns.html'
    ]
  };

  /**
   * Descobre as pastas disponíveis e atualiza a interface
   * Usando uma abordagem puramente baseada em JavaScript para garantir
   * compatibilidade universal com todos os ambientes, incluindo GitHub Pages.
   * 
   * A estratégia atual usa um mapa estático predefinido de snippets disponíveis,
   * permitindo funcionamento consistente em ambientes hospedados e locais.
   */
  function discoverFolders() {
    if (state.scanning) {
      log.warn('Já está escaneando pastas, ignorando esta chamada');
      return;
    }
    
    state.scanning = true;
    log.info('Iniciando descoberta de pastas...');
    
    // Lista de pastas com snippets
    const folders = ['bootstrap', 'css', 'html', 'javascript', 'jquery', 'php', 'git', 'ai', 'outros'];
    
    // Usamos sempre o mapa estático para compatibilidade com todos os ambientes
    log.info('Usando mapa de snippets predefinido para compatibilidade universal');
    
    folders.forEach(folderName => {
      if (staticSnippetsMap[folderName]) {
        // Usar os arquivos predefinidos do mapa estático
        state.discoveredFiles[folderName] = staticSnippetsMap[folderName];
        if (!state.loadedFolders.includes(folderName)) {
          state.loadedFolders.push(folderName);
        }
        log.success(`Carregados ${staticSnippetsMap[folderName].length} snippets para ${folderName}`);
      }
    });
    
    // Atualizar a UI com os dados estáticos
    updateFiltersUI();
    loadDiscoveredSnippets();
    state.scanning = false;
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
    $filtersContainer.find('li').each(function() {
      if ($(this).attr('data-filter') === '*') {
        allFilterExists = true;
        return false;
      }
    });
    
    // Se não existir, adicionar o filtro "All"
    if (!allFilterExists) {
      const $allFilter = $('<li>', {
        'data-filter': '*',
        'class': 'filter-active',
        text: 'All'
      });
      $filtersContainer.append($allFilter);
    }
    
    // Adicionar filtros para cada pasta descoberta
    for (const folderName in state.discoveredFiles) {
      if (state.discoveredFiles.hasOwnProperty(folderName) && state.discoveredFiles[folderName].length > 0) {
        // Verificar se o filtro já existe
        let filterExists = false;
        $filtersContainer.find('li').each(function() {
          if ($(this).attr('data-filter') === `.filter-${folderName}`) {
            filterExists = true;
            return false;
          }
        });
        
        // Se não existir, adicionar o filtro
        if (!filterExists) {
          const $filter = $('<li>', {
            'data-filter': `.filter-${folderName}`,
            'class': `filter-${folderName}`,
            text: folderName.charAt(0).toUpperCase() + folderName.slice(1)
          });
          $filtersContainer.append($filter);
        }
      }
    }
    
    // Reconfigurar os filtros do Isotope após adicionar novos filtros
    $filtersContainer.find('li').on('click', function() {
      $filtersContainer.find('li').removeClass('filter-active');
      $(this).addClass('filter-active');
      
      const filterValue = $(this).attr('data-filter');
      const $container = $(SNIPPETS_CONFIG.containerSelector);
      
      if ($container.length) {
        const iso = Isotope.data($container[0]);
        if (iso) {
          iso.arrange({ filter: filterValue });
        }
      }
      
      return false;
    });
    
    log.success('Interface de filtros atualizada');
  }
  
  /**
   * Carrega os snippets descobertos
   */
  function loadDiscoveredSnippets() {
    // Verificar se temos snippets para carregar
    let snippetsToLoad = [];
    
    // Para cada pasta, selecionar um número limitado de snippets
    for (const folderName in state.discoveredFiles) {
      if (state.discoveredFiles.hasOwnProperty(folderName)) {
        const filesInFolder = state.discoveredFiles[folderName];
        
        // Pegar apenas um número limitado de arquivos aleatoriamente
        const shuffled = [...filesInFolder].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, SNIPPETS_CONFIG.maxSnippetsPerFolder);
        
        selected.forEach(file => {
          // Ajustar o caminho dependendo se estamos no GitHub Pages ou ambiente local
          const baseFolderPath = SNIPPETS_CONFIG.isGitHubPages ? 
            `${SNIPPETS_CONFIG.basePath}/coding/indexing` : 
            `${SNIPPETS_CONFIG.pathMapping['indexing'] || SNIPPETS_CONFIG.codingPath}`;
          const snippetPath = `${baseFolderPath}/snippets_${folderName}/${file}`;
          
          // Verificar se o snippet já foi carregado
          if (!state.loadedSnippets.includes(snippetPath)) {
            snippetsToLoad.push({
              path: snippetPath,
              folder: folderName,
              file: file,
              loaded: false
            });
            
            // Marcar como carregado
            state.loadedSnippets.push(snippetPath);
          }
        });
      }
    }
    
    // Embaralhar a lista de snippets para uma distribuição mais equilibrada
    snippetsToLoad = snippetsToLoad.sort(() => 0.5 - Math.random());
    
    // Carregar os snippets em sequência
    if (snippetsToLoad.length > 0) {
      log.info(`Carregando ${snippetsToLoad.length} snippets...`);
      
      // Carregar em paralelo, mas controlando o número máximo de carregamentos simultâneos
      const maxParallel = 3;
      const loadSnippetsBatch = (batch) => {
        const promises = batch.map(snippetInfo => {
          return new Promise((resolve, reject) => {
            const snippetPath = snippetInfo.path;
            
            // Adicionar timestamp para evitar cache
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
                  
                  resolve();
                } catch (err) {
                  log.error(`Erro ao processar HTML de ${snippetPath}`, err);
                  reject(err);
                }
              })
              .catch(err => {
                log.error(`Falha ao carregar snippet ${snippetPath}`, err);
                reject(err);
              });
          });
        });
        
        return Promise.all(promises);
      };
      
      // Dividir em lotes para controlar carregamento em paralelo
      const batches = [];
      for (let i = 0; i < snippetsToLoad.length; i += maxParallel) {
        batches.push(snippetsToLoad.slice(i, i + maxParallel));
      }
      
      // Carregar lotes em sequência
      batches.reduce((promise, batch) => {
        return promise.then(() => loadSnippetsBatch(batch));
      }, Promise.resolve())
        .then(() => {
          log.success(`${state.loadedCount} snippets carregados com sucesso`);
          reinitializeIsotope();
          setupCopyButtons();
          
          // Chamar refreshScrollIndicators se disponível
          if (window.refreshScrollIndicators) {
            window.refreshScrollIndicators();
          }
          
          // Carregar snippets de fallback se necessário
          if (state.loadedCount === 0 && !state.fallbackLoaded) {
            loadFallbackSnippets();
          }
        })
        .catch(err => {
          log.error('Erro durante o carregamento de snippets', err);
        });
    } else {
      log.info('Nenhum novo snippet para carregar');
      
      // Se não houver snippets carregados, tentar o fallback
      if (state.loadedCount === 0 && !state.fallbackLoaded) {
        loadFallbackSnippets();
      }
    }
  }
  
  /**
   * Carrega snippets de fallback (pré-definidos) quando a descoberta dinâmica falha
   */
  function loadFallbackSnippets() {
    if (state.fallbackLoaded) {
      log.info('Snippets de fallback já foram carregados');
      return;
    }
    
    state.fallbackLoaded = true;
    log.warn('Carregando snippets de fallback...');
    
    // Lista de snippets de fallback
    const fallbackSnippets = [
      { path: `${SNIPPETS_CONFIG.basePath}/coding/indexing/snippets_html/snippet_html_basic_structure.html` },
      { path: `${SNIPPETS_CONFIG.basePath}/coding/indexing/snippets_css/snippet_css_flexbox_basics.html` },
      { path: `${SNIPPETS_CONFIG.basePath}/coding/indexing/snippets_javascript/snippet_js_dom_manipulation.html` },
      { path: `${SNIPPETS_CONFIG.basePath}/coding/indexing/snippets_jquery/snippet_jquery_ajax_basic.html` }
    ];
    
    const loadPromises = fallbackSnippets.map(snippet => {
      return new Promise((resolve, reject) => {
        // Adicionar timestamp para evitar cache
        const timestamp = new Date().getTime();
        
        fetch(`${snippet.path}?_t=${timestamp}`)
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
    });
    
    Promise.all(loadPromises)
      .then(() => {
        log.info(`${state.loadedCount} snippets de fallback carregados`);
        reinitializeIsotope();
        setupCopyButtons();
      })
      .catch(err => {
        log.error('Erro durante o carregamento de snippets de fallback', err);
      });
  }
  
  /**
   * Iniciar descoberta de snippets e configurar atualização periódica
   */
  function initSnippetsDiscovery() {
    discoverFolders();
    
    // Configurar atualização periódica
    if (SNIPPETS_CONFIG.scanInterval > 0) {
      setInterval(() => {
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
      
      // Garantir que as imagens estejam carregadas antes de inicializar
      $container.imagesLoaded(function() {
        // Inicializar Isotope com as opções configuradas
        $container.isotope(SNIPPETS_CONFIG.isotopeOptions);
        state.isotopeInitialized = true;
        log.success('Isotope reinicializado com sucesso');
        
        // Mostrar snippets com animação de fade
        setTimeout(() => {
          $container.find(SNIPPETS_CONFIG.portfolioItemSelector).css({
            'opacity': 1,
            'transform': 'scale(1)'
          });
        }, 100);
      });
    });
  }
  
  /**
   * Configura botões de cópia para todos os snippets
   */
  function setupCopyButtons() {
    $('.btn-custom[data-target]').each(function() {
      const $button = $(this);
      // Pular se já inicializado
      if ($button.attr('data-copy-initialized')) return;
      
      // Marcar como inicializado
      $button.attr('data-copy-initialized', 'true');
      
      // Adicionar evento de clique
      $button.on('click', function() {
        const targetId = $button.attr('data-target');
        const $codeBlock = $('#' + targetId);

        if ($codeBlock.length) {
          // Copiar o texto para a área de transferência
          const text = $codeBlock.text().trim();
          navigator.clipboard.writeText(text)
            .then(() => {
              // Feedback visual
              const $icon = $button.find('iconify-icon');
              if ($icon.length) {
                const originalIcon = $icon.attr('icon');
                $icon.attr('icon', 'mdi:check');
                setTimeout(() => {
                  $icon.attr('icon', originalIcon || 'mdi:content-copy');
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
   * =================================
   * LINKS EXTERNOS PARA SNIPPETS
   * =================================
   */
  
  /**
   * Configura botões de links externos nos snippets
   */
  function setupExternalLinks() {
    // Seleciona todos os botões com atributo data-snippet-external-link
    $('[data-snippet-external-link]').on('click', function() {
      const $button = $(this);
      const linkType = $button.data('snippet-external-link');
      const snippetTitle = $button.closest('.portfolio-item').find('.portfolio-info h4').text().trim();
      
      switch (linkType) {
        case 'standalone':
          openStandaloneView($button);
          break;
          
        case 'codepen':
          openInCodePen($button);
          break;
          
        case 'jsfiddle':
          openInJsFiddle($button);
          break;
          
        default:
          log.error(`Tipo de link desconhecido: ${linkType}`);
      }
    });
  }
  
  /**
   * Abre um snippet em visualização standalone
   * @param {jQuery} $button - Botão que foi clicado
   */
  function openStandaloneView($button) {
    const $snippetCard = $button.closest('.portfolio-item');
    const snippetId = $snippetCard.attr('id');
    
    if (snippetId) {
      // Extrai o nome do snippet do ID
      const snippetName = snippetId.replace('snippet_', '');
      
      // Determina o tipo de tecnologia do snippet
      let techType = 'outros';
      const classes = $snippetCard.attr('class').split(/\s+/);
      
      for (const cls of classes) {
        if (cls.startsWith('filter-') && cls !== 'filter-active') {
          techType = cls.replace('filter-', '');
          break;
        }
      }
      
      // Constrói o URL para a visualização standalone
      const standaloneUrl = `${SNIPPETS_CONFIG.basePath}/coding/indexing/snippets_${techType}/snippet_${snippetName}_standalone.html`;
      
      // Abre em uma nova janela
      window.open(standaloneUrl, '_blank');
    } else {
      log.error('ID do snippet não encontrado');
    }
  }
  
  /**
   * Abre um snippet no CodePen
   * @param {jQuery} $button - Botão que foi clicado
   */
  function openInCodePen($button) {
    const $snippetCard = $button.closest('.portfolio-item');
    const $htmlCode = $snippetCard.find('pre code.language-html');
    const $cssCode = $snippetCard.find('pre code.language-css');
    const $jsCode = $snippetCard.find('pre code.language-javascript, pre code.language-js');
    
    // Extrair o título do snippet
    const snippetTitle = $snippetCard.find('.portfolio-info h4').text().trim() || 'Snippet';
    
    // Preparar dados para CodePen
    const data = {
      title: snippetTitle,
      description: `Snippet exportado do repositório de snippets`,
      html: $htmlCode.length ? $htmlCode.text().trim() : '',
      css: $cssCode.length ? $cssCode.text().trim() : '',
      js: $jsCode.length ? $jsCode.text().trim() : ''
    };
    
    // Criar um formulário para postar para o CodePen
    const $form = $('<form>', {
      action: 'https://codepen.io/pen/define',
      method: 'POST',
      target: '_blank',
      style: 'display: none;'
    });
    
    const $input = $('<input>', {
      type: 'hidden',
      name: 'data',
      value: JSON.stringify(data)
    });
    
    $form.append($input).appendTo('body').submit().remove();
  }
  
  /**
   * Abre um snippet no JSFiddle
   * @param {jQuery} $button - Botão que foi clicado
   */
  function openInJsFiddle($button) {
    const $snippetCard = $button.closest('.portfolio-item');
    const $htmlCode = $snippetCard.find('pre code.language-html');
    const $cssCode = $snippetCard.find('pre code.language-css');
    const $jsCode = $snippetCard.find('pre code.language-javascript, pre code.language-js');
    
    // Extrair o título do snippet
    const snippetTitle = $snippetCard.find('.portfolio-info h4').text().trim() || 'Snippet';
    
    // Criar um formulário para postar para o JSFiddle
    const $form = $('<form>', {
      action: 'https://jsfiddle.net/api/post/library/pure/',
      method: 'POST',
      target: '_blank',
      style: 'display: none;'
    });
    
    // Adicionar os inputs para cada parte do código
    if ($htmlCode.length) {
      $form.append($('<input>', {
        type: 'hidden',
        name: 'html',
        value: $htmlCode.text().trim()
      }));
    }
    
    if ($cssCode.length) {
      $form.append($('<input>', {
        type: 'hidden',
        name: 'css',
        value: $cssCode.text().trim()
      }));
    }
    
    if ($jsCode.length) {
      $form.append($('<input>', {
        type: 'hidden',
        name: 'js',
        value: $jsCode.text().trim()
      }));
    }
    
    // Título
    $form.append($('<input>', {
      type: 'hidden',
      name: 'title',
      value: snippetTitle
    }));
    
    // Enviar o formulário
    $form.appendTo('body').submit().remove();
  }
  
  /**
   * =================================
   * INDICADOR DE ROLAGEM PARA SNIPPETS
   * =================================
   */
  
  /**
   * Detecta snippets que precisam de rolagem e adiciona um indicador visual
   */
  function detectScrollableSnippets() {
    // Selecionar todos os blocos de código em snippets Git e AI
    const $snippetCodeBlocks = $('.filter-git .snippet-code, .filter-ai .snippet-code');
    
    // Para cada bloco, verificar se precisa de rolagem
    $snippetCodeBlocks.each(function() {
      const $block = $(this);
      if ($block[0].scrollHeight > $block[0].clientHeight) {
        // O conteúdo é maior que a área visível, precisa de rolagem
        $block.addClass('needs-scroll');
      } else {
        // Não precisa de rolagem
        $block.removeClass('needs-scroll');
      }
    });
  }
  
  /**
   * Configura a detecção de snippets roláveis
   */
  function setupScrollDetection() {
    // Verificação inicial após um pequeno delay para garantir que tudo esteja renderizado
    setTimeout(detectScrollableSnippets, 500);
    
    // Verificar novamente quando os filtros Isotope forem acionados
    $('.isotope-filters li').on('click', function() {
      setTimeout(detectScrollableSnippets, 400); // Delay para permitir que o filtro seja aplicado
    });
    
    // Verificar novamente em caso de redimensionamento da janela
    $(window).on('resize', function() {
      setTimeout(detectScrollableSnippets, 200);
    });
    
    // Configurar evento de rolagem para ocultar o indicador durante a rolagem
    $('.filter-git .snippet-code, .filter-ai .snippet-code').on('scroll', function() {
      // Se o usuário estiver rolando, não precisamos do indicador
      const $this = $(this);
      $this.addClass('is-scrolling');
      
      // Remover a classe após a rolagem terminar
      clearTimeout($this.data('scrollTimer'));
      const timer = setTimeout(function() {
        $this.removeClass('is-scrolling');
      }, 1000);
      $this.data('scrollTimer', timer);
    });
  }
  
  /**
   * =================================
   * INICIALIZAÇÃO
   * =================================
   */
  
  // Verificar se temos suporte para fetch e Promise
  if (!window.fetch || !window.Promise) {
    log.warn('Navegador não suporta fetch ou Promise, funcionalidade limitada');
  }
  
  // Inicialização após o carregamento da página
  $(document).ready(function() {
    initSnippetsDiscovery();
    setupExternalLinks();
    setupCopyButtons();
    
    // Esperar um pouco para que o Isotope e os snippets sejam carregados
    setTimeout(setupScrollDetection, 1000);
  });
  
  // Expor funções úteis globalmente
  window.refreshScrollIndicators = detectScrollableSnippets;
  window.reloadSnippets = discoverFolders;
  
});
