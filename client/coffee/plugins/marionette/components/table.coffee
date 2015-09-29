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

    insertSelect = (cell, controlType) ->
        # noop function, not implemented for other control types

    addControl = (cell, controlType) ->
        switch controlType
            when 'button'
                $(cell).append '<button />'
            when 'select' then insertControl(cell, 'select')

    return (options) ->
        createTableFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                tabsView = new TableView({
                    collection      : options.collection
                    className       : options.className
                    childTemplate   : options.childTemplate
                })
                resolver.resolve tabsView

        addFiltersFacet = (resolver, facet, wire) ->
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

        addControlsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                facet.target.onRender = ->
                    _.each facet.target.$el.find('tr'), (tr) ->
                        cells = tr.getElementsByTagName('td')
                        id = options.cellId
                        try
                            cell = _[id] cells  # underscore methods 'first', 'last'
                        catch e
                            cell = cells[id]
                        finally
                            addControl(cell, options.controlType)
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createTable: createTableFactory
            facets:
                addFilters:
                    'ready:after': addFiltersFacet
                addControls:
                    'ready:after': addControlsFacet

        return pluginInstance