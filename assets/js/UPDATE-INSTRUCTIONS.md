# Exemplo de Atualização de Index.html

Abaixo está um exemplo de como atualizar o arquivo `index.html` para utilizar o novo sistema de scripts consolidados. É preciso substituir as múltiplas tags de script por uma única referência ao `script-loader.js`.

## Parte Original (Scripts Individuais)

```html
<!-- Scripts do jQuery -->
<script src="assets/js/jquery/jquery-3.7.1.min.js"></script>

<!-- Vendor JS Files -->
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/aos/aos.js"></script>
<script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
<script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>

<!-- Scripts principais -->
<script src="assets/js/main.js"></script>

<!-- Scripts de gerenciamento de snippets -->
<script src="assets/js/static-snippets-manager.js" defer></script>

<!-- Scripts de iconografia -->
<script src="assets/js/tech-badges-new.js" defer></script>
<script src="assets/js/reload-tech-icons.js" defer></script>
<script src="assets/js/sql-icon-fix.js" defer></script>
<script src="assets/js/git-icon-fix.js" defer></script>
<script src="assets/js/php-icon-fix.js" defer></script>
<script src="assets/js/sweetalert2-icon-fix.js" defer></script>

<!-- Scripts de funcionalidades adicionais -->
<script src="assets/js/snippet-external-links.js" defer></script>
<script src="assets/js/button-position-fix.js" defer></script>
<script src="assets/js/snippet-responsive-loader.js" defer></script>
<script src="assets/js/snippets-search.js" defer></script>
<script src="assets/js/snippet-scroll-indicator.js" defer></script>
```

## Versão Atualizada (Usando Script Loader)

```html
<!-- Scripts do jQuery -->
<script src="assets/js/jquery/jquery-3.7.1.min.js"></script>

<!-- Vendor JS Files -->
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/aos/aos.js"></script>
<script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
<script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>

<!-- Scripts consolidados via loader -->
<script src="assets/js/script-loader.js"></script>
```

## Instruções para Atualização:

1. Identifique todas as páginas que carregam scripts JavaScript:
   - index.html
   - blog.html 
   - blog-details.html
   - portfolio-details.html
   - service-details.html
   - starter-page.html
   - etc.

2. Em cada página, mantenha os scripts de dependências externas (jQuery, Bootstrap, etc.)

3. Substitua todos os scripts específicos da aplicação pelo script-loader.js

4. Teste cada página para garantir que todas as funcionalidades continuam funcionando corretamente.

5. Se alguma funcionalidade específica de página estiver faltando, verifique se ela foi incluída nos arquivos consolidados.

## Observações:

- Os scripts consolidados carregam na ordem correta: core → icons → snippets
- Certifique-se de que todas as dependências (jQuery, Bootstrap, etc.) estejam carregadas antes do script-loader.js
- O atributo `defer` não é mais necessário, pois o script-loader.js gerencia o carregamento assíncrono
