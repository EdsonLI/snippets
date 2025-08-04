/**
 * Script para corrigir o posicionamento dos botões nos snippets Git
 * Versão 2.0 - Totalmente reescrita para garantir posicionamento correto
 */
(function() {
    // Manipulação direta do DOM para garantir o posicionamento correto
    function fixGitButtons() {
        // Encontrar todos os botões de cópia de código em snippets Git
        const gitCopyButtons = document.querySelectorAll('.filter-git .position-relative .btn-custom.position-absolute');
        
        if (gitCopyButtons.length === 0) {
            console.log('Nenhum botão de Git encontrado para corrigir.');
            // Tentar novamente em 500ms (pode ser que o DOM ainda esteja carregando)
            setTimeout(fixGitButtons, 500);
            return;
        }
        
        console.log(`Corrigindo ${gitCopyButtons.length} botões de Git...`);
        
        // Aplicar correções para cada botão
        gitCopyButtons.forEach(button => {
            // Remover todas as margens
            button.style.margin = '0';
            
            // Garantir posicionamento absoluto correto
            button.style.position = 'absolute';
            button.style.top = '1px';
            button.style.right = '1px';
            button.style.zIndex = '999';
            
            // Estilização visual do botão
            button.style.width = '24px';
            button.style.height = '24px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.padding = '0';
            button.style.backgroundColor = '#212529';
            button.style.color = '#0dcaf0';
            button.style.border = '1px solid #495057';
            button.style.borderRight = 'none';
            button.style.borderBottom = 'none';
            button.style.borderTopLeftRadius = '3px';
            button.style.borderTopRightRadius = '0';
            button.style.borderBottomRightRadius = '0';
            button.style.borderBottomLeftRadius = '0';
            
            // Corrigir o ícone dentro do botão
            const icon = button.querySelector('iconify-icon');
            if (icon) {
                icon.style.width = '16px';
                icon.style.height = '16px';
                icon.style.display = 'flex';
                icon.style.alignItems = 'center';
                icon.style.justifyContent = 'center';
                icon.style.margin = '0';
                icon.style.padding = '0';
                icon.style.position = 'static';
                icon.style.transform = 'none';
            }
            
            // Ajustar o bloco de código pai
            const parentDiv = button.closest('.position-relative');
            if (parentDiv) {
                const preElement = parentDiv.querySelector('pre');
                if (preElement) {
                    preElement.style.paddingTop = '0.5rem';
                    preElement.style.paddingRight = '30px';
                    preElement.style.marginTop = '0';
                    preElement.style.border = '1px solid #495057';
                    preElement.style.borderRadius = '0.25rem';
                    preElement.style.position = 'relative';
                }
            }
        });
        
        // Adicionar CSS global para garantir comportamento consistente
        const globalCSS = `
            .filter-git .position-relative .btn-custom.position-absolute {
                margin: 0 !important;
                top: 1px !important;
                right: 1px !important;
                width: 24px !important;
                height: 24px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 !important;
                z-index: 999 !important;
                background-color: #212529 !important;
                color: #0dcaf0 !important;
                border: 1px solid #495057 !important;
                border-right: none !important;
                border-bottom: none !important;
                border-top-left-radius: 3px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
            }
            
            .filter-git .position-relative .btn-custom.position-absolute iconify-icon {
                width: 16px !important;
                height: 16px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 0 !important;
                padding: 0 !important;
                position: static !important;
                transform: none !important;
            }
            
            .filter-git .position-relative .btn-custom.position-absolute:hover {
                background-color: #0dcaf0 !important;
                color: #212529 !important;
            }
            
            .filter-git .position-relative .btn-custom.position-absolute:hover iconify-icon {
                color: #212529 !important;
            }
            
            .filter-git .position-relative pre.git-pre-code {
                padding-right: 30px !important;
                margin-top: 0 !important;
            }
            
            /* Desativar completamente a classe m-1 nos botões de Git */
            .filter-git .btn-custom.position-absolute.m-1 {
                margin: 0 !important;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(globalCSS));
        document.head.appendChild(styleElement);
        
        console.log('Correção para botões Git aplicada com sucesso!');
    }
    
    // Executar imediatamente
    fixGitButtons();
    
    // Executar novamente após o carregamento completo da página
    window.addEventListener('load', fixGitButtons);
    
    // Verificar várias vezes nos primeiros segundos
    let checkCount = 0;
    const intervalId = setInterval(() => {
        fixGitButtons();
        checkCount++;
        if (checkCount >= 5) {
            clearInterval(intervalId);
        }
    }, 1000);
    
    // Adicionar um observador de mutação para detectar quando novos botões são adicionados
    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                fixGitButtons();
                break;
            }
        }
    });
    
    // Iniciar a observação do DOM
    observer.observe(document.body, { childList: true, subtree: true });
})();
