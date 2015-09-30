define [
    'underscore'
    'marionette'
    'when'
    'meld'
], (_, Marionette, When, meld) ->

    class AppController extends Marionette.Object

        currentRootFragment: null

        showPreloader: (preloader) ->
            @regions.mainAreaRegion.show preloader

        # switch on all service modules
        switchOn: (modules) ->
            _.each modules, (options, module) =>
                @startModule module

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @notFoundPageLayer.hide() unless path is '*notFound'

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: ->
            rootFragment = window.location.hash.split('/')[1]
            if @currentRootFragment != rootFragment
                @container.stopModule 'table'
                @currentRootFragment = rootFragment

        # ROUTES HANDLERS:

        carsModuleHandler: (brand, id) ->
            if brand? and _.indexOf(['volvo', 'ford', 'mitsubishi', 'nissan'], brand) == -1
                console.debug "Unknown brand"
                return

            @rootFragmentMutation()

            environment =
                collection      : {$ref: 'carsCollection'}
                behavior        : {$ref: 'addBehavior'}
                controlLabel    : 'select'
                controlsConfig  : ['table', 'tabs']

            @filterBy 'table', environment, 'brand', brand

            # to make accent on current model
            @emphasizeEntity 'table', environment, brand, id if brand and id

        selectedCarsHandler: ->
            @rootFragmentMutation()
            environment =
                collection      : {$ref: 'selectedCarsCollection'}
                behavior        : {$ref: 'removeBehavior'}
                controlLabel    : 'remove'
                controlsConfig  : ['table', 'counter']
            @startModule 'table', environment

        statisticModuleHandler: ->
            @startModule 'statistic'

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPageLayer.show()

        # COMMON INTERCESSORS:

        startModule: (sandbox) ->
            # all is done in container/register plugin

        filterBy: (sandbox, args) ->
            sandbox.filterBy args[0], args[1]

        emphasizeEntity: (sandbox, args) ->
            console.debug 'brand, id:::::', args[0], args[1]
