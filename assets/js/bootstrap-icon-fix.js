/**
 * Correção específica para o ícone do Bootstrap
 * Força o ícone a ficar completamente branco
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para processar os ícones do Bootstrap
  function fixBootstrapIcons() {
    // Encontrar todos os iconify-icon dentro de tech-badge-bootstrap
    const bootstrapIcons = document.querySelectorAll('.tech-badge-bootstrap iconify-icon');
    
    bootstrapIcons.forEach(iconElement => {
      // Aplicar estilo diretamente ao elemento iconify-icon
      iconElement.style.color = 'white';
      
      // Aplicar fundo roxo do Bootstrap
      iconElement.style.backgroundColor = 'rgba(85, 35, 130, 0.9)';
      iconElement.style.borderRadius = '4px';
      iconElement.style.padding = '2px';
      
      // Forçar o tamanho correto
      iconElement.style.width = '18px';
      iconElement.style.height = '18px';
      
      // Adicionar evento para quando o SVG for carregado
      iconElement.addEventListener('load', () => {
        const svg = iconElement.querySelector('svg');
        if (svg) {
          // Aplicar cor branca a todos os elementos do SVG
          svg.style.fill = 'white';
          svg.style.color = 'white';
          
          // Aplicar também a todos os filhos
          const allElements = svg.querySelectorAll('*');
          allElements.forEach(el => {
            el.style.fill = 'white';
            el.style.stroke = 'white';
            el.setAttribute('fill', 'white');
          });
        }
      });
    });
  }
  
  // Executar a função inicialmente
  setTimeout(fixBootstrapIcons, 100);
  
  // Executar novamente após um tempo para garantir
  setTimeout(fixBootstrapIcons, 500);
  setTimeout(fixBootstrapIcons, 1000);
  
  // Configurar observer para monitorar novas adições ao DOM
  const observer = new MutationObserver(() => {
    fixBootstrapIcons();
  });
  
  // Iniciar a observação
  observer.observe(document.body, { childList: true, subtree: true });
});
