define [
    'underscore'
    'backbone'
], (_, Backbone) ->

    return (options) ->
        createCollectionFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (array) ->
                if _.isArray array
                    collection = new Backbone.Collection(array)
                else
                    collection = new Backbone.Collection()
                resolver.resolve collection

        storageFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                # source = localStorage.getItem(options.name)
                # if source?
                #     facet.target.add JSON.parse(source)
                facet.target.on "add update reset", (item) ->
                    stringifiedCollection = JSON.stringify facet.target.toJSON()
                    localStorage.setItem options.name, stringifiedCollection
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createCollection: createCollectionFactory
            facets:
                storage:
                    "ready"     : storageFacet

        return pluginInstance