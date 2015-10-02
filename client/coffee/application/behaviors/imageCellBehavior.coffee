define [
    'jquery'
], ($) ->
    imageCellBehavior = (cell) ->
        $(cell).find('img').on 'mouseover', (event) ->
