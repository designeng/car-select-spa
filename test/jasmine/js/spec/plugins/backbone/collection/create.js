define(["wire", "when", "backbone"], function(wire, When, Backbone) {
  var spec;
  spec = {
    $plugins: ['wire/debug', 'plugins/backbone/collection/create'],
    arrayForCollection: [
      {
        id: 0,
        name: "name0"
      }, {
        id: 1,
        name: "name1"
      }, {
        id: 2,
        name: "name2"
      }, {
        id: 3,
        name: "name3"
      }, {
        id: 4,
        name: "name4"
      }
    ],
    collection: {
      createCollection: {
        $ref: 'arrayForCollection'
      }
    }
  };
  return describe("backbone collection create plugin", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(spec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    return it("should have length after creation", function(done) {
      expect(this.ctx.collection.length).toBe(5);
      return done();
    });
  });
});
