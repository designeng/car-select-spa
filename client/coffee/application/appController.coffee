define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    class AppController extends Marionette.Object

        currentRootFragment: null

        # will be invoked before any '...RouteHandler' method
        handlersPreceder: (handlerName) ->
            switch handlerName
                when 'carsRouteHandler'
                    @configure 'navigation', {}, {brandTabs: true, counter: false}
                when 'selectedCarsRouteHandler'
                    @configure 'navigation', {}, {brandTabs: false, counter: true}
                when 'statisticRouteHandler'
                    @configure 'navigation', {}, {brandTabs: false, counter: false}
                when 'notFoundRouteHandler'
                    @configure 'navigation', {}, {brandTabs: false, counter: false}
            @rootFragmentMutation()

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @notFoundPageLayer.hide() unless path is '*notFound'

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: ->
            rootFragment = window.location.hash.split('/')[1]
            if @currentRootFragment != rootFragment
                @container.stopModules ['table', 'statistic']
                @currentRootFragment = rootFragment

        # ROUTES HANDLERS:

        carsRouteHandler: (brand) ->
            if brand? and _.indexOf(['volvo', 'ford', 'mitsubishi', 'nissan'], brand) == -1
                console.debug 'Unknown brand'
                return

            environment =
                collection      : {$ref: 'carsCollection'}
                behavior        : {$ref: 'addItemBehavior'}
                controlLabel    : 'select'

            @filterBy 'table', environment, 'brand', brand

        selectedCarsRouteHandler: ->
            environment =
                collection      : {$ref: 'selectedCarsCollection'}
                behavior        : {$ref: 'removeItemBehavior'}
                controlLabel    : 'remove'
                    
            @startModule 'table', environment

        statisticRouteHandler: ->
            @startModule 'statistic'

        # 404 ERROR:

        notFoundRouteHandler: ->
            @notFoundPageLayer.show()

        # INTERCESSORS:

        startModule: (sandbox) ->
            # all is done in container/register plugin

        configure: (sandbox, args) ->
            sandbox.configureLayout args[0]

        filterBy: (sandbox, args) ->
            sandbox.filterBy args[0], args[1]
