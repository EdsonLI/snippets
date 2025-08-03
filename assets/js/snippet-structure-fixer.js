/**
 * Script para corrigir inconsistências na estrutura de snippets
 * Assegura o correto alinhamento dos botões de ação
 */
$(document).ready(function() {
  function fixSnippetStructure() {
    // Procurar por botões de ação que estão fora do h6
    $('.portfolio-content').each(function() {
      const $container = $(this);
      const $heading = $container.find('h6');
      const $actions = $container.find('.snippet-actions-float').first();
      
      // Se encontrar ações fora do h6, mas o h6 existe
      if ($actions.length && $heading.length && !$heading.find('.snippet-actions-float').length) {
        // Mover as ações para dentro do h6
        $actions.appendTo($heading);
        console.log('Snippet structure corrected - actions moved inside h6');
      }
      
      // Caso específico: ações dentro de div.text-center que segue o h6
      const $centerDiv = $container.find('div.text-center').first();
      if ($centerDiv.length && $centerDiv.find('.snippet-actions-float').length && $heading.length) {
        // Mover as ações para dentro do h6
        $centerDiv.find('.snippet-actions-float').appendTo($heading);
        console.log('Snippet structure corrected - actions moved from center div to h6');
      }
    });
  }

  // Executar após outros scripts terem sido carregados
  setTimeout(fixSnippetStructure, 500);
});
