/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Nov 01 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;

    if (window.scrollY > 100) {
      selectBody.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
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
   * Init isotope layout and filters
   * Comentado para permitir que a inicialização seja feita após o carregamento dinâmico
   */
  /*
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });
  */

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
  window.addEventListener('load', setupCopyButtons);

})();

$(document).ready(function() {
  // Contador para controlar quando todos os conteúdos foram carregados
  let snippetsLoaded = 0;
  const totalSnippets = 2;
  
  // Função para reinicializar o Isotope após o carregamento de todos os snippets
  function reinitIsotope() {
    snippetsLoaded++;
    
    if (snippetsLoaded === totalSnippets) {
      console.log('Todos os snippets carregados, reinicializando Isotope...');
      
      // Destacar todos os blocos de código
      hljs.highlightAll();
      
      // Encontrar e destruir todas as instâncias do Isotope
      $('.isotope-container').each(function() {
        const iso = Isotope.data(this);
        if (iso) {
          iso.destroy();
        }
      });
      
      // Reinicializar o Isotope para todos os containers, mas primeiro aguardar o carregamento das imagens
      $('.isotope-container').imagesLoaded(function() {
        $('.isotope-layout').each(function() {
          // Obter os atributos de data diretamente do elemento
          const layout = $(this).attr('data-layout') || 'masonry';
          const filter = $(this).attr('data-default-filter') || '*';
          const sort = $(this).attr('data-sort') || 'original-order';
          const container = $(this).find('.isotope-container')[0];
          
          // Inicializar uma nova instância do Isotope
          const iso = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort,
            transitionDuration: '0.4s'
          });
          
          // Configurar os eventos de filtro novamente
          const filterBtns = $(this).find('.isotope-filters li');
          filterBtns.on('click', function() {
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
          
          // Executar um layout depois que tudo estiver pronto
          setTimeout(function() {
            iso.arrange();
          }, 100);
        });
      });
    }
  }
  
  // Carregar os snippets
  $('#snippet-bootstrap-form-validation-content').load('coding/main/bootstrap/snippet_bootstrap_form_validation.html', function() {
    reinitIsotope();
  });
  
  $('#snippet-procedure-clean-data-content').load('coding/main/sql/snippet_procedure_clean_data.html', function() {
    reinitIsotope();
  });
});