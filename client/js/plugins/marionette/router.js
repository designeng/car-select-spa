define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var createRouterFactory, onRouteFacet, pluginInstance;
    createRouterFactory = function(resolver, compDef, wire) {
      var essentialProperties, opt, _i, _len;
      essentialProperties = ['controller', 'routes'];
      for (_i = 0, _len = essentialProperties.length; _i < _len; _i++) {
        opt = essentialProperties[_i];
        if (compDef.options[opt] == null) {
          throw new Error('#{opt} option should be provided for createRouter factory!');
        }
      }
      return wire(compDef.options.controller).then(function(routerController) {
        var router;
        router = new Marionette.AppRouter({
          controller: routerController,
          appRoutes: compDef.options.routes
        });
        return resolver.resolve(router);
      });
    };
    onRouteFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(method) {
        facet.target.onRoute = function(name, path, opts) {
          return method(name, path, opts);
        };
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createRouter: createRouterFactory
      },
      facets: {
        onRoute: {
          "ready": onRouteFacet
        }
      }
    };
    return pluginInstance;
  };
});
