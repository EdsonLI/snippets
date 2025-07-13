/**
 * Script para recarregar os ícones coloridos
 * Este script força a atualização dos ícones tecnológicos para suas versões coloridas
 */
document.addEventListener('DOMContentLoaded', function() {
  console.info('🔄 Recarregando ícones tecnológicos com cores de branding...');
  
  // Remover atributo data-tech-processed de todos os badges para forçar reprocessamento
  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach(badge => {
    badge.removeAttribute('data-tech-processed');
    
    // Remover iconify-icon existentes para substituí-los
    const existingIcons = badge.querySelectorAll('iconify-icon');
    existingIcons.forEach(icon => {
      icon.remove();
    });
  });
  
  // Disparar evento customizado para notificar tech-badges.js para reprocessar
  setTimeout(() => {
    const event = new CustomEvent('reload-tech-badges');
    document.dispatchEvent(event);
    console.info('✅ Ícones tecnológicos recarregados com sucesso!');
  }, 100);
});
