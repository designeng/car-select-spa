define ->

    return (options) ->

        onSyncFacet = (resolver, facet, wire) ->
            wire(facet.options).then (method) ->
                facet.target.on 'sync', (collection, resp, options) =>
                    method(collection, resp, options)
                resolver.resolve facet.target

        pluginInstance = 
            facets:
                onSync:
                    "ready"     : onSyncFacet

        return pluginInstance