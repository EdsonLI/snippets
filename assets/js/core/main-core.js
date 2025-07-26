/**
 * Arquivo principal com funções essenciais do tema
 * Combina as funcionalidades de main.js e outros scripts relacionados à UI
 * 
 * @author EdsonLI e GitHub Copilot
 * @version 1.0.0 (jQuery)
 */

$(function() {
  "use strict";

  /**
   * Seletores e constantes usados no script
   */
  const DOM = {
    window: $(window),
    document: $(document),
    body: $('body'),
    header: $('#header'),
    navMenu: $('#navbar'),
    navLinks: $('.nav-link'),
    preloader: $('#preloader'),
    backToTop: $('.back-to-top'),
    tooltipElements: '[data-bs-toggle="tooltip"]',
    copyButtons: '.btn-custom[data-target]',
    portfolioLightbox: '.portfolio-lightbox',
    portfolioDetails: '.portfolio-details-slider'
  };

  /**
   * =================================
   * FUNÇÕES DE NAVEGAÇÃO
   * =================================
   */

  /**
   * Ativa o header "scrolled" quando se está abaixo do topo
   */
  function toggleScrolled() {
    DOM.window.scroll(function() {
      if ($(this).scrollTop() > 100) {
        DOM.header.addClass('header-scrolled');
        DOM.backToTop.fadeIn();
      } else {
        DOM.header.removeClass('header-scrolled');
        DOM.backToTop.fadeOut();
      }
    });
  }

  /**
   * Ativa a navegação mobile
   */
  function setupMobileNavigation() {
    DOM.body.on('click', '.mobile-nav-toggle', function() {
      DOM.navMenu.toggleClass('navbar-mobile');
      $(this).toggleClass('bi-list bi-x');
    });
    
    // Manipular links de navegação mobile com submenu
    DOM.body.on('click', '.navbar-mobile .dropdown > a', function(e) {
      if (DOM.navMenu.hasClass('navbar-mobile')) {
        e.preventDefault();
        $(this).next().toggleClass('dropdown-active');
      }
    });
    
    // Fechar navbar mobile quando clicar em um link
    DOM.navLinks.on('click', function() {
      if (DOM.navMenu.hasClass('navbar-mobile')) {
        DOM.navMenu.removeClass('navbar-mobile');
        $('.mobile-nav-toggle').toggleClass('bi-list bi-x');
      }
    });
  }
  
  /**
   * Inicializa a animação de rolagem suave
   */
  function initSmoothScroll() {
    $('a[href*="#"]:not([href="#"]):not([href="#tab-"])').on('click', function() {
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        let target = $(this.hash);
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 60
          }, 1000);
          return false;
        }
      }
    });
  }

  /**
   * =================================
   * INICIALIZADORES DE PLUGINS
   * =================================
   */

  /**
   * Inicializa o AOS (Animate On Scroll)
   */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  /**
   * Inicializa o GLightbox
   */
  function initGLightbox() {
    if (typeof GLightbox !== 'undefined') {
      const portfolioLightbox = GLightbox({
        selector: DOM.portfolioLightbox
      });
    }
  }

  /**
   * Inicializa o Swiper para a galeria de detalhes de portfolio
   */
  function initPortfolioDetailSlider() {
    if (typeof Swiper !== 'undefined') {
      new Swiper(DOM.portfolioDetails, {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    }
  }
  
  /**
   * Inicializa os tooltips do Bootstrap
   */
  function initTooltips() {
    // Inicialização de tooltips
    const initializeBootstrapTooltips = function() {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll(DOM.tooltipElements));
      tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    };

    // Inicializar tooltips no carregamento
    initializeBootstrapTooltips();
    
    // Configurar MutationObserver para monitorar novos elementos que precisam de tooltip
    const observer = new MutationObserver(function(mutations) {
      let hasTooltipElements = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === 1) { // Element node
              if (
                node.hasAttribute && 
                node.hasAttribute('data-bs-toggle') && 
                node.getAttribute('data-bs-toggle') === 'tooltip'
              ) {
                hasTooltipElements = true;
                break;
              }
              
              // Verificar filhos
              if (node.querySelectorAll) {
                const tooltipElements = node.querySelectorAll(DOM.tooltipElements);
                if (tooltipElements.length > 0) {
                  hasTooltipElements = true;
                  break;
                }
              }
            }
          }
        }
      });
      
      if (hasTooltipElements) {
        initializeBootstrapTooltips();
      }
    });
    
    // Configurar o observer
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * =================================
   * FUNCIONALIDADE DE BOTÕES DE CÓPIA
   * =================================
   */

  /**
   * Configura os botões de cópia para snippets de código
   */
  function setupCopyButtons() {
    $(DOM.copyButtons).each(function() {
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
            .catch(err => console.error('Erro ao copiar texto', err));
        } else {
          console.error(`Bloco de código não encontrado: ${targetId}`);
        }
      });
    });
  }
  
  /**
   * =================================
   * INICIALIZAÇÃO
   * =================================
   */

  /**
   * Remover o preloader quando a página carregar
   */
  function removePreloader() {
    if (DOM.preloader.length) {
      DOM.preloader.fadeOut(1000);
    }
  }
  
  /**
   * Verificar suporte a recursos modernos
   */
  function checkBrowserSupport() {
    // Verificar suporte a Clipboard API
    if (!navigator.clipboard) {
      console.warn('Clipboard API não suportada neste navegador. A funcionalidade de copiar pode não funcionar.');
    }
    
    // Verificar suporte a MutationObserver
    if (!window.MutationObserver) {
      console.warn('MutationObserver não suportado neste navegador. A detecção de novos elementos pode não funcionar.');
    }
  }

  /**
   * Inicializar quando o documento estiver pronto
   */
  DOM.document.ready(function() {
    removePreloader();
    checkBrowserSupport();
    
    toggleScrolled();
    setupMobileNavigation();
    initSmoothScroll();
    
    // Inicializar plugins
    initAOS();
    initGLightbox();
    initPortfolioDetailSlider();
    initTooltips();
    
    // Configurar botões de cópia
    setupCopyButtons();
    
    // Rolar para o topo ao clicar no botão Back to Top
    DOM.backToTop.on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
    
    console.log('✅ Interface inicializada com sucesso!');
  });

  // Reinicializar AOS ao redimensionar a janela
  DOM.window.on('resize', function() {
    AOS.refresh();
  });
  
  // Expor funções úteis globalmente
  window.setupCopyButtons = setupCopyButtons;
});
