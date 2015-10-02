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
                $(cell).append($button).click behavior.click
                behavior.prop() if behavior.prop?
            when 'select' then insertControl(cell, 'select', controlBehavior, model)
            # and so on

    addCellBehavior = (cell, model, cellBehavior) ->
        cellBehavior(cell, model)

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

        addBehaviorsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                facet.target.onRender = ->
                    children = facet.target.getChildren()
                    _.each options, (opts, behaviorName) ->
                        _.each children, (child) ->
                            cells = child.$el.find('td')
                            id = opts.cellId
                            try
                                cell = _[id] cells
                            catch e
                                cell = cells[id]
                            finally
                                if opts.cellBehavior
                                    addCellBehavior(cell, child.model, opts.cellBehavior)
                                else if opts.controlType and opts.controlBehavior
                                    addControl(cell, child.model, opts.controlType, opts.controlLabel, opts.controlBehavior)
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createTable: createTableFactory
            facets:
                addFilters:
                    'ready:after': addFiltersFacet
                addBehaviors:
                    'ready:after': addBehaviorsFacet

        return pluginInstance