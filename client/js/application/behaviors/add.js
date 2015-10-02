define(['jquery'], function($) {
  var addItemBehavior, setChoosedState;
  setChoosedState = function(el) {
    var $el;
    $el = $(el);
    $el.prop('disabled', true);
    return $el.prev().show();
  };
  return addItemBehavior = function(selectedCarsCollection, statisticCollection) {
    return function(model, $button) {
      var behavior;
      behavior = {
        click: function(event) {
          var brand, brandModel, count;
          selectedCarsCollection.add(model);
          setChoosedState(event.target);
          brand = model.get('brand');
          brandModel = statisticCollection.find({
            brand: brand
          });
          count = brandModel.get('count');
          brandModel.set('count', ++count);
          return statisticCollection.add(brandModel, {
            merge: true
          });
        },
        prop: function() {
          if (selectedCarsCollection.find({
            id: model.get('id')
          })) {
            return setChoosedState($button);
          }
        }
      };
      return behavior;
    };
  };
});
