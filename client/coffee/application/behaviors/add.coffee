define [
    'jquery'
], ($) ->
    setChoosedState = (el) ->
        $el = $(el)         # normalize first
        $el.prop('disabled', true)
        $el.prev().show()

    addItemBehavior = (selectedCarsCollection, statisticCollection) ->
        return (model, $button) ->
            behavior = 
                click: (event) ->
                    selectedCarsCollection.add model
                    setChoosedState event.target

                    # update statistic brand count
                    brand = model.get('brand')
                    brandModel = statisticCollection.find({brand})
                    count = brandModel.get 'count'
                    brandModel.set 'count', ++count
                    statisticCollection.add brandModel, {merge: true}
                prop: ->
                    if selectedCarsCollection.find({id: model.get 'id'})
                        setChoosedState $button

            return behavior

