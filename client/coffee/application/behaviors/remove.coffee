define [
    'jquery'
], ($) ->
    removeBehavior = (selectedCarsCollection) ->
        return (model) ->
            return (event) ->
                id = model.get 'id'
                selectedCarsCollection.remove(model)

