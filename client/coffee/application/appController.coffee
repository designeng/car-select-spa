define [
    "marionette"
    "when"
], (Marionette, When) ->

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
            @container.channel.on "list:ready", (module, list) =>
                @container.broadcastEvent "list:ready", list

            @container.channel.on "details:ready", (module, details) =>
                @container.broadcastEvent "details:ready", details

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @rootFragmentMutation(path.split("/")[0])
            @notFoundPageLayer.hide() unless path is "*notFound"

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: (rootFragment) ->
            if @currentRootFragment != rootFragment
                @container.stopModule @currentRootFragment
                @currentRootFragment = rootFragment

        # ROUTES HANDLERS:

        carsModuleHandler: (brand, id) ->
            When(@createTable "cars").then () =>
                @emphasizeEntity "cars", brand, id

        statisticModuleHandler: ->
            @startModule "statistic"

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPageLayer.show()

        # COMMON INTERCESSORS:

        startModule: (sandbox) ->
            # all is done in container/register plugin

        createTable: (sandbox) ->
            sandbox.createTable()

        emphasizeEntity: (sandbox, args) ->
            console.debug "brand, id:::::", args[0], args[1]
