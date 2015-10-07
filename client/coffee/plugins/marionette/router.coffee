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
                        for methodName of opts.controller
                            if methodName.slice(-12) == 'RouteHandler'
                                precededMethods.push methodName
                    else if _.isArray(handlers)
                        precededMethods = handlers

                    _with = opts.precede.with
                    _.each precededMethods, (methodName) ->
                        meld.before opts.controller, methodName, () ->
                            if _.isFunction _with
                                _with = [_with]
                            _.each _with, (func) ->
                                func.call(opts.controller, methodName)

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