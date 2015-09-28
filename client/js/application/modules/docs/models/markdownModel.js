var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone"], function(Backbone) {
  var MarkdownModel, _ref;
  return MarkdownModel = (function(_super) {
    __extends(MarkdownModel, _super);

    function MarkdownModel() {
      _ref = MarkdownModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return MarkdownModel;

  })(Backbone.Model);
});
