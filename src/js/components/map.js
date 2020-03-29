if (document.querySelector('#myMap')) {
  ymaps.modules.define('ext.paintOnMap', ['meta', 'util.extend', 'pane.EventsPane', 'Event'], function (provide, meta, extend, EventsPane, Event) {
    'use strict';

    var EVENTS_PANE_ZINDEX = 500;
    var DEFAULT_UNWANTED_BEHAVIORS = ['drag', 'scrollZoom'];
    var DEFAULT_STYLE = { strokeColor: '#ff0000', strokeWidth: 1, strokeOpacity: 1 };
    var DEFAULT_TOLERANCE = 16;

    var badFinishPaintingCall = function () {
      throw new Error('(ymaps.ext.paintOnMap) некорректный вызов PaintingProcess#finishPaintingAt. Рисование уже завершено.');
    };

    function paintOnMap(map, positionOrEvent, config) {
      config = config || {};
      var style = extend(DEFAULT_STYLE, config.style || {});

      var unwantedBehaviors = config.unwantedBehaviors === undefined ?
        DEFAULT_UNWANTED_BEHAVIORS : config.unwantedBehaviors;

      var pane = new EventsPane(map, {
        css: { position: 'absolute', width: '100%', height: '100%' },
        zIndex: EVENTS_PANE_ZINDEX + 50,
        transparent: true
      });

      map.panes.append('ext-paint-on-map', pane);

      if (unwantedBehaviors) {
        map.behaviors.disable(unwantedBehaviors);
      }

      // Создаём canvas-элемент.
      var canvas = document.createElement('canvas');
      var ctx2d = canvas.getContext('2d');
      var rect = map.container.getParentElement().getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx2d.globalAlpha = style.strokeOpacity;
      ctx2d.strokeStyle = style.strokeColor;
      ctx2d.lineWidth = style.strokeWidth;

      canvas.style.width = '100%';
      canvas.style.height = '100%';

      pane.getElement().appendChild(canvas);

      var firstPosition = positionOrEvent ? toPosition(positionOrEvent) : null;
      var coordinates = firstPosition ? [firstPosition] : [];

      var bounds = map.getBounds();
      var latDiff = bounds[1][0] - bounds[0][0];
      var lonDiff = bounds[1][1] - bounds[0][1];

      canvas.onmousemove = function (e) {
        coordinates.push([e.offsetX, e.offsetY]);

        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        ctx2d.beginPath();

        ctx2d.moveTo(coordinates[0][0], coordinates[0][1]);
        for (var i = 1; i < coordinates.length; i++) {
          ctx2d.lineTo(coordinates[i][0], coordinates[i][1]);
        }

        ctx2d.stroke();
      }.bind(this);

      // Создаём косвенное обращение, чтобы не сдерживать сборщик мусора.
      var paintingProcess = {
        finishPaintingAt: function (positionOrEvent) {
          paintingProcess.finishPaintingAt = badFinishPaintingCall;

          // Получаем координаты, прежде чем удалить пейн.
          if (positionOrEvent) {
            coordinates.push(toPosition(positionOrEvent));
          }

          map.panes.remove(pane);
          if (unwantedBehaviors) {
            map.behaviors.enable(unwantedBehaviors);
          }

          var tolerance = config.tolerance === undefined ? DEFAULT_TOLERANCE : Number(config.tolerance);
          if (tolerance) {
            coordinates = simplify(coordinates, tolerance);
          }
          // Преобразовываем координаты canvas-элемента в геодезические координаты.
          return coordinates.map(function (x) {
            var lon = bounds[0][1] + (x[0] / canvas.width) * lonDiff;
            var lat = bounds[0][0] + (1 - x[1] / canvas.height) * latDiff;

            return meta.coordinatesOrder === 'latlong' ? [lat, lon] : [lon, lat];
          });
        }
      };

      return paintingProcess;
    }

    function toPosition(positionOrEvent) {
      return positionOrEvent instanceof Event ?
        [positionOrEvent.get('offsetX'), positionOrEvent.get('offsetY')] :
        positionOrEvent;
    }

    function simplify(coordinates, tolerance) {
      var toleranceSquared = tolerance * tolerance;
      var simplified = [coordinates[0]];

      var prev = coordinates[0];
      for (var i = 1; i < coordinates.length; i++) {
        var curr = coordinates[i];
        if (Math.pow(prev[0] - curr[0], 2) + Math.pow(prev[1] - curr[1], 2) > toleranceSquared) {
          simplified.push(curr);
          prev = curr;
        }
      }

      return simplified;
    }

    provide(paintOnMap);
  });
}



const initMap = () => {
  const mapBtn = document.querySelector('.js-show-map');
  if (!mapBtn) return false;
  const listBtn = document.querySelector('.js-show-list');
  const mapSection = document.querySelector('.section__map');
  const listSection = document.querySelector('.section__cards');

  listBtn.addEventListener('click', function (e) {
    mapSection.style.display = 'none';
    mapBtn.style.display = 'block';
    listSection.style.display = 'block';
    this.style.display = 'none';
    e.target.closest('.section').classList.add('section_view_gray');
    e.target.closest('.section').classList.remove('section_view_white');
  })

  ymaps.ready(['ext.paintOnMap']).then(() => {
    init()
  }).catch(console.error);

  function init() {
    const mapContainer = document.querySelector('#myMap')
    if (!mapContainer) return false;

    mapBtn.addEventListener('click', createMap);
    let myMap;

    function createMap(e) {
      mapSection.style.display = 'block';
      listSection.style.display = 'none';
      mapBtn.style.display = 'none';
      listBtn.style.display = 'block';
      e.target.closest('.section').classList.remove('section_view_gray');
      e.target.closest('.section').classList.add('section_view_white');

      if (myMap !== undefined) {
        return false;
      }

      myMap = new ymaps.Map(mapContainer, {
        center: [55.76, 37.64],
        zoom: 7,
        controls: ['zoomControl']
      });

      myMap.behaviors.disable('scrollZoom')

      const objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 64,
      });

      // objectManager.objects.options.set('preset', 'islands#redDotIcon');
      var clusterIcons = [
        {
          href: '/assets/images/cluster.png',
          size: [40, 40],
        offset: [-20, -20]
        }
      ],
      clusterNumbers = [100],
 MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>'
 );

 var clusterOptions = {
  clusterIcons: clusterIcons,
  clusterIconContentLayout: MyIconContentLayout
}


      objectManager.objects.options.set({
        iconLayout: 'default#image',
        iconImageHref: '/assets/images/place.png',
        iconImageSize: [25, 40]
    })
      objectManager.clusters.options.set(clusterOptions);

      myMap.geoObjects.add(objectManager);

      fetch('./data/data.json').then(data => data.json()).then(data => {
        objectManager.add(data);
        myMap.setBounds(objectManager.getBounds())

        // objectManager.objects.events.add('click', function(e) {
        //   const objectId = e.get('objectId');
        //   objectManager.objects.each(object => {
        //     objectManager.objects.setObjectOptions(object.id, {'preset': 'islands#redDotIcon'})
        //   })
        //   objectManager.objects.setObjectOptions(objectId, {'preset': 'islands#blackDotIcon'})
        // })
      })

      const ButtonLayout = ymaps.templateLayoutFactory.createClass([
        '<button title="{{ data.title }}" class="button button_view_ghost {% if state.selected %}is-active{% endif %}"><svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.1875 13.8726C0.1875 6.30243 6.31378 0.176147 13.8839 0.176147V1.67615C7.14221 1.67615 1.6875 7.13086 1.6875 13.8726H0.1875ZM7.96882 9.25391C7.77128 8.4709 8.48187 7.76032 9.26487 7.95786L9.30777 7.96868L20.1179 12.0992C20.8766 12.333 21.1285 13.3002 20.5556 13.8731L20.5285 13.9002L18.5628 15.5007L21.3688 18.3067C21.8064 18.7443 21.8083 19.4539 21.3695 19.8927L19.9037 21.3585C19.4649 21.7973 18.7553 21.7955 18.3176 21.3578L15.5116 18.5519L13.9112 20.5176L13.8841 20.5447C13.3118 21.117 12.3433 20.8664 12.1105 20.1054L7.97965 9.29684L7.96882 9.25391ZM9.7572 9.74617L13.2679 18.9319L15.3975 16.3164L19.111 20.0299L20.0409 19.1L16.3273 15.3865L18.9437 13.2563L9.7572 9.74617Z"/></svg>',
        '<span class="my-button__text">{{ data.content }}</span>',
        '</button>'
      ].join(''));

      const drawAreaBtn = new ymaps.control.Button({
        data: {
          content: "Выделить область",
          title: "Выделить область"
        },
        options: {
          layout: ButtonLayout,
          maxWidth: [170, 190, 220]
        }
      });

      drawAreaBtn.events.add('click', function (e) {
        if (myMap.geoObjects.get(1)) {
          objectManager.setFilter(function(){
            return true;
          })
          myMap.geoObjects.remove(myMap.geoObjects.get(1))
          myMap.setBounds(objectManager.getBounds());
        }
        myMap.cursors.push('arrow');
      })

      myMap.controls.add(drawAreaBtn, {
        right: 26,
        top: 23
      });

      let paintProcess, currentIndex = 0;

      myMap.events.add('mousedown', function (e) {
        if (drawAreaBtn.isSelected()) {
          if (myMap.geoObjects.get(1)) {
            myMap.geoObjects.remove(myMap.geoObjects.get(1))
          }
          if (currentIndex == 0) {
            currentIndex = 0;
          } else {
            currentIndex += 1;
          }
          paintProcess = ymaps.ext.paintOnMap(myMap, e, {
            unwantedBehaviors: ['drag']
          });
        } else {
          myMap.cursors.push('grab');
        }

        myMap.behaviors.enable('scrollZoom')
      });

      myMap.events.add('mouseup', function (e) {
        if (paintProcess) {

          const coordinates = paintProcess.finishPaintingAt(e);
          paintProcess = null;

          var drawArea = new ymaps.Polygon([coordinates], {}, {
            fillColor: 'rgb(255, 45, 35)',
            fillOpacity: 0.1,
            strokeStyle: 'dot',
            strokeColor: 'rgb(255, 45, 35)',
            strokeWidth: 3
          });

          myMap.geoObjects.add(drawArea);
          myMap.setBounds(drawArea.geometry.getBounds())
          drawAreaBtn.deselect();

          const objects = ymaps.geoQuery(objectManager.objects);
          const filtered = objects.searchInside(drawArea).setOptions('visible', true);
          const less = objects.remove(filtered).setOptions('visible', false);

          function filterObjs(arr) {
            return function (obj) {
              return arr._objects[obj.id].options.get('visible')
            }
          }

          objectManager.setFilter(filterObjs(objects))
        }
      });
    }
  }
}

export default initMap;
