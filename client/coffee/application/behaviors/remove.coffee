define ->
    removeItemBehavior = (selectedCarsCollection) ->
        return (model) ->
            return (event) ->
                selectedCarsCollection.remove(model.get 'id')

