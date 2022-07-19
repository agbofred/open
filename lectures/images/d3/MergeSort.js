var Teal = "#27D796"
var Blue = "#21BFC2"
var width = 50;
var values = [31, 41, 59, 26, 53, 58, 97, 93, 23, 84];
var data = [];
var spacing = 25;
for (var x = 0; x < values.length; x++) {
	data.push({'x':x*spacing, 'v':values[x], 'i':x});
}

var svg = d3.select("body").append("svg")
	.attr("viewBox", "-20 -10 " + (spacing*values.length+20) + " 70")
	.attr("width", "100%")
	.attr("height", "100%");

//var labels = svg.append("g").selectAll("text")

svg.selectAll('#num').data(data, d => d.i).enter()
	.append("text")
	.attr("x", d => d.x)
	.attr("y", 0)
	.text(d => d.v)
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.attr("fill", Teal)
	.attr("alignment-baseline", "central")
	.attr("id", "num");

var labels = svg.selectAll('#num');

function split(obj) {
	let ls = svg.selectAll('#num').data(data.slice(0,5), d => d.i);
	console.log(ls);
	ls.enter()
		.append("text")
		.attr("x", d => d.x)
		.attr("y", 0)
		.text(d => d.v)
		.attr("text-anchor", "middle")
		.attr("font-size", "1em")
		.attr("fill", Blue)
		.attr("alignment-baseline", "central")
		.attr("id", "num");

	obj.transition()
		.duration(1000)
		.attr("x", (d,i) => i < 5 ? d.x-10 : d.x + 10)
}

function swap(a,b) {
	tmp = data[a].x;
	data[a].x = data[b].x;
	data[b].x = tmp;
	data.sort( (a,b) => a.x - b.x);

	//var labels = svg.select("g").selectAll("text")
					//.data(data, d => d.i);
	nlabels = labels.data(data, d => d.i)


	labels.exit()
		.attr("fill", "red")
		.remove()

	labels.enter()
		.append("text")
		.transition()
		.duration(1000)
		.attr("x", d => d.x)
		.attr("y", 0)
		.text(d => d.v)
		.attr("text-anchor", "middle")
		.attr("font-size", "1em")
		.attr("fill", Teal)
		.attr("alignment-baseline", "central")

	nlabels.transition()
		.duration(1000)
		.attr("x", d => d.x)
}

function move_to(obj, index) {
	obj.transition()
		.duration(500)
		.attr("x", index * spacing)
		.attr("cx", index * spacing)
}




var _transitions = [
{
	transitionForward: () => move_to(i,1),
	index: 1
},
{
	transitionForward: () => move_to(i,2),
	index: 3
},
{
	transitionForward: () => move_to(i,3),
	index: 5
},
{
	transitionForward: () => move_to(rh,3),
	index: 7
},
{
	transitionForward: () => move_to(i,4),
	index: 8
},
{
	transitionForward: () => move_to(i,5),
	index: 10
},
{
	transitionForward: () => move_to(i,6),
	index: 12
},
{
	transitionForward: () => move_to(i,7),
	index: 14
},
{
	transitionForward: () => move_to(i,8),
	index: 16
},
{
	transitionForward: () => move_to(rh,8),
	index: 18
},
{
	transitionForward: () => move_to(i,9),
	index: 19
},
{
	transitionForward: () => swap(0,8),
	index: 20
},
{
	transitionForward: () => move_to(lh,1),
	index: 21
},
{
	transitionForward: () => move_to(rh,1),
	index: 22
},
{
	transitionForward: () => move_to(i,2),
	index: 23
},
{
	transitionForward: () => move_to(i,3),
},
{
	transitionForward: () => move_to(rh,3),
},
{
	transitionForward: () => move_to(i,4),
},
{
	transitionForward: () => move_to(i,5),
},
{
	transitionForward: () => move_to(i,6),
},
{
	transitionForward: () => move_to(i,7),
},
{
	transitionForward: () => move_to(i,8),
},
{
	transitionForward: () => move_to(i,9),
},
{
	transitionForward: () => swap(1,3),
},
{
	transitionForward: () => move_to(lh,2),
},
{
	transitionForward: () => move_to(rh,2),
},
{
	transitionForward: () => move_to(i,3),
},
{
	transitionForward: () => swap(2,8),
},
{
	transitionForward: () => swap(6,8),
},
{
	transitionForward: () => swap(7,9),
},
{
	transitionForward: () => swap(8,9),
},
]

