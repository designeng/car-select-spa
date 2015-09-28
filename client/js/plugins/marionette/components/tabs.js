var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'marionette', 'hbs!templates/tabsItem'], function(_, Backbone, Marionette, tabsItemTpl) {
  var TabsItemView, TabsView, hashPrefix, _ref, _ref1;
  hashPrefix = "#/";
  TabsItemView = (function(_super) {
    __extends(TabsItemView, _super);

    function TabsItemView() {
      _ref = TabsItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TabsItemView.prototype.tagName = "li";

    TabsItemView.prototype.className = "tabs-item";

    TabsItemView.prototype.template = tabsItemTpl;

    return TabsItemView;

  })(Marionette.ItemView);
  TabsView = (function(_super) {
    __extends(TabsView, _super);

    function TabsView() {
      _ref1 = TabsView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    TabsView.prototype.tagName = 'ul';

    TabsView.prototype.className = 'tabsView';

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
            href: hashPrefix + options.labels[label]
          };
        });
        tabsView = new TabsView({
          collection: new Backbone.Collection(items),
          className: options.className
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
