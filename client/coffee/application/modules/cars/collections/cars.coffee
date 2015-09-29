define [
    "backbone"
    "api"
], (Backbone, api) ->

    class CarModel extends Backbone.Model

    class CarsCollection extends Backbone.Collection
        url: api.getCarsCollectionUrl()
        model: CarModel

        parse: (resp) ->
            return resp.data.cars