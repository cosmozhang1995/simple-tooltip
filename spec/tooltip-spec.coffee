pointTo = null
content = null

beforeEach ->
	content = "I'm a tooltip"
	$('<div style="height:10px;"></div>').appendTo("body")
	pointTo = $('<div></div>', {
		html: "Hello Tooltip"
		}).appendTo "body"
	$('<div style="height:10px;"></div>').appendTo("body")

describe 'Simple Tooltip', ->

  it 'should inherit from SimpleModule', ->
    tooltip = simple.tooltip
    	pointTo: pointTo,
    	content: content
    expect(tooltip instanceof SimpleModule).toBe(true)
