define [
    'jquery'
], ($) ->
    imageCellBehavior = (cell, model) ->
        $(cell).find('img').on 'mouseover', (event) ->
            console.debug "over", model.get 'id'
