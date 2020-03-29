import getScrollBarSize from '../utils/getScrollBarSize';

const toggleBurger = () => {
  const scrollBar = getScrollBarSize();
  const burger = document.querySelector('.js-burger');
  if (!burger) return false;

  const mobileMenu = document.querySelector('.header__mobile');
  const mobileShadow = document.querySelector('.header__mobile-shadow');
  const mobileClose = document.querySelector('.header__mobile-close');

  const toggleClasses = (state) => {
    mobileMenu.classList[state]('is-active');
    mobileShadow.classList[state]('is-active');
    document.body.classList[state]('no-scroll');

    document.body.style.paddingRight = state === 'add' ? scrollBar + 'px' : '0px';
  }

  burger.addEventListener('click', function () {
    toggleClasses('add');
  })

  mobileShadow.addEventListener('click', function () {
    toggleClasses('remove');
  })

  mobileClose.addEventListener('click', function () {
    toggleClasses('remove');
  })
}

export default toggleBurger;
