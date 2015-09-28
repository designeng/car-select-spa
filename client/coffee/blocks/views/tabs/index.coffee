define [
    'backbone'
    'blocks/views/base/collectionView'
    './item'
], (Backbone, CollectionView, ItemView) ->

    class TabsView extends CollectionView