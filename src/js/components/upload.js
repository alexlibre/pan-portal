import iconContent from '../../images/svg/deals-01.svg';
import iconEditContent from '../../images/svg/edit.svg';
import iconDeleteContent from '../../images/svg/x.svg';

const icon = `
<svg class="icon file-up__icon">
  <use xlink:href="${iconContent}" />
</svg>`;
const iconEdit = `
<svg class="icon">
  <use xlink:href="${iconEditContent}" />
</svg>`;
const iconDelete = `
<svg class="icon">
  <use xlink:href="${iconDeleteContent}" />
</svg>`;

const fileDel = (event) => {
  if(event.target.closest('.file-up__del')) {
    event.preventDefault();
    const item = event.target.closest('.file-up');
    item.parentElement.removeChild(item);
  }
}

const removeItem = (event) => {
  event.preventDefault();
  const el = event.target.closest('.input');
  el.parentElement.removeChild(el);
}

const fileEdit = (event) => {
  if(event.target.closest('.file-up__edit')) {
    event.preventDefault();
    const item = event.target.closest('.file-up');
    if(item.querySelector('.file-up__input')) return false;
    const num = item.dataset.num;

    console.log(num)
    const editInput = document.createElement('div');
    editInput.classList.add('file-up__input');
    editInput.classList.add('input');
    editInput.classList.add('input_type_form');

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input__control');
    input.id = `edit-${num}`;
    input.value = item.innerText;
    editInput.appendChild(input);

    input.addEventListener('input', function(){
      item.querySelector('.file-up__name').innerText = this.value;
    })

    input.addEventListener('keyDown', function(e) {
      e.preventDefault();
      if(e.keyCode == '13') {
        removeItem(e);
      }
    })

    const svg = '<svg class="icon" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.66667 1.3L0.333333 6.7" stroke-linecap="round"/><path d="M0.333333 1.3L5.66667 6.7" stroke-linecap="round"/></svg>';
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('input__remove');
    removeBtn.innerHTML = svg;

    removeBtn.addEventListener('click', removeItem)

    item.appendChild(editInput);
    editInput.appendChild(removeBtn);
  }
}

document.addEventListener('click', fileDel);
document.addEventListener('click', fileEdit);

const handleUpload = () => {
  const inputs = document.querySelectorAll('input[type="file"]');
  if(!inputs.length) return false;

  const handleInput = (input) => {
    input.addEventListener("change", handleInputChange);
  }

  const handleInputChange = (event) => {
    const files = event.target.files;
    if (!file && !file.length) return false;

    const id = event.target.id;
    const container = document.querySelector('.js-upload-container[data-id="' + id + '"]');
    if(!container) {
      console.error('No container for file upload results');
      return false;
    }
    container.innerHTML = '';
    files.forEach((file, idx) => {
      const item = document.createElement('div');
      item.dataset.num = idx;
      item.classList.add('file-up');
      item.innerHTML = render(file);
      container.appendChild(item)
    })
  }

  const render = (file) => {
    const fExt = file.type.split('/')[1];
    const fName = file.name.split('.' + fExt)[0];
    console.log(icon);


    const markup = `<div class="file-up__inner">
      ${icon}
      <span class="file-up__name">${fName}</span>
      <div class="file-up__controls">
        <button class="button button_view_round-control file-up__del">${iconDelete}</button>
        <button class="button button_view_round-control file-up__edit">${iconEdit}</button>
      </div>
    </div>`;

    return markup;
  }

  inputs.forEach(item => {
    handleInput(item);
  })
}

export default handleUpload;
