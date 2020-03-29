const fixHeader = () => {
  const header = document.querySelector('header.header');
  if (!header) return;
  const headerTop = header.querySelector('.header__top');
  const headerHeight = header.clientHeight;

  const fix = (e) => {
    const scrollVal = window.scrollY;
    if (scrollVal >= headerHeight) {
      headerTop.style.cssText = `transform: translateY(-100%)`;
      if (scrollVal >= headerHeight * 2) {
        header.classList.add('header_fixed');
        headerTop.style.cssText = `transform: translateY(0)`;
        document.body.style.cssText = `padding-top: ${headerHeight}px`;
      }
    } else if (scrollVal > headerHeight * 2) {
      headerTop.style.cssText = `transform: translateY(0)`;
    } else {
      header.classList.remove('header_fixed');
      headerTop.style.cssText = `transform: translateY(0)`;
      document.body.style.cssText = '';
    }
  }

  document.addEventListener('scroll', fix)
}

export default fixHeader;
