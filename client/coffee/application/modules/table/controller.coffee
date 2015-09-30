define [
    "marionette"
], (Marionette) ->

    class Controller extends Marionette.Object

        onReady: ->
            console.debug "READY....."

        filterByBrand: (brand) =>
            @table.filterBy 'brand', brand
