(function() {
  var content, pointTo;

  pointTo = null;

  content = null;

  beforeEach(function() {
    content = "I'm a tooltip";
    $('<div style="height:10px;"></div>').appendTo("body");
    pointTo = $('<div></div>', {
      html: "Hello Tooltip"
    }).css("background-color", "#00ff00").css("display", "inline-block").css('margin-left', '100px').appendTo("body");
    return $('<div style="height:10px;"></div>').appendTo("body");
  });

  describe('Simple Tooltip', function() {
    return it('should inherit from SimpleModule', function() {
      var tooltip_bottom, tooltip_left, tooltip_right, tooltip_top;
      tooltip_top = simple.tooltip({
        pointTo: pointTo,
        content: content,
        position: "top"
      });
      expect(tooltip_top instanceof SimpleModule).toBe(true);
      tooltip_bottom = simple.tooltip({
        pointTo: pointTo,
        content: content,
        position: "bottom"
      });
      expect(tooltip_bottom instanceof SimpleModule).toBe(true);
      tooltip_left = simple.tooltip({
        pointTo: pointTo,
        content: content,
        position: "left"
      });
      expect(tooltip_left instanceof SimpleModule).toBe(true);
      tooltip_right = simple.tooltip({
        pointTo: pointTo,
        content: content,
        position: "right"
      });
      return expect(tooltip_right instanceof SimpleModule).toBe(true);
    });
  });

}).call(this);
