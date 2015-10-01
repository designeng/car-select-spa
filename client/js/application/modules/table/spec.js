define({
  $plugins: ['wire/debug', 'plugins/hbs', 'plugins/marionette/layout', 'plugins/marionette/components/tabs', 'plugins/marionette/components/table'],
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
      }
    },
    addControls: {
      cellId: 'last',
      controlType: 'button',
      controlLabel: {
        $ref: 'controlLabel'
      },
      controlBehavior: {
        $ref: 'behavior'
      }
    },
    addFilters: {
      'brand': {}
    },
    properties: {
      sandbox: {
        $ref: 'sandbox'
      }
    }
  },
  controller: {
    create: 'application/modules/table/controller',
    properties: {
      collection: {
        $ref: 'collection'
      },
      table: {
        $ref: 'table'
      },
      sandbox: {
        $ref: 'sandbox'
      }
    },
    ready: {
      onReady: {}
    }
  }
});
