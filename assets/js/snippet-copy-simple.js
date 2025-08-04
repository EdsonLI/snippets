/**
 * BOTÕES DE CÓPIA - VERSÃO EXTREMAMENTE SIMPLIFICADA
 * Solução direta sem complicações - foco em estabilidade
 */
document.addEventListener("DOMContentLoaded", function() {
  console.log("Inicializando sistema de cópia...");
  
  // FUNÇÃO SIMPLES PARA COPIAR TEXTO
  function copyTextToClipboard(text) {
    return navigator.clipboard.writeText(text);
  }
  
  // ENCONTRAR TODOS OS BOTÕES DE CÓPIA (que tenham data-target)
  var copyButtons = document.querySelectorAll("button[data-target]");
  console.log("Botões de cópia encontrados: " + copyButtons.length);
  
  // ADICIONAR HANDLER DE CLIQUE EM CADA BOTÃO
  copyButtons.forEach(function(button) {
    // Remover listeners existentes (se possível)
    button.replaceWith(button.cloneNode(true));
    
    // Obter botão novamente após substituição
    var newButton = document.querySelector('button[data-target="' + button.getAttribute('data-target') + '"]');
    
    // Adicionar novo listener
    newButton.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Obter ID do elemento alvo
      var targetId = this.getAttribute("data-target");
      var codeElement = document.getElementById(targetId);
      
      if (!codeElement) {
        console.error("Elemento não encontrado: #" + targetId);
        return;
      }
      
      // Copiar texto
      var textToCopy = codeElement.textContent.trim();
      copyTextToClipboard(textToCopy)
        .then(function() {
          // Feedback visual
          var iconElement = newButton.querySelector("iconify-icon");
          
          if (iconElement) {
            var originalIcon = iconElement.getAttribute("icon") || "mdi:content-copy";
            iconElement.setAttribute("icon", "mdi:check");
            
            setTimeout(function() {
              iconElement.setAttribute("icon", originalIcon);
            }, 1500);
          } else {
            var originalHtml = newButton.innerHTML;
            newButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            
            setTimeout(function() {
              newButton.innerHTML = originalHtml;
            }, 1500);
          }
        })
        .catch(function(err) {
          console.error("Erro ao copiar:", err);
        });
    });
  });
  
  console.log("Sistema de cópia inicializado.");
});
