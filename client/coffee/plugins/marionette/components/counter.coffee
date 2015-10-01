define [
    'underscore'
    'backbone'
    'marionette'
    'hbs!templates/counter'
], (_, Backbone, Marionette, counterTpl) ->

    class CounterView extends Marionette.ItemView
        className: "cars-counter"
        template: counterTpl

    return (options) ->
        createCounterFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                counterView = new CounterView()
                resolver.resolve counterView

        pluginInstance = 
            factories: 
                createCounter: createCounterFactory

        return pluginInstance