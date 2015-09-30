var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "when", "backbone"], function(wire, When, Backbone) {
  var collectionWithStoredSourceName, spec, storageName, stored;
  collectionWithStoredSourceName = 'from_source';
  storageName = 'selected_items';
  stored = function() {
    return localStorage.getItem(storageName);
  };
  define('plugins/localstorage/collection', function() {
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
    $plugins: ['wire/debug', 'plugins/backbone/collection/create'],
    collectionWithStoredSource: {
      createCollection: {
        fromStorage: collectionWithStoredSourceName
      },
      storeIn: {
        name: collectionWithStoredSourceName
      }
    },
    collection: {
      create: 'plugins/localstorage/collection',
      storeIn: {
        name: storageName
      }
    }
  };
  return describe("collection localstorage plugin", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(spec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("should get source from localstorage if exists", function(done) {
      var source;
      source = JSON.stringify([
        {
          id: 0,
          name: "Ford"
        }, {
          id: 1,
          name: "Nissan"
        }, {
          id: 2,
          name: "Mitsubishi"
        }
      ]);
      localStorage.setItem(collectionWithStoredSourceName, source);
      expect(this.ctx.collectionWithStoredSource.length).toBe(3);
      expect(this.ctx.collectionWithStoredSource.at(0).get('name')).toBe('Ford');
      return done();
    });
    it("should synchronize with localstorage on add event", function(done) {
      this.ctx.collection.add({
        id: 5,
        name: "Ford",
        description: "description5"
      });
      expect(JSON.parse(stored()).length).toBe(6);
      return done();
    });
    it("should synchronize with localstorage on remove event", function(done) {
      this.ctx.collection.pop();
      expect(JSON.parse(stored()).length).toBe(4);
      return done();
    });
    return it("should be blank array after reset", function(done) {
      this.ctx.collection.reset();
      expect(stored()).toBe("[]");
      return done();
    });
  });
});
