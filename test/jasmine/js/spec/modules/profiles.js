define(["wire", "when"], function(wire, When) {
  var behaviorSpec;
  define('behaviorController', function() {
    var behaviorController;
    return behaviorController = (function() {
      function behaviorController() {}

      return behaviorController;

    })();
  });
  behaviorSpec = {
    $plugins: ["wire/debug"],
    controller: {
      create: "behaviorController"
    },
    list: {
      create: "blocks/views/list/index"
    }
  };
  return describe("profiles module", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(behaviorSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("profiles controller exists", function(done) {
      expect(this.ctx.controller).toBeDefined();
      return done();
    });
    return it("profiles list exists", function(done) {
      expect(this.ctx.list).toBeDefined();
      return done();
    });
  });
});
