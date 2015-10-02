define(['jquery'], function($) {
  var imageCellBehavior;
  return imageCellBehavior = function(cell) {
    console.debug("CELL", $(cell).find('img'));
    return $(cell).find('img').on('click', function(event) {
      return alert(1);
    });
  };
});
