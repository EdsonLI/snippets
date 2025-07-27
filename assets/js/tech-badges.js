/**
 * Tech Badges - Sistema dinâmico para badges de tecnologia
 * Transforma spans com classes id-tech-* em badges estilizadas com ícones
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
  // Mapeamento de tecnologias para seus respectivos ícones coloridos
  const TECH_ICONS = {
    // Tecnologias já implementadas - usando versões coloridas (brandings originais)
    'sql': 'logos:sqlite',
    'html': 'logos:html-5',
    'css': 'logos:css-3',
    'javascript': 'logos:javascript',
    'js': 'logos:javascript',
    'php': 'logos:php',
    'bootstrap': 'logos:bootstrap',
    'jquery': 'logos:jquery',
    'git': 'logos:git-icon',
    'fontawesome': 'logos:font-awesome',
    'isotope': 'carbon:chart-network',
    'vscode': 'logos:visual-studio-code',
    'sweetalert2': 'logos:sweetalert2',
    'codepen': 'logos:codepen-icon',
    // 'madbuilder': removido para usar imagem estática
    
    // Tecnologias adicionais que você pode usar - versões coloridas
    'react': 'logos:react',
    'vue': 'logos:vue',
    'angular': 'logos:angular-icon',
    'node': 'logos:nodejs-icon',
    'python': 'logos:python',
    'java': 'logos:java',
    'csharp': 'logos:c-sharp',
    'ruby': 'logos:ruby',
    'typescript': 'logos:typescript-icon',
    'graphql': 'logos:graphql',
    'mongodb': 'logos:mongodb-icon',
    'mysql': 'logos:mysql',
    'postgresql': 'logos:postgresql',
    'aws': 'logos:aws',
    'docker': 'logos:docker-icon',
    'kubernetes': 'logos:kubernetes',
    'laravel': 'logos:laravel',
    'dotnet': 'logos:dotnet',
    'flutter': 'logos:flutter'
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
      
      // Caso especial para MadBuilder - usar uma imagem personalizada
      if (tech === 'madbuilder') {
        // Remover ícones existentes para MadBuilder
        const existingIcons = span.querySelectorAll('iconify-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Verificar se já existe a imagem personalizada
        const existingImage = span.querySelector('.madbuilder-icon');
        if (!existingImage) {
          // Criar um elemento de imagem para o MadBuilder
          const madbuilderIcon = document.createElement('img');
          madbuilderIcon.className = 'madbuilder-icon';
          madbuilderIcon.src = '/snippets/assets/img/madbuilder.png';
          madbuilderIcon.alt = 'MadBuilder';
          madbuilderIcon.width = 20;
          madbuilderIcon.height = 20;
          madbuilderIcon.style.marginRight = '4px';
          madbuilderIcon.style.verticalAlign = 'middle';
          madbuilderIcon.style.borderRadius = '50%';
          
          // Inserir a imagem no DOM antes do texto
          span.insertBefore(madbuilderIcon, span.firstChild);
        }
        
        // Marcar como processado para evitar processamento duplicado
        span.setAttribute('data-tech-processed', 'true');
        
        // Pular o resto do processamento para este span
        return;
      }
      
      // Adicionar a classe de badge
      span.classList.add('tech-badge', `tech-badge-${tech}`);
      
      // Verificar se já existe um ícone antes de adicionar um novo
      const existingIcon = span.querySelector('iconify-icon');
      if (!existingIcon) {
        // Adicionar o ícone no início do texto
        const iconElement = document.createElement('iconify-icon');
        iconElement.setAttribute('icon', icon);
        iconElement.style.verticalAlign = 'middle';
        // Define tamanho adequado para os ícones coloridos
        iconElement.setAttribute('width', '18px');
        iconElement.setAttribute('height', '18px');
        // Adiciona classes para estilização
        iconElement.classList.add('icon-tech', `icon-tech-${tech}`);
        
        // Mantém as cores originais dos ícones para mostrar os brandings coloridos
        // Apenas ajusta o JavaScript que precisa ser escuro devido ao fundo amarelo
        if (tech === 'javascript' || tech === 'js') {
          iconElement.style.color = '#323330';
        }
        // Demais tecnologias usam suas cores originais de branding
        
        // Insere o ícone no DOM
        span.insertBefore(iconElement, span.firstChild);
      }
      
      // Marcar como processado para evitar processamento duplicado
      span.setAttribute('data-tech-processed', 'true');
    });
  }

  // Inicializar as badges
  transformTechBadges();
  
  // Evento customizado para recarregar os ícones
  document.addEventListener('reload-tech-badges', function() {
    transformTechBadges();
  });
  
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
