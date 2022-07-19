var rtext = [];
var stext = [];
var etext = [];
var eve_present = false;

var svg = d3.select("body").append("svg")
	.attr("viewBox", "-120 -50 240 100")
	.attr("width", "100%")
	.attr("height", "100%")
	.attr('fill', Orange)

var alice = svg.append("svg:image")
	.attr("xlink:href", "../Encryption_Alice.png")
	.attr("x", 80-10)
	.attr("y", -20)
	.attr("width", 20)
	.attr("height", 40)
	.attr("anchor", "middle")

var bob = svg.append("svg:image")
	.attr("xlink:href", "../Encryption_Bob.png")
	.attr("x", -80-10)
	.attr("y", -20)
	.attr("width", 20)
	.attr("height", 40);

var eve = svg.append("svg:image")
	.attr("xlink:href", "../Encryption_Eve.png")
	.attr("x", 0-10)
	.attr("y", -50)
	.attr("width", 20)
	.attr("height", 40)
	.attr("opacity", 0);


var msg = svg.append('text')
	.attr('x', 100)
	.attr('y', 5)
	.text("Initial Text")
	.attr('font-size', 10)
	.attr('clip-path', 'url(#tclip)')

var tbox = svg.append('clipPath')
	.attr('id', 'tclip')
	.append('rect')
	.attr('x', -50)
	.attr('y',-10)
	.attr('width', 100)
	.attr('height', 20)

function reset_and_move(text, enc_text=null) {
	if (enc_text==null ) {
		enc_text = text;
	}
	msg.attr("x", 100)
		.text(enc_text)
		.transition()
		.ease(d3.easeLinear)
		.duration(7000)
		.attr("x", -80 - msg.node().getComputedTextLength())
		.on("end", function () {add_received(text, enc_text)})
}

function add_received(new_text, new_encoded_text) {
	// Adding text that Bob sees
	rtext.push(new_text)
	svg.selectAll('#rtext').data(rtext).enter()
		.append("text")
		.text(d => d)
		.attr("x", -80)
		.attr("y", (d,i) => 25+6*i)
		.attr('font-size', 5)
		.attr('text-anchor', 'middle')
		.attr('id', "rtext")
		.attr("fill", Green)

	if (eve_present) {
		//Adding text that Eve sees
		etext.push(new_encoded_text)
		svg.selectAll('#etext').data(etext).enter()
			.append("text")
			.text(d => d)
			.attr("x", 50)
			.attr("y", (d,i) => -40+6*i)
			.attr('font-size', 5)
			.attr('text-anchor', 'middle')
			.attr('id', "etext")
			.attr("fill", Red)
	}

}

function add_eve_received(new_text) {

}

function add_sent(new_text) {
	stext.push(new_text)

	svg.selectAll('#stext').data(stext).enter()
		.append("text")
		.text(d => d)
		.attr("x", 80)
		.attr("y", (d,i) => 25+6*i)
		.attr('font-size', 5)
		.attr('text-anchor', 'middle')
		.attr("id", "stext")
		.attr("fill", Blue)
}

function enter_eve() {
	eve.transition()
		.attr("opacity", 1)
		.duration(1000)
}

function make_key(text, x, y) {
	var width = 10;
	var height= 20;

	svg.append("svg:image")
		.attr("xlink:href", "../key.png")
		.attr("x", 80-width/2)
		.attr("y", 0-height)
		.attr("width", width)
		.attr("height", height)
		.attr("opacity", 0)
		.attr("id", "key")
		.transition()
		.duration(1000)
		.attr("x", x-width/2)
		.attr("y", y-height)
		.attr("opacity", 1)

	svg.append("text")
		.attr("x", 80)
		.attr("y", -10)
		.text(text)
		.attr("font-size", 5)
		.attr("fill", Blue)
		.attr("text-anchor", "middle")
		.attr("opacity", 0)
		.attr("id", "key-text")
		.transition()
		.duration(1000)
		.attr("x", x)
		.attr("y", y-height)
		.attr("opacity", 1)
}

function draw_letter_sub() {
	svg.selectAll("#key-text")
		.attr("opacity", 0)

	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var ciphers = "LZDRXPEAJYBQWFVIHCTGNOMKSU"

	svg.append("text")
		.attr("x", 80)
		.attr("y", -10)
		.text(letters)
		.attr("font-size", 4)
		.attr("fill", Blue)
		.attr("text-anchor", "middle")
		.attr("opacity", 0)
		.attr("id", "key-text")
		.transition()
		.duration(1000)
		.attr("x", 0)
		.attr("y", 20)
		.attr("opacity", 1);

	svg.append("text")
		.attr("x", 80)
		.attr("y", -10)
		.text(ciphers)
		.attr("font-size", 4)
		.attr("fill", Blue)
		.attr("text-anchor", "middle")
		.attr("opacity", 0)
		.attr("id", "key-text")
		.transition()
		.duration(1000)
		.attr("x", 0)
		.attr("y", 24)
		.attr("opacity", 1);
}

var _transitions = [
{
	transitionForward: () => {
		thistext ="'Twas brillig, and the slithy toves";
		add_sent(thistext);
		reset_and_move(thistext);
	},
	index: 1
},
{
	transitionForward: () => {
		enter_eve();
		eve_present = true;
	},
	index: 2
},
{
	transitionForward: () => {
		thistext ="Did gyre and gimble in the wabe:";
		add_sent(thistext);
		reset_and_move(thistext);
	},
	index: 3
},
{
	transitionForward: () => {
		make_key("+3",50,10);
		make_key("-3",-50,10);
	},
	index: 4
},
{
	transitionForward: () => {
		thistext ="All mimsy were the borogroves,";
		enctext = "Doo plpvb zhuh wkh erurjuryhv,";
		add_sent(thistext);
		reset_and_move(thistext, enctext);
	},
	index: 5
},
{
	transitionForward: () => {
		draw_letter_sub();
	},
	index: 6
},
{
	transitionForward: () => {
		thistext ="And the mome raths outgrabe.";
		enctext = "Lfr gax wvwx clgat vngeclzx.";
		add_sent(thistext);
		reset_and_move(thistext, enctext);
	},
	index: 7
},
]

