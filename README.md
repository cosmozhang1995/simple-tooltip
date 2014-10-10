<h1>Simple Tooltip</h1>
<h2>Introduction</h2>
<p>
This is a project based on mycolorway's SimpleModule. It's a test question for mycolorway's FE programmers.
</p>
<p>
This module creates a simple tooltip for a specified element. When mouse moved on the element, the tooltip shows to show a short description of the element. You can specify the tooltip position or leave it to be determined automatically. There are 4 positions available: top, bottom, left and right.
</p>
<h2>Usage</h2>
<p>
Just include jquery and simple-tooltip.js and use the following sentence to enable the tooltip:
<code>
simple.tooltip({
	: "#need-tooltip",
	content: "I'm a tooltip"
});
</code>
<p>
</p>
<code>simple.tooltip</code> function creates a tooltip for the element with id <code>need-tooltip</code>. It accepts an argument named <code>opts</code>. <code>opts</code> is a javascript map object which specifies the options of the tooltip. Here is a list of available options.
</p>
<p>
<table>
	<tr>
		<th>name</th>
		<th>value</th>
		<th>description</th>
		<th>necessary</th>
	</tr>
	<tr>
		<td>
			pointTo
		</td>
		<td>
			jQuery selector
		</td>
		<td>
			The element(s) to bind the tooltip
		</td>
		<td>
			yes
		</td>
	</tr>
	<tr>
		<td>
			content
		</td>
		<td>
			string
		</td>
		<td>
			The content html of the tooltip
		</td>
		<td>
			yes
		</td>
	</tr>
	<tr>
		<td>
			position
		</td>
		<td>
			"top", "bottom", "left" or "right"
		</td>
		<td>
			The position where the tooltip displays. If this is not set, the position is calculated automatically.
		</td>
		<td>
			no
		</td>
	</tr>
	<tr>
		<td>
			cls
		</td>
		<td>
			string
		</td>
		<td>
			Alternal classname of the tooltip element
		</td>
		<td>
			no
		</td>
	</tr>
</table>
</p>