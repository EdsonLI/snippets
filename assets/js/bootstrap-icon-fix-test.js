/**
 * Script para testar e corrigir o formato dos ícones Bootstrap
 * Este script verifica todos os ícones Bootstrap na página e garante que tenham formato circular
 */
document.addEventListener('DOMContentLoaded', function() {
  console.info('🔄 Verificando e corrigindo ícones Bootstrap...');
  
  function fixBootstrapIcons() {
    // Encontrar todos os ícones Bootstrap na página
    const bootstrapIcons = document.querySelectorAll('.bootstrap-icon, .tech-badge-bootstrap iconify-icon, .id-tech-bootstrap iconify-icon');
    
    // Verificar e corrigir cada ícone
    bootstrapIcons.forEach(icon => {
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
      
      console.info('✅ Ícone Bootstrap corrigido:', icon);
    });
  }
  
  // Corrigir ícones inicialmente
  setTimeout(fixBootstrapIcons, 100);
  
  // Corrigir novamente após o carregamento completo
  window.addEventListener('load', () => {
    setTimeout(fixBootstrapIcons, 500);
  });
  
  // Reexecutar a correção quando outros scripts recarregarem ícones
  document.addEventListener('reload-tech-badges', function() {
    console.info('🔄 Reprocessando ícones Bootstrap após evento de recarga...');
    setTimeout(fixBootstrapIcons, 100);
  });
});
