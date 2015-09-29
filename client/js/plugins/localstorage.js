define(function() {
  return function(options) {
    var pluginInstance, storageFacet;
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
