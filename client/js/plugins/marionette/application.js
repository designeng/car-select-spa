define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var addControllerFacet, createApplicationFactory, pluginInstance, showInRegionsFacet;
    createApplicationFactory = function(resolver, compDef, wire) {
      var app;
      app = new Marionette.Application();
      return wire(compDef.options).then(function(options) {
        app.on("start", function() {
          return options.onStart();
        });
        app.addRegions(options.withRegions);
        return resolver.resolve(app);
      });
    };
    showInRegionsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        _.each(options, function(view, region) {
          return facet.target[region].show(view);
        });
        return resolver.resolve(facet.target);
      });
    };
    addControllerFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(controller) {
        controller.regions = facet.target.regions = facet.target.getRegions();
        facet.target.controller = controller;
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createApplication: createApplicationFactory
      },
      facets: {
        showInRegions: {
          "ready": showInRegionsFacet
        },
        addController: {
          "ready": addControllerFacet
        }
      }
    };
    return pluginInstance;
  };
});
