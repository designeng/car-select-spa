var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'marionette', 'hbs!templates/counter'], function(_, Backbone, Marionette, counterTpl) {
  var CounterView, _ref;
  CounterView = (function(_super) {
    __extends(CounterView, _super);

    function CounterView() {
      _ref = CounterView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CounterView.prototype.template = counterTpl;

    CounterView.prototype.initialize = function(options) {
      var _this = this;
      this.model = new Backbone.Model();
      this.collection = options.collection;
      return this.collection.on('update', function(collection) {
        _this.model.set('count', collection.length);
        return _this.render();
      });
    };

    CounterView.prototype.onBeforeRender = function() {
      return this.model.set('count', this.collection.length);
    };

    return CounterView;

  })(Marionette.ItemView);
  return function(options) {
    var createCounterFactory, pluginInstance;
    createCounterFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var counterView;
        counterView = new CounterView({
          collection: options.collection,
          className: options.className
        });
        return resolver.resolve(counterView);
      });
    };
    pluginInstance = {
      factories: {
        createCounter: createCounterFactory
      }
    };
    return pluginInstance;
  };
});
