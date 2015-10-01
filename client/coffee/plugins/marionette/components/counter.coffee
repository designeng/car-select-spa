define [
    'underscore'
    'backbone'
    'marionette'
    'hbs!templates/counter'
], (_, Backbone, Marionette, counterTpl) ->

    class CounterView extends Marionette.ItemView
        template: counterTpl

        initialize: (options) ->
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
                    collection  : options.collection
                    className   : options.className
                })
                resolver.resolve counterView

        pluginInstance = 
            factories: 
                createCounter: createCounterFactory

        return pluginInstance