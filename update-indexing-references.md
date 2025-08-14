# Atualizador de Referências em Index.html

Este script atualiza as referências aos arquivos CSS e JavaScript no arquivo index.html na pasta coding/indexing.

## Mudanças Realizadas

1. Substituição das referências inexistentes pelos equivalentes atuais:
   - `tech-icons-common.css` → `tech-icons-universal.css`
   - Remoção de referências a arquivos que não existem mais no projeto

2. Correção dos caminhos relativos:
   - De: `../assets/css/` → Para: `../../assets/css/`
   - De: `../assets/js/` → Para: `../../assets/js/`

## Instruções para Implementação Manual

Abra o arquivo `coding/indexing/index.html` e substitua as seguintes linhas:

```html
<link href="../assets/css/tech-badges-new.css" rel="stylesheet">
<link href="../assets/css/tech-icons-common.css" rel="stylesheet">
<link href="../assets/css/tech-icons-uniform.css" rel="stylesheet">
<link href="../assets/css/madbuilder-svg-fix.css" rel="stylesheet">
<link href="../assets/css/sql-icon-custom.css" rel="stylesheet">
<link href="../assets/css/jquery-icon-simple.css" rel="stylesheet">
<link href="../assets/css/bootstrap-icon-custom.css" rel="stylesheet">
<link href="../assets/css/w3schools-icon-custom.css" rel="stylesheet">
<link href="../assets/css/css-icon-custom.css" rel="stylesheet">
<link href="../assets/css/isotope-icon-custom.css" rel="stylesheet">
```

Por:

```html
<!-- CSS Universal para ícones de tecnologias -->
<link href="../../assets/css/tech-icons-uniform.css" rel="stylesheet">
<link href="../../assets/css/tech-icons-universal.css" rel="stylesheet">
<link href="../../assets/css/tech-icon-copilot.css" rel="stylesheet">
```

E substituir:

```html
<script src="../assets/js/tech-badges-new.js"></script>
<script src="../assets/js/button-position-fix.js" defer></script>
<script src="../assets/js/filter-text-formatter.js" defer></script>
```

Por:

```html
<script src="../../assets/js/button-position-fix.js" defer></script>
<script src="../../assets/js/filter-text-formatter.js" defer></script>
```

## Implementação via PowerShell

Se preferir atualizar automaticamente, você pode usar o seguinte script PowerShell que atualiza as referências:

```powershell
# Caminho para o arquivo HTML a ser editado
$filePath = "C:\xampp\htdocs\snippets\coding\indexing\index.html"

# Leitura do conteúdo do arquivo
$content = Get-Content -Path $filePath -Raw

# Substituições para arquivos CSS
$content = $content -replace '<link href="../assets/css/tech-badges-new.css" rel="stylesheet">', '<!-- CSS Universal para ícones de tecnologias -->'
$content = $content -replace '<link href="../assets/css/tech-icons-common.css" rel="stylesheet">', '<link href="../../assets/css/tech-icons-universal.css" rel="stylesheet">'
$content = $content -replace '<link href="../assets/css/tech-icons-uniform.css" rel="stylesheet">', '<link href="../../assets/css/tech-icons-uniform.css" rel="stylesheet">'

# Remover referências a arquivos inexistentes
$content = $content -replace '<link href="../assets/css/madbuilder-svg-fix.css" rel="stylesheet">', ''
$content = $content -replace '<link href="../assets/css/sql-icon-custom.css" rel="stylesheet">', ''
$content = $content -replace '<link href="../assets/css/jquery-icon-simple.css" rel="stylesheet">', ''
$content = $content -replace '<link href="../assets/css/bootstrap-icon-custom.css" rel="stylesheet">', ''
$content = $content -replace '<link href="../assets/css/w3schools-icon-custom.css" rel="stylesheet">', ''
$content = $content -replace '<link href="../assets/css/css-icon-custom.css" rel="stylesheet">', ''
$content = $content -replace '<link href="../assets/css/isotope-icon-custom.css" rel="stylesheet">', '<link href="../../assets/css/tech-icon-copilot.css" rel="stylesheet">'

# Substituições para arquivos JS
$content = $content -replace '<script src="../assets/js/tech-badges-new.js"></script>', ''
$content = $content -replace '<script src="../assets/js/button-position-fix.js" defer></script>', '<script src="../../assets/js/button-position-fix.js" defer></script>'
$content = $content -replace '<script src="../assets/js/filter-text-formatter.js" defer></script>', '<script src="../../assets/js/filter-text-formatter.js" defer></script>'

# Salvando o arquivo modificado
$content | Set-Content -Path $filePath -Encoding UTF8

Write-Host "Arquivo atualizado com sucesso!"
```

Salve este script como `update-indexing-references.ps1` e execute-o via PowerShell para atualizar o arquivo automaticamente.

## Validação após Atualização

Após aplicar as alterações, recomenda-se:

1. Abrir a página no navegador e verificar se os estilos e funcionalidades estão corretos
2. Verificar o console do navegador para identificar erros de carregamento de arquivos
3. Testar todas as funcionalidades da página, especialmente o menu superior e os filtros
