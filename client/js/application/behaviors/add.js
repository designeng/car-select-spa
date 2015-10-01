define(['jquery'], function($) {
  var addItemBehavior;
  return addItemBehavior = function(selectedCarsCollection, statisticCollection) {
    return function(model) {
      return function(event) {
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
      };
    };
  };
});
