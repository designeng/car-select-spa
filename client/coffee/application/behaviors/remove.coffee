define ->
    removeItemBehavior = (selectedCarsCollection) ->
        return (model, $button) ->
            return {
                click: (event) ->
                    selectedCarsCollection.remove(model.get 'id')
            }

