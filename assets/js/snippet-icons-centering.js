/**
 * Script para garantir que os ícones dentro dos botões de ação dos snippets 
 * estejam perfeitamente centralizados verticalmente
 */

$(document).ready(function() {
    // Função para centralizar os ícones nos botões de ação dos snippets
    function centerIconsInButtons() {
        // Seleciona todos os iconify-icon dentro dos botões de ação
        $('.snippet-code-actions .btn iconify-icon').each(function() {
            // Garante que o elemento pai (botão) tenha display flex e posição relativa
            $(this).parent().css({
                'display': 'inline-flex',
                'align-items': 'center',
                'justify-content': 'center',
                'position': 'relative',
                'overflow': 'visible',
                'padding': '0'
            });
            
            // Aplica estilos diretamente ao ícone para centralização perfeita
            $(this).css({
                'position': 'absolute',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
                'display': 'inline-flex',
                'align-items': 'center',
                'justify-content': 'center',
                'margin': '0',
                'height': '16px',
                'width': '16px'
            });
        });
    }
    
    // Chama a função inicialmente
    centerIconsInButtons();
    
    // Também chama após o carregamento completo da página
    $(window).on('load', function() {
        centerIconsInButtons();
    });
    
    // E quando o tamanho da janela mudar (responsividade)
    $(window).on('resize', function() {
        centerIconsInButtons();
    });
});
