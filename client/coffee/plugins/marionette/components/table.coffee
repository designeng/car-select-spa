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

        filterBy: (fieldName, value) =>
            @[fieldName] = value
            @collection.fetch()

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

        filtersFacet = (resolver, facet, wire) ->
            wire(facet.options).then (filters) ->
                expression = _.map filters, (filterArgs, filterName) ->
                    return "item.get('#{filterName}') == facet.target.#{filterName}"

                expression = expression.join(" and ")

                facet.target.collection.on "sync", (collection, resp, options) ->
                    collection.filter((item) ->
                        return eval(expression)
                    )

                    facet.target.render()

                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createTable: createTableFactory
            facets:
                addFilters:
                    'ready:after': filtersFacet

        return pluginInstance