define [
    'marionette'
], (Marionette) ->

    class TabsItemView extends Marionette.ItemView
        tagName: "li"
        className: "tabs-item"