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
          name: 'count',
          data: [5, 3, 4, 7]
        }
      ]
    });
  };
});
