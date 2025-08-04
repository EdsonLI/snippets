/**
 * Script para incluir automaticamente as correções de CSS dos botões Git
 * em todos os snippets da categoria Git
 */
(function() {
  // Verifica se estamos em um snippet Git
  function isGitSnippet() {
    return document.querySelector('.isotope-item.filter-git') !== null;
  }
  
  // Adiciona o CSS de correção se for um snippet Git
  function addGitButtonFixes() {
    if (!isGitSnippet()) return;
    
    // Verifica se o CSS já está carregado
    if (document.querySelector('link[href*="git-code-buttons-fix.css"]')) return;
    
    // Cria o elemento link para o CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = './assets/css/git-code-buttons-fix.css';
    
    // Adiciona ao head
    document.head.appendChild(linkElement);
    
    console.log('Git code button fixes CSS loaded');
  }
  
  // Executa quando o DOM estiver carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGitButtonFixes);
  } else {
    addGitButtonFixes();
  }
})();
