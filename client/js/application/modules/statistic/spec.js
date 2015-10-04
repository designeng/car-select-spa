define({
  $plugins: ['plugins/hbs', 'plugins/marionette/layout'],
  layout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/statisticLayout'
      },
      withRegions: {
        chartRegion: '.chart-wrapper'
      }
    },
    renderIn: {
      region: {
        $ref: 'region'
      }
    },
    showInRegions: {
      'chartRegion': {
        $ref: 'chart'
      }
    }
  },
  chart: {
    create: 'application/modules/statistic/chart',
    properties: {
      collection: {
        $ref: 'statisticCollection'
      }
    }
  }
});
