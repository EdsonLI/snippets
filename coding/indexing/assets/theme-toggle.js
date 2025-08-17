// =========================
// TOGGLE DE TEMA - JAVASCRIPT UNIVERSAL
// =========================

/**
 * Sistema de alternância de tema para todas as páginas do diretório indexing/
 * Compatível com localStorage para persistir a escolha do usuário
 */

(function() {
  'use strict';

  // Função para definir o tema
  function setTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme);
    localStorage.setItem('snippetTheme', theme);
    
    // Log para debug (opcional)
    console.log('Tema alterado para:', theme);
  }

  // Função para inicializar o toggle de tema
  function initThemeToggle() {
    // Verificar se o botão existe na página
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) {
      console.warn('Botão de toggle de tema não encontrado. Certifique-se de que existe um elemento com id="themeToggle"');
      return;
    }

    // Adicionar event listener para o botão
    themeToggleBtn.addEventListener('click', function() {
      const isDark = document.body.classList.contains('theme-dark');
      setTheme(isDark ? 'theme-light' : 'theme-dark');
    });

    console.log('Toggle de tema inicializado com sucesso');
  }

  // Função para carregar o tema salvo ou definir padrão
  function loadSavedTheme() {
    const savedTheme = localStorage.getItem('snippetTheme');
    const defaultTheme = 'theme-dark'; // Tema padrão
    
    setTheme(savedTheme || defaultTheme);
  }

  // Inicialização quando o DOM estiver carregado
  function init() {
    // Carregar tema salvo primeiro
    loadSavedTheme();
    
    // Inicializar o toggle quando o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
      initThemeToggle();
    }
  }

  // Executar inicialização
  init();

  // Disponibilizar funções globalmente para debug (opcional)
  window.snippetTheme = {
    setTheme: setTheme,
    getCurrentTheme: function() {
      return document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
    },
    getSavedTheme: function() {
      return localStorage.getItem('snippetTheme');
    }
  };

})();
