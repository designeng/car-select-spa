define [
    'jquery'
], ($) ->
    imageCellBehavior = (cell) ->
        console.debug "CELL", $(cell).find('img')
        $(cell).find('img').on 'click', (event) ->
            alert 1
            # console.debug "CELL OVER", @, event.target
