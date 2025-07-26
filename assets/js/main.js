/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Nov 01 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* Converted to jQuery by EdsonLI
*/

$(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const $body = $('body');
    const $header = $('#header');
    if (!$header.length) return;

    if ($(window).scrollTop() > 100) {
      $body.addClass('scrolled');
    } else {
      $body.removeClass('scrolled');
    }
  }

  $(document).on('scroll', toggleScrolled);
  $(window).on('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const $mobileNavToggleBtn = $('.mobile-nav-toggle');

  function mobileNavToogle() {
    $('body').toggleClass('mobile-nav-active');
    $mobileNavToggleBtn.toggleClass('bi-list bi-x');
  }
  
  if ($mobileNavToggleBtn.length) {
    $mobileNavToggleBtn.on('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  $('#navmenu a').on('click', function() {
    if ($('.mobile-nav-active').length) {
      mobileNavToogle();
    }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  $('.navmenu .toggle-dropdown').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    $(this).parent().next().toggleClass('dropdown-active');
    e.stopImmediatePropagation();
  });

  /**
   * Scroll top button
   */
  const $scrollTop = $('.scroll-top');

  function toggleScrollTop() {
    if ($scrollTop.length) {
      $(window).scrollTop() > 100 ? $scrollTop.addClass('active') : $scrollTop.removeClass('active');
    }
  }
  
  $scrollTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 'smooth');
  });

  $(window).on('load', toggleScrollTop);
  $(document).on('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  $(window).on('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // Inicializa o Glightbox para suportar links de pré-visualização
  $(document).ready(function() {
    const lightbox = GLightbox({
      selector: '.glightbox',
      type: 'iframe', // Permite carregar páginas standalone
      width: '90%',
      height: '90%',
      openEffect: 'fade', // Efeito de abertura
      closeEffect: 'fade', // Efeito de fechamento
      touchNavigation: true, // Habilita navegação por toque
      onOpen: () => {
        // Remove aria-hidden de elementos que podem causar conflitos
        $('[aria-hidden="true"]').each(function() {
          $(this).removeAttr('aria-hidden');
        });

        // Adiciona o atributo `inert` ao body para evitar foco em elementos fora do modal
        $('body').attr('inert', '');
      },
      onClose: () => {
        // Restaura o foco no elemento correto após fechar o modal
        const lastFocusedElement = document.activeElement;
        if (lastFocusedElement) {
          $(lastFocusedElement).blur();
        }

        // Remove o atributo `inert` do body
        $('body').removeAttr('inert');
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  $('.faq-item h3, .faq-item .faq-toggle').on('click', function() {
    $(this).parent().toggleClass('faq-active');
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    $(".init-swiper").each(function() {
      const $this = $(this);
      let config = JSON.parse(
        $this.find(".swiper-config").html().trim()
      );

      if ($this.hasClass("swiper-tab")) {
        initSwiperWithCustomPagination(this, config);
      } else {
        new Swiper(this, config);
      }
    });
  }

  $(window).on("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  $(window).on('load', function(e) {
    if (window.location.hash) {
      const $section = $(window.location.hash);
      if ($section.length) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle($section[0]).scrollMarginTop;
          $('html, body').animate({
            scrollTop: $section.offset().top - parseInt(scrollMarginTop)
          }, 'smooth');
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  const $navmenulinks = $('.navmenu a');

  function navmenuScrollspy() {
    $navmenulinks.each(function() {
      const $link = $(this);
      if (!$link[0].hash) return;
      
      const $section = $($link[0].hash);
      if (!$section.length) return;
      
      const position = $(window).scrollTop() + 200;
      const sectionTop = $section.offset().top;
      const sectionHeight = $section.outerHeight();
      
      if (position >= sectionTop && position <= (sectionTop + sectionHeight)) {
        $('.navmenu a.active').removeClass('active');
        $link.addClass('active');
      } else {
        $link.removeClass('active');
      }
    });
  }
  
  $(window).on('load', navmenuScrollspy);
  $(document).on('scroll', navmenuScrollspy);
  
  $('a[href^="#"]').on('click', function(e) {
    const targetId = $(this).attr('href').substring(1);
    const $targetElement = $('#' + targetId);
    
    if ($targetElement.length) {
      e.preventDefault();
      const offset = 1; // Ajuste para descer um pouco mais
      const targetPosition = $targetElement.offset().top - offset;
      
      $('html, body').animate({
        scrollTop: targetPosition
      }, 'smooth');
    }
  });

  /**
   * Função para adicionar funcionalidade de copiar código nos snippets usando jQuery
   */
  function setupCopyButtons() {
    $('.btn-custom[data-target]').on('click', function() {
      const targetId = $(this).data('target');
      const $codeBlock = $('#' + targetId);

      if ($codeBlock.length) {
        const text = $codeBlock.text().trim();
        navigator.clipboard.writeText(text).then(() => {
          const $icon = $(this).find('iconify-icon');
          if ($icon.length) {
            $icon.attr('icon', 'mdi:check'); // Troca para ícone de check
            setTimeout(() => {
              $icon.attr('icon', 'mdi:content-copy'); // Restaura o ícone original
            }, 1200);
          }
        }).catch(err => {
          console.error('Erro ao copiar o texto:', err);
        });
      } else {
        console.error('Bloco de código não encontrado para o ID:', targetId);
      }
    });
  }

  // Chamar a função ao carregar a página
  $(window).on('load', setupCopyButtons);
  
  /**
   * Inicializa os tooltips do Bootstrap
   */
  $(function() {
    // Função para inicializar os tooltips
    function initTooltips(parent) {
      const $container = parent ? $(parent) : $(document);
      $container.find('[data-bs-toggle="tooltip"]').tooltip();
    }
    
    // Inicializa todos os tooltips na página
    initTooltips();
    
    // Reinicializa tooltips em conteúdo carregado dinamicamente
    $(document).on('DOMNodeInserted', function(e) {
      if ($(e.target).find('[data-bs-toggle="tooltip"]').length > 0) {
        initTooltips(e.target);
      }
    });
  });

// O carregamento dinâmico de snippets foi movido para o arquivo snippets-manager.js