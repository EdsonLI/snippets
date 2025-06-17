window.initMadbuilderSnippets = function() {
  // Função para adicionar botões de copiar código
  function addCopyButtons() {
    $('pre code.hljs').each(function () {
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

  // Função para resetar visualização dos snippets/categorias
  function resetSnippetsView() {
    $('.section, .snippet-block').show();
    $('.snippet-content').hide();
    $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
    $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    $('.category-controls').show();
  }

  // Função para configurar as interações dos snippets
  function setupSnippetInteractions() {
    $('.snippet-title').off('click').on('click', function() {
      $(this).next('.snippet-content').slideToggle();
      const icon = $(this).find('i:first');
      if (icon.hasClass('fa-expand')) {
        icon.removeClass('fa-expand').addClass('fa-compress');
      } else {
        icon.removeClass('fa-compress').addClass('fa-expand');
      }
    });

    $('.collapse-icon').off('click').on('click', function(e) {
      e.stopPropagation();
      const targetId = $(this).data('target');
      const $target = $('#' + targetId);
      $target.slideToggle();
      const categoryControls = $(this).closest('h3').next('.category-controls');
      categoryControls.slideToggle();
      if ($(this).hasClass('fa-chevron-down')) {
        $(this).removeClass('fa-chevron-down').addClass('fa-chevron-left');
      } else {
        $(this).removeClass('fa-chevron-left').addClass('fa-chevron-down');
      }
      categoryControls.find('.expand-all, .collapse-all').toggle();
    });

    $('.expand-all').off('click').on('click', function() {
      const targetId = $(this).data('target');
      if (!targetId) return;
      $('#' + targetId + ' .snippet-content').slideDown();
      $('#' + targetId + ' .snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');
      $(this).hide();
      $(this).siblings('.collapse-all').show();
    });

    $('.collapse-all').off('click').on('click', function() {
      const targetId = $(this).data('target');
      if (!targetId) return;
      $('#' + targetId + ' .snippet-content').slideUp();
      $('#' + targetId + ' .snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
      $(this).hide();
      $(this).siblings('.expand-all').show();
    });

    addCopyButtons();
  }

  // Carrega os conteúdos iniciais do madbuilder
  $('#madbuilder-content').load('snippets_madbuilder.html', function() {
    $(this).find('.section').each(function() {
      const sectionId = $(this).attr('id');
      if (sectionId) {
        const contentId = sectionId + '-snippets';
        $(this).find('.expand-all, .collapse-all').attr('data-target', contentId);
      }
    });
    $(this).find('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-plus fa-chevron-right fa-chevron-down fa-compress').addClass('fa-expand');
    $(this).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    $(this).find('.expand-all i').removeClass('fa-plus').addClass('fa-expand');
    $(this).find('.collapse-all i').removeClass('fa-minus').addClass('fa-compress');
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  // Filtro por categoria ao clicar nos botões coloridos
  $(document).on('click', '.cat-btn', function() {
    var filter = $(this).data('filter');
    if (filter === 'todas') {
      resetSnippetsView();
      return;
    }
    $('.section[id]').not('#madbuilder').hide();
    $('#' + filter).show();
    $('.snippet-block').hide();
    $('#' + filter + '-snippets .snippet-block').show();
    $('.snippet-content').hide();
    $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
    $('#' + filter).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    $('#' + filter).find('.category-controls').show();
  });

  // Copiar título do snippet (se houver botão)
  $(document).on('click', '.copy-btn-title', function(e) {
    e.stopPropagation();
    const text = $(this).siblings('strong').text().trim();
    navigator.clipboard.writeText(text);
    $(this).find('i').removeClass('fa-copy').addClass('fa-check');
    setTimeout(() => {
      $(this).find('i').removeClass('fa-check').addClass('fa-copy');
    }, 1200);
  });

  // Botão de atualizar/limpar filtros
  $('#refresh-list').click(function() {
    $('#search').val('');
    resetSnippetsView();
    addCopyButtons();
  });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
};
