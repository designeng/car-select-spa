define(['underscore', 'backbone'], function(_, Backbone) {
  return function(options) {
    var createCollectionFactory, pluginInstance;
    createCollectionFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(array) {
        return resolver.resolve(new Backbone.Collection(array));
      });
    };
    pluginInstance = {
      factories: {
        createCollection: createCollectionFactory
      }
    };
    return pluginInstance;
  };
});
