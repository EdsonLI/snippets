/**
 * Script para carregar e aplicar o CSS de correção dos botões em snippets Git
 */
(function() {
    // Método 1: Tentar carregar o arquivo CSS
    const loadExternalCSS = () => {
        try {
            if (!document.querySelector('link[href*="git-code-buttons-fix.css"]')) {
                // Cria elemento link para o CSS
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.type = 'text/css';
                
                // Tentamos os dois caminhos possíveis para garantir
                const baseUrl = window.location.pathname.includes('/snippets/') ? '' : 'snippets/';
                linkElement.href = baseUrl + 'assets/css/git-code-buttons-fix.css';
                
                linkElement.setAttribute('data-priority', 'high');
                document.head.appendChild(linkElement);
            }
        } catch (e) {
            console.warn('Falha ao carregar CSS externo:', e);
        }
    };
    
    // Método 2: Aplicar estilos diretamente via JavaScript como fallback
    const applyInlineStyles = () => {
        // Estilos CSS para corrigir os ícones
        const cssRules = `
            .filter-git .btn-xs iconify-icon,
            .portfolio-item.filter-git .btn-custom iconify-icon {
                position: static !important;
                top: auto !important;
                left: auto !important;
                transform: none !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                vertical-align: middle !important;
                margin: 0 !important;
                width: 14px !important;
                height: 14px !important;
            }
            
            .filter-git .btn-xs,
            .portfolio-item.filter-git .btn-custom {
                display: inline-flex !important;
                justify-content: center !important;
                align-items: center !important;
                padding: 0.15rem 0.3rem !important;
                line-height: 1 !important;
                height: auto !important;
            }
        `;
        
        // Cria e adiciona o elemento style
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(cssRules));
        document.head.appendChild(styleElement);
    };
    
    // Tenta os dois métodos para garantir que um deles funcione
    loadExternalCSS();
    applyInlineStyles();
    
    // Adiciona uma classe especial para identificação
    document.querySelectorAll('.filter-git .btn-custom iconify-icon').forEach(icon => {
        icon.classList.add('git-icon-fixed');
    });
    
    console.log('Correção para botões Git aplicada com sucesso!');
})();
