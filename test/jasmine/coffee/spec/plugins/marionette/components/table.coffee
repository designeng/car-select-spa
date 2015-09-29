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
            addControls:
                cellId: 'last'
                controlType: 'button'
            extend:
                getRowsCount: ->
                    @$el.find('tr').length
                getLastCell: ->
                    _.last @$el.find('tr')[0].getElementsByTagName('td')

    describe 'marionette components table plugin', ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log 'ERROR', err

        it 'should be defined', (done) ->
            expect(@ctx.table).toBeDefined()
            done()

        it 'should have 5 rows', (done) ->
            @ctx.table.render()
            expect(@ctx.table.getRowsCount()).toBe 5
            done()

        it 'should have the button in last cell in row', (done) ->
            @ctx.table.render()
            expect(@ctx.table.getLastCell()).toContainElement 'button'
            done()