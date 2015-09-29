define [
    "wire"
    "when"
    "backbone"
], (wire, When, Backbone) ->

    storageName = 'selected_items'

    stored = ->
        localStorage.getItem(storageName)

    define 'plugins/localstorage/collection', () ->
        class Collection extends Backbone.Collection
            initialize: ->
                @.add [
                    {id: 0, name: "Volvo S60"           , description: "description0"}
                    {id: 1, name: "Volvo S90"           , description: "description1"}
                    {id: 2, name: "Mitsubishi Pajero"   , description: "description2"}
                    {id: 3, name: "Nissan Micra"        , description: "description3"}
                    {id: 4, name: "Nissan Terrano"      , description: "description4"}
                ]

    spec = 
        $plugins:[
            'wire/debug'
            'plugins/localstorage'
        ]

        collection:
            create: 'plugins/localstorage/collection'
            storage:
                name: storageName

    describe "collection localstorage plugin", ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "should synchronize with localstorage on add event", (done) ->
            @ctx.collection.add {id: 5, name: "Ford", description: "description5"}
            expect(JSON.parse(stored()).length).toBe 6
            done()

        it "should synchronize with localstorage on remove event", (done) ->
            @ctx.collection.pop()
            expect(JSON.parse(stored()).length).toBe 4
            done()

        it "should be blank array after reset", (done) ->
            @ctx.collection.reset()
            expect(stored()).toBe "[]"
            done()