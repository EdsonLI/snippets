/**
 * Script para testar a funcionalidade de busca em títulos marcados como search-title
 */
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o parâmetro teste-busca está na URL
  const urlParams = new URLSearchParams(window.location.search);
  const testMode = urlParams.has('teste-busca');
  
  if (testMode) {
    console.log('%c🔍 Teste de Busca Avançada Ativado', 'background:#007bff;color:white;padding:5px;border-radius:5px;');
    
    // Adiciona os estilos de teste CSS
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'assets/css/search-title-test.css';
    document.head.appendChild(styleLink);
    
    // Lista todos os search-title encontrados
    const searchTitles = document.querySelectorAll('.search-title');
    console.log(`%c🏷️ ${searchTitles.length} elementos com classe search-title encontrados`, 'color:#28a745;font-weight:bold');
    
    // Exibe cada título encontrado e adiciona destaque visual
    searchTitles.forEach((el, i) => {
      const text = el.textContent.trim();
      const parentSnippet = el.closest('.isotope-item');
      const snippetId = parentSnippet ? parentSnippet.id || '[sem ID]' : '[sem parent]';
      
      // Adiciona classe para destacar o elemento
      el.classList.add('search-title-highlight');
      
      console.log(
        `%c[${i+1}] %c${text}%c (Snippet: ${snippetId})`, 
        'color:#007bff;font-weight:bold', 
        'color:#333;font-weight:normal',
        'color:#6c757d;font-style:italic'
      );
    });

    // Adiciona um botão para testar busca
    const testButton = document.createElement('button');
    testButton.textContent = '🧪 Testar Busca por Títulos';
    testButton.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#dc3545;color:white;border:none;border-radius:4px;padding:8px 12px;cursor:pointer';
    document.body.appendChild(testButton);
    
    // Teste automatizado
    testButton.addEventListener('click', function() {
      // Simulação de busca para cada título
      if (searchTitles.length === 0) {
        alert('Nenhum elemento com classe search-title encontrado!');
        return;
      }
      
      // Seleciona um título aleatório para testar
      const randomIndex = Math.floor(Math.random() * searchTitles.length);
      const testTitle = searchTitles[randomIndex];
      const searchText = testTitle.textContent.trim().split(' ')[0]; // Pega a primeira palavra
      
      // Limpa busca anterior
      document.getElementById('refresh-list').click();
      
      // Preenche campo de busca
      const searchInput = document.getElementById('search');
      searchInput.value = searchText;
      searchInput.focus();
      
      // Dispara evento de input
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Feedback
      console.log(
        `%c🧪 Teste de busca realizado com o termo "${searchText}"`, 
        'background:#28a745;color:white;padding:3px;border-radius:3px;'
      );
    });
  }
});
