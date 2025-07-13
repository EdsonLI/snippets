/**
 * Script específico para corrigir o ícone do SQL
 */
document.addEventListener('DOMContentLoaded', function() {
  // Aguardar um momento para garantir que outros scripts já foram carregados
  setTimeout(function() {
    console.info('🔄 Aplicando correção específica para o ícone SQL...');
    
    // Encontrar todos os badges SQL
    const sqlBadges = document.querySelectorAll('.tech-badge-sql');
    
    sqlBadges.forEach(badge => {
      // Verificar se já tem um iconify-icon
      let iconElement = badge.querySelector('iconify-icon');
      
      // Se não tiver ícone ou o ícone estiver com problema, criar um novo
      if (!iconElement || !iconElement.querySelector('svg')) {
        // Remover iconify-icon existente se houver
        if (iconElement) {
          iconElement.remove();
        }
        
        // Criar novo elemento
        iconElement = document.createElement('iconify-icon');
        
        // Configurar o ícone - tentando outras opções se a primeira não funcionar
        const iconOptions = [
          'simple-icons:mysql',
          'vscode-icons:file-type-sql',
          'carbon:sql',
          'mdi:database'
        ];
        
        // Tentar o primeiro ícone
        iconElement.setAttribute('icon', iconOptions[0]);
        
        // Configurar propriedades visuais
        iconElement.style.backgroundColor = '#00618a';
        iconElement.style.borderRadius = '4px';
        iconElement.style.color = 'white';
        iconElement.style.width = '20px';
        iconElement.style.height = '20px';
        iconElement.style.display = 'inline-flex';
        iconElement.style.alignItems = 'center';
        iconElement.style.justifyContent = 'center';
        
        // Evento para verificar se o ícone carregou e tentar alternativas se necessário
        let iconTryIndex = 0;
        iconElement.addEventListener('error', function() {
          iconTryIndex++;
          if (iconTryIndex < iconOptions.length) {
            console.info(`Tentando ícone alternativo para SQL: ${iconOptions[iconTryIndex]}`);
            iconElement.setAttribute('icon', iconOptions[iconTryIndex]);
          } else {
            // Se nenhum ícone funcionar, usar texto como fallback
            iconElement.innerHTML = '<span style="font-size:9px; font-weight:bold; color:white;">SQL</span>';
          }
        });
        
        // Inserir o ícone no início do badge
        badge.insertBefore(iconElement, badge.firstChild);
      }
    });
    
    console.info('✅ Correção para ícone SQL aplicada');
  }, 500);
});
