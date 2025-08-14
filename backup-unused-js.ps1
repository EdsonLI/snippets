# Backup de Arquivos JavaScript não Utilizados
# Este script cria um backup dos arquivos JavaScript que provavelmente não estão sendo utilizados

# Criar diretório de backup se não existir
$backupDir = "C:\xampp\htdocs\snippets\assets\js_backup"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
    Write-Host "Diretório de backup criado: $backupDir"
}

# Lista de arquivos para backup (provavelmente não utilizados)
$filesToBackup = @(
    "snippets-manager.js",
    "copy-buttons-manager.js",
    "bootstrap-filter-icon.js",
    "bootstrap-icon-fix.js",
    "git-code-buttons-fix.js.new",
    "mobile-filters-fix.js.new",
    "botoes-copia.js"
)

# Mover arquivos para backup
foreach ($file in $filesToBackup) {
    $sourcePath = "C:\xampp\htdocs\snippets\assets\js\$file"
    $destPath = "$backupDir\$file"
    
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath
        Write-Host "Arquivo copiado para backup: $file"
        
        # Opcionalmente, remover o arquivo original após confirmação
        $confirm = Read-Host "Deseja remover o arquivo original? $file (S/N)"
        if ($confirm -eq "S" -or $confirm -eq "s") {
            Remove-Item -Path $sourcePath
            Write-Host "Arquivo original removido: $file" -ForegroundColor Green
        } else {
            Write-Host "Arquivo original mantido: $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Arquivo não encontrado: $file" -ForegroundColor Red
    }
}

# Arquivos que requerem verificação adicional (apenas listar)
$filesToVerify = @(
    "snippet-copy-simple.js",
    "mobile-filters-fix.js",
    "main.js",
    "git-icon-fix.js",
    "git-snippet-fixes.js",
    "preload-snippets.js",
    "imagesloaded-fix.js",
    "jquery-icon-fix.js",
    "markdown-highlight-fix.js",
    "php-icon-fix.js",
    "reload-tech-icons.js"
)

Write-Host "`nOs seguintes arquivos podem requerer verificação adicional antes de backup:" -ForegroundColor Cyan
foreach ($file in $filesToVerify) {
    $sourcePath = "C:\xampp\htdocs\snippets\assets\js\$file"
    if (Test-Path $sourcePath) {
        Write-Host "- $file" -ForegroundColor Cyan
    }
}

Write-Host "`nProcesso de backup concluído!" -ForegroundColor Green
