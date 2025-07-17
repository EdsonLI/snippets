/**
 * Script específico para corrigir o ícone do SQL
 * Versão atualizada: Usa SVG personalizado
 */
document.addEventListener('DOMContentLoaded', function() {
  // Aguardar um momento para garantir que outros scripts já foram carregados
  setTimeout(function() {
    console.info('🔄 Aplicando SVG personalizado para o ícone SQL...');
    
    // Encontrar todos os badges SQL
    const sqlBadges = document.querySelectorAll('.tech-badge-sql');
    
    // Aplicando a classe que ativa o SVG personalizado via CSS
    // O SVG já está definido no arquivo sql-icon-custom.css
    sqlBadges.forEach(badge => {
      // Verificar se já tem um iconify-icon
      let iconElement = badge.querySelector('iconify-icon');
      
      // Adicionar classe especial para identificação do SQL
      badge.classList.add('has-custom-sql-icon');
      
      // Se houver um elemento iconify existente, podemos escondê-lo
      // o CSS vai se encarregar de mostrar nosso SVG personalizado
      if (iconElement) {
        // Vamos mantê-lo mas aplicar display:none via CSS
        console.info('Substituindo iconify por SVG personalizado para SQL');
      }
    });
    
    console.info('✅ SVG personalizado para SQL aplicado');
  }, 500);
});
