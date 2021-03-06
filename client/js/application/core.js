define({
  $plugins: ['plugins/marionette/router', 'plugins/marionette/application', 'plugins/backbone/collection/create', 'plugins/container/register', 'plugins/element'],
  appInstance: {
    createApplication: {
      withRegions: {
        navigationRegion: ".navigation",
        mainAreaRegion: ".main-area"
      },
      onStart: function() {
        return Backbone.history.start();
      }
    },
    addController: {
      $ref: 'appController'
    }
  },
  appController: {
    create: "application/appController",
    properties: {
      navigation: {
        $ref: 'navigation'
      },
      table: {
        $ref: 'table'
      },
      addItemBehavior: {
        $ref: 'addItemBehavior'
      },
      removeItemBehavior: {
        $ref: 'removeItemBehavior'
      },
      statistic: {
        $ref: 'statistic'
      },
      notFoundPageLayer: {
        $ref: "element!.not-found"
      }
    },
    registerIntercessors: ['startModule', 'configure', 'filterBy']
  },
  router: {
    createRouter: {
      controller: {
        $ref: 'appController'
      },
      routes: {
        'cars': 'carsRouteHandler',
        'cars/:brand': 'carsRouteHandler',
        'selected': 'selectedCarsRouteHandler',
        'statistic': 'statisticRouteHandler',
        '*notFound': 'notFoundRouteHandler'
      },
      precede: {
        handlers: '*',
        "with": [
          {
            $ref: 'appController.configureNavigationModule'
          }, {
            $ref: 'appController.rootFragmentMutation'
          }
        ]
      }
    },
    onRoute: {
      $ref: 'appController.onRoute'
    }
  },
  carsCollection: {
    create: 'application/collections/cars'
  },
  selectedCarsCollection: {
    createCollection: {
      initValues: [],
      fromStorage: 'selected-cars',
      synchronize: true
    }
  },
  statisticCollection: {
    createCollection: {
      initValues: [
        {
          id: 0,
          brand: 'volvo',
          count: 0
        }, {
          id: 1,
          brand: 'ford',
          count: 0
        }, {
          id: 2,
          brand: 'mitsubishi',
          count: 0
        }, {
          id: 3,
          brand: 'nissan',
          count: 0
        }
      ],
      fromStorage: 'statistic',
      synchronize: true
    }
  },
  addItemBehavior: {
    create: {
      module: 'application/behaviors/add',
      args: [
        {
          $ref: 'selectedCarsCollection'
        }, {
          $ref: 'statisticCollection'
        }
      ]
    }
  },
  removeItemBehavior: {
    create: {
      module: 'application/behaviors/remove',
      args: [
        {
          $ref: 'selectedCarsCollection'
        }
      ]
    }
  },
  navigation: {
    wire: {
      spec: "application/modules/navigation/spec",
      defer: true,
      provide: {
        region: {
          $ref: 'appInstance.regions.navigationRegion'
        }
      }
    }
  },
  table: {
    wire: {
      spec: "application/modules/table/spec",
      defer: true,
      provide: {
        region: {
          $ref: 'appInstance.regions.mainAreaRegion'
        }
      }
    }
  },
  statistic: {
    wire: {
      spec: "application/modules/statistic/spec",
      defer: true,
      provide: {
        region: {
          $ref: 'appInstance.regions.mainAreaRegion'
        }
      }
    }
  },
  start: function() {
    return this.appInstance.start();
  }
});
