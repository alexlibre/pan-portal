
const initSelects = () => {
  const selects = document.querySelectorAll('select');

  const open = function(e) {
    e.stopPropagation();
    document.querySelectorAll('.custom-select.is-active').forEach(opened => {
      if (opened !== this) {
        opened.classList.remove('is-active');
      }
    })
    this.classList.toggle('is-active');
  }

  selects.forEach(select => {
    const id = select.id;
    const numberOfOptions = select.children.length;
    select.classList.add('custom-select__select-hidden');



    const newSelect = document.createElement('div');
    newSelect.classList.add('custom-select');
    select.parentNode.insertBefore(newSelect, select);
    newSelect.appendChild(select)

    const label = document.querySelector('[for='+id+']');
    if (label) {
      label.classList.add('custom-select-label');
      label.addEventListener('click', function () {
        document.querySelectorAll('.custom-select.is-active').forEach(opened => {
          opened.classList.remove('is-active');
        })
        document.getElementById(id).classList.toggle('is-active');
      })
    }

    const newSelected = document.createElement('div');



    const newList = document.createElement('ul');
    newList.classList.add('custom-select__options');

    for (let i = 0; i < numberOfOptions; i++) {
      let option = document.createElement('li');
      option.classList.add('custom-select__option');
      let inner = document.createElement('span');
      if(select.children[i].dataset.classes && select.children[i].dataset.classes.length > 0) {
        let classes = select.children[i].dataset.classes;
        if(classes && classes.length > 0) {
          classes.split(' ').forEach(cn => {
            inner.classList.add(cn);
          })
        }
      }
      option.dataset.id = i;
      inner.innerHTML = select.children[i].innerHTML;
      option.appendChild(inner)
      newList.appendChild(option)
    }
    newSelect.appendChild(newList);
    newSelected.classList.add('custom-select__selected');
    newSelected.innerHTML = select.children[0].innerHTML;
    newSelect.appendChild(newSelected);



    newSelect.addEventListener('click', open);

    newList.addEventListener('click', function (e) {
      e.stopPropagation();
      const li = e.target.closest('li');
      if (li) {
        const val = li.innerHTML;
        newSelected.innerHTML = val;
        const classList = li.dataset.classes;
        if(classList && classList.length > 0) {
          const classNames = classList.split(' ');
          classNames.forEach(val => {
            newSelected.classList.add(val)
          })
        }
        select.options.selectedIndex = li.dataset.id;
        newSelect.classList.remove('is-active');
      }
    });

    document.addEventListener('click', function () {
      newSelect.classList.remove('is-active');
    })



  })
}

export default initSelects;
