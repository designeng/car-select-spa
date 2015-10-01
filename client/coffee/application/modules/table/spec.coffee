define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
        'plugins/marionette/components/tabs'
        'plugins/marionette/components/counter'
        'plugins/marionette/components/table'
    ]

    publicApi:
        literal:
            filterBy       : {$ref: 'table.filterBy'}

    layout:
        createLayout:
            fromTemplate: {$ref: 'hbs!templates/tableModuleLayout'}
            withRegions:
                tabsRegion      : '.cars-tabs-control-wrapper'
                counterRegion   : '.cars-counter-control-wrapper'
                tableRegion     : '.cars-table-control-wrapper'
        renderIn: 
            region: {$ref: 'region'}
        showInRegions:
            'tabsRegion'    : {$ref: 'tabs'}
            'counterRegion' : {$ref: 'counter'}
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
        createCounter: {}

    table:
        createTable:
            collection          : {$ref: 'collection'}
        addControls:
            cellId: 'last'
            controlType: 'button'
            controlLabel: {$ref: 'controlLabel'}
            controlBehavior: {$ref: 'behavior'}
        addFilters:
            'brand' : {}

    controller:
        create: 'application/modules/table/controller'
        properties:
            collection          : {$ref: 'collection'}
            tabs                : {$ref: 'tabs'}
            counter             : {$ref: 'counter'}
        ready:
            onReady: {}