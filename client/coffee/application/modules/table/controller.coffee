define [
    "marionette"
    "meld"
], (Marionette, meld) ->

    class Controller extends Marionette.Object

        onReady: ->

        # onDomRefresh: ->
        #     selectedCars = JSON.parse localStorage.getItem('selected-cars')
        #     console.debug "selectedCars", selectedCars
        #     _.each @.getChildren(), (child) ->
        #         if child.model.get('id') == 1
        #             child.$el.find('button').prop('disabled', true)
