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
            
            /* Ajustes para os blocos de código - verdadeiramente responsivo */
            .filter-git .position-relative pre.git-pre-code {
                position: relative !important;
                margin-top: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                overflow-x: hidden !important; /* Previne rolagem horizontal */
                white-space: pre-wrap !important;
                word-break: break-word !important;
                padding-right: 5px !important; /* Pequena margem para evitar que o texto toque a borda */
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
            
            /* Classe para snippets Git verdadeiramente responsivos */
            .responsive-git-snippet {
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                overflow: visible !important;
            }
            
            /* Garantir que o container de código se ajuste corretamente */
            .filter-git .position-relative {
                width: 100% !important;
                max-width: 100% !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
                display: block !important;
            }
            
            /* Garantir que o botão não interfira no layout */
            .filter-git .position-relative .position-absolute.btn-custom {
                z-index: 10 !important;
            }
            
            /* Ajustes específicos para dispositivos móveis - completamente responsivo */
            @media (max-width: 576px) {
                .filter-git .position-relative pre.git-pre-code {                                
                    width: 100% !important;
                    max-width: 100% !important;
                    overflow-x: hidden !important;
                    word-wrap: break-word !important;
                    white-space: pre-wrap !important;
                    font-size: 0.9rem !important; /* Fonte ligeiramente menor em dispositivos móveis */
                    padding: 0.5rem !important; /* Padding reduzido */
                }
                
                .filter-git .position-relative pre.git-pre-code code {
                    white-space: pre-wrap !important;
                    word-break: break-word !important;
                    width: 100% !important;
                    display: block !important;
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
    
    // Ajustar larguras dos blocos de código - versão melhorada para garantir responsividade
    function adjustCodeWidths() {
        const gitPreCodes = document.querySelectorAll('.filter-git .position-relative pre.git-pre-code');
        gitPreCodes.forEach(preElement => {
            // Marcar como processado
            preElement.setAttribute('data-width-fixed', 'true');
            
            // Forçar largura 100% e ajustar o overflow para garantir que não haja barra de rolagem horizontal
            preElement.style.width = '100%';
            preElement.style.maxWidth = '100%';
            preElement.style.overflowX = 'hidden';
            preElement.style.boxSizing = 'border-box';
            
            // Para garantir que o conteúdo interno também se ajuste
            const codeElement = preElement.querySelector('code');
            if (codeElement) {
                codeElement.style.whiteSpace = 'pre-wrap';
                codeElement.style.wordBreak = 'break-word';
                codeElement.style.width = '100%';
                codeElement.style.display = 'block';
                
                // Verificar se o conteúdo está muito extenso (linhas longas)
                const textContent = codeElement.textContent || '';
                const lines = textContent.split('\n');
                
                // Se alguma linha for muito longa, forçamos quebra de palavra mais agressiva
                const longLine = lines.some(line => line.length > 50);
                if (longLine) {
                    codeElement.style.wordBreak = 'break-all'; // Quebra mais agressiva para linhas muito longas
                }
            }
            
            // Verificar se o pai é o container do snippet
            const parentContainer = preElement.closest('.filter-git');
            if (parentContainer) {
                // Aplicar classe personalizada para melhor controle
                parentContainer.classList.add('responsive-git-snippet');
            }
        });
    }
    
    // Função de inicialização segura
    function safeInit() {
        // Aplicar correções imediatamente se o DOM já estiver pronto
        if (document.readyState !== 'loading') {
            fixGitButtons();
        } else {
            // Caso contrário, esperar o DOM carregar
            document.addEventListener('DOMContentLoaded', fixGitButtons);
        }
        
        // Aplicar correções após o carregamento completo
        window.addEventListener('load', fixGitButtons);
    }
    
    // Iniciar com segurança
    safeInit();
    
    // Função para aplicar com segurança
    function safeApply(fn) {
        return function() {
            try {
                fn();
            } catch (e) {
                // Ignorar erros silenciosamente
            }
        };
    }
    
    // Verificar novamente após pequenos delays para garantir que os elementos estejam carregados
    setTimeout(safeApply(fixGitButtons), 100);
    setTimeout(safeApply(fixGitButtons), 500);
    setTimeout(safeApply(fixGitButtons), 1000);
    setTimeout(safeApply(fixGitButtons), 2000);
    
    // Aplicar correções quando a janela for redimensionada (importante para dispositivos móveis)
    window.addEventListener('resize', function() {
        try {
            // Executa imediatamente
            adjustCodeWidths();
            // E depois de um pequeno delay para garantir que todos os cálculos de layout foram concluídos
            setTimeout(safeApply(adjustCodeWidths), 100);
        } catch (e) {
            // Ignorar erros silenciosamente
        }
    });
    
    // Handler específico para mudanças de orientação em dispositivos móveis
    window.addEventListener('orientationchange', function() {
        try {
            // Executar várias vezes para garantir que os ajustes sejam aplicados após o evento de orientação
            setTimeout(safeApply(fixGitButtons), 100);
            setTimeout(safeApply(fixGitButtons), 500);
        } catch (e) {
            // Ignorar erros silenciosamente
        }
    });
    
    // Função para configurar a observação de DOM
    function setupDOMObservation() {
        // Verificar periodicamente se novos snippets foram adicionados (intervalo mais curto)
        setInterval(function() {
            try {
                const unfixedGitPreCodes = document.querySelectorAll('.filter-git .position-relative pre.git-pre-code:not([data-width-fixed="true"])');
                if (unfixedGitPreCodes.length > 0) {
                    fixGitButtons();
                }
            } catch (e) {
                // Ignorar erros silenciosamente
            }
        }, 1000);
        
        try {
            // Para garantir que qualquer ajuste dinâmico no DOM seja detectado
            const observer = new MutationObserver(function(mutations) {
                let needsUpdate = false;
                
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length || mutation.type === 'attributes') {
                        const gitSnippets = document.querySelectorAll('.filter-git');
                        if (gitSnippets.length > 0) {
                            needsUpdate = true;
                        }
                    }
                });
                
                if (needsUpdate) {
                    setTimeout(fixGitButtons, 50);
                }
            });
            
            // Configurar e iniciar o observer para detectar mudanças no DOM
            if (document.body) {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['class', 'style']
                });
            }
        } catch (e) {
            // Ignorar erros do MutationObserver
        }
    }
    
    // Adicionar setupDOMObservation ao evento DOMContentLoaded
    if (document.readyState !== 'loading') {
        setupDOMObservation();
    } else {
        document.addEventListener('DOMContentLoaded', setupDOMObservation);
    }
})();
