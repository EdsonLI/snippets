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
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  $('#vscode-content').load('snippets_vscode.html', function() {
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
      // Alternar o ícone de + para -
      const icon = $(this).find('i:first');
      if (icon.hasClass('fa-plus')) {
        icon.removeClass('fa-plus').addClass('fa-minus');
      } else {
        icon.removeClass('fa-minus').addClass('fa-plus');
      }
    });

    // Expandir/colapsar categorias
    $('.collapse-icon').off('click').on('click', function() {
      const targetId = $(this).data('target');
      $('#' + targetId).slideToggle();
      // Rotacionar o ícone
      $(this).css('transform', $(this).css('transform') === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)');
      // Alternar botões de expandir/colapsar
      const categoryControls = $(this).closest('h3').next('.category-controls');
      categoryControls.find('.expand-all, .collapse-all').toggle();
    });

    // Botões de expandir/colapsar todos
    $('.expand-all').off('click').on('click', function() {
      const targetId = $(this).data('target');
      $('#' + targetId + ' .snippet-content').slideDown();
      $('#' + targetId + ' .snippet-title i:first-child').removeClass('fa-plus').addClass('fa-minus');
      $(this).hide();
      $(this).siblings('.collapse-all').show();
    });

    $('.collapse-all').off('click').on('click', function() {
      const targetId = $(this).data('target');
      $('#' + targetId + ' .snippet-content').slideUp();
      $('#' + targetId + ' .snippet-title i:first-child').removeClass('fa-minus').addClass('fa-plus');
      $(this).hide();
      $(this).siblings('.expand-all').show();
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
          $(this).find('.snippet-title i:first-child').removeClass('fa-plus').addClass('fa-minus');
        } else {
          $(this).hide();
        }
      });

      // Mostrar apenas categorias com snippets visíveis
      $('.section[id!="madbuilder"][id!="vscode"]').each(function() {
        if ($(this).find('.snippet-block:visible').length > 0) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    } else {
      // Restaurar a visibilidade padrão
      $('.section, .snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child').removeClass('fa-minus').addClass('fa-plus');
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
    $('.snippet-title i:first-child').removeClass('fa-minus').addClass('fa-plus');
    addCopyButtons();
  });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
});