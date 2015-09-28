var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "when", "backbone"], function(wire, When, Backbone) {
  var spec;
  define('plugins/apply/collection', function() {
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
            stage_id: "id0"
          }, {
            id: 1,
            stage_id: "id0"
          }, {
            id: 2,
            stage_id: "id1"
          }, {
            id: 3,
            stage_id: "id1"
          }, {
            id: 4,
            stage_id: "id2"
          }, {
            id: 5,
            stage_id: "id2"
          }, {
            id: 6,
            stage_id: "id2"
          }
        ]);
      };

      return Collection;

    })(Backbone.Collection);
  });
  define('boardBodySpec', {
    $plugins: ['wire/debug'],
    bodyView: {
      create: 'blocks/views/board/body/index',
      properties: {
        groups: {
          $ref: 'groups'
        },
        collection: {
          $ref: 'collection'
        }
      },
      ready: {
        render: {}
      }
    }
  });
  spec = {
    $plugins: ['wire/debug', 'plugins/backbone/collection/underscore/apply'],
    mapper: {
      module: 'utils/groups/mapper'
    },
    collection: {
      create: 'plugins/apply/collection'
    },
    groups: {
      applyTo: {
        collection: {
          $ref: 'collection'
        },
        methods: [
          {
            "groupBy": "stage_id"
          }, {
            "map": {
              $ref: 'mapper'
            }
          }
        ]
      }
    },
    boardBody: {
      wire: {
        spec: 'boardBodySpec',
        waitParent: true,
        provide: {
          groups: {
            $ref: 'groups'
          },
          collection: {
            $ref: 'collection'
          }
        }
      }
    }
  };
  return describe("apply plugin", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(spec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("should have 3 groups", function(done) {
      expect(_.size(this.ctx.groups)).toBe(3);
      return done();
    });
    it("group item.collection should be Backbone.Collection", function(done) {
      expect(_.find(this.ctx.groups, {
        id: "id0"
      }).collection instanceof Backbone.Collection).toBe(true);
      return done();
    });
    return it("group number 2 should have 3 elements", function(done) {
      expect(_.find(this.ctx.groups, {
        id: "id2"
      }).collection.length).toBe(3);
      return done();
    });
  });
});
