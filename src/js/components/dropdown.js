const initDropdowns = () => {
  const dropdowns = [...document.querySelectorAll('.js-dropdown')];

  const activateView = (node) => {
    if (!node) return;
    node.classList.add('is-active');
  };

  const disactivateView = (node) => {
    if (!node) return;
    node.classList.remove('is-active');
  };

  const checkAlign = (dropdown, parent) => {
    let parentNode = dropdown.closest(parent);
    if (!parentNode) {
      parentNode = document.body;
    }
    const dropdownBlock = dropdown.querySelector('.dropdown__block')

    if(dropdownBlock.getBoundingClientRect().right > (parentNode.getBoundingClientRect().x + parentNode.getBoundingClientRect().width)) {
      dropdownBlock.classList.add('dropdown__block_align_right');
      if(dropdown.closest('.header__top-profile')) {
        console.log('somth');

      }
    }
  }

  const toggleDropdown = function (e) {
    const drop = e.target.closest('.js-dropdown');

    if (drop) {
      dropdowns.map(dropdown => {
        if (dropdown !== drop) {
          dropdown.classList.remove('is-showing');
          dropdown.querySelector('.dropdown__block').classList.value = 'dropdown__block';
          disactivateView(dropdown.querySelector('.dropdown-view'));
        }
      });
      if (e.target.closest('.dropdown__btn') && drop.classList.contains('is-showing')) {
        drop.classList.remove('is-showing');

        drop.querySelector('.dropdown__block').classList.value = 'dropdown__block';
        disactivateView(drop.querySelector('.dropdown-view'));
      } else {
        drop.classList.add('is-showing');
        activateView(drop.querySelector('.dropdown-view'));
        checkAlign(drop, '.form')
      }

    } else {
      dropdowns.map(dropdown => {
        dropdown.classList.remove('is-showing');
        disactivateView(dropdown.querySelector('.dropdown-view'));
      })
    }
  };

  document.addEventListener('mousedown', toggleDropdown);
}

export default initDropdowns;
