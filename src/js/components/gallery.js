import PhotoSwipe from "photoswipe";
import PhotoSwipeUI from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/src/css/main.scss";
import "photoswipe/src/css/default-skin/default-skin.scss";

const initGallery = () => {
  console.log(require("../../images/svg/hospital.svg").default);
  const pswpElement = document.querySelector(".pswp");
  const sliderItems = document.querySelectorAll(".gallery__item");
  if (sliderItems.length === 0 || !pswpElement) return;

  for (let i = 0; i < sliderItems.length; ++i) {
    sliderItems[i].addEventListener("click", function(event) {
      const elements = this.closest(".gallery__wrapper").querySelectorAll(
        ".gallery__item"
      );
      const slides = {};

      // Убираем зацикленные слайдером картинки
      for (let i = 0; i < elements.length; ++i) {
        const id = elements[i].dataset.index;
        if (!slides[id]) slides[id] = elements[i];
      }

      initPhotoSwipe(slides, Number(this.dataset.index));
    });
  }

  const initPhotoSwipe = (slides, clickedSlideIndex) => {
    const images = [];
    const options = {
      index: clickedSlideIndex
    };

    for (let i in slides) {
      images.push({
        src: slides[i].dataset.src,
        w: slides[i].dataset.width,
        h: slides[i].dataset.height
      });
    }

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI, images, options);

    gallery.init();
  };
};

export default initGallery;
