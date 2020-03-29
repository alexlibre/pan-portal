const ITEMS = [
  {
    name: "kindergarden",
    coords: [59.928185, 30.346204],
    hintContent: "Детский сад",
    icon: require("../../images/svg/kindergarden.svg").default,
    iconColor: "#7684BC"
  },
  {
    name: "bank",
    coords: [59.932185, 30.344204],
    hintContent: "Банк",
    icon: require("../../images/svg/bank.svg").default,
    iconColor: "#727272"
  },
  {
    name: "kindergarden",
    coords: [59.916185, 30.341204],
    hintContent: "Детский сад",
    icon: require("../../images/svg/kindergarden.svg").default,
    iconColor: "#7684BC"
  }
];

const initInfrastructureMap = () => {
  const mapItems = {};

  const initMap = () => {
    const mapContainer = document.querySelector("#infrastructure-map");
    if (!mapContainer || typeof ymaps === undefined) return;

    ymaps.ready(() => {
      const map = new ymaps.Map(mapContainer, {
        center: [59.928185, 30.346204],
        zoom: 13,
        controls: ["zoomControl"]
      });

      map.behaviors.disable("scrollZoom");

      map.events.add("mousedown", () => {
        map.behaviors.enable("scrollZoom");
      });

      const layer = map.layers.get(0).get(0);

      // кэшируем инфраструктуру, карта долго грузиться может :(
      waitForTilesLoad(layer).then(() => {
        initMapItems();
      });

      ITEMS.forEach(el => {
        let placemark = new ymaps.Placemark(
          el.coords,
          {
            hintContent: el.hintContent,
            iconColor: el.iconColor
          },
          {
            iconLayout: "default#imageWithContent",
            iconImageHref: "",
            iconImageSize: [40, 40],
            iconOffset: [-20, -20],
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
              `<div class="infrastructure-map-${el.name}" style="display:flex; align-items:center; justify-content: center; background-color:$[properties.iconColor]; border-radius:50%; width:40px; height:40px"><svg fill="none" stroke="#fff" style="width:20px;height:20px"><use xlink:href=${el.icon}></use></svg></div>`
            )
          }
        );

        map.geoObjects.add(placemark);
      });
    });

    initEvents();
  };

  const initMapItems = () => {
    for (let i = 0; i < ITEMS.length; ++i) {
      const name = ITEMS[i].name;
      if (mapItems.hasOwnProperty(name) && mapItems[name].length > 0) continue;

      mapItems[name] = document.querySelectorAll(`.infrastructure-map-${name}`);
    }
  };

  const initEvents = () => {
    const checkboxes = document.querySelectorAll(".infrastructure-checkbox");

    for (let i = 0; i < checkboxes.length; ++i) {
      checkboxes[i].addEventListener("change", event => {
        const checkbox = event.target;
        if (!mapItems[checkbox.name]) return;

        // Если не успели загрузиться тайлы карты, повторно пытаемся кэшировать инфраструктуру
        if (mapItems[checkbox.name].length === 0) initMapItems();

        for (let j = 0; j < mapItems[checkbox.name].length; ++j) {
          mapItems[checkbox.name][j].style.display = checkbox.checked
            ? "flex"
            : "none";
        }
      });
    }
  };

  // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
  const waitForTilesLoad = (layer) => {
    return new ymaps.vow.Promise(function(resolve, reject) {
      const tc = getTileContainer(layer);
      let readyAll = true;
      tc.tiles.each(function(tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function() {
          resolve();
        });
      }
    });
  }

  const getTileContainer = (layer) => {
    for (let k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
          layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }

  window.addEventListener("DOMContentLoaded", () => {
    initMap();
  });
};

export default initInfrastructureMap;