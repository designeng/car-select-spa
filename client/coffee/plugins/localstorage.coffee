define [
    'underscore'
], (_) ->

    return (options) ->

        ensureStorage = (name) ->
            # if !localStorage.getItem(name)


        storageFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                facet.target.on "add update reset", (item) ->
                    stringifiedCollection = JSON.stringify facet.target.toJSON()
                    localStorage.setItem options.name, stringifiedCollection
                resolver.resolve facet.target

        pluginInstance = 
            facets:
                storage:
                    "ready"     : storageFacet

        return pluginInstance