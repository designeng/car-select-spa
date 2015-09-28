define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->
        # Marionette.Module is deprecated, and is scheduled to be removed in the next major release:
        # http://marionettejs.com/docs/v2.4.2/marionette.module.html
        # in Marionette we are not restricted with creating Marionette.Application instances,
        # so they can be treated as different modules.
        createApplicationFactory = (resolver, compDef, wire) ->
            app = new Marionette.Application()

            wire(compDef.options).then (options) ->
                app.on "start", () ->
                    options.onStart()

                app.addRegions options.withRegions
                resolver.resolve app

        showInRegionsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                _.each options, (view, region) ->
                    facet.target[region].show view
                resolver.resolve facet.target

        addControllerFacet = (resolver, facet, wire) ->
            wire(facet.options).then (controller) ->
                # for short regions reference
                controller.regions = facet.target.regions = facet.target.getRegions()
                facet.target.controller = controller
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createApplication: createApplicationFactory
            facets:
                showInRegions:
                    "ready"     : showInRegionsFacet
                addController:
                    "ready"     : addControllerFacet

        return pluginInstance