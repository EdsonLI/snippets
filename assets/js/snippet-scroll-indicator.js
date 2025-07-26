/**
 * Detecta snippets que precisam de rolagem e adiciona um indicador visual
 * 
 * @author Edson LI - GitHub Copilot
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para verificar quais snippets precisam de rolagem
  function detectScrollableSnippets() {
    // Selecionar todos os blocos de código em snippets Git e AI
    const snippetCodeBlocks = document.querySelectorAll('.filter-git .snippet-code, .filter-ai .snippet-code');
    
    // Para cada bloco, verificar se precisa de rolagem
    snippetCodeBlocks.forEach(block => {
      if (block.scrollHeight > block.clientHeight) {
        // O conteúdo é maior que a área visível, precisa de rolagem
        block.classList.add('needs-scroll');
      } else {
        // Não precisa de rolagem
        block.classList.remove('needs-scroll');
      }
    });
  }
  
  // Verificar após o carregamento inicial e quando o isotope é filtrado
  function setupScrollDetection() {
    // Verificação inicial após um pequeno delay para garantir que tudo esteja renderizado
    setTimeout(detectScrollableSnippets, 500);
    
    // Verificar novamente quando os filtros Isotope forem acionados
    document.querySelectorAll('.isotope-filters li').forEach(filter => {
      filter.addEventListener('click', () => {
        setTimeout(detectScrollableSnippets, 400); // Delay para permitir que o filtro seja aplicado
      });
    });
    
    // Verificar novamente em caso de redimensionamento da janela
    window.addEventListener('resize', () => {
      setTimeout(detectScrollableSnippets, 200);
    });
    
    // Configurar evento de rolagem para ocultar o indicador durante a rolagem
    document.querySelectorAll('.filter-git .snippet-code, .filter-ai .snippet-code').forEach(block => {
      block.addEventListener('scroll', function() {
        // Se o usuário estiver rolando, não precisamos do indicador
        this.classList.add('is-scrolling');
        
        // Remover a classe após a rolagem terminar
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
          this.classList.remove('is-scrolling');
        }, 1000);
      });
    });
  }
  
  // Esperar um pouco para que o Isotope e os snippets sejam carregados
  setTimeout(setupScrollDetection, 1000);
  
  // Adicionar uma função global para redetectar, útil para quando novos snippets são carregados
  window.refreshScrollIndicators = detectScrollableSnippets;
});
