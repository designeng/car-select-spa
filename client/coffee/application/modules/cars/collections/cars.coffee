define [
    "backbone"
    "api"
], (Backbone, api) ->

    class CarModel extends Backbone.Model

    class CarsCollection extends Backbone.Collection
        url: api.getCarsCollectionUrl()
        model: CarModel

        parse: (resp) ->
            console.debug "RESP::::", resp
            return resp
            # resp.data = _.map resp.data, (item) ->
            #     organization = _.find resp.related_objects.organization, {id: item.id}
            #     item.organization = organization if organization
            #     return item
            # return resp.data