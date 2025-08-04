/**
 * Sistema de cópia de snippets - Implementação simplificada
 * Usa JavaScript puro (vanilla) para evitar conflitos
 */
document.addEventListener("DOMContentLoaded", function() {
  console.log("[Botões Cópia] Inicializando sistema simplificado...");
  
  // Função para copiar texto para a área de transferência
  function copiarTexto(texto) {
    return navigator.clipboard.writeText(texto)
      .then(() => {
        console.log("[Botões Cópia] Texto copiado com sucesso!");
        return true;
      })
      .catch(erro => {
        console.error("[Botões Cópia] Erro ao copiar:", erro);
        return false;
      });
  }
  
  // Função para processar clique no botão de cópia
  function processarCliqueBotao(evento) {
    evento.preventDefault();
    
    // Obter o elemento alvo pelo data-target
    const idAlvo = this.getAttribute("data-target");
    const elementoAlvo = document.getElementById(idAlvo);
    
    if (!elementoAlvo) {
      console.error(`[Botões Cópia] Elemento alvo não encontrado: #${idAlvo}`);
      return;
    }
    
    // Obter o texto e remover espaços extras no início/fim
    const textoCopiar = elementoAlvo.textContent.trim();
    
    // Copiar o texto para a área de transferência
    copiarTexto(textoCopiar).then(sucesso => {
      if (sucesso) {
        // Feedback visual temporário (troca o ícone por 1.5s)
        const icone = this.querySelector("iconify-icon");
        
        if (icone) {
          // Salvar ícone original
          const iconeOriginal = icone.getAttribute("icon") || "mdi:content-copy";
          
          // Trocar para o ícone de confirmação
          icone.setAttribute("icon", "mdi:check");
          
          // Restaurar ícone original após 1.5s
          setTimeout(() => {
            icone.setAttribute("icon", iconeOriginal);
          }, 1500);
        } else {
          // Caso não tenha iconify-icon, usa classe ou texto
          const htmlOriginal = this.innerHTML;
          this.innerHTML = '<i class="fa-solid fa-check"></i>';
          
          setTimeout(() => {
            this.innerHTML = htmlOriginal;
          }, 1500);
        }
      }
    });
  }
  
  // Inicialização - adicionar listeners nos botões
  function inicializarBotoes() {
    // Localizar todos os botões de cópia (com atributo data-target)
    const botoes = document.querySelectorAll("button[data-target]");
    console.log(`[Botões Cópia] Encontrados ${botoes.length} botões`);
    
    // Para cada botão, adicionar o listener de clique
    botoes.forEach(botao => {
      // Remover qualquer listener anterior (clone + substitui)
      const novoBotao = botao.cloneNode(true);
      botao.parentNode.replaceChild(novoBotao, botao);
      
      // Adicionar listener no botão novo
      novoBotao.addEventListener("click", processarCliqueBotao);
    });
  }
  
  // Inicializar imediatamente
  inicializarBotoes();
  
  // Também inicializar quando o conteúdo for carregado dinamicamente
  document.addEventListener("DOMNodeInserted", function(evento) {
    // Verificar se o novo nó contém botões de cópia
    const novosBotoes = evento.target.querySelectorAll?.("button[data-target]");
    if (novosBotoes && novosBotoes.length > 0) {
      console.log(`[Botões Cópia] Detectados ${novosBotoes.length} novos botões`);
      inicializarBotoes();
    }
  });
  
  console.log("[Botões Cópia] Sistema inicializado com sucesso.");
});
