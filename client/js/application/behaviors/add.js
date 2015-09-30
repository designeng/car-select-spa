define(['jquery'], function($) {
  var addItemBehavior;
  return addItemBehavior = function(selectedCarsCollection) {
    return function(model) {
      return function(event) {
        selectedCarsCollection.add(model);
        return $(event.target).prop('disabled', true);
      };
    };
  };
});
