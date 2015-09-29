define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
        'plugins/marionette/components/tabs'
        'plugins/marionette/components/table'
    ]

    layout:
        createLayout:
            fromTemplate: {$ref: 'hbs!templates/carsLayout'}
            withRegions:
                tabsRegion  : '.cars-tabs-control-wrapper'
                tableRegion : '.cars-table-control-wrapper'
        renderIn: {$ref: 'carsModuleAreaRegion'}
        showInRegions:
            'tabsRegion'    : {$ref: 'tabs'}
            'tableRegion'   : {$ref: 'table'}

    collection:
        create: 'application/modules/cars/collections/cars'
        ready:
            fetch: {}

    controller:
        create: 'application/modules/cars/controller'
        properties:
            sandbox             : {$ref: 'sandbox'}
            collection          : {$ref: 'collection'}
            table               : {$ref: 'table'}
        ready:
            onReady: {}

    tabs:
        createTabs:
            labels:
                'All brands'    : 'cars'
                'Volvo'         : 'cars/volvo'
                'Ford'          : 'cars/ford'
                'Mitsubishi'    : 'cars/mitsubishi'
                'Nissan'        : 'cars/nissan'
            className: 'cars-filters'

    table:
        createTable:
            collection          : {$ref: 'collection'}

