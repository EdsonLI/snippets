/**
 * Script para gerenciar o carregamento dinâmico de snippets
 * com suporte adequado para o Isotope
 */
$(document).ready(function() {
  // Armazena referências às instâncias do Isotope para acesso fácil
  const isotopeInstances = {};
  
  // Captura as instâncias do Isotope inicializadas no carregamento da página
  function saveIsotopeInstances() {
    $('.isotope-layout').each(function() {
      const layoutId = $(this).attr('id') || 'main-isotope';
      const $container = $(this).find('.isotope-container');
      
      // Armazenar referência ao container para uso posterior
      isotopeInstances[layoutId] = {
        container: $container,
        instance: $container.data('isotope')
      };
    });
  }
  
  // Chamar assim que a página for carregada e o Isotope inicializado
  $(window).on('load', function() {
    setTimeout(saveIsotopeInstances, 500); // Dar tempo para o Isotope inicializar
  });
  
  // Função para carregar snippet dinamicamente e integrá-lo ao Isotope
  function loadDynamicSnippet(containerId, snippetUrl, layoutId = 'main-isotope') {
    const $container = $('#' + containerId);
    
    $.get(snippetUrl, function(data) {
      // Converter string HTML para elemento DOM
      const $newItems = $(data);
      
      // Adicionar os itens ao contêiner
      $container.append($newItems);
      
      // Destacar o código
      hljs.highlightAll();
      
      // Adicionar funcionalidade dos botões de cópia
      setupCopyButtons();
      
      // Se o Isotope já foi inicializado
      if (isotopeInstances[layoutId] && isotopeInstances[layoutId].instance) {
        // Adicionar os novos itens ao layout existente
        isotopeInstances[layoutId].instance.appended($newItems);
        isotopeInstances[layoutId].instance.layout();
      } else {
        console.log('Isotope ainda não inicializado ou não encontrado');
        
        // Se o Isotope não estiver disponível ainda, tentar inicializar
        setTimeout(() => {
          saveIsotopeInstances();
          if (isotopeInstances[layoutId] && isotopeInstances[layoutId].instance) {
            isotopeInstances[layoutId].instance.appended($newItems);
            isotopeInstances[layoutId].instance.layout();
          }
        }, 1000);
      }
    });
  }
  
  // Expor a função globalmente
  window.loadDynamicSnippet = loadDynamicSnippet;
  
  // Função auxiliar para configurar botões de cópia e alinhar botões flutuantes
  function setupCopyButtons() {
    // Garantir que todos os snippet-actions-float estejam alinhados à direita
    document.querySelectorAll('.snippet-actions-float').forEach(actionBar => {
      if (!actionBar.classList.contains('justify-content-end')) {
        actionBar.classList.add('justify-content-end');
      }
    });
    
    // Configurar botões de cópia
    document.querySelectorAll('.btn-custom[data-target]').forEach(button => {
      if (button.hasAttribute('data-copy-initialized')) return;
      
      button.setAttribute('data-copy-initialized', 'true');
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const codeBlock = document.getElementById(targetId);

        if (codeBlock) {
          const text = codeBlock.textContent.trim();
          navigator.clipboard.writeText(text).then(() => {
            const icon = button.querySelector('iconify-icon');
            if (icon) {
              icon.setAttribute('icon', 'mdi:check');
              setTimeout(() => {
                icon.setAttribute('icon', 'mdi:content-copy');
              }, 1200);
            }
          }).catch(err => {
            console.error('Erro ao copiar o texto:', err);
          });
        }
      });
    });
  }
});
