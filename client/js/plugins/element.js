define(["jquery"], function($) {
  return function(options) {
    var elementResolver, pluginInstance;
    elementResolver = function(resolver, name, refObj, wire) {
      return resolver.resolve($(name));
    };
    return pluginInstance = {
      resolvers: {
        element: elementResolver
      }
    };
  };
});
