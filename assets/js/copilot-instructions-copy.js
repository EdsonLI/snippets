/**
 * Script para gerenciar a cópia do conteúdo de instructions do Copilot 
 * formatado em HTML para texto simples
 */
$(document).ready(function() {
  $('.copy-instructions-btn').on('click', function() {
    const $btn = $(this);
    const targetId = $btn.attr('data-target-container');
    const $container = $('#' + targetId);
    
    if ($container.length) {
      // Extrair texto mantendo a formatação básica
      let text = '';
      
      // Cabeçalho
      text += '---\napplyTo: \'**\'\n---\n\n';
      
      // Para cada seção
      $container.find('h4').each(function() {
        // Adiciona o título da seção
        text += '## ' + $(this).text().trim() + '\n';
        
        // Adiciona os itens da lista
        const $list = $(this).next('ul');
        $list.find('li').each(function() {
          text += '- ' + $(this).text().trim() + '\n';
        });
        
        text += '\n'; // Espaço entre seções
      });
      
      // Copiar para a área de transferência
      navigator.clipboard.writeText(text.trim()).then(function() {
        $btn.addClass('copied');
        $btn.html('<i class="fa-solid fa-check"></i>');
        setTimeout(function() {
          $btn.removeClass('copied');
          $btn.html('<iconify-icon icon="mdi:content-copy" width="16" height="16"></iconify-icon>');
        }, 1200);
      });
    }
  });
});
