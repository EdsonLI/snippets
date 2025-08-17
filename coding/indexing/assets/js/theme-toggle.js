// =========================
// TOGGLE DE TEMA - JAVASCRIPT UNIVERSAL
// =========================

/**
 * Sistema de alternância de tema para todas as páginas do diretório indexing/
 * Compatível com localStorage para persistir a escolha do usuário
 */

(function() {
  'use strict';

  console.log('🎨 Iniciando sistema de toggle de tema...');

  // Função para reaplicar tema ao conteúdo dinâmico
  function reapplyThemeToContent(container) {
    console.log('🔄 Reaplicando tema ao conteúdo dinâmico...', container);
    
    const currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
    
    // Forçar reclassificação dos elementos dentro do container
    if (container) {
      container.classList.add('theme-applied');
      
      // Para abas específicas problemáticas, forçar styles inline
      const problemTabs = ['jquery-content', 'css-content', 'bootstrap-content', 'html-content'];
      if (problemTabs.includes(container.id)) {
        console.log('🎯 Aplicando correção específica para aba problemática:', container.id);
        
        // Forçar styles para tema claro
        if (currentTheme === 'theme-light') {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            if (el.tagName === 'PRE') {
              el.style.backgroundColor = '#f8f9fa';
              el.style.color = '#212529';
              el.style.border = '1px solid #dee2e6';
            } else if (el.classList.contains('card')) {
              el.style.backgroundColor = '#fff';
              el.style.color = '#212529';
              el.style.borderColor = '#dee2e6';
            } else {
              el.style.color = '#212529';
            }
          });
        } 
        // Forçar styles para tema escuro
        else {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            if (el.tagName === 'PRE') {
              el.style.backgroundColor = '#161b22';
              el.style.color = '#e6edf3';
              el.style.border = '1px solid #6610f2';
            } else if (el.classList.contains('card')) {
              el.style.backgroundColor = '#222b36';
              el.style.color = '#e6edf3';
              el.style.borderColor = '#30363d';
            } else {
              el.style.color = '#e6edf3';
            }
          });
        }
      }
      
      // Aguardar um frame para garantir que o CSS seja aplicado
      requestAnimationFrame(() => {
        console.log('✅ Tema reaplicado ao container:', container.id || container.className);
      });
    }
  }

  // Função para definir o tema
  function setTheme(theme) {
    console.log('🔄 Alterando tema para:', theme);
    
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme);
    localStorage.setItem('snippetTheme', theme);
    
    // Reaplicar tema a todos os containers de conteúdo dinâmico
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(container => {
      reapplyThemeToContent(container);
    });
    
    console.log('✅ Tema aplicado:', theme);
    console.log('📝 Classes do body:', document.body.className);
  }

  // Função para alternar tema
  function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'theme-light' : 'theme-dark';
    
    console.log('🔄 Alternando tema. Atual: theme-dark =', isDark, '| Novo:', newTheme);
    
    setTheme(newTheme);
  }

  // Função para inicializar o toggle de tema
  function initThemeToggle() {
    console.log('🔍 Procurando botão de toggle...');
    
    // Verificar se o botão existe na página
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) {
      console.warn('⚠️ Botão de toggle de tema não encontrado. ID esperado: "themeToggle"');
      return false;
    }

    console.log('✅ Botão encontrado:', themeToggleBtn);

    // Verificar se já tem listener para evitar duplicação
    if (themeToggleBtn.dataset.listenerAdded === 'true') {
      console.log('⚠️ Listener já existe, pulando inicialização');
      return true;
    }

    // Adicionar event listener para o botão
    themeToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🖱️ Botão de toggle clicado!');
      toggleTheme();
    });

    // Marcar como inicializado
    themeToggleBtn.dataset.listenerAdded = 'true';

    console.log('✅ Toggle de tema inicializado com sucesso');
    return true;
  }

  // Função para carregar o tema salvo ou definir padrão
  function loadSavedTheme() {
    const savedTheme = localStorage.getItem('snippetTheme');
    const defaultTheme = 'theme-dark'; // Tema padrão
    const themeToApply = savedTheme || defaultTheme;
    
    console.log('💾 Tema salvo:', savedTheme);
    console.log('🎯 Aplicando tema:', themeToApply);
    
    setTheme(themeToApply);
  }

  // Função principal de inicialização
  function init() {
    console.log('🚀 Inicializando sistema de toggle de tema...');
    
    // Carregar tema salvo
    loadSavedTheme();
    
    // Função para tentar inicializar o toggle (com retry)
    function tryInitToggle(attempts = 0) {
      const maxAttempts = 10;
      
      if (attempts >= maxAttempts) {
        console.error('❌ Não foi possível inicializar o toggle após', maxAttempts, 'tentativas');
        return;
      }
      
      console.log(`🔄 Tentativa ${attempts + 1} de inicializar toggle...`);
      
      if (initThemeToggle()) {
        console.log('🎉 Sistema de toggle totalmente inicializado!');
        return;
      }
      
      // Se não conseguiu inicializar, tentar novamente após um delay
      setTimeout(() => tryInitToggle(attempts + 1), 100);
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => tryInitToggle());
    } else {
      tryInitToggle();
    }
  }

  // Executar inicialização
  init();

  // Disponibilizar funções globalmente para debug
  window.snippetTheme = {
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    reapplyThemeToContent: reapplyThemeToContent,
    refreshTheme: function() {
      // Força reaplicação do tema atual a todo conteúdo
      const currentTheme = this.getCurrentTheme();
      setTheme(currentTheme);
    },
    forceFixProblemTabs: function() {
      // Forçar correção nas abas problemáticas
      const problemTabs = ['jquery-content', 'css-content', 'bootstrap-content', 'html-content'];
      problemTabs.forEach(tabId => {
        const container = document.getElementById(tabId);
        if (container) {
          console.log('🔧 Forçando correção na aba:', tabId);
          reapplyThemeToContent(container);
        }
      });
    },
    getCurrentTheme: function() {
      return document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
    },
    getSavedTheme: function() {
      return localStorage.getItem('snippetTheme');
    },
    debug: function() {
      console.log('🔍 Debug do sistema de tema:');
      console.log('- Tema atual:', this.getCurrentTheme());
      console.log('- Tema salvo:', this.getSavedTheme());
      console.log('- Classes do body:', document.body.className);
      console.log('- Botão existe:', !!document.getElementById('themeToggle'));
      console.log('- Containers tab-content encontrados:', document.querySelectorAll('.tab-content').length);
      console.log('- Abas problemáticas encontradas:');
      const problemTabs = ['jquery-content', 'css-content', 'bootstrap-content', 'html-content'];
      problemTabs.forEach(tabId => {
        const exists = !!document.getElementById(tabId);
        console.log(`  - ${tabId}: ${exists ? '✅' : '❌'}`);
      });
    }
  };

  console.log('✅ Sistema de toggle carregado. Use window.snippetTheme.debug() para debug');

})();
