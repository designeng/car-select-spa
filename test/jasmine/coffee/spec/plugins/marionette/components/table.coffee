define [
    'wire'
    'when'
    'backbone'
    'jasmine-jquery'
], (wire, When, Backbone) ->

    buttonControlBehaviorSpy = jasmine.createSpy 'buttonControlBehaviorSpy'

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

    define '/controls/button/behavior', ->
        buttonControlBehavior = ->
            return {
                click: buttonControlBehaviorSpy
                prop: ->
            }

    spec = 
        $plugins:[
            'wire/debug'
            'plugins/hbs'
            'plugins/extend'
            'plugins/marionette/components/table'
        ]

        collection:
            create: 'plugins/marionette/components/table/collection'

        buttonControlBehavior:
            module: '/controls/button/behavior'

        table:
            createTable:
                collection: {$ref: 'collection'}
                className: 'cars-table'
                childTemplate: {$ref: 'hbs!templates/tableRow'}
            addBehaviors:
                'button-behavior':
                    cellId: 'last'
                    controlType: 'button'
                    controlBehavior: {$ref: 'buttonControlBehavior'}
            extend:
                getRowsCount: ->
                    @$el.find('tr').length
                getLastCell: ->
                    _.last @$el.find('tr')[0].getElementsByTagName('td')
                getButton: ->
                    _.last(@$el.find('tr')[0].getElementsByTagName('td')).getElementsByTagName('button')[0]

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

        it 'button control behavior function should be invoked on click', (done) ->
            @ctx.table.render()
            @ctx.table.getButton().click()
            expect(buttonControlBehaviorSpy).toHaveBeenCalled()
            done()