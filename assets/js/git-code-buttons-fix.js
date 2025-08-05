/**
 * Script simplificado para corrigir o posicionamento dos botões nos snippets Git
 * Versão 3.0 - Focada em confiabilidade e simplicidade
 */
(function() {
    // Aplicar CSS global diretamente - abordagem mais simples e confiável
    function applyGlobalCSS() {
        const globalCSS = `
            /* Estilo para os botões nos snippets Git */
            .filter-git .position-relative .position-absolute.btn-custom {
                position: absolute !important;
                top: 0 !important;
                right: 0 !important;
                margin: 0 !important;
                padding: 2px !important;
                width: 24px !important;
                height: 24px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 999 !important;
                border-radius: 0 !important;
                border: none !important;
            }
            
            /* Estilo para os ícones dentro dos botões */
            .filter-git .position-relative .position-absolute.btn-custom iconify-icon {
                width: 16px !important;
                height: 16px !important;
                position: static !important;
                transform: none !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            
            /* Ajustes para os blocos de código */
            .filter-git .position-relative pre.git-pre-code {
                padding-right: 26px !important;
                position: relative !important;
                margin-top: 0 !important;
            }
            
            /* Override específico para remover margens */
            .filter-git .position-relative .position-absolute.btn-custom.m-1 {
                margin: 0 !important;
            }
            
            /* Efeito hover */
            .filter-git .position-relative .position-absolute.btn-custom:hover {
                background-color: var(--bs-btn-active-bg) !important;
                color: #212529 !important;
            }
        `;
        
        // Remover estilos antigos se existirem
        const oldStyles = document.querySelectorAll('style[data-git-button-fix]');
        oldStyles.forEach(style => style.remove());
        
        // Adicionar novo estilo
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.setAttribute('data-git-button-fix', 'true');
        styleElement.textContent = globalCSS;
        document.head.appendChild(styleElement);
    }
    
    // Remover classe m-1 de todos os botões - causa principal do problema
    function removeM1Class() {
        try {
            const buttons = document.querySelectorAll('.filter-git .position-relative .position-absolute.m-1');
            buttons.forEach(button => {
                button.classList.remove('m-1');
                button.setAttribute('data-fixed', 'true');
            });
        } catch (e) {
            console.warn('Erro ao remover classes m-1:', e);
        }
    }
    
    // Função principal que aplica todas as correções
    function fixGitButtons() {
        applyGlobalCSS();
        removeM1Class();
    }
    
    // Aplicar correções imediatamente
    fixGitButtons();
    
    // Aplicar correções quando a página estiver carregada
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixGitButtons);
    }
    
    // Aplicar correções após o carregamento completo
    window.addEventListener('load', fixGitButtons);
    
    // Verificar novamente após um pequeno delay
    setTimeout(fixGitButtons, 1000);
})();
