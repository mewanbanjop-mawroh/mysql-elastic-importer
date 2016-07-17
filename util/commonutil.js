var commonutil = {};

commonutil.isEmpty = function (value) {
  return (value == null || value.length === 0);
};

commonutil.isNumeric = function (n) {
  return !isNaN(parseInt(n)) && isFinite(n);
};

module.exports = commonutil;