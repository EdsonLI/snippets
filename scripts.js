$(document).ready(function() {
  // Carrega os conteúdos iniciais das abas
  $('#madbuilder-content').load('snippets_madbuilder.html', function() {
    // Se precisar de funções específicas para MadBuilder, chame aqui
  });

  $('#vscode-content').load('snippets_vscode.html', function() {
    loadSnippetsFormularios();
    loadSnippetsListings();
  });

  $('#bancosdedados-content').load('snippets_bancos_de_dados.html', function() {
    // Se precisar de funções específicas para Banco de Dados, chame aqui
  });

  // Sistema de abas
  $('.tab').click(function() {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#' + $(this).data('target')).addClass('active');
  });

  // Busca
  $('#search').on('input', function() {
    const query = $(this).val().toLowerCase();
    $('.snippet-block').each(function() {
      const tags = $(this).data('tags') || '';
      const text = $(this).text().toLowerCase();
      if (tags.includes(query) || text.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Filtros rápidos (sugestões acima da busca)
  $('.suggestions span').click(function() {
    const tag = $(this).data('tag');
    $('#search').val(tag).trigger('input');
  });

  // Botão de atualizar/limpar filtros
  $('#refresh-list').click(function() {
    $('#search').val('');
    $('.snippet-block').show();
  });

  // Filtro por categoria ao clicar nos botões coloridos
  $(document).on('click', '.cat-btn', function() {
    const filter = $(this).data('tag');
    $('.snippet-block').hide();
    $(`.snippet-block[data-tags*="${filter}"]`).show();
  });

  // Botão de copiar título do snippet
  $(document).on('click', '.copy-btn-title', function(e) {
    e.stopPropagation();
    const text = $(this).siblings('strong').text().trim();
    navigator.clipboard.writeText(text);
    $(this).find('i').removeClass('fa-copy').addClass('fa-check');
    setTimeout(() => {
      $(this).find('i').removeClass('fa-check').addClass('fa-copy');
    }, 1200);
  });

  // Botão de copiar código do snippet
  $(document).on('click', '.copy-btn-code', function(e) {
    e.stopPropagation();
    const code = $(this).siblings('pre').find('code').text();
    navigator.clipboard.writeText(code);
    $(this).find('i').removeClass('fa-copy').addClass('fa-check');
    setTimeout(() => {
      $(this).find('i').removeClass('fa-check').addClass('fa-copy');
    }, 1200);
  });

  // Garante que os botões de copiar estejam presentes ao iniciar
  addCopyButtons();
});

// =====================
// FUNÇÕES UTILITÁRIAS
// =====================

// Carrega snippets de FORMULÁRIOS dinamicamente
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
              <div class="snippet-content" style="display:none; position:relative;">
                <button class="copy-btn-code" title="Copiar código" style="position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;color:#8b949e;z-index:2;">
                  <i class="fa fa-copy"></i>
                </button>
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
        setupSnippetInteractions();
        addCopyButtons();
      });
    })
    .catch(error => {
      container.innerHTML = '<p>Erro ao carregar snippets de Formulários.</p>';
      console.error(error);
    });
}

// Carrega snippets de LISTAGENS dinamicamente
function loadSnippetsListings() {
  const container = document.getElementById('listagens-snippets');
  if (!container) return;
  const listUrl = 'snippets_vscode/listagens/list.json';

  fetch(listUrl)
    .then(response => response.json())
    .then(files => {
      container.innerHTML = '';
      const fetches = files.map(filename => {
        const snippetUrl = `snippets_vscode/listagens/${filename}`;
        return fetch(snippetUrl)
          .then(response => response.text())
          .then(snippetText => {
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
              <div class="snippet-content" style="display:none; position:relative;">
                <button class="copy-btn-code" title="Copiar código" style="position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;color:#8b949e;z-index:2;">
                  <i class="fa fa-copy"></i>
                </button>
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
        setupSnippetInteractions();
        addCopyButtons();
      });
    })
    .catch(error => {
      container.innerHTML = '<p>Erro ao carregar snippets de Listagens.</p>';
      console.error(error);
    });
}

// Expande/retrai o conteúdo do snippet ao clicar no título
function setupSnippetInteractions() {
  $(document).off('click', '.snippet-title').on('click', '.snippet-title', function() {
    const $icon = $(this).find('i.fa-solid').first();
    const $content = $(this).next('.snippet-content');
    if ($content.is(':visible')) {
      $content.slideUp(150);
      $icon.removeClass('fa-compress').addClass('fa-expand');
    } else {
      $content.slideDown(150);
      $icon.removeClass('fa-expand').addClass('fa-compress');
    }
  });
}

// Adiciona botões de copiar ao lado do título do snippet (se quiser)
function addCopyButtons() {
  $('.snippet-title').each(function() {
    if ($(this).find('.copy-btn-title').length === 0) {
      $(this).append(
        `<button class="copy-btn-title" title="Copiar título" style="margin-left:8px;background:none;border:none;cursor:pointer;color:#8b949e;">
          <i class="fa fa-copy"></i>
        </button>`
      );
    }
  });
}

// Escapa caracteres HTML para exibir código com segurança
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}