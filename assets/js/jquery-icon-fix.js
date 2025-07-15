/* 
 * Fix específico para o ícone do jQuery
 * Este script garante que o ícone do jQuery seja exibido corretamente
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para corrigir os ícones do jQuery
  function fixJQueryIcons() {
    // Seleciona todos os badges do jQuery
    const jqueryBadges = document.querySelectorAll('.tech-badge-jquery, .id-tech-jquery');
    
    jqueryBadges.forEach(badge => {
      // Remove qualquer ícone existente que possa estar quebrado
      const existingIcons = badge.querySelectorAll('iconify-icon');
      existingIcons.forEach(icon => {
        icon.remove();
      });
      
      // Cria um novo elemento de ícone para o jQuery
      const iconElement = document.createElement('iconify-icon');
      iconElement.setAttribute('icon', 'logos:jquery');
      iconElement.style.verticalAlign = 'middle';
      iconElement.setAttribute('width', '20px');
      iconElement.setAttribute('height', '20px');
      
      // Adiciona o ícone no início do badge
      if (badge.firstChild) {
        badge.insertBefore(iconElement, badge.firstChild);
      } else {
        badge.appendChild(iconElement);
      }
      
      // Certifica-se de que o badge tem as classes corretas
      badge.classList.add('tech-badge', 'tech-badge-jquery');
      
      // Marca como processado
      badge.setAttribute('data-tech-processed', 'true');
    });
    
    console.info('✅ Ícones do jQuery corrigidos');
  }
  
  // Executa a correção após um pequeno delay para garantir que o DOM esteja pronto
  setTimeout(fixJQueryIcons, 300);
  
  // Adiciona um observador para detectar mudanças no DOM e aplicar a correção novamente
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        // Aplica a correção após um breve delay para dar tempo aos outros scripts
        setTimeout(fixJQueryIcons, 100);
      }
    });
  });
  
  // Observa mudanças no corpo do documento
  observer.observe(document.body, { childList: true, subtree: true });
});
