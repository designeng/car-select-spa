define(['underscore'], function(_) {
  return function(options) {
    var extendFacet, pluginInstance;
    extendFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(object) {
        return resolver.resolve(_.extend(facet.target, object));
      });
    };
    pluginInstance = {
      facets: {
        extend: {
          'ready:before': extendFacet
        }
      }
    };
    return pluginInstance;
  };
});
