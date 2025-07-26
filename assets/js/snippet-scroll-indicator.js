/**
 * Detecta snippets que precisam de rolagem e adiciona um indicador visual
 * 
 * @author Edson LI - GitHub Copilot
 * @version 1.0.0 (jQuery)
 */
$(document).ready(function() {
  // Função para verificar quais snippets precisam de rolagem
  function detectScrollableSnippets() {
    // Selecionar todos os blocos de código em snippets Git e AI
    const $snippetCodeBlocks = $('.filter-git .snippet-code, .filter-ai .snippet-code');
    
    // Para cada bloco, verificar se precisa de rolagem
    $snippetCodeBlocks.each(function() {
      const $block = $(this);
      if ($block[0].scrollHeight > $block[0].clientHeight) {
        // O conteúdo é maior que a área visível, precisa de rolagem
        $block.addClass('needs-scroll');
      } else {
        // Não precisa de rolagem
        $block.removeClass('needs-scroll');
      }
    });
  }
  
  // Verificar após o carregamento inicial e quando o isotope é filtrado
  function setupScrollDetection() {
    // Verificação inicial após um pequeno delay para garantir que tudo esteja renderizado
    setTimeout(detectScrollableSnippets, 500);
    
    // Verificar novamente quando os filtros Isotope forem acionados
    $('.isotope-filters li').on('click', function() {
      setTimeout(detectScrollableSnippets, 400); // Delay para permitir que o filtro seja aplicado
    });
    
    // Verificar novamente em caso de redimensionamento da janela
    $(window).on('resize', function() {
      setTimeout(detectScrollableSnippets, 200);
    });
    
    // Configurar evento de rolagem para ocultar o indicador durante a rolagem
    $('.filter-git .snippet-code, .filter-ai .snippet-code').on('scroll', function() {
      // Se o usuário estiver rolando, não precisamos do indicador
      const $this = $(this);
      $this.addClass('is-scrolling');
      
      // Remover a classe após a rolagem terminar
      clearTimeout($this.data('scrollTimer'));
      const timer = setTimeout(function() {
        $this.removeClass('is-scrolling');
      }, 1000);
      $this.data('scrollTimer', timer);
    });
  }
  
  // Esperar um pouco para que o Isotope e os snippets sejam carregados
  setTimeout(setupScrollDetection, 1000);
  
  // Adicionar uma função global para redetectar, útil para quando novos snippets são carregados
  window.refreshScrollIndicators = detectScrollableSnippets;
});
