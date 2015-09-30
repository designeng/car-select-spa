define [
    'jquery'
], ($) ->
    addItemBehavior = (selectedCarsCollection) ->
        return (model) ->
            return (event) ->
                selectedCarsCollection.add model
                $(event.target).prop('disabled', true)

