var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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
      _ref1 = TableView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    TableView.prototype.tagName = 'tbody';

    TableView.prototype.className = '';

    TableView.prototype.childView = TableRowView;

    TableView.prototype.initialize = function(options) {
      return this.childTemplate = options.childTemplate;
    };

    TableView.prototype.childViewOptions = function(model, index) {
      return {
        template: this.childTemplate
      };
    };

    return TableView;

  })(Marionette.CollectionView);
  return function(options) {
    var createTableFactory, pluginInstance;
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
    pluginInstance = {
      factories: {
        createTable: createTableFactory
      }
    };
    return pluginInstance;
  };
});