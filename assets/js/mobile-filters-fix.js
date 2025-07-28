/**
 * Script para melhorar a interatividade dos filtros em dispositivos móveis
 * 
 * Este script resolve problemas com filtros clicáveis em dispositivos móveis,
 * especialmente no Chrome para Android, onde os elementos <li> podem ser
 * interpretados como texto selecionável ao invés de elementos clicáveis
 */

(function() {
    // Função para melhorar os filtros para dispositivos móveis
    function enhanceMobileFilters() {
        // Selecionar todos os filtros da lista
        const filterItems = document.querySelectorAll('.portfolio-filters li, .isotope-filters li');
        
        // Para cada filtro, adicionar atributos que melhoram a interatividade móvel
        filterItems.forEach(function(item) {
            // Adicionar atributos ARIA para acessibilidade
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            
            // Garantir que o cursor seja pointer
            item.style.cursor = 'pointer';
            
            // Adicionar atributos de toque para dispositivos móveis
            item.setAttribute('touch-action', 'manipulation');
            
            // Garantir que o elemento seja tratado como interativo
            if (!item.getAttribute('data-mobile-enhanced')) {
                item.setAttribute('data-mobile-enhanced', 'true');
                
                // Adicionar eventos de teclado para acessibilidade
                item.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                });
                
                // Adicionar evento de toque específico para dispositivos móveis
                item.addEventListener('touchstart', function(e) {
                    // Não fazer nada especial aqui, só garantir que o evento é capturado
                }, { passive: true });
                
                // Prevenir seleção de texto durante cliques rápidos
                item.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    // Simular um clique se necessário (geralmente não é necessário)
                    // Isto é um backup caso o evento de clique não dispare automaticamente
                    setTimeout(() => item.click(), 10);
                });
            }
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
    
    // Em caso de carregamento dinâmico, verificar periodicamente
    const checkInterval = setInterval(function() {
        const filters = document.querySelectorAll('.portfolio-filters li, .isotope-filters li');
        if (filters.length > 0) {
            enhanceMobileFilters();
            clearInterval(checkInterval);
        }
    }, 1000); // Verificar a cada segundo até encontrar os filtros
    
    // Limitar o intervalo para não executar indefinidamente
    setTimeout(function() {
        clearInterval(checkInterval);
    }, 10000); // Parar de verificar após 10 segundos
})();
