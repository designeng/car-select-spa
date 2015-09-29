define({
  $plugins: ['wire/debug', 'plugins/hbs', 'plugins/marionette/layout', 'plugins/marionette/components/table'],
  publicApi: {
    literal: {
      createTable: {
        $ref: 'controller.createTable'
      }
    }
  },
  layout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/carsLayout'
      },
      withRegions: {
        tabsRegion: ".cars-tabs-control-wrapper",
        tableRegion: ".cars-table-control-wrapper"
      }
    },
    renderIn: {
      $ref: 'carsModuleAreaRegion'
    },
    showInRegions: {
      'tableRegion': {
        $ref: 'table'
      }
    }
  },
  collection: {
    create: 'application/modules/cars/collections/cars',
    ready: {
      fetch: {}
    }
  },
  controller: {
    create: 'application/modules/cars/controller',
    properties: {
      sandbox: {
        $ref: 'sandbox'
      },
      collection: {
        $ref: 'collection'
      },
      table: {
        $ref: 'table'
      }
    },
    ready: {
      showTable: {},
      onReady: {}
    }
  },
  table: {
    createTable: {
      collection: {
        $ref: 'collection'
      }
    }
  }
});
