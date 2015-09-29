define [
    "marionette"
], (Marionette) ->

    class Controller extends Marionette.Object

        activateById: (id) ->
            # .... activateById id

        createTable: =>
            @sandbox.channel.request "list:ready", "cars"

        showTable: ->
            

        onReady: ->
            console.debug ">>>>>", @collection
