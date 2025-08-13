/**
 * Script para resolver definitivamente o problema do ícone do Bootstrap
 * Detecta e substitui o SVG antigo pelo novo em qualquer lugar onde apareça
 */
document.addEventListener('DOMContentLoaded', function() {
  // Esta função vai substituir TODOS os SVGs antigos do Bootstrap pelos novos
  function substituirTodosIconesBootstrap() {    
    // O novo ícone de Bootstrap que vamos usar - EXATAMENTE o que foi solicitado
    const novoSvgBootstrap = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bootstrap-icon-svg">
      <path fill="#7952B3" d="M333.5,201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4,238.2,333.5,225,333.5,201.4z M517,188.6 c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1,0-55.8,28.1-54.7,58.5c1,29.3-0.3,67.2-9.8,98.1 c-9.6,31-25.7,50.6-52.2,53.1v28.5c26.4,2.5,42.6,22.1,52.2,53.1c9.5,30.9,10.9,68.8,9.8,98.1c-1.1,30.5,22.7,58.5,54.7,58.5h328.7 c32.1,0,55.8-28.1,54.7-58.5c-1-29.3,0.3-67.2,9.8-98.1c9.6-31,25.7-50.6,52.1-53.1v-28.5C542.7,239.2,526.5,219.6,517,188.6z M300.2,375.1h-97.9V136.8h97.4c43.4,0,71.7,23.4,71.7,59.4c0,25.3-19.1,47.9-43.5,51.8v1.3c33.2,3.6,55.5,26.6,55.5,58.3 C383.4,349.7,352.1,375.1,300.2,375.1z M290.2,266.4h-50.1v78.4h52.3c34.2,0,52.3-13.7,52.3-39.5 C344.7,279.6,326.1,266.4,290.2,266.4z"/>
    </svg>`;
    
    // 1. Substituir SVGs no HTML codificado - encontra todos os SVGs Bootstrap antigos
    const elementos = document.querySelectorAll('.id-tech-bootstrap svg.bootstrap-icon-svg');
    
    elementos.forEach((elemento, index) => {
      // Verifica se é o SVG antigo pelo viewBox
      if (elemento.getAttribute('viewBox') === '0 0 118 94') {
        // Substitui o elemento pelo novo SVG
        const novoElemento = document.createElement('div');
        novoElemento.innerHTML = novoSvgBootstrap;
        const novoSvg = novoElemento.firstChild;
        elemento.parentNode.replaceChild(novoSvg, elemento);
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
});
