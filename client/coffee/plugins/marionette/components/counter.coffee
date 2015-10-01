define [
    'underscore'
    'backbone'
    'marionette'
    'hbs!templates/counter'
], (_, Backbone, Marionette, counterTpl) ->

    class CounterView extends Marionette.ItemView
        className: "cars-counter"
        template: counterTpl

        initialize: ->
            @model = new Backbone.Model()

        onBeforeRender: ->
            @collection.on 'update', (collection) =>
                console.debug "COLLECTION EVENT: ", collection, collection.length
                @model.set 'count', collection.length
                console.debug ">>>>>>>", @.cid
                @render()

            @model.set 'count', @collection.length

    return (options) ->
        createCounterFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                counterView = new CounterView()
                resolver.resolve counterView

        pluginInstance = 
            factories: 
                createCounter: createCounterFactory

        return pluginInstance