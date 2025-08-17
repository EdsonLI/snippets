#!/usr/bin/env node
/**
 * Script para padronizar todas as páginas de snippets no formato standalone responsivo
 * Converte os fragmentos HTML para páginas completas com layout Bootstrap
 */

const fs = require('fs');
const path = require('path');

// Template base para as páginas
const createPageTemplate = (title, content) => `<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  
  <!-- Sistema Global de Toggle de Tema -->
  <link href="assets/theme-toggle.css" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>
  
  <title>${title}</title>
</head>
<body class="theme-dark">
  <!-- Toggle de Tema -->
  <button id="themeToggle" class="btn btn-sm theme-toggle-btn" type="button" title="Alternar tema" aria-label="Alternar tema">
    <iconify-icon id="theme-icon" icon="line-md:light-dark" style="vertical-align: middle;"></iconify-icon>
  </button>

  <section class="py-5">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-snippet">
        ${content}
      </div>
    </div>
  </section>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/theme-toggle.js"></script>
</body>
</html>`;

// Função para extrair e converter o conteúdo dos cards
const extractAndConvertContent = (htmlContent) => {
  // Remove as divs container externas e extrai apenas os cards
  let content = htmlContent;
  
  // Remove as tags de abertura/fechamento das divs externas
  content = content.replace(/<div class="section"[^>]*>[\s\S]*?<div class="container mt-4">\s*<div class="row">/gi, '');
  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>[\s\S]*$/gi, '');
  
  // Converte estruturas antigas para o novo formato
  content = content.replace(/<div class="col-sm-12 col-md-6 mb-4">/gi, '<div class="col">');
  content = content.replace(/<div class="card p-3 shadow-sm">/gi, '<div class="card h-100 shadow-sm"><div class="card-body">');
  
  // Adiciona fechamento do card-body onde necessário
  content = content.replace(/<\/div>\s*<\/div>\s*(?=<div class="col">|$)/gi, '</div></div></div>');
  
  return content.trim();
};

// Páginas para converter
const pagesToConvert = [
  { file: 'snippets_css.html', title: 'Snippets CSS' },
  { file: 'snippets_bootstrap.html', title: 'Snippets Bootstrap' },
  { file: 'snippets_html.html', title: 'Snippets HTML' },
  { file: 'snippets_php.html', title: 'Snippets PHP' },
  { file: 'snippets_sql.html', title: 'Snippets SQL' }
];

console.log('🚀 Iniciando conversão das páginas para o padrão responsivo...');

pagesToConvert.forEach(page => {
  try {
    const filePath = path.join(__dirname, page.file);
    const originalContent = fs.readFileSync(filePath, 'utf8');
    
    // Extrair apenas o conteúdo dos snippets
    const snippetContent = extractAndConvertContent(originalContent);
    
    // Gerar nova página
    const newPage = createPageTemplate(page.title, snippetContent);
    
    // Salvar backup do original
    fs.writeFileSync(filePath.replace('.html', '_backup.html'), originalContent);
    
    // Salvar nova versão
    fs.writeFileSync(filePath, newPage);
    
    console.log(`✅ ${page.file} convertido com sucesso!`);
    
  } catch (error) {
    console.error(`❌ Erro ao converter ${page.file}:`, error.message);
  }
});

console.log('🎉 Conversão concluída!');
