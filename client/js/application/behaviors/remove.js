define(function() {
  var removeItemBehavior;
  return removeItemBehavior = function(selectedCarsCollection) {
    return function(model) {
      return function(event) {
        return selectedCarsCollection.remove(model.get('id'));
      };
    };
  };
});
