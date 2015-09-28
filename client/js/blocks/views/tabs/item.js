var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var TabsItemView, _ref;
  return TabsItemView = (function(_super) {
    __extends(TabsItemView, _super);

    function TabsItemView() {
      _ref = TabsItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TabsItemView.prototype.tagName = "li";

    TabsItemView.prototype.className = "tabs-item";

    return TabsItemView;

  })(Marionette.ItemView);
});
