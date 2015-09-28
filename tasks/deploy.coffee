When = require("when")
exec = require("child_process").exec

runBushCommands = (command) ->
    deferred = When.defer()
    exec command, (err) ->
        if err
            console.log "ERROR: ", err
            deferred.reject(err)
        else
            deferred.resolve()
    return deferred.promise

module.exports = (grunt) ->
    grunt.registerTask "deployToRemote", "deploy to remote origin", (branch) ->
        done = @async()
        date = new Date()

        bashCommands = [
            "git checkout master"
            "git merge dev"
            "grunt build"
            "git add ."
            "git commit -m 'build #{date}'"
            "git push origin #{branch}"
        ]

        runBushCommands(bashCommands.join(' && ')).done =>
            done()