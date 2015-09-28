define [
    "wire"
    "when"
    "backbone"
    "jasmine-jquery"
], (wire, When, Backbone) ->

    spec = 
        $plugins:[
            'wire/debug'
            'plugins/marionette/components/tabs'
        ]

        tabs:
            createTabs:
                labels:
                    "All items"         : "all"
                    "Selected items"    : "selected"
                className: 'navigation-tabs'

    describe "marionette components tabs plugin", ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "should be defined", (done) ->
            expect(@ctx.tabs).toBeDefined()
            done()

        it "should have collection", (done) ->
            expect(@ctx.tabs.collection).toBeDefined()
            done()

        it "with length = 2", (done) ->
            expect(@ctx.tabs.collection.length).toBe 2
            done()

        it "model should have fields 'label' and 'href'", (done) ->
            model0 = @ctx.tabs.collection.at(0)
            expect(model0.get 'label').toBe "All items"
            expect(model0.get 'href').toBe "#/all"
            done()

        it "when rendered should have: 1) li collection length 2) li with html 3) class", (done) ->
            @ctx.tabs.render()
            rootEl = @ctx.tabs.$el
            liCollection = rootEl.find('li')
            li0aTag = liCollection[0].getElementsByTagName('a')[0]

            expect(liCollection.length).toBe 2
            expect(li0aTag).toHaveAttr 'href', '#/all'
            expect(li0aTag).toHaveText 'All items'
            expect(rootEl).toHaveClass "navigation-tabs"

            done()