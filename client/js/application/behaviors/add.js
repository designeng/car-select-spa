define(['jquery'], function($) {
  var addBehavior;
  return addBehavior = function(carsCollection, selectedCarsCollection) {
    return function(event) {
      console.debug("event.target addButtonBehavior", event.target, $(event.target).parent().parent());
      return $(event.target).parent();
    };
  };
});
