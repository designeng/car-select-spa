define(["underscore", "backbone", "backbone.radio", "marionette", "handlebars", "json!../../assets/api/response/cars.json"], function(_, Backbone, Radio, Marionette, Handlebars, carsJSON) {
  Backbone.ajax = function(response) {
    var url;
    url = response.url;
    if (url.match(new RegExp("/cars"))) {
      return response.success(carsJSON);
    }
  };
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    return Handlebars.compile(rawTemplate);
  };
  Marionette.TemplateCache.prototype.loadTemplate = function(templateId, options) {
    if (_.isString(templateId)) {
      return templateId;
    }
    if (!template || template.length === 0) {
      throw new Marionette.Error({
        name: 'NoTemplateError',
        message: 'Could not find template: "' + templateId + '"'
      });
    }
    return template;
  };
  Marionette.CollectionView.prototype.getChildren = function() {
    return this.children._views;
  };
  return Marionette.Application.prototype._initChannel = function() {
    this.channelName = _.result(this, 'channelName') || 'global';
    return this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  };
});
