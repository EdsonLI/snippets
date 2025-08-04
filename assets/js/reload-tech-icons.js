/**
 * Script para recarregar os ícones coloridos
 * Este script força a atualização dos ícones tecnológicos para suas versões coloridas
 */
document.addEventListener('DOMContentLoaded', function() {
  
  function reloadIcons() {
    // Remover atributo data-tech-processed de todos os badges para forçar reprocessamento
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
      badge.removeAttribute('data-tech-processed');
      
      // Não mexer nos badges SQL - eles têm tratamento especial
      if (!badge.classList.contains('tech-badge-sql')) {
        // Para os outros badges, remover iconify-icon existentes para substituí-los
        const existingIcons = badge.querySelectorAll('iconify-icon');
        existingIcons.forEach(icon => {
          // Não remover se for parte do nosso ícone SQL customizado
          if (!icon.closest('.sql-icon-wrapper')) {
            icon.remove();
          }
        });
      }
    });
    
    // Disparar evento customizado para notificar tech-badges.js para reprocessar
    const event = new CustomEvent('reload-tech-badges');
    document.dispatchEvent(event);
  }
  
  // Recarregar ícones inicialmente
  setTimeout(reloadIcons, 100);
  
  // Recarregar novamente após um tempo para garantir que todos os ícones sejam atualizados
  setTimeout(reloadIcons, 500);
  setTimeout(reloadIcons, 1000);
});
