define(function() {
  return function(options) {
    var onSyncFacet, pluginInstance;
    onSyncFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(method) {
        var _this = this;
        facet.target.on('sync', function(collection, resp, options) {
          return method(collection, resp, options);
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      facets: {
        onSync: {
          "ready": onSyncFacet
        }
      }
    };
    return pluginInstance;
  };
});
