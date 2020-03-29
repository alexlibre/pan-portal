const initDraggables = () => {
  const draggables = document.querySelectorAll('.js-draggable');
  let dragged;

  draggables.forEach(draggable => {
    draggable.setAttribute('draggable', true)
  })

  document.addEventListener("dragstart", function (event) {
    dragged = event.target;
  }, false);


  document.addEventListener("dragover", function (event) {
    event.preventDefault();
    const dropZone = event.target.closest(".js-drag-zone");
    if (dropZone) {
      dropZone.classList.add('is-dragover');
    }
  }, false);

  document.addEventListener("dragleave", function (event) {
    const dropZone = event.target.closest(".js-drag-zone");
    if (dropZone) {
      dropZone.classList.remove('is-dragover');
    }

  }, false);

  document.addEventListener("drop", function (event) {
    event.preventDefault();

    document.querySelectorAll('.js-drag-zone').forEach(zone => {
      zone.classList.remove('is-dragover');
    })

    const newDropZone = event.target.closest(".js-drag-zone");

    if (newDropZone) {
      console.log(newDropZone.querySelector('.filtered-clear'));

      newDropZone.insertBefore(dragged, newDropZone.children[0]);
      console.log('dragged', dragged, 'GOT ID', id);
      const id = dragged.querySelector('.filtered__del').dataset.id;

      console.log(window.state.filters.filter(item => item.id === id)[0].inc);


      window.state.filters.filter(item => item.id === id)[0].inc = !window.state.filters.filter(item => item.id === id)[0].inc;
      console.log(window.state.filters.filter(item => item.id === id)[0].inc);

      window.filterObserver.broadcast(window.state.filters);
      console.log(window.state.filters);

    }

  }, false);

}

export default initDraggables;
