var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['wire', 'when', 'backbone', 'jasmine-jquery'], function(wire, When, Backbone) {
  var spec;
  define('plugins/marionette/components/table/collection', function() {
    var Collection, _ref;
    return Collection = (function(_super) {
      __extends(Collection, _super);

      function Collection() {
        _ref = Collection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Collection.prototype.initialize = function() {
        return this.add([
          {
            id: 0,
            name: "Volvo S60",
            description: "description0"
          }, {
            id: 1,
            name: "Volvo S90",
            description: "description1"
          }, {
            id: 2,
            name: "Mitsubishi Pajero",
            description: "description2"
          }, {
            id: 3,
            name: "Nissan Micra",
            description: "description3"
          }, {
            id: 4,
            name: "Nissan Terrano",
            description: "description4"
          }
        ]);
      };

      return Collection;

    })(Backbone.Collection);
  });
  spec = {
    $plugins: ['wire/debug', 'plugins/hbs', 'plugins/extend', 'plugins/marionette/components/table'],
    collection: {
      create: 'plugins/marionette/components/table/collection'
    },
    table: {
      createTable: {
        collection: {
          $ref: 'collection'
        },
        className: 'cars-table',
        childTemplate: {
          $ref: 'hbs!templates/tableRow'
        }
      },
      extend: {
        getRowsCount: function() {
          return this.$el.find('tr').length;
        }
      }
    }
  };
  return describe('marionette components table plugin', function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(spec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log('ERROR', err);
      });
    });
    it('should be defined', function(done) {
      expect(this.ctx.table).toBeDefined();
      return done();
    });
    return it('should accept child template', function(done) {
      this.ctx.table.render();
      expect(this.ctx.table.getRowsCount()).toBe(5);
      return done();
    });
  });
});
