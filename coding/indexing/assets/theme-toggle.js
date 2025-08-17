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

  // Função para definir o tema
  function setTheme(theme) {
    console.log('🔄 Alterando tema para:', theme);
    
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme);
    localStorage.setItem('snippetTheme', theme);
    
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

    // Remover listeners existentes para evitar duplicação
    const newBtn = themeToggleBtn.cloneNode(true);
    themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);

    // Adicionar event listener para o botão
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🖱️ Botão de toggle clicado!');
      toggleTheme();
    });

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
    
    // Carregar tema salvo primeiro
    loadSavedTheme();
    
    // Função para tentar inicializar o toggle
    function tryInitToggle(attempts = 0) {
      if (attempts > 10) {
        console.error('❌ Falha ao inicializar toggle após 10 tentativas');
        return;
      }

      if (initThemeToggle()) {
        console.log('🎉 Sistema de toggle inicializado com sucesso!');
      } else {
        console.log(`⏳ Tentativa ${attempts + 1}: Botão não encontrado, tentando novamente...`);
        setTimeout(() => tryInitToggle(attempts + 1), 100);
      }
    }

    // Inicializar o toggle quando o DOM estiver pronto
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
    }
  };

  console.log('✅ Sistema de toggle carregado. Use window.snippetTheme.debug() para debug');

})();
