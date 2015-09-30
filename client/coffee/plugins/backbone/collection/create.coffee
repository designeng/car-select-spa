define [
    'underscore'
    'backbone'
], (_, Backbone) ->

    return (options) ->
        createCollectionFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                fromArray = options.fromArray
                fromStorage = options.fromStorage
                if fromArray and _.isArray options.fromArray
                    collection = new Backbone.Collection(options.fromArray)
                else if fromStorage and _.isString fromStorage
                    collection = new Backbone.Collection(JSON.parse localStorage.getItem(fromStorage))
                else
                    collection = new Backbone.Collection()
                resolver.resolve collection

        storeInFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                facet.target.on "add update reset", (item) ->
                    stringifiedCollection = JSON.stringify facet.target.toJSON()
                    localStorage.setItem options.name, stringifiedCollection
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createCollection: createCollectionFactory
            facets:
                storeIn:
                    "ready"     : storeInFacet

        return pluginInstance