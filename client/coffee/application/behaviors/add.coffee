define [
    'jquery'
], ($) ->
    addBehavior = (carsCollection, selectedCarsCollection) ->
        return (event) ->
            console.debug "event.target addButtonBehavior", event.target, $(event.target).parent().parent()
            $(event.target).parent()

