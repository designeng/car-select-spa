define(["wire", "when", "backbone", "jasmine-jquery"], function(wire, When, Backbone) {
  var spec;
  spec = {
    $plugins: ['wire/debug', 'plugins/marionette/components/tabs'],
    tabs: {
      createTabs: {
        labels: {
          "All items": "all",
          "Selected items": "selected"
        },
        className: 'navigation-tabs'
      }
    }
  };
  return describe("marionette components tabs plugin", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(spec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("should be defined", function(done) {
      expect(this.ctx.tabs).toBeDefined();
      return done();
    });
    it("should have collection", function(done) {
      expect(this.ctx.tabs.collection).toBeDefined();
      return done();
    });
    it("with length = 2", function(done) {
      expect(this.ctx.tabs.collection.length).toBe(2);
      return done();
    });
    it("model should have fields 'label' and 'href'", function(done) {
      var model0;
      model0 = this.ctx.tabs.collection.at(0);
      expect(model0.get('label')).toBe("All items");
      expect(model0.get('href')).toBe("#/all");
      return done();
    });
    return it("when rendered should have: 1) li collection length 2) li with html 3) class", function(done) {
      var li0aTag, liCollection, rootEl;
      this.ctx.tabs.render();
      rootEl = this.ctx.tabs.$el;
      liCollection = rootEl.find('li');
      li0aTag = liCollection[0].getElementsByTagName('a')[0];
      expect(liCollection.length).toBe(2);
      expect(li0aTag).toHaveAttr('href', '#/all');
      expect(li0aTag).toHaveText('All items');
      expect(rootEl).toHaveClass("navigation-tabs");
      return done();
    });
  });
});
