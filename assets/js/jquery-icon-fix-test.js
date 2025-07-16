/**
 * Script para testar e corrigir o formato dos ícones jQuery
 * Este script verifica todos os ícones jQuery na página e garante que tenham formato circular
 */
document.addEventListener('DOMContentLoaded', function() {
  console.info('🔄 Verificando e corrigindo ícones jQuery...');
  
  function fixJQueryIcons() {
    // Encontrar todos os ícones jQuery na página
    const jqueryIcons = document.querySelectorAll('.jquery-icon, .tech-badge-jquery iconify-icon, .id-tech-jquery iconify-icon');
    
    // Verificar e corrigir cada ícone
    jqueryIcons.forEach(icon => {
      // Garantir que o ícone tenha formato circular
      icon.style.width = '20px';
      icon.style.height = '20px';
      icon.style.aspectRatio = '1/1';
      icon.style.borderRadius = '50%';
      
      // Procurar por SVGs dentro do ícone
      const svg = icon.querySelector('svg');
      if (svg) {
        svg.style.width = '16px';
        svg.style.height = '16px';
        svg.style.aspectRatio = '1/1';
        svg.style.position = 'absolute';
        svg.style.top = '50%';
        svg.style.left = '50%';
        svg.style.transform = 'translate(-50%, -50%)';
      }
      
      console.info('✅ Ícone jQuery corrigido:', icon);
    });
  }
  
  // Corrigir ícones inicialmente
  setTimeout(fixJQueryIcons, 100);
  
  // Corrigir novamente após o carregamento completo
  window.addEventListener('load', () => {
    setTimeout(fixJQueryIcons, 500);
  });
  
  // Reexecutar a correção quando outros scripts recarregarem ícones
  document.addEventListener('reload-tech-badges', function() {
    console.info('🔄 Reprocessando ícones jQuery após evento de recarga...');
    setTimeout(fixJQueryIcons, 100);
  });
});
