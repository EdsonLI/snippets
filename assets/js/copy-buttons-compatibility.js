/**
 * Script que adiciona automaticamente a classe copy-btn a todos os botões de cópia
 * Esta é uma solução para garantir compatibilidade com o novo sistema de cópia
 */
$(document).ready(function() {
  console.log('Iniciando script de compatibilidade de botões de cópia');
  
  // Contador para log
  let count = 0;
  
  // Encontra todos os botões com data-target e adiciona a classe copy-btn
  $('button[data-target], .btn-custom[data-target]').each(function() {
    if (!$(this).hasClass('copy-btn')) {
      $(this).addClass('copy-btn');
      count++;
    }
  });
  
  console.log('Adicionada classe copy-btn a ' + count + ' botões');
  
  // Reinicia o sistema de cópia para garantir que os novos botões sejam inicializados
  if (typeof window.setupCopyButtons === 'function') {
    window.setupCopyButtons({ checkInit: false });
    console.log('Sistema de cópia reinicializado com novos botões');
  }
});
