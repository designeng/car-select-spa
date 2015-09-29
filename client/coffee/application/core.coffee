define
    $plugins: [
        # 'wire/debug'
        'plugins/marionette/router'
        'plugins/marionette/application'
        'plugins/backbone/collection/create'
        'plugins/container/register'
        'plugins/localstorage'
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
            cars                : {$ref: 'cars'}
            selected            : {$ref: 'selected'}
            statistic           : {$ref: 'statistic'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerIntercessors: ['startModule', 'createTable', 'filterByBrand', 'emphasizeEntity']
        ready:
            showPreloader: {$ref: 'preloader'}
            switchOn: [
                "navigation"    : {}
            ]
            listenToModules: {}

    router:
        createRouter:
            controller: {$ref: 'appController'}
            routes:
                'cars'              : 'carsModuleHandler'
                'cars/:brand'       : 'carsModuleHandler'
                'cars/:brand/:id'   : 'carsModuleHandler'
                'selected'          : 'selectedCarsHandler'
                'statistic'         : 'statisticModuleHandler'
                '*notFound'         : 'notFoundHandler'
        onRoute: {$ref: 'appController.onRoute'}

    selectedCarsStorageName: 'selected-cars'

    selectedCars:
        createCollection: {}
        storage:
            name: {$ref: 'selectedCarsStorageName'}

    # APPLICATION MODULES
    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            defer: true
            provide:
                navigationRegion    : {$ref: 'appInstance.regions.navigationRegion'}

    cars:
        wire:
            spec: "application/modules/cars/spec"
            defer: true
            provide:
                carsModuleAreaRegion: {$ref: 'appInstance.regions.mainAreaRegion'}

    selected:
        wire:
            spec: "application/modules/selected/spec"
            defer: true
            provide:
                carsModuleAreaRegion: {$ref: 'appInstance.regions.mainAreaRegion'}

    statistic:
        wire:
            spec: "application/modules/statistic/spec"
            defer: true
    # /APPLICATION MODULES

    preloader:
        create: "blocks/views/preloader/index"

    start: ->
        @appInstance.start()
