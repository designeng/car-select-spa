define(['underscore', 'backbone'], function(_, Backbone) {
  return function(options) {
    var createCollectionFactory, pluginInstance, storageFacet;
    createCollectionFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(array) {
        var collection;
        if (_.isArray(array)) {
          collection = new Backbone.Collection(array);
        } else {
          collection = new Backbone.Collection();
        }
        return resolver.resolve(collection);
      });
    };
    storageFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        facet.target.on("add update reset", function(item) {
          var stringifiedCollection;
          stringifiedCollection = JSON.stringify(facet.target.toJSON());
          return localStorage.setItem(options.name, stringifiedCollection);
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createCollection: createCollectionFactory
      },
      facets: {
        storage: {
          "ready": storageFacet
        }
      }
    };
    return pluginInstance;
  };
});
