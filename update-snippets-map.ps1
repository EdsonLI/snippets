# ==== COMO EXECUTAR ESTE SCRIPT ====
#
# Opção 1: No Terminal do VSCode (Recomendado)
# 1. Abra seu projeto no VSCode
# 2. Pressione Ctrl+` para abrir o terminal integrado 
# 3. Certifique-se que o terminal está usando PowerShell (verifique no menu suspenso à direita)
# 4. Digite: .\update-snippets-map.ps1
#
# Opção 2: No PowerShell normal
# 1. Abra o PowerShell
# 2. Navegue até a pasta raiz do seu projeto: cd c:\xampp\htdocs\snippets
# 3. Execute o script: .\update-snippets-map.ps1
#
# ==== OBSERVAÇÃO IMPORTANTE ====
# Se encontrar erro de execução de scripts, execute este comando no PowerShell como administrador:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Configuração
$baseFolder = "coding\main"
$jsFilePath = "assets\js\static-snippets-manager.js"

# Função para obter a estrutura de pastas e arquivos HTML
function Get-SnippetsStructure {
    param (
        [string]$basePath
    )
    
    Write-Host "Escaneando pastas e arquivos HTML em $basePath..." -ForegroundColor Cyan
    
    $structure = @{}
    
    if (-not (Test-Path $basePath)) {
        Write-Host "Pasta base não encontrada: $basePath" -ForegroundColor Red
        return $structure
    }
    
    $directories = Get-ChildItem -Path $basePath -Directory
    
    foreach ($dir in $directories) {
        $dirName = $dir.Name
        $htmlFiles = Get-ChildItem -Path "$basePath\$dirName" -Filter "*.html" | Select-Object -ExpandProperty Name
        
        if ($htmlFiles.Count -gt 0) {
            $structure[$dirName] = $htmlFiles
            Write-Host "  Pasta '$dirName': $($htmlFiles.Count) arquivos HTML encontrados" -ForegroundColor Green
        } else {
            Write-Host "  Pasta '$dirName': Nenhum arquivo HTML encontrado" -ForegroundColor Yellow
        }
    }
    
    return $structure
}

# Função para atualizar o arquivo JavaScript
function Update-SnippetsMap {
    param (
        [hashtable]$structure,
        [string]$jsFile
    )
    
    Write-Host "Atualizando o arquivo $jsFile..." -ForegroundColor Cyan
    
    if (-not (Test-Path $jsFile)) {
        Write-Host "Arquivo JavaScript não encontrado: $jsFile" -ForegroundColor Red
        return $false
    }
    
    # Ler o conteúdo do arquivo
    $content = Get-Content -Path $jsFile -Raw
    
    # Construir o novo objeto STATIC_DIRECTORY_MAP
    $mapContent = "  const STATIC_DIRECTORY_MAP = {"
    
    $i = 0
    foreach ($folder in $structure.Keys | Sort-Object) {
        $files = $structure[$folder]
        
        if ($i -gt 0) {
            $mapContent += ","
        }
        
        $mapContent += "`n    '$folder': ["
        
        for ($j = 0; $j -lt $files.Count; $j++) {
            $file = $files[$j]
            $mapContent += "'$file'"
            if ($j -lt $files.Count - 1) {
                $mapContent += ", "
            }
        }
        
        $mapContent += "]"
        $i++
    }
    
    $mapContent += "`n    // Última atualização: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')"
    $mapContent += "`n  };"
    
    # Padrão de regex para encontrar a declaração do STATIC_DIRECTORY_MAP
    $pattern = "(?ms)(\s*const\s+STATIC_DIRECTORY_MAP\s*=\s*\{).*?(\s*\}\;)"
    
    # Substituir no conteúdo
    $newContent = $content -replace $pattern, $mapContent
    
    # Salvar o arquivo
    try {
        $newContent | Set-Content -Path $jsFile -NoNewline
        Write-Host "Arquivo atualizado com sucesso!" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Erro ao salvar o arquivo: $_" -ForegroundColor Red
        return $false
    }
}

# Função para mostrar um resumo da estrutura
function Show-StructureSummary {
    param (
        [hashtable]$structure
    )
    
    $totalFolders = $structure.Count
    $totalFiles = 0
    
    foreach ($files in $structure.Values) {
        $totalFiles += $files.Count
    }
    
    Write-Host "`n=== Resumo da Estrutura ===" -ForegroundColor Magenta
    Write-Host "Pastas encontradas: $totalFolders" -ForegroundColor White
    Write-Host "Total de arquivos HTML: $totalFiles" -ForegroundColor White
    
    if ($totalFolders -gt 0) {
        Write-Host "`nDetalhes:" -ForegroundColor Magenta
        foreach ($folder in $structure.Keys | Sort-Object) {
            $files = $structure[$folder]
            Write-Host "  $folder ($($files.Count) arquivos)" -ForegroundColor White
        }
    }
}

# Função principal
function Update-SnippetsDirectory {
    Clear-Host
    
    Write-Host "=== ATUALIZADOR DO MAPA DE SNIPPETS ===" -ForegroundColor Magenta
    Write-Host "Este script atualiza automaticamente o objeto STATIC_DIRECTORY_MAP" -ForegroundColor White
    Write-Host "no arquivo static-snippets-manager.js com base nas pastas e arquivos encontrados." -ForegroundColor White
    Write-Host "==================================`n" -ForegroundColor Magenta
    
    # Verificar caminhos relativos ao diretório atual
    $currentDir = Get-Location
    $fullBasePath = Join-Path -Path $currentDir -ChildPath $baseFolder
    $fullJsPath = Join-Path -Path $currentDir -ChildPath $jsFilePath
    
    Write-Host "Diretorio base: $fullBasePath" -ForegroundColor Cyan
    Write-Host "Arquivo JavaScript: $fullJsPath`n" -ForegroundColor Cyan
    
    # Confirmar com o usuário
    $confirmation = Read-Host "Deseja continuar? (S/N)"
    if ($confirmation -ne "S" -and $confirmation -ne "s") {
        Write-Host "Operação cancelada pelo usuário." -ForegroundColor Yellow
        return
    }
    
    # Obter a estrutura de snippets
    $snippetsStructure = Get-SnippetsStructure -basePath $fullBasePath
    
    # Mostrar resumo
    Show-StructureSummary -structure $snippetsStructure
    
    if ($snippetsStructure.Count -eq 0) {
        Write-Host "`nNenhuma pasta com arquivos HTML encontrada. Nada para atualizar." -ForegroundColor Yellow
        return
    }
    
    # Confirmar a atualização
    Write-Host ""
    $updateConfirmation = Read-Host "Atualizar o arquivo JavaScript com esta estrutura? (S/N)"
    if ($updateConfirmation -ne "S" -and $updateConfirmation -ne "s") {
        Write-Host "Atualização cancelada pelo usuário." -ForegroundColor Yellow
        return
    }
    
    # Atualizar o arquivo
    $result = Update-SnippetsMap -structure $snippetsStructure -jsFile $fullJsPath
    
    if ($result) {
        Write-Host "`nO objeto STATIC_DIRECTORY_MAP foi atualizado com sucesso!" -ForegroundColor Green
        Write-Host "Você pode verificar o arquivo $jsFilePath" -ForegroundColor Green
    } else {
        Write-Host "`nOcorreu um erro ao atualizar o arquivo." -ForegroundColor Red
    }
}

# Executar a função principal
Update-SnippetsDirectory
