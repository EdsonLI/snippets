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
    // Corrigir targets dos botões
    $(this).find('.section').each(function() {
      const sectionId = $(this).attr('id');
      if (sectionId) {
        // Encontrar os botões dentro desta seção e definir o target correto
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

  $('#vscode-content').load('snippets_vscode.html', function() {
    // Corrigir targets dos botões
    $(this).find('.section').each(function() {
      const sectionId = $(this).attr('id');
      if (sectionId) {
        // Encontrar os botões dentro desta seção e definir o target correto
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
    loadSnippetsFormularios();
    loadSnippetsListings();
  });

  $('#bancosdedados-content').load('snippets_bancos_de_dados.html', function() {
    hljs.highlightAll();
    setupSnippetInteractions();
    addCopyButtons();
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
          $(this).find('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');
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
    } else {
      // Restaurar a visibilidade padrão
      $('.section, .snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
      // Restaurar todos os ícones para baixo (expandido)
      $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
      // Mostrar todos os controles de categoria
      $('.category-controls').show();
    }
    addCopyButtons();
  });

  // Filtros rápidos (sugestões acima da busca)
  // $('.suggestions span').click(function() {
  //   $('#search').val($(this).data('tag')).trigger('input'); 
  // });

  // Botão de atualizar/limpar filtros
  $('#refresh-list').click(function() {
    $('#search').val('');
    // Restaurar a visibilidade padrão
    $('.section, .snippet-block').show();
    $('.snippet-content').hide();
    $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
    // Restaurar todos os ícones para baixo (expandido)
    $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    // Mostrar todos os controles de categoria
    $('.category-controls').show();
    addCopyButtons();
  });

  $('.tab').on('click', function() {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#' + $(this).data('target')).addClass('active');
  });

  // Filtro por categoria ao clicar nos botões coloridos
  $(document).on('click', '.cat-btn', function() {
    var filter = $(this).data('filter');
    if (filter === 'todas') {
      // Restaurar a visibilidade padrão de todas as categorias e snippets
      $('.section[id]').not('#madbuilder').show();
      $('.snippet-block').show();
      $('.snippet-content').hide();
      $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
      $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
      $('.category-controls').show();
      return;
    }
    // Esconde todas as seções de categoria
    $('.section[id]').not('#madbuilder').hide();
    // Mostra só a seção da categoria clicada
    $('#' + filter).show();
    // Esconde todos os blocos de snippet
    $('.snippet-block').hide();
    // Mostra todos os snippets da categoria
    $('#' + filter + '-snippets .snippet-block').show();
    // Fecha todos os conteúdos de snippet
    $('.snippet-content').hide();
    // Reseta ícones dos snippets
    $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
    // Abre a categoria e mostra controles
    $('#' + filter).find('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    $('#' + filter).find('.category-controls').show();

    // --- NOVO: Expandir todos os snippets da categoria filtrada ---
    // $('#' + filter + '-snippets .snippet-content').slideDown();
    // $('#' + filter + '-snippets .snippet-title i:first-child:not(.fa-download)').removeClass('fa-expand').addClass('fa-compress');
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

  // $('.snippet-content[data-src]').each(function () {
  //   const $container = $(this);
  //   const url = $container.data('src');
  //   const lang = $container.data('lang') || 'text'; // <-- 👈 capturar linguagem

  //   $.ajax({
  //     url: url,
  //     dataType: 'text',
  //     success: function (data) {
  //       $container.find('code')
  //         .attr('class', 'language-' + lang) // <-- 👈 aplicar classe correta
  //         .text(data); // <-- 👈 incluir o texto do código

  //       if (typeof hljs !== 'undefined') {
  //         hljs.highlightElement($container.find('code')[0]);
  //       }
  //     },
  //     error: function () {
  //       $container.find('code').text('// Erro ao carregar snippet: ' + url);
  //     }
  //   });
  // });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
  function loadSnippetsFormularios() {
    const container = document.getElementById('formularios-snippets');
    if (!container) return;
    const listUrl = 'snippets_vscode/formularios/list.json';

    fetch(listUrl)
      .then(response => response.json())
      .then(files => {
        container.innerHTML = '';
        const fetches = files.map(filename => {
          const snippetUrl = `snippets_vscode/formularios/${filename}`;
          return fetch(snippetUrl)
            .then(response => response.text())
            .then(snippetText => {
              const title = filename.replace('.code-snippets', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              const snippetBlock = document.createElement('div');
              snippetBlock.className = 'snippet-block';
              snippetBlock.dataset.tags = 'adianti php form';

              snippetBlock.innerHTML = `
                <div class="snippet-title">
                  <i class="fa-solid fa-expand"></i>
                  <strong>${title}:</strong>
                  <a class="download-btn" href="${snippetUrl}" download title="Baixar snippet">
                    <i class="fa fa-download"></i>
                  </a>
                </div>
                <div class="snippet-content" style="display:none;">
                  <pre><code class="language-json">${escapeHtml(snippetText)}</code></pre>
                </div>
              `;
              container.appendChild(snippetBlock);

              const codeEl = snippetBlock.querySelector('code');
              if (window.hljs && codeEl) {
                hljs.highlightElement(codeEl);
              }
            });
        });

        Promise.all(fetches).then(() => {
          if (typeof setupSnippetInteractions === 'function') setupSnippetInteractions();
          if (typeof addCopyButtons === 'function') addCopyButtons();
        });
      })
      .catch(error => {
        container.innerHTML = '<p>Erro ao carregar snippets de Formulários.</p>';
        console.error(error);
      });

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }

  /* ESPAÇO DAS FUNÇÕES JS */
  function loadSnippetsListings() {
    const container = document.getElementById('listagens-snippets');
    if (!container) return;
    const listUrl = 'snippets_vscode/listagens/list.json'; // local path

    fetch(listUrl)
      .then(response => response.json())
      .then(files => {
        container.innerHTML = ''; // Limpa antes de adicionar
        const fetches = files.map(filename => {
          const snippetUrl = `snippets_vscode/listagens/${filename}`;
          return fetch(snippetUrl)
            .then(response => response.text())
            .then(snippetText => {
              // Extrai nome amigável do arquivo para o título
              const title = filename.replace('.code-snippets', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              const snippetBlock = document.createElement('div');
              snippetBlock.className = 'snippet-block';
              snippetBlock.dataset.tags = 'adianti php listagem';

              snippetBlock.innerHTML = `
                <div class="snippet-title">
                  <i class="fa-solid fa-expand"></i>
                  <strong>${title}:</strong>
                  <a class="download-btn" href="${snippetUrl}" download title="Baixar snippet">
                    <i class="fa fa-download"></i>
                  </a>
                </div>
                <div class="snippet-content" style="display:none;">
                  <pre><code class="language-json">${escapeHtml(snippetText)}</code></pre>
                </div>
              `;
              container.appendChild(snippetBlock);

              // Aplica o highlight apenas no novo bloco adicionado
              const codeEl = snippetBlock.querySelector('code');
              if (window.hljs && codeEl) {
                hljs.highlightElement(codeEl);
              }
            });
        });

        // Quando todos os snippets forem carregados, ativa interações e botões de copiar
        Promise.all(fetches).then(() => {
          if (typeof setupSnippetInteractions === 'function') setupSnippetInteractions();
          if (typeof addCopyButtons === 'function') addCopyButtons();
        });
      })
      .catch(error => {
        container.innerHTML = '<p>Erro ao carregar snippets de Listagens.</p>';
        console.error(error);
      });

    // Função para escapar caracteres especiais HTML
    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }
});
