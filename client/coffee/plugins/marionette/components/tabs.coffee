define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->
        createTabsFactory = (resolver, compDef, wire) ->
            tabsView = new Marionette.CollectionView()
            wire(compDef.options).then (options) ->

            resolver.resolve tabsView

        pluginInstance = 
            factories: 
                createTabs: createTabsFactory

        return pluginInstance