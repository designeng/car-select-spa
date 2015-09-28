require.config({
  baseUrl: "/js",
  paths: {
    "text": "lib/text",
    "highlight": "lib/highlight/highlight",
    "coffeescript": "lib/highlight/languages/coffeescript"
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
      name: "moment",
      main: "moment",
      location: "vendors/moment"
    }, {
      name: "showdown",
      main: "showdown.min",
      location: "vendors/showdown/dist"
    }, {
      name: "json",
      main: "json",
      location: "vendors/requirejs-json"
    }
  ],
  shim: {
    "highlight": {
      exports: "highlight"
    }
  },
  hbs: {
    templateExtension: ".html"
  }
});
