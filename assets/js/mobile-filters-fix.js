/**
 * Script simplificado para melhorar a interatividade dos filtros em dispositivos móveis
 * 
 * Este script resolve problemas com filtros clicáveis em dispositivos móveis,
 * especialmente no Chrome para Android, onde os elementos <li> podem ser
 * interpretados como texto selecionável ao invés de elementos clicáveis
 */

(function() {
    // Função para tratar eventos de toque
    function handleTouchEnd(e) {
        // Prevenir comportamento padrão que seleciona texto
        e.preventDefault();
        
        // Simular um clique neste elemento
        setTimeout(() => {
            this.click();
        }, 10);
    }
    
    // Adicionar fallback para eventos de clique
    function handleClickFallback(e) {
        console.log('Fallback click triggered for:', this);
        this.click();
    }

    // Função radical para transformar li em botões reais
    function enhanceMobileFilters() {
        // Selecionar todos os filtros da lista
        const filterItems = document.querySelectorAll('.portfolio-filters li, .isotope-filters li');
        
        // Adicionar logs para depuração
        console.log('Transformando filtros em botões reais...');

        // Para cada filtro, transformar em um botão real se ainda não foi transformado
        filterItems.forEach(function(item) {
            // Pular se já foi transformado em botão
            if (item.getAttribute('data-transformed') === 'true') {
                return;
            }
            
            try {
                // Salvar o texto e atributos do li original
                const text = item.textContent;
                const filter = item.getAttribute('data-filter');
                const isActive = item.classList.contains('filter-active');
                const classes = item.className;
                
                // Criar um botão real
                const button = document.createElement('button');
                button.textContent = text;
                button.className = classes;
                if (filter) button.setAttribute('data-filter', filter);
                
                // Estilizar o botão para parecer com o li
                button.style.background = 'transparent';
                button.style.border = 'none';
                button.style.padding = '5px 10px';
                button.style.margin = '0';
                button.style.font = 'inherit';
                button.style.color = 'inherit';
                button.style.cursor = 'pointer';
                button.style.display = 'inline-block';
                
                // Marcar como transformado
                button.setAttribute('data-transformed', 'true');
                
                // Substituir o li pelo botão
                if (item.parentNode) {
                    item.parentNode.replaceChild(button, item);
                    console.log('Li transformado em botão:', text);
                }
            } catch (error) {
                console.error('Erro ao transformar filtro em botão:', error);
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
    
    // Verificar periodicamente se há novos filtros (para carregamento dinâmico)
    setInterval(function() {
        enhanceMobileFilters();
    }, 2000); // Verificar a cada 2 segundos
})();
