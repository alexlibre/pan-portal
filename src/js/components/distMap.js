const initDistMap = () => {
  const mapContainer = document.querySelector('#dist-map-container');
  if (!mapContainer) return false;
  let mapCreated = false, myMap;
  const distMapBtn = document.querySelector('.js-modal-btn[data-id="dist-map"]')

  const colorizeDists = (id, om) => {
    if (window.state.filters.map(item => item.id).indexOf('dist-' + id) !== -1) {
      om.objects.setObjectOptions(id, {
        fillOpacity: .75,
      });
    } else {
      om.objects.setObjectOptions(id, {
        fillOpacity: .4,
      });
    }
  }

  const addFiltered = (id, val) => {
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
        <span class="filtered__type">Район</span>
        <span class="filtered__value">${val}</span>
        <button class="button filtered__del" data-id="${id}">
          ${renderedClose}
        </button>
      </div>`;

    const obj = {
      id: 'dist-' + id,
      label: 'Район',
      value: val,
      inc: true,
    }

    if (window.state.filters.filter(item => item.id === ('dist-' + id)).length === 0) {
      window.state.filters.push(obj);
      document.getElementById('dist-' + id).dataset.filtered = 'dist-' + id;
      document.getElementById('dist-' + id).checked = true;
      document.querySelector(`.index-search__filter-inc`).insertBefore(newFiltered, document.querySelector(`.index-search__filter-inc`).querySelector('.filtered-clear'));
    } else {
      window.state.filters = window.state.filters.filter(item => item.id !== 'dist-' + id);
      document.getElementById('dist-' + id).removeAttribute('data-filtered');
      document.getElementById('dist-' + id).checked = false;
    }
    window.filterObserver.broadcast(window.state.filters);
  }

  const createMap = () => {
    if (mapCreated === true) {
      myMap.destroy();
      mapCreated = false;
    };

    myMap = new ymaps.Map(mapContainer, {
      center: [55.76, 37.64],
      zoom: 7,
      controls: ['zoomControl']
    });

    const objectManager = new ymaps.ObjectManager();
    myMap.geoObjects.add(objectManager);

    function onObjectEvent(e) {
      const objectId = e.get('objectId'),
        objectTitle = objectManager.objects.getById(objectId).properties.hintContent;

      addFiltered(objectId, objectTitle);
      colorizeDists(objectId, objectManager);
    }

    objectManager.objects.events.add('mouseenter', function (e) {
      var objectId = e.get('objectId'),
        overlay = objectManager.objects.overlays.getById(objectId);
        if(window.state.filters.filter(item => item.id === 'dist-' + objectId).length === 0) {
        addHover(objectId);
        overlay.events.add('mapchange', unsetHover);
        }
    });

    objectManager.objects.events.add('mouseleave', function (e) {
      var objectId = e.get('objectId'),
        overlay = objectManager.objects.overlays.getById(objectId);

      if(window.state.filters.filter(item => item.id === 'dist-' + objectId).length === 0) {
        unsetHover(objectId);
        overlay.events.remove('mapchange', unsetHover);
      }
    });

    function unsetHover(objectId) {
      objectManager.objects.setObjectOptions(objectId, {
        fillOpacity: .4,
      });
    }

    function addHover(objectId) {
      objectManager.objects.setObjectOptions(objectId, {
        fillOpacity: .6,
      });
    }

    fetch('./data/dist.json').then(data => data.json()).then(data => {
      objectManager.add(data)
      myMap.setBounds(objectManager.getBounds())
      objectManager.events.add('click', onObjectEvent);

      window.state.filters.map(item => {
        if (item.id.indexOf('dist') !== -1) {
          const id = item.id.split('-')[1];
          colorizeDists(id, objectManager);
        }
      })
    })

    mapCreated = true;
  }

  distMapBtn.addEventListener('click', createMap);

}

export default initDistMap;
