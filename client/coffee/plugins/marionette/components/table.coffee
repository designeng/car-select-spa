define [
    'underscore'
    'backbone'
    'marionette'
    'hbs!templates/tableRow'
], (_, Backbone, Marionette, tableRowTpl) ->

    class TableRowView extends Marionette.ItemView
        tagName: "tr"
        template: tableRowTpl

    class TableView extends Marionette.CollectionView
        tagName: 'tbody'
        className: ''
        childView: TableRowView

        initialize: (options) ->
            @childTemplate = options.childTemplate

        childViewOptions: (model, index) ->
            template: @childTemplate

    return (options) ->
        createTableFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                tabsView = new TableView({
                    collection      : options.collection
                    className       : options.className
                    childTemplate   : options.childTemplate
                })
                resolver.resolve tabsView

        pluginInstance = 
            factories: 
                createTable: createTableFactory

        return pluginInstance