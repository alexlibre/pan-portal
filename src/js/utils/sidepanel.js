const handleSidepanel = () => {
  const panel = document.querySelector('.panel');
  if (!panel) return false;

  const footer = document.querySelector('.footer');
  let panelbottom = panel.getBoundingClientRect().y + panel.getBoundingClientRect().height;

  const fix = () => {
    if (!footer) return false
    let delta = (window.innerHeight - footer.getBoundingClientRect().y);
    if(footer.getBoundingClientRect().y - 230 < panelbottom) {
      panel.style.cssText = `bottom: ${delta + 230}px; transform: translateY(0)`
    } else {
      panel.style.cssText = 'transform: translateY(127px);'
    }
  }

  document.addEventListener('scroll', fix)

  document.querySelector('.js-show-social').addEventListener('mouseover', function () {
    document.querySelector('.panel__social').classList.add('is-active')
  })
  document.querySelector('.js-show-social').addEventListener('mouseleave', function () {
    document.querySelector('.panel__social').classList.remove('is-active')
  })
}

export default handleSidepanel;
