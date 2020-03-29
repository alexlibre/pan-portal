const handleFavorites = () => {
  const storage = window.localStorage;
  let favorites = JSON.parse(storage.getItem('favorites')) || [];
  let favs = favorites.length || 0;

  const populateFavs = () => {
      favorites.forEach(function(favorite) {
          $('[data-fav-id="' + favorite +'"]').addClass('is-fav');
      });
  };

  const updateFavs = (favs) => {
    window.favs = favs;

    if (window.favs) {
      document.querySelectorAll('.js-fav-val').forEach(fav => {
        fav.classList.add('is-visible');
        fav.innerText = window.favs;
        document.querySelector('.js-fav-tooltip-val').innerText = window.favs;
      })
    } else {
      document.querySelectorAll('.js-fav-val').forEach(fav => {
        fav.classList.remove('is-visible');
        fav.innerText = '';
        document.querySelector('.js-fav-tooltip-val').innerText = 0;
      })
    }
  }
  populateFavs();

  $('[data-fav-id]').on('click', e => {
      let item = e.target.closest('.js-favorites-add'),
          id = e.target.closest('.js-favorites-add').dataset.favId,
          idx = favorites.indexOf(id);

      if (!id) return;
      if (idx === -1) {
          favorites.push(id);
          $('[data-fav-id="' + id +'"]').addClass('is-fav');
      } else {
          favorites.splice(idx, 1);
          $('[data-fav-id="' + id +'"]').removeClass('is-fav');
      }
    storage.setItem('favorites', JSON.stringify(favorites));
    favs = favorites.length ? favorites.length : null;
    updateFavs(favs);
  })
  updateFavs(favs);

};

export default handleFavorites;
