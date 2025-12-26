// algolia-facets.js
import instantsearch from 'instantsearch.js';
import { searchBox, hits, refinementList, numericMenu, rangeSlider, clearRefinements, sortBy } from 'instantsearch.js/es/widgets';

document.addEventListener('DOMContentLoaded', () => {
  // Make sure Algolia config exists
  if (!window.algoliaConfig) return;

  const search = instantsearch({
    indexName: window.algoliaConfig.indexName,
    searchClient: window.algoliaConfig.searchClient,
    routing: true,
  });

  // --- Search Box (hidden, optional) ---
  search.addWidgets([
    searchBox({
      container: '#SearchBox', // optional if using external input
      placeholder: 'Search for products...',
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false,
    })
  ]);

  // --- Product Count ---
  const updateProductCount = (hits) => {
    const countElem = document.getElementById('ProductCountText');
    if (countElem) {
      const count = hits.length;
      countElem.innerText = count === 1
        ? `${count} product`
        : `${count} products`;
    }
  };

  // --- Active Filters ---
  const updateActiveFacets = (helperState) => {
    const container = document.getElementById('ActiveFacets');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(helperState.facetsRefinements || {}).forEach(([facet, values]) => {
      values.forEach(value => {
        const pill = document.createElement('div');
        pill.className = 'active-facet-pill';
        pill.innerHTML = `
          <span>${facet}: ${value}</span>
          <button class="remove-pill" data-facet="${facet}" data-value="${value}">&times;</button>
        `;
        container.appendChild(pill);
      });
    });

    container.querySelectorAll('.remove-pill').forEach(btn => {
      btn.addEventListener('click', e => {
        const facet = btn.dataset.facet;
        const value = btn.dataset.value;
        search.helper.removeFacetRefinement(facet, value).search();
      });
    });
  };

  // --- Refinement Lists (Checkbox Facets) ---
  const facetContainers = document.querySelectorAll('#FacetsWrapperDesktop, #FacetsWrapperMobile');
  facetContainers.forEach(container => {
    const facets = container.dataset.facets ? JSON.parse(container.dataset.facets) : [];

    facets.forEach(facet => {
      search.addWidgets([
        refinementList({
          container: container.querySelector(`#Facet-${facet.name}`),
          attribute: facet.name,
          operator: 'or',
          limit: facet.limit || 10,
          sortBy: ['isRefined', 'count:desc', 'name:asc'],
          templates: {
            item: `
              <label class="facet-checkbox">
                <input type="checkbox" {{#isRefined}}checked{{/isRefined}} />
                <span class="facet-label">{{label}} ({{count}})</span>
              </label>
            `
          }
        })
      ]);
    });
  });

  // --- Price Range ---
  const priceContainers = document.querySelectorAll('.facets__price');
  priceContainers.forEach(container => {
    const attribute = container.dataset.priceAttribute || 'price';
    search.addWidgets([
      rangeSlider({
        container,
        attribute,
        tooltips: {
          format: value => `$${value}`
        }
      })
    ]);
  });

  // --- Clear All Filters ---
  const clearAllButtons = document.querySelectorAll('.mobile-facets__clear, .active-facets__button-remove');
  clearAllButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      search.helper.clearRefinements().search();
      e.preventDefault();
    });
  });

  // --- Show More Buttons ---
  const showMoreButtons = document.querySelectorAll('.button-show-more');
  showMoreButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const list = btn.closest('fieldset').querySelector('ul');
      if (!list) return;
      list.querySelectorAll('.show-more-item').forEach(item => item.classList.toggle('hidden'));
      btn.querySelector('.label-show-more').classList.toggle('hidden');
      btn.querySelector('.label-show-less').classList.toggle('hidden');
    });
  });

  // --- Start the search ---
  search.start();

  // Listen to results to update counts and active facets
  search.on('render', ({ results, state }) => {
    updateProductCount(results.hits);
    updateActiveFacets(search.helper.state);
  });
});
