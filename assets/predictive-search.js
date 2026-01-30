class PredictiveSearch extends SearchForm {
  constructor() {
    super();

    this.cachedResults = {};
    this.predictiveSearchResults = this.querySelector('[data-predictive-search]');
    this.allPredictiveSearchInstances = document.querySelectorAll('predictive-search');
    this.isOpen = false;
    this.abortController = new AbortController();
    this.searchTerm = '';

    this.setupEventListeners();
  }

  setupEventListeners() {
    // ❌ Do NOT bind form submit (prevents search page redirect)
    // this.input.form.addEventListener('submit', this.onFormSubmit.bind(this));

    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.addEventListener('keyup', this.onKeyup.bind(this));
    this.addEventListener('keydown', this.onKeydown.bind(this));

    this.addEventListener('click', (e) => {
      const loadMoreBtn = e.target.closest('[data-load-more]');
      if (!loadMoreBtn) return;

      e.preventDefault();
      e.stopPropagation(); // 🚫 Prevent closing popup

      loadMoreBtn.remove();

      this.getSearchResults(this.searchTerm, true);
    });


    // 🔔 Reset event from SearchForm
    this.addEventListener('search:reset', () => {
      this.abortController.abort();
      this.abortController = new AbortController();
      this.close(true);
    });
  }

  getQuery() {
    return this.input.value.trim();
  }

  onChange() {
    super.onChange();

    // Abort previous request
    this.abortController.abort();
    this.abortController = new AbortController();

    const newSearchTerm = this.getQuery();

    if (!this.searchTerm || !newSearchTerm.startsWith(this.searchTerm)) {
      this.querySelector('#predictive-search-results-groups-wrapper')?.remove();
    }

    this.updateSearchForTerm(this.searchTerm, newSearchTerm);
    this.searchTerm = newSearchTerm;

    if (!this.searchTerm.length) {
      this.close(true);
      return;
    }

    this.getSearchResults(this.searchTerm);
  }

  onFocus() {
    const currentSearchTerm = this.getQuery();
    if (!currentSearchTerm.length) return;

    if (this.searchTerm !== currentSearchTerm) {
      this.onChange();
    } else if (this.getAttribute('results') === 'true') {
      this.open();
    } else {
      this.getSearchResults(this.searchTerm);
    }
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.close();
      }
    });
  }

  // ⌨️ Keyboard handling (ENTER never submits form)
  onKeyup(event) {
    if (!this.getQuery().length) {
      this.close(true);
      return;
    }

    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault();
        this.switchOption('up');
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.switchOption('down');
        break;

      case 'Enter':
        if (this.isOpen) {
          event.preventDefault();
          this.selectOption();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.close(true);
        break;

      default:
        break;
    }
  }

  onKeydown(event) {
    // Prevent browser defaults (cursor move / submit)
    if (
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown' ||
      event.code === 'Enter'
    ) {
      event.preventDefault();
    }
  }

  updateSearchForTerm(previousTerm, newTerm) {
    const el = this.querySelector('[data-predictive-search-search-for-text]');
    if (!el || !previousTerm) return;

    if (el.innerText.match(new RegExp(previousTerm, 'g'))?.length > 1) return;
    el.innerText = el.innerText.replace(previousTerm, newTerm);
  }

  switchOption(direction) {
    if (!this.getAttribute('open')) return;

    const moveUp = direction === 'up';
    const selected = this.querySelector('[aria-selected="true"]');

    const allItems = Array.from(
      this.querySelectorAll('li.predictive-search__item')
    ).filter(el => el.offsetParent !== null);

    if (moveUp && !selected) return;

    let index = allItems.indexOf(selected);
    index = moveUp
      ? index <= 0 ? allItems.length - 1 : index - 1
      : index === allItems.length - 1 ? 0 : index + 1;

    if (selected) selected.setAttribute('aria-selected', false);

    const active = allItems[index];
    active.setAttribute('aria-selected', true);
    this.input.setAttribute('aria-activedescendant', active.id);
  }

  selectOption() {
    const selected = this.querySelector('[aria-selected="true"] a');
    if (!selected) return;
    selected.click();
  }

getSearchResults(searchTerm, loadMore = false) {
  if (this.isLoadingMore) return;

  const queryKey = searchTerm.replace(/\s+/g, '-').toLowerCase();

  if (!loadMore) {
    this.afterCursor = null;
    this.pageInfo = null;
    this.setLiveRegionLoadingState();
  }

  this.isLoadingMore = true;

  fetch('/apps/api/search-products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: this.abortController.signal,
    body: JSON.stringify({
      domain: Shopify.shop,
      search: searchTerm,
      collection_id: window.PREDICTIVE_COLLECTION_ID || null,
      first: 250,
      after: this.afterCursor
    })
  })
    .then(res => res.json())
    .then(data => {
      const markup = this.buildResultsMarkup(
        data.items || [],
        loadMore
      );

      this.afterCursor = data.pageInfo?.endCursor || null;
      this.pageInfo = data.pageInfo;

      if (loadMore) {
        this.appendSearchResults(markup);
      } else {
        this.renderSearchResults(markup);
      }
    })
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err);
        this.close();
      }
    })
    .finally(() => {
      this.isLoadingMore = false;
    });
}


buildResultsMarkup(items, isLoadMore = false) {
  const listItems = items.map((item, index) => `
<li id="predictive-item-${index}-${item.idNumeric}" class="predictive-search__list-item" role="option" aria-selected="false">
                  <a href="/products/${item.handle}" class="predictive-search__item predictive-search__item--link-with-thumbnail link link--text" tabindex="-1">
                  <img class="predictive-search__image" src="${item.featuredImageUrl || "https://cdn.shopify.com/s/files/1/0745/5975/0322/files/trimark_noimage_ddcba714-38f4-43b4-973b-60ddfaa49391.jpg?v=1769639845"}" alt="10065074.jpg" width="50" height="67.20430107526882">
                  <div class="predictive-search__item-content"><span class="visually-hidden">Vendor:</span>
                        <div class="predictive-search__item-vendor caption-with-letter-spacing">
                          ${item.productType}
                        </div><p class="predictive-search__item-heading h5">${item.title}</p></div>
                  </a>
                </li>
  `).join('');

  const loadMoreBtn = this.pageInfo?.hasNextPage
    ? `<button
        type="button"
        class="predictive-search__load-more"
        data-load-more
      >
        Load more
      </button>`
    : '';

  return `
    ${!isLoadMore ? `<ul id="predictive-search-results-products-list" class="predictive-search__results-list list-unstyled" role="group" aria-labelledby="predictive-search-products">` : ''}
      ${listItems}
    ${!isLoadMore ? `</ul>` : ''}
    ${loadMoreBtn}
  `;
}

appendSearchResults(markup) {
  const container = this.predictiveSearchResults;
  container.insertAdjacentHTML('beforeend', markup);
}


  // 🔄 LOADER + LIVE REGION
  setLiveRegionLoadingState() {
    this.statusElement =
      this.statusElement || this.querySelector('.predictive-search-status');
    this.loadingText =
      this.loadingText || this.getAttribute('data-loading-text') || 'Loading…';

    if (!this.statusElement) return;

    this.setLiveRegionText(this.loadingText);
    this.setAttribute('loading', true);
  }

  setLiveRegionText(text) {
    if (!this.statusElement) return;

    this.statusElement.setAttribute('aria-hidden', 'false');
    this.statusElement.textContent = text;

    setTimeout(() => {
      this.statusElement.setAttribute('aria-hidden', 'true');
    }, 1000);
  }

  renderSearchResults(markup) {
    this.removeAttribute('loading'); // 🔄 HIDE LOADER
    this.predictiveSearchResults.innerHTML = markup;
    this.setAttribute('results', true);
    this.open();
  }

  open() {
    this.setAttribute('open', true);
    this.input.setAttribute('aria-expanded', true);
    this.isOpen = true;
  }

  close(clear = false) {
    if (clear) {
      this.input.value = '';
      this.removeAttribute('results');
    }

    this.removeAttribute('loading');
    this.removeAttribute('open');
    this.input.setAttribute('aria-expanded', false);
    this.isOpen = false;
  }
}

customElements.define('predictive-search', PredictiveSearch);
