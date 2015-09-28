define [
    "wire"
    "when"
], (wire, When) ->

    define 'behaviorController', () ->
        class behaviorController
            constructor: ->

    # spec
    behaviorSpec = 
        $plugins:[
            "wire/debug"
        ]

        controller:
            create: "behaviorController"

        list:
            create: "blocks/views/list/index"

    describe "profiles module", ->

        beforeEach (done) ->
            wire(behaviorSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "profiles controller exists", (done) ->
            expect(@ctx.controller).toBeDefined()
            done()

        it "profiles list exists", (done) ->
            expect(@ctx.list).toBeDefined()
            done()