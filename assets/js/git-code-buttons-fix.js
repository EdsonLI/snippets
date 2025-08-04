/**
 * Script para carregar e aplicar o CSS de correção dos botões em snippets Git
 */
(function() {
    // Verifica se o CSS já foi carregado
    if (!document.querySelector('link[href*="git-code-buttons-fix.css"]')) {
        // Cria elemento link para o CSS
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = '/assets/css/git-code-buttons-fix.css';
        
        // Adiciona prioridade mais alta para sobrescrever outros estilos
        linkElement.setAttribute('data-priority', 'high');
        
        // Adiciona ao head do documento
        document.head.appendChild(linkElement);
        
        console.log('CSS de correção para botões Git carregado com sucesso!');
    }
    
    // Adiciona uma classe especial para identificação
    document.querySelectorAll('.filter-git .btn-custom iconify-icon').forEach(icon => {
        icon.classList.add('git-icon-fixed');
    });
})();
