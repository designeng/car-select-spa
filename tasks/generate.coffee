Rwg = require "random-word-generator"
generator = new Rwg()

getRandomInt = (min, max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

capitalizeFirstLetter = (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)

module.exports = (grunt) ->
    grunt.registerTask "generate", "generate random text", (length) ->
        result = ""
        length = 100 unless length
        while (length--)
            cropRandLength = getRandomInt(0, 10)
            result += generator.generate().slice(cropRandLength) + " "
        console.log capitalizeFirstLetter(result)