const filterList = (arr, query, cb) => {
  return arr.filter(function (el) {
    return cb(el, query);
  })
}

export default filterList;
