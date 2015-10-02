define [
    'jquery'
], ($) ->
    imageCellBehavior = (cell, model) ->
        $(cell).find('img').on 'mouseover', (event) ->
            $(event.target).next().show()
        $(cell).find('img').on 'mouseout', (event) ->
            $(event.target).next().hide()
