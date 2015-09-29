define(['underscore'], function(_) {
  return function(options) {
    var ensureStorage, pluginInstance, storageFacet;
    ensureStorage = function(name) {};
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
      facets: {
        storage: {
          "ready": storageFacet
        }
      }
    };
    return pluginInstance;
  };
});
