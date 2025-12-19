/* =========================================
   ALGOLIA COLLECTION – DAWN STYLE
   Robust collection filter
   ========================================= */

/* 1️⃣ Algolia credentials */
const searchClient = algoliasearch(
  'testingMUEWDUHCI5', // Application ID
  'e4a767e5c4763e97d5cd8a5af0419f65' // Search-only API key
);

/* 2️⃣ Get collection handle from URL and normalize */
const collectionHandleRaw = window.location.pathname
  .replace(/\/$/, '')
  .split('/collections/')[1] || '';

const collectionHandle = collectionHandleRaw
  .toLowerCase()
  .replace(/\s+/g, '-'); // converts "Prep Tables" → "prep-tables"

console.log('Algolia collection handle:', collectionHandle);

/* 3️⃣ Initialize InstantSearch */
const search = instantsearch({
  indexName: 'qa-marlinn_products', // full index name including prefix
  searchClient,
  routing: true,
});

/* 4️⃣ Add widgets */
search.addWidgets([

  /* 🔹 Configure widget – hits per page and collection filter */
  instantsearch.widgets.configure({
    hitsPerPage: 24,
     filters: collectionHandle
       ? `collections_list:"${collectionHandle}"`
       : ''
  }),

  /* 🔹 Stats */
  instantsearch.widgets.stats({
    container: '#algolia-stats',
    templates: {
      text({ nbHits }) {
        return `${nbHits} products`;
      }
    }
  }),

  /* 🔹 Sort options */
  instantsearch.widgets.sortBy({
    container: '#algolia-sort',
    items: [
      { label: 'Featured', value: 'qa-marlinn_products' },
      { label: 'Price (Low → High)', value: 'qa-marlinn_products_price_asc' },
      { label: 'Price (High → Low)', value: 'qa-marlinn_products_price_desc' }
    ],
  }),

  /* 🔹 Vendor filter */
  instantsearch.widgets.refinementList({
    container: '#algolia-filters',
    attribute: 'vendor',
    searchable: true,
    showMore: true,
  }),

  /* 🔹 Product grid */
  instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      item(hit) {
        const productTitle = hit.product_title || hit.title || 'Product';
        const productHandle = hit.product_handle || hit.handle || '';
        const productUrl = productHandle
          ? `/products/${productHandle}`
          : '#';

        const image =
          hit.image ||
          (hit.product_image && hit.product_image.src) ||
          '';

        const price =
          typeof hit.price === 'number'
            ? `$${(hit.price / 100).toFixed(2)}`
            : '';

        return `
          <li class="grid__item">
            <div class="card-wrapper product-card-wrapper underline-links-hover">
              <div class="card card--standard card--media">
                <div class="card__inner">
                  <a href="${productUrl}" class="full-unstyled-link">
                    <div class="card__media">
                      ${
                        image
                          ? `<img
                              src="${image}"
                              alt="${productTitle}"
                              loading="lazy"
                              width="300"
                              height="300"
                            >`
                          : ''
                      }
                    </div>
                  </a>
                </div>

                <div class="card__content">
                  <h3 class="card__heading h5">
                    <a href="${productUrl}" class="full-unstyled-link">
                      ${productTitle}
                    </a>
                  </h3>

                  ${
                    hit.variant_title && hit.variant_title !== 'Default Title'
                      ? `<div class="caption-with-letter-spacing">${hit.variant_title}</div>`
                      : ''
                  }

                  ${
                    price
                      ? `<div class="price">
                          <span class="price-item price-item--regular">
                            ${price}
                          </span>
                        </div>`
                      : ''
                  }
                </div>
              </div>
            </div>
          </li>
        `;
      }
    }
  }),

  /* 🔹 Pagination */
  instantsearch.widgets.pagination({
    container: '#algolia-pagination',
  }),

]);

/* 5️⃣ Start search */
search.start();

search.on('render', () => {
  console.log('Algolia rendered');
});
