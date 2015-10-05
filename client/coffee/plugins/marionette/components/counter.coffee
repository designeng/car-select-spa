define [
    'underscore'
    'backbone'
    'marionette'
], (_, Backbone, Marionette) ->

    class CounterView extends Marionette.ItemView

        initialize: (options) ->
            @template = options.template
            @model = new Backbone.Model()
            @collection = options.collection
            @collection.on 'update', (collection) =>
                @model.set 'count', collection.length
                @render()

        onBeforeRender: ->
            @model.set 'count', @collection.length

    return (options) ->
        createCounterFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                counterView = new CounterView({
                    template    : options.template
                    collection  : options.collection
                    className   : options.className
                })
                resolver.resolve counterView

        pluginInstance = 
            factories: 
                createCounter: createCounterFactory

        return pluginInstance