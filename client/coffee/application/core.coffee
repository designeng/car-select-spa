define
    $plugins: [
        'wire/debug'
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
            addBehavior         : {$ref: 'addBehavior'}
            removeBehavior      : {$ref: 'removeBehavior'}
            statistic           : {$ref: 'statistic'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerIntercessors: ['startModule', 'createTable', 'filterBy', 'emphasizeEntity']
        ready:
            showPreloader: {$ref: 'preloader'}
            switchOn: [
                "navigation"    : {}
            ]

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

    # SHARED RESOURCES: COLLECTIONS
    carsCollection:
        create: 'application/collections/cars'

    selectedCarsStorageName: 'selected-cars'

    selectedCarsCollection:
        createCollection: [
            {
                "id": 1,
                "name": "Nissan",
                "image": "assets/images/nissan-terrano.jpg",
                "brand": "nissan"
            },
            {
                "id": 2,
                "name": "Ford",
                "image": "assets/images/ford-endeavour.jpg",
                "brand": "ford"
            }
        ]
        storage:
            name: {$ref: 'selectedCarsStorageName'}

    # BEHAVIOR STRATEGIES
    addBehavior:
        module: 'application/behaviors/add'

    removeBehavior:
        module: 'application/behaviors/remove'

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
    # /APPLICATION MODULES

    preloader:
        create: "blocks/views/preloader/index"

    start: ->
        @appInstance.start()
