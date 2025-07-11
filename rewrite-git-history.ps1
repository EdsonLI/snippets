# Script para alterar todas as mensagens de commit em um repositório Git
# AVISO: Este script reescreve o histórico do Git. Use com extrema cautela!
# FAÇA UM BACKUP COMPLETO DO SEU REPOSITÓRIO ANTES DE EXECUTAR ESTE SCRIPT

# Configuração
$newCommitMessage = "Testing Agent IA Claude Sonnet 3.7"
$scriptTempFile = ".\git-rewrite-script.ps1"

Write-Host "===== AVISO DE REESCRITA DE HISTÓRIA DO GIT =====" -ForegroundColor Red
Write-Host "Este script vai mudar TODAS as mensagens de commit para:" -ForegroundColor Yellow
Write-Host "`"$newCommitMessage`"" -ForegroundColor White
Write-Host ""
Write-Host "RISCOS SÉRIOS:" -ForegroundColor Red
Write-Host "1. Isso muda os hashes de todos os commits" -ForegroundColor Yellow
Write-Host "2. Se o repositório já foi enviado para o GitHub, você precisará fazer um push forçado" -ForegroundColor Yellow
Write-Host "3. Isso pode causar problemas para qualquer pessoa que tenha clonado seu repositório" -ForegroundColor Yellow
Write-Host "4. Há risco de perda de dados se algo der errado" -ForegroundColor Yellow
Write-Host ""
Write-Host "RECOMENDAÇÃO FORTEMENTE ENCORAJADA:" -ForegroundColor Red
Write-Host "Faça um backup completo do repositório antes de continuar!" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "Você tem certeza que deseja continuar? (S/N)"
if ($confirmation -ne "S" -and $confirmation -ne "s") {
    Write-Host "Operação cancelada." -ForegroundColor Green
    exit
}

$backupConfirmation = Read-Host "Você fez um backup completo do repositório? (S/N)"
if ($backupConfirmation -ne "S" -and $backupConfirmation -ne "s") {
    Write-Host "Por favor, faça um backup antes de continuar." -ForegroundColor Red
    exit
}

# Verificar se estamos em um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "Este não parece ser um repositório Git. Execute este script na pasta raiz do seu repositório." -ForegroundColor Red
    exit
}

# Criar arquivo temporário para o script de rebase
$gitFilterBranchScript = @"
git filter-branch --force --msg-filter 'echo "$newCommitMessage"' -- --all
"@

# Salvar o script em um arquivo temporário
$gitFilterBranchScript | Out-File -FilePath $scriptTempFile -Encoding UTF8

Write-Host "Iniciando reescrita de história do Git..." -ForegroundColor Cyan

try {
    # Executar o script
    bash $scriptTempFile

    # Se chegou aqui, foi bem-sucedido
    Write-Host "Operação concluída com sucesso!" -ForegroundColor Green
    Write-Host "Todas as mensagens de commit foram alteradas para: `"$newCommitMessage`"" -ForegroundColor Green
    
    # Instruções para push forçado (se necessário)
    Write-Host ""
    Write-Host "PRÓXIMOS PASSOS:" -ForegroundColor Cyan
    Write-Host "Se este repositório já está no GitHub e você deseja atualizar o repositório remoto:" -ForegroundColor Yellow
    Write-Host "1. Execute: git push --force" -ForegroundColor White
    Write-Host "2. AVISO: Isso vai sobrescrever forçadamente o histórico no GitHub!" -ForegroundColor Red
}
catch {
    Write-Host "Erro durante a operação: $_" -ForegroundColor Red
    Write-Host "A operação não foi concluída. Verifique o erro acima." -ForegroundColor Red
}
finally {
    # Limpar o arquivo temporário
    if (Test-Path $scriptTempFile) {
        Remove-Item $scriptTempFile
    }
}
