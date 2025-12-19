const searchClient = algoliasearch(
  'YOUR_APP_ID',
  'e4a767e5c4763e97d5cd8a5af0419f65'
);

const search = instantsearch({
  indexName: 'shopify_products',
  searchClient,
  routing: true,
});

search.addWidgets([

  instantsearch.widgets.stats({
    container: '#algolia-stats',
    templates: {
      text({ nbHits }) {
        return `${nbHits} products`;
      }
    }
  }),

  instantsearch.widgets.sortBy({
    container: '#algolia-sort',
    items: [
      { label: 'Featured', value: 'shopify_products' },
      { label: 'Price (Low → High)', value: 'shopify_products_price_asc' },
      { label: 'Price (High → Low)', value: 'shopify_products_price_desc' }
    ],
  }),

  instantsearch.widgets.refinementList({
    container: '#algolia-filters',
    attribute: 'vendor',
  }),

  instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      item(hit) {
        return `
          <li class="grid__item">
            <div class="card-wrapper product-card-wrapper underline-links-hover">
              <div class="card card--standard card--media">
                <div class="card__inner">
                  <a href="${hit.url}" class="full-unstyled-link">
                    <div class="card__media">
                      <img
                        src="${hit.image}"
                        alt="${hit.title}"
                        loading="lazy"
                        width="300"
                        height="300"
                      >
                    </div>
                  </a>
                </div>

                <div class="card__content">
                  <h3 class="card__heading h5">
                    <a href="${hit.url}" class="full-unstyled-link">
                      ${hit.title}
                    </a>
                  </h3>

                  <div class="price">
                    <span class="price-item price-item--regular">
                      $${(hit.price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        `;
      }
    }
  }),

  instantsearch.widgets.pagination({
    container: '#algolia-pagination',
  }),

]);

search.start();
