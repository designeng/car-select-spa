define({
  $plugins: ['plugins/marionette/router', 'plugins/marionette/application', 'plugins/container/register', 'plugins/element'],
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
      cars: {
        $ref: 'cars'
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
      ],
      listenToModules: {}
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
  navigation: {
    wire: {
      spec: "application/modules/navigation/spec",
      defer: true,
      provide: {
        navigationRegion: {
          $ref: 'appInstance.regions.navigationRegion'
        }
      }
    }
  },
  cars: {
    wire: {
      spec: "application/modules/cars/spec",
      defer: true,
      provide: {
        carsModuleAreaRegion: {
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
