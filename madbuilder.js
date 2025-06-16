// Busca local para os snippets do madbuilder

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('madbuilder-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const wrapper = document.getElementById('madbuilder');
    if (!wrapper) return;

    // Seleciona todos os blocos de snippet
    const snippetBlocks = wrapper.querySelectorAll('.snippet-block');
    snippetBlocks.forEach(block => {
      const text = block.innerText.toLowerCase();
      block.style.display = text.includes(query) ? '' : 'none';
    });

    // Esconde/mostra seções conforme resultado dos snippets
    const sections = wrapper.querySelectorAll('.section');
    sections.forEach(section => {
      const visibleSnippets = section.querySelectorAll('.snippet-block:not([style*="display: none"])');
      section.style.display = visibleSnippets.length > 0 ? '' : 'none';
    });
  });
});
