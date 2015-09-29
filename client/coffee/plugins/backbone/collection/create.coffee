define [
    'underscore'
    'backbone'
], (_, Backbone) ->

    return (options) ->
        createCollectionFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (array) ->
                resolver.resolve new Backbone.Collection(array)

        pluginInstance = 
            factories: 
                createCollection: createCollectionFactory

        return pluginInstance