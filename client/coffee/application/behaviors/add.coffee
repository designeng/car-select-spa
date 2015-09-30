define [
    'jquery'
], ($) ->
    addBehavior = (selectedCarsCollection) ->
        return (model) ->
            return (event) ->
                selectedCarsCollection.add model
                $(event.target).prop('disabled', true)

