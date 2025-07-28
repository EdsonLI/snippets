/**
 * Script simplificado para melhorar a interatividade dos filtros em dispositivos móveis
 * 
 * Este script resolve problemas com filtros clicáveis em dispositivos móveis,
 * especialmente no Chrome para Android, onde os elementos <li> podem ser
 * interpretados como texto selecionável ao invés de elementos clicáveis
 */

(function() {
    // Função simplificada para melhorar os filtros para dispositivos móveis
    function enhanceMobileFilters() {
        // Selecionar todos os filtros da lista
        const filterItems = document.querySelectorAll('.portfolio-filters li, .isotope-filters li');
        
        // Para cada filtro, adicionar atributos que melhoram a interatividade móvel
        filterItems.forEach(function(item) {
            // Adicionar atributos ARIA para acessibilidade
            item.setAttribute('role', 'button');
            
            // Garantir que o cursor seja pointer
            item.style.cursor = 'pointer';
            
            // Adicionar atributos de toque para dispositivos móveis
            item.setAttribute('touch-action', 'manipulation');
            
            // Prevenir seleção de texto durante cliques
            item.addEventListener('touchstart', function(e) {
                // Evitar seleção de texto
                e.preventDefault();
            }, { passive: false });
        });
    }

    // Executar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        enhanceMobileFilters();
    });
    
    // Executar sempre que os filtros forem atualizados dinamicamente
    document.addEventListener('isotope-filters-added', function() {
        enhanceMobileFilters();
    });
    
    // Garantir que a função seja executada quando os filtros forem criados
    if (typeof jQuery !== 'undefined') {
        jQuery(document).on('snippets-loaded', function() {
            enhanceMobileFilters();
        });
    }
    
    // Verificar periodicamente se há novos filtros (para carregamento dinâmico)
    setInterval(function() {
        enhanceMobileFilters();
    }, 2000); // Verificar a cada 2 segundos
})();
