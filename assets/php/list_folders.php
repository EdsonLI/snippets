<?php
/**
 * Script para listar pastas em um diretório especificado
 * Usado pelo sistema de carregamento dinâmico de snippets
 */

// Permitir apenas acesso local
if (!in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1'])) {
    header('HTTP/1.0 403 Forbidden');
    exit('Acesso negado');
}

// Verificar se o parâmetro path foi fornecido
if (!isset($_GET['path'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Parâmetro "path" não fornecido'
    ]);
    exit;
}

// Obter o caminho base
$basePath = $_GET['path'];

// Construir o caminho absoluto (com proteção)
$absolutePath = realpath(__DIR__ . '/../../' . $basePath);

// Verificar se o caminho é válido e está dentro do diretório de snippets
if (!$absolutePath || strpos($absolutePath, realpath(__DIR__ . '/../../coding/main')) !== 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Caminho inválido ou fora do diretório permitido'
    ]);
    exit;
}

// Listar as pastas
$folders = [];
if (is_dir($absolutePath)) {
    $items = scandir($absolutePath);
    foreach ($items as $item) {
        // Ignorar . e .. e arquivos
        if ($item !== '.' && $item !== '..' && is_dir($absolutePath . '/' . $item)) {
            $folders[] = $item;
        }
    }
}

// Retornar as pastas como JSON
echo json_encode([
    'success' => true,
    'folders' => $folders
]);
