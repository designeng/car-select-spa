var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'marionette'], function(_, Backbone, Marionette) {
  var TabsItemView, TabsView, _ref, _ref1;
  TabsItemView = (function(_super) {
    __extends(TabsItemView, _super);

    function TabsItemView() {
      _ref = TabsItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TabsItemView.prototype.tagName = "li";

    TabsItemView.prototype.className = "tabs-item";

    return TabsItemView;

  })(Marionette.ItemView);
  TabsView = (function(_super) {
    __extends(TabsView, _super);

    function TabsView() {
      _ref1 = TabsView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    TabsView.prototype.childView = TabsItemView;

    return TabsView;

  })(Marionette.CollectionView);
  return function(options) {
    var createTabsFactory, pluginInstance;
    createTabsFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var items, tabsView;
        items = _.map(_.keys(options.labels), function(label) {
          return {
            label: label,
            href: options.labels[label]
          };
        });
        tabsView = new TabsView({
          collection: new Backbone.Collection(items)
        });
        return resolver.resolve(tabsView);
      });
    };
    pluginInstance = {
      factories: {
        createTabs: createTabsFactory
      }
    };
    return pluginInstance;
  };
});
