/**
 * Script específico para inserir o ícone do PHP
 * Insere SVG diretamente no DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  // Primeiro remover qualquer ícone PHP incorretamente posicionado
  const removeBadIcons = function() {
    // Seletor específico - apenas para ícones diretamente dentro do container de filtro
    const badIcons = document.querySelectorAll('.filter-php > .php-icon-wrapper');
    if (badIcons.length > 0) {
      badIcons.forEach(icon => icon.remove());
    }
  };

  // Aguardar um momento para garantir que outros scripts já foram carregados
  setTimeout(function() {
    // Primeiro limpamos ícones mal posicionados
    removeBadIcons();
    
    // SVG para o ícone PHP (definido em um único lugar para fácil manutenção)
    const phpSvgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="PHP" role="img" viewBox="0 0 512 512" class="php-icon-svg">
        <path d="m0 0H512V512H0" fill="#777bb3"/>
        <g stroke="#fff" stroke-width="6">
          <path id="a" d="M168 256c2-16 3-26-24-26H126l-11 53h18c18 0 31-8 35-27Zm-13-54c51 0 55 31 50 56s-26 53-68 53H110l-7 35s0 2-3 2H70s-3 0-3-3L94 204a3 3 0 013-2h58Z"/>
          <path d="M304 312c5 0 5-3 5-3l13-69c3-20-6-37-42-37H254l7-34s1-3-2-3H229c-4 0-4 2-4 2L197 309s0 3 3 3h29c4 0 4-3 4-3l15-78h18c24-1 18 7 18 15l-12 61s-1 4 3 4Z"/>
          <use xlink:href="#a" x="239"/>
        </g>
      </svg>
    `;
    
    // Função para limpar e inserir o ícone PHP
    function applyPhpIcon(element) {
      // Primeiro remover qualquer iconify-icon ou outros elementos PHP existentes
      const existingIcons = element.querySelectorAll('iconify-icon, .php-icon-wrapper');
      existingIcons.forEach(icon => icon.remove());
      
      // Criar o wrapper para o ícone PHP
      const wrapper = document.createElement('span');
      wrapper.className = 'php-icon-wrapper';
      wrapper.innerHTML = phpSvgContent;
      
      // Inserir no início do elemento
      if (element.firstChild) {
        element.insertBefore(wrapper, element.firstChild);
      } else {
        element.appendChild(wrapper);
      }
    }
    
    // Função específica para os títulos dos snippets
    function applyPhpIconToSnippets() {
      // Obter todos os spans com classe id-tech-php (títulos dos snippets)
      const phpTitleSpans = document.querySelectorAll('.id-tech-php');
      
      phpTitleSpans.forEach(span => {
        // Verificar se já tem um ícone PHP dentro (para não duplicar)
        const hasIcon = span.querySelector('.php-icon-wrapper');
        if (hasIcon) {
          return;
        }

        // Remover outros ícones existentes (iconify, etc)
        const existingIcons = span.querySelectorAll('iconify-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar e inserir o novo ícone
        const wrapper = document.createElement('span');
        wrapper.className = 'php-icon-wrapper';
        wrapper.innerHTML = phpSvgContent;
        
        // Inserir o ícone antes do texto
        span.insertBefore(wrapper, span.firstChild);
      });
    }
    
    // Aplicar aos badges normais (apenas quando não estão dentro de id-tech-php)
    const phpBadges = document.querySelectorAll('.tech-badge-php:not(.id-tech-php .tech-badge-php)');
    
    phpBadges.forEach(badge => {
      applyPhpIcon(badge);
    });
    
    // Aplicar aos filtros do menu de forma segura - apenas aqueles que NÃO contêm já um ícone PHP
    const phpFilters = document.querySelectorAll('.portfolio-filters li.filter-php');
    
    phpFilters.forEach(filter => {
      // Verificar se já tem um ícone PHP dentro (para não duplicar)
      const hasIcon = filter.querySelector('.php-icon-wrapper');
      if (!hasIcon) {
        // Criar e inserir o novo ícone
        const wrapper = document.createElement('span');
        wrapper.className = 'php-icon-wrapper';
        wrapper.innerHTML = phpSvgContent;
        
        // Inserir o ícone no início do elemento do filtro
        filter.insertBefore(wrapper, filter.firstChild);
      }
    });
    
    // Aplicar aos títulos dos snippets
    applyPhpIconToSnippets();
    
    // Garantir que não fiquem ícones flutuantes fora do lugar
    removeBadIcons();
    
    // Remover depois de um tempo também (para casos onde o DOM muda)
    setTimeout(removeBadIcons, 1000);
    
    // Executar novamente após o carregamento completo da página e após eventos de isotope
    window.addEventListener('load', function() {
      setTimeout(function() {
        removeBadIcons();
        applyPhpIconToSnippets();
      }, 1000);
    });
    
    // Se existir o evento isotope (layout completo), reaplique os ícones
    document.addEventListener('isotope:arranged', function() {
      setTimeout(function() {
        removeBadIcons();
        applyPhpIconToSnippets();
      }, 500);
    });
  }, 500);
});
