
class SimpleTooltip extends SimpleModule

  opts:
    pointTo: null   # element to be binded
    content: null   # content html or text
    position: null  # position of the tooltip, should be "top", "bottom", "left", "right" or null
                    # When set null, the position is determined automatically
    cls: null       # optional class name of the tooltip element
    distance: 5    # distance between the tooltip and the binded element (in px)

  @spacename: "simple-tooltip"

  @tpl:
    tooltip:
      """
      <div class="simple-tooltip">
        <div class="simple-tooltip-body">
          <span></span>
        </div>
        <div class="simple-tooltip-arrow">
        </div>
      </div>
      """

  _init: ->
    if @opts.pointTo is null
      throw "[Tooltip] You must specify an element by 'pointTo' option"
    if @opts.content is null
      throw "[Tooltip] You must specify the content by 'content' option"
    if @opts.position isnt "top" and @opts.position isnt "bottom" and @opts.position isnt "left" and @opts.position isnt "right" and @opts.position isnt null
      throw "[Tooltip] \" #{@opts.position} \" is not a valid position"

    @_render()
    @_bind()

  _render: ->
    @el = $(SimpleTooltip.tpl.tooltip).addClass @opts.cls
    @pointTo = $(@opts.pointTo)
    @arrow = @el.find ".simple-tooltip-arrow"
    @content = @el.find ".simple-tooltip-body"
    @content.find("span").html(@opts.content)
    @el.appendTo("body")
    @tooltipSize = {}
    @tooltipSize.width = @content.width()
    @tooltipSize.height = @content.height()
    @arrowSize = {}
    @arrowSize.width = @arrow.outerWidth()
    @arrowSize.height = @arrow.outerHeight()
    @elSize = {}
    @elSize.width = @el.width()
    @elSize.height = @el.height()
    @el.hide()

  _bind: ->
    @pointTo.on 'mouseenter.simple-tooltip', (e)=>
      e.preventDefault()
      @showTooltip(e)
    @pointTo.on 'mouseout.simple-tooltip', (e)=>
      e.preventDefault()
      @hideTooltip(e)

  _unbind: ->
    @pointTo.off 'mouseenter.simple-tooltip'
    @pointTo.off 'mouseout.simple-tooltip'

  showTooltip: (e)->
    # get necessary sizes
    pointToSize = @pointTo.offset()
    pointToSize.width = @pointTo.outerWidth()
    pointToSize.height = @pointTo.outerHeight()
    pointToSize.right = pointToSize.left + pointToSize.width
    pointToSize.bottom = pointToSize.top + pointToSize.height
    pointToSize.centerX = pointToSize.left + pointToSize.width / 2
    pointToSize.centerY = pointToSize.top + pointToSize.height / 2

    windowSize = {}
    windowSize.width = $(window).width()
    windowSize.height = $(window).height()

    domSize = {}
    domSize.scrollTop = $(document).scrollTop()
    domSize.scrollLeft = $(document).scrollLeft()

    distance = @opts.distance

    position = @opts.position
    # if position is not set, calculate it
    if position is null
      marginLeft = pointToSize.left - domSize.scrollLeft
      marginRight = windowSize.width - (pointToSize.right - domSize.scrollLeft)
      marginTop = pointToSize.top - domSize.scrollTop
      marginBottom = windowSize.height - (pointToSize.bottom - domSize.scrollTop)
      if (marginTop > marginBottom)
        vertical = 
          margin: marginTop
          position: "top"
      else
        vertical = 
          margin: marginBottom
          position: "bottom"
      if (marginLeft > marginRight)
        horizontal = 
          margin: marginLeft
          position: "left"
      else
        horizontal = 
          margin: marginRight
          position: "right"
      if (vertical.margin > horizontal.margin)
        position = vertical.position
      else
        position = horizontal.position
    console.log "[Tooltip] tooltip position: ", position

    # specify postion class name for arrow element
    @el.removeClass("simple-tooltip-left");
    @el.removeClass("simple-tooltip-right");
    @el.removeClass("simple-tooltip-top");
    @el.removeClass("simple-tooltip-bottom");
    @el.addClass("simple-tooltip-"+position);

    # remove absolute position css attributes for el
    @el.each ->
      this.style.top = null
      this.style.bottom = null
      this.style.left = null
      this.style.right = null

    # specify absolute position css attributes for el
    switch position
      when "top" 
        @el.css 'top', (pointToSize.top - distance - @arrowSize.height / 2 - @elSize.height) + 'px'
        @el.css 'left', (pointToSize.centerX - @elSize.width / 2) + 'px'
      when "bottom" 
        @el.css 'top', (pointToSize.bottom + distance + @arrowSize.height / 2) + 'px'
        @el.css 'left', (pointToSize.centerX - @elSize.width / 2) + 'px'
      when "left" 
        @el.css 'top', (pointToSize.centerY - @elSize.height / 2) + 'px'
        @el.css 'left', (pointToSize.left - distance - @arrowSize.width / 2 - @elSize.width) + 'px'
      when "right" 
        @el.css 'top', (pointToSize.centerY - @elSize.height / 2) + 'px'
        @el.css 'left', (pointToSize.right + distance + @arrowSize.width / 2) + 'px'
      else
        console.error "[Tooltip] \" #{position} \" is not a valid position"

    @el.fadeIn "fast"

  hideTooltip: (e)->
    @el.fadeOut "fast"

  destroy: ->
    @_unbind()

tooltip = (opts) ->
  new SimpleTooltip(opts)