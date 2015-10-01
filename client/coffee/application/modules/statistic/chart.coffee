define [
    'highcharts'
], (highcharts) ->
    chart = ($element, collection) ->
        $element.highcharts
            chart:
                type: 'column'
            title:
                text: 'Selected brands statistic'
            xAxis:
                categories: ['Volvo', 'Ford', 'Mitsubishi', 'Nissan']
            yAxis:
                min: 0
                title:
                    text: 'Selection count'
            series: [
                {
                    name: 'count'
                    data: [5, 3, 4, 7]
                }
            ]
