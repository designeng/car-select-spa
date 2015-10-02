define(['jquery'], function($) {
  var imageCellBehavior;
  return imageCellBehavior = function(cell, model) {
    return $(cell).find('img').on('mouseover', function(event) {
      return console.debug("over", model.get('id'));
    });
  };
});
