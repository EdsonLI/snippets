/**
 * Script para garantir o funcionamento do toggle de tema
 * Resolve problemas de inicialização e sincronização quando outros scripts afetam o toggle
 */
$(document).ready(function() {
    // Capturar o botão de toggle de tema
    const $themeBtn = $('#theme-toggle');
    const $icon = $themeBtn.find('iconify-icon');
    
    if ($themeBtn.length === 0) {
        console.error('Botão de toggle de tema não encontrado!');
        return;
    }
    
    // Função para aplicar o tema
    function setTheme(dark) {
        $('body').toggleClass('dark-theme', dark);
        $themeBtn.attr('title', dark ? 'Tema claro' : 'Tema escuro');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
    
    // Recuperar a preferência do usuário
    const saved = localStorage.getItem('theme');
    setTheme(saved === 'dark');
    
    // Adicionar listener de evento ao botão
    $themeBtn.off('click').on('click', function() {
        setTheme(!$('body').hasClass('dark-theme'));
    });
    
    // Log de confirmação
    console.log('Inicialização do toggle de tema concluída.');
});
