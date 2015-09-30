define(['underscore', 'backbone'], function(_, Backbone) {
  return function(options) {
    var createCollectionFactory, pluginInstance, storeInFacet;
    createCollectionFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var collection, fromArray, fromStorage;
        fromArray = options.fromArray;
        fromStorage = options.fromStorage;
        if (fromArray && _.isArray(options.fromArray)) {
          collection = new Backbone.Collection(options.fromArray);
        } else if (fromStorage && _.isString(fromStorage)) {
          collection = new Backbone.Collection(JSON.parse(localStorage.getItem(fromStorage)));
        } else {
          collection = new Backbone.Collection();
        }
        return resolver.resolve(collection);
      });
    };
    storeInFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        facet.target.on('add update reset', function(item) {
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
        storeIn: {
          'ready': storeInFacet
        }
      }
    };
    return pluginInstance;
  };
});
