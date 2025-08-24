$(document).ready(function() {
  // --- BLOCO: Limpeza de wrappers duplicados ---
  function cleanDuplicatedWrappers() {
    // Remove todos os wrappers aninhados e botões duplicados
    $('.code-block-wrapper').each(function() {
      const $wrapper = $(this);
      
      // Se este wrapper tem outro wrapper filho, é duplicação
      const $childWrapper = $wrapper.find('.code-block-wrapper').first();
      if ($childWrapper.length > 0) {
        // Pegar o pre do wrapper mais interno
        const $innerPre = $wrapper.find('pre').first();
        
        // Remover todos os botões existentes
        $wrapper.find('.copy-btn').remove();
        
        // Substituir toda a estrutura pelo pre limpo
        $wrapper.replaceWith($innerPre);
      }
    });
    
    // Remover botões órfãos
    $('.copy-btn').remove();
  }

  // --- BLOCO: Botão de copiar código ---
  function addCopyButtons() {
    // Limpar primeiro para evitar duplicações
    cleanDuplicatedWrappers();
    
    $('pre code').each(function () {
      // Verificação melhorada para evitar duplicação
      const $pre = $(this).parent();
      
      // Se já tem wrapper OU já tem botão de copy, pular
      if ($pre.hasClass('code-block-wrapper') || 
          $pre.parent().hasClass('code-block-wrapper') ||
          $pre.siblings('.copy-btn').length > 0 ||
          $pre.parent().siblings('.copy-btn').length > 0) {
        return;
      }

      $pre.wrap('<div class="code-block-wrapper" style="position:relative"></div>');
      var $wrapper = $pre.parent();

      var $btn = $('<button class="copy-btn" title="Copiar código"><i class="fa fa-copy"></i></button>');
      $btn.on('click', function () {
        var code = $pre.text();
        navigator.clipboard.writeText(code).then(function () {
          $btn.find('i').removeClass('fa-copy').addClass('fa-check'); // Troca o ícone para check
          setTimeout(function () {
            $btn.find('i').removeClass('fa-check').addClass('fa-copy'); // Restaura o ícone original
          }, 1200);
        }).catch(function () {
          console.error('Falha ao copiar o texto para a área de transferência.');
        });
      });
      $wrapper.append($btn);
    });
  }

  // --- BLOCO: Resetar visualização dos snippets/categorias ---
  function resetSnippetsView() {
    $('.section, .snippet-block').show();
    $('.snippet-content').hide();
    $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
    $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
    $('.category-controls').show();
  }

  // --- BLOCO: Carregamento de abas e conteúdos iniciais ---
  function loadTabContents() {
    $('#git-content').load('./snippets_git.html', function(response, status, xhr) {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();

      // Executa scripts inline carregados via .load()
      $('#git-content').find('script').each(function() {
        $.globalEval(this.text || this.textContent || this.innerHTML || '');
      });

      // Move estilos inline para o <head> (evita duplicidade)
      $('#git-content').find('style').each(function() {
        $('head').append('<style>' + $(this).html() + '</style>');
        $(this).remove();
      });
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('git-content'));
      }
    });

    // MadBuilder content removed

    $('#vscode-content').load('./snippets_vscode.html', function() {
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
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('vscode-content'));
      }
    });

    $('#sweetalert2-content').load('./snippets_sweetalert2.html', function() {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('sweetalert2-content'));
      }
    });

    $('#fontawesome-content').load('./snippets_fontawesome.html', function() {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('fontawesome-content'));
      }
    });

    $('#css-content').load('./snippets_css.html', function() {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('css-content'));
      }
    });

    $('#bootstrap-content').load('./snippets_bootstrap.html', function() {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('bootstrap-content'));
      }
    });

    $('#jquery-content').load('./snippets_jquery.html', function() {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('jquery-content'));
      }
    });

    $('#html-content').load('./snippets_html.html', function() {
      hljs.highlightAll();
      setupSnippetInteractions();
      addCopyButtons();
      
      // Reaplicar tema ao conteúdo carregado
      if (window.snippetTheme) {
        window.snippetTheme.reapplyThemeToContent(document.getElementById('html-content'));
      }
    });

    var iframe_php = $('<iframe src="./php_limpo_corrigido.html" style="width: 100%; height: 800px; border: none; background: #1a1a1a;" scrolling="no"></iframe>');
    
    iframe_php.on('load', function() {
        var self = this;
        setTimeout(function() {
            try {
                var iframeDoc = self.contentDocument || self.contentWindow.document;
                
                // Aguardar o Bootstrap aplicar altura uniforme dos cards
                setTimeout(function() {
                    var cards = $(iframeDoc).find('.card');
                    var rows = $(iframeDoc).find('.row');
                    var container = $(iframeDoc).find('.container');
                    
                    if (cards.length > 0 && rows.length > 0) {
                        // Detectar número de colunas baseado na largura da tela/container
                        var containerWidth = container.width();
                        var cardWidth = cards.first().outerWidth();
                        var numCols;
                        
                        // Calcular quantas colunas cabem baseado no Bootstrap responsive
                        if (containerWidth < 576) {
                            numCols = 1; // Mobile (xs)
                        } else if (containerWidth < 768) {
                            numCols = 2; // Small (sm)
                        } else {
                            numCols = 3; // Medium+ (md, lg, xl)
                        }
                        
                        // Calcular altura baseada nos cards e container
                        var cardHeight = cards.first().outerHeight() || 300; // altura de um card
                        var numRows = Math.ceil(cards.length / numCols); // quantas linhas
                        var containerPadding = container.outerHeight() - container.height(); // padding do container
                        var rowGap = 24; // gap entre linhas (g-4 do Bootstrap = 1.5rem = 24px)
                        
                        // Altura total = (altura do card × número de linhas) + gaps + padding + margem extra + 30% de buffer
                        var totalHeight = (cardHeight * numRows) + (rowGap * (numRows - 1)) + containerPadding + 100;
                        var bufferHeight = Math.ceil(totalHeight * 1.3); // 30% de buffer para mobile
                        
                        $(self).css('height', bufferHeight + 'px');
                        console.log('PHP iframe height adjusted to:', bufferHeight + 'px', 'for', cards.length, 'cards,', numCols, 'cols,', numRows, 'rows, containerWidth:', containerWidth);
                    } else {
                        // Fallback: altura baseada no conteúdo do documento
                        var bodyHeight = iframeDoc.body.scrollHeight;
                        var bufferHeight = Math.ceil(bodyHeight * 1.1); // 10% de buffer como fallback
                        $(self).css('height', bufferHeight + 'px');
                        console.log('PHP iframe fallback height:', bufferHeight + 'px');
                    }
                }, 200);
                
            } catch (e) {
                console.warn('Error calculating PHP iframe height:', e);
                // Usar altura fixa em caso de erro
                $(self).css('height', '2000px');
            }
        }, 300);
    });
    
    $('#php-content').html(iframe_php);

    var iframe = $('<iframe src="./sql_limpo_corrigido.html" style="width: 100%; height: 800px; border: none; background: #1a1a1a;" scrolling="no"></iframe>');
    
    iframe.on('load', function() {
        var self = this;
        setTimeout(function() {
            try {
                var iframeDoc = self.contentDocument || self.contentWindow.document;
                
                // Aguardar o Bootstrap aplicar altura uniforme dos cards
                setTimeout(function() {
                    var cards = $(iframeDoc).find('.card');
                    var rows = $(iframeDoc).find('.row');
                    var container = $(iframeDoc).find('.container');
                    
                    if (cards.length > 0 && rows.length > 0) {
                        // Detectar número de colunas baseado na largura da tela/container
                        var containerWidth = container.width();
                        var cardWidth = cards.first().outerWidth();
                        var numCols;
                        
                        // Calcular quantas colunas cabem baseado no Bootstrap responsive
                        if (containerWidth < 576) {
                            numCols = 1; // Mobile (xs)
                        } else if (containerWidth < 768) {
                            numCols = 2; // Small (sm)
                        } else {
                            numCols = 3; // Medium+ (md, lg, xl)
                        }
                        
                        // Calcular altura baseada nos cards e container
                        var cardHeight = cards.first().outerHeight() || 300; // altura de um card
                        var numRows = Math.ceil(cards.length / numCols); // quantas linhas
                        var containerPadding = container.outerHeight() - container.height(); // padding do container
                        var rowGap = 24; // gap entre linhas (g-4 do Bootstrap = 1.5rem = 24px)
                        
                        // Altura total = (altura do card × número de linhas) + gaps + padding + margem extra + 30% de buffer
                        var totalHeight = (cardHeight * numRows) + (rowGap * (numRows - 1)) + containerPadding + 100;
                        totalHeight = Math.ceil(totalHeight * 1.3); // 30% de buffer para mobile
                        
                        console.log('SQL - Card height:', cardHeight, 'Rows:', numRows, 'Cols:', numCols, 'Total:', totalHeight, 'containerWidth:', containerWidth);
                        
                        // Aplicar altura calculada (mínimo 800px, máximo 4000px para mobile)
                        var finalHeight = Math.max(800, Math.min(4000, totalHeight));
                        $(self).height(finalHeight);
                    } else {
                        // Fallback se não conseguir medir
                        $(self).height(2000);
                    }
                }, 500); // aguardar Bootstrap aplicar estilos
            } catch(e) {
                console.log('Erro ao calcular altura:', e);
                // Fallback para altura fixa
                $(self).height(2000);
            }
        }, 200); // aguardar carregamento completo
    });
    
    $('#sql-content').html(iframe);
  }

  // --- BLOCO: Sistema de abas ---
  function setupTabs() {
    $('.tab').click(function() {
      $('.tab').removeClass('active');
      $(this).addClass('active');
      $('.tab-content').removeClass('active');
      const targetId = $(this).data('target');
      $('#' + targetId).addClass('active');
      resetSnippetsView();
      addCopyButtons();
      
      // Reaplicar tema ao trocar de aba
      if (window.snippetTheme) {
        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
          window.snippetTheme.reapplyThemeToContent(targetContainer);
        }
      }
    });
  }

  // --- BLOCO: Interações dos snippets (expandir, colapsar, copiar, etc) ---
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

  // --- BLOCO: Filtros rápidos e categorias ---
  function setupCategoryFilters() {
    // Botão de atualizar/limpar filtros
    $('#refresh-list').click(function() {
      $('#search').val('');
      resetSnippetsView();
      addCopyButtons();
    });

    // Filtro por categoria ao clicar nas abas de categoria
    $(document).on('click', '.category-tab', function() {
      var filter = $(this).data('filter');
      // Troca visual do ativo
      $('.category-tab').removeClass('active');
      $(this).addClass('active');

      if (filter === 'todas') {
        // Restaurar a visibilidade padrão de todas as categorias e snippets
        resetSnippetsView();
        return;
      }
      // Esconde todas as seções de categoria
      $('.section[id]').hide();
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
  }

  // --- BLOCO: Carregamento dinâmico de snippets (Formulários e Listagens) ---
  function loadSnippetsFormularios() {
    const container = document.getElementById('formularios-snippets');
    if (!container) return;
    const listUrl = './snippets_vscode/formularios/list.json';

    fetch(listUrl)
      .then(response => response.json())
      .then(files => {
        container.innerHTML = '';
        const fetches = files.map(filename => {
          const snippetUrl = `./snippets_vscode/formularios/${filename}`;
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

  function loadSnippetsListings() {
    const container = document.getElementById('listagens-snippets');
    if (!container) return;
    const listUrl = './snippets_vscode/listagens/list.json'; // local path

    fetch(listUrl)
      .then(response => response.json())
      .then(files => {
        container.innerHTML = ''; // Limpa antes de adicionar
        const fetches = files.map(filename => {
          const snippetUrl = `./snippets_vscode/listagens/${filename}`;
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

  // --- BLOCO: Botão "Voltar ao Topo" ---
  function setupBackToTopButton() {
    const backToTopButton = $('#back-to-top');
    const scrollThreshold = 300;
    let buttonVisible = false;

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
  }

  // --- BLOCO: Busca ---
  function setupSearch() {
    $('#search').on('input', function() {
      const searchText = $(this).val().toLowerCase();
      const $activeCat = $('.category-tab.active');
      const activeFilter = $activeCat.length ? $activeCat.data('filter') : 'todas';

      // Define o escopo dos snippets a buscar
      let $snippets;
      let $snippetsList;
      if (activeFilter && activeFilter !== 'todas') {
        $snippets = $('#' + activeFilter + '-snippets .snippet-block');
        $snippetsList = $('#' + activeFilter + '-snippets');
      } else {
        $snippets = $('.snippet-block');
        $snippetsList = null;
      }

      // Remove mensagem anterior, se houver
      $('.no-results-message').remove();

      if (searchText.length > 1) {
        $snippets.each(function() {
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

        if (activeFilter === 'todas') {
          $('.section[id!="vscode"]').each(function() {
            if ($(this).find('.snippet-block:visible').length > 0) {
              $(this).show();
              $(this).find('h3 .collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
              $(this).find('.category-controls').show();
            } else {
              $(this).hide();
            }
          });
        } else {
          // Esconde todas as seções, mostra só a da categoria ativa
          $('.section[id]').hide();
          const $section = $('#' + activeFilter);
          $section.show();

          // Se nenhum snippet visível, mostra mensagem bonita e esconde controles
          if ($snippets.filter(':visible').length === 0 && $snippetsList && $snippetsList.length) {
            $section.find('.category-controls').hide();
            $snippetsList.append(
              '<div class="no-results-message">' +
              '<i class="fa fa-search"></i>' +
              'Nenhum resultado encontrado para sua busca' +
              '</div>'
            );
          } else {
            $section.find('.category-controls').show();
          }
        }
      } else {
        // Restaurar a visibilidade padrão
        $('.section, .snippet-block').show();
        $('.snippet-content').hide();
        $('.snippet-title i:first-child:not(.fa-download)').removeClass('fa-compress').addClass('fa-expand');
        $('.collapse-icon').removeClass('fa-chevron-left').addClass('fa-chevron-down');
        $('.category-controls').show();
        $('.no-results-message').remove();
      }
      addCopyButtons();
    });
  }

  // --- BLOCO: Scrollbar visível só durante rolagem ---
  function setupTabScrollbars() {
    function handleScrollBarVisibility($el) {
      let timeout;
      $el.on('scroll', function() {
        $el.addClass('scrolling');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          $el.removeClass('scrolling');
        }, 600);
      });
    }
    handleScrollBarVisibility($('.tabs'));
    handleScrollBarVisibility($('.category-tabs'));
  }

  // --- BLOCO: Arrastar horizontal com mouse nas tabs (desktop) ---
  function setupTabsDragScroll() {
    const $tabs = $('.tabs');
    let isDown = false;
    let startX;
    let scrollLeft;

    $tabs.on('mousedown', function(e) {
      // Só botão esquerdo
      if (e.button !== 0) return;
      isDown = true;
      $tabs.addClass('dragging');
      startX = e.pageX - $tabs.offset().left;
      scrollLeft = $tabs.scrollLeft();
      e.preventDefault();
    });

    $(document).on('mousemove', function(e) {
      if (!isDown) return;
      const x = e.pageX - $tabs.offset().left;
      const walk = (startX - x);
      $tabs.scrollLeft(scrollLeft + walk);
    });

    $(document).on('mouseup', function() {
      isDown = false;
      $tabs.removeClass('dragging');
    });

    // Evita seleção de texto durante o drag
    $tabs.on('mouseleave', function() {
      isDown = false;
      $tabs.removeClass('dragging');
    });
  }

  // --- CHAMADAS INICIAIS ---
  loadTabContents();
  setupTabs();
  setupCategoryFilters();
  setupBackToTopButton();
  setupSearch();
  setupTabScrollbars();
  setupTabsDragScroll();
  addCopyButtons();

  // Script de navegação ULTRA-MINIMALISTA
  const tabs = $('.tabs');
  const leftBtn = $('#scroll-left-btn');
  const rightBtn = $('#scroll-right-btn');
  
  function updateNavState() {
    leftBtn.toggleClass('disabled', tabs.scrollLeft() <= 0);
    rightBtn.toggleClass('disabled', 
      tabs.scrollLeft() + tabs.width() >= tabs.get(0).scrollWidth - 5);
  }
  
  leftBtn.click(function() {
    if (!$(this).hasClass('disabled')) {
      tabs.animate({scrollLeft: tabs.scrollLeft() - 200}, 300);
    }
  });
  
  rightBtn.click(function() {
    if (!$(this).hasClass('disabled')) {
      tabs.animate({scrollLeft: tabs.scrollLeft() + 200}, 300);
    }
  });
  
  tabs.scroll(updateNavState);
  $(window).resize(updateNavState);
  
  // Inicializar estado
  setTimeout(updateNavState, 100);
});

// Script para navegação das tabs com setas transparentes
$(document).ready(function() {
  const tabs = $('.tabs');
  const leftBtn = $('#scroll-left-btn');
  const rightBtn = $('#scroll-right-btn');
  
  function updateNavState() {
    leftBtn.toggleClass('disabled', tabs.scrollLeft() <= 0);
    rightBtn.toggleClass('disabled', 
      tabs.scrollLeft() + tabs.width() >= tabs.get(0).scrollWidth - 5);
  }
  
  leftBtn.click(function() {
    if (!$(this).hasClass('disabled')) {
      tabs.animate({scrollLeft: tabs.scrollLeft() - 200}, 300);
    }
  });
  
  rightBtn.click(function() {
    if (!$(this).hasClass('disabled')) {
      tabs.animate({scrollLeft: tabs.scrollLeft() + 200}, 300);
    }
  });
  
  tabs.scroll(updateNavState);
  $(window).resize(updateNavState);
  
  // Inicializar estado
  setTimeout(updateNavState, 100);
});

// === FUNÇÃO DE EMERGÊNCIA PARA LIMPAR BOTÕES DUPLICADOS ===
window.cleanCopyButtonMess = function() {
  console.log('🧹 Limpando bagunça dos botões de cópia...');
  
  // Remover TODOS os wrappers e botões
  $('.code-block-wrapper').each(function() {
    const $wrapper = $(this);
    const $pre = $wrapper.find('pre').first();
    if ($pre.length) {
      $wrapper.replaceWith($pre);
    }
  });
  
  // Remover todos os botões órfãos
  $('.copy-btn').remove();
  
  console.log('✅ Limpeza concluída! Recarregue a página para recriar os botões.');
};
