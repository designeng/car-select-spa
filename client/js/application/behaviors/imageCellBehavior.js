define(['jquery'], function($) {
  var imageCellBehavior;
  return imageCellBehavior = function(cell, model) {
    $(cell).find('img').on('mouseover', function(event) {
      return $(event.target).next().show();
    });
    return $(cell).find('img').on('mouseout', function(event) {
      return $(event.target).next().hide();
    });
  };
});
