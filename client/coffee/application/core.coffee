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
                navigationRegion    : ".navigation"
                sidebarRegion       : ".sidebar"
                mainAreaRegion      : ".main-area"
            onStart: ->
                Backbone.history.start()
        addController: {$ref: 'appController'}

    appController:
        create: "application/appController"
        properties:
            navigation          : {$ref: 'navigation'}
            perspective         : {$ref: 'perspective'}
            profiles            : {$ref: 'profiles'}
            deals               : {$ref: 'deals'}
            docs                : {$ref: 'docs'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerIntercessors: ['startModule', 'createEntityList', 'createEntityDetails']
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
    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            defer: true
            provide:
                navigationRegion    : {$ref: 'appInstance.regions.navigationRegion'}

    perspective:
        wire:
            spec: "application/modules/perspective/spec"
            defer: true
            provide:
                sidebarRegion       : {$ref: 'appInstance.regions.sidebarRegion'}
                mainAreaRegion      : {$ref: 'appInstance.regions.mainAreaRegion'}

    profiles:
        wire:
            spec: "application/modules/profiles/spec"
            defer: true

    deals:
        wire:
            spec: "application/modules/deals/spec"
            defer: true

    docs:
        wire:
            spec: "application/modules/docs/spec"
            defer: true
    # /APPLICATION MODULES

    preloader:
        create: "blocks/views/preloader/index"

    start: ->
        @appInstance.start()
