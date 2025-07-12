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

  // Função para calcular o contraste adequado para ícones
  function getIconContrastClass(tech) {
    // Todas as tecnologias agora usam o mesmo estilo de fundo escuro
    // para garantir que os ícones brancos tenham bom contraste
    
    // Tecnologias com fundos muito escuros que precisam de ajuste na opacidade
    const veryDarkBackgrounds = ['codepen', 'typescript', 'angular', 'vscode'];
    
    if (veryDarkBackgrounds.includes(tech)) {
      return 'icon-very-dark-bg';
    }
    
    // Tecnologias com fundos claros que precisam de fundo escuro para contraste
    const lightBackgrounds = ['javascript', 'js', 'react', 'vue'];
    
    if (lightBackgrounds.includes(tech)) {
      return 'icon-dark-bg';
    }
    
    // Padrão para a maioria das tecnologias
    return 'icon-default-bg';
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
        // Força cor branca em diferentes propriedades
        iconElement.style.color = 'white';
        iconElement.style.fill = 'white';
        // Define atributos específicos para o Iconify
        iconElement.setAttribute('width', '1em');
        iconElement.setAttribute('height', '1em');
        // Adiciona atributos customizados para controlar cores
        iconElement.setAttribute('data-force-white', 'true');
        // Adiciona classes para estilização
        iconElement.classList.add('icon-tech', `icon-tech-${tech}`, getIconContrastClass(tech), 'force-white-icon');
        
        // Insere o ícone no DOM
        span.insertBefore(iconElement, span.firstChild);
        
        // Adiciona um evento para quando o ícone for carregado para aplicar filtro de branqueamento
        iconElement.addEventListener('load', () => {
          // Obtém o SVG interno
          const svg = iconElement.querySelector('svg');
          if (svg) {
            // Forçar branco em todos os elementos internos do SVG
            svg.style.color = 'white';
            svg.style.fill = 'white';
            
            // Aplicar atributos diretamente ao SVG
            svg.setAttribute('fill', 'white');
            
            // Aplicar a todos os elementos internos do SVG
            const elements = svg.querySelectorAll('*');
            elements.forEach(el => {
              el.style.fill = 'white';
              el.style.stroke = 'white';
              el.setAttribute('fill', 'white');
            });
          }
        });
      }
      
      // Marcar como processado para evitar processamento duplicado
      span.setAttribute('data-tech-processed', 'true');
    });
  }

  // Função para processar ícones após o carregamento completo da página
  function processIcons() {
    // Processa todos os ícones iconify no documento
    document.querySelectorAll('.tech-badge iconify-icon').forEach(icon => {
      // Garante que todos os ícones tenham a classe force-white-icon
      icon.classList.add('force-white-icon');
      
      // Força estilo inline para garantir que seja aplicado
      icon.style.filter = 'brightness(0) invert(1)';
      icon.style.webkitFilter = 'brightness(0) invert(1)';
      icon.style.color = 'white';
      
      // Obtém o SVG interno
      const svg = icon.querySelector('svg');
      if (svg) {
        // Aplica estilos diretamente ao SVG
        svg.style.color = 'white';
        svg.style.fill = 'white';
        svg.setAttribute('fill', 'white');
        svg.style.filter = 'brightness(0) invert(1)';
        
        // Aplica a todos os elementos internos
        const elements = svg.querySelectorAll('*');
        elements.forEach(el => {
          el.style.fill = 'white';
          el.style.stroke = 'white';
          el.setAttribute('fill', 'white');
        });
      }
    });
  }

  // Função para aplicar mascaramento nos ícones para garantir cor branca
  function applyIconMasks() {
    document.querySelectorAll('.tech-badge iconify-icon').forEach(icon => {
      // Aguarda o Iconify carregar o ícone
      icon.addEventListener('load', () => {
        const svg = icon.querySelector('svg');
        if (svg) {
          // Cria uma URL do SVG para usar como máscara
          const svgString = new XMLSerializer().serializeToString(svg);
          const svgUrl = 'url("data:image/svg+xml;charset=utf8,' + 
                          encodeURIComponent(svgString) + '")';
          
          // Aplica a máscara diretamente no elemento
          icon.style.setProperty('--icon-mask', svgUrl);
          icon.classList.add('masked');
          
          // Também força o filtro para garantir
          icon.style.filter = 'brightness(0) invert(1)';
        }
      });
    });
  }
  
  // Inicializar as badges
  transformTechBadges();
  
  // Processa os ícones após um pequeno delay para garantir que foram carregados
  setTimeout(processIcons, 500);
  
  // Executa a aplicação de máscaras depois de um tempo para garantir que o Iconify carregou
  setTimeout(applyIconMasks, 1000);
  
  // Também processa quando a página estiver completamente carregada
  window.addEventListener('load', processIcons);
  
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
