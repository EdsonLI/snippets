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
    // Tecnologias já implementadas
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
    'madbuilder': 'mdi:tools',
    
    // Tecnologias adicionais que você pode usar
    'react': 'logos:react',
    'vue': 'logos:vue',
    'angular': 'logos:angular-icon',
    'node': 'logos:nodejs-icon',
    'python': 'logos:python',
    'java': 'logos:java',
    'csharp': 'vscode-icons:file-type-csharp',
    'ruby': 'logos:ruby',
    'typescript': 'logos:typescript-icon',
    'graphql': 'logos:graphql',
    'mongodb': 'vscode-icons:file-type-mongo',
    'mysql': 'logos:mysql',
    'postgresql': 'logos:postgresql',
    'aws': 'logos:aws',
    'docker': 'logos:docker-icon',
    'kubernetes': 'logos:kubernetes',
    'laravel': 'logos:laravel',
    'dotnet': 'vscode-icons:file-type-dotnet',
    'flutter': 'logos:flutter'
  };

  // Função para transformar spans em badges
  function transformTechBadges() {
    // Encontrar todos os spans de tecnologia (formato id-tech-*) que ainda não foram processados
    const techSpans = document.querySelectorAll('[class*="id-tech-"]:not([data-tech-processed])');
    
    techSpans.forEach(span => {
      // Obter o tipo de tecnologia a partir da classe
      const classes = Array.from(span.classList);
      const techClass = classes.find(cls => cls.startsWith('id-tech-'));
      
      if (!techClass) return;
      
      const tech = techClass.replace('id-tech-', '').toLowerCase();
      const icon = TECH_ICONS[tech] || 'mdi:code-tags';
      
      // Adicionar a classe de badge
      span.classList.add('tech-badge', `tech-badge-${tech}`);
      
      // Verificar se já existe um ícone antes de adicionar um novo
      const existingIcon = span.querySelector('iconify-icon');
      if (!existingIcon) {
        // Adicionar o ícone no início do texto
        const iconElement = document.createElement('iconify-icon');
        iconElement.setAttribute('icon', icon);
        iconElement.style.verticalAlign = 'middle';
        span.insertBefore(iconElement, span.firstChild);
      }
      
      // Marcar como processado para evitar processamento duplicado
      span.setAttribute('data-tech-processed', 'true');
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
          if (node.nodeType === 1) {
            // Verificar se o próprio nó contém a classe id-tech-*
            if (node.classList && Array.from(node.classList).some(cls => cls.startsWith('id-tech-')) && !node.hasAttribute('data-tech-processed')) {
              shouldTransform = true;
            }
            // Verificar se algum filho contém a classe id-tech-*
            else if (node.querySelector && node.querySelector('[class*="id-tech-"]:not([data-tech-processed])')) {
              shouldTransform = true;
            }
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
