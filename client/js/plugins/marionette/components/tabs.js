define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var createTabsFactory, pluginInstance;
    createTabsFactory = function(resolver, compDef, wire) {
      var tabsView;
      tabsView = new Marionette.CollectionView();
      wire(compDef.options).then(function(options) {});
      return resolver.resolve(tabsView);
    };
    pluginInstance = {
      factories: {
        createTabs: createTabsFactory
      }
    };
    return pluginInstance;
  };
});
