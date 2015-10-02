path = require "path"
grunt = require "grunt"
_ = require "underscore"

Rwg = require "random-word-generator"
generator = new Rwg()

generateRandomText = (length) ->
    result = ""
    length = 100 unless length
    while (length--)
        cropRandLength = getRandomInt(0, 10)
        result += generator.generate().slice(cropRandLength) + " "
    return capitalizeFirstLetter(result)

getRandomInt = (min, max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

capitalizeFirstLetter = (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)

sendResult = (res, json) ->
    res.setHeader "Content-Type", "application/json; charset=utf-8"
    res.write JSON.stringify(json, 0, 4)
    res.end()

ConnectMW = {}

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

ConnectMW.stubService = (req, res, next) ->
    if (req.url).match new RegExp("api/v1/cars")
        json = grunt.file.readJSON(require("path").resolve("middleware/response", "cars.json"))
        json.data.cars = _.map json.data.cars, (model) ->
            model['description'] = generateRandomText(50)
            return model
        return sendResult res, json
    else
        next()

module.exports = ConnectMW