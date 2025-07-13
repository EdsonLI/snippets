/**
 * Correção específica para o ícone do Bootstrap
 * Torna o "B" no centro do logotipo branco
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para processar os ícones do Bootstrap
  function fixBootstrapIcons() {
    // Encontrar todos os iconify-icon dentro de tech-badge-bootstrap
    const bootstrapIcons = document.querySelectorAll('.tech-badge-bootstrap iconify-icon');
    
    bootstrapIcons.forEach(iconElement => {
      // Adicionar um evento para quando o SVG for carregado
      iconElement.addEventListener('load', () => {
        // Encontrar o SVG dentro do iconify-icon
        const svg = iconElement.querySelector('svg');
        
        if (svg) {
          // Encontrar o caminho que representa o "B" (geralmente é o segundo path ou o último)
          // Tentativa 1: último path
          let bPath = svg.querySelector('path:last-child');
          
          // Tentativa 2: segundo path
          if (!bPath) {
            const paths = svg.querySelectorAll('path');
            if (paths.length > 1) {
              bPath = paths[1];
            }
          }
          
          // Tentativa 3: dentro de algum grupo
          if (!bPath) {
            const nestedPaths = svg.querySelectorAll('g path');
            if (nestedPaths.length > 0) {
              bPath = nestedPaths[nestedPaths.length - 1];
            }
          }
          
          // Se encontrou algum caminho para o "B", torná-lo branco
          if (bPath) {
            bPath.style.fill = 'white';
            bPath.setAttribute('fill', 'white');
          } else {
            // Se nenhuma tentativa funcionou, aplicar a todos os caminhos 
            // (não ideal, mas garante que o B fique branco)
            const allPaths = svg.querySelectorAll('path');
            // Aplicar ao segundo path em diante (o primeiro é geralmente o fundo)
            for (let i = 1; i < allPaths.length; i++) {
              allPaths[i].style.fill = 'white';
              allPaths[i].setAttribute('fill', 'white');
            }
          }
        }
      });
    });
  }
  
  // Executar a função inicialmente
  fixBootstrapIcons();
  
  // Configurar observer para monitorar novas adições ao DOM
  const observer = new MutationObserver((mutations) => {
    let shouldFix = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Verificar se o nó é ou contém um badge do Bootstrap
            if ((node.classList && node.classList.contains('tech-badge-bootstrap')) || 
                (node.querySelector && node.querySelector('.tech-badge-bootstrap'))) {
              shouldFix = true;
            }
          }
        });
      }
    });
    
    if (shouldFix) {
      fixBootstrapIcons();
    }
  });
  
  // Iniciar a observação
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.info('✅ Bootstrap Icon Fix: Inicializado');
});
