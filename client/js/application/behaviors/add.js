define(['jquery'], function($) {
  var addBehavior;
  return addBehavior = function(selectedCarsCollection) {
    return function(model) {
      return function(event) {
        selectedCarsCollection.add(model);
        return $(event.target).prop('disabled', true);
      };
    };
  };
});
