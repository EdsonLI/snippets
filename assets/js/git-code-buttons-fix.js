/**
 * Script simplificado para corrigir o posicionamento dos botões nos snippets Git
 * Versão simplificada para resolver loops e problemas de carregamento
 */
(function() {
    // Função específica para ajustar os ícones de links externos
    function fixExternalLinkIcons() {
        try {
            const externalLinkIcons = document.querySelectorAll('.filter-git .snippet-actions-float a[data-snippet-external-link] iconify-icon');
            
            if (externalLinkIcons.length > 0) {
                externalLinkIcons.forEach(icon => {
                    // Restaurar atributos originais
                    if (icon.hasAttribute('width')) {
                        icon.setAttribute('width', '20');
                    }
                    if (icon.hasAttribute('height')) {
                        icon.setAttribute('height', '20');
                    }
                    
                    // Aplicar estilos inline para garantir
                    icon.style.width = '20px';
                    icon.style.height = '20px';
                    icon.style.minWidth = '20px';
                    icon.style.minHeight = '20px';
                    icon.style.display = 'inline-flex';
                    icon.style.alignItems = 'center';
                    icon.style.justifyContent = 'center';
                });
                
                console.log('Ícones de links externos ajustados:', externalLinkIcons.length);
            }
        } catch (e) {
            console.warn('Erro ao ajustar ícones de links externos:', e);
        }
    }
    
    // Chamar a função ao carregar
    setTimeout(fixExternalLinkIcons, 500);
    setTimeout(fixExternalLinkIcons, 1500);
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
            display: inline-block !important;
            text-align: center !important;
            line-height: 1 !important;
        }
        
        /* Centralização completa do ícone */
        .filter-git .position-relative .position-absolute.btn-custom iconify-icon {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            display: block !important;
        }
        
        /* Ajustes para os ícones dentro dos botões */
        .filter-git .position-relative .position-absolute.btn-custom iconify-icon {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 14px !important;
            height: 14px !important;
        }
        
        /* Ajustes para garantir que o botão tenha o tamanho e posicionamento corretos */
        .filter-git .position-relative .btn-custom {
            padding: 2px 5px !important;
            height: 24px !important;
            min-height: 24px !important;
            line-height: 24px !important;
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
            styleElement.setAttribute('data-git-button-fix', 'true'); // Marcar para evitar duplicações
            styleElement.textContent = gitFixCSS;
            document.head.appendChild(styleElement);
            
            // 2. Remover classes m-1 que causam problemas
            const buttons = document.querySelectorAll('.filter-git .position-relative .position-absolute.btn-custom');
            buttons.forEach(button => {
                // Remover classe m-1
                button.classList.remove('m-1');
                
                // Aplicar estilos diretamente (mais forte que classes)
                button.style.position = 'absolute';
                button.style.top = '0';
                button.style.right = '0';
                button.style.margin = '0';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.padding = '2px 5px';
                
                // Ajustar os ícones dentro do botão
                const icons = button.querySelectorAll('iconify-icon');
                icons.forEach(icon => {
                    icon.style.display = 'flex';
                    icon.style.alignItems = 'center';
                    icon.style.justifyContent = 'center';
                    icon.style.margin = '0';
                    icon.style.padding = '0';
                });
            });
            
            // 3. Garantir que os pre.git-pre-code tenham largura 100%
            const preCodes = document.querySelectorAll('.filter-git .position-relative pre.git-pre-code');
            preCodes.forEach(preCode => {
                preCode.style.width = '100%';
                preCode.style.maxWidth = '100%';
                preCode.style.boxSizing = 'border-box';
                preCode.style.overflowX = 'hidden';
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
