/**
 * Patch de segurança para imagesLoaded
 * 
 * Evita erros de null/undefined quando imagesLoaded é chamado
 * com elementos que podem não existir no DOM
 * 
 * @author Edson LI - GitHub Copilot
 * @version 1.0.0
 */
$(function() {
  // Verificar se a função imagesLoaded original existe
  if (typeof window.imagesLoaded !== 'function') {
    console.info('[imagesLoaded-fix]: imagesLoaded não encontrado, patch ignorado.');
    return;
  }

  // Preservar referência da função original
  const originalImagesLoaded = window.imagesLoaded;
  
  // Substituir com versão segura
  window.imagesLoaded = function(elements, options, callback) {
    // Se não há elementos, retornar sem erro
    if (!elements) {
      console.warn('[imagesLoaded-fix]: Chamada com elementos nulos ou indefinidos.');
      
      // Detectar como a função foi chamada
      if (typeof options === 'function') {
        // Chamar callback imediatamente se foi passado como segundo parâmetro
        setTimeout(() => options(), 0);
      } else if (typeof callback === 'function') {
        // Chamar callback imediatamente se foi passado como terceiro parâmetro
        setTimeout(() => callback(), 0);
      }
      
      // Retornar um objeto vazio para evitar erros em encadeamentos
      return {
        on: function() { return this; },
        once: function() { return this; },
        off: function() { return this; },
        emitEvent: function() { return this; }
      };
    }
    
    // Se é um seletor jQuery, extrair os elementos DOM
    if (elements.jquery) {
      elements = elements.get();
    }
    
    // Se é um array vazio, tratar como se não houvesse elementos
    if (Array.isArray(elements) && elements.length === 0) {
      console.warn('[imagesLoaded-fix]: Chamada com array de elementos vazio.');
      
      // Similar ao caso de elementos nulos
      if (typeof options === 'function') {
        setTimeout(() => options(), 0);
      } else if (typeof callback === 'function') {
        setTimeout(() => callback(), 0);
      }
      
      return {
        on: function() { return this; },
        once: function() { return this; },
        off: function() { return this; },
        emitEvent: function() { return this; }
      };
    }
    
    // Chamar a função original com os elementos verificados
    try {
      return originalImagesLoaded(elements, options, callback);
    } catch (err) {
      console.warn('[imagesLoaded-fix]: Erro capturado:', err);
      
      // Similar aos casos anteriores
      if (typeof options === 'function') {
        setTimeout(() => options(), 0);
      } else if (typeof callback === 'function') {
        setTimeout(() => callback(), 0);
      }
      
      return {
        on: function() { return this; },
        once: function() { return this; },
        off: function() { return this; },
        emitEvent: function() { return this; }
      };
    }
  };
  
  console.info('[imagesLoaded-fix]: Patch de segurança instalado.');
});
