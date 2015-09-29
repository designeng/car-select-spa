var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'marionette', 'when'], function(_, Marionette, When) {
  var AppController, _ref;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController() {
      this.onRoute = __bind(this.onRoute, this);
      _ref = AppController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppController.prototype.currentRootFragment = null;

    AppController.prototype.showPreloader = function(preloader) {
      return this.regions.mainAreaRegion.show(preloader);
    };

    AppController.prototype.switchOn = function(modules) {
      var _this = this;
      return _.each(modules, function(options, module) {
        return _this.startModule(module);
      });
    };

    AppController.prototype.listenToModules = function() {
      var _this = this;
      this.container.channel.on('list:ready', function(module, list) {
        return _this.container.broadcastEvent('list:ready', list);
      });
      return this.container.channel.on('details:ready', function(module, details) {
        return _this.container.broadcastEvent('details:ready', details);
      });
    };

    AppController.prototype.onRoute = function(name, path, opts) {
      this.rootFragmentMutation(path.split('/')[0]);
      if (path !== '*notFound') {
        return this.notFoundPageLayer.hide();
      }
    };

    AppController.prototype.rootFragmentMutation = function(rootFragment) {
      if (this.currentRootFragment !== rootFragment) {
        this.container.stopModule(this.currentRootFragment);
        return this.currentRootFragment = rootFragment;
      }
    };

    AppController.prototype.carsModuleHandler = function(brand, id) {
      if ((brand != null) && _.indexOf(['volvo', 'ford', 'mitsubishi', 'nissan'], brand) === -1) {
        console.debug("Unknown brand");
      }
      if (!brand && !id) {
        this.filterByBrand('cars', null);
      }
      if (brand && !id) {
        this.filterByBrand('cars', brand);
      }
      if (brand && id) {
        this.emphasizeEntity('cars', brand, id);
      }
      return this.switchTableState('cars', 'selection-state');
    };

    AppController.prototype.selectedCarsHandler = function() {
      return this.switchTableState('cars', 'elected-state');
    };

    AppController.prototype.statisticModuleHandler = function() {
      return this.startModule('statistic');
    };

    AppController.prototype.notFoundHandler = function() {
      return this.notFoundPageLayer.show();
    };

    AppController.prototype.startModule = function(sandbox) {};

    AppController.prototype.filterByBrand = function(sandbox, args) {
      return sandbox.filterByBrand(args[0]);
    };

    AppController.prototype.emphasizeEntity = function(sandbox, args) {
      return console.debug('brand, id:::::', args[0], args[1]);
    };

    AppController.prototype.switchTableState = function(sandbox, args) {
      return console.debug('switchTableState', sandbox, args);
    };

    return AppController;

  })(Marionette.Object);
});
