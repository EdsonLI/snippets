<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Preview dinâmico com Glightbox</title>

  <!-- Bootstrap + jQuery + Glightbox -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>

  <style>
    body {
      background-color: #111;
      color: #fff;
      padding: 2rem;
      font-family: sans-serif;
    }
    .btn-outline-info {
      border-radius: 20px;
    }
  </style>
</head>
<body>

  <h2 class="mb-4">Teste de Preview com Glightbox + GitHub RAW</h2>

  <!-- Botão de preview -->
  <a href="#preview-isotope" id="preview-link" class="btn btn-outline-info" onclick="loadIsotope()">
    <iconify-icon icon="mdi:eye-outline"></iconify-icon> Pré-visualizar Isotope
  </a>

  <!-- Container oculto que será preenchido dinamicamente -->
  <div id="preview-isotope" style="display:none;" class="glightbox-content">
    <div class="p-4 text-center">Carregando conteúdo do GitHub...</div>
  </div>

  <!-- Script principal -->
  <script>
    let loadedIsotope = false;

    function loadIsotope() {
      if (loadedIsotope) return;

      $.get(
        'https://raw.githubusercontent.com/EdsonLI/snippets/main/coding/standalone_snippets/isotope_sample_1.html',
        function (data) {
          $('#preview-isotope').html(data);
          loadedIsotope = true;

          // Adiciona a classe glightbox e ativa
          $('#preview-link').addClass('glightbox');

          const lightbox = GLightbox({ selector: '#preview-link' });
          lightbox.open();
        }
      ).fail(function () {
        $('#preview-isotope').html('<p class="text-danger">Erro ao carregar snippet do GitHub.</p>');
      });
    }
  </script>

  <!-- Iconify (opcional) -->
  <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>

</body>
</html>