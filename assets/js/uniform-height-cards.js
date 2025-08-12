/**
 * Script para aplicar altura uniforme aos cards dos snippets
 * Compatível com Isotope e a estrutura atual
 */
document.addEventListener('DOMContentLoaded', function() {
  // Função para inicializar vídeos lazy quando clicados
  function initLazyVideos() {
    const lazyVideos = document.querySelectorAll('.video-lazy');
    
    lazyVideos.forEach(container => {
      if (container.getAttribute('data-initialized')) return;
      
      container.setAttribute('data-initialized', 'true');
      
      container.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video-id');
        if (!videoId) return;
        
        // Criar iframe do YouTube
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        // Substituir o conteúdo
        this.innerHTML = '';
        this.appendChild(iframe);
      });
    });
  }

  // Função para aplicar classes aos snippets existentes
  function applyUniformHeight() {
    // Aplicar aos snippets existentes
    const snippetItems = document.querySelectorAll('.portfolio-item.isotope-item');
    
    snippetItems.forEach(item => {
      const content = item.querySelector('.portfolio-content');
      if (content && !content.classList.contains('h-100')) {
        content.classList.add('h-100');
      }
    });

    // Inicializar vídeos lazy
    initLazyVideos();
    
    console.log('✓ Altura uniforme aplicada a', snippetItems.length, 'snippets');
  }
  
  // Função para aplicar altura uniforme a novos snippets
  function observeNewSnippets() {
    // Usar MutationObserver para detectar novos snippets
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            // Verificar se o node é um elemento e tem a classe portfolio-item
            if (node.nodeType === 1 && node.classList && 
                node.classList.contains('portfolio-item')) {
              shouldUpdate = true;
            }
          });
        }
      });
      
      if (shouldUpdate) {
        // Dar um tempo para o DOM ser renderizado completamente
        setTimeout(applyUniformHeight, 100);
      }
    });
    
    // Observar o container de snippets
    const container = document.querySelector('#dynamic-snippets-container') ||
                    document.querySelector('.isotope-container');
                    
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
      console.log('✓ Observer para novos snippets iniciado');
    }
  }
  
  // Aplicar inicialmente
  applyUniformHeight();
  
  // Observar mudanças futuras
  observeNewSnippets();
  
  // Re-aplicar quando o Isotope for recarregado
  document.addEventListener('isotope:reloaded', function() {
    setTimeout(applyUniformHeight, 200);
  });
  
  // Template para cards Bootstrap modernos
  window.createBootstrapCard = function(options) {
    const {
      imageUrl, 
      title, 
      text, 
      buttonText = 'Ver mais', 
      buttonUrl = '#', 
      videoId = null,
      badge = null,
      badgeText = 'Novo',
      badgeClass = 'bg-info text-dark'
    } = options;
    
    const cardEl = document.createElement('div');
    cardEl.className = 'col';
    
    // Estrutura base do card
    cardEl.innerHTML = `
      <div class="card h-100 shadow-sm card-uniform-height">
        ${videoId ? `
        <div class="ratio ratio-16x9 video-lazy" data-video-id="${videoId}" aria-label="Vídeo">
          <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Thumbnail do vídeo">
          <div class="video-play-btn"><i class="bi bi-play-circle-fill text-white" style="font-size:3rem;"></i></div>
        </div>
        ` : `
        <img src="${imageUrl}" class="card-img-top card-img-cover" alt="${title}">
        `}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${title}</h5>
          <p class="card-text small text-muted">${text}</p>
          <div class="mt-auto">
            <a href="${buttonUrl}" class="btn btn-sm btn-outline-primary">${buttonText}</a>
            ${badge ? `<span class="ms-2 badge ${badgeClass}">${badgeText}</span>` : ''}
          </div>
        </div>
      </div>
    `;
    
    initLazyVideos();
    
    return cardEl;
  };
});
