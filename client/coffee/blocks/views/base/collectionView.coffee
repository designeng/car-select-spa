define [
    'marionette'
], (Marionette) ->

    class CollectionView extends Marionette.CollectionView
        childViewOptions: (model, index) ->
            template: @childTemplate