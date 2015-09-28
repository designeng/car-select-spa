define [
    "wire"
    "when"
    "backbone.radio"
], (wire, When, Radio) ->

    sandboxDeferred = When.defer()

    startModuleSpy = jasmine.createSpy("startModuleSpy")

    define 'test/plugins/register/modules/moduleOne/controller', ->
        class ModuleOneController

            sendMessage: (message) =>

    define 'test/plugins/register/modules/moduleOne',
        $plugins: [
            'wire/debug'
        ]

        publicApi:
            literal:
                sendMessage: {$ref: 'controller.sendMessage'}

        controller:
            create: 'test/plugins/register/modules/moduleOne/controller'
            properties:
                sandbox: {$ref: 'sandbox'}

    define 'test/plugins/register/core/controller', ->
        class CoreController

            startModule: (sandbox, args) ->
                startModuleSpy(args[0])
                sandboxDeferred.resolve(sandbox)

    # CORE SPEC
    sandboxCoreSpec = 
        $plugins: [
            'wire/debug'
            'plugins/container/register'
        ]

        appController:
            create: "test/plugins/register/core/controller"
            properties:
                moduleOne: {$ref: 'moduleOne'}
            registerIntercessors: ['startModule']

        # options.defer is true, so this module will be wired only after invocation: moduleOne()
        # but it's wrapped into 'plugins/container/register' plugin.
        moduleOne:
            wire:
                spec: 'test/plugins/register/modules/moduleOne'
                defer: true

    # /CORE SPEC

    describe "register plugin", ->

        beforeEach (done) ->
            wire(sandboxCoreSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "intercessor should interact directly with module sandbox", (done) ->
            @ctx.appController.startModule "moduleOne", "some_arg"
            When(sandboxDeferred.promise).then () =>
                expect(startModuleSpy).toHaveBeenCalledWith "some_arg"
                done()

        it "sandbox should be an object with channel property", (done) ->
            @ctx.appController.startModule "moduleOne"
            When(sandboxDeferred.promise).then (sandbox) =>
                expect(sandbox).toBeObject()
                expect(sandbox.channel).toBeObject()
                done()
