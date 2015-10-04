define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
        'plugins/marionette/components/tabs'
        'plugins/marionette/components/counter'
    ]

    publicApi:
        literal:
            configureLayout      : {$ref: 'controller.configureLayout'}

    layout:
        createLayout:
            fromTemplate: {$ref: 'hbs!templates/navigation'}
            withRegions:
                navigationTabsRegion    : ".navigation-tabs"
                brandTabsRegion         : ".brand-tabs"
                counterRegion           : ".selected-cars-counter"
        renderIn: 
            region: {$ref: 'region'}
        showInRegions:
            'navigationTabsRegion'  : {$ref: 'navigationTabs'}
            'brandTabsRegion'       : {$ref: 'brandTabs'}
            'counterRegion'         : {$ref: 'counter'}

    navigationTabs:
        createTabs:
            labels:
                "All cars"      : "cars"
                "Selected cars" : "selected"
                "Statistic"     : "statistic"
            className: 'navigation-tabs'

    brandTabs:
        createTabs:
            labels:
                'All brands'    : 'cars'
                'Volvo'         : 'cars/volvo'
                'Ford'          : 'cars/ford'
                'Mitsubishi'    : 'cars/mitsubishi'
                'Nissan'        : 'cars/nissan'
            className: 'cars-filters'

    counter:
        createCounter:
            collection  : {$ref: 'selectedCarsCollection'}
            className   : 'cars-counter'

    controller:
        create: 'application/modules/navigation/controller'
        properties:
            counter     : {$ref: 'counter'}
            brandTabs   : {$ref: 'brandTabs'}