define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
        'plugins/marionette/components/tabs'
    ]

    chart:
        create:
            module: 'application/modules/statistic/chart'
            args: [
                {$ref: 'region.$el'}
                {$ref: 'statisticCollection'}
            ]