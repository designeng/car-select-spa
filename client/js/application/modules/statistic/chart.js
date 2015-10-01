define(['highcharts'], function(highcharts) {
  var chart;
  return chart = function($element, collection) {
    return $element.highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Selected brands statistic'
      },
      xAxis: {
        categories: ['Volvo', 'Ford', 'Mitsubishi', 'Nissan']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Selection count'
        }
      },
      series: [
        {
          name: 'common brand selections count',
          data: collection.map(function(model) {
            return model.get('count');
          })
        }
      ]
    });
  };
});
