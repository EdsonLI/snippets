/**
 * Script para garantir que o snippet do GitHub Copilot seja sempre exibido primeiro
 * Este script deve ser incluído após o carregamento dos snippets
 */
document.addEventListener('DOMContentLoaded', function() {
  // Esperar um momento para garantir que os snippets foram carregados
  setTimeout(function() {
    console.log('[Prioritize Copilot] Reordenando snippets...');
    
    // Encontrar o container de snippets
    const container = document.querySelector('.isotope-container');
    if (!container) {
      console.warn('[Prioritize Copilot] Container de snippets não encontrado');
      return;
    }
    
    // Encontrar o snippet do GitHub Copilot
    const copilotSnippet = document.querySelector('.portfolio-item.filter-copilot');
    if (!copilotSnippet) {
      console.warn('[Prioritize Copilot] Snippet do GitHub Copilot não encontrado');
      return;
    }
    
    // Mover para o início do container
    container.insertBefore(copilotSnippet, container.firstChild);
    console.log('[Prioritize Copilot] Snippet do GitHub Copilot movido para o início');
    
    // Reinicializar Isotope se necessário
    if (typeof Isotope !== 'undefined') {
      const iso = Isotope.data(container);
      if (iso) {
        // Reorganizar itens sem animação
        iso.arrange({
          transitionDuration: 0
        });
        console.log('[Prioritize Copilot] Isotope reorganizado');
        
        // Restaurar animação após reorganização
        setTimeout(() => {
          iso.options.transitionDuration = '0.4s';
          console.log('[Prioritize Copilot] Animação restaurada');
        }, 100);
      }
    }
  }, 500); // Aguardar 500ms para garantir que todos os snippets foram carregados
});
