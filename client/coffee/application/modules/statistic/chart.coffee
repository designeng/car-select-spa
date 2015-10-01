define [
    'marionette'
    'highcharts'
], (Marionette, highcharts) ->

    class Chart extends Marionette.ItemView

        template: '<div></div>'

        onRender: ->
            @$el.highcharts
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
                        name: 'common brand selections count'
                        data: @collection.map (model) ->
                            model.get('count')
                    }
                ]
