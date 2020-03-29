const addField = () => {

  const add = function () {

    const fieldId = this.dataset.add;
    if(!fieldId) return false;

    const els = document.querySelectorAll('[data-field="' + fieldId + '"]');
    if(!els.length) return false;

    const el = els[els.length-1];
    const newEl = el.cloneNode(true);

    newEl.querySelector('input').id = newEl.querySelector('input').id + 1;
    newEl.setAttribute('for', newEl.querySelector('input').id);

    if(newEl.querySelector('.input__alert')) {
      newEl.removeChild(newEl.querySelector('.input__alert'));
    }

    const svg = '<svg class="icon" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.66667 1.3L0.333333 6.7" stroke-linecap="round"/><path d="M0.333333 1.3L5.66667 6.7" stroke-linecap="round"/></svg>';
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('input__remove');
    removeBtn.innerHTML = svg;

    newEl.appendChild(removeBtn);

    removeBtn.addEventListener('click', function(e){
      e.preventDefault();
      const el = this.parentElement;
      el.parentElement.removeChild(el);
    })

    el.parentElement.insertBefore(newEl, this.parentElement);
  }

  const handleBtns = (btn) => {
    btn.addEventListener('click', add);
  }

  const addBtns = document.querySelectorAll('.js-add-field');

  if(!addBtns.length) return false;
  addBtns.forEach((btn) => {
    handleBtns(btn);
  })

}

export default addField;
