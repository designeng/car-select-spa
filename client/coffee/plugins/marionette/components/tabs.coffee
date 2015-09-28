define [
    'underscore'
    'backbone'
    'marionette'
    'hbs!templates/tabsItem'
], (_, Backbone, Marionette, tabsItemTpl) ->

    hashPrefix = "#/"

    class TabsItemView extends Marionette.ItemView
        tagName: "li"
        className: "tabs-item"
        template: tabsItemTpl

    class TabsView extends Marionette.CollectionView
        tagName: 'ul'
        className: 'tabsView'
        childView: TabsItemView

    return (options) ->
        createTabsFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                items = _.map _.keys(options.labels), (label) ->
                    label: label
                    href: hashPrefix + options.labels[label]
                tabsView = new TabsView({
                    collection: new Backbone.Collection(items)
                    className: options.className
                })
                resolver.resolve tabsView

        pluginInstance = 
            factories: 
                createTabs: createTabsFactory

        return pluginInstance