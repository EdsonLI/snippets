/**
 * BOTÕES DE CÓPIA - VERSÃO SIMPLIFICADA E DIRETA
 * Funciona com qualquer botão que tenha um atributo data-target
 * 
 * @author Edson LI
 * @version 2.0.0 (Simplificado)
 */

$(document).ready(function() {
  console.log('[Botões de Cópia] Inicializando...');

  // Encontrar todos os botões com atributo data-target
  const $copyButtons = $('button[data-target]');
  console.log('[Botões de Cópia] Encontrados: ' + $copyButtons.length);

  // Remover todos os handlers antigos para evitar conflitos
  $copyButtons.off('click');

  // Adicionar o novo handler
  $copyButtons.on('click', function() {
    const $button = $(this);
    const targetId = $button.attr('data-target');
    const $codeElement = $('#' + targetId);

    if ($codeElement.length) {
      // Capturar o texto do elemento
      const textToCopy = $codeElement.text().trim();
      
      // Copiar para a área de transferência
      navigator.clipboard.writeText(textToCopy)
        .then(function() {
          // Salvar o ícone original
          const $icon = $button.find('iconify-icon');
          
          if ($icon.length) {
            const originalIcon = $icon.attr('icon') || 'mdi:content-copy';
            
            // Mostrar ícone de confirmação
            $icon.attr('icon', 'mdi:check');
            
            // Restaurar o ícone original após um delay
            setTimeout(function() {
              $icon.attr('icon', originalIcon);
            }, 1200);
          } else {
            // Feedback alternativo para botões sem ícone iconify
            const originalHtml = $button.html();
            $button.html('<i class="fa-solid fa-check"></i>');
            
            setTimeout(function() {
              $button.html(originalHtml);
            }, 1200);
          }
          
          console.log('[Botões de Cópia] Texto copiado de #' + targetId);
        })
        .catch(function(err) {
          console.error('[Botões de Cópia] Erro ao copiar:', err);
        });
    } else {
      console.error('[Botões de Cópia] Elemento alvo não encontrado: #' + targetId);
    }
  });

  console.log('[Botões de Cópia] Inicialização completa');
});
