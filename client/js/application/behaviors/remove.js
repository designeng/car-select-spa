define(function() {
  var removeBehavior;
  return removeBehavior = function(selectedCarsCollection) {
    return function(model) {
      return function(event) {
        return selectedCarsCollection.remove(model.get('id'));
      };
    };
  };
});
