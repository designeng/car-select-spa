define({
  $plugins: ['plugins/marionette/router', 'plugins/marionette/application', 'plugins/container/register', 'plugins/element'],
  appInstance: {
    createApplication: {
      withRegions: {
        navigationRegion: ".navigation",
        sidebarRegion: ".sidebar",
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
      perspective: {
        $ref: 'perspective'
      },
      profiles: {
        $ref: 'profiles'
      },
      deals: {
        $ref: 'deals'
      },
      docs: {
        $ref: 'docs'
      },
      notFoundPageLayer: {
        $ref: "element!.not-found"
      }
    },
    registerIntercessors: ['startModule', 'createEntityList', 'createEntityDetails'],
    ready: {
      showPreloader: {
        $ref: 'preloader'
      },
      switchOn: [
        {
          "navigation": {},
          "perspective": {}
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
        'profiles': 'profilesModuleHandler',
        'profiles/:id': 'profilesModuleHandler',
        'deals': 'dealsModuleHandler',
        'deals/:id': 'dealsModuleHandler',
        'docs': 'docsModuleHandler',
        'docs/:id': 'docsModuleHandler',
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
  perspective: {
    wire: {
      spec: "application/modules/perspective/spec",
      defer: true,
      provide: {
        sidebarRegion: {
          $ref: 'appInstance.regions.sidebarRegion'
        },
        mainAreaRegion: {
          $ref: 'appInstance.regions.mainAreaRegion'
        }
      }
    }
  },
  profiles: {
    wire: {
      spec: "application/modules/profiles/spec",
      defer: true
    }
  },
  deals: {
    wire: {
      spec: "application/modules/deals/spec",
      defer: true
    }
  },
  docs: {
    wire: {
      spec: "application/modules/docs/spec",
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
