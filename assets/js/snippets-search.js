/**
 * Search Functionality for Snippets
 * 
 * This script adds search functionality to filter snippets based on user input
 * Allows filtering snippets by text content, titles, or tags
 */
document.addEventListener('DOMContentLoaded', function() {
  // Configuration for search functionality
  const SEARCH_CONFIG = {
    searchInputSelector: '#search',
    refreshButtonSelector: '#refresh-list',
    snippetSelector: '.isotope-item',
    snippetTitleSelector: '.portfolio-info h4, .snippet-title',
    snippetContentSelector: '.portfolio-description, pre code',
    noResultsClass: 'no-results-message',
    containerSelector: '.isotope-container',
    minSearchLength: 2,
    debug: true
  };

  // System log for diagnostics
  const log = {
    info: (msg) => SEARCH_CONFIG.debug && console.info(`🔍 [Search]: ${msg}`),
    success: (msg) => SEARCH_CONFIG.debug && console.log(`✅ [Search]: ${msg}`),
    warn: (msg) => console.warn(`⚠️ [Search]: ${msg}`),
    error: (msg, err) => console.error(`❌ [Search]: ${msg}`, err || '')
  };

  /**
   * Initialize search functionality
   */
  function initSearchFunctionality() {
    log.info('Initializing search functionality');
    setupSearchEvents();
  }

  /**
   * Set up search input and button events
   */
  function setupSearchEvents() {
    const searchInput = document.querySelector(SEARCH_CONFIG.searchInputSelector);
    const refreshButton = document.querySelector(SEARCH_CONFIG.refreshButtonSelector);

    if (!searchInput) {
      log.error('Search input not found:', SEARCH_CONFIG.searchInputSelector);
      return;
    }

    if (!refreshButton) {
      log.warn('Refresh button not found:', SEARCH_CONFIG.refreshButtonSelector);
    }

    // Add input event listener for search
    searchInput.addEventListener('input', function() {
      performSearch(this.value.toLowerCase().trim());
    });

    // Add click event listener for refresh button
    if (refreshButton) {
      refreshButton.addEventListener('click', function() {
        searchInput.value = '';
        performSearch('');
      });
    }

    log.success('Search events successfully set up');
  }

  /**
   * Perform search based on user input
   * @param {string} searchText - The search term entered by the user
   */
  function performSearch(searchText) {
    const snippets = document.querySelectorAll(SEARCH_CONFIG.snippetSelector);
    const container = document.querySelector(SEARCH_CONFIG.containerSelector);
    
    // Remove any existing no results message
    removeNoResultsMessage();

    if (searchText.length < SEARCH_CONFIG.minSearchLength) {
      // If search text is too short, show all snippets
      resetSnippetsView();
      return;
    }

    log.info(`Searching for: "${searchText}"`);
    
    // Track if we found any matches
    let foundMatches = false;
    
    // Loop through all snippets
    snippets.forEach(snippet => {
      // Check all possible selectors for title and content
      let title = '';
      let content = '';
      
      // Get title from any matching elements
      const titleSelectors = SEARCH_CONFIG.snippetTitleSelector.split(',');
      for (const selector of titleSelectors) {
        const titleElements = snippet.querySelectorAll(selector.trim());
        titleElements.forEach(el => {
          title += el.textContent.toLowerCase() + ' ';
        });
      }
      
      // Get content from any matching elements
      const contentSelectors = SEARCH_CONFIG.snippetContentSelector.split(',');
      for (const selector of contentSelectors) {
        const contentElements = snippet.querySelectorAll(selector.trim());
        contentElements.forEach(el => {
          content += el.textContent.toLowerCase() + ' ';
        });
      }
      
      // Get tags from dataset
      const tags = snippet.dataset.tags?.toLowerCase() || '';
      
      // Check if snippet contains the search text
      if (title.includes(searchText) || content.includes(searchText) || tags.includes(searchText)) {
        snippet.style.display = '';
        foundMatches = true;
      } else {
        snippet.style.display = 'none';
      }
    });
    
    // If we didn't find any matches, show a message
    if (!foundMatches && container) {
      showNoResultsMessage(container);
    }
    
    // Re-layout Isotope if it exists
    reinitializeIsotope();
    
    log.info(`Search complete: ${foundMatches ? 'results found' : 'no results'}`);
  }

  /**
   * Remove any existing no-results message
   */
  function removeNoResultsMessage() {
    const existingMessage = document.querySelector(`.${SEARCH_CONFIG.noResultsClass}`);
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  /**
   * Show a message when no results are found
   * @param {HTMLElement} container - The container where to show the message
   */
  function showNoResultsMessage(container) {
    const messageElement = document.createElement('div');
    messageElement.className = SEARCH_CONFIG.noResultsClass;
    messageElement.innerHTML = `
      <i class="fa fa-search"></i>
      Nenhum resultado encontrado para sua busca
    `;
    container.appendChild(messageElement);
  }

  /**
   * Reset the view to show all snippets
   */
  function resetSnippetsView() {
    // Remove any existing no results message
    removeNoResultsMessage();
    
    // Show all snippets
    const snippets = document.querySelectorAll(SEARCH_CONFIG.snippetSelector);
    snippets.forEach(snippet => {
      snippet.style.display = '';
    });
    
    // Re-layout Isotope if it exists
    reinitializeIsotope();
    
    // Reset any active filter in the Isotope filters
    try {
      const activeFilter = document.querySelector('.isotope-filters .filter-active');
      if (activeFilter) {
        // Simulate a click on the active filter to refresh the view
        activeFilter.click();
      }
    } catch (err) {
      log.error('Error resetting isotope filters:', err);
    }
    
    log.info('Reset snippets view - showing all snippets');
  }

  /**
   * Re-initialize Isotope after filtering
   */
  function reinitializeIsotope() {
    const container = document.querySelector(SEARCH_CONFIG.containerSelector);
    if (!container) return;
    
    // If Isotope is available, re-layout
    if (window.Isotope && Isotope.data(container)) {
      const iso = Isotope.data(container);
      setTimeout(() => {
        // First, we need to tell Isotope to respect our visibility settings
        // by using our own filtering function that respects the display property
        iso.arrange({
          filter: function() {
            return this.style.display !== 'none';
          }
        });
        
        log.info('Isotope layout refreshed');
      }, 10);
    }
  }

  // Initialize search functionality
  initSearchFunctionality();
});
