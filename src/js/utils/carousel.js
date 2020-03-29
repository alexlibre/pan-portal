// import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider";
import { tns } from "tiny-slider/src/tiny-slider";
import "tiny-slider/src/tiny-slider.scss";
// import "../../../node_modules/tiny-slider/src/tiny-slider.scss";

const initSliders = () => {
  const imageTabs = document.querySelectorAll(".complex__images-nav");
  const complexSliders = [];

  for (let i = 0; i < imageTabs.length; ++i) {
    const tabId = imageTabs[i].dataset.tab;

    complexSliders[i] = tns({
      container: `#complex-slider-${tabId}`,
      items: 1,
      controlsContainer: `#complex-slider-controls-${tabId}`,
      navContainer: `#complex-slider-thumbnails-${tabId}`,
      navAsThumbnails: true,
    });
  }

  const anotherBlocksSlider = document.getElementById("anotherBlocks-slider");
  if (anotherBlocksSlider) {
    let contextSlider = tns({
      container: "#anotherBlocks-slider",
      items: 1,
      nav: false,
      loop: false,
      responsive: {
        1400: {
          items: 3,
          gutter: 20
        },
        1600: {
          gutter: 50
        }
      },
      controlsContainer: "#anotherBlocks-nav"
    });
  }

  const banksSlider = document.getElementById("banksSlider");
  if (banksSlider) {
    let banksSlider = tns({
      container: "#banksSlider",
      items: 1,
      nav: false,
      responsive: {
        600: {
          items: 2,
          gutter: 2
        },
        768: {
          items: 3,
          gutter: 2
        },
        1600: {
          items: 4,
          gutter: 2
        }
      },
      controlsContainer: "#banksSlider-nav"
    });
  }

  const banksSliderFlat = document.getElementById("banksSliderFlat");
  if (banksSliderFlat) {
    let banksSlider = tns({
      container: "#banksSliderFlat",
      items: 1,
      nav: false,
      responsive: {
        480: {
          items: 2,
          gutter: 2
        },
        768: {
          items: 3,
          gutter: 2
        }
      },
      controlsContainer: "#banksSlider-nav"
    });
  }

  const flatsSlider = document.getElementById("flatsSlider");
  if (flatsSlider) {
    let flatsSlider = tns({
      container: "#flatsSlider",
      items: 1,
      nav: false,
      // лучше не трогай loop
      // эта штука является еще и табами, серьезно не надо
      // click on original slider-item -> OK
      // click on looped slider-item   -> brainfuck
      loop: false,
      preventScrollOnTouch: "auto",
      responsive: {
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1240: {
          items: 4,
        }
      },
      controlsContainer: "#flatsSlider-nav"
    });
  }
};

export default initSliders;
