define [
    "marionette"
], (Marionette) ->

    class Controller extends Marionette.Object

        onReady: ->
            console.debug "READY....."

        filterBy: (fieldName, value) =>
            @table.filterBy fieldName, value
