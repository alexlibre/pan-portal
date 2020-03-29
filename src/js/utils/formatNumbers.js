const formatNumbers = (n) => {
  const val = (n + "").split(' ').join('');
  n = val;
  return (n + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "")
};

export default formatNumbers;

