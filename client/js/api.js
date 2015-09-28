define(function() {
  var api, prefix;
  prefix = "localhost/";
  return api = {
    getCarsCollectionUrl: function() {
      return "" + prefix + "cars";
    }
  };
});
