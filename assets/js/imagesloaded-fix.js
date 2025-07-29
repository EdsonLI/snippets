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
  window.imagesLoaded = function(element, callback) {
    if (!element) {
      console.warn('[imagesLoaded-fix]: Elemento nulo ou indefinido. Callback ignorado.');
      return;
    }
    return originalImagesLoaded(element, callback);
  };
  
  console.info('[imagesLoaded-fix]: Patch de segurança instalado.');
});
