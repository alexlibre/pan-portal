import getScrollbarSize from '../utils/getScrollbarSize';

const initModals = () => {
  const scrollSize = getScrollbarSize();

  const btns = [...document.querySelectorAll('.js-modal-btn')];
  if (!btns.length) return false;

  const modals = [...document.querySelectorAll('.js-modal')];
  if (!modals.length) return false;

  const header = document.querySelector('.header');
  const headerTop = header.querySelector('.header__top');

  const toggleModal = (id) => {

    const modal = document.querySelector('.js-modal[data-id="' + id + '"]');
    if (!modal) return false;

    if (modal.classList.contains('is-opened')) {
      modal.classList.remove('is-opened');
      document.body.classList.remove('no-scroll');
      document.body.style = '';
      if(window.scrollY > 200) {
        header.classList.add('header_fixed');
        headerTop.style.cssText = 'transform: translateY(0);'
      }
      
    } else {
      const fixedHeader = header.classList.contains('header_fixed');
      modal.classList.add('is-opened');
      document.body.classList.add('no-scroll');
      document.body.style.paddingRight = scrollSize + 'px';
      if(fixedHeader) {
        header.classList.remove('header_fixed');
        headerTop.style.cssText = 'transform: translateY(-100%);'
      }
    }
  }

  btns.map(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.dataset.id;
      toggleModal(id)
    });
  });
}

export default initModals;
