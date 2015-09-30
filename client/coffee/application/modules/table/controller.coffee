define [
    "marionette"
], (Marionette) ->

    class Controller extends Marionette.Object

        onReady: ->
            console.debug "READY....."

        filterByBrand: (brand) =>
            console.debug "filterBy", brand
            @table.filterBy 'brand', brand
