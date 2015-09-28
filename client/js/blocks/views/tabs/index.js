var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'blocks/views/base/collectionView', './item'], function(Backbone, CollectionView, ItemView) {
  var TabsView, _ref;
  return TabsView = (function(_super) {
    __extends(TabsView, _super);

    function TabsView() {
      _ref = TabsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return TabsView;

  })(CollectionView);
});
