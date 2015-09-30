define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
        'plugins/marionette/components/tabs'
        'plugins/marionette/components/table'
    ]

    publicApi:
        literal:
            filterByBrand       : {$ref: 'controller.filterByBrand'}

    layout:
        createLayout:
            fromTemplate: {$ref: 'hbs!templates/tableModuleLayout'}
            withRegions:
                tabsRegion      : '.cars-tabs-control-wrapper'
                counterRegion   : '.cars-counter-control-wrapper'
                tableRegion     : '.cars-table-control-wrapper'
        renderIn: {$ref: 'region'}
        showInRegions:
            'tabsRegion'    : {$ref: 'tabs'}
            'tableRegion'   : {$ref: 'table'}

    tabs:
        createTabs:
            labels:
                'All brands'    : 'cars'
                'Volvo'         : 'cars/volvo'
                'Ford'          : 'cars/ford'
                'Mitsubishi'    : 'cars/mitsubishi'
                'Nissan'        : 'cars/nissan'
            className: 'cars-filters'

    counter:
        create: 'application/modules/table/counter'

    table:
        createTable:
            collection          : {$ref: 'collection'}
        addControls:
            cellId: 'last'
            controlType: 'button'
            controlLable: {$ref: 'controlLable'}
            controlBehavior: {$ref: 'behavior'}
        addFilters:
            'brand' : {}

    controller:
        create: 'application/modules/table/controller'
        properties:
            collection          : {$ref: 'collection'}
            table               : {$ref: 'table'}
            tabs                : {$ref: 'tabs'}
            counter             : {$ref: 'counter'}
        ready:
            onReady: {}