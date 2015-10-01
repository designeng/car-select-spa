define [
    'jquery'
], ($) ->
    addItemBehavior = (selectedCarsCollection, statisticCollection) ->
        return (model) ->
            return (event) ->
                selectedCarsCollection.add model
                $(event.target).prop('disabled', true)

                # update statistic brand count
                brand = model.get('brand')
                brandModel = statisticCollection.find({brand})
                count = brandModel.get 'count'
                brandModel.set 'count', ++count
                statisticCollection.add brandModel, {merge: true}

