define(['underscore', 'backbone'], function(_, Backbone) {
  return function(options) {
    var createCollectionFactory, pluginInstance, storeInFacet;
    createCollectionFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var collection, fromArray, fromStorage, initValues, source;
        fromArray = options.fromArray;
        fromStorage = options.fromStorage;
        initValues = options.initValues;
        if (fromArray && _.isArray(options.fromArray)) {
          collection = new Backbone.Collection(options.fromArray);
        } else if (fromStorage && _.isString(fromStorage)) {
          source = localStorage.getItem(fromStorage);
          console.debug("source::::::::", source);
          if (source != null) {
            collection = new Backbone.Collection(JSON.parse(source));
          } else if (initValues) {
            collection = new Backbone.Collection(initValues);
          }
          if (options.synchronize) {
            collection.on('add update reset change', function(item) {
              console.debug(">>>>>>>> add update reset ", item);
              return localStorage.setItem(fromStorage, JSON.stringify(collection.toJSON()));
            });
          }
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
