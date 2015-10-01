define [
    'underscore'
    'backbone'
    'marionette'
    'hbs!templates/counter'
], (_, Backbone, Marionette, counterTpl) ->

    class CounterView extends Marionette.ItemView
        template: counterTpl

        initialize: ->
            @model = new Backbone.Model()

        onBeforeRender: ->
            @collection.on 'update', (collection) =>
                @model.set 'count', collection.length
                @render()

            @model.set 'count', @collection.length

    return (options) ->
        createCounterFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                counterView = new CounterView({
                    className: options.className
                })
                resolver.resolve counterView

        pluginInstance = 
            factories: 
                createCounter: createCounterFactory

        return pluginInstance