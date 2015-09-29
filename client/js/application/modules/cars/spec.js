define({
  $plugins: ['wire/debug', 'plugins/marionette/components/table'],
  publicApi: {
    literal: {
      createTable: {
        $ref: 'controller.createTable'
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
      }
    },
    ready: {
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
