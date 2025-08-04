/**
 * Gerenciador centralizado de botões de cópia para snippets de código
 * Esta implementação unifica todas as versões anteriores espalhadas pelo projeto
 * 
 * @author Edson LI
 * @version 1.0.0 (Unified jQuery Edition)
 */

// Função global para inicializar botões de cópia
function setupCopyButtons(options = {}) {
  // Opções padrão
  const defaultOptions = {
    alignButtons: true,    // Alinhar botões à direita (justify-content-end)
    checkInit: true,       // Verificar se botões já foram inicializados
    saveOriginalIcon: true // Salvar e restaurar o ícone original
  };
  
  // Mesclar opções padrão com as fornecidas
  const settings = {...defaultOptions, ...options};
  
  // Executar apenas uma vez se já inicializado globalmente
  if (window.copyButtonsInitialized && settings.checkInit) {
    console.info('Copy buttons already initialized');
    return;
  }
  
  // 1. Alinhar botões à direita (se solicitado)
  if (settings.alignButtons) {
    $('.snippet-actions-float').each(function() {
      if (!$(this).hasClass('justify-content-end')) {
        $(this).addClass('justify-content-end');
      }
    });
  }
  
  // 2. Configurar botões de cópia - seletor mais abrangente para pegar todos os botões
  $('button[data-target], .btn-custom[data-target], .copy-btn[data-target]').each(function() {
    const $button = $(this);
    
    // Pular se já inicializado e a opção checkInit estiver ativada
    if (settings.checkInit && $button.attr('data-copy-initialized')) {
      return;
    }
    
    // Marcar como inicializado
    $button.attr('data-copy-initialized', 'true');
    
    // Remover handlers existentes para evitar duplicação
    $button.off('click.copySnippet');
    
    // Adicionar evento de clique (CORRIGIDO: usando variável local $thisButton)
    $button.on('click.copySnippet', function() {
      const $thisButton = $(this); // Corrigido: use o contexto correto do botão clicado
      const targetId = $thisButton.attr('data-target');
      const $codeBlock = $('#' + targetId);

      if ($codeBlock.length) {
        // Copiar o texto para a área de transferência
        const text = $codeBlock.text().trim();
        navigator.clipboard.writeText(text)
          .then(function() {
            // Feedback visual
            const $icon = $thisButton.find('iconify-icon');
            if ($icon.length) {
              // Salvar ícone original se a opção estiver ativada
              const originalIcon = settings.saveOriginalIcon 
                ? ($icon.attr('icon') || 'mdi:content-copy')
                : 'mdi:content-copy';
              
              // Alterar para ícone de confirmação
              $icon.attr('icon', 'mdi:check');
              
              // Restaurar ícone original após delay
              setTimeout(function() {
                $icon.attr('icon', originalIcon);
              }, 1200);
            }
          })
          .catch(function(err) {
            console.error('Erro ao copiar o texto:', err);
          });
      } else {
        console.error('Bloco de código não encontrado para o ID:', targetId);
      }
    });
  });
  
  // Marcar como inicializado globalmente
  window.copyButtonsInitialized = true;
  console.info('Copy buttons initialized successfully');
}

// Exportar a função para o escopo global
window.setupCopyButtons = setupCopyButtons;

// Inicializar automaticamente quando o documento estiver pronto
$(document).ready(function() {
  console.log('copy-buttons-manager.js - Document ready');
  console.log('Botões encontrados:', $('button[data-target], .btn-custom[data-target], .copy-btn[data-target]').length);
  
  // Chamada inicial
  setupCopyButtons();
  
  // Também chamar quando a página estiver totalmente carregada (imagens, etc.)
  $(window).on('load', function() {
    console.log('copy-buttons-manager.js - Window loaded');
    console.log('Botões encontrados após carregamento:', $('button[data-target], .btn-custom[data-target], .copy-btn[data-target]').length);
    setupCopyButtons({ checkInit: true });
  });
});
