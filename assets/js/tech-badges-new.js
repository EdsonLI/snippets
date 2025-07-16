/**
 * Tech Badges - Sistema dinâmico para badges de tecnologia
 * Transforma spans com classes id-tech-* em badges estilizadas com ícones
 * 
 * @author GitHub Copilot
 * @version 1.0.1
 */
document.addEventListener('DOMContentLoaded', function() {
  // Mapeamento de tecnologias para seus respectivos ícones
  const TECH_ICONS = {
    // Tecnologias implementadas - usando versões coloridas (brandings originais)
    'sql': 'vscode-icons:file-type-sql', // Ícone do VS Code que deve ser mais confiável
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
    'madbuilder': 'fluent-emoji:hammer-and-wrench',
    
    // Tecnologias adicionais - versões coloridas
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
      
      // Adicionar a classe de badge
      span.classList.add('tech-badge', `tech-badge-${tech}`);
      
      // Caso especial para jQuery - usar um SVG customizado
      if (tech === 'jquery') {
        // Remover ícones existentes para jQuery
        const existingIcons = span.querySelectorAll('iconify-icon, .jquery-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento SVG para jQuery
        const jQueryIcon = document.createElement('span');
        jQueryIcon.className = 'jquery-icon tech-icon-custom';
        jQueryIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="16" height="16" style="aspect-ratio: 1/1;">
          <path fill="#0868AC" d="M9.625 32.181C-1.404 48.032-.031 68.657 8.394 85.501c.2.404.41.801.617 1.198l.394.759.246.437.439.786c.262.461.53.92.804 1.379l.459.756c.304.491.615.976.933 1.46l.398.614c.439.655.888 1.309 1.352 1.951l.039.05.228.308c.401.553.814 1.099 1.232 1.639l.464.59c.373.469.752.935 1.138 1.399l.435.52a75.27 75.27 0 001.586 1.812l.033.033.061.068a80.44 80.44 0 001.612 1.699l.517.521c.423.426.853.845 1.287 1.262l.527.5c.58.547 1.166 1.083 1.764 1.607l.028.022.307.262c.527.456 1.063.909 1.603 1.353l.664.529c.441.354.887.702 1.336 1.044l.714.543c.496.365.995.724 1.499 1.075l.546.387.15.107c.478.329.967.646 1.456.963l.63.42c.75.474 1.51.943 2.279 1.396l.63.355c.565.326 1.134.646 1.71.959.312.168.632.327.946.488.407.213.811.429 1.225.636l.283.137.501.242c.641.306 1.287.607 1.94.897l.41.184a66.92 66.92 0 002.263.941l.551.217c.704.271 1.418.539 2.135.791l.268.093c.787.275 1.581.53 2.381.779l.575.172c.814.245 1.619.538 2.458.693 53.339 9.727 68.833-32.053 68.833-32.053-13.013 16.953-36.111 21.425-57.996 16.446-.829-.187-1.633-.446-2.442-.685l-.609-.185a72.498 72.498 0 01-2.352-.765l-.323-.117a72.245 72.245 0 01-2.074-.769l-.582-.229c-.752-.297-1.5-.607-2.239-.931l-.447-.198a92.857 92.857 0 01-1.889-.879l-.546-.262c-.491-.239-.977-.493-1.461-.743-.324-.171-.654-.332-.975-.51a58.591 58.591 0 01-1.751-.982l-.591-.33a81.221 81.221 0 01-2.28-1.397l-.615-.41a59.283 59.283 0 01-1.623-1.079l-.522-.367a89.287 89.287 0 01-1.534-1.109l-.679-.514a64.473 64.473 0 01-1.384-1.082l-.617-.495a82.693 82.693 0 01-1.724-1.453l-.189-.159a83.466 83.466 0 01-1.812-1.647l-.511-.491c-.441-.42-.875-.843-1.302-1.277l-.51-.509a70.541 70.541 0 01-1.598-1.69l-.079-.084a67.39 67.39 0 01-1.621-1.844l-.424-.504a70.602 70.602 0 01-1.167-1.442l-.427-.532a78.406 78.406 0 01-1.347-1.794c-12.15-16.574-16.516-39.432-6.805-58.204m25.629-2.434c-7.977 11.478-7.543 26.844-1.321 38.983a50.581 50.581 0 003.528 5.889c1.195 1.713 2.52 3.751 4.106 5.127a48.111 48.111 0 001.79 1.858l.472.465a51.69 51.69 0 001.828 1.698l.074.064.018.018a55.268 55.268 0 002.135 1.767l.485.378a54.08 54.08 0 002.233 1.631l.065.049c.336.232.678.448 1.019.672l.483.319c.544.349 1.095.689 1.655 1.015l.235.136c.483.278.972.552 1.463.818l.521.271c.339.177.678.358 1.023.53l.155.07c.703.346 1.412.68 2.136.995l.472.194c.579.246 1.164.486 1.75.71l.75.275c.533.198 1.068.378 1.607.559l.727.233c.767.238 1.525.539 2.324.672 41.183 6.823 50.691-24.886 50.691-24.886-8.57 12.343-25.168 18.233-42.879 13.635a50.376 50.376 0 01-2.333-.674l-.701-.227a45.423 45.423 0 01-1.631-.562l-.736-.274a56.418 56.418 0 01-1.756-.708l-.473-.2a47.728 47.728 0 01-2.148-.999c-.363-.177-.72-.364-1.078-.548l-.622-.32a44.502 44.502 0 01-1.363-.77l-.326-.185a47.844 47.844 0 01-1.651-1.008l-.498-.332a61.759 61.759 0 01-1.069-.707 57.456 57.456 0 01-2.226-1.628l-.501-.395c-7.752-6.12-13.898-14.486-16.819-23.971-3.062-9.836-2.402-20.878 2.903-29.84m22.278-.775c-4.702 6.92-5.164 15.514-1.901 23.156 3.441 8.113 10.491 14.476 18.72 17.495.339.125.679.237 1.022.354l.451.143c.485.152.966.329 1.467.424 22.74 4.394 28.908-11.669 30.549-14.034-5.402 7.779-14.482 9.646-25.623 6.942-.88-.213-1.847-.531-2.695-.832a33.242 33.242 0 01-3.201-1.329 33.215 33.215 0 01-5.612-3.424c-9.969-7.565-16.162-21.994-9.657-33.745"></path>
        </svg>`;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(jQueryIcon, span.firstChild);
      } 
      // Caso especial para Isotope - usar a imagem personalizada
      else if (tech === 'isotope') {
        // Remover ícones existentes para Isotope
        const existingIcons = span.querySelectorAll('iconify-icon, .isotope-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento de imagem para o Isotope
        const isotopeIcon = document.createElement('img');
        isotopeIcon.className = 'isotope-icon tech-icon-custom';
        isotopeIcon.src = '/snippets/assets/img/isotope.png';
        isotopeIcon.alt = 'Isotope';
        isotopeIcon.width = 20;
        isotopeIcon.height = 20;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(isotopeIcon, span.firstChild);
      } else {
        // Para todas as outras tecnologias, continuar com o comportamento normal
        const icon = TECH_ICONS[tech] || 'mdi:code-tags';
        
        // Verificar se já existe um ícone antes de adicionar um novo
        const existingIcon = span.querySelector('iconify-icon');
        if (!existingIcon) {
          // Adicionar o ícone no início do texto
          const iconElement = document.createElement('iconify-icon');
          iconElement.setAttribute('icon', icon);
          iconElement.style.verticalAlign = 'middle';
          iconElement.setAttribute('width', '20px');
          iconElement.setAttribute('height', '20px');
          iconElement.style.backgroundColor = 'white';
          iconElement.style.borderRadius = '50%';
          iconElement.style.padding = '2px';
          iconElement.style.boxShadow = '0 0 2px rgba(0,0,0,0.2)';
          
          // Insere o ícone no DOM
          span.insertBefore(iconElement, span.firstChild);
        }
      }
      
      // Marcar como processado para evitar processamento duplicado
      span.setAttribute('data-tech-processed', 'true');
    });
  }

  // Inicializar as badges
  transformTechBadges();
  
  // Evento para recarregar ícones quando solicitado
  document.addEventListener('reload-tech-badges', function() {
    console.info('🔄 Processando ícones após evento de recarga...');
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
