var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'marionette'], function(_, Marionette) {
  var AppController, _ref;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController() {
      this.onRoute = __bind(this.onRoute, this);
      _ref = AppController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppController.prototype.currentRootFragment = null;

    AppController.prototype.onRoute = function(name, path, opts) {
      if (path !== '*notFound') {
        return this.notFoundPageLayer.hide();
      }
    };

    AppController.prototype.rootFragmentMutation = function() {
      var rootFragment;
      rootFragment = window.location.hash.split('/')[1];
      if (this.currentRootFragment !== rootFragment) {
        this.container.stopModules(['table', 'statistic']);
        return this.currentRootFragment = rootFragment;
      }
    };

    AppController.prototype.carsModuleHandler = function(brand) {
      var environment;
      this.configure('navigation', {}, {
        brandTabs: true,
        counter: false
      });
      this.rootFragmentMutation();
      if ((brand != null) && _.indexOf(['volvo', 'ford', 'mitsubishi', 'nissan'], brand) === -1) {
        console.debug('Unknown brand');
        return;
      }
      environment = {
        collection: {
          $ref: 'carsCollection'
        },
        behavior: {
          $ref: 'addItemBehavior'
        },
        controlLabel: 'select'
      };
      return this.filterBy('table', environment, 'brand', brand);
    };

    AppController.prototype.selectedCarsHandler = function() {
      var environment;
      this.configure('navigation', {}, {
        brandTabs: false,
        counter: true
      });
      this.rootFragmentMutation();
      environment = {
        collection: {
          $ref: 'selectedCarsCollection'
        },
        behavior: {
          $ref: 'removeItemBehavior'
        },
        controlLabel: 'remove'
      };
      return this.startModule('table', environment);
    };

    AppController.prototype.statisticModuleHandler = function() {
      this.configure('navigation', {}, {
        brandTabs: false,
        counter: false
      });
      this.rootFragmentMutation();
      return this.startModule('statistic');
    };

    AppController.prototype.notFoundHandler = function() {
      this.configure('navigation', {}, {
        brandTabs: false,
        counter: false
      });
      return this.notFoundPageLayer.show();
    };

    AppController.prototype.startModule = function(sandbox) {};

    AppController.prototype.configure = function(sandbox, args) {
      return sandbox.configureLayout(args[0]);
    };

    AppController.prototype.filterBy = function(sandbox, args) {
      return sandbox.filterBy(args[0], args[1]);
    };

    return AppController;

  })(Marionette.Object);
});
