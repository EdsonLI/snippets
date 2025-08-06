/**
 * Script simplificado para corrigir o posicionamento dos botões nos snippets Git
 * Versão simplificada para resolver loops e problemas de carregamento
 */
(function() {
    // CSS estritamente necessário para corrigir o problema
    const gitFixCSS = `
        /* Ajustes para os blocos de código - simplificado para máxima compatibilidade */
        .filter-git .position-relative pre.git-pre-code {
            position: relative !important;
            margin-top: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
            white-space: pre-wrap !important;
            word-break: break-word !important;
        }
        
        /* Ajustes para o botão */
        .filter-git .position-relative .position-absolute.btn-custom {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            margin: 0 !important;
            z-index: 10 !important;
        }
        
        /* Ajustes para dispositivos móveis */
        @media (max-width: 576px) {
            .filter-git .position-relative pre.git-pre-code {
                font-size: 0.9rem !important;
            }
        }
    `;
    
    // Função única que aplica as correções - mantendo o código simples
    function applyFixes() {
        try {
            // 1. Aplicar CSS
            const styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.textContent = gitFixCSS;
            document.head.appendChild(styleElement);
            
            // 2. Remover classes m-1 que causam problemas
            const buttons = document.querySelectorAll('.filter-git .position-relative .position-absolute.m-1');
            buttons.forEach(button => {
                button.classList.remove('m-1');
            });
        } catch (e) {
            // Silenciar erros
        }
    }

    // Aplicar somente quando o DOM estiver pronto - sem loops ou observadores
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFixes);
    } else {
        applyFixes();
    }
    
    // Aplicar também no carregamento completo (uma única vez)
    window.addEventListener('load', applyFixes);
})();
