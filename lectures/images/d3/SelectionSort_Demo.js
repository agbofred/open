var width = 25;
var N = 20;
var data = [];
for (var x = 0; x < N; x++) {
	data.push({"x":x * width, "y":Math.floor(Math.random() * 90)+10, "i":false, "rh":false, "lh":false});
}

var svg = d3.select("body").append("svg")
	.attr("viewBox", "-10 -10 " + width*(N+1) + " 130")
	.attr("width", "100%")
	.attr("height", "100%");

var boxes = svg.selectAll("rect").data(data, d => d.x);

boxes.enter()
	.append("rect")
	.attr("x", d => d.x)
	.attr("y", d => 100 - d.y)
	.attr("width", width)
	.attr("height", d => d.y)
	.attr("fill", Blue)
	.attr("stroke", "black")
	.attr("id", "#boxes")

//var labels = svg.append("g").selectAll("text").data(data, d => d.i);

//var rh = svg.append("text")
	//.attr("id", "#rh")
	//.attr("x", 0*spacing)
	//.attr("y", 25)
	//.text("rh")
	//.attr("fill", Blue)
	//.attr("font-size", ".6em")
	//.attr("text-anchor", "middle");

//var lh = svg.append("text")
	//.attr("id", "#rh")
	//.attr("x", 0*spacing)
	//.attr("y", 40)
	//.text("lh")
	//.attr("fill", Orange)
	//.attr("font-size", ".6em")
	//.attr("text-anchor", "middle");

//var i = svg.append("circle")
	//.attr("cx", 0*spacing)
	//.attr("cy", 12)
	//.attr("r", 1.5)
	//.attr("fill", Red)

//labels.enter()
	//.append("text")
	//.attr("x", d => d.x)
	//.attr("y", 0)
	//.text(d => d.v)
	//.attr("text-anchor", "middle")
	//.attr("font-size", "1em")
	//.attr("fill", Teal)
	//.attr("alignment-baseline", "central");


function swap(a,b) {
	tmp = data[a].x;
	data[a].x = data[b].x;
	data[b].x = tmp;
	data.sort( (a,b) => a.x - b.x);
}

async function update() {
	var boxes = svg.selectAll("rect").data(data, d => d.x);

	//labels.exit()
		//.attr("fill", "red")
		//.remove()

	//labels.enter()
		//.append("text")
		//.transition()
		//.duration(1000)
		//.attr("x", d => d.x)
		//.attr("y", 0)
		//.text(d => d.v)
		//.attr("text-anchor", "middle")
		//.attr("font-size", "1em")
		//.attr("fill", Teal)
		//.attr("alignment-baseline", "central")

	await boxes.transition()
		.duration(1000)
		.attr("fill", d => d.i ? Red : Blue)
		.transition()
		.duration(1000)
		.attr("x", d => d.x)
		.end();
		//.attr('fill', function(d) {
			//if (d.i) {
				//return Red;
			//} else if (d.rh) {
				//return Orange;
			//} else if (d.lh) {
				//return Purple;
			//} else {
				//return Blue;
			//}
		//});

	//boxes.transition()
		//.duration(1000)
		//.attr("x", d => d.x)
}

async function selectsort () {
	for (let a=0; a < 10; a++ ){
		data[a].i = true;
		await update();
	}
}
