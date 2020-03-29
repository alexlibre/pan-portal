const fixComplexNav = () => {
  const navigation = document.querySelector(".navigation__block");

  if (navigation) {

    let fixPosition;
    // Пока слайдеры грузятся, отступ элемента недействителен
    setTimeout(() => {
      fixPosition = navigation.offsetTop + 100; // getCoords(navigation);
    }, 500);

    const fix = e => {
      const isFixed = navigation.classList.contains("nav_fixed");
      if (pageYOffset >= fixPosition && !isFixed) {
        navigation.classList.add("nav_fixed");
        navigation.style.cssText = `top: 0px;`;
      } else if (pageYOffset < fixPosition && isFixed) {
        navigation.classList.remove("nav_fixed");
        navigation.style.cssText = "";
      }
    };

    let timer = false;
    document.addEventListener("scroll", event => {
      if (!timer)
        timer = setTimeout(() => {
          fix(event);
          timer = false;
        }, 200);
    });
  }
};

export default fixComplexNav;
