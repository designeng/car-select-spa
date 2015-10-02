define(['jquery'], function($) {
  var addItemBehavior;
  return addItemBehavior = function(selectedCarsCollection, statisticCollection) {
    return function(model, $button) {
      var behavior;
      behavior = {
        click: function(event) {
          var brand, brandModel, count;
          selectedCarsCollection.add(model);
          $(event.target).prop('disabled', true);
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
            return $button.prop('disabled', true);
          }
        }
      };
      return behavior;
    };
  };
});
