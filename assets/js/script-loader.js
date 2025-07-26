/**
 * Arquivo de inicialização que carrega os scripts consolidados
 * Este arquivo deve ser incluído nas páginas HTML no lugar dos scripts individuais
 * 
 * @author EdsonLI e GitHub Copilot
 * @version 1.0.0
 */

// Definição de caminhos para os scripts consolidados
const SCRIPT_PATHS = {
    core: '/assets/js/core/main-core.js',
    snippets: '/assets/js/snippets/snippets-core.js',
    icons: '/assets/js/icons/tech-icons-fix.js'
};

// Carregar os scripts em ordem
document.addEventListener('DOMContentLoaded', function() {
    // Carregar o script core primeiro
    loadScript(SCRIPT_PATHS.core, function() {
        // Depois carregar o script de ícones
        loadScript(SCRIPT_PATHS.icons, function() {
            // Por último carregar o script de snippets
            loadScript(SCRIPT_PATHS.snippets);
        });
    });
});

/**
 * Função auxiliar para carregar scripts dinamicamente
 * @param {string} src - Caminho do script a ser carregado
 * @param {Function} callback - Função a ser chamada após o carregamento
 */
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    if (callback) {
        script.onload = callback;
    }
    
    document.body.appendChild(script);
}

// Expor função de carregamento globalmente caso necessário
window.loadScriptDynamic = loadScript;
