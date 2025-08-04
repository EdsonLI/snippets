/**
 * Script para correção específica dos botões em snippets Git
 * Corrige posicionamento e funcionalidade dos botões de cópia
 */
$(document).ready(function() {
  // Remove o botão de cópia redundante no h6 dos snippets Git
  $('.filter-git h6 .snippet-actions-float button[data-target^="snippet-git"]').hide();
  $('.filter-git h6 .snippet-actions-float button[data-target^="snippet_git"]').hide();

  // Função para corrigir os botões de cópia nos snippets Git
  function fixGitSnippetButtons() {
    // Seleciona todos os botões de cópia em snippets Git
    $('.filter-git .position-relative button.btn-xs.btn-outline-info').each(function() {
      // Corrige posicionamento do botão
      $(this).css({
        'position': 'absolute',
        'top': '3px',
        'right': '3px',
        'margin': '0',
        'padding': '2px 4px',
        'z-index': '1000',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'height': '24px',
        'width': '24px',
        'box-sizing': 'content-box',
        'transform': 'none'
      });
      
      // Corrige centralização do ícone
      $(this).find('iconify-icon').css({
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'width': '100%',
        'height': '100%',
        'margin': 'auto'
      });
      
      // Garantir que o onclick funciona
      const $button = $(this);
      $button.off('click').on('click', function() {
        try {
          const $pre = $(this).closest('.position-relative').find('pre');
          const $code = $pre.find('code');
          const textToCopy = $code.text().trim();
          
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              // Feedback visual
              const $icon = $(this).find('iconify-icon');
              const originalIcon = $icon.attr('icon') || 'mdi:content-copy';
              
              $icon.attr('icon', 'mdi:check');
              setTimeout(() => {
                $icon.attr('icon', originalIcon);
              }, 1500);
            })
            .catch(err => {
              console.error('Erro ao copiar: ', err);
            });
        } catch(err) {
          console.error('Erro ao processar cópia: ', err);
        }
        
        return false; // Previne propagação
      });
      
      // Ajustar o container para posicionamento correto
      const $parent = $(this).closest('.position-relative');
      if ($parent.length) {
        $parent.css({
          'position': 'relative',
          'display': 'block',
          'margin-bottom': '4px'
        });
        
        // Garantir espaço no pre para o botão
        const $pre = $parent.find('pre');
        if ($pre.length) {
          $pre.css({
            'position': 'relative',
            'padding-right': '30px',
            'margin-bottom': '0',
            'overflow': 'visible'
          });
        }
      }
    });
  }
  
  // Executa a correção
  fixGitSnippetButtons();
  
  // Re-executa quando DOM mudar
  $(document).on('DOMNodeInserted', '.filter-git', function() {
    setTimeout(fixGitSnippetButtons, 200);
  });
});
