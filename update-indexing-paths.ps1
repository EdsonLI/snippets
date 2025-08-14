# Script para atualizar as referências de CSS e JS no arquivo coding/indexing/index.html
# Este script corrige caminhos quebrados e substitui referências a arquivos que não existem mais

# Caminho para o arquivo HTML a ser editado
$filePath = "C:\xampp\htdocs\snippets\coding\indexing\index.html"

# Verifica se o arquivo existe
if (-not (Test-Path $filePath)) {
    Write-Error "Arquivo não encontrado: $filePath"
    exit 1
}

# Faz backup do arquivo original
$backupPath = "$filePath.backup"
Copy-Item -Path $filePath -Destination $backupPath
Write-Host "Backup criado em: $backupPath"

# Leitura do conteúdo do arquivo
$content = Get-Content -Path $filePath -Raw

# Substituições para arquivos CSS
$cssReplacements = @{
    '<link href="../assets/css/tech-badges-new.css" rel="stylesheet">' = '<!-- CSS Universal para ícones de tecnologias -->';
    '<link href="../assets/css/tech-icons-common.css" rel="stylesheet">' = '<link href="../../assets/css/tech-icons-universal.css" rel="stylesheet">';
    '<link href="../assets/css/tech-icons-uniform.css" rel="stylesheet">' = '<link href="../../assets/css/tech-icons-uniform.css" rel="stylesheet">';
    '<link href="../assets/css/madbuilder-svg-fix.css" rel="stylesheet">' = '';
    '<link href="../assets/css/sql-icon-custom.css" rel="stylesheet">' = '';
    '<link href="../assets/css/jquery-icon-simple.css" rel="stylesheet">' = '';
    '<link href="../assets/css/bootstrap-icon-custom.css" rel="stylesheet">' = '';
    '<link href="../assets/css/w3schools-icon-custom.css" rel="stylesheet">' = '';
    '<link href="../assets/css/css-icon-custom.css" rel="stylesheet">' = '';
    '<link href="../assets/css/isotope-icon-custom.css" rel="stylesheet">' = '<link href="../../assets/css/tech-icon-copilot.css" rel="stylesheet">';
    '<link href="../assets/css/snippet-actions.css" rel="stylesheet">' = '<link href="../../assets/css/snippet-actions.css" rel="stylesheet">';
    '<link href="../assets/css/snippet-actions-responsive.css" rel="stylesheet">' = '<link href="../../assets/css/snippet-actions-responsive.css" rel="stylesheet">';
}

# Substituições para arquivos JS
$jsReplacements = @{
    '<script src="../assets/js/tech-badges-new.js"></script>' = '';
    '<script src="../assets/js/button-position-fix.js" defer></script>' = '<script src="../../assets/js/button-position-fix.js" defer></script>';
    '<script src="../assets/js/filter-text-formatter.js" defer></script>' = '<script src="../../assets/js/filter-text-formatter.js" defer></script>';
}

# Aplicar todas as substituições de CSS
foreach ($key in $cssReplacements.Keys) {
    $content = $content.Replace($key, $cssReplacements[$key])
}

# Aplicar todas as substituições de JS
foreach ($key in $jsReplacements.Keys) {
    $content = $content.Replace($key, $jsReplacements[$key])
}

# Adicionando a tag para o arquivo tech-icons-universal.js
$insertPoint = '<script src="../../assets/js/button-position-fix.js" defer></script>'
$newScript = '<script src="../../assets/js/tech-icons-universal.js" defer></script>'
if ($content -match [regex]::Escape($insertPoint) -and $content -notmatch [regex]::Escape($newScript)) {
    $content = $content.Replace($insertPoint, "$newScript`n  $insertPoint")
}

# Salvando o arquivo modificado
$content | Set-Content -Path $filePath -Encoding UTF8

Write-Host "Arquivo atualizado com sucesso!"
Write-Host "As seguintes substituições foram realizadas:"
$cssReplacements.Keys | ForEach-Object { Write-Host "- $_" }
$jsReplacements.Keys | ForEach-Object { Write-Host "- $_" }
Write-Host "Adicionado: $newScript"
