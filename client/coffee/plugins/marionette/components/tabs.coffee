define [
    'underscore'
    'backbone'
    'marionette'
], (_, Backbone, Marionette) ->

    class TabsItemView extends Marionette.ItemView
        tagName: "li"
        className: "tabs-item"

    class TabsView extends Marionette.CollectionView
        childView: TabsItemView

    return (options) ->
        createTabsFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                items = _.map _.keys(options.labels), (label) ->
                    label: label
                    href: options.labels[label]
                tabsView = new TabsView({
                    collection: new Backbone.Collection(items)
                })
                resolver.resolve tabsView

        pluginInstance = 
            factories: 
                createTabs: createTabsFactory

        return pluginInstance