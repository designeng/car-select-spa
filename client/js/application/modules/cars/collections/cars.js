var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "api"], function(Backbone, api) {
  var CarModel, CarsCollection, _ref, _ref1;
  CarModel = (function(_super) {
    __extends(CarModel, _super);

    function CarModel() {
      _ref = CarModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return CarModel;

  })(Backbone.Model);
  return CarsCollection = (function(_super) {
    __extends(CarsCollection, _super);

    function CarsCollection() {
      _ref1 = CarsCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CarsCollection.prototype.url = api.getCarsCollectionUrl();

    CarsCollection.prototype.model = CarModel;

    CarsCollection.prototype.parse = function(resp) {
      return resp.data.cars;
    };

    return CarsCollection;

  })(Backbone.Collection);
});
