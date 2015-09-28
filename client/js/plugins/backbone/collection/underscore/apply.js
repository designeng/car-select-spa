define(['underscore', 'backbone'], function(_, Backbone) {
  return function(options) {
    var applyMethods, applyToFactory, pluginInstance;
    applyMethods = function(collection, methods) {
      var errorPrefix;
      errorPrefix = "There is no method";
      return _.reduce(methods, function(result, method) {
        var methodArgs, methodName;
        if (_.isObject(method)) {
          methodName = _.keys(method)[0];
          methodArgs = method[methodName];
        } else if (_.isString(method)) {
          methodName = method;
        }
        if (result instanceof Backbone.Collection) {
          if (!result[methodName]) {
            throw new Error("" + errorPrefix + " '" + methodName + "' in Backbone.Collection!");
          } else {
            return result[methodName](methodArgs);
          }
        } else if (_[methodName]) {
          return _[methodName](result, methodArgs);
        } else {
          throw new Error("" + errorPrefix + " '" + methodName + "' in Underscore!");
        }
      }, collection);
    };
    applyToFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var _collection,
          _this = this;
        _collection = options.collection;
        if (!_collection.length) {
          return _collection.on('sync', function(collection) {
            return resolver.resolve(applyMethods(collection, options.methods));
          });
        } else {
          return resolver.resolve(applyMethods(_collection, options.methods));
        }
      });
    };
    pluginInstance = {
      factories: {
        applyTo: applyToFactory
      }
    };
    return pluginInstance;
  };
});
