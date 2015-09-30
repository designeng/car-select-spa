define [
    "backbone"
    "api"
], (Backbone, api) ->

    class CarModel extends Backbone.Model

    class CarsCollection extends Backbone.Collection
        url: api.getCarsCollectionUrl()
        model: CarModel

        parse: (resp) ->
            console.debug "resp:::::::::", resp
            resp.data.cars = _.map resp.data.cars, (item) ->
                item.image = 'assets/images/' + item.image if !item.image.match(/assets\/images\//)
                return item
            return resp.data.cars