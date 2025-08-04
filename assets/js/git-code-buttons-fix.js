/**
 * Script para corrigir os botões de cópia em TODOS os snippets de código
 * Versão melhorada que corrige o posicionamento dos botões e a centralização dos ícones
 */
$(document).ready(function() {
  /**
   * Função que corrige o posicionamento dos botões de cópia de código
   * para todos os tipos de snippets (git, php, etc.)
   */
  function fixAllCodeButtons() {
    // Selecionando todos os botões em qualquer snippet de código
    $('.position-relative button, .snippet-code button').each(function() {
      // Garantir que o botão está posicionado corretamente
      $(this).css({
        'position': 'absolute',
        'top': '5px',
        'right': '5px',
        'margin': '0',
        'z-index': '100',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'padding': '2px 6px',
        'min-width': '24px',
        'min-height': '24px'
      });
      
      // Corrigir a centralização do ícone dentro do botão
      const $icon = $(this).find('iconify-icon');
      if ($icon.length) {
        $icon.css({
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'margin': 'auto',
          'line-height': '1',
          'width': '100%',
          'height': '100%'
        });
      }
      
      // Garantir que o botão está dentro do bloco de código
      const $snippetCode = $(this).closest('.snippet-code');
      if ($snippetCode.length) {
        $snippetCode.css({
          'position': 'relative',
          'display': 'block'
        });
        
        // Ajustar o pre para ter espaço para o botão
        const $pre = $snippetCode.find('pre');
        if ($pre.length) {
          $pre.css({
            'position': 'relative',
            'padding-right': '35px',
            'margin-bottom': '0',
            'overflow': 'visible'
          });
        }
      }
      
      // Se o botão está no container position-relative, também ajustar
      const $posRelative = $(this).closest('.position-relative');
      if ($posRelative.length) {
        $posRelative.css({
          'position': 'relative',
          'display': 'block'
        });
      }
    });
    
    console.log('Botões de cópia corrigidos e ícones centralizados');
  }
  
  // Executar a correção quando o documento estiver pronto
  fixAllCodeButtons();
  
  // Executar novamente quando as imagens estiverem carregadas (pode afetar o layout)
  $(window).on('load', function() {
    setTimeout(fixAllCodeButtons, 100);
  });
  
  // Executar novamente se houver alguma mudança dinâmica na página
  $(document).on('DOMNodeInserted', '.snippet-code, .position-relative', function() {
    setTimeout(fixAllCodeButtons, 200);
  });
});
