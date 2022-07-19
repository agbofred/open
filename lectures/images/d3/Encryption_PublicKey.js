var rtext = []
var stext = []

var svg = d3.select("body").append("svg")
	.attr("viewBox", "-120 -50 240 250")
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
}

function add_sent(new_text) {
	stext.push(new_text)

	var size = 8
	svg.selectAll('#stext').data(stext).enter()
		.append("text")
		.text(d => d)
		.attr("x", -80)
		.attr("y", (d,i) => 30+(size+1)*i)
		.attr('font-size', size)
		//.attr('text-anchor', 'middle')
		.attr("id", "stext")
}

function make_key(text, x, y) {
	var width = 10;
	var height= 20;

	svg.append("svg:image")
		.attr("xlink:href", "../key.png")
		.attr("x", -80-width/2)
		.attr("y", 0-height)
		.attr("width", width)
		.attr("height", height)
		.attr("opacity", 0)
		.attr("id", "key"+"-"+text)
		.transition()
		.duration(1000)
		.attr("x", x-width/2)
		.attr("y", y-height)
		.attr("opacity", 1)

	svg.append("text")
		.attr("x", -80)
		.attr("y", -10)
		.text(text)
		.attr("font-size", 5)
		.attr("fill", Blue)
		.attr("text-anchor", "middle")
		.attr("opacity", 0)
		.attr("id", "key-text"+"-"+text)
		.transition()
		.duration(1000)
		.attr("x", x)
		.attr("y", y-height)
		.attr("opacity", 1)
}

function move_key(name, x, y) {
	svg.selectAll("#key-"+name)
		.transition()
		.duration(2000)
		.attr("x", x-5)
		.attr("y", y-20)

	svg.selectAll("#key-text-"+name)
		.transition()
		.duration(2000)
		.attr("x", x)
		.attr("y", y-20)
}


var _transitions = [
{
	transitionForward: () => {
		thistext ="1. Bob generates a pair of keys labeled D and E";
		add_sent(thistext);
		make_key("D", -65, 20);
		make_key("E", -55, 20);
	},
	index: 1
},
{
	transitionForward: () => {
		thistext ="2. Bob publishes key E as his public key";
		add_sent(thistext);
		move_key("E", 50, 10);

	},
	index: 2
},
{
	transitionForward: () => {
		thistext ="3. Bob keeps D hidden as his private key";
		add_sent(thistext);
		move_key("D", -50, 10);

	},
	index: 3
},
{
	transitionForward: () => {
		thistext = "4. Alice uses key E to encrypt a message to Bob";
		add_sent(thistext);
		reset_and_move("Secret Message", "101001010110101001010101101010");

	},
	index: 4
},
{
	transitionForward: () => {
		thistext ="5. Only someone with key D can decipher the message";
		add_sent(thistext);
	},
	index: 5
},
]

