define [
    'jquery'
], ($) ->
    addItemBehavior = (selectedCarsCollection, statisticCollection) ->
        return (model, $button) ->
            behavior = 
                click: (event) ->
                    selectedCarsCollection.add model
                    $(event.target).prop('disabled', true)

                    # update statistic brand count
                    brand = model.get('brand')
                    brandModel = statisticCollection.find({brand})
                    count = brandModel.get 'count'
                    brandModel.set 'count', ++count
                    statisticCollection.add brandModel, {merge: true}
                prop: ->
                    if selectedCarsCollection.find({id: model.get 'id'})
                        $button.prop('disabled', true)

            return behavior

