var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'marionette', 'api', 'utils/request/index', 'hbs!templates/userCorner'], function(_, Backbone, Marionette, api, AjaxRequest, userCornerTemplate) {
  var UserCornerModel, UserCornerView, _ref, _ref1;
  UserCornerModel = (function(_super) {
    __extends(UserCornerModel, _super);

    function UserCornerModel() {
      _ref = UserCornerModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserCornerModel.prototype.url = api.getUserCornerUrl();

    UserCornerModel.prototype.parse = function(resp) {
      var obj;
      obj = {
        name: resp.data.name,
        userPicUrl: resp.data.icon_url,
        companyId: resp.additional_data.company_id
      };
      return obj;
    };

    return UserCornerModel;

  })(Backbone.Model);
  return UserCornerView = (function(_super) {
    __extends(UserCornerView, _super);

    function UserCornerView() {
      _ref1 = UserCornerView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    UserCornerView.prototype.tagName = "div";

    UserCornerView.prototype.className = "user-profile-corner";

    UserCornerView.prototype.template = userCornerTemplate;

    UserCornerView.prototype.initialize = function() {
      var _this = this;
      this.$el.hide();
      this.model = new UserCornerModel();
      this.model.fetch();
      return this.model.on("sync", function(model) {
        return new AjaxRequest(api.getOrganizationsUrl(), {}, "GET").done(function(organizations) {
          var organizationObject;
          organizationObject = _.find(organizations.data, {
            company_id: model.get('companyId')
          });
          if (organizationObject) {
            model.set("organizationName", organizationObject.name);
          }
          _this.render();
          return _this.$el.show();
        });
      });
    };

    return UserCornerView;

  })(Marionette.ItemView);
});
