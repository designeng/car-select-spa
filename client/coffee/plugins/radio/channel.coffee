define [
    'underscore'
    'backbone.radio'
], (_, Radio) ->

    return (options) ->

        channelName = null

        createChannelFactory = (resolver, compDef, wire) ->
            channelName = compDef.options.name
            resolver.resolve Radio.channel(compDef.options.name)

        channelEventsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (onDef) ->
                _.each onDef, (method, eventName) ->
                    eventName = channelName + ":" + eventName
                    facet.target.on eventName, method
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createChannel: createChannelFactory
            facets:
                channelEvents:
                    "ready"     : channelEventsFacet

        return pluginInstance