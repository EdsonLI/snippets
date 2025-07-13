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
    // Tecnologias já implementadas - usando versões monocromáticas
    'sql': 'simple-icons:sqlite',
    'html': 'mdi:language-html5',
    'css': 'mdi:language-css3',
    'javascript': 'mdi:language-javascript',
    'js': 'mdi:language-javascript',
    'php': 'mdi:language-php',
    'bootstrap': 'mdi:bootstrap',
    'jquery': 'simple-icons:jquery',
    'git': 'mdi:git',
    'fontawesome': 'mdi:font-awesome',
    'isotope': 'mdi:view-grid',
    'vscode': 'mdi:microsoft-visual-studio-code',
    'sweetalert2': 'mdi:alert-circle-outline',
    'codepen': 'mdi:codepen',
    'madbuilder': 'mdi:tools',
    
    // Tecnologias adicionais que você pode usar - versões monocromáticas
    'react': 'mdi:react',
    'vue': 'mdi:vuejs',
    'angular': 'mdi:angular',
    'node': 'mdi:nodejs',
    'python': 'mdi:language-python',
    'java': 'mdi:language-java',
    'csharp': 'mdi:language-csharp',
    'ruby': 'mdi:language-ruby',
    'typescript': 'mdi:language-typescript',
    'graphql': 'mdi:graphql',
    'mongodb': 'simple-icons:mongodb',
    'mysql': 'mdi:database',
    'postgresql': 'simple-icons:postgresql',
    'aws': 'mdi:aws',
    'docker': 'mdi:docker',
    'kubernetes': 'mdi:kubernetes',
    'laravel': 'mdi:laravel',
    'dotnet': 'mdi:dot-net',
    'flutter': 'mdi:flutter'
  };

  // Função simplificada para trabalhar com ícones
  function getIconClass(tech) {
    return `icon-tech-${tech}`;
  }

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
        // Define tamanho adequado
        iconElement.setAttribute('width', '1em');
        iconElement.setAttribute('height', '1em');
        // Adiciona classes para estilização
        iconElement.classList.add('icon-tech', `icon-tech-${tech}`);
        
        // Define a cor do ícone com base na tecnologia
        if (tech === 'javascript' || tech === 'js') {
          iconElement.style.color = '#323330';
        } else {
          iconElement.style.color = 'white';
        }
        
        // Insere o ícone no DOM
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
