var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone"], function(Backbone) {
  var DocModel, DocsCollection, _ref, _ref1;
  DocModel = (function(_super) {
    __extends(DocModel, _super);

    function DocModel() {
      _ref = DocModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return DocModel;

  })(Backbone.Model);
  return DocsCollection = (function(_super) {
    __extends(DocsCollection, _super);

    function DocsCollection() {
      _ref1 = DocsCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    DocsCollection.prototype.url = '../assets/docs/index.json';

    DocsCollection.prototype.model = DocModel;

    DocsCollection.prototype.parse = function(resp) {
      return resp.data;
    };

    return DocsCollection;

  })(Backbone.Collection);
});
