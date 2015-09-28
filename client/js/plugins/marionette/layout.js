define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var createLayoutFactory, pluginInstance, renderInFacet, showInRegionsFacet;
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
      return wire(facet.options).then(function(region) {
        return resolver.resolve(region.show(facet.target));
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
    pluginInstance = {
      factories: {
        createLayout: createLayoutFactory
      },
      facets: {
        showInRegions: {
          "ready": showInRegionsFacet
        },
        renderIn: {
          "ready": renderInFacet
        }
      }
    };
    return pluginInstance;
  };
});
