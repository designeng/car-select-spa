define(['jquery'], function($) {
  var removeBehavior;
  return removeBehavior = function(selectedCarsCollection) {
    return function(model) {
      return function(event) {
        var id;
        id = model.get('id');
        return selectedCarsCollection.remove(model);
      };
    };
  };
});
