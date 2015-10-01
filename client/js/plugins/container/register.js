var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['underscore', 'backbone.radio', 'when', 'meld'], function(_, Radio, When, meld) {
  var Container;
  Container = (function() {
    function Container() {
      this.registerModuleSandbox = __bind(this.registerModuleSandbox, this);
    }

    Container.prototype.removers = [];

    Container.prototype.modules = {};

    Container.prototype.channels = {};

    Container.prototype.channel = Radio.channel('container');

    Container.prototype.startModule = function(module, moduleName, environment) {
      var _this = this;
      return When.promise(function(resolve, reject) {
        if (typeof environment === 'undefined' || environment === null) {
          environment = {};
        }
        environment = _.extend(environment, {
          sandbox: {
            literal: {
              channel: _this.createChannel(moduleName)
            }
          }
        });
        return module(environment).then(function(context) {
          return resolve(context);
        });
      });
    };

    Container.prototype.stopModule = function(name) {
      var _ref;
      if (Radio._channels[name]) {
        Radio.reset(name);
      }
      delete this.channels[name];
      if ((_ref = this.modules[name]) != null) {
        _ref.destroy();
      }
      return delete this.modules[name];
    };

    Container.prototype.stopModules = function(list) {
      var _this = this;
      return _.each(list, function(module) {
        return _this.stopModule(module);
      });
    };

    Container.prototype.broadcastEvent = function(eventName, args) {
      return _.each(this.channels, function(channel) {
        return channel.trigger(eventName, args);
      });
    };

    Container.prototype.createChannel = function(name) {
      var channel,
        _this = this;
      channel = Radio.channel(name);
      this.channels[name] = channel;
      channel.reply('default', function(requestName, module, args) {
        return _this.channel.trigger(requestName, module, args);
      });
      return channel;
    };

    Container.prototype.registerModuleSandbox = function(joinpoint) {
      var args, context, environment, moduleName,
        _this = this;
      moduleName = joinpoint.args[0];
      environment = joinpoint.args[1];
      args = Array.prototype.slice.call(joinpoint.args, 2);
      context = this.modules[moduleName];
      if (context == null) {
        return this.startModule(joinpoint.target[moduleName], moduleName, environment).then(function(moduleContext) {
          _this.modules[moduleName] = moduleContext;
          if (moduleContext.publicApi != null) {
            return moduleContext.wire(moduleContext.publicApi).then(function(api) {
              _.each(api, function(method, methodName) {
                return moduleContext.sandbox[methodName] = method;
              });
              return joinpoint.proceed(moduleContext.sandbox, args);
            }, function(rejectReason) {
              throw new Error('Public api error: ' + rejectReason);
            });
          } else {
            return joinpoint.proceed(moduleContext.sandbox, args);
          }
        });
      } else {
        return joinpoint.proceed(context.sandbox, args);
      }
    };

    return Container;

  })();
  return function(options) {
    var container, destroyFacet, pluginInstance, registerIntercessorsFacet;
    container = new Container();
    registerIntercessorsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(sandboxIntercessors) {
        _.each(sandboxIntercessors, function(method) {
          return container.removers.push(meld.around(facet.target, method, container.registerModuleSandbox));
        });
        facet.target.container = container;
        return resolver.resolve(facet.target);
      });
    };
    destroyFacet = function(resolver, facet, wire) {
      Radio.reset();
      _.each(container.removers, function(remover) {
        return remover.remove();
      });
      return resolver.resolve();
    };
    pluginInstance = {
      facets: {
        registerIntercessors: {
          'ready': registerIntercessorsFacet,
          'destroy': destroyFacet
        }
      }
    };
    return pluginInstance;
  };
});
