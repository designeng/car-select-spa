connectMW = require(require("path").resolve("middleware", "connectMW.coffee"))

module.exports = (grunt) ->

    appPort = 7788
    jasminePort = 8888

    indexPath = "client/index.html"
  
    grunt.initConfig
        
        watch:
            coffee_app:
                files: ['client/coffee/**/**.coffee']
                tasks: ["coffee-compile-app"]
            coffee_jasmine:
                files: ['test/jasmine/coffee/**/**.coffee', 'test/jasmine/coffee/SpecRunner.coffee']
                tasks: ["coffee-compile-jasmine"]
            js_requireConfig:
                files: ["client/js/requireConfig.js", "client/js/requireEnter.js"]
                tasks: ["concat:main"]
            js_jasmine_requireConfig:
                files: ["client/js/requireConfig.js", "test/jasmine/js/SpecRunner.js"]
                tasks: ["concat:jasmine"]
            js:
                files: ["client/js/**/**.js", "test/jasmine/js/**/**.js"]
                options:
                    livereload: true
            css:
                files: ["client/assets/styles.css"]
                options:
                    livereload: true
            html:
                files: ["client/js/templates/**.html"]
                options:
                    livereload: true

        coffee:
            app:
                options: {
                    bare: true
                }
                files: [
                    expand: true
                    cwd: 'client/coffee'
                    src: ['**/*.coffee']
                    dest: 'client/js'
                    ext: '.js'
                ]
            jasmine:
                options: {
                    bare: true
                }
                files: [
                    expand: true
                    cwd: 'test/jasmine/coffee'
                    src: ['**/*.coffee']
                    dest: 'test/jasmine/js'
                    ext: '.js'
                ]

        connect:
            app:
                options:
                    port: appPort
                    base: './client'
                    middleware: (connect, options) ->
                        return [
                            connectMW.stubService
                            connectMW.folderMount(connect, options.base)
                        ]
            jasmine:
                options:
                    port: jasminePort
                    base: '.'
                    middleware: (connect, options) ->
                        return [
                            connectMW.folderMount(connect, options.base)
                        ]

        concat:
            main:
                src: ["client/js/requireConfig.js", "client/js/requireEnter.js"]
                dest: "client/js/main.js"
            jasmine:
                src: ["client/js/requireConfig.js", "test/jasmine/js/SpecRunner.js"]
                dest: "test/jasmine/js/main.js"

        requirejs:
            compile:
                options:
                    baseUrl: "client/js/"
                    mainConfigFile: "client/js/requireConfig.js"
                    name: "main"
                    out: "client/build/main.js"
                    optimize: "none"
                    paths:
                        "wire/builder/rjs": "lib/builder"

        dataMainAttr:
            dev:
                from: /build\/main/g
                to: "js/main"
                indexPath: indexPath
            prod:
                from: /js\/main/g
                to: "build/main"
                indexPath: indexPath

    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks "grunt-contrib-concat"
    grunt.loadNpmTasks "grunt-contrib-requirejs"
    grunt.loadNpmTasks "grunt-newer"

    # ["dataMainAttr"] tasks
    grunt.loadTasks "tasks"

    grunt.registerTask "default", ["dataMainAttr:dev", "connect:app", "connect:jasmine", "watch"]

    grunt.registerTask "build", ["dataMainAttr:prod", "requirejs:compile"]
    grunt.registerTask "server", ["connect:app", "watch"]
    grunt.registerTask "deploy", ["deployToRemote:master"]

    # compilation
    grunt.registerTask "coffee-compile-app", ["newer:coffee:app"]
    grunt.registerTask "coffee-compile-jasmine", ["newer:coffee:jasmine"]