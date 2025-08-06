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
                position: relative !important;
                margin-top: 0 !important;                    
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                overflow-x: auto !important;
                white-space: pre-wrap !important;
                word-break: break-word !important;
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
            
            /* Ajustes específicos para dispositivos móveis */
            @media (max-width: 768px) {
                .filter-git .position-relative pre.git-pre-code {
                    width: 100% !important;
                    max-width: 100% !important;
                    overflow-x: hidden !important;
                    word-wrap: break-word !important;
                    white-space: pre-wrap !important;
                }
                
                .filter-git .position-relative pre.git-pre-code code {
                    white-space: pre-wrap !important;
                    word-break: break-word !important;
                    width: 100% !important;
                }
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
            // Erro silencioso - removido console.warn
        }
    }
    
    // Função principal que aplica todas as correções
    function fixGitButtons() {
        applyGlobalCSS();
        removeM1Class();
        adjustCodeWidths();
    }
    
    // Ajustar larguras dos blocos de código para dispositivos móveis
    function adjustCodeWidths() {
        const gitPreCodes = document.querySelectorAll('.filter-git .position-relative pre.git-pre-code');
        gitPreCodes.forEach(preElement => {
            // Marcar como processado
            preElement.setAttribute('data-width-fixed', 'true');
            
            // Ajustar largura com base no elemento pai
            const parentWidth = preElement.parentElement.clientWidth;
            if (parentWidth > 0) {
                preElement.style.maxWidth = (parentWidth - 10) + 'px'; // -10px para margem de segurança
                
                // Ajuste adicional para telas pequenas
                if (window.innerWidth <= 768) {
                    // Para dispositivos móveis, queremos ter certeza que o texto quebra corretamente
                    preElement.style.whiteSpace = 'pre-wrap';
                    preElement.style.wordBreak = 'break-word';
                    
                    // Ajustar o tamanho do código interno também
                    const codeElement = preElement.querySelector('code');
                    if (codeElement) {
                        codeElement.style.whiteSpace = 'pre-wrap';
                        codeElement.style.wordBreak = 'break-word';
                        codeElement.style.width = '100%';
                    }
                }
            }
        });
    }
    
    // Aplicar correções imediatamente
    fixGitButtons();
    
    // Aplicar correções quando a página estiver carregada
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixGitButtons);
    }
    
    // Aplicar correções após o carregamento completo
    window.addEventListener('load', fixGitButtons);
    
    // Verificar novamente após pequenos delays para garantir que os elementos estejam carregados
    setTimeout(fixGitButtons, 500);
    setTimeout(fixGitButtons, 1000);
    setTimeout(fixGitButtons, 2000);
    
    // Aplicar correções quando a janela for redimensionada (importante para dispositivos móveis)
    window.addEventListener('resize', function() {
        setTimeout(adjustCodeWidths, 100);
    });
    
    // Verificar periodicamente se novos snippets foram adicionados
    setInterval(function() {
        const unfixedGitPreCodes = document.querySelectorAll('.filter-git .position-relative pre.git-pre-code:not([data-width-fixed="true"])');
        if (unfixedGitPreCodes.length > 0) {
            fixGitButtons();
        }
    }, 3000);
})();
