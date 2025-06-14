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

  // Carrega o conteúdo inicial do MadBuilder
  $('#madbuilder-content').load('snippets_madbuilder.html', function() {
    // Corrigir targets dos botões
    $(this).find('.section').each(function() {
      const sectionId = $(this).attr('id');
      if (sectionId) {
        const contentId = sectionId + '-snippets';
        $(this).find('.expand-all, .collapse-all').attr('data-target', contentId);
      }
    });

    // Substituir ícones plus/chevron por fa-expand nos snippets, exceto fa-download
    $(this).find('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-plus fa-chevron-right fa-chevron-down fa-compress').addClass('fa-expand');

    // Converter para chevron-down ao carregar (inicialmente expandido) nas categorias
    $(this).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');

    // Substituir ícones + e - por expand e compress nos botões de categoria
    $(this).find('.expand-all i').removeClass('fa-plus').addClass('fa-expand');
    $(this).find('.collapse-all i').removeClass('fa-minus').addClass('fa-compress');

    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
  });

  // Sistema de abas (apenas ativa/desativa visualmente, não carrega outros conteúdos)
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

    // Botões de expandir todos
    $('.expand-all').off('click').on('click', function() {
      const targetId = $(this).data('target');
      if (!targetId) return;
      $('#' + targetId + ' .snippet-content').slideDown();
      $('#' + targetId + ' .snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');
      $(this).hide();
      $(this).siblings('.collapse-all').show();
    });

    // Botões de colapsar todos
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
          $(this).find('.snippet-content').slideDown();
          $(this).find('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');
        } else {
          $(this).hide();
        }
      });

      $('.section[id!="madbuilder"]').each(function() {
        if ($(this).find('.snippet-block:visible').length > 0) {
          $(this).show();
          $(this).find('h3 .collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
          $(this).find('.category-controls').show();
        } else {
          $(this).hide();
        }
      });
    } else {
      $('.section, .snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
      $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
      $('.category-controls').show();
    }
    addCopyButtons();
  });

  // Filtros rápidos (sugestões acima da busca)
  $('.suggestions span').click(function() {
    $('#search').val($(this).data('tag')).trigger('input');
  });

  // Botão de atualizar/limpar filtros
  $('#refresh-list').click(function() {
    $('#search').val('');
    $('.section, .snippet-block').show();
    $('.snippet-content').hide();
    $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
    $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    $('.category-controls').show();
    addCopyButtons();
  });

  // Filtro por categoria ao clicar nos botões coloridos
  $(document).on('click', '.cat-btn', function() {
    var filter = $(this).data('filter');
    if (filter === 'todas') {
      $('.section[id]').not('#madbuilder').show();
      $('.snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
      $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
      $('.category-controls').show();
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

  $(document).on('click', '.copy-btn-title', function(e) {
    e.stopPropagation();
    const text = $(this).siblings('strong').text().trim();
    navigator.clipboard.writeText(text);
    $(this).find('i').removeClass('fa-copy').addClass('fa-check');
    setTimeout(() => {
      $(this).find('i').removeClass('fa-check').addClass('fa-copy');
    }, 1200);
  });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
});