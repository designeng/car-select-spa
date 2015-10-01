define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var attachToRegionsFacet, createLayoutFactory, pluginInstance, renderInFacet, showInRegionsFacet;
    createLayoutFactory = function(resolver, compDef, wire) {
      var layout;
      layout = new Marionette.LayoutView();
      return wire(compDef.options).then(function(options) {
        if (options.fromTemplate) {
          layout.template = options.fromTemplate;
        }
        layout.addRegions(options.withRegions);
        return resolver.resolve(layout);
      });
    };
    renderInFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        return resolver.resolve(options.region.show(facet.target, {
          preventDestroy: options.preventDestroy
        }));
      });
    };
    showInRegionsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        if (facet.target.isRendered) {
          _.each(options, function(view, region) {
            return facet.target.showChildView(region, view);
          });
        } else {
          facet.target.onRender = function() {
            return _.each(options, function(view, region) {
              return facet.target.showChildView(region, view);
            });
          };
        }
        return resolver.resolve(facet.target);
      });
    };
    attachToRegionsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        _.each(options, function(view, region) {
          var regionObject;
          return regionObject = facet.target.getRegion(region);
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createLayout: createLayoutFactory
      },
      facets: {
        showInRegions: {
          "ready": showInRegionsFacet
        },
        attachToRegions: {
          "ready": attachToRegionsFacet
        },
        renderIn: {
          "ready": renderInFacet
        }
      }
    };
    return pluginInstance;
  };
});
