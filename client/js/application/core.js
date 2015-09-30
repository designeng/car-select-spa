define({
  $plugins: ['wire/debug', 'plugins/marionette/router', 'plugins/marionette/application', 'plugins/backbone/collection/create', 'plugins/container/register', 'plugins/element'],
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
      addBehavior: {
        $ref: 'addBehavior'
      },
      removeBehavior: {
        $ref: 'removeBehavior'
      },
      statistic: {
        $ref: 'statistic'
      },
      notFoundPageLayer: {
        $ref: "element!.not-found"
      }
    },
    registerIntercessors: ['startModule', 'createTable', 'filterByBrand', 'emphasizeEntity'],
    ready: {
      showPreloader: {
        $ref: 'preloader'
      },
      switchOn: [
        {
          "navigation": {}
        }
      ]
    }
  },
  router: {
    createRouter: {
      controller: {
        $ref: 'appController'
      },
      routes: {
        'cars': 'carsModuleHandler',
        'cars/:brand': 'carsModuleHandler',
        'cars/:brand/:id': 'carsModuleHandler',
        'selected': 'selectedCarsHandler',
        'statistic': 'statisticModuleHandler',
        '*notFound': 'notFoundHandler'
      }
    },
    onRoute: {
      $ref: 'appController.onRoute'
    }
  },
  carsCollection: {
    create: 'application/collections/cars',
    ready: {
      fetch: {}
    }
  },
  selectedCarsStorageName: 'selected-cars',
  selectedCarsCollection: {
    createCollection: [
      {
        "id": 1,
        "name": "Volvo S60",
        "image": "volvo-s60.jpg",
        "brand": "volvo"
      }, {
        "id": 2,
        "name": "Volvo S80",
        "image": "volvo-s80.jpg",
        "brand": "volvo"
      }
    ],
    storage: {
      name: {
        $ref: 'selectedCarsStorageName'
      }
    }
  },
  addBehavior: {
    module: 'application/behaviors/add'
  },
  removeBehavior: {
    module: 'application/behaviors/remove'
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
      defer: true
    }
  },
  preloader: {
    create: "blocks/views/preloader/index"
  },
  start: function() {
    return this.appInstance.start();
  }
});
