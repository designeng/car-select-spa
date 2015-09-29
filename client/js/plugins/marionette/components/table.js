var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['underscore', 'backbone', 'marionette', 'hbs!templates/tableRow'], function(_, Backbone, Marionette, tableRowTpl) {
  var TableRowView, TableView, _ref, _ref1;
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

    TableView.prototype.initialize = function(options) {
      return this.childTemplate = options.childTemplate;
    };

    TableView.prototype.filterBy = function(fieldName, value) {
      this[fieldName] = value;
      return this.collection.fetch();
    };

    TableView.prototype.childViewOptions = function(model, index) {
      return {
        template: this.childTemplate
      };
    };

    return TableView;

  })(Marionette.CollectionView);
  return function(options) {
    var createTableFactory, filtersFacet, pluginInstance;
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
    filtersFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(filters) {
        var expression;
        expression = _.map(filters, function(filterArgs, filterName) {
          return "item.get('" + filterName + "') == facet.target." + filterName;
        });
        expression = expression.join(" and ");
        facet.target.collection.on("sync", function(collection, resp, options) {
          collection.filter(function(item) {
            return eval(expression);
          });
          return facet.target.render();
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createTable: createTableFactory
      },
      facets: {
        addFilters: {
          'ready:after': filtersFacet
        }
      }
    };
    return pluginInstance;
  };
});
