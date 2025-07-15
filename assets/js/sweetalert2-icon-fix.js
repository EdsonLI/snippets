/**
 * SweetAlert2 Icon Fix - Substitui o ícone padrão pelo SVG customizado
 * Mantém a aparência similar aos outros ícones com círculo ao redor
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para substituir o ícone do SweetAlert2
  function replaceSweetAlert2Icon() {
    // SVG personalizado do SweetAlert2 (versão otimizada)
    const sweetAlert2SVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200">
        <g transform="translate(100, 100) scale(0.75) translate(-150, -15)">
          <!-- Fundo laranja claro -->
          <circle cx="161.8" cy="27" r="100.2" fill="#fdcc80"/>
          <!-- Círculo interno branco -->
          <circle cx="149.4" cy="14.2" r="36.8" fill="#fff"/>
          <!-- Cobertura rosa -->
          <path d="M108.7 105.5c-6.6.3-31.9-13.4-42.4-49.5-1.9-6.6-4.5-16.8-4.5-29.6 0-55 44.6-99.6 99.6-99.6 13.1 0 23.5 2.7 29.6 4.5 34.4 10.4 48 34.1 44.9 40.5s-10.6-3.4-22.9-2.5c-1.4.1-4.2 4-4.2 6.2 0 7.2 13.5 12.7 14.6 15.9 1.7 5 3.4 6.2 2.3 9.5-1.5 4.8-2.9 3.6-5.2 5.9-.9.9-5.6.7-16.6-1.7-5.9-1.3-18-11.2-18-11.4 0-.4-16.2-13.3-30.2-14.8-6.6-.7-28.1-2.8-39.2 19.2-.5 1.1-4.4 20-4.2 22.5.9 11.9 7 24.7 12.1 27.5 11.7 6.4 12.9 14.7 12.8 14.4-.1-.4 7.8 14.7 8.2 17.3.3 2.1-.8 7.4-3.7 8.7-3.5 1.5-7.7-1.7-8.4-2.1-.8-.5-10.7-16.3-19.5-13.1-.8.3-6 3.7-7.6 5-.3.2 4.8 15.4 5.6 18.5.5 1.8-2.3 8.7-3.1 8.7z" opacity=".5" fill="#fa7471"/>
          <!-- Borda roxa -->
          <circle cx="149.1" cy="15" r="99.4" style="stroke-width:8.2;stroke:#8a3d9b;fill:none;stroke-miterlimit:10"/>
          <!-- Detalhe roxo -->
          <path d="M192.5 5.6c4.2-4.4 9.6.5 13.6 2.9 4 2.3 7.9 3.4 12.4 2.3 8.7-1.9 13.9-9.9 10.2-18.5-1.9-4.4-5.5-7.4-9.5-9.8-2.3-1.4-5.5-2.5-7-4.9-2.6-4.1 2.6-5.6 5.7-4.4 4.6 1.7 8.3 3.1 13.2 1.4 3.5-1.2 7.6-1.6 8.2-6.1.7-5.3-7.4-7.6-8.1-2.2-.1.2-.1.5-.2.7.8-.6 1.7-1.3 2.5-1.9-1.6.6-3.3 1-4.9 1.5-3.2 1-5.2-.1-8-1.3-4.2-1.6-8.7-1.6-12.6.9-8.9 5.9-4.6 16.6 2.8 21.3 3.9 2.5 10.3 4.7 10.5 10.2.2 6.1-7.6 5.7-11.2 3.6-7.7-4.5-16.2-9.3-23.7-1.6-3.6 3.9 2.3 9.8 6.1 5.9z" fill="#8a3d9b"/>
        </g>
      </svg>
    `;

    // Mapear todos os locais onde o ícone SweetAlert2 é usado
    let sweetAlertIconsLocations = [];
    
    // Encontrar todos os elementos com o ícone SweetAlert2
    document.querySelectorAll('iconify-icon[icon="logos:sweetalert2"]').forEach(icon => {
      // Armazenar a referência ao pai e a posição do ícone entre os filhos do pai
      const parent = icon.parentNode;
      const index = Array.from(parent.children).indexOf(icon);
      sweetAlertIconsLocations.push({ parent, index });
      
      // Remover o ícone original para evitar duplicação
      parent.removeChild(icon);
    });
    
    // Agora inserir nosso ícone personalizado em cada local mapeado
    sweetAlertIconsLocations.forEach(location => {
      const container = document.createElement('div');
      container.className = 'custom-sweetalert2-icon';
      container.style.display = 'inline-flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.width = '24px';
      container.style.height = '24px';
      container.style.borderRadius = '50%';
      container.style.backgroundColor = 'rgba(138, 61, 155, 0.1)';
      container.style.padding = '2px';
      
      // Inserir o SVG personalizado
      container.innerHTML = sweetAlert2SVG;
      
      // Inserir o container na mesma posição do ícone original
      const nextSibling = location.parent.children[location.index];
      if (nextSibling) {
        location.parent.insertBefore(container, nextSibling);
      } else {
        location.parent.appendChild(container);
      }
    });
    
    // Observador de mutações para substituir ícones adicionados dinamicamente
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              // Verificar se o próprio nó é um iconify com o ícone que queremos substituir
              if (node.tagName === 'ICONIFY-ICON' && node.getAttribute('icon') === 'logos:sweetalert2') {
                const parent = node.parentNode;
                const nextSibling = node.nextSibling;
                
                // Criar o contêiner personalizado
                const container = document.createElement('div');
                container.className = 'custom-sweetalert2-icon';
                container.style.display = 'inline-flex';
                container.style.alignItems = 'center';
                container.style.justifyContent = 'center';
                container.style.width = '24px';
                container.style.height = '24px';
                container.style.borderRadius = '50%';
                container.style.backgroundColor = 'rgba(138, 61, 155, 0.1)';
                container.style.padding = '2px';
                container.innerHTML = sweetAlert2SVG;
                
                // Remover o nó original e inserir o nosso personalizado
                if (parent) {
                  parent.removeChild(node);
                  if (nextSibling) {
                    parent.insertBefore(container, nextSibling);
                  } else {
                    parent.appendChild(container);
                  }
                }
              } else {
                // Procurar por iconify dentro do nó adicionado
                const icons = node.querySelectorAll('iconify-icon[icon="logos:sweetalert2"]');
                icons.forEach(icon => {
                  const parent = icon.parentNode;
                  const nextSibling = icon.nextSibling;
                  
                  // Criar o contêiner personalizado
                  const container = document.createElement('div');
                  container.className = 'custom-sweetalert2-icon';
                  container.style.display = 'inline-flex';
                  container.style.alignItems = 'center';
                  container.style.justifyContent = 'center';
                  container.style.width = '24px';
                  container.style.height = '24px';
                  container.style.borderRadius = '50%';
                  container.style.backgroundColor = 'rgba(138, 61, 155, 0.1)';
                  container.style.padding = '2px';
                  container.innerHTML = sweetAlert2SVG;
                  
                  // Remover o ícone original e inserir o nosso personalizado
                  if (parent) {
                    parent.removeChild(icon);
                    if (nextSibling) {
                      parent.insertBefore(container, nextSibling);
                    } else {
                      parent.appendChild(container);
                    }
                  }
                });
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
