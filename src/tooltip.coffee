
class SimpleTooltip extends SimpleModule

  opts:
    pointTo: null   # element to be binded
    content: null   # content html or text
    position: null  # position of the tooltip, should be "top", "bottom", "left", "right" or null
                    # When set null, the position is determined automatically
    cls: null       # optional class name of the tooltip element

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
    @arrowSize.width = @arrow.width()
    @arrowSize.height = @arrow.height()

  _bind: ->
    @pointTo.on 'mouseenter.simple-tooltip', (e)=>
      e.preventDefault()
      @showTooltip(e)
    @pointTo.on 'mouseout.simple-tooltip', (e)=>
      e.preventDefault()
      @hideTooltip(e)

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
    console.log "tooltip position: ", position

    @arrow.removeClass("simple-tooltip-arrow-left");
    @arrow.removeClass("simple-tooltip-arrow-right");
    @arrow.removeClass("simple-tooltip-arrow-top");
    @arrow.removeClass("simple-tooltip-arrow-bottom");
    @arrow.addClass("simple-tooltip-arrow-"+position);

    console.log pointToSize

  hideTooltip: (e)->

  sayHello: ->
    prompt = "Hello World"
    console.log prompt
    alert prompt

tooltip = (opts) ->
  new SimpleTooltip(opts)