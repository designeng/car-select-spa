path = require "path"
grunt = require "grunt"

sendResult = (res, json) ->
    res.setHeader "Content-Type", "application/json; charset=utf-8"
    res.write JSON.stringify(json, 0, 4)
    res.end()

ConnectMW = {}

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

ConnectMW.stubService = (req, res, next) ->
    if (req.url).match new RegExp("api/v1/cars")
        return sendResult res, grunt.file.readJSON(require("path").resolve("middleware/response", "cars.json"))
    else
        next()

module.exports = ConnectMW