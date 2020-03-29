import formatNumbers from "../utils/formatNumbers";
import noUiSlider from "nouislider";
import "../../../node_modules/nouislider/distribute/nouislider.min.css";

const initInputSliders = () => {
  const slidersContainers = [...document.querySelectorAll(".slider-input")];

  slidersContainers.map(container => {
    const valueInput = container.querySelector(".slider-input__control");
    const slider = container.querySelector(".slider__input");
    const postfix = container.dataset.postfix;
    const isPrice = container.dataset.isPrice !== undefined;
    const start = Number(container.dataset.start);
    const step = Number(container.dataset.step);
    const min = Number(container.dataset.min);
    const max = Number(container.dataset.max);

    noUiSlider.create(slider, {
      start,
      connect: [true, false],
      range: {
        min,
        max
      },
      step,
      format: {
        to: function(value) {
          let result = step % 1 > 0 ? value.toFixed(1) : parseInt(value);
          return formatNumbers(Math.round(result)) + postfix;
        },
        from: function(value) {
          if (postfix)
            return Number(
              value
                .replace(postfix, "")
                .split(" ")
                .join("")
            );

          return Number(value.replace(" ", ""));
        }
      }
    });

    slider.noUiSlider.on("update", function(values, handle) {
      valueInput.value = values[handle];
    });

    valueInput.addEventListener("change", function() {
      slider.noUiSlider.set(this.value);
    });

    valueInput.addEventListener("input", function() {
      // Сохраняем позицию курсора
      let pos = this.selectionStart;
      const prevLength = this.value.length;

      this.value = formatNumbers(this.value);
      const newLength = this.value.length;

      // Возвращаем курсор к своей настоящей позиции
      pos = pos + (newLength - prevLength);
      this.setSelectionRange(pos, pos);
    })
  });

  const allPriceSliders = [...document.querySelectorAll(".price-input")];
  allPriceSliders.map(slider => {
    slider.addEventListener("focus", function() {
      this.value = this.value.replace(" р.", "");
    });

    slider.addEventListener("blur", function() {
      if (!this.value) return;
      this.value = this.value.replace(" р.", "") + " р.";
    });
  });
};

export default initInputSliders;
