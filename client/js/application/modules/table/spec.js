define({
  $plugins: ['plugins/hbs', 'plugins/marionette/layout', 'plugins/marionette/components/tabs', 'plugins/marionette/components/table'],
  publicApi: {
    literal: {
      filterBy: {
        $ref: 'table.filterBy'
      }
    }
  },
  layout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/tableModuleLayout'
      },
      withRegions: {
        tableRegion: '.cars-table-control-wrapper'
      }
    },
    renderIn: {
      region: {
        $ref: 'region'
      }
    },
    showInRegions: {
      'tableRegion': {
        $ref: 'table'
      }
    }
  },
  table: {
    createTable: {
      collection: {
        $ref: 'collection'
      },
      className: 'cars'
    },
    addBehaviors: {
      'chooseButton': {
        cellId: 'last',
        controlType: 'button',
        controlLabel: {
          $ref: 'controlLabel'
        },
        controlBehavior: {
          $ref: 'behavior'
        }
      },
      'imageZoom': {
        cellId: 'first',
        cellBehavior: {
          $ref: 'imageCellBehavior'
        }
      }
    },
    addFilters: {
      'brand': {}
    }
  },
  imageCellBehavior: {
    module: 'application/behaviors/imageCellBehavior'
  }
});
