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
        tagName: 'table'
        className: ''
        childView: TableRowView
        childViewContainer: 'tbody'

        filters: {}

        collectionEvents:
            'sync': 'onCollectionSync'

        initialize: (options) ->
            @childTemplate = options.childTemplate

        filterBy: (fieldName, value) =>
            @filters[fieldName] = value
            @collection.fetch()

        childViewOptions: (model, index) ->
            template: @childTemplate

        onCollectionSync: (collection, resp, options) ->
            models = collection.filter (item) =>
                return !@filters.brand || _.reduce @filters, (result, value, key) =>
                    result = item.get(key) == @filters[key]
                , true

            @collection.reset()
            @collection.add models
            @render()

            @sandbox.channel.trigger 'onCollectionSync', @collection

    insertControl = (cell, controlType, controlBehavior, model) ->
        # noop function, not implemented for other control types

    addControl = (cell, model, controlType, controlLabel, controlBehavior) ->
        switch controlType
            when 'button'
                $button = $("<button />").text controlLabel
                behavior = controlBehavior(model, $button)
                behavior.prop() if behavior.prop?
                $(cell).append($button).click behavior.click
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
                _.each filters, (filterArgs, filterName) ->
                    facet.target.filters[filterName] = filterArgs
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