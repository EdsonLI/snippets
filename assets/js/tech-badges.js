/**
 * Tech Badges - Sistema dinâmico para badges de tecnologia
 * Transforma spans com classes id-tech-* em badges estilizadas com ícones
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
  // Mapeamento de tecnologias para seus respectivos ícones
  const TECH_ICONS = {
    'sql': 'vscode-icons:file-type-sql',
    'html': 'vscode-icons:file-type-html',
    'css': 'vscode-icons:file-type-css',
    'javascript': 'logos:javascript',
    'js': 'logos:javascript',
    'php': 'vscode-icons:file-type-php',
    'bootstrap': 'logos:bootstrap',
    'jquery': 'logos:jquery',
    'git': 'logos:git-icon',
    'fontawesome': 'logos:font-awesome',
    'isotope': 'carbon:chart-network',
    'vscode': 'vscode-icons:file-type-vscode',
    'sweetalert2': 'ion:alert-circle-outline',
    'codepen': 'logos:codepen-icon',
    'madbuilder': 'mdi:tools'
  };

  // Função para transformar spans em badges
  function transformTechBadges() {
    // Encontrar todos os spans de tecnologia (formato id-tech-*)
    const techSpans = document.querySelectorAll('[class*="id-tech-"]');
    
    techSpans.forEach(span => {
      // Obter o tipo de tecnologia a partir da classe
      const classes = Array.from(span.classList);
      const techClass = classes.find(cls => cls.startsWith('id-tech-'));
      
      if (!techClass) return;
      
      const tech = techClass.replace('id-tech-', '').toLowerCase();
      const icon = TECH_ICONS[tech] || 'mdi:code-tags';
      
      // Adicionar a classe de badge
      span.classList.add('tech-badge', `tech-badge-${tech}`);
      
      // Adicionar o ícone ao final do texto
      const iconElement = document.createElement('iconify-icon');
      iconElement.setAttribute('icon', icon);
      iconElement.style.verticalAlign = 'middle';
      span.appendChild(iconElement);
    });
  }

  // Inicializar as badges
  transformTechBadges();
  
  // Para suportar carregamento dinâmico de conteúdo
  // Observe o DOM para novos elementos
  const observer = new MutationObserver(mutations => {
    let shouldTransform = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.querySelector('[class*="id-tech-"]')) {
            shouldTransform = true;
          }
        });
      }
    });
    
    if (shouldTransform) {
      transformTechBadges();
    }
  });
  
  // Configurar o observer para monitorar adições de nós em todo o documento
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.info('✅ Tech Badges: Sistema inicializado com sucesso!');
});
