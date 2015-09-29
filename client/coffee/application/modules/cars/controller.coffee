define [
    "marionette"
], (Marionette) ->

    class Controller extends Marionette.Object

        _collection: null

        activateById: (id) ->
            # .... activateById id

        onReady: ->
            @_collection = @collection
            console.debug "READY"

        filterByBrand: (brand) =>
            @table.filterBy 'brand', brand

        switchTableState: (state) =>
            
