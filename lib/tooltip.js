(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-tooltip', ["jquery",
      "simple-module"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['tooltip'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

var SimpleTooltip, tooltip,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SimpleTooltip = (function(_super) {
  __extends(SimpleTooltip, _super);

  function SimpleTooltip() {
    return SimpleTooltip.__super__.constructor.apply(this, arguments);
  }

  SimpleTooltip.prototype.opts = {
    pointTo: null,
    content: null,
    position: null,
    cls: null
  };

  SimpleTooltip.spacename = "simple-tooltip";

  SimpleTooltip.tpl = {
    tooltip: "<div class=\"simple-tooltip\">\n  <div class=\"simple-tooltip-body\">\n    <span></span>\n  </div>\n  <div class=\"simple-tooltip-arrow\">\n  </div>\n</div>"
  };

  SimpleTooltip.prototype._init = function() {
    if (this.opts.pointTo === null) {
      throw "[Tooltip] You must specify an element by 'pointTo' option";
    }
    if (this.opts.content === null) {
      throw "[Tooltip] You must specify the content by 'content' option";
    }
    this._render();
    return this._bind();
  };

  SimpleTooltip.prototype._render = function() {
    this.el = $(SimpleTooltip.tpl.tooltip).addClass(this.opts.cls);
    this.pointTo = $(this.opts.pointTo);
    this.arrow = this.el.find(".simple-tooltip-arrow");
    this.content = this.el.find(".simple-tooltip-body");
    this.content.find("span").html(this.opts.content);
    this.el.appendTo("body");
    this.tooltipSize = {};
    this.tooltipSize.width = this.content.width();
    this.tooltipSize.height = this.content.height();
    this.arrowSize = {};
    this.arrowSize.width = this.arrow.width();
    return this.arrowSize.height = this.arrow.height();
  };

  SimpleTooltip.prototype._bind = function() {
    this.pointTo.on('mouseenter.simple-tooltip', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.showTooltip(e);
      };
    })(this));
    return this.pointTo.on('mouseout.simple-tooltip', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.hideTooltip(e);
      };
    })(this));
  };

  SimpleTooltip.prototype.showTooltip = function(e) {
    var domSize, horizontal, marginBottom, marginLeft, marginRight, marginTop, pointToSize, position, vertical, windowSize;
    pointToSize = this.pointTo.offset();
    pointToSize.width = this.pointTo.outerWidth();
    pointToSize.height = this.pointTo.outerHeight();
    pointToSize.right = pointToSize.left + pointToSize.width;
    pointToSize.bottom = pointToSize.top + pointToSize.height;
    pointToSize.centerX = pointToSize.left + pointToSize.width / 2;
    pointToSize.centerY = pointToSize.top + pointToSize.height / 2;
    windowSize = {};
    windowSize.width = $(window).width();
    windowSize.height = $(window).height();
    domSize = {};
    domSize.scrollTop = $(document).scrollTop();
    domSize.scrollLeft = $(document).scrollLeft();
    position = this.opts.position;
    if (position === null) {
      marginLeft = pointToSize.left - domSize.scrollLeft;
      marginRight = windowSize.width - (pointToSize.right - domSize.scrollLeft);
      marginTop = pointToSize.top - domSize.scrollTop;
      marginBottom = windowSize.height - (pointToSize.bottom - domSize.scrollTop);
      if (marginTop > marginBottom) {
        vertical = {
          margin: marginTop,
          position: "top"
        };
      } else {
        vertical = {
          margin: marginBottom,
          position: "bottom"
        };
      }
      if (marginLeft > marginRight) {
        horizontal = {
          margin: marginLeft,
          position: "left"
        };
      } else {
        horizontal = {
          margin: marginRight,
          position: "right"
        };
      }
      if (vertical.margin > horizontal.margin) {
        position = vertical.position;
      } else {
        position = horizontal.position;
      }
    }
    console.log("tooltip position: ", position);
    this.arrow.removeClass("simple-tooltip-arrow-left");
    this.arrow.removeClass("simple-tooltip-arrow-right");
    this.arrow.removeClass("simple-tooltip-arrow-top");
    this.arrow.removeClass("simple-tooltip-arrow-bottom");
    this.arrow.addClass("simple-tooltip-arrow-" + position);
    return console.log(pointToSize);
  };

  SimpleTooltip.prototype.hideTooltip = function(e) {};

  SimpleTooltip.prototype.sayHello = function() {
    var prompt;
    prompt = "Hello World";
    console.log(prompt);
    return alert(prompt);
  };

  return SimpleTooltip;

})(SimpleModule);

tooltip = function(opts) {
  return new SimpleTooltip(opts);
};


return tooltip;


}));

