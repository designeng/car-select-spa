define [
    "wire!bootstrap/spec"
], ->
    # all specs must be in folder defined in SpecRunner.pathToSpec
    specs = [
        "plugins/register"
        "plugins/marionette/components/tabs"
        "plugins/marionette/components/table"
        "plugins/backbone/collection/create"
        "plugins/backbone/collection/localstorage"
    ]
