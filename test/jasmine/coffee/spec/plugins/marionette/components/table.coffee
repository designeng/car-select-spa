define [
    'wire'
    'when'
    'backbone'
    'jasmine-jquery'
], (wire, When, Backbone) ->

    define 'plugins/marionette/components/table/collection', () ->
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
            'plugins/hbs'
            'plugins/extend'
            'plugins/marionette/components/table'
        ]

        collection:
            create: 'plugins/marionette/components/table/collection'

        table:
            createTable:
                collection: {$ref: 'collection'}
                className: 'cars-table'
                childTemplate: {$ref: 'hbs!templates/tableRow'}
            extend:
                getRowsCount: ->
                    @$el.find('tr').length

    describe 'marionette components table plugin', ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log 'ERROR', err

        it 'should be defined', (done) ->
            expect(@ctx.table).toBeDefined()
            done()

        it 'should accept child template', (done) ->
            @ctx.table.render()
            expect(@ctx.table.getRowsCount()).toBe 5
            done()