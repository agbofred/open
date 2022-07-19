var width = 50;
var height = 30;
var data = [];
var start = 401
var count = start;
var target = 503;
var rows = 10
var cols = 16
for ( var y=0; y< rows*height ; y+= height + 5) {
	for ( var x=0; x< cols*width ; x+=width + 5) {
		data.push({"x":x,"y":y, "text":count});
		count += 1;
	}
}
var svg = d3.select("body")
	.append("svg")
	.attr("viewBox", "0 0 " + (cols+1)*width + " " + (rows+1)*height)
	.attr("width", "100%")
	.attr("height", "100%")

var boxes = svg.selectAll("boxes").data(data).enter()
	.append("rect")
	.attr("x", function(d) {return d.x;})
	.attr("y", function(d) {return d.y;})
	.attr("width", width)
	.attr("height", height)
	.attr("stroke", Green)
	.attr("fill-opacity", 0)

var labels = svg.selectAll("labels").data(data).enter()
	.append("text")
	.attr("x", d => d.x+width/2)
	.attr("y", d => d.y+height/2)
	.text(d => d.text)
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.attr("fill", Green)
	.attr("alignment-baseline", "mathematical")


function play() {
	boxes.filter(d => d.text<= target).transition()
		.duration(1000)
		.delay(d => (d.text-start)*100)
		.attr("fill", Blue)
		.attr("fill-opacity", 1)

	labels.filter(d => d.text<= target).transition()
		.duration(1000)
		.delay(d => (d.text-start)*100)
		.attr("fill", "black")

	boxes.filter(d => d.text == target)
		.transition()
		.delay(d => (d.text-start)*100+1000)
		//.attr("font-size", "2em")
		.attr("fill", Orange)
		.duration(1000)
	labels.filter(d => d.text == target)
		.transition()
		.delay(d => (d.text-start)*100+1000)
		.attr("font-size", "1.8em")
		.attr("fill", "black")
		.duration(1000)
}

var _transitions = [
{
	transitionForward: () => play(),
	index: 1,
}
]
<!--play()-->

