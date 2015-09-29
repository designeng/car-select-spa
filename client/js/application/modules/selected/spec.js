define({
  $plugins: ['wire/debug', 'plugins/hbs', 'plugins/marionette/layout', 'plugins/marionette/components/tabs', 'plugins/marionette/components/table', 'plugins/backbone/collection/create', 'plugins/localstorage'],
  layout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/selectedLayout'
      },
      withRegions: {
        counterRegion: '.cars-counter-control-wrapper',
        tableRegion: '.cars-table-control-wrapper'
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
    createCollection: {},
    storage: {
      name: 'selected---'
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
      controlBehavior: {
        $ref: 'buttonControlBehavior'
      }
    },
    addFilters: {
      'brand': {}
    }
  },
  buttonControlBehavior: {
    module: 'application/modules/selected/behaviors/button'
  }
});
