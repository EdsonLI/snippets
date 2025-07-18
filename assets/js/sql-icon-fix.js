/**
 * Script específico para corrigir o ícone do SQL
 * Versão atualizada: Insere SVG diretamente no DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  // Aguardar um momento para garantir que outros scripts já foram carregados
  setTimeout(function() {
    console.info('🔄 Aplicando SVG personalizado para o ícone SQL...');
    
    // SVG para o ícone SQL (definido em um único lugar para fácil manutenção)
    const sqlSvgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sql-icon-svg">
        <defs>
          <style>.cls-1{fill:#aecbfa;}.cls-1,.cls-2,.cls-3{fill-rule:evenodd;}.cls-2{fill:#669df6;}.cls-3{fill:#4285f4;}</style>
        </defs>
        <g data-name="Product Icons">
          <g>
            <polygon class="cls-1" points="4.67 10.44 4.67 13.45 12 17.35 12 14.34 4.67 10.44"/>
            <polygon class="cls-1" points="4.67 15.09 4.67 18.1 12 22 12 18.99 4.67 15.09"/>
            <polygon class="cls-2" points="12 17.35 19.33 13.45 19.33 10.44 12 14.34 12 17.35"/>
            <polygon class="cls-2" points="12 22 19.33 18.1 19.33 15.09 12 18.99 12 22"/>
            <polygon class="cls-3" points="19.33 8.91 19.33 5.9 12 2 12 5.01 19.33 8.91"/>
            <polygon class="cls-2" points="12 2 4.67 5.9 4.67 8.91 12 5.01 12 2"/>
            <polygon class="cls-1" points="4.67 5.87 4.67 8.89 12 12.79 12 9.77 4.67 5.87"/>
            <polygon class="cls-2" points="12 12.79 19.33 8.89 19.33 5.87 12 9.77 12 12.79"/>
          </g>
        </g>
      </svg>
    `;
    
    // Função para limpar e inserir o ícone SQL
    function applySqlIcon(element) {
      // Primeiro remover qualquer iconify-icon ou outros elementos SQL existentes
      const existingIcons = element.querySelectorAll('iconify-icon, .sql-icon-wrapper');
      existingIcons.forEach(icon => icon.remove());
      
      // Criar o wrapper para o ícone SQL
      const wrapper = document.createElement('span');
      wrapper.className = 'sql-icon-wrapper';
      wrapper.innerHTML = sqlSvgContent;
      
      // Inserir no início do elemento
      if (element.firstChild) {
        element.insertBefore(wrapper, element.firstChild);
      } else {
        element.appendChild(wrapper);
      }
    }
    
    // Função específica para os títulos dos snippets
    function applySqlIconToSnippets() {
      // Obter todos os spans com classe id-tech-sql (títulos dos snippets)
      const sqlTitleSpans = document.querySelectorAll('.id-tech-sql');
      sqlTitleSpans.forEach(span => {
        // Remover ícones existentes
        const existingIcons = span.querySelectorAll('iconify-icon, .sql-icon-wrapper');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar e inserir o novo ícone
        const wrapper = document.createElement('span');
        wrapper.className = 'sql-icon-wrapper';
        wrapper.innerHTML = sqlSvgContent;
        
        // Inserir o ícone antes do texto
        span.insertBefore(wrapper, span.firstChild);
      });
    }
    
    // Aplicar aos badges normais
    const sqlBadges = document.querySelectorAll('.tech-badge-sql');
    sqlBadges.forEach(badge => {
      applySqlIcon(badge);
    });
    
    // Aplicar também aos filtros
    const sqlFilters = document.querySelectorAll('.filter-sql');
    sqlFilters.forEach(filter => {
      applySqlIcon(filter);
    });
    
    // Aplicar aos títulos dos snippets
    applySqlIconToSnippets();
    
    console.info('✅ SVG personalizado para SQL aplicado');
  }, 500);
});
