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

        filters: {}

        initialize: (options) ->
            @childTemplate = options.childTemplate

        filterBy: (fieldName, value) =>
            @filters[fieldName] = value
            @collection.fetch()

        childViewOptions: (model, index) ->
            template: @childTemplate

    insertControl = (cell, controlType, controlBehavior, model) ->
        # noop function, not implemented for other control types

    addControl = (cell, model, controlType, controlLabel, controlBehavior) ->
        switch controlType
            when 'button'
                $button = $("<button />").text controlLabel
                $(cell).append($button).on 'click', controlBehavior(model)
            when 'select' then insertControl(cell, 'select', controlBehavior, model)
            # and so on

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
                    return "!facet.target.filters.#{filterName} || item.get('#{filterName}') == facet.target.filters.#{filterName}"
                expression = expression.join(" and ")

                facet.target.collection.on "sync", (collection, resp, options) ->
                    models = collection.filter (item) ->
                        return eval(expression)

                    facet.target.collection.reset()
                    facet.target.collection.add models
                    facet.target.render()

                resolver.resolve facet.target

        addControlsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                facet.target.onRender = ->
                    _.each facet.target.getChildren(), (child) ->
                        cells = child.$el.find('td')
                        id = options.cellId
                        try
                            cell = _[id] cells  # give a chance for underscore methods 'first', 'last'
                        catch e
                            cell = cells[id]
                        finally
                            addControl(cell, child.model, options.controlType, options.controlLabel, options.controlBehavior)
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