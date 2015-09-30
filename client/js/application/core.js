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
    registerIntercessors: ['startModule', 'createTable', 'filterBy', 'emphasizeEntity'],
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
    create: 'application/collections/cars'
  },
  selectedCarsStorageName: 'selected-cars',
  selectedCarsCollection: {
    createCollection: {
      fromStorage: {
        $ref: 'selectedCarsStorageName'
      },
      synchronize: true
    }
  },
  addBehavior: {
    create: {
      module: 'application/behaviors/add',
      args: [
        {
          $ref: 'selectedCarsCollection'
        }
      ]
    }
  },
  removeBehavior: {
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
