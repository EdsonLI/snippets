/**
 * Script para resolver definitivamente o problema do ícone do Bootstrap
 * Detecta e substitui o SVG antigo pelo novo em qualquer lugar onde apareça
 */
document.addEventListener('DOMContentLoaded', function() {
  // Esta função vai substituir TODOS os SVGs antigos do Bootstrap pelos novos
  function substituirTodosIconesBootstrap() {
    console.log('Iniciando substituição definitiva dos ícones Bootstrap...');
    
    // O novo ícone de Bootstrap que vamos usar
    const novoSvgBootstrap = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bootstrap-icon-svg">
      <path fill="#7952B3" d="M5.062 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377H6.375z"/>
      <path fill="#7952B3" d="M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4zm4-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4z"/>
    </svg>`;
    
    // 1. Substituir SVGs no HTML codificado - encontra todos os SVGs Bootstrap antigos
    const elementos = document.querySelectorAll('.id-tech-bootstrap svg.bootstrap-icon-svg');
    console.log(`Encontrados ${elementos.length} SVGs Bootstrap no DOM`);
    
    elementos.forEach((elemento, index) => {
      // Verifica se é o SVG antigo pelo viewBox
      if (elemento.getAttribute('viewBox') === '0 0 118 94') {
        // Substitui o elemento pelo novo SVG
        const novoElemento = document.createElement('div');
        novoElemento.innerHTML = novoSvgBootstrap;
        const novoSvg = novoElemento.firstChild;
        elemento.parentNode.replaceChild(novoSvg, elemento);
        console.log(`SVG #${index+1} substituído com sucesso`);
      }
    });
    
    // 2. Corrigir estilos do wrapper do ícone para garantir que apareça corretamente
    const wrappers = document.querySelectorAll('.bootstrap-icon-wrapper');
    wrappers.forEach((wrapper) => {
      wrapper.style.backgroundColor = 'transparent';
      wrapper.style.boxShadow = 'none';
      wrapper.style.position = 'static';
      wrapper.style.display = 'inline-flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'center';
      wrapper.style.marginRight = '4px';
      wrapper.style.verticalAlign = 'middle';
      wrapper.style.padding = '0';
      wrapper.style.borderRadius = '0';
      wrapper.style.overflow = 'visible';
    });
    
    // 3. Corrigir estilos do SVG para garantir tamanho e posição corretos
    const svgs = document.querySelectorAll('.bootstrap-icon-svg');
    svgs.forEach((svg) => {
      svg.style.width = '18px';
      svg.style.height = '18px';
      svg.style.position = 'static';
      svg.style.transform = 'none';
    });
    
    console.log('Substituição concluída');
  }
  
  // Executar a substituição inicial
  substituirTodosIconesBootstrap();
  
  // Executar novamente após um pequeno atraso para pegar elementos carregados dinamicamente
  setTimeout(substituirTodosIconesBootstrap, 1000);
  
  // Observador de mutações para substituir SVGs em conteúdo carregado dinamicamente
  if (window.MutationObserver) {
    const observer = new MutationObserver(() => {
      substituirTodosIconesBootstrap();
    });
    
    // Observa mudanças no documento
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  console.log('Correção definitiva do ícone Bootstrap inicializada');
});
