(function() {
  var content, pointTo;

  pointTo = null;

  content = null;

  beforeEach(function() {
    content = "I'm a tooltip";
    $('<div style="height:10px;"></div>').appendTo("body");
    pointTo = $('<div></div>', {
      html: "Hello Tooltip"
    }).appendTo("body");
    return $('<div style="height:10px;"></div>').appendTo("body");
  });

  describe('Simple Tooltip', function() {
    return it('should inherit from SimpleModule', function() {
      var tooltip;
      tooltip = simple.tooltip({
        pointTo: pointTo,
        content: content
      });
      return expect(tooltip instanceof SimpleModule).toBe(true);
    });
  });

}).call(this);
