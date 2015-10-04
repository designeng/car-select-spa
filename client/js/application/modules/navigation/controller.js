var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette", "meld"], function(Marionette, meld) {
  var Controller, _ref;
  return Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller() {
      this.configureLayout = __bind(this.configureLayout, this);
      _ref = Controller.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Controller.prototype.configureLayout = function(config) {
      var _this = this;
      return _.each(config, function(state, component) {
        var method;
        if (state) {
          method = 'show';
        } else {
          method = 'hide';
        }
        return _this[component].$el[method]();
      });
    };

    return Controller;

  })(Marionette.Object);
});
