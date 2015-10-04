define
    $plugins: [
        # 'wire/debug'
        'plugins/marionette/router'
        'plugins/marionette/application'
        'plugins/backbone/collection/create'
        'plugins/container/register'
        'plugins/element'
    ]

    appInstance:
        createApplication:
            withRegions:
                navigationRegion    : ".navigation"
                mainAreaRegion      : ".main-area"
            onStart: ->
                Backbone.history.start()
        addController: {$ref: 'appController'}

    appController:
        create: "application/appController"
        properties:
            navigation          : {$ref: 'navigation'}
            table               : {$ref: 'table'}
            addItemBehavior     : {$ref: 'addItemBehavior'}
            removeItemBehavior  : {$ref: 'removeItemBehavior'}
            statistic           : {$ref: 'statistic'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerIntercessors: ['startModule', 'configure', 'filterBy']

    router:
        createRouter:
            controller: {$ref: 'appController'}
            routes:
                'cars'              : 'carsModuleHandler'
                'cars/:brand'       : 'carsModuleHandler'
                'selected'          : 'selectedCarsHandler'
                'statistic'         : 'statisticModuleHandler'
                '*notFound'         : 'notFoundHandler'
        onRoute: {$ref: 'appController.onRoute'}

    # COLLECTIONS
    carsCollection:
        create: 'application/collections/cars'

    selectedCarsCollection:
        createCollection:
            initValues: []
            fromStorage: 'selected-cars'
            synchronize: true

    statisticCollection:
        createCollection:
            initValues: [
                {id: 0, brand: 'volvo'         , count: 0}
                {id: 1, brand: 'ford'          , count: 0}
                {id: 2, brand: 'mitsubishi'    , count: 0}
                {id: 3, brand: 'nissan'        , count: 0}
            ]
            fromStorage: 'statistic'
            synchronize: true

    # BEHAVIOR STRATEGIES
    addItemBehavior:
        create:
            module: 'application/behaviors/add'
            args: [
                {$ref: 'selectedCarsCollection'}
                {$ref: 'statisticCollection'}
            ]

    removeItemBehavior:
        create:
            module: 'application/behaviors/remove'
            args: [
                {$ref: 'selectedCarsCollection'}
            ]

    # APPLICATION MODULES
    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            defer: true
            provide:
                region          : {$ref: 'appInstance.regions.navigationRegion'}

    table:
        wire:
            spec: "application/modules/table/spec"
            defer: true
            provide:
                region          : {$ref: 'appInstance.regions.mainAreaRegion'}

    statistic:
        wire:
            spec: "application/modules/statistic/spec"
            defer: true
            provide:
                region          : {$ref: 'appInstance.regions.mainAreaRegion'}
    # /APPLICATION MODULES

    start: ->
        @appInstance.start()
