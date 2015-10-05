var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["wire", "when"], function(wire, When) {
  var sandboxCoreSpec, sandboxDeferred, startModuleSpy;
  sandboxDeferred = When.defer();
  startModuleSpy = jasmine.createSpy("startModuleSpy");
  define('test/plugins/register/modules/moduleOne/controller', function() {
    var ModuleOneController;
    return ModuleOneController = (function() {
      function ModuleOneController() {
        this.sendMessage = __bind(this.sendMessage, this);
      }

      ModuleOneController.prototype.sendMessage = function(message) {};

      return ModuleOneController;

    })();
  });
  define('test/plugins/register/modules/moduleOne', {
    $plugins: ['wire/debug'],
    publicApi: {
      literal: {
        sendMessage: {
          $ref: 'controller.sendMessage'
        }
      }
    },
    controller: {
      create: 'test/plugins/register/modules/moduleOne/controller',
      properties: {
        sandbox: {
          $ref: 'sandbox'
        }
      }
    }
  });
  define('test/plugins/register/core/controller', function() {
    var AppController;
    return AppController = (function() {
      function AppController() {}

      AppController.prototype.startModule = function(sandbox, args) {
        startModuleSpy(args[0]);
        return sandboxDeferred.resolve(sandbox);
      };

      return AppController;

    })();
  });
  sandboxCoreSpec = {
    $plugins: ['wire/debug', 'plugins/container/register'],
    appController: {
      create: "test/plugins/register/core/controller",
      properties: {
        moduleOne: {
          $ref: 'moduleOne'
        }
      },
      registerIntercessors: ['startModule']
    },
    moduleOne: {
      wire: {
        spec: 'test/plugins/register/modules/moduleOne',
        defer: true
      }
    }
  };
  return describe("register plugin", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(sandboxCoreSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("intercessor should interact directly with module sandbox", function(done) {
      var env,
        _this = this;
      env = {};
      this.ctx.appController.startModule("moduleOne", env, "some_arg");
      return When(sandboxDeferred.promise).then(function() {
        expect(startModuleSpy).toHaveBeenCalledWith("some_arg");
        return done();
      });
    });
    return it("sandbox should be an object with channel property", function(done) {
      var _this = this;
      this.ctx.appController.startModule("moduleOne");
      return When(sandboxDeferred.promise).then(function(sandbox) {
        expect(sandbox).toBeObject();
        expect(sandbox.channel).toBeObject();
        return done();
      });
    });
  });
});
