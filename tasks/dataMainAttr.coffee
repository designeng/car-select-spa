module.exports = (grunt) ->

    grunt.registerMultiTask "dataMainAttr", "changes data-main attribute in index.html", (env) ->
        done = @async()
        grunt.log.write "Start rewriting index.html data-main attribute..."
        content = grunt.file.read @.data.indexPath, {encoding: "utf-8"}
        content = content.replace @.data.from, @.data.to
        grunt.file.write @.data.indexPath, content
        grunt.log.write "Done"
        done()