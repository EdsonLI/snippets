$(document).ready(function() {
  // Remover todo o bloco relacionado ao carregamento e interações do madbuilder:
  // - $('#madbuilder-content').load(...)
  // - Filtros por categoria (.cat-btn)
  // - resetSnippetsView
  // - setupSnippetInteractions
  // - etc

  // Em vez disso, apenas chame a função de inicialização se o container existir:
  if ($('#madbuilder-content').length) {
    if (typeof window.initMadbuilderSnippets === 'function') {
      window.initMadbuilderSnippets();
    } else if (typeof initMadbuilderSnippets === 'function') {
      initMadbuilderSnippets();
    }
  }

  // Sistema de abas
  $('.tab').click(function() {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#' + $(this).data('target')).addClass('active');
    // resetSnippetsView(); // Resetar filtros ao trocar de aba
    // addCopyButtons();
  });

  // Função para configurar as interações dos snippets
  function setupSnippetInteractions() {
    // Expandir/colapsar snippets ao clicar no título
    $('.snippet-title').off('click').on('click', function() {
      $(this).next('.snippet-content').slideToggle();
      // Alternar o ícone de fa-expand para fa-compress e vice-versa
      const icon = $(this).find('i:first');
      if (icon.hasClass('fa-expand')) {
        icon.removeClass('fa-expand').addClass('fa-compress');
      } else {
        icon.removeClass('fa-compress').addClass('fa-expand');
      }
    });

    // Expandir/colapsar categorias 
    $('.collapse-icon').off('click').on('click', function(e) {
      e.stopPropagation(); // Prevenir propagação do evento
      const targetId = $(this).data('target');
      const $target = $('#' + targetId);

      // Toggle do conteúdo
      $target.slideToggle();

      // Também esconder/mostrar os botões de controle da categoria
      const categoryControls = $(this).closest('h3').next('.category-controls');
      categoryControls.slideToggle();

      // Alternar entre chevron-down e chevron-left (invertido)
      if ($(this).hasClass('fa-chevron-down')) {
        $(this).removeClass('fa-chevron-down').addClass('fa-chevron-left');
      } else {
        $(this).removeClass('fa-chevron-left').addClass('fa-chevron-down');
      }

      // Alternar botões de expandir/colapsar
      categoryControls.find('.expand-all, .collapse-all').toggle();
    });

    // Botões de expandir todos
    $('.expand-all').off('click').on('click', function() {
      // Pegar o target correto com base no contexto do botão
      const targetId = $(this).data('target');

      if (!targetId) {
        console.error('Botão expand-all sem target definido!');
        return;
      }

      // Aplicar a operação apenas dentro dessa seção
      $('#' + targetId + ' .snippet-content').slideDown();
      $('#' + targetId + ' .snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');

      // Alternar a visibilidade dos botões dentro dessa seção
      $(this).hide();
      $(this).siblings('.collapse-all').show();
    });

    // Botões de colapsar todos
    $('.collapse-all').off('click').on('click', function() {
      // Pegar o target correto com base no contexto do botão
      const targetId = $(this).data('target');

      if (!targetId) {
        console.error('Botão collapse-all sem target definido!');
        return;
      }

      // Aplicar a operação apenas dentro dessa seção
      $('#' + targetId + ' .snippet-content').slideUp();
      $('#' + targetId + ' .snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');

      // Alternar a visibilidade dos botões dentro dessa seção
      $(this).hide();
      $(this).siblings('.expand-all').show();
    });

    // Adiciona botões de copiar código sempre que interações são configuradas
    // addCopyButtons();
  }

  // Busca
  // $('#search').on('input', function() {
  //   const searchText = $(this).val().toLowerCase();

  //   if (searchText.length > 1) {
  //     $('.snippet-block').each(function() {
  //       const tags = $(this).data('tags') || '';
  //       const title = $(this).find('.snippet-title strong').text().toLowerCase();
  //       const content = $(this).find('.snippet-content').text().toLowerCase();

  //       if (tags.includes(searchText) || title.includes(searchText) || content.includes(searchText)) {
  //         $(this).show();
  //         // Expandir o snippet para mostrar o resultado
  //         $(this).find('.snippet-content').slideDown();
  //         $(this).find('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');
  //       } else {
  //         $(this).hide();
  //       }
  //     });

  //     // Mostrar apenas categorias com snippets visíveis
  //     $('.section[id!="madbuilder"][id!="vscode"]').each(function() {
  //       if ($(this).find('.snippet-block:visible').length > 0) {
  //         $(this).show();
  //         // Mudar o ícone para baixo para categorias que ficam visíveis
  //         $(this).find('h3 .collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
  //         // Mostrar os controles da categoria
  //         $(this).find('.category-controls').show();
  //       } else {
  //         $(this).hide();
  //       }
  //     });
  //   } else {
  //     // Restaurar a visibilidade padrão
  //     $('.section, .snippet-block').show();
  //     $('.snippet-content').hide();
  //     $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
  //     // Restaurar todos os ícones para baixo (expandido)
  //     $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
  //     // Mostrar todos os controles de categoria
  //     $('.category-controls').show();
  //   }
  //   addCopyButtons();
  // });

  // Filtros rápidos (sugestões acima da busca)
  // $('.suggestions span').click(function() {
  //   $('#search').val($(this).data('tag')).trigger('input'); 
  // });

  // Botão de atualizar/limpar filtros
  $('#refresh-list').click(function() {
    $('#search').val('');
    // resetSnippetsView();
    // addCopyButtons();
  });

  // Adiciona carregamento para as novas abas
  $('#php-content').load('snippets_php.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#jquery-content').load('snippets_jquery.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#bootstrap-content').load('snippets_bootstrap.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#html-content').load('snippets_html.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#css-content').load('snippets_css.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#sweetalert2-content').load('snippets_sweetalert2.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#fontawesome-content').load('snippets_fontawesome.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  const backToTopButton = $('#back-to-top');
  const scrollThreshold = 300; // Pixels de rolagem para mostrar o botão
  let buttonVisible = false;
  
  // Função para verificar a posição do scroll
  function checkScrollPosition() {
    if ($(window).scrollTop() > scrollThreshold) {
      if (!buttonVisible) {
        backToTopButton.css('display', 'block')
                       .removeClass('hide')
                       .addClass('show');
        buttonVisible = true;
      }
    } else {
      if (buttonVisible) {
        backToTopButton.removeClass('show')
                       .addClass('hide');
        buttonVisible = false;
        
        // Esconde completamente após a animação
        setTimeout(() => {
          if (!buttonVisible) {
            backToTopButton.css('display', 'none');
          }
        }, 300);
      }
    }
  }
  
  // Verificar posição ao carregar e ao rolar
  $(window).scroll(checkScrollPosition);
  checkScrollPosition(); // Verificar posição inicial
  
  // Ação de clique no botão
  backToTopButton.click(function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 400);
  });
  
});