const goBack = () => {
  const backBtns = document.querySelectorAll('.js-go-back');
  if(!backBtns.length) return false;

  const onClickFunc = () => {
    window.history.back();
  }

  const initEvents = (el) => {
    el.addEventListener('click', onClickFunc);
  }

  backBtns.forEach(btn => {
    initEvents(btn);
  })
}

export default goBack;
