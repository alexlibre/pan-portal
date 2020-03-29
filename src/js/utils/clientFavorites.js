const handleClientFavorites = () => {
  const storage = window.localStorage;
  let favorites = JSON.parse(storage.getItem('clientFavorites')) || [];
  let favs = favorites.length || 0;

  const populateFavs = () => {
      favorites.forEach(function(favorite) {
          $('[data-client-fav="' + favorite +'"]').addClass('is-fav');
      });
  };

  const updateFavs = (favs) => {
    window.favs = favs;
  }
  populateFavs();

  $('[data-client-fav]').on('click', e => {
      let item = e.target.closest('.clients__fav-btn'),
          id = e.target.closest('.clients__fav-btn').dataset.clientFav;
          console.log(id);

      let idx = favorites.indexOf(id);

      if (!id) return;
      if (idx === -1) {
          favorites.push(id);
          $('[data-client-fav="' + id +'"]').addClass('is-fav');
      } else {
          favorites.splice(idx, 1);
          $('[data-client-fav="' + id +'"]').removeClass('is-fav');
      }
    storage.setItem('clientFavorites', JSON.stringify(favorites));
    favs = favorites.length ? favorites.length : null;
    updateFavs(favs);
  })
  updateFavs(favs);
};

export default handleClientFavorites;
