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
simple.tooltip({<br/>
&nbsp;&nbsp;: "#need-tooltip",<br/>
&nbsp;&nbsp;content: "I'm a tooltip"<br/>
});<br/>
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
	<tr>
		<td>
			distance
		</td>
		<td>
			integer
		</td>
		<td>
			distance between the tooltip and the binded element (in px). Default is 5.
		</td>
		<td>
			no
		</td>
	</tr>
</table>
</p>
<h2>Destroy</h2>
<p><code>simple.tooltip()</code> returns an instance SimpleTooltip which controls the function of tooltip. If you don't want the tooltip any more, call <code>destroy</code> method of the object</p>
<h2>The author says</h2>
<p>
Thanks to mycolorway for providing me such a challenging question. I am very excited to complete it.
</p>
<p>
Before composing this project, I have never used CoffeeScript and Sass. They are beautiful and powerful langueges, or tools, for front-end developing. I'll be very glad to have another chance of using them.
</p>
<p>
Using bower to manage the front-end dependencies is very convenient. This is the second time I use it. And I really charmed by it.
</p>
<p>
Of course, this project is completed in a relatively short time, and lacks testings and examines. If problems appears, please contact me and I'll fix them at the first time.
</p>
<p>
Thanks for all!
</p>
<p style="text-align:right;">
Cosmo Zhang<br/>
<a href="mailto:zjzxz3006@126.com">zjzxz3006@126.com</a><br/>
Beijing University of Posts and Telecommunications<br/>
Oct 10th, 2014<br/>
</p>