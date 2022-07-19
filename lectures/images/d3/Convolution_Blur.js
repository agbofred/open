var input_size = 5;
var gridwidth = 70;
var gridheight = 70;

var dstart_x = gridwidth+10;
var dstart_y = gridheight+10;
var kstart_x = 450;
var kstart_y = dstart_y;

var textcolor = "#586e75";
var tracecolor = "#2aa19855";
var hlcolor = "#6c71c444";
var orange = "#dc322f";

function genGrid(xstart, ystart, rows, cols) {
	var data = [];
	for (var r=0; r < rows; r++){
		for (var c=0; c < cols; c++) {
			data.push({
				"x" : xstart + c * gridwidth,
				"y" : ystart + r * gridheight,
				"width": gridwidth,
				"height": gridheight,
				"value": 0,
			});
		}
	}
	return data;
}

function drawGrid(grid, data, classname) {
	var squares = grid.selectAll("."+ classname)
		.data(data)
		.enter().append("g")
		.attr("class", classname)

	squares.append("rect")
		.attr("x", d => d.x)
		.attr("y", d => d.y)
		.attr("width", d => d.width)
		.attr("height", d => d.height)
		.style("stroke", "#222")
		.style("fill", "#fff")
	squares.append("text")
		.attr("x", d => d.x+d.width/2)
		.attr("y", d => d.y+d.height/2)
		.text(d => d.value)
		.attr("text-anchor", "middle")
		.attr("font-size", "2em")
		.attr("fill", textcolor)
		.attr("alignment-baseline", "central")
}

function drawKernel(parent, info) {
	var box = parent.append("g");
	var squares2 = box.selectAll("kernel").data(info).enter().append("g");
	squares2.append("rect")
		.attr("x", d => d.x)
		.attr("y", d => d.y)
		.attr("width", d => d.width)
		.attr("height", d => d.height)
		.style("stroke", "#222")
		.style("fill", hlcolor)
		//.style("opacity", "0.3")
	squares2.append("text")
		.attr("x", d => d.x+d.width-2)
		.attr("y", d => d.y+d.height-2)
		.text("\u00D7 1/9")
		.attr("text-anchor", "end")
		.attr("font-size", "1.5em")
		.attr("font-weight", "bold")
		.attr("fill", "#073642")
	return box
}


var data = genGrid(dstart_x,dstart_y,5,5);
for (var i = 0; i < 5; i++){
	data[2+i*5].value = 200;
}
var conv = genGrid(dstart_x+600,dstart_y,5,5);

var grid = d3.select("body")
	.append("svg")
	.attr("viewBox", "0 0 1100 500")
	.attr("width", "100%")
	//.attr("height", "100%")

drawGrid(grid, data, "square")
drawGrid(grid, conv, "csquare")

var kernel = genGrid(kstart_x,kstart_y,3,3);
var box = drawKernel(grid, kernel);

async function shiftKernel(x,y) {

	box.transition()
		.duration(500)
		.attr("transform", `translate(${x*gridwidth-kstart_x+dstart_x},${y*gridheight-kstart_y+dstart_y})`)
		.on("end", scanKernel)
		.end();
}

function updateCell(array, classname, index, increment) {
	array[index].value += increment;
	grid.selectAll("."+classname).data(array).selectAll("text").text(d => d.value.toFixed(0)).attr("fill", "orange");
}

async function scanKernel() {
	var dur = 150;
	s = box.selectAll("g").select("rect")
	await s.transition()
		.delay((d,i) => dur*i)
		.duration(dur)
		.style("fill", tracecolor)
		.transition()
		.duration(dur)
		.style("fill", hlcolor)
		.end()

	grid.selectAll(".csquare").data(conv).selectAll("text").text(d => d.value.toFixed(0)).attr("fill", (d) => d.value > 0 ? orange : textcolor);
}

function get_average(data, row, col, size) {
	var total = 0;
	var dataWidth = 5;
	for (var r = row; r < row + size; r++){
		for (var c = col; c < col + size; c++){
			if ((r >= 0 && r < dataWidth) && (c>=0 && c < dataWidth)){
				var index = r*dataWidth+ c
				total += data[index].value
			}
		}
	}
	return total / size ** 2
}

async function conv_point(x,y) {
	await shiftKernel(x,y);
	//scanKernel();
	var value = get_average(data, y, x, 3);
	var index = (y+1)*5+(x+1);
	conv[index].value = value;
}

function shadeIn(classname) {
	grid.selectAll("."+classname).selectAll("text").attr("opacity", "0");
	grid.selectAll("."+classname).selectAll("rect").transition().duration(1000).style("fill", (d) => `rgb(${d.value},${d.value},${d.value})`)
}
function shadeOut(classname) {
	grid.selectAll("."+classname).selectAll("text").attr("opacity", "100");
	grid.selectAll("."+classname).selectAll("rect").transition().duration(1000).style("fill", "white")
}


async function convolve() {
	// This fails atm
	for (var r = -1; r < 4; r++) {
		for (var c = -1; c < 4; c++) {
			await conv_point(c,r);
		}
	}
}

shadeIn("square");
shadeIn("csquare");

var _transitions = []
var index_val = 1;

_transitions.push({ transitionForward: () => {
	shadeOut("square");
	shadeOut("csquare");
	},
	index: index_val}
);
index_val++;
for (let r = -1; r < 4; r++) {
	for (let c = -1; c < 4; c++) {
		_transitions.push({ transitionForward: () => {conv_point(c,r);}, index: index_val})
		index_val ++;
	}
}
_transitions.push({ transitionForward: () => {
	shadeIn("square");
	shadeIn("csquare");
	},
	index: index_val}
);
