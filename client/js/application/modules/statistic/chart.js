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
          text: 'Total count'
        }
      },
      series: [
        {
          name: 'John',
          data: [5, 3, 4, 7]
        }, {
          name: 'Jane',
          data: [2, 2, 3, 2]
        }, {
          name: 'Joe',
          data: [3, 4, 4, 2]
        }
      ]
    });
  };
});
