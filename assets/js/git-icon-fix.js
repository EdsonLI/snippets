/**
 * Script específico para inserir o ícone do Git
 * Insere SVG diretamente no DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  // Primeiro remover qualquer ícone Git incorretamente posicionado
  const removeBadIcons = function() {
    // Seletor específico - apenas para ícones diretamente dentro do container de filtro
    const badIcons = document.querySelectorAll('.filter-git > .git-icon-wrapper');
    if (badIcons.length > 0) {
      badIcons.forEach(icon => icon.remove());
    }
  };

  // Aguardar um momento para garantir que outros scripts já foram carregados
  setTimeout(function() {
    // Primeiro limpamos ícones mal posicionados
    removeBadIcons();
    
    // SVG para o ícone Git (definido em um único lugar para fácil manutenção)
    const gitSvgContent = `
      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" class="git-icon-svg">
        <path d="M251.172 116.594L139.4 4.828c-6.433-6.437-16.873-6.437-23.314 0l-23.21 23.21 29.443 29.443c6.842-2.312 14.688-.761 20.142 4.693 5.48 5.489 7.02 13.402 4.652 20.266l28.375 28.376c6.865-2.365 14.786-.835 20.269 4.657 7.663 7.66 7.663 20.075 0 27.74-7.665 7.666-20.08 7.666-27.749 0-5.764-5.77-7.188-14.235-4.27-21.336l-26.462-26.462-.003 69.637a19.82 19.82 0 0 1 5.188 3.71c7.663 7.66 7.663 20.076 0 27.747-7.665 7.662-20.086 7.662-27.74 0-7.663-7.671-7.663-20.086 0-27.746a19.654 19.654 0 0 1 6.421-4.281V94.196a19.378 19.378 0 0 1-6.421-4.281c-5.806-5.798-7.202-14.317-4.227-21.446L81.47 39.442l-76.64 76.635c-6.44 6.443-6.44 16.884 0 23.322l111.774 111.768c6.435 6.438 16.873 6.438 23.316 0l111.251-111.249c6.438-6.44 6.438-16.887 0-23.324" fill="#DE4C36"></path>
      </svg>
    `;
    
    // Função para limpar e inserir o ícone Git
    function applyGitIcon(element) {
      // Primeiro remover qualquer iconify-icon ou outros elementos Git existentes
      const existingIcons = element.querySelectorAll('iconify-icon, .git-icon-wrapper');
      existingIcons.forEach(icon => icon.remove());
      
      // Criar o wrapper para o ícone Git
      const wrapper = document.createElement('span');
      wrapper.className = 'git-icon-wrapper';
      wrapper.innerHTML = gitSvgContent;
      
      // Inserir no início do elemento
      if (element.firstChild) {
        element.insertBefore(wrapper, element.firstChild);
      } else {
        element.appendChild(wrapper);
      }
    }
    
    // Função específica para os títulos dos snippets
    function applyGitIconToSnippets() {
      // Obter todos os spans com classe id-tech-git (títulos dos snippets)
      const gitTitleSpans = document.querySelectorAll('.id-tech-git');
      
      gitTitleSpans.forEach(span => {
        // Verificar se já tem um ícone Git dentro (para não duplicar)
        const hasIcon = span.querySelector('.git-icon-wrapper');
        if (hasIcon) {
          return;
        }

        // Remover outros ícones existentes (iconify, etc)
        const existingIcons = span.querySelectorAll('iconify-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar e inserir o novo ícone
        const wrapper = document.createElement('span');
        wrapper.className = 'git-icon-wrapper';
        wrapper.innerHTML = gitSvgContent;
        
        // Inserir o ícone antes do texto
        span.insertBefore(wrapper, span.firstChild);
      });
    }
    
    // Aplicar aos badges normais (apenas quando não estão dentro de id-tech-git)
    const gitBadges = document.querySelectorAll('.tech-badge-git:not(.id-tech-git .tech-badge-git)');
    
    gitBadges.forEach(badge => {
      applyGitIcon(badge);
    });
    
    // Aplicar aos filtros do menu de forma segura - apenas aqueles que NÃO contêm já um ícone Git
    const gitFilters = document.querySelectorAll('.portfolio-filters li.filter-git');
    
    gitFilters.forEach(filter => {
      // Verificar se já tem um ícone Git dentro (para não duplicar)
      const hasIcon = filter.querySelector('.git-icon-wrapper');
      if (!hasIcon) {
        // Criar e inserir o novo ícone
        const wrapper = document.createElement('span');
        wrapper.className = 'git-icon-wrapper';
        wrapper.innerHTML = gitSvgContent;
        
        // Inserir o ícone no início do elemento do filtro
        filter.insertBefore(wrapper, filter.firstChild);
      }
    });
    
    // Aplicar aos títulos dos snippets
    applyGitIconToSnippets();
    
    // Garantir que não fiquem ícones flutuantes fora do lugar
    removeBadIcons();
    
    // Remover depois de um tempo também (para casos onde o DOM muda)
    setTimeout(removeBadIcons, 1000);
    
    // Executar novamente após o carregamento completo da página e após eventos de isotope
    window.addEventListener('load', function() {
      setTimeout(function() {
        removeBadIcons();
        applyGitIconToSnippets();
      }, 1000);
    });
    
    // Se existir o evento isotope (layout completo), reaplique os ícones
    document.addEventListener('isotope:arranged', function() {
      setTimeout(function() {
        removeBadIcons();
        applyGitIconToSnippets();
      }, 500);
    });
    
  }, 500);
});
