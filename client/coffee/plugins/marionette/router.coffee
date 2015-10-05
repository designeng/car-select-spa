define [
    'underscore'
    'marionette'
    'meld'
], (_, Marionette, meld) ->

    return (options) ->

        createRouterFactory = (resolver, compDef, wire) ->
            essentialProperties = ['controller', 'routes']

            for opt in essentialProperties
                if !compDef.options[opt]?
                    throw new Error '#{opt} option should be provided for createRouter factory!'

            wire(compDef.options).then (opts) ->
                if opts.precede
                    handlers = opts.precede.handlers
                    precededMethods = []
                    if handlers == '*' or handlers[0] == '*'
                        for method of opts.controller
                            if method.slice(-12) == 'RouteHandler'
                                precededMethods.push method
                    else if _.isArray(handlers)
                        precededMethods = handlers

                    _.each precededMethods, (method) ->
                        meld.before opts.controller, method, () ->
                            opts.precede.withMethod.call(opts.controller, method)

                router = new Marionette.AppRouter
                    controller: opts.controller
                    appRoutes: compDef.options.routes

                resolver.resolve(router)

        onRouteFacet = (resolver, facet, wire) ->
            wire(facet.options).then (method) ->
                facet.target.onRoute = (name, path, opts) ->
                    method(name, path, opts)
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createRouter: createRouterFactory
            facets:
                onRoute:
                    "ready"     : onRouteFacet

        return pluginInstance