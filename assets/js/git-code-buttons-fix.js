/**
 * Script para corrigir os botões de cópia nos snippets Git
 * Corrige o posicionamento dos botões dentro dos blocos de código
 */
$(document).ready(function() {
  /**
   * Função que corrige o posicionamento dos botões de cópia de código
   * dentro dos snippets de Git
   */
  function fixGitCodeButtons() {
    // Selecionando todos os botões dentro de pre code em snippets Git
    $('.filter-git .position-relative button').each(function() {
      // Garantir que o botão está posicionado corretamente
      $(this).css({
        'position': 'absolute',
        'top': '4px',
        'right': '4px',
        'margin': '0',
        'z-index': '10',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'padding': '2px 5px'
      });
      
      // Corrigir o ícone dentro do botão
      $(this).find('iconify-icon').css({
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'margin': 'auto'
      });
      
      // Garantir que o container pai seja relativo
      const $parent = $(this).closest('.position-relative');
      if ($parent.length) {
        $parent.css({
          'position': 'relative',
          'display': 'block'
        });
        
        // Ajustar o pre para ter espaço para o botão
        const $pre = $parent.find('pre');
        if ($pre.length) {
          $pre.css({
            'position': 'relative',
            'padding-right': '35px',
            'margin-bottom': '4px'
          });
        }
      }
    });
  }
  
  // Executar a correção quando o documento estiver pronto
  fixGitCodeButtons();
  
  // Executar novamente se houver alguma mudança dinâmica na página
  $(document).on('DOMNodeInserted', '.filter-git', function() {
    setTimeout(fixGitCodeButtons, 200);
  });
});
