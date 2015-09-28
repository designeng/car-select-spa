define(['underscore', 'backbone.radio'], function(_, Radio) {
  return function(options) {
    var channelEventsFacet, channelName, createChannelFactory, pluginInstance;
    channelName = null;
    createChannelFactory = function(resolver, compDef, wire) {
      channelName = compDef.options.name;
      return resolver.resolve(Radio.channel(compDef.options.name));
    };
    channelEventsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(onDef) {
        _.each(onDef, function(method, eventName) {
          eventName = channelName + ":" + eventName;
          return facet.target.on(eventName, method);
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createChannel: createChannelFactory
      },
      facets: {
        channelEvents: {
          "ready": channelEventsFacet
        }
      }
    };
    return pluginInstance;
  };
});
