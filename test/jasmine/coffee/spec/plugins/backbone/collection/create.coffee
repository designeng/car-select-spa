define [
    "wire"
    "backbone"
], (wire, Backbone) ->

    spec = 
        $plugins:[
            'wire/debug'
            'plugins/backbone/collection/create'
        ]

        arrayForCollection: [
                {id: 0, name: "name0"}
                {id: 1, name: "name1"}
                {id: 2, name: "name2"}
                {id: 3, name: "name3"}
                {id: 4, name: "name4"}
            ]

        collection:
            createCollection: {$ref: 'arrayForCollection'}

    describe "backbone collection create plugin", ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "should have length after creation", (done) ->
            expect(@ctx.collection.length).toBe 5
            done()