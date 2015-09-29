var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var Controller, _ref;
  return Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller() {
      this.createTable = __bind(this.createTable, this);
      _ref = Controller.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Controller.prototype.activateById = function(id) {};

    Controller.prototype.createTable = function() {
      return this.sandbox.channel.request("list:ready", "cars");
    };

    Controller.prototype.showTable = function() {};

    Controller.prototype.onReady = function() {
      return console.debug(">>>>>", this.collection);
    };

    return Controller;

  })(Marionette.Object);
});
