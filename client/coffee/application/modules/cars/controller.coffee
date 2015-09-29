define [
    "marionette"
], (Marionette) ->

    class Controller extends Marionette.Object

        activateById: (id) ->
            # .... activateById id

        onReady: ->
            console.debug ">>>>>", @collection
