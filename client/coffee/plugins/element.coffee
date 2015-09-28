define [
    "jquery"
], ($) ->

    return (options) ->

        elementResolver = (resolver, name, refObj, wire) ->
            resolver.resolve $(name)

        return pluginInstance = 
            resolvers:
                element: elementResolver