/**
 * Arquivo consolidado de correções e configurações para ícones técnicos
 * Combina as funcionalidades de bootstrap-icon-fix.js, git-icon-fix.js,
 * jquery-icon-fix.js, php-icon-fix.js, sql-icon-fix.js e outros relacionados
 * 
 * @author EdsonLI e GitHub Copilot
 * @version 1.0.0 (jQuery)
 */

$(function() {
  "use strict";
  
  // Configuração para ícones técnicos
  const TECH_ICONS_CONFIG = {
    // Lista de tecnologias suportadas
    supportedTechnologies: [
      'bootstrap', 'css', 'git', 'html', 'javascript', 
      'jquery', 'php', 'sql', 'w3schools'
    ],
    
    // Seletores para cada tipo de tecnologia
    selectors: {
      bootstrap: '.filter-bootstrap .portfolio-item',
      css: '.filter-css .portfolio-item',
      git: '.filter-git .portfolio-item',
      html: '.filter-html .portfolio-item',
      javascript: '.filter-javascript .portfolio-item',
      jquery: '.filter-jquery .portfolio-item',
      php: '.filter-php .portfolio-item',
      sql: '.filter-sql .portfolio-item',
      w3schools: '.filter-w3schools .portfolio-item',
    },
    
    // Classes de ícones para cada tecnologia
    iconClasses: {
      bootstrap: 'bi bi-bootstrap-fill',
      css: 'fa-brands fa-css3-alt',
      git: 'fa-brands fa-git-alt',
      html: 'fa-brands fa-html5',
      javascript: 'fa-brands fa-js',
      jquery: 'jquery-icon',
      php: 'fa-brands fa-php',
      sql: 'sql-icon',
      w3schools: 'w3schools-icon',
    },
    
    // Estilos específicos para cada tecnologia
    styles: {
      bootstrap: {
        color: '#7952b3',
        fontSize: '28px'
      },
      css: {
        color: '#264de4',
        fontSize: '28px'
      },
      git: {
        color: '#F05032',
        fontSize: '28px'
      },
      html: {
        color: '#e34c26',
        fontSize: '28px'
      },
      javascript: {
        color: '#F0DB4F',
        backgroundColor: '#323330',
        fontSize: '20px',
        padding: '4px',
        borderRadius: '4px'
      },
      jquery: {
        // Estilizado via CSS específico
      },
      php: {
        color: '#777BB3',
        fontSize: '28px'
      },
      sql: {
        // Estilizado via CSS específico
      },
      w3schools: {
        // Estilizado via CSS específico
      }
    },
    
    // Debug
    debug: false
  };
  
  // Sistema de logs
  const log = {
    info: (msg) => TECH_ICONS_CONFIG.debug && console.info(`🔧 [TechIcons]: ${msg}`),
    success: (msg) => TECH_ICONS_CONFIG.debug && console.log(`✅ [TechIcons]: ${msg}`),
    warn: (msg) => console.warn(`⚠️ [TechIcons]: ${msg}`),
    error: (msg, err) => console.error(`❌ [TechIcons]: ${msg}`, err || '')
  };
  
  /**
   * =================================
   * CORREÇÕES GERAIS PARA ÍCONES
   * =================================
   */
  
  /**
   * Aplica correções gerais para todos os ícones de tecnologias
   */
  function applyGeneralIconFixes() {
    log.info('Aplicando correções gerais para ícones de tecnologias');
    
    // Corrigir ícones faltantes em cabeçalhos de snippets
    $('.portfolio-item .portfolio-info h4').each(function() {
      const $header = $(this);
      const $portfolioItem = $header.closest('.portfolio-item');
      
      // Se já tem um ícone, pular
      if ($header.find('i, .tech-icon').length > 0) return;
      
      // Identificar a tecnologia pelo filtro de classe
      let technology = null;
      
      TECH_ICONS_CONFIG.supportedTechnologies.forEach(tech => {
        if ($portfolioItem.hasClass(`filter-${tech}`)) {
          technology = tech;
        }
      });
      
      if (technology) {
        // Adicionar o ícone apropriado
        const iconClass = TECH_ICONS_CONFIG.iconClasses[technology];
        const $icon = $('<i>', { 
          class: iconClass + ' tech-icon',
          'aria-hidden': 'true'
        });
        
        // Aplicar estilos específicos da tecnologia
        const styles = TECH_ICONS_CONFIG.styles[technology];
        if (styles) {
          $icon.css(styles);
        }
        
        // Inserir o ícone no início do cabeçalho
        $header.prepend($icon);
        $header.prepend(' ');
      }
    });
    
    log.success('Correções gerais aplicadas');
  }
  
  /**
   * =================================
   * BOOTSTRAP ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de Bootstrap
   */
  function fixBootstrapIcons() {
    const $bootstrapItems = $(TECH_ICONS_CONFIG.selectors.bootstrap);
    if ($bootstrapItems.length === 0) return;
    
    log.info(`Processando ${$bootstrapItems.length} snippets de Bootstrap`);
    
    $bootstrapItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do Bootstrap
      const $icon = $('<i>', { 
        class: TECH_ICONS_CONFIG.iconClasses.bootstrap + ' tech-icon',
        'aria-hidden': 'true' 
      }).css(TECH_ICONS_CONFIG.styles.bootstrap);
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones Bootstrap corrigidos');
  }
  
  /**
   * =================================
   * CSS ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de CSS
   */
  function fixCssIcons() {
    const $cssItems = $(TECH_ICONS_CONFIG.selectors.css);
    if ($cssItems.length === 0) return;
    
    log.info(`Processando ${$cssItems.length} snippets de CSS`);
    
    $cssItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do CSS
      const $icon = $('<i>', { 
        class: TECH_ICONS_CONFIG.iconClasses.css + ' tech-icon',
        'aria-hidden': 'true' 
      }).css(TECH_ICONS_CONFIG.styles.css);
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones CSS corrigidos');
  }
  
  /**
   * =================================
   * GIT ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de Git
   */
  function fixGitIcons() {
    const $gitItems = $(TECH_ICONS_CONFIG.selectors.git);
    if ($gitItems.length === 0) return;
    
    log.info(`Processando ${$gitItems.length} snippets de Git`);
    
    $gitItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do Git
      const $icon = $('<i>', { 
        class: TECH_ICONS_CONFIG.iconClasses.git + ' tech-icon',
        'aria-hidden': 'true' 
      }).css(TECH_ICONS_CONFIG.styles.git);
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones Git corrigidos');
  }
  
  /**
   * =================================
   * HTML ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de HTML
   */
  function fixHtmlIcons() {
    const $htmlItems = $(TECH_ICONS_CONFIG.selectors.html);
    if ($htmlItems.length === 0) return;
    
    log.info(`Processando ${$htmlItems.length} snippets de HTML`);
    
    $htmlItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do HTML
      const $icon = $('<i>', { 
        class: TECH_ICONS_CONFIG.iconClasses.html + ' tech-icon',
        'aria-hidden': 'true' 
      }).css(TECH_ICONS_CONFIG.styles.html);
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones HTML corrigidos');
  }
  
  /**
   * =================================
   * JAVASCRIPT ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de JavaScript
   */
  function fixJavaScriptIcons() {
    const $jsItems = $(TECH_ICONS_CONFIG.selectors.javascript);
    if ($jsItems.length === 0) return;
    
    log.info(`Processando ${$jsItems.length} snippets de JavaScript`);
    
    $jsItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do JavaScript
      const $icon = $('<i>', { 
        class: TECH_ICONS_CONFIG.iconClasses.javascript + ' tech-icon',
        'aria-hidden': 'true' 
      }).css(TECH_ICONS_CONFIG.styles.javascript);
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones JavaScript corrigidos');
  }
  
  /**
   * =================================
   * JQUERY ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de jQuery
   */
  function fixjQueryIcons() {
    const $jQueryItems = $(TECH_ICONS_CONFIG.selectors.jquery);
    if ($jQueryItems.length === 0) return;
    
    log.info(`Processando ${$jQueryItems.length} snippets de jQuery`);
    
    $jQueryItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do jQuery (classe especial que usa uma imagem de fundo)
      const $icon = $('<span>', { 
        class: TECH_ICONS_CONFIG.iconClasses.jquery + ' tech-icon',
        'aria-hidden': 'true' 
      });
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones jQuery corrigidos');
  }
  
  /**
   * =================================
   * PHP ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de PHP
   */
  function fixPhpIcons() {
    const $phpItems = $(TECH_ICONS_CONFIG.selectors.php);
    if ($phpItems.length === 0) return;
    
    log.info(`Processando ${$phpItems.length} snippets de PHP`);
    
    $phpItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do PHP
      const $icon = $('<i>', { 
        class: TECH_ICONS_CONFIG.iconClasses.php + ' tech-icon',
        'aria-hidden': 'true' 
      }).css(TECH_ICONS_CONFIG.styles.php);
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones PHP corrigidos');
  }
  
  /**
   * =================================
   * SQL ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de SQL
   */
  function fixSqlIcons() {
    const $sqlItems = $(TECH_ICONS_CONFIG.selectors.sql);
    if ($sqlItems.length === 0) return;
    
    log.info(`Processando ${$sqlItems.length} snippets de SQL`);
    
    $sqlItems.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do SQL (classe especial que usa uma imagem de fundo)
      const $icon = $('<span>', { 
        class: TECH_ICONS_CONFIG.iconClasses.sql + ' tech-icon',
        'aria-hidden': 'true' 
      });
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones SQL corrigidos');
  }
  
  /**
   * =================================
   * W3SCHOOLS ICON FIX
   * =================================
   */
  
  /**
   * Corrige os ícones para snippets de W3Schools
   */
  function fixW3SchoolsIcons() {
    const $w3Items = $(TECH_ICONS_CONFIG.selectors.w3schools);
    if ($w3Items.length === 0) return;
    
    log.info(`Processando ${$w3Items.length} snippets de W3Schools`);
    
    $w3Items.each(function() {
      const $item = $(this);
      const $header = $item.find('.portfolio-info h4');
      
      // Remover qualquer ícone existente para garantir consistência
      $header.find('.tech-icon').remove();
      
      // Adicionar o ícone do W3Schools (classe especial que usa uma imagem de fundo)
      const $icon = $('<span>', { 
        class: TECH_ICONS_CONFIG.iconClasses.w3schools + ' tech-icon',
        'aria-hidden': 'true' 
      });
      
      $header.prepend($icon);
      $header.prepend(' ');
    });
    
    log.success('Ícones W3Schools corrigidos');
  }
  
  /**
   * =================================
   * OBSERVAÇÃO DE MUDANÇAS DO DOM
   * =================================
   */
  
  /**
   * Configura um MutationObserver para detectar quando novos snippets são adicionados
   * e aplicar as correções de ícones
   */
  function setupMutationObserver() {
    log.info('Configurando MutationObserver');
    
    // Criar uma instância do MutationObserver
    const observer = new MutationObserver(function(mutations) {
      // Flag para controlar se houve mudanças relevantes
      let hasRelevantChanges = false;
      
      mutations.forEach(function(mutation) {
        // Verificar se elementos foram adicionados
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            
            // Verificar se é um elemento DOM
            if (node.nodeType === 1) { 
              const $node = $(node);
              
              // Verificar se é um snippet ou contém snippets
              if ($node.hasClass('portfolio-item') || $node.find('.portfolio-item').length > 0) {
                hasRelevantChanges = true;
                break;
              }
            }
          }
        }
      });
      
      // Se houve mudanças relevantes, aplicar correções
      if (hasRelevantChanges) {
        log.info('Detectada adição de novos snippets, reaplicando correções');
        setTimeout(applyAllIconFixes, 100);
      }
    });
    
    // Configurar para observar mudanças na estrutura do DOM
    const config = { 
      childList: true, // Observar adições/remoções de elementos filhos
      subtree: true    // Observar toda a subárvore
    };
    
    // Observar o container do Isotope
    const $container = $('.isotope-container');
    if ($container.length) {
      observer.observe($container[0], config);
      log.success('MutationObserver configurado com sucesso');
    } else {
      log.warn('Container não encontrado, MutationObserver não configurado');
    }
  }
  
  /**
   * =================================
   * APLICAÇÃO DE TODAS AS CORREÇÕES
   * =================================
   */
  
  /**
   * Aplica todas as correções de ícones
   */
  function applyAllIconFixes() {
    applyGeneralIconFixes();
    fixBootstrapIcons();
    fixCssIcons();
    fixGitIcons();
    fixHtmlIcons();
    fixJavaScriptIcons();
    fixjQueryIcons();
    fixPhpIcons();
    fixSqlIcons();
    fixW3SchoolsIcons();
    
    log.success('Todas as correções de ícones aplicadas');
  }
  
  /**
   * =================================
   * INICIALIZAÇÃO
   * =================================
   */
  
  // Inicialização após o carregamento da página
  $(document).ready(function() {
    // Aplicar correções iniciais
    applyAllIconFixes();
    
    // Configurar observador para mudanças futuras
    setupMutationObserver();
    
    // Verificar novamente quando Isotope for filtrado
    $('.portfolio-filters li').on('click', function() {
      // Esperar um pouco para que o filtro seja aplicado
      setTimeout(applyAllIconFixes, 300);
    });
  });
  
  // Expor funções úteis globalmente
  window.refreshTechIcons = applyAllIconFixes;
  
});
