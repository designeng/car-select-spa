define({
  $plugins: ['plugins/hbs', 'plugins/marionette/layout'],
  publicApi: {
    literal: {
      createList: {
        $ref: 'controller.createList'
      },
      createDetails: {
        $ref: 'controller.createDetails'
      }
    }
  },
  docsCollection: {
    create: 'application/modules/docs/collections/docs',
    ready: {
      fetch: {}
    }
  },
  docsList: {
    create: 'blocks/views/list/index',
    properties: {
      collection: {
        $ref: 'docsCollection'
      },
      entity: "doc",
      childTemplate: {
        $ref: 'hbs!templates/docsListItem'
      }
    }
  },
  markdownLayout: {
    create: 'blocks/views/markdown/index'
  },
  controller: {
    create: 'application/modules/docs/controller',
    properties: {
      sandbox: {
        $ref: 'sandbox'
      },
      collection: {
        $ref: 'docsCollection'
      },
      list: {
        $ref: 'docsList'
      },
      markdownLayout: {
        $ref: 'markdownLayout'
      }
    }
  }
});
