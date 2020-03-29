const handleIndexFilter = () => {
  const filterForm = document.querySelector('.js-index-filter');

  // Очистка контролов
  const clearControl = (id) => {
    const filterControl = document.querySelector('[data-filtered="' + id + '"]');
    if (document.querySelector('[data-filtered="' + id + '"]').closest('.checkbox')) {
      if (document.querySelector('[data-filtered="' + id + '"]').closest('.checkbox').classList.contains('is-excluded')) {
        document.querySelector('[data-filtered="' + id + '"]').closest('.checkbox').classList.remove('is-excluded');
      }
      filterControl.checked = false;
    } else if (filterControl.type === 'text') {
      filterControl.value = '';
    }

    filterControl.removeAttribute('data-filtered')
  }

  // Удаление всех фильтров (включений и исключений)
  const clearFiltered = document.querySelectorAll('.filtered-clear')
  clearFiltered.forEach(btn => {
    btn.addEventListener('click', function () {
      let inc;
      const parent = btn.parentNode;
      const remove = parent.querySelectorAll('.filtered');
      inc = parent.classList.contains('index-search__filter-inc');
      remove.forEach(item => {
        const id = item.querySelector('.filtered__del').dataset.id;
        clearControl(id);

        parent.removeChild(item)
      })
      window.state.filters = window.state.filters.filter(item => item.inc !== inc);
      window.filterObserver.broadcast(window.state.filters);
    })
  });

  // Удаление фильтра по одному
  document.addEventListener('click', function (e) {
    if (e.target.closest('.filtered__del')) {
      const item = e.target.closest('.filtered');
      const id = e.target.closest('.filtered__del').dataset.id;
      const parent = item.parentNode;
      clearControl(id);

      parent.removeChild(item)
      window.state.filters = window.state.filters.filter(filter => filter.id !== id);
      window.filterObserver.broadcast(window.state.filters);
    }
  })

  const mainSearch = document.querySelector('.index-search__search');
  if (!mainSearch) return false;
  const input = mainSearch.querySelector('input');
  const tooltip = document.querySelector('.index-search__tooltip');
  const tooltipExc = tooltip.querySelector('button');
  const filterMain = document.querySelector('.index-search__filter-main');
  const searchbox = document.querySelector('.index-search__search-input');

  const addFiltered = (val, type) => {
    if (!val.length) return false;
    const renderedClose = `
      <svg class="icon icon_x" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.66667 1.3L0.333333 6.7" stroke-linecap="round"/>
        <path d="M0.333333 1.3L5.66667 6.7" stroke-linecap="round"/>
      </svg>`;

    const newFiltered = document.createElement('div');
    newFiltered.classList.add('filtered');
    newFiltered.classList.add('js-dragable');
    newFiltered.setAttribute('draggable', true);
    newFiltered.innerHTML = `
      <div class="filtered__inner">
        <span class="filtered__type">{Тип}</span>
        <span class="filtered__value">${val}</span>
        <button class="button filtered__del" data-id="">
          ${renderedClose}
        </button>
      </div>`;

    document.querySelector(`.index-search__filter-${type}`).insertBefore(newFiltered, document.querySelector(`.index-search__filter-${type}`).querySelector('.filtered-clear'));
  }

  searchbox.addEventListener('focusin', function (e) {
    filterForm.classList.add('is-focused');
    filterMain.style.cssText = 'padding-top: 0; padding-bottom: 0; height: 0; overflow: hidden'
  })

  input.addEventListener('input', function (e) {
    if (this.value.length < 2) {
      input.style.width = '100%';
      tooltip.classList.remove('is-visible');
    } else {
      input.style.width = ((this.value.length + 1) * 9 + 2) + 'px';
      tooltip.classList.add('is-visible');
    }
  })

  input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13 && !e.altKey) {
      addFiltered(this.value, 'inc');
      this.value = '';
      this.style = '';
      return false
    } else if (e.keyCode == 13 && e.altKey) {
      addFiltered(this.value, 'exc');
      this.value = '';
      this.style = '';
      return false
    }
    tooltip.classList.remove('is-visible');
  })

  tooltipExc.addEventListener('click', function () {
    addFiltered(input.value, 'exc');
    input.value = '';
    input.style.width = '100%';
    tooltip.classList.remove('is-visible');
    return false;
  })

  const returnFilter = document.querySelector('.button_type_reveal-filter')
  returnFilter.addEventListener('click', function (e) {

    if (window.innerWidth < 1280) {
      if (!filterForm.classList.contains('is-focused')) {
        filterForm.classList.add('is-focused');
        filterMain.style.cssText = 'padding-top: 0; padding-bottom: 0; height: 0; overflow: hidden';
      } else {
        filterForm.classList.remove('is-focused');
        filterMain.style.cssText = '';
      }
    } else {
      filterForm.classList.remove('is-focused');
      filterMain.style.cssText = '';
    }
  })
}

export default handleIndexFilter;
