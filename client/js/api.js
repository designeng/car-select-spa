define(function() {
  var api, prefix;
  prefix = "http://localhost:7788/api/v1/";
  return api = {
    getCarsCollectionUrl: function() {
      return "" + prefix + "cars";
    }
  };
});
