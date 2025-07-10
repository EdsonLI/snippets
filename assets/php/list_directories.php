<?php
/**
 * Listar diretórios em um caminho específico
 * 
 * Este script retorna uma lista de todos os diretórios (pastas) em um 
 * caminho especificado, útil para o carregador automático de snippets.
 * 
 * @author Edson LI - GitHub Copilot
 * @version 1.0.0
 */

// Cabeçalhos
header('Content-Type: application/json');

// Função para verificar se um caminho é seguro
function isPathSafe($path) {
    // Caminho base do site
    $basePath = realpath(__DIR__ . '/../../');
    
    // Caminho completo que está sendo solicitado
    $fullPath = realpath($basePath . '/' . $path);
    
    // Verificar se o caminho existe
    if ($fullPath === false) {
        return false;
    }
    
    // Verificar se o caminho está dentro do site
    return strpos($fullPath, $basePath) === 0;
}

// Verificar se o parâmetro path foi fornecido
if (!isset($_GET['path'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Parâmetro "path" não fornecido'
    ]);
    exit;
}

// Obter e sanitizar o caminho
$requestedPath = filter_var($_GET['path'], FILTER_SANITIZE_STRING);
$requestedPath = str_replace('..', '', $requestedPath); // Remover tentativas de navegar para cima

// Verificar se o caminho é seguro
if (!isPathSafe($requestedPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Caminho inválido ou fora do diretório permitido'
    ]);
    exit;
}

// Caminho completo
$fullPath = realpath(__DIR__ . '/../../' . $requestedPath);

// Verificar se o diretório existe
if (!file_exists($fullPath) || !is_dir($fullPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Diretório não encontrado'
    ]);
    exit;
}

// Listar todos os diretórios
$directories = [];
$items = scandir($fullPath);

foreach ($items as $item) {
    // Ignorar . e .. e arquivos
    if ($item !== '.' && $item !== '..' && is_dir($fullPath . '/' . $item)) {
        $directories[] = $item;
    }
}

// Retornar a lista como JSON
echo json_encode([
    'success' => true,
    'directories' => $directories,
    'path' => $requestedPath
]);
