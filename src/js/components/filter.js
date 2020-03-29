import filterList from '../utils/filter-list';
import EventObserver from '../lib/EventObserver';

const addFiltered = (item) => {
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
      <span class="filtered__type">${item.label}:</span>
      <span class="filtered__value">${item.value}</span>
      <button class="button filtered__del" data-id="${item.id}">
        ${renderedClose}
      </button>
    </div>`;
  const type = item.inc ? 'inc' : 'exc';
  document.querySelector(`.index-search__filter-${type}`).insertBefore(newFiltered, document.querySelector(`.index-search__filter-${type}`).querySelector('.filtered-clear'));
}

const initObserver = () => {
  const elApplied = document.querySelector('.index-search__filter-applied');
  const tip_incs = document.querySelectorAll('.index-search__filter-tip')[0];
  const tip_excs = document.querySelectorAll('.index-search__filter-tip')[1];

  window.filterObserver = new EventObserver();
  window.filterObserver.subscribe(data => {
    document.querySelectorAll('.filtered').forEach(item => item.parentNode.removeChild(item))
    data.map(item => {
      addFiltered(item);
    })
    if(data.length == 0) {
      elApplied.classList.add('is-hidden');
    } else {
      elApplied.classList.remove('is-hidden');

      const incs = data.filter(item => item.inc === true).length;
      const excs = data.filter(item => item.inc === false).length;


      if (tip_incs) {
        tip_incs.style.display = incs === 0 ? 'block' : 'none';
      }

      if (tip_excs) {
        tip_excs.style.display = excs === 0 ? 'block' : 'none';
      }
    }
  });
}

function wrapChars(str, query) {
  const regex = new RegExp(query, "g")
  const res = str.replace(regex, `<span class="is-red-text">${query}</span>`);
  return res;
}

const filter = () => {
  initObserver();
  window.state = { filters: [] };
  const filterGroups = document.querySelectorAll('.js-filter-group');
  const filterListInput = document.querySelectorAll('.js-filter-list-input');

  const filterListCb = (el, query) => {
    let str = el.querySelector('.checkbox__label');

    el.classList[str.innerText.toLowerCase().indexOf(query.toLowerCase()) > -1 ? 'remove' : 'add']('is-hidden');
    // $(el).hide().show();
    if (!el.classList.contains('is-hidden')) {
      str.innerHTML = wrapChars(str.innerText, query);
    }
  };

  filterListInput.forEach(input => {
    input.addEventListener('input', function(e) {
      const listWrap = input.parentNode.nextElementSibling;
      const list = listWrap.querySelectorAll('.js-filter')

      filterList([...list], e.target.value, filterListCb);
    })
  })

  const filterIndex = (id) => window.state.filters.indexOf(window.state.filters.filter(item => item.id === id)[0])

  const filterFindById = (id) => filterIndex(id) !== -1;

  const filterToggle = (inc, obj) => {

    const exist = filterFindById(obj.id);
    // console.log(obj);

    if (exist) {
      if (inc === null) {
        window.state.filters.splice(filterIndex(obj.id), 1);
      } else {
        if(obj.value === '') {
          window.state.filters.splice(filterIndex(obj.id), 1);
        }
        window.state.filters[filterIndex(obj.id)] = obj;
      }
    } else {
      if (inc === null) {
        // console.log('Элементов в фильтре:', window.state.filters.length);
        // console.log('Фильтр:', window.state.filters, '\n\n');
        return false;
      }
      window.state.filters.push(obj);
    }

    // console.log('Элементов в фильтре:', window.state.filters.length);
    // console.log('Фильтр:', window.state.filters, '\n\n');
    window.filterObserver.broadcast(window.state.filters);
  }

  const handleTextInput = (item, input) => {
    const id = input.id;
    let inc = true;
    const label = input.dataset.title;

    input.addEventListener('input', function(){
      filterToggle(inc, {
        id: id,
        label: label,
        value: input.value,
        inc: inc,
      })
      input.dataset.filtered = id;
    })
  }

  const handleRadioInput = (item, input) => {
    const id = input.name;
    let inc = true;
    input.addEventListener('change', function(){
      const value = item.querySelector('.checkbox__label').innerText;
      const label = item.querySelector('.checkbox').dataset.title;

      filterToggle(inc, {
        id: id,
        label: label,
        value: value,
        inc: inc,
      })
      document.querySelectorAll('input[data-filtered="' + id + '"]').forEach(item => item.removeAttribute('data-filtered'));
      input.dataset.filtered = id;

      const parent = input.closest('.filter__col');
      const field = parent.querySelector('.filter__filter input');
      field.value = value
    })

  }

  const handleCheckbox = (item, input, label) => {

    const id = input.id;
    const checkbox = item.querySelector('.checkbox');
    const exclude = item.querySelector('.filter__exclude-btn');
    const value = checkbox.querySelector('.checkbox__label').innerText;

    let inc;

    if (exclude) {
      exclude.addEventListener('click', function (e) {
        if (checkbox.classList.contains('is-excluded')) {
          checkbox.classList.remove('is-excluded');
          setInnerText(exclude, 'Исключить');
          inc = input.checked;
        } else {
          checkbox.classList.add('is-excluded')
          setInnerText(exclude, 'Включить');
          checkbox.checked = true;
          inc = false;
          input.dataset.filtered = id;
        }
  
        if (!input.checked) {
          input.checked = true;
        }
  
        filterToggle(inc, {
          id: id,
          label: label,
          value: value,
          inc: inc,
        })
      });
    }

    input.addEventListener('change', function () {
      if (!this.checked) {
        checkbox.classList.remove('is-excluded');
        setInnerText(exclude, 'Исключить');
        inc = null;
      } else {
        inc = true;
        input.dataset.filtered = id;
        setInnerText(exclude, 'Исключить');
      }

      filterToggle(inc, {
        id: id,
        label: label,
        value: value,
        inc: inc,
      })
    })

    const setInnerText = (element, text) => {
      if (!element || !element.innerHTML) return;
      element.innerHTML = text;
    }
  }

  const handleItem = (item, label) => {
    const input = item.querySelector('input');
    const type = input.type;

    switch (type) {
      case 'checkbox':
        handleCheckbox(item, input, label);

        break;
      case 'text':
        handleTextInput(item, input);

        break;

      case 'radio':
        handleRadioInput(item, input);

        break;

      default:
        break;
    }

  }

  const handleGroup = (group) => {
    const label = group.querySelector('.form__drop-name').innerText;
    const filterItems = group.querySelectorAll('.js-filter');

    filterItems.forEach(item => {
      handleItem(item, label);
    })
  }

  filterGroups.forEach(group => {
    handleGroup(group);
  })




}

export default filter;
