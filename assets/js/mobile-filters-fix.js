/**
 * Script para melhorar a interatividade dos filtros em dispositivos móveis
 * 
 * Esta versão apenas aprimora os elementos <li> existentes em vez de substituí-los,
 * preservando a compatibilidade com o Isotope
 */

(function() {
    // Função para tratar eventos de toque
    function handleTouchEnd(e) {
        // Prevenir comportamento padrão que seleciona texto
        e.preventDefault();
        
        // Obter o filtro
        const filterValue = this.getAttribute('data-filter');
        
        // Remover classe active de todos os itens
        const allFilters = this.parentNode.querySelectorAll('li');
        allFilters.forEach(item => item.classList.remove('filter-active'));
        
        // Adicionar classe active a este item
        this.classList.add('filter-active');
        

        // Acionar isotope manualmente se necessário (força atualização via trigger)
        if (typeof jQuery !== 'undefined' && jQuery.fn.isotope) {
            var $container = jQuery('.isotope-container');
            if ($container.data('isotope')) {
                $container.isotope('arrange', { filter: filterValue });
                $container.trigger('isotope-filtered', [filterValue]);
            } else {
                alert('Isotope NÃO está inicializado! O carregamento dos snippets precisa inicializar o Isotope.');
            }
        }
        
        console.log('Filtro ativado via touch:', filterValue);
    }
    
    // Função que melhora os filtros existentes sem substituí-los
    function enhanceMobileFilters() {
        console.log('[Mobile Fix] Melhorando filtros para mobile...');
        
        // Selecionar todos os filtros
        const filterItems = document.querySelectorAll('.portfolio-filters li, .isotope-filters li');
        
        // Para cada filtro, adicionar melhorias de interatividade
        filterItems.forEach(function(item) {
            // Pular se já foi melhorado
            if (item.getAttribute('data-enhanced') === 'true') {
                return;
            }
            
            try {
                // Adicionar atributos para melhorar acessibilidade e interação
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.style.cursor = 'pointer';
                
                // Importante para dispositivos móveis
                item.style.webkitTapHighlightColor = 'rgba(0,0,0,0.1)';
                item.style.webkitUserSelect = 'none';
                item.style.userSelect = 'none';
                item.style.touchAction = 'manipulation';
                
                // Aumentar área de clique adicionando padding se necessário
                if (window.getComputedStyle(item).padding === '0px') {
                    item.style.padding = '8px';
                }
                

                // Adicionar listeners de evento para click e touch, sem duplicar
                if (!item.hasAttribute('data-isotope-event')) {
                    item.addEventListener('click', handleTouchEnd);
                    item.addEventListener('touchend', function(e) {
                        e.preventDefault();
                        handleTouchEnd.call(this, e);
                    });
                    item.setAttribute('data-isotope-event', 'true');
                }
                
                // Marcar como melhorado
                item.setAttribute('data-enhanced', 'true');
                
                console.log('Filtro melhorado para mobile:', item.textContent);
            } catch (error) {
                console.error('Erro ao melhorar filtro:', error);
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
    // Inicializar Isotope após carregamento dos snippets
    if (typeof jQuery !== 'undefined') {
        jQuery(document).on('snippets-loaded', function() {
            var $container = jQuery('.isotope-container');
            if ($container.length && !$container.data('isotope')) {
                $container.isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: 'masonry'
                });
            }
            enhanceMobileFilters();
        });
    }
})();
