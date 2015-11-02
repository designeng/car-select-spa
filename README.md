###Single-page application "Car-select-spa"

+ Single-page application is built on the top of Wire.js, Marionette.js `2.4.3v`, Backbone.js. For statistic chart rendering used [Highcharts](http://www.highcharts.com/).

###Demo
http://designeng.github.io/car-select/#/cars

###Development
+ After dependencies instalation (`npm install`, `bower install`), run `grunt` and open `http://localhost:7788/#/cars` (additional instructions for [grunt-cli](http://gruntjs.com/getting-started)).

+ Tests available here: `http://localhost:8888/test/jasmine/`

+ To interact with connect.js service `http://localhost:7788/api/v1/cars`, method [Backbone.ajax](https://github.com/designeng/car-select-spa/blob/master/client/coffee/bootstrap/hooks.coffee#L11-L15) should be removed.

###Checked in browsers
Chrome (v45), Safari (v7.0), Firefox (v41).