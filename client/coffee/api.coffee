define ->

    prefix = "http://localhost:7788/api/v1/"

    api =
        getCarsCollectionUrl: ->
            return "#{prefix}cars"