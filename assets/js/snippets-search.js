/**
 * Search Functionality for Snippets
 * 
 * This script adds search functionality to filter snippets based on user input
 * Allows filtering snippets by text content, titles, or tags
 * jQuery Edition
 */
$(document).ready(function() {
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
    warn: (msg) => console.warn(`[Search]: ${msg}`),
    error: (msg, err) => console.error(`[Search]: ${msg}`, err || '')
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
    const $searchInput = $(SEARCH_CONFIG.searchInputSelector);
    const $refreshButton = $(SEARCH_CONFIG.refreshButtonSelector);

    if (!$searchInput.length) {
      log.error('Search input not found:', SEARCH_CONFIG.searchInputSelector);
      return;
    }

    if (!$refreshButton.length) {
      log.warn('Refresh button not found:', SEARCH_CONFIG.refreshButtonSelector);
    }

    // Add input event listener for search
    $searchInput.on('input', function() {
      performSearch($(this).val().toLowerCase().trim());
    });

    // Add click event listener for refresh button
    if ($refreshButton.length) {
      $refreshButton.on('click', function() {
        $searchInput.val('');
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
    const $snippets = $(SEARCH_CONFIG.snippetSelector);
    const $container = $(SEARCH_CONFIG.containerSelector);
    
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
    $snippets.each(function() {
      const $snippet = $(this);
      // Check all possible selectors for title and content
      let title = '';
      let content = '';
      
      // Get title from any matching elements
      const titleSelectors = SEARCH_CONFIG.snippetTitleSelector.split(',');
      for (const selector of titleSelectors) {
        $snippet.find(selector.trim()).each(function() {
          title += $(this).text().toLowerCase() + ' ';
        });
      }
      
      // Get content from any matching elements
      const contentSelectors = SEARCH_CONFIG.snippetContentSelector.split(',');
      for (const selector of contentSelectors) {
        $snippet.find(selector.trim()).each(function() {
          content += $(this).text().toLowerCase() + ' ';
        });
      }
      
      // Get tags from dataset
      const tags = $snippet.data('tags')?.toLowerCase() || '';
      
      // Check if snippet contains the search text
      if (title.includes(searchText) || content.includes(searchText) || tags.includes(searchText)) {
        $snippet.show();
        foundMatches = true;
      } else {
        $snippet.hide();
      }
    });
    
    // If we didn't find any matches, show a message
    if (!foundMatches && $container.length) {
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
    $(`.${SEARCH_CONFIG.noResultsClass}`).remove();
  }

  /**
   * Show a message when no results are found
   * @param {jQuery} $container - The container where to show the message
   */
  function showNoResultsMessage($container) {
    $('<div>')
      .addClass(SEARCH_CONFIG.noResultsClass)
      .html(`
        <i class="fa fa-search"></i>
        Nenhum resultado encontrado para sua busca
      `)
      .appendTo($container);
  }

  /**
   * Reset the view to show all snippets
   */
  function resetSnippetsView() {
    // Remove any existing no results message
    removeNoResultsMessage();
    
    // Show all snippets
    $(SEARCH_CONFIG.snippetSelector).show();
    
    // Re-layout Isotope if it exists
    reinitializeIsotope();
    
    // Reset any active filter in the Isotope filters
    try {
      const $activeFilter = $('.isotope-filters .filter-active');
      if ($activeFilter.length) {
        // Simulate a click on the active filter to refresh the view
        $activeFilter.trigger('click');
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
    const $container = $(SEARCH_CONFIG.containerSelector);
    if (!$container.length) return;
    
    // If Isotope is available, re-layout
    if (window.Isotope && Isotope.data($container[0])) {
      const iso = Isotope.data($container[0]);
      setTimeout(function() {
        // First, we need to tell Isotope to respect our visibility settings
        // by using our own filtering function that respects the display property
        iso.arrange({
          filter: function() {
            return $(this).is(':visible');
          }
        });
        
        log.info('Isotope layout refreshed');
      }, 10);
    }
  }

  // Initialize search functionality
  initSearchFunctionality();
});
