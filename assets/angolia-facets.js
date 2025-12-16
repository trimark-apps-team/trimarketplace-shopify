document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('[data-algolia-facets]')) return;

  const searchClient = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_API_KEY
  );

  const search = instantsearch({
    indexName: ALGOLIA_INDEX_NAME,
    searchClient,
    routing: true
  });

  /* =========================
     FACETS
  ========================== */

  search.addWidgets([

    instantsearch.widgets.clearRefinements({
      container: '#algolia-clear-refinements'
    }),

    instantsearch.widgets.refinementList({
      container: '#algolia-refinement-categories',
      attribute: 'collections'
    }),

    instantsearch.widgets.refinementList({
      container: '#algolia-refinement-vendor',
      attribute: 'vendor'
    }),

    instantsearch.widgets.rangeSlider({
      container: '#algolia-price-range',
      attribute: 'price'
    }),

    /* =========================
       SORT
    ========================== */

    instantsearch.widgets.sortBy({
      container: '#algolia-sort-by',
      items: [
        { label: 'Featured', value: ALGOLIA_INDEX_NAME },
        { label: 'Price (Low → High)', value: ALGOLIA_INDEX_NAME + '_price_asc' },
        { label: 'Price (High → Low)', value: ALGOLIA_INDEX_NAME + '_price_desc' }
      ]
    }),

    /* =========================
       STATS
    ========================== */

    instantsearch.widgets.stats({
      container: '#algolia-stats'
    })
  ]);

  search.start();
});
