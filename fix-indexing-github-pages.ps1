# Script para atualizar as referências de arquivos no indexing/index.html
# Este script corrige os caminhos dos arquivos CSS e JS para funcionar no GitHub Pages

# Caminho para o arquivo HTML a ser editado
$filePath = "C:\xampp\htdocs\snippets\coding\indexing\index.html"

# Verifica se o arquivo existe
if (-not (Test-Path $filePath)) {
    Write-Error "Arquivo não encontrado: $filePath"
    exit 1
}

# Faz backup do arquivo original
$backupPath = "$filePath.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item -Path $filePath -Destination $backupPath
Write-Host "Backup criado em: $backupPath" -ForegroundColor Green

# Leitura do conteúdo do arquivo
$content = Get-Content -Path $filePath -Raw

# Correções para referências CSS no cabeçalho
Write-Host "Atualizando referências CSS..." -ForegroundColor Cyan

# Substituir referência do favicon
$content = $content -replace '<link rel="icon" href="assets/images/favicon.png" type="image/png">', '<link rel="icon" href="../../assets/img/favicon.png" type="image/png">'

# Substituir referências CSS para arquivos de tecnologia
$cssPattern = '(?s)<!-- Tech Badges CSS -->.*?<link href="../assets/css/isotope-icon-custom.css" rel="stylesheet">'
$cssReplacement = @"
<!-- CSS para ícones de tecnologias -->
  <link href="../../assets/css/tech-icons-universal.css" rel="stylesheet">
  <link href="../../assets/css/tech-icon-copilot.css" rel="stylesheet">
"@
$content = [regex]::Replace($content, $cssPattern, $cssReplacement)

# Corrigir caminhos para arquivos CSS de snippet
$content = $content -replace '<link href="../assets/css/snippet-actions.css" rel="stylesheet">', '<link href="../../assets/css/snippet-actions.css" rel="stylesheet">'
$content = $content -replace '<link href="../assets/css/snippet-actions-responsive.css" rel="stylesheet">', '<link href="../../assets/css/snippet-actions-responsive.css" rel="stylesheet">'

# Adicionar scripts no cabeçalho antes de </head>
Write-Host "Adicionando scripts no cabeçalho..." -ForegroundColor Cyan
$scriptsToAdd = @"
  
  <!-- Scripts necessários -->
  <script src="../../assets/js/tech-icons-universal.js" defer></script>
  <script src="../../assets/js/button-position-fix.js" defer></script>
  <script src="../../assets/js/filter-text-formatter.js" defer></script>
"@
$content = $content -replace '(<script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>)\s*</head>', "`$1$scriptsToAdd`r`n</head>"

# Corrigir referência à imagem do Isotope
Write-Host "Corrigindo referências a imagens..." -ForegroundColor Cyan
$content = $content -replace '<img src="./assets/img/madbuilder.svg" alt="MadBuilder Logo" class="tab-icon-isotope" width="10" height="10">', '<img src="../../assets/img/isotope.png" alt="MadBuilder Logo" class="tab-icon-isotope" width="24" height="24">'

# Remover scripts duplicados no final do arquivo
Write-Host "Removendo scripts duplicados..." -ForegroundColor Cyan
$scriptsPattern = '(?s)<!-- Script para os tech badges -->.*?<script src="../assets/js/filter-text-formatter.js" defer></script>'
$scriptsReplacement = '<!-- Scripts já incluídos no cabeçalho da página -->'
$content = [regex]::Replace($content, $scriptsPattern, $scriptsReplacement)

# Corrigir problema com elemento null no JavaScript
Write-Host "Corrigindo JavaScript..." -ForegroundColor Cyan
$jsPattern = 'document.addEventListener\(''DOMContentLoaded'', function\(\) \{\s*const wrapper = document.querySelector\(''.tabs-carousel-wrapper''\);.*?updateTabsArrows\(\);\s*\}\);'
$jsReplacement = @"
document.addEventListener('DOMContentLoaded', function() {
      const wrapper = document.querySelector('.tabs-wrapper'); // Corrigido o seletor
      if (!wrapper) return;
      const tabs = wrapper.querySelector('.tabs');
      const left = wrapper.querySelector('.tabs-arrow.left');
      const right = wrapper.querySelector('.tabs-arrow.right');
      
      // Verificar se todos os elementos existem antes de adicionar eventos
      if (tabs && left && right) {
        left.addEventListener('click', function() {
          tabs.scrollBy({ left: -200, behavior: 'smooth' });
        });
        right.addEventListener('click', function() {
          tabs.scrollBy({ left: 200, behavior: 'smooth' });
        });
        tabs.addEventListener('scroll', updateTabsArrows);
        window.addEventListener('resize', updateTabsArrows);
        updateTabsArrows();
      } else {
        console.warn('Alguns elementos de navegação não foram encontrados');
      }
    });
"@
$content = [regex]::Replace($content, $jsPattern, $jsReplacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)

# Corrigir estrutura HTML incorreta (tag div extra)
Write-Host "Corrigindo estrutura HTML..." -ForegroundColor Cyan
$content = $content -replace '</div>\s*<!-- MadBuilder tab removed -->\s*<span class="tab-check"><i class="fa-regular fa-circle-check"></i></span>\s*</div>', '</div><!-- Removida estrutura HTML incorreta -->'

# Salvando o arquivo modificado
$content | Set-Content -Path $filePath -Encoding UTF8

Write-Host "Arquivo atualizado com sucesso!" -ForegroundColor Green
Write-Host "As referências foram corrigidas para funcionarem corretamente no GitHub Pages." -ForegroundColor Green
