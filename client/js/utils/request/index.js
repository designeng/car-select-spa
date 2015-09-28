define(["jquery"], function($) {
  var AjaxRequest;
  return AjaxRequest = (function() {
    function AjaxRequest(url, data, method, contentType, dataType, success) {
      var ajaxRequest, e;
      try {
        ajaxRequest = $.ajax({
          type: method,
          contentType: contentType || "application/json",
          url: url,
          data: data,
          dataType: dataType,
          success: success
        });
      } catch (_error) {
        e = _error;
        console.log("ajaxRequest error: ", e);
      }
      this.done = function() {
        return ajaxRequest.done;
      };
      this.fail = function() {
        return ajaxRequest.fail;
      };
      this.always = function() {
        return ajaxRequest.always;
      };
      return ajaxRequest;
    }

    return AjaxRequest;

  })();
});
