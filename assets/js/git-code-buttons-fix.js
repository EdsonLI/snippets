/**
 * CORREÇÃO DIRETA para os botões de código nos snippets Git
 * Ajusta botões e ícones independentemente do CSS
 */
(function() {
  // Adiciona estilos diretamente no head para máxima prioridade
  function addDirectStyles() {
    // Criar estilo inline com alta especificidade
    const style = document.createElement('style');
    style.id = 'git-button-direct-fixes';
    style.innerHTML = `
      /* Estilos diretos com alta prioridade para botões Git */
      .filter-git .position-absolute.top-0.end-0.m-1 {
        top: 5px !important;
        right: 5px !important;
        position: absolute !important;
        margin: 0 !important;
        padding: 2px 6px !important;
        z-index: 99 !important;
      }
      
      /* Contenedor relativo para posicionar o botão corretamente */
      .filter-git .position-relative {
        position: relative !important;
        display: block !important;
        margin-bottom: 10px !important;
      }
      
      /* Preparando o pre-code para o botão */
      .filter-git .position-relative pre {
        position: relative !important;
        padding-right: 35px !important;
        margin-bottom: 0 !important;
      }
      
      /* Alinhamento forçado para o ícone */
      .filter-git .btn-custom iconify-icon {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        vertical-align: middle !important;
        margin: auto !important;
        line-height: 1 !important;
      }
    `;
    
    // Adicionar ao head com alta prioridade
    document.head.appendChild(style);
    console.log('Estilos diretos aplicados para correção dos botões Git');
  }
  
  // Conserta posicionamento diretamente via JavaScript
  function fixGitButtonsDirectly() {
    // Seleciona todos os botões problemáticos
    const gitButtons = document.querySelectorAll('.filter-git .position-absolute.top-0.end-0.m-1');
    
    gitButtons.forEach(button => {
      // Força posicionamento e estilo correto
      button.style.position = 'absolute';
      button.style.top = '5px';
      button.style.right = '5px';
      button.style.margin = '0';
      button.style.zIndex = '99';
      
      // Corrige o ícone
      const icon = button.querySelector('iconify-icon');
      if (icon) {
        icon.style.display = 'inline-flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.margin = 'auto';
      }
      
      // Garante que o container pai é relative
      const parentDiv = button.closest('.position-relative');
      if (parentDiv) {
        parentDiv.style.position = 'relative';
        parentDiv.style.display = 'block';
        parentDiv.style.marginBottom = '10px';
        
        // Ajusta espaço para o botão no pre
        const pre = parentDiv.querySelector('pre');
        if (pre) {
          pre.style.position = 'relative';
          pre.style.paddingRight = '35px';
          pre.style.marginBottom = '0';
        }
      }
    });
    
    console.log(`Corrigidos ${gitButtons.length} botões Git diretamente via JavaScript`);
  }
  
  // Adiciona o CSS e corrige diretamente
  function applyAllFixes() {
    // Adiciona CSS global
    addDirectStyles();
    
    // Força correção direta via JS para garantir
    fixGitButtonsDirectly();
    
    // Configura um observador para ajustar botões adicionados dinamicamente
    setupObserver();
  }
  
  // Observador para aplicar correções em elementos adicionados dinamicamente
  function setupObserver() {
    // Criar um observador para monitorar mudanças no DOM
    const observer = new MutationObserver(mutations => {
      // Verifica se há elementos .filter-git adicionados
      const hasGitItems = mutations.some(mutation => {
        if (mutation.addedNodes.length) {
          return Array.from(mutation.addedNodes).some(node => {
            return node.classList && 
                  (node.classList.contains('filter-git') || 
                   node.querySelector && node.querySelector('.filter-git'));
          });
        }
        return false;
      });
      
      // Se houver, aplicar novamente as correções
      if (hasGitItems) {
        console.log('Novos elementos Git detectados, reaplicando correções...');
        fixGitButtonsDirectly();
      }
    });
    
    // Configurar o observador para todo o documento
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
  }
  
  // Executar quando o documento estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllFixes);
  } else {
    applyAllFixes();
  }
  
  // Garante que as correções são aplicadas após a inicialização do Isotope
  window.addEventListener('load', () => {
    setTimeout(fixGitButtonsDirectly, 1000);
  });
})();
