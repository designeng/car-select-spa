var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['underscore', 'backbone', 'marionette', 'hbs!templates/tableRow'], function(_, Backbone, Marionette, tableRowTpl) {
  var TableRowView, TableView, addCellBehavior, addControl, insertControl, _ref, _ref1;
  TableRowView = (function(_super) {
    __extends(TableRowView, _super);

    function TableRowView() {
      _ref = TableRowView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TableRowView.prototype.tagName = "tr";

    TableRowView.prototype.template = tableRowTpl;

    return TableRowView;

  })(Marionette.ItemView);
  TableView = (function(_super) {
    __extends(TableView, _super);

    function TableView() {
      this.filterBy = __bind(this.filterBy, this);
      _ref1 = TableView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    TableView.prototype.tagName = 'table';

    TableView.prototype.childView = TableRowView;

    TableView.prototype.childViewContainer = 'tbody';

    TableView.prototype.filters = {};

    TableView.prototype.collectionEvents = {
      'sync': 'onCollectionSync'
    };

    TableView.prototype.initialize = function(options) {
      return this.childTemplate = options.childTemplate;
    };

    TableView.prototype.filterBy = function(fieldName, value) {
      this.filters[fieldName] = value;
      return this.collection.fetch();
    };

    TableView.prototype.childViewOptions = function(model, index) {
      return {
        template: this.childTemplate
      };
    };

    TableView.prototype.onCollectionSync = function(collection, resp, options) {
      var models,
        _this = this;
      models = collection.filter(function(item) {
        return !_this.filters.brand || _.reduce(_this.filters, function(result, value, key) {
          return result = item.get(key) === _this.filters[key];
        }, true);
      });
      this.collection.reset();
      this.collection.add(models);
      this.render();
      return this.sandbox.channel.trigger('onCollectionSync', this.collection);
    };

    return TableView;

  })(Marionette.CollectionView);
  insertControl = function(cell, controlType, controlBehavior, model) {};
  addControl = function(cell, model, controlType, controlLabel, controlBehavior) {
    var $button, behavior;
    switch (controlType) {
      case 'button':
        $button = $("<button />").text(controlLabel);
        behavior = controlBehavior(model, $button);
        if (behavior.prop != null) {
          behavior.prop();
        }
        return $(cell).append($button).click(behavior.click);
      case 'select':
        return insertControl(cell, 'select', controlBehavior, model);
    }
  };
  addCellBehavior = function(cell, cellBehavior) {
    return cellBehavior(cell);
  };
  return function(options) {
    var addCellBehaviorFacet, addControlsFacet, addFiltersFacet, createTableFactory, pluginInstance;
    createTableFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var tabsView;
        tabsView = new TableView({
          collection: options.collection,
          className: options.className,
          childTemplate: options.childTemplate
        });
        return resolver.resolve(tabsView);
      });
    };
    addFiltersFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(filters) {
        _.each(filters, function(filterArgs, filterName) {
          return facet.target.filters[filterName] = filterArgs;
        });
        return resolver.resolve(facet.target);
      });
    };
    addControlsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        facet.target.onRender = function() {
          return _.each(facet.target.getChildren(), function(child) {
            var cell, cells, e, id;
            cells = child.$el.find('td');
            id = options.cellId;
            try {
              return cell = _[id](cells);
            } catch (_error) {
              e = _error;
              return cell = cells[id];
            } finally {
              addControl(cell, child.model, options.controlType, options.controlLabel, options.controlBehavior);
            }
          });
        };
        return resolver.resolve(facet.target);
      });
    };
    addCellBehaviorFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        facet.target.onBeforeRender = function() {
          return _.each(facet.target.getChildren(), function(child) {
            var cell, cells, e, id;
            cells = child.$el.find('td');
            id = options.cellId;
            try {
              return cell = _[id](cells);
            } catch (_error) {
              e = _error;
              return cell = cells[id];
            } finally {
              addCellBehavior(cell, options.cellBehavior);
            }
          });
        };
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createTable: createTableFactory
      },
      facets: {
        addFilters: {
          'ready:after': addFiltersFacet
        },
        addControls: {
          'ready:after': addControlsFacet
        },
        addCellBehavior: {
          'ready:after': addCellBehaviorFacet
        }
      }
    };
    return pluginInstance;
  };
});
