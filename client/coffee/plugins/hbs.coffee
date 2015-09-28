# this plugin is wire.js wrapper for requirejs hbs! plugin
define ->

    return (options) ->

        hbsResolver = (resolver, name, refObj, wire) ->
            require ["hbs!" + name], (result) ->
                resolver.resolve result

        return pluginInstance = 
            resolvers:
                hbs: hbsResolver