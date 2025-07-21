module.exports = (pluginContext) => {
  pluginContext.injectCSS('style.css');
};

(function() {
  // Função para criar o botão de toggle
  function createSidePanelToggle() {
    const sidePanel = document.querySelector('#side-panel');
    if (!sidePanel) {
      console.log('Side panel não encontrado');
      return;
    }
    
    // Verificar se o botão já existe para evitar duplicatas
    if (document.querySelector('#side-panel-toggle')) return;
    
    // Criar o botão de toggle
    const toggleButton = document.createElement('div');
    toggleButton.id = 'side-panel-toggle';
    toggleButton.title = 'Recolher/Expandir painel lateral';
    
    // Anexar o botão ao side-panel
    sidePanel.appendChild(toggleButton);
    
    // Adicionar evento de clique
    toggleButton.addEventListener('click', function(e) {
      e.stopPropagation(); // Evita propagação para outros elementos
      sidePanel.classList.toggle('collapsed');
      
      // Salvar o estado no localStorage
      localStorage.setItem('sidePanelCollapsed', sidePanel.classList.contains('collapsed'));
    });
    
    // Restaurar o estado anterior se existir
    const wasCollapsed = localStorage.getItem('sidePanelCollapsed') === 'true';
    if (wasCollapsed) {
      sidePanel.classList.add('collapsed');
    }
    
    console.log('Toggle configurado com sucesso!');
  }
  
  // Executa imediatamente
  createSidePanelToggle();
  
  // Também tenta quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', createSidePanelToggle);
  
  // Se o side-panel for adicionado dinamicamente depois
  const observer = new MutationObserver(function(mutations) {
    if (document.querySelector('#side-panel') && 
        !document.querySelector('#side-panel-toggle')) {
      console.log('Side panel detectado por MutationObserver');
      createSidePanelToggle();
    }
  });
  
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
})();
