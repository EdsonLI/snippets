/**
 * Script para garantir que os ícones dentro dos botões de ação dos snippets 
 * estejam perfeitamente centralizados verticalmente
 */

$(document).ready(function() {
    # Função para centralizar os ícones nos botões de ação dos snippets
    function centerIconsInButtons() {
        # Seleciona todos os iconify-icon dentro dos botões de ação
        $('.snippet-code-actions .btn iconify-icon').each(function() {
            # Garante que o elemento pai (botão) tenha display flex
            $(this).parent().css({
                'display': 'inline-flex',
                'align-items': 'center',
                'justify-content': 'center'
            });
            
            # Aplica estilos diretamente ao ícone para centralização vertical
            $(this).css({
                'position': 'relative',
                'top': '0',
                'transform': 'none',
                'display': 'inline-flex',
                'align-items': 'center',
                'justify-content': 'center',
                'vertical-align': 'middle'
            });
        });
    }
    
    # Chama a função inicialmente
    centerIconsInButtons();
    
    # Também chama após o carregamento completo da página
    $(window).on('load', function() {
        centerIconsInButtons();
    });
    
    # E quando o tamanho da janela mudar (responsividade)
    $(window).on('resize', function() {
        centerIconsInButtons();
    });
});
