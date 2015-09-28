define
    $plugins: [
        # 'wire/debug'
        'plugins/marionette/router'
        'plugins/marionette/application'
        'plugins/container/register'
        'plugins/element'
    ]

    appInstance:
        createApplication:
            withRegions:
                navigationTabsRegion    : ".tabs"
                mainAreaRegion          : ".main-area"
            onStart: ->
                Backbone.history.start()
        addController: {$ref: 'appController'}

    appController:
        create: "application/appController"
        properties:
            tabs                : {$ref: 'tabs'}
            cars                : {$ref: 'cars'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerIntercessors: ['startModule', 'createTable']
        ready:
            showPreloader: {$ref: 'preloader'}
            switchOn: [
                "navigation"    : {}
                "perspective"   : {}
            ]
            listenToModules: {}

    router:
        createRouter:
            controller: {$ref: 'appController'}
            routes:
                'cars'              : 'carsModuleHandler'
                'cars/:brand/:id'   : 'carsModuleHandler'
                '*notFound'         : 'notFoundHandler'
        onRoute: {$ref: 'appController.onRoute'}

    # APPLICATION MODULES
    tabs:
        wire:
            spec: "application/modules/tabs/spec"
            defer: true
            provide:
                navigationTabsRegion    : {$ref: 'appInstance.regions.navigationTabsRegion'}

    cars:
        wire:
            spec: "application/modules/cars/spec"
            defer: true

    statistic:
        wire:
            spec: "application/modules/statistic/spec"
            defer: true
    # /APPLICATION MODULES

    preloader:
        create: "blocks/views/preloader/index"

    start: ->
        @appInstance.start()
