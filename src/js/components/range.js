import formatNumbers from '../utils/formatNumbers';
import noUISlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';

const initPriceSlider = () => {
  const range = document.querySelector('.rangeable_price');
  if (!range) return false;

  const inputMin = document.querySelector('.input_price_1');
  const inputMax = document.querySelector('.input_price_2');
  const inputs = [inputMin, inputMax];

  const slider = noUISlider.create(range, {
    animate: true,
    start: [500000, 23000000],
    range: {
      'min': 500000,
      'max': 23000000
    },
    connect: true,
    step: 100000,
    format: {
      to: function (value) {
        return formatNumbers(Math.round(value));
      },
      from: function (value) {
        return Number(value.split(' ').join(''));
      }
    },
    pips: {
      mode: 'count',
      values: 3,
      density: 100,
      format: {
        to: function(val) {
          return val > 1000000 ? Math.round(val / 1000000) + ' млн.' : Math.round(val / 1000) + ' тыс.'
        },
      }
    }
  })

  const filterIndex = (id) => window.state.filters.indexOf(window.state.filters.filter(item => item.id === id)[0]);

  const filterToggle = (inc, obj) => {
    const exist = window.state.filters.filter(item => item.id === obj.id).length > 0;
    console.log(obj);

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
        console.log('Элементов в фильтре:', window.state.filters.length);
        console.log('Фильтр:', window.state.filters, '\n\n');
        return false;
      }
      window.state.filters.push(obj);
    }

    console.log('Элементов в фильтре:', window.state.filters.length);
    console.log('Фильтр:', window.state.filters, '\n\n');
    window.filterObserver.broadcast(window.state.filters);
  }

  range.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];

    inputs.forEach((input, handle) => {

      if(inputs[handle].value) {
        console.log(inputs[handle].value);

        inputs[handle].dataset.filtered = inputs[handle].id
        filterToggle(true, {
          id: inputs[handle].id,
          label: inputs[handle].dataset.title,
          value: inputs[handle].value.split(' ').join(''),
          inc: true,
        })
      }
    })
  })

  inputs.forEach(function (input, handle) {

    input.addEventListener('input', function (e) {
      this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      const val = formatNumbers(Math.round(+this.value.split(' ').join('')));
      range.noUiSlider.setHandle(handle, this.value);
      this.value = val;
    });

    input.addEventListener('keydown', function (e) {

      var values = range.noUiSlider.get();

      var value = Number(values[handle].split(' ').join(''));

      var steps = range.noUiSlider.steps();

      var step = steps[handle];

      var position;

      switch (e.which) {
        case 13:
          range.noUiSlider.setHandle(handle, this.value);
          break;

        case 38:
          position = step[1];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            if (e.shiftKey) {
              range.noUiSlider.setHandle(handle, value + position * 10);
              this.value = formatNumbers(value + position * 10);
            }
            else {
              range.noUiSlider.setHandle(handle, value + position);
              this.value = formatNumbers(value + position);
            }
          }
          break;
        case 40:

          position = step[0];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            if (e.shiftKey) {
              range.noUiSlider.setHandle(handle, value - position * 10);
              this.value = formatNumbers(value - position * 10);
            }
            else {
              range.noUiSlider.setHandle(handle, value - position);
              this.value = formatNumbers(value - position);
            }
          }
          break;
      }
    })
  });
}

export default initPriceSlider;
