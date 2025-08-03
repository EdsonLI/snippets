/**
 * Formatador de texto para os filtros
 * Ajusta a capitalização dos nomes de tecnologias nos filtros
 */
$(document).ready(function() {
    // Mapeamento dos textos para formatação correta
    const textFormatMap = {
        'sweetalert2': 'SweetAlert2',
        'git': 'git', // Minúsculas conforme solicitado
        'jquery': 'jQuery',
        'madbuilder': 'MadBuilder',
        'w3schools': 'W3Schools',
        'ai': 'IA', // Mudança de AI para IA
        'css': 'CSS',
        'php': 'PHP',
        'sql': 'SQL'
    };

    // Função para ajustar os textos dos filtros
    function fixFilterText() {
        // Seleciona todos os filtros no container
        $('#dynamic-snippets-filters li[data-filter]').each(function() {
            const $filter = $(this);
            const filterValue = $filter.attr('data-filter');
            
            // Pula o filtro "All"
            if (filterValue === '*') return;
            
            // Extrai o nome da tecnologia da string do filtro
            const techName = filterValue.replace('.filter-', '').toLowerCase();
            
            // Se houver uma formatação específica para esta tecnologia
            if (textFormatMap[techName]) {
                $filter.text(textFormatMap[techName]);
                console.info(`Filtro ajustado: ${techName} -> ${textFormatMap[techName]}`);
            }
        });
    }

    // Executa a função quando a página é carregada
    fixFilterText();

    // Executa também após um pequeno delay para garantir que filtros dinâmicos sejam processados
    setTimeout(fixFilterText, 500);
    setTimeout(fixFilterText, 1500);

    // Observa mudanças no container de filtros para ajustar filtros adicionados dinamicamente
    const observer = new MutationObserver(function(mutations) {
        // Para cada mutação detectada
        mutations.forEach(function(mutation) {
            // Se foram adicionados novos nós
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Verifica se os nós adicionados são itens de filtro
                const hasFilterItems = Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-filter')
                );
                
                // Se encontrou itens de filtro, executa o ajuste
                if (hasFilterItems) {
                    fixFilterText();
                }
            }
        });
    });

    // Configura o observador para monitorar o container de filtros
    const filtersContainer = document.getElementById('dynamic-snippets-filters');
    if (filtersContainer) {
        observer.observe(filtersContainer, {
            childList: true,
            subtree: true
        });
    }

    // Também monitora eventos de carregamento dinâmico de filtros
    $(document).on('isotope-filters-added', fixFilterText);
});
