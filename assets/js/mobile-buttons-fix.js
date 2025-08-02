/**
 * Script para melhorar a interatividade dos botões em dispositivos móveis
 * Resolve problemas de eventos de toque não funcionando corretamente
 */
$(document).ready(function() {
    // Função para identificar se estamos em dispositivo móvel
    function isMobile() {
        return window.innerWidth <= 991 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Melhorar interação de botões em dispositivos móveis
    if (isMobile()) {
        console.log('📱 Ativando melhorias para botões em dispositivos móveis');
        
        // Melhorar a responsividade de todos os botões e links de ação
        const clickableElements = [
            '.btn', 
            '.btn-get-started', 
            '.nav-link',
            '.nav-snippets-link',
            '.portfolio-filters li',
            '.isotope-filters li',
            '.copy-btn',
            '#theme-toggle',
            '#refresh-list'
        ].join(', ');
        
        // Aplicar melhorias de toque a todos os elementos clicáveis
        $(clickableElements).each(function() {
            const $element = $(this);
            
            // Remover eventos existentes para evitar duplicação
            $element.off('touchstart touchend click');
            
            // Adicionar classe de estilo para feedback visual
            $element.addClass('touch-enhanced');
            
            // Adicionar atributos para melhorar acessibilidade e toque
            $element.attr({
                'role': $element.is('button') ? 'button' : 'link',
                'tabindex': '0'
            });
            
            // Adicionar eventos de toque
            $element.on('touchstart', function() {
                $(this).addClass('touch-active');
            });
            
            $element.on('touchend', function(e) {
                $(this).removeClass('touch-active');
                
                // Simular clique para garantir que a ação ocorra
                setTimeout(() => {
                    if ($element.is('a') && $element.attr('href')) {
                        if ($element.attr('href').startsWith('#')) {
                            // Para links internos, prevenir comportamento padrão
                            e.preventDefault();
                            // Rolar suavemente para o destino
                            const targetId = $element.attr('href');
                            const $target = $(targetId);
                            if ($target.length) {
                                $('html, body').animate({
                                    scrollTop: $target.offset().top - 100
                                }, 800);
                            }
                        }
                    } else if (!$element.is('a')) {
                        // Para outros elementos, disparar evento de clique
                        $element.trigger('click');
                    }
                }, 10);
            });
        });
        
        // Corrigir botão específico "Explorar snippets"
        $('.btn-get-started').on('click touchend', function(e) {
            e.preventDefault();
            const href = $(this).attr('href');
            if (href) {
                window.location.href = href;
            }
        });
    }
});
