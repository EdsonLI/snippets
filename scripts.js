$(document).ready(function() {
  // Função para adicionar botões de copiar código
  function addCopyButtons() {
    $('pre code.hljs').each(function () {
      // Evita duplicar botões
      if ($(this).parent().hasClass('code-block-wrapper')) return;

      var $pre = $(this).parent();
      $pre.wrap('<div class="code-block-wrapper" style="position:relative"></div>');
      var $wrapper = $pre.parent();

      var $btn = $('<button class="copy-btn" title="Copiar código"><i class="fa fa-copy"></i></button>');
      $btn.on('click', function () {
        var code = $pre.text();
        navigator.clipboard.writeText(code);
        $btn.html('<i class="fa fa-check"></i>');
        setTimeout(function () {
          $btn.html('<i class="fa fa-copy"></i>');
        }, 1200);
      });
      $wrapper.append($btn);
    });
  }

  // Função para prevenir seleção de texto em ícones
  function preventTextSelection() {
    // Aplica user-select: none a todos os ícones
    $('.fa-chevron-down, .fa-chevron-left, .fa-chevron-right, .collapse-icon, .snippet-title i, .category-controls button i, .fa, .fas, .far, .fal, .fab, .fa-solid, .filter-btn')
      .css({
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none'
      });
  }

  // Carrega os conteúdos iniciais
  $('#madbuilder-content').load('snippets_madbuilder.html', function() {
    // Substituir ícones plus por chevron-right em todos os snippets
    $(this).find('.snippet-title i:first-child').removeClass('fa-plus').addClass('fa-chevron-right');
    
    // Converter para chevron-down ao carregar (inicialmente expandido)
    $(this).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    
    hljs.highlightAll();
    setupSnippetInteractions();
    setupCategoryFilters();
    addCopyButtons();
    preventTextSelection();
  });

  $('#vscode-content').load('snippets_vscode.html', function() {
    // Substituir ícones plus por chevron-right em todos os snippets
    $(this).find('.snippet-title i:first-child').removeClass('fa-plus').addClass('fa-chevron-right');
    
    // Converter para chevron-down ao carregar (inicialmente expandido)
    $(this).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
    preventTextSelection();
  });

  // Sistema de abas
  $('.tab').click(function() {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#' + $(this).data('target')).addClass('active');
    addCopyButtons();
    preventTextSelection();
  });

  // Configurar os filtros de categoria do Mad.Builder
  function setupCategoryFilters() {
    $('.filter-btn:not(.filter-reset)').click(function() {
      // Alternar estado ativo
      $(this).toggleClass('active');
      
      // Filtrar categorias baseado nos filtros ativos
      const activeFilters = $('.filter-btn.active').map(function() {
        return $(this).data('tag');
      }).get();
      
      if (activeFilters.length > 0) {
        // Esconder todas as seções de categoria
        $('.section[id!="madbuilder"]').hide();
        
        // Mostrar apenas as categorias selecionadas
        activeFilters.forEach(function(filter) {
          $('.section[data-tags*="' + filter + '"]').show();
        });
      } else {
        // Se nenhum filtro estiver ativo, mostrar todas as categorias
        $('.section').show();
      }
      
      addCopyButtons();
    });
    
    // Botão para limpar filtros
    $('.filter-btn.filter-reset').click(function() {
      // Remover classe ativa de todos os filtros
      $('.filter-btn').removeClass('active');
      
      // Mostrar todas as seções
      $('.section').show();
      
      addCopyButtons();
    });
  }

  // Função para configurar as interações dos snippets
  function setupSnippetInteractions() {
    // Expandir/colapsar snippets ao clicar no título
    $('.snippet-title').off('click').on('click', function() {
      $(this).next('.snippet-content').slideToggle();
      // Alternar o ícone de chevron-right para chevron-down
      const icon = $(this).find('i:first');
      if (icon.hasClass('fa-chevron-right')) {
        icon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
      } else {
        icon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
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
      const targetId = $(this).data('target');
      $('#' + targetId + ' .snippet-content').slideDown();
      $('#' + targetId + ' .snippet-title i:first-child').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      $(this).hide();
      $(this).siblings('.collapse-all').show();
      
      // Muda o ícone de colapso para chevron-down quando expandir todos
      const collapseIcon = $(this).closest('.category-controls').prev('h3').find('.collapse-icon');
      collapseIcon.removeClass('fa-chevron-left').addClass('fa-chevron-down');
    });

    // Botões de colapsar todos
    $('.collapse-all').off('click').on('click', function() {
      const targetId = $(this).data('target');
      $('#' + targetId + ' .snippet-content').slideUp();
      $('#' + targetId + ' .snippet-title i:first-child').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      $(this).hide();
      $(this).siblings('.expand-all').show();
      
      // Muda o ícone de colapso para chevron-left quando colapsar todos
      const collapseIcon = $(this).closest('.category-controls').prev('h3').find('.collapse-icon');
      collapseIcon.removeClass('fa-chevron-down').addClass('fa-chevron-left');
    });

    // Adiciona botões de copiar código sempre que interações são configuradas
    addCopyButtons();
  }

  // Busca
  $('#search').on('input', function() {
    const searchText = $(this).val().toLowerCase();

    if (searchText.length > 1) {
      $('.snippet-block').each(function() {
        const tags = $(this).data('tags') || '';
        const title = $(this).find('.snippet-title strong').text().toLowerCase();
        const content = $(this).find('.snippet-content').text().toLowerCase();

        if (tags.includes(searchText) || title.includes(searchText) || content.includes(searchText)) {
          $(this).show();
          // Expandir o snippet para mostrar o resultado
          $(this).find('.snippet-content').slideDown();
          $(this).find('.snippet-title i:first-child').removeClass('fa-chevron-right').addClass('fa-chevron-down');
        } else {
          $(this).hide();
        }
      });

      // Mostrar apenas categorias com snippets visíveis
      $('.section[id!="madbuilder"][id!="vscode"]').each(function() {
        if ($(this).find('.snippet-block:visible').length > 0) {
          $(this).show();
          // Mudar o ícone para baixo para categorias que ficam visíveis
          $(this).find('h3 .collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
          // Mostrar os controles da categoria
          $(this).find('.category-controls').show();
        } else {
          $(this).hide();
        }
      });
      
      // Remover classe ativa dos filtros de categoria quando pesquisando
      $('.filter-btn').removeClass('active');
    } else {
      // Restaurar a visibilidade padrão
      $('.section, .snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      // Restaurar todos os ícones para baixo (expandido)
      $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
      // Mostrar todos os controles de categoria
      $('.category-controls').show();
    }
    addCopyButtons();
    preventTextSelection();
  });

  // Filtros rápidos
  $('.suggestions span').click(function() {
    $('#search').val($(this).data('tag')).trigger('input');
  });

  // Botão de atualizar/limpar filtros
  $('#refresh-list').click(function() {
    $('#search').val('');
    // Restaurar a visibilidade padrão
    $('.section, .snippet-block').show();
    $('.snippet-content').hide();
    $('.snippet-title i:first-child').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    // Restaurar todos os ícones para baixo (expandido)
    $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    // Mostrar todos os controles de categoria
    $('.category-controls').show();
    // Remover classe ativa dos filtros de categoria
    $('.filter-btn').removeClass('active');
    addCopyButtons();
    preventTextSelection();
  });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
  
  // Aplica a prevenção de seleção de texto para os elementos iniciais
  preventTextSelection();
});