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
    cls: null,
    distance: 5
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
    if (this.opts.position !== "top" && this.opts.position !== "bottom" && this.opts.position !== "left" && this.opts.position !== "right" && this.opts.position !== null) {
      throw "[Tooltip] \" " + this.opts.position + " \" is not a valid position";
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
    this.arrowSize.width = this.arrow.outerWidth();
    this.arrowSize.height = this.arrow.outerHeight();
    this.elSize = {};
    this.elSize.width = this.el.width();
    this.elSize.height = this.el.height();
    return this.el.hide();
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

  SimpleTooltip.prototype._unbind = function() {
    this.pointTo.off('mouseenter.simple-tooltip');
    return this.pointTo.off('mouseout.simple-tooltip');
  };

  SimpleTooltip.prototype.showTooltip = function(e) {
    var distance, domSize, horizontal, marginBottom, marginLeft, marginRight, marginTop, pointToSize, position, vertical, windowSize;
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
    distance = this.opts.distance;
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
    console.log("[Tooltip] tooltip position: ", position);
    this.el.removeClass("simple-tooltip-left");
    this.el.removeClass("simple-tooltip-right");
    this.el.removeClass("simple-tooltip-top");
    this.el.removeClass("simple-tooltip-bottom");
    this.el.addClass("simple-tooltip-" + position);
    this.el.each(function() {
      this.style.top = null;
      this.style.bottom = null;
      this.style.left = null;
      return this.style.right = null;
    });
    switch (position) {
      case "top":
        this.el.css('top', (pointToSize.top - distance - this.arrowSize.height / 2 - this.elSize.height) + 'px');
        this.el.css('left', (pointToSize.centerX - this.elSize.width / 2) + 'px');
        break;
      case "bottom":
        this.el.css('top', (pointToSize.bottom + distance + this.arrowSize.height / 2) + 'px');
        this.el.css('left', (pointToSize.centerX - this.elSize.width / 2) + 'px');
        break;
      case "left":
        this.el.css('top', (pointToSize.centerY - this.elSize.height / 2) + 'px');
        this.el.css('left', (pointToSize.left - distance - this.arrowSize.width / 2 - this.elSize.width) + 'px');
        break;
      case "right":
        this.el.css('top', (pointToSize.centerY - this.elSize.height / 2) + 'px');
        this.el.css('left', (pointToSize.right + distance + this.arrowSize.width / 2) + 'px');
        break;
      default:
        console.error("[Tooltip] \" " + position + " \" is not a valid position");
    }
    return this.el.fadeIn("fast");
  };

  SimpleTooltip.prototype.hideTooltip = function(e) {
    return this.el.fadeOut("fast");
  };

  SimpleTooltip.prototype.destroy = function() {
    return this._unbind();
  };

  return SimpleTooltip;

})(SimpleModule);

tooltip = function(opts) {
  return new SimpleTooltip(opts);
};


return tooltip;


}));

