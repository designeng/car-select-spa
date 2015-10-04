define [
    "marionette"
    "meld"
], (Marionette, meld) ->

    class Controller extends Marionette.Object

        configureLayout: (config) =>
            _.each config, (state, component) =>
                if state
                    method = 'show'
                else
                    method = 'hide'
                @[component].$el[method]()
