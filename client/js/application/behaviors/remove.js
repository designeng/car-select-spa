define(function() {
  var removeItemBehavior;
  return removeItemBehavior = function(selectedCarsCollection) {
    return function(model, $button) {
      return {
        click: function(event) {
          return selectedCarsCollection.remove(model.get('id'));
        }
      };
    };
  };
});
