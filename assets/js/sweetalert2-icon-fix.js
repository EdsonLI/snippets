/**
 * SweetAlert2 Icon Fix - Substitui o ícone padrão pelo SVG customizado
 * Mantém a estrutura do Iconify para preservar o círculo ao redor como os outros ícones
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para substituir o ícone do SweetAlert2
  function replaceSweetAlert2Icon() {
    // SVG personalizado do SweetAlert2 (versão compacta)
    const sweetAlert2SVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:24px;height:24px;margin:auto;">
        <g transform="scale(0.075) translate(0,0)">
          <circle cx="161.8" cy="27" r="100.2" fill="#fdcc80"/>
          <circle cx="149.4" cy="14.2" r="36.8" fill="#fff"/>
          <path d="M108.7 105.5c-6.6.3-31.9-13.4-42.4-49.5-1.9-6.6-4.5-16.8-4.5-29.6 0-55 44.6-99.6 99.6-99.6 13.1 0 23.5 2.7 29.6 4.5 34.4 10.4 48 34.1 44.9 40.5s-10.6-3.4-22.9-2.5c-1.4.1-4.2 4-4.2 6.2 0 7.2 13.5 12.7 14.6 15.9 1.7 5 3.4 6.2 2.3 9.5-1.5 4.8-2.9 3.6-5.2 5.9-.9.9-5.6.7-16.6-1.7-5.9-1.3-18-11.2-18-11.4 0-.4-16.2-13.3-30.2-14.8-6.6-.7-28.1-2.8-39.2 19.2-.5 1.1-4.4 20-4.2 22.5.9 11.9 7 24.7 12.1 27.5 11.7 6.4 12.9 14.7 12.8 14.4-.1-.4 7.8 14.7 8.2 17.3.3 2.1-.8 7.4-3.7 8.7-3.5 1.5-7.7-1.7-8.4-2.1-.8-.5-10.7-16.3-19.5-13.1-.8.3-6 3.7-7.6 5-.3.2 4.8 15.4 5.6 18.5.5 1.8-2.3 8.7-3.1 8.7z" opacity=".5" fill="#fa7471"/>
          <circle cx="149.1" cy="15" r="99.4" style="stroke-width:8.2;stroke:#8a3d9b;fill:none;stroke-miterlimit:10"/>
          <path d="M192.5 5.6c4.2-4.4 9.6.5 13.6 2.9 4 2.3 7.9 3.4 12.4 2.3 8.7-1.9 13.9-9.9 10.2-18.5-1.9-4.4-5.5-7.4-9.5-9.8-2.3-1.4-5.5-2.5-7-4.9-2.6-4.1 2.6-5.6 5.7-4.4 4.6 1.7 8.3 3.1 13.2 1.4 3.5-1.2 7.6-1.6 8.2-6.1.7-5.3-7.4-7.6-8.1-2.2-.1.2-.1.5-.2.7.8-.6 1.7-1.3 2.5-1.9-1.6.6-3.3 1-4.9 1.5-3.2 1-5.2-.1-8-1.3-4.2-1.6-8.7-1.6-12.6.9-8.9 5.9-4.6 16.6 2.8 21.3 3.9 2.5 10.3 4.7 10.5 10.2.2 6.1-7.6 5.7-11.2 3.6-7.7-4.5-16.2-9.3-23.7-1.6-3.6 3.9 2.3 9.8 6.1 5.9z" fill="#8a3d9b"/>
        </g>
      </svg>
    `;

    // Modifica o conteúdo interno dos elementos iconify-icon em vez de substituí-los
    document.querySelectorAll('iconify-icon[icon="logos:sweetalert2"]').forEach(icon => {
      // Esconder o ícone padrão
      icon.style.color = 'transparent';
      icon.style.position = 'relative';
      
      // Inserir nosso SVG personalizado dentro do elemento iconify-icon
      const svgContainer = document.createElement('div');
      svgContainer.style.position = 'absolute';
      svgContainer.style.top = '0';
      svgContainer.style.left = '0';
      svgContainer.style.width = '100%';
      svgContainer.style.height = '100%';
      svgContainer.style.display = 'flex';
      svgContainer.style.alignItems = 'center';
      svgContainer.style.justifyContent = 'center';
      svgContainer.innerHTML = sweetAlert2SVG;
      
      // Adiciona o SVG personalizado como filho do iconify-icon
      icon.appendChild(svgContainer);
    });
    
    // Observador de mutações para modificar ícones adicionados dinamicamente
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.tagName === 'ICONIFY-ICON') {
              if (node.getAttribute('icon') === 'logos:sweetalert2') {
                // Esconder o ícone padrão
                node.style.color = 'transparent';
                node.style.position = 'relative';
                
                // Inserir nosso SVG personalizado dentro do elemento iconify-icon
                const svgContainer = document.createElement('div');
                svgContainer.style.position = 'absolute';
                svgContainer.style.top = '0';
                svgContainer.style.left = '0';
                svgContainer.style.width = '100%';
                svgContainer.style.height = '100%';
                svgContainer.style.display = 'flex';
                svgContainer.style.alignItems = 'center';
                svgContainer.style.justifyContent = 'center';
                svgContainer.innerHTML = sweetAlert2SVG;
                
                // Adiciona o SVG personalizado como filho do iconify-icon
                node.appendChild(svgContainer);
              }
            }
          });
        }
      });
    });
    
    // Iniciar observação de mudanças no DOM
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Verificar se a página terminou de carregar antes de substituir os ícones
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(replaceSweetAlert2Icon, 500);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(replaceSweetAlert2Icon, 500);
    });
  }

  // Substituir ícones após o carregamento completo da página (para capturar ícones carregados dinamicamente)
  window.addEventListener('load', () => {
    setTimeout(replaceSweetAlert2Icon, 1000);
  });
});
