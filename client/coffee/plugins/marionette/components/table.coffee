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
            @_models = options.collection.models

        filterBy: (fieldName, value) ->
            setTimeout () =>
                _models = @_models.filter((item) ->
                    return item.get(fieldName) == value
                )
                @collection = new Backbone.Collection(_models)
                @render()
            , 10

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