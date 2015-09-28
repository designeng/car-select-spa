define(["underscore", "when", "jasmine", "boot"], function(_, When) {
  return beforeEach(function() {
    return jasmine.addMatchers({
      toBeString: function() {
        return {
          compare: function(actual) {
            return {
              pass: _.isString(actual)
            };
          }
        };
      },
      toBeObject: function() {
        return {
          compare: function(actual) {
            return {
              pass: _.isObject(actual)
            };
          }
        };
      },
      toBeFunction: function() {
        return {
          compare: function(actual) {
            return {
              pass: _.isFunction(actual)
            };
          }
        };
      },
      toBeArray: function() {
        return {
          compare: function(actual) {
            return {
              pass: _.isArray(actual)
            };
          }
        };
      },
      toBeInArray: function(array) {
        return {
          compare: function(actual) {
            return {
              pass: _.indexOf(array, actual)
            };
          }
        };
      },
      toHaveLength: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: actual.length === expected
            };
          }
        };
      },
      toBePromise: function() {
        return {
          compare: function(actual) {
            return {
              pass: When.isPromiseLike(actual)
            };
          }
        };
      }
    });
  });
});
