define [
    "wire"
    "when"
    "backbone"
], (wire, When, Backbone) ->

    define 'plugins/apply/collection', () ->
        class Collection extends Backbone.Collection
            initialize: ->
                @.add [
                    {id: 0, stage_id: "id0"}
                    {id: 1, stage_id: "id0"}
                    {id: 2, stage_id: "id1"}
                    {id: 3, stage_id: "id1"}
                    {id: 4, stage_id: "id2"}
                    {id: 5, stage_id: "id2"}
                    {id: 6, stage_id: "id2"}
                ]

    define 'boardBodySpec',
        $plugins:[
            'wire/debug'
        ]

        bodyView:
            create: 'blocks/views/board/body/index'
            properties:
                groups: {$ref: 'groups'}
                collection      : {$ref: 'collection'}
            ready:
                render: {}

    spec = 
        $plugins:[
            'wire/debug'
            'plugins/backbone/collection/underscore/apply'
        ]

        mapper:
            module: 'utils/groups/mapper'

        collection:
            create: 'plugins/apply/collection'

        groups:
            applyTo:
                collection: {$ref: 'collection'}
                methods: [
                    {"groupBy": "stage_id"}
                    {"map": {$ref: 'mapper'}}
                ]

        boardBody:
            wire:
                spec: 'boardBodySpec'
                waitParent: true
                provide:
                    groups: {$ref: 'groups'}
                    collection: {$ref: 'collection'}

    describe "apply plugin", ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "should have 3 groups", (done) ->
            expect(_.size(@ctx.groups)).toBe 3
            done()

        it "group item.collection should be Backbone.Collection", (done) ->
            expect(_.find(@ctx.groups, {id: "id0"}).collection instanceof Backbone.Collection).toBe true
            done()

        it "group number 2 should have 3 elements", (done) ->
            expect(_.find(@ctx.groups, {id: "id2"}).collection.length).toBe 3
            done()