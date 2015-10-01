define [
    'underscore'
    'backbone'
], (_, Backbone) ->

    return (options) ->
        # options:
        #   fromArray
        #   fromStorage
        #   initValues
        #   synchronize
        createCollectionFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                fromArray   = options.fromArray
                fromStorage = options.fromStorage
                initValues  = options.initValues
                if fromArray and _.isArray options.fromArray
                    collection = new Backbone.Collection(options.fromArray)
                else if fromStorage and _.isString fromStorage
                    source = localStorage.getItem(fromStorage)
                    console.debug "source::::::::", source
                    if source?
                        collection = new Backbone.Collection(JSON.parse source)
                    else if initValues
                        collection = new Backbone.Collection(initValues)
                    if options.synchronize
                        collection.on 'add update reset change', (item) ->
                            console.debug ">>>>>>>> add update reset ", item
                            localStorage.setItem fromStorage, JSON.stringify collection.toJSON()
                else
                    collection = new Backbone.Collection()
                resolver.resolve collection

        storeInFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                facet.target.on 'add update reset', (item) ->
                    stringifiedCollection = JSON.stringify facet.target.toJSON()
                    localStorage.setItem options.name, stringifiedCollection
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createCollection: createCollectionFactory
            facets:
                storeIn:
                    'ready'     : storeInFacet

        return pluginInstance