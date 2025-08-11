/**
 * Script específico para inserir o ícone do PHP
 * Insere SVG diretamente no DOM - Versão simplificada sem wrappers
 */
document.addEventListener('DOMContentLoaded', function() {
  // Primeiro remover qualquer ícone PHP incorretamente posicionado
  const removeBadIcons = function() {
    // Seletor específico - apenas para ícones diretamente dentro do container de filtro
    const badIcons = document.querySelectorAll('.filter-php > svg.php-icon-svg');
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
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="PHP" role="img" viewBox="0 0 512 512" class="php-icon-svg" shape-rendering="crispEdges" style="border-radius: 50%; background-color: white; padding: 2px; box-shadow: 0 0 2px rgba(0,0,0,0.2); width: 1.5em; height: 1.5em; vertical-align: middle; margin-right: 0.3rem;">
        <rect x="0" y="0" width="512" height="512" fill="#777bb3" style="border-radius: 50%;"/>
        <g stroke="#fff" stroke-width="6">
          <path id="a" d="M168 256c2-16 3-26-24-26H126l-11 53h18c18 0 31-8 35-27Zm-13-54c51 0 55 31 50 56s-26 53-68 53H110l-7 35s0 2-3 2H70s-3 0-3-3L94 204a3 3 0 013-2h58Z"/>
          <path d="M304 312c5 0 5-3 5-3l13-69c3-20-6-37-42-37H254l7-34s1-3-2-3H229c-4 0-4 2-4 2L197 309s0 3 3 3h29c4 0 4-3 4-3l15-78h18c24-1 18 7 18 15l-12 61s-1 4 3 4Z"/>
          <use xlink:href="#a" x="239"/>
        </g>
      </svg>
    `;
    
    // Função para limpar e inserir o ícone PHP
    function applyPhpIcon(element) {
      // Primeiro remover qualquer iconify-icon ou ícones SVG PHP existentes
      const existingIcons = element.querySelectorAll('iconify-icon, svg.php-icon-svg');
      existingIcons.forEach(icon => icon.remove());
      
      // Inserir o SVG diretamente sem wrapper
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = phpSvgContent.trim();
      const svgElement = tempDiv.firstChild;
      
      // Inserir no início do elemento
      if (element.firstChild) {
        element.insertBefore(svgElement, element.firstChild);
      } else {
        element.appendChild(svgElement);
      }
    }
    
    // Função específica para os títulos dos snippets
    function applyPhpIconToSnippets() {
      // Obter todos os spans com classe id-tech-php (títulos dos snippets)
      const phpTitleSpans = document.querySelectorAll('.id-tech-php');
      
      phpTitleSpans.forEach(span => {
        // Verificar se já tem um ícone SVG PHP dentro (para não duplicar)
        const hasIcon = span.querySelector('svg.php-icon-svg');
        if (hasIcon) {
          return;
        }

        // Remover outros ícones existentes (iconify, etc)
        const existingIcons = span.querySelectorAll('iconify-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Inserir o SVG diretamente sem wrapper
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = phpSvgContent.trim();
        const svgElement = tempDiv.firstChild;
        
        // Inserir o ícone antes do texto
        span.insertBefore(svgElement, span.firstChild);
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
      // Verificar se já tem um ícone SVG dentro (para não duplicar)
      const hasIcon = filter.querySelector('svg');
      if (!hasIcon) {
        // Inserir o SVG diretamente sem wrapper
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = phpSvgContent.trim();
        const svgElement = tempDiv.firstChild;
        
        // Inserir o ícone no início do elemento do filtro
        filter.insertBefore(svgElement, filter.firstChild);
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
