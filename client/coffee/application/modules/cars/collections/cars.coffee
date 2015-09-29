define [
    "backbone"
    "api"
], (Backbone, api) ->

    class CarModel extends Backbone.Model

    class CarsCollection extends Backbone.Collection
        url: api.getCarsCollectionUrl()
        model: CarModel

        parse: (resp) ->
            resp.data.cars = _.map resp.data.cars, (item) ->
                item.image = 'assets/images/' + item.image
                return item
            return resp.data.cars