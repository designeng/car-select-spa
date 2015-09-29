define(['jquery'], function($) {
  var buttonControlBehavior;
  return buttonControlBehavior = function(event) {
    return console.debug("event.target", event.target, window.location.hash);
  };
});
