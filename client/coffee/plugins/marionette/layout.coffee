define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->
        createLayoutFactory = (resolver, compDef, wire) ->
            layout = new Marionette.LayoutView()
            wire(compDef.options).then (options) ->
                if options.fromTemplate
                    layout.template = options.fromTemplate
                layout.addRegions options.withRegions
                resolver.resolve layout

        # region, where the layout should be rendered
        renderInFacet = (resolver, facet, wire) ->
            wire(facet.options).then (region) ->
                resolver.resolve region.show(facet.target)

        # what views the layout should show in its own regions
        showInRegionsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                if facet.target.isRendered
                    _.each options, (view, region) ->
                        facet.target.showChildView region, view
                else
                    facet.target.onRender = ->
                        _.each options, (view, region) ->
                            facet.target.showChildView region, view
                resolver.resolve facet.target

        attachToRegionsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                _.each options, (view, region) ->
                    regionObject = facet.target.getRegion(region)
                    view.__parentRegion__ = regionObject
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createLayout: createLayoutFactory
            facets:
                showInRegions:
                    "ready"     : showInRegionsFacet
                attachToRegions:
                    "ready"     : attachToRegionsFacet
                renderIn:
                    "ready"     : renderInFacet

        return pluginInstance