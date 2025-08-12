/**
 * Script para ajustar o comportamento dos ícones verticais
 * Complemento para os estilos CSS que posicionam os ícones acima dos textos
 */
document.addEventListener('DOMContentLoaded', function() {
  // Para elementos que possam ser inseridos dinamicamente no futuro
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        adjustIconsDisplay();
      }
    });
  });

  // Configuração do observador
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Função inicial de ajuste
  adjustIconsDisplay();
  
  // Função para ajustar a exibição dos ícones
  function adjustIconsDisplay() {
    // Para os filtros - garantir que os ícones estão centralizados
    document.querySelectorAll('.portfolio-filters li[data-filter]').forEach(function(filter) {
      filter.style.textAlign = 'center';
    });
    
    // Para os títulos dos snippets - garantir estrutura vertical
    document.querySelectorAll('.portfolio-content h6 [class*="id-tech-"]').forEach(function(techLabel) {
      // Verifica se já está em formato vertical
      if (!techLabel.querySelector('[class$="-icon-wrapper"]')) {
        return;
      }
      
      // Garantir alinhamento centralizado
      techLabel.style.textAlign = 'center';
      techLabel.style.display = 'flex';
      techLabel.style.flexDirection = 'column';
      techLabel.style.alignItems = 'center';
    });
  }
});
