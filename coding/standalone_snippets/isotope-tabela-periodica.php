
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Isotope - Tabela Periódica</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    body {
      background: #121212;
      color: #fff;
      padding: 2rem;
      font-family: sans-serif;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .element-item {
      background: #1f1f1f;
      border: 1px solid #333;
      border-radius: 5px;
      width: 80px;
      padding: 10px;
      text-align: center;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .element-item .symbol {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .element-item .name {
      font-size: 0.75rem;
      color: #ccc;
    }
    .controls {
      margin-bottom: 1rem;
    }
    .btn-group .btn.active {
      background-color: #0dcaf0;
      color: #000;
    }
    .form-control {
      max-width: 300px;
    }
  </style>
</head>
<body>

  <h2>Tabela Periódica - Exemplo Completo com Isotope</h2>

  <div class="controls mb-3 d-flex flex-wrap gap-3 align-items-center">
    <div class="btn-group" role="group" id="filters">
      <button class="btn btn-outline-light active" data-filter="*">Todos</button>
      <button class="btn btn-outline-light" data-filter=".metal">Metal</button>
      <button class="btn btn-outline-light" data-filter=".nonmetal">Não-metal</button>
      <button class="btn btn-outline-light" data-filter=".metalloid">Metalóide</button>
    </div>

    <div class="btn-group" role="group" id="sorts">
      <button class="btn btn-outline-info" data-sort-by="name">Nome</button>
      <button class="btn btn-outline-info" data-sort-by="symbol">Símbolo</button>
      <button class="btn btn-outline-info" data-sort-by="number">Número</button>
      <button class="btn btn-outline-info" data-sort-by="weight">Peso</button>
    </div>

    <input type="text" class="form-control" id="quicksearch" placeholder="Buscar elemento..." />
  </div>

  <div class="grid">
    <div class="element-item metal" data-symbol="H" data-category="nonmetal" data-number="1" data-name="Hydrogen" data-weight="1.008">
      <div class="symbol">H</div><div class="name">Hydrogen</div><div class="number">1</div>
    </div>
    <div class="element-item metal" data-symbol="He" data-category="nonmetal" data-number="2" data-name="Helium" data-weight="4.0026">
      <div class="symbol">He</div><div class="name">Helium</div><div class="number">2</div>
    </div>
    <div class="element-item metal" data-symbol="Li" data-category="metal" data-number="3" data-name="Lithium" data-weight="6.94">
      <div class="symbol">Li</div><div class="name">Lithium</div><div class="number">3</div>
    </div>
    <div class="element-item metal" data-symbol="Be" data-category="metal" data-number="4" data-name="Beryllium" data-weight="9.0122">
      <div class="symbol">Be</div><div class="name">Beryllium</div><div class="number">4</div>
    </div>
    <div class="element-item metalloid" data-symbol="B" data-category="metalloid" data-number="5" data-name="Boron" data-weight="10.81">
      <div class="symbol">B</div><div class="name">Boron</div><div class="number">5</div>
    </div>
    <div class="element-item nonmetal" data-symbol="C" data-category="nonmetal" data-number="6" data-name="Carbon" data-weight="12.011">
      <div class="symbol">C</div><div class="name">Carbon</div><div class="number">6</div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
  <script>
    var $grid = $('.grid').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
      getSortData: {
        name: '[data-name]',
        symbol: '[data-symbol]',
        number: '[data-number] parseInt',
        weight: '[data-weight] parseFloat'
      }
    });

    $('#filters').on('click', 'button', function () {
      $('#filters button').removeClass('active');
      $(this).addClass('active');
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });

    $('#sorts').on('click', 'button', function () {
      $('#sorts button').removeClass('active');
      $(this).addClass('active');
      var sortByValue = $(this).attr('data-sort-by');
      $grid.isotope({ sortBy: sortByValue });
    });

    var qsRegex;
    var $quicksearch = $('#quicksearch').keyup(debounce(function () {
      qsRegex = new RegExp($quicksearch.val(), 'gi');
      $grid.isotope({
        filter: function () {
          return qsRegex ? $(this).text().match(qsRegex) : true;
        }
      });
    }, 200));

    function debounce(fn, threshold) {
      var timeout;
      return function debounced() {
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;
        timeout = setTimeout(function () {
          fn.apply(_this, args);
        }, threshold || 100);
      };
    }
  </script>
</body>
</html>
