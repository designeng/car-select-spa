var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'highcharts'], function(Marionette, highcharts) {
  var Chart, _ref;
  return Chart = (function(_super) {
    __extends(Chart, _super);

    function Chart() {
      _ref = Chart.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Chart.prototype.template = '<div></div>';

    Chart.prototype.onRender = function() {
      return this.$el.highcharts({
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
            data: this.collection.map(function(model) {
              return model.get('count');
            })
          }
        ]
      });
    };

    return Chart;

  })(Marionette.ItemView);
});
