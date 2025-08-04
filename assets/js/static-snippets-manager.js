/**
 * AUTO SNIPPETS LOADER - VERSÃO ESTÁTICA
 * Carrega automaticamente snippets de todas as subpastas sem PHP
 * Compatível com hospedagem estática como GitHub Pages
 * 
 * @author Edson LI - GitHub Copilot
 * @version 2.0.0 (Static jQuery Edition)
 */
$(document).ready(function() {
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
    info: (msg) => {},
    success: (msg) => {},
    warn: (msg) => {},
    error: (msg, err) => {}
  };

  // Estado do carregador - rastreia o que foi carregado
  const state = {
    folders: new Set(),         // Conjunto de pastas descobertas (evita duplicatas)
    snippets: new Map(),        // Mapeia caminhos de snippets para seu status (carregado/falha)
    loadedCount: 0,             // Contador de snippets carregados com sucesso
    totalToLoad: 0,             // Total de snippets a carregar
    filterMap: new Map(),       // Mapeamento de pastas para classes de filtro
    isotopeInitialized: false   // Rastrear se o Isotope já foi inicializado
  };  const STATIC_DIRECTORY_MAP = {
    'ai': ['instructions_copilot_vscode.html', 'prompts_adianti.html'],
    'bootstrap': ['snippet_bootstrap_form_validation.html'],
    'css': ['snippet_css_display_flex_center.html'],
    'git': ['snippet_git_change_all_message_commits.html', 'snippet_git_conflict_resolution_vscode.html', 'snippet_git_stash.html', 'snippet_git_update_local_branch_from_development_and_other.html', 'snippet_git_update_local_branch_from_remote_development.html'],
    'isotope': ['snippet_isotope_basic_example.html'],
    'jquery': ['snippet_jquery_iife.html', 'snippet_jquery_toggle_example.html'],
    'madbuilder': ['madbuilder.html'],
    'php': ['snippet_php_cookies_sessions_preferences.html'],
    'sql': ['snippet_procedure_clean_data.html', 'snippet_procedure_report_basic.html'],
    'sweetalert2': ['snippet_sweetalert2_confirm_example.html', 'snippet_sweetalert2_confirm_with_function_attached_example.html', 'snippet_sweetalert2_select_color_radio_example.html'],
    'w3schools': ['w3schools.html']
    // Última atualização: 04/08/2025 16:31:26
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
    const $filtersContainer = $(SNIPPETS_CONFIG.filtersContainerSelector);
    if (!$filtersContainer.length) {
      log.warn(`Container de filtros não encontrado: ${SNIPPETS_CONFIG.filtersContainerSelector}`);
      return;
    }
    
    // Verificar se o filtro "All" já existe
    let allFilterExists = false;
    $filtersContainer.children().each(function() {
      if ($(this).attr('data-filter') === '*') {
        allFilterExists = true;
        // Garantir que tenha a classe filter-active
        $(this).addClass('filter-active');
      }
    });
    
    // Adicionar filtro "All" se não existir
    if (!allFilterExists) {
      const $allFilter = $('<li></li>')
        .attr('data-filter', '*')
        .addClass('filter-active')
        .css('cursor', 'pointer')
        .text('All');
      $filtersContainer.prepend($allFilter);
    }
    
    // Adicionar filtros para cada pasta descoberta
    state.folders.forEach(folder => {
      // Verificar se este filtro já existe
      const filterClass = state.filterMap.get(folder);
      let filterExists = false;
      
      $filtersContainer.children().each(function() {
        if ($(this).attr('data-filter') === `.${filterClass}`) {
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
        
        const $filterItem = $('<li></li>')
          .attr('data-filter', `.${filterClass}`)
          .css('cursor', 'pointer')
          .text(displayName);
        $filtersContainer.append($filterItem);
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
          // Criar uma promessa para carregar este snippet
          $.ajax({
            url: snippetPath,
            type: 'GET',
            dataType: 'html'
          })
          .done(function(html) {
            // Adicionar o snippet ao container
            const $container = $(SNIPPETS_CONFIG.containerSelector);
            if (!$container.length) {
              log.error(`Container não encontrado: ${SNIPPETS_CONFIG.containerSelector}`);
              resolveLoad();
              return;
            }
            
            // Processar HTML para evitar carregamento de recursos inexistentes
            html = processHtml(html, snippetPath);
            
            // Inserir o HTML
            $container.append(html);
            
            // Marcar como carregado
            snippetInfo.loaded = true;
            state.loadedCount++;
            
            log.info(`Snippet carregado (${state.loadedCount}/${state.totalToLoad}): ${snippetPath}`);
            resolveLoad();
          })
          .fail(function(xhr, status, err) {
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
  /**
   * Processa o HTML do snippet antes de inseri-lo no DOM
   * Previne carregamento de recursos inexistentes, como arquivos standalone
   * @param {string} html O conteúdo HTML do snippet
   * @param {string} snippetPath O caminho do snippet atual
   * @returns {string} HTML processado
   */
  function processHtml(html, snippetPath) {
    // Remover ou modificar links para snippets_standalone
    if (html.includes('snippets_standalone')) {
      log.warn(`Encontrados links para snippets_standalone em: ${snippetPath}`);
      
      // Criar um elemento temporário para manipular o HTML
      const $tempDiv = $('<div>').html(html);
      
      // Processar links de download que apontam para arquivos standalone
      $tempDiv.find('a[href*="snippets_standalone"]').each(function() {
        const $link = $(this);
        // Desativar o link para evitar 404
        $link.attr({
          'href': 'javascript:void(0)',
          'title': 'Arquivo standalone não disponível neste ambiente',
          'data-bs-toggle': 'tooltip',
          'data-bs-placement': 'top'
        });
        
        // Adicionar classe visual para indicar indisponibilidade
        $link.addClass('text-muted');
        
        log.info(`Link para standalone desativado: ${$link.attr('href')}`);
      });
      
      // Processar iframes que carregam arquivos standalone
      $tempDiv.find('iframe[src*="snippets_standalone"]').each(function() {
        const $iframe = $(this);
        // Substituir o src do iframe
        const originalSrc = $iframe.attr('src');
        $iframe.attr({
          'src': 'about:blank',
          'data-original-src': originalSrc
        });
        
        // Adicionar mensagem de indisponibilidade
        const $wrapper = $iframe.parent();
        if ($wrapper.length) {
          $('<div>')
            .addClass('alert alert-warning py-2 mt-2')
            .html('<small>Visualização não disponível neste ambiente</small>')
            .appendTo($wrapper);
        }
        
        log.info(`Iframe de standalone substituído: ${originalSrc}`);
      });
      
      return $tempDiv.html();
    }
    
    return html;
  }

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
      const $parent = $container.closest('.isotope-layout');
      if (!$parent.length) {
        log.warn(`Container isotope sem elemento pai .isotope-layout`);
        return;
      }
      
      // Obter configurações
      const layout = $parent.attr('data-layout') || 'masonry';
      const filter = $parent.attr('data-default-filter') || '*';
      const sort = $parent.attr('data-sort') || 'original-order';
      
      // Aguardar carregamento de imagens antes de inicializar
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
        const $filterContainer = $parent.find('.isotope-filters');
        if (!$filterContainer.length) {
          log.warn('Container de filtros .isotope-filters não encontrado');
          return;
        }
        
        // Clonar toda a lista de filtros para remover todos os eventos atribuídos anteriormente
        const $newFilterList = $filterContainer.clone(true);
        $filterContainer.replaceWith($newFilterList);
        
        // Obter referência aos novos botões
        const $filterBtns = $newFilterList.find('li');
        
        // Garantir que apenas o botão 'All' (primeiro) tenha a classe filter-active
        $filterBtns.each(function(index) {
          if (index === 0) {
            $(this).addClass('filter-active');
          } else {
            $(this).removeClass('filter-active');
          }
        });
        
        // Adicionar novos eventos de clique
        $filterBtns.on('click', function(e) {
          // Evitar comportamento padrão e propagação
          e.preventDefault();
          e.stopPropagation();
          
          // Remover classe ativa de todos os botões
          $filterBtns.removeClass('filter-active');
          
          // Adicionar classe ativa apenas ao botão clicado
          $(this).addClass('filter-active');
          
          // Filtrar os itens
          iso.arrange({
            filter: $(this).attr('data-filter')
          });
          
          // Atualizar animações AOS se disponível
          if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
            AOS.refresh();
          }
        });
        
        // Layout final
        setTimeout(function() { 
          iso.arrange(); 
        }, 100);
        
        // Marcar como inicializado
        state.isotopeInitialized = true;
        log.success('Isotope reinicializado com sucesso');
      });
    });
    
    // Configurar botões de cópia
    setupCopyButtons();
  }

  /**
   * Configura botões de cópia para todos os snippets
   * Usa a implementação global de copy-buttons-manager.js
   */
  function setupCopyButtons() {
    // Usar a implementação global com as opções padrão
    if (typeof window.setupCopyButtons === 'function') {
      window.setupCopyButtons();
    }
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