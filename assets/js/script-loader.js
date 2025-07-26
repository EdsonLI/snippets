/**
 * Arquivo de inicialização que carrega os scripts consolidados
 * Este arquivo deve ser incluído nas páginas HTML no lugar dos scripts individuais
 * 
 * @author EdsonLI e GitHub Copilot
 * @version 1.0.1
 */

// Detecção automática do ambiente (GitHub Pages ou desenvolvimento local)
const isGitHubPages = window.location.hostname === 'edsonli.github.io';
const basePath = isGitHubPages ? '/snippets/' : '';

// Definição de caminhos para os scripts consolidados
const SCRIPT_PATHS = {
    core: `${basePath}assets/js/core/main-core.js`,
    snippets: `${basePath}assets/js/snippets/snippets-core.js`,
    icons: `${basePath}assets/js/icons/tech-icons-fix.js`
};

// Log do ambiente detectado
console.log(`📂 Ambiente detectado: ${isGitHubPages ? 'GitHub Pages' : 'Desenvolvimento local'}`);
console.log(`📁 Caminho base: "${basePath}"`);

// Carregar os scripts em ordem
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Iniciando carregamento dos scripts consolidados...');
    
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
    
    // Tratamento de carregamento bem-sucedido
    if (callback) {
        script.onload = function() {
            console.log(`✅ Script carregado com sucesso: ${src}`);
            callback();
        };
    }
    
    // Tratamento de erro no carregamento
    script.onerror = function() {
        console.error(`❌ Erro ao carregar o script: ${src}`);
        console.info(`💡 Caminho absoluto tentado: ${new URL(src, window.location.href).href}`);
        
        // Tentar novamente com caminho relativo ao repositório
        if (window.location.hostname === 'edsonli.github.io') {
            const repoPath = '/snippets/';
            const newSrc = repoPath + src;
            console.warn(`🔄 Tentando novamente com caminho relativo ao repositório: ${newSrc}`);
            
            const fallbackScript = document.createElement('script');
            fallbackScript.src = newSrc;
            fallbackScript.async = true;
            
            if (callback) {
                fallbackScript.onload = function() {
                    console.log(`✅ Script carregado com sucesso (segunda tentativa): ${newSrc}`);
                    callback();
                };
            }
            
            fallbackScript.onerror = function() {
                console.error(`❌ Falha definitiva ao carregar o script: ${newSrc}`);
            };
            
            document.body.appendChild(fallbackScript);
            return; // Evita adicionar o script original ao DOM
        }
    };
    
    document.body.appendChild(script);
}

// Expor função de carregamento globalmente caso necessário
window.loadScriptDynamic = loadScript;
