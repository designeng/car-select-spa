define [
    "jquery"
], ($) ->

    class AjaxRequest

        constructor: (url, data, method, contentType, dataType, success) ->

            try
                ajaxRequest = $.ajax({
                    type: method
                    contentType: contentType || "application/json"
                    url: url
                    data: data
                    dataType: dataType
                    success: success
                })
            catch e
                console.log "ajaxRequest error: ", e

            @done = ->
                return ajaxRequest.done

            @fail = ->
                return ajaxRequest.fail

            @always = ->
                return ajaxRequest.always

            return ajaxRequest