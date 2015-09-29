define [
    'underscore'
], (_) ->

    return (options) ->
        extendFacet = (resolver, facet, wire) ->
            wire(facet.options).then (object) ->
               resolver.resolve _.extend(facet.target, object)

        pluginInstance = 
            facets:
                extend:
                    'ready:before': extendFacet

        return pluginInstance