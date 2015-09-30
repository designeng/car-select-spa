var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['underscore', 'backbone', 'marionette', 'hbs!templates/tableRow'], function(_, Backbone, Marionette, tableRowTpl) {
  var TableRowView, TableView, addControl, insertControl, _ref, _ref1;
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

    TableView.prototype.tagName = 'tbody';

    TableView.prototype.className = '';

    TableView.prototype.childView = TableRowView;

    TableView.prototype.filters = {};

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

    return TableView;

  })(Marionette.CollectionView);
  insertControl = function(cell, controlType, controlBehavior) {};
  addControl = function(cell, controlType, controlLabel, controlBehavior) {
    var $button;
    switch (controlType) {
      case 'button':
        $button = $('<button />').text(controlLabel);
        return $(cell).append($button).on('click', controlBehavior);
      case 'select':
        return insertControl(cell, 'select', controlBehavior);
    }
  };
  return function(options) {
    var addControlsFacet, addFiltersFacet, createTableFactory, pluginInstance;
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
        var expression;
        expression = _.map(filters, function(filterArgs, filterName) {
          return "!facet.target.filters." + filterName + " || item.get('" + filterName + "') == facet.target.filters." + filterName;
        });
        expression = expression.join(" and ");
        facet.target.collection.on("sync", function(collection, resp, options) {
          var models;
          models = collection.filter(function(item) {
            return eval(expression);
          });
          facet.target.collection.reset();
          facet.target.collection.add(models);
          return facet.target.render();
        });
        return resolver.resolve(facet.target);
      });
    };
    addControlsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        facet.target.onRender = function() {
          return _.each(facet.target.$el.find('tr'), function(tr) {
            var cell, cells, e, id;
            cells = tr.getElementsByTagName('td');
            id = options.cellId;
            try {
              return cell = _[id](cells);
            } catch (_error) {
              e = _error;
              return cell = cells[id];
            } finally {
              addControl(cell, options.controlType, options.controlLabel, options.controlBehavior);
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
        }
      }
    };
    return pluginInstance;
  };
});
