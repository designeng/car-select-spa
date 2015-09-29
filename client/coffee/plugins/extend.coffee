define [
    'underscore'
], (_) ->

    return (options) ->
        extendFacet = (resolver, facet, wire) ->
            wire(facet.options).then (object) ->
               _.extend(facet.target, object)
               resolver.resolve facet.target

        pluginInstance = 
            facets:
                extend:
                    'ready:before': extendFacet

        return pluginInstance