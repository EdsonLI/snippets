/**
 * COMPATIBILIDADE PARA setupCopyButtons
 * Este arquivo existe para garantir compatibilidade com scripts antigos
 * que chamam a função setupCopyButtons() 
 */

// Criar uma versão de compatibilidade da função setupCopyButtons
window.setupCopyButtons = function(options) {
  console.log('[Compatibilidade] Chamada antiga para setupCopyButtons() interceptada');
  // Não faz nada, pois a funcionalidade agora é tratada pelo snippet-copy-simple.js
  return;
};
