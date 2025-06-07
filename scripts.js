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

  // Carrega os conteúdos iniciais
  $('#madbuilder-content').load('snippets_madbuilder.html', function() {
    // Substituir ícones plus por chevron-right em todos os snippets
    $(this).find('.snippet-title i:first-child').removeClass('fa-plus').addClass('fa-chevron-right');
    
    // Converter para chevron-down ao carregar (inicialmente expandido)
    $(this).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#vscode-content').load('snippets_vscode.html', function() {
    // Substituir ícones plus por chevron-right em todos os snippets
    $(this).find('.snippet-title i:first-child').removeClass('fa-plus').addClass('fa-chevron-right');
    
    // Converter para chevron-down ao carregar (inicialmente expandido)
    $(this).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  // Sistema de abas
  $('.tab').click(function() {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#' + $(this).data('target')).addClass('active');
    addCopyButtons();
  });

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
      
      // Alternar entre chevron-down e chevron-left (invertido)
      if ($(this).hasClass('fa-chevron-down')) {
        $(this).removeClass('fa-chevron-down').addClass('fa-chevron-left');
      } else {
        $(this).removeClass('fa-chevron-left').addClass('fa-chevron-down');
      }
      
      // Alternar botões de expandir/colapsar
      const categoryControls = $(this).closest('h3').next('.category-controls');
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
        } else {
          $(this).hide();
        }
      });
    } else {
      // Restaurar a visibilidade padrão
      $('.section, .snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      // Restaurar todos os ícones para baixo (expandido)
      $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    }
    addCopyButtons();
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
    addCopyButtons();
  });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
});