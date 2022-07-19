var width = 50;
var values = [31, 41, 59, 26, 53, 58, 97, 93, 23, 84];
var data = [];
var spacing = 25;
for (var x = 0; x < values.length; x++) {
	data.push({'x':x*spacing, 'v':values[x], 'i':x});
}

var svg = d3.select("body").append("svg")
	.attr("viewBox", "-25 -25 " + spacing*(values.length+1) + " 70")
	.attr("width", "100%")
	.attr("height", "100%");

var labels = svg.append("g").selectAll("text").data(data, d => d.i);

var rh = svg.append("text")
	.attr("id", "#rh")
	.attr("x", 0*spacing)
	.attr("y", 25)
	.text("rh")
	.attr("fill", Blue)
	.attr("font-size", ".6em")
	.attr("text-anchor", "middle");

var lh = svg.append("text")
	.attr("id", "#rh")
	.attr("x", 0*spacing)
	.attr("y", 40)
	.text("lh")
	.attr("fill", Orange)
	.attr("font-size", ".6em")
	.attr("text-anchor", "middle");

//var i = svg.append("circle")
	//.attr("cx", 0*spacing)
	//.attr("cy", 12)
	//.attr("r", 1.5)
var i = svg.append("g")

i.append("rect")
	.attr("x", -spacing/2)
	.attr("y", -spacing/2)
	.attr("width", spacing)
	.attr("height", spacing)
	.attr("stroke", Red)
	.attr("fill", "none")

i.append("text")
	.attr("x", 0)
	.attr("y", -spacing/2-4)
	.text("i")
	.attr("stroke", "none")
	.attr("fill", Red)
	.attr("font-size", "0.5em")

labels.enter()
	.append("text")
	.attr("x", d => d.x)
	.attr("y", 0)
	.text(d => d.v)
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.attr("fill", Green)
	.attr("alignment-baseline", "central");


function swap(a,b) {
	tmp = data[a].x;
	data[a].x = data[b].x;
	data[b].x = tmp;
	data.sort( (a,b) => a.x - b.x);

	var labels = svg.select("g").selectAll("text")
					.data(data, d => d.i);


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
		.attr("fill", Green)
		.attr("alignment-baseline", "central")

	labels.transition()
		.duration(2000)
		.attr("x", d => d.x)
}

function move_to(obj, index) {
	obj.transition()
		.duration(500)
		//.attr("x", (obj==i) ? index * spacing - spacing/2 :index * spacing)
		//.attr("cx", index * spacing)
		.attr("transform", `translate(${index * spacing}, 0)`)
}

function generate_transitions() {
	function select_sort(array){
		function move_transition(obj, value, increment=1){
				_transitions.push({transitionForward: ()=> move_to(obj, value), index: indexv});
				indexv+= increment;
		}
		var indexv = 0;
		for (let lhv=0; lhv < array.length; lhv++) {
			move_transition(lh, lhv)
			let rhv = lhv;
			move_transition(rh, rhv)
			for (let iv=lhv+1; iv < array.length; iv++) {
				move_transition(i, iv,2)
				if (array[iv] < array[rhv]) {
					rhv = iv;
					move_transition(rh, rhv)
				}
			}
			let tmp = array[lhv];
			array[lhv] = array[rhv];
			array[rhv] = tmp;
			if (lhv != rhv) {
				_transitions.push({transitionForward: ()=> swap(rhv, lhv), index: indexv});
				indexv++;
			}
		}
		return array
	}
	tosort = [...values];
	select_sort(tosort);
}



var _transitions = [
]
generate_transitions()
console.log(_transitions);
	//{
		//transitionForward: () => move_to(i,1),
		//index: 1
	//},
	//{
		//transitionForward: () => move_to(i,2),
		//index: 3
	//},
	//{
		//transitionForward: () => move_to(i,3),
		//index: 5
	//},
	//{
		//transitionForward: () => move_to(rh,3),
		//index: 7
	//},
	//{
		//transitionForward: () => move_to(i,4),
		//index: 8
	//},
	//{
		//transitionForward: () => move_to(i,5),
		//index: 10
	//},
	//{
		//transitionForward: () => move_to(i,6),
		//index: 12
	//},
	//{
		//transitionForward: () => move_to(i,7),
		//index: 14
	//},
	//{
		//transitionForward: () => move_to(i,8),
		//index: 16
	//},
	//{
		//transitionForward: () => move_to(rh,8),
		//index: 18
	//},
	//{
		//transitionForward: () => move_to(i,9),
		//index: 19
	//},
	//{
		//transitionForward: () => swap(0,8),
		//index: 20
	//},
	//{
		//transitionForward: () => move_to(lh,1),
		//index: 21
	//},
	//{
		//transitionForward: () => move_to(rh,1),
		//index: 22
	//},
	//{
		//transitionForward: () => move_to(i,2),
		//index: 23
	//},
	//{
		//transitionForward: () => move_to(i,3),
	//},
	//{
		//transitionForward: () => move_to(rh,3),
	//},
	//{
		//transitionForward: () => move_to(i,4),
	//},
	//{
		//transitionForward: () => move_to(i,5),
	//},
	//{
		//transitionForward: () => move_to(i,6),
	//},
	//{
		//transitionForward: () => move_to(i,7),
	//},
	//{
		//transitionForward: () => move_to(i,8),
	//},
	//{
		//transitionForward: () => move_to(i,9),
	//},
	//{
		//transitionForward: () => swap(1,3),
	//},
	//{
		//transitionForward: () => move_to(lh,2),
	//},
	//{
		//transitionForward: () => move_to(rh,2),
	//},
	//{
		//transitionForward: () => move_to(i,3),
	//},
	//{
		//transitionForward: () => swap(2,8),
	//},
	//{
		//transitionForward: () => swap(6,8),
	//},
	//{
		//transitionForward: () => swap(7,9),
	//},
	//{
		//transitionForward: () => swap(8,9),
	//},
