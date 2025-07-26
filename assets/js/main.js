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
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

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
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // Inicializa o Glightbox para suportar links de pré-visualização
  document.addEventListener('DOMContentLoaded', function () {
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
        document.querySelectorAll('[aria-hidden="true"]').forEach(el => el.removeAttribute('aria-hidden'));

        // Adiciona o atributo `inert` ao body para evitar foco em elementos fora do modal
        document.body.setAttribute('inert', '');
      },
      onClose: () => {
        // Restaura o foco no elemento correto após fechar o modal
        const lastFocusedElement = document.activeElement;
        if (lastFocusedElement) {
          lastFocusedElement.blur();
        }

        // Remove o atributo `inert` do body
        document.body.removeAttribute('inert');
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
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        const offset = 1; // Ajuste para descer um pouco mais
        const targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Função para adicionar funcionalidade de copiar código nos snippets usando JavaScript nativo
   */
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
              icon.setAttribute('icon', 'mdi:check'); // Troca para ícone de check
              setTimeout(() => {
                icon.setAttribute('icon', 'mdi:content-copy'); // Restaura o ícone original
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

  // Chamar a função ao carregar a página
  $(window).on('load', setupCopyButtons);

// O carregamento dinâmico de snippets foi movido para o arquivo snippets-manager.js