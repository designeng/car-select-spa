define [
    'underscore'
    'marionette'
    'when'
], (_, Marionette, When) ->

    class AppController extends Marionette.Object

        currentRootFragment: null

        showPreloader: (preloader) ->
            @regions.mainAreaRegion.show preloader

        # switch on all service modules
        switchOn: (modules) ->
            _.each modules, (options, module) =>
                @startModule module

        # demonstration of module - core interaction
        listenToModules: ->
            @container.channel.on 'list:ready', (module, list) =>
                @container.broadcastEvent 'list:ready', list

            @container.channel.on 'details:ready', (module, details) =>
                @container.broadcastEvent 'details:ready', details

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @rootFragmentMutation(path.split('/')[0])
            @notFoundPageLayer.hide() unless path is '*notFound'

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: (rootFragment) ->
            if @currentRootFragment != rootFragment
                @container.stopModule @currentRootFragment
                @currentRootFragment = rootFragment

        # ROUTES HANDLERS:

        carsModuleHandler: (brand, id) ->
            if brand? and _.indexOf(['volvo', 'ford', 'mitsubishi', 'nissan'], brand) == -1
                console.debug "Unknown brand"
            if !brand and !id
                @filterByBrand 'cars', null
            if brand and !id
                @filterByBrand 'cars', brand
            if brand and id
                @emphasizeEntity 'cars', brand, id
            @switchTableState 'cars', 'selection-state'

        selectedCarsHandler: ->
            @switchTableState 'cars', 'elected-state'

        statisticModuleHandler: ->
            @startModule 'statistic'

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPageLayer.show()

        # COMMON INTERCESSORS:

        startModule: (sandbox) ->
            # all is done in container/register plugin

        filterByBrand: (sandbox, args) ->
            sandbox.filterByBrand args[0]

        emphasizeEntity: (sandbox, args) ->
            console.debug 'brand, id:::::', args[0], args[1]

        switchTableState: (sandbox, args) ->
            console.debug 'switchTableState', sandbox, args
