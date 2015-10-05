require.config({
  baseUrl: "/js",
  paths: {
    "text": "lib/text"
  },
  packages: [
    {
      name: "backbone",
      main: "backbone",
      location: "vendors/backbone"
    }, {
      name: "backbone.radio",
      main: "backbone.radio",
      location: "vendors/backbone.radio/build"
    }, {
      name: "marionette",
      main: "backbone.marionette",
      location: "vendors/marionette/lib"
    }, {
      name: "underscore",
      main: "underscore",
      location: "vendors/underscore"
    }, {
      name: "jquery",
      main: "jquery",
      location: "vendors/jquery/dist"
    }, {
      name: "handlebars",
      main: "handlebars",
      location: "vendors/handlebars"
    }, {
      name: "hbs",
      main: "hbs",
      location: "vendors/requirejs-hbs"
    }, {
      name: "wire",
      main: "wire",
      location: "vendors/wire"
    }, {
      name: "when",
      main: "when",
      location: "vendors/when"
    }, {
      name: "meld",
      main: "meld",
      location: "vendors/meld"
    }, {
      name: "json",
      main: "json",
      location: "vendors/requirejs-json"
    }, {
      name: "highcharts",
      main: "highcharts",
      location: "vendors/highcharts"
    }
  ],
  hbs: {
    templateExtension: ".html"
  }
});

requirejs.s.contexts._.config.baseUrl = "/client/js/";

requirejs.s.contexts._.config.paths["jasmine"] = '/test/jasmine/js/lib/jasmine-2.0.0/jasmine';

requirejs.s.contexts._.config.paths["jasmine-html"] = '/test/jasmine/js/lib/jasmine-2.0.0/jasmine-html';

requirejs.s.contexts._.config.paths["jasmine-jquery"] = '/test/jasmine/js/lib/jasmine-jquery';

requirejs.s.contexts._.config.paths["boot"] = '/test/jasmine/js/lib/jasmine-2.0.0/boot';

requirejs.s.contexts._.config.shim["jasmine"] = {
  exports: "jasmine"
};

requirejs.s.contexts._.config.shim["jasmine-html"] = {
  deps: ['jasmine'],
  exports: 'jasmine'
};

requirejs.s.contexts._.config.shim["jasmine-jquery"] = {
  deps: ['jasmine', 'jquery'],
  exports: 'jasmine-jquery'
};

requirejs.s.contexts._.config.shim["boot"] = {
  deps: ['jasmine', 'jasmine-html'],
  exports: 'jasmine'
};

require(["boot", "underscore", "js/SpecIndex.js", "/test/jasmine/js/common/beforeEach.js"], function(boot, _, indexSpecs) {
  var extention, pathToSpec, specs;
  pathToSpec = "/test/jasmine/js/spec/";
  extention = ".js";
  specs = _.map(indexSpecs, function(spec) {
    return spec = pathToSpec + spec + extention;
  });
  return require(specs, function(specs) {
    return window.onload();
  });
});
