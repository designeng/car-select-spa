define [
    'underscore'
    'backbone'
], (_, Backbone) ->

    return (options) ->

        # Backbone built-in feature: every underscore collection method can be called on Backbone.Collection
        applyMethods = (collection, methods) ->
            errorPrefix = "There is no method"
            _.reduce methods, (result, method) ->
                if _.isObject method
                    methodName = _.keys(method)[0]
                    methodArgs = method[methodName]
                else if _.isString method
                    methodName = method
                if result instanceof Backbone.Collection 
                    if !result[methodName]
                        throw new Error "#{errorPrefix} '#{methodName}' in Backbone.Collection!"
                    else
                        return result[methodName](methodArgs)
                else if _[methodName]
                    return _[methodName](result, methodArgs)
                else
                    throw new Error "#{errorPrefix} '#{methodName}' in Underscore!"
            , collection

        applyToFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                _collection = options.collection
                if !_collection.length
                    _collection.on 'sync', (collection) =>
                        resolver.resolve applyMethods(collection, options.methods)
                else
                    resolver.resolve applyMethods(_collection, options.methods)

        pluginInstance = 
            factories: 
                applyTo: applyToFactory

        return pluginInstance