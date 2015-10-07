define(['underscore', 'marionette', 'meld'], function(_, Marionette, meld) {
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
      return wire(compDef.options).then(function(opts) {
        var handlers, methodName, precededMethods, router, _with;
        if (opts.precede) {
          handlers = opts.precede.handlers;
          precededMethods = [];
          if (handlers === '*' || handlers[0] === '*') {
            for (methodName in opts.controller) {
              if (methodName.slice(-12) === 'RouteHandler') {
                precededMethods.push(methodName);
              }
            }
          } else if (_.isArray(handlers)) {
            precededMethods = handlers;
          }
          _with = opts.precede["with"];
          _.each(precededMethods, function(methodName) {
            return meld.before(opts.controller, methodName, function() {
              if (_.isFunction(_with)) {
                _with = [_with];
              }
              return _.each(_with, function(func) {
                return func.call(opts.controller, methodName);
              });
            });
          });
        }
        router = new Marionette.AppRouter({
          controller: opts.controller,
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
