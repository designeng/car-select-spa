var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette", "./models/markdownModel"], function(Marionette, MarkdownModel) {
  var DocsController, _ref;
  return DocsController = (function(_super) {
    __extends(DocsController, _super);

    function DocsController() {
      this.createDetails = __bind(this.createDetails, this);
      this.createList = __bind(this.createList, this);
      _ref = DocsController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DocsController.prototype.createList = function() {
      return this.sandbox.channel.request("list:ready", "docs", this.list);
    };

    DocsController.prototype.createDetails = function(id) {
      if (id) {
        this.activateById(id);
        this.markdownLayout.fetchMarkdownDocument(id);
        this.sandbox.channel.request("details:ready", "docs", this.markdownLayout);
      }
      return id;
    };

    DocsController.prototype.activateById = function(id) {
      return this.list.activateById(id);
    };

    return DocsController;

  })(Marionette.Object);
});
