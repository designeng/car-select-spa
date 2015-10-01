define [
    'underscore'
    'backbone.radio'
    'when'
    'meld'
], (_, Radio, When, meld) ->

    class Container

        removers    : []
        modules     : {}
        channels    : {}

        channel: Radio.channel('container')

        startModule: (module, moduleName, environment) ->
            return When.promise (resolve, reject) =>
                if typeof environment == 'undefined' || environment == null
                    environment = {}
                environment = _.extend environment, {
                    sandbox:
                        literal:
                            channel: @createChannel(moduleName)
                }
                module(environment).then (context) ->
                    resolve context

        stopModule: (name) ->
            Radio.reset(name) if Radio._channels[name]
            delete @channels[name]
            @modules[name]?.destroy()
            delete @modules[name]

        stopModules: (list) ->
            _.each list, (module) =>
                @stopModule module

        broadcastEvent: (eventName, args) ->
            _.each @channels, (channel) ->
                channel.trigger eventName, args

        createChannel: (name) ->
            channel = Radio.channel(name)
            @channels[name] = channel
            channel.reply 'default', (requestName, module, args) =>
                @channel.trigger requestName, module, args
            return channel

        # sandbox provides module functional api and hides other details of realization
        # wired context is cached (we should not wire the module twice!)
        registerModuleSandbox: (joinpoint) =>
            moduleName = joinpoint.args[0]
            environment = joinpoint.args[1]
            args = Array::slice.call(joinpoint.args, 2)
            context = @modules[moduleName]
            if !context?
                @startModule(joinpoint.target[moduleName], moduleName, environment).then (moduleContext) =>
                    @modules[moduleName] = moduleContext
                    if moduleContext.publicApi?
                        moduleContext.wire(moduleContext.publicApi).then (api) ->
                            _.each api, (method, methodName) ->
                                moduleContext.sandbox[methodName] = method
                            joinpoint.proceed(moduleContext.sandbox, args)
                        , (rejectReason) ->
                            throw new Error('Public api error: ' + rejectReason)
                    else
                        joinpoint.proceed(moduleContext.sandbox, args)
            else
                joinpoint.proceed(context.sandbox, args)

    return (options) ->

        container = new Container()

        # what views the layout should show in its own regions
        registerIntercessorsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (sandboxIntercessors) ->
                _.each sandboxIntercessors, (method) ->
                    container.removers.push meld.around facet.target, method, container.registerModuleSandbox
                facet.target.container = container
                resolver.resolve facet.target

        destroyFacet = (resolver, facet, wire) ->
            # TODO: if several marionette.application instances? All registered events will be removed (find solution)
            Radio.reset()
            _.each container.removers, (remover) ->
                remover.remove()
            resolver.resolve()

        pluginInstance = 
            facets:
                registerIntercessors:
                    'ready'     : registerIntercessorsFacet
                    'destroy'   : destroyFacet

        return pluginInstance