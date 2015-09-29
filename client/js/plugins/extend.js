define(['underscore'], function(_) {
  return function(options) {
    var extendFacet, pluginInstance;
    extendFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(object) {
        _.extend(facet.target, object);
        return resolver.resolve(facet.target);
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
