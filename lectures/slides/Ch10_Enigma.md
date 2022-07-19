---
title: "Enigma"
author: Jed Rembold
date: November 8, 2021
slideNumber: true
theme: "python_monokai"
highlightjs-theme: monokai
width: 1920
height: 1200
transition: slide
hash: true
history: false

---


## Announcements
- Project 3 due tonight!
- Project 4 Guidelines will be posted by the end of today
- Extra Credit PS6 problem posted and will be due next Monday night
- Polling: [rembold-class.ddns.net](http://rembold-class.ddns.net)

## Review Question
::::::cols
::::{.col style='flex-grow:1'}
```{.python style='max-height:800px; font-size:.75em'}
class Symbol(GCompound):
  def __init__(self, col1, col2):
	GCompound.__init__(self)
	A = GOval(-10,-10,20,20)
	A.set_filled(True)
	A.set_color(col1)
	B = GRect(-10,-10,20,20)
	B.set_filled(True)
	B.set_color(col2)

gw = GWindow(100,100)
gw.add(Symbol("red", "blue"))
```

What would be output to the window when the above code is run? You can assume all necessary imports were made initially.
::::

::::col

:::{.hpoll}
#. ![](../images/GCompoundExtensionA.png){width=250px}
#. ![](../images/GCompoundExtensionB.png){width=250px}
#. ![](../images/GCompoundExtensionC.png){width=250px}
#. ![](../images/GCompoundExtensionD.png){width=250px}
:::



::::
::::::


<!--
## Review Question
::::::cols
::::col
What expression below would best fill in the gap in the code to the right?

:::{.poll}
#. `self.wage = wage`
#. `TechJob.__init__(self, wage)`
#. `TechJob.__init__(wage)`
#. `Job.__init__(wage)`
:::

::::

::::{.col style='flex-grow:1'}
```{.python style='max-height:900px; font-size:0.8em;'}
class Job:
	def __init__(self, wage):
		self.wage = wage

class TechJob(Job):
	def __init__(self, wage):
		self.wage = wage
		self.codes = True

class SeniorDev(TechJob):
	def __init__(self, wage, exp):
		# What goes here?
		self.exp = exp
```

::::
::::::
-->


## Alan Turing
::::::cols
::::{.col style='flex-grow: 2;'}
- One of the most important contributors to computer science is Alan Turing, who made critical contributions in the theory of computation, hardware design, and artificial intelligence
- During WW2, Turing headed the mathematics division at Bletchley Park in England, which broke the German Enigma code
- Tragically, Turing committed suicide in 1954 after being convicted on a charge of "gross indecency" as a homosexual
	- Prime Minister Gordon Brown issued a public apology in 2009
::::

::::col
![Alan Turing (1912-1954)](../images/Turing.jpg){width=500px}
::::
::::::

## Cryptography
- The science of encoding messages to keep their contents secret--and the symmetric problem of decoding those messages--is called _cryptography_.
- First recorded cryptographic algorithm attributed to Julius Caesar. The Roman historian Suitonius writes that:

> If [Caesar] had anything confidential to say, he wrote it in cipher, that is, by so changing the order of the letters of the alphabet, that not a word could be made out.

- In a _Caesar Cipher_, each letter in advanced a fixed distance in the alphabet, wrapping around to the start if necessary
	- A +3 Caesar cipher would make the following mappings

\begin{tikzpicture}%%width=80%
[
every node/.style={font = \Large\bf, color = MGreen}
]
\foreach[count = \i] \A/\B in {A/D, B/E, C/F, D/G, E/H, F/I, G/J, H/K, I/L, J/M, K/N, L/O, M/P, N/Q, O/R, P/S, Q/T, R/U, S/V, T/W, U/X, V/Y, W/Z, X/A, Y/B, Z/C} {
	\node (s) at (\i,0) {\A};
	\draw[MBlue,-stealth, very thick] (s) -- +(0,-.75) node[below] {\B};
	}
\end{tikzpicture}

## Letter Substitution Ciphers
- A _letter-substitution cipher_ (informally called a _cryptogram_) is a code in which each letter in the original text is replaced with some other letter.
	- The substitution pattern remains the same throughout the message
	- Any letter can be mapped to any other unused letter, no order is necessary
- One of the more famous cryptograms was written by Edgar Allen Poe in his short story "The Gold Bug"
	- Described in his story how the message could be decoded by mapping the most common letters in the message to the most commonly used letters in the English language


## The Enigma Machine
::::::cols
::::{.col style='flex-grow:.6'}
![Actual Enigma Machine](../images/EnigmaMachinePhoto.png){width=100%}
::::

::::col
![Enigma Diagram](../images/EnigmaDiagram.png){width=100%}
::::
::::::

## {data-background-video="../video/EnigmaD.mp4"}

## {data-background-iframe="https://willamette.edu/~esroberts/cs151/projects/Enigma/index.html"}

## The Enigma Internals
![\ ](../images/EnigmaInternals1.png){width=80%}

## The Enigma Rotors
![\ ](../images/EnigmaInternals2.png){width=80%}

## Operation of the Enigma Machine
- Whenever a letter is typed, the following happens:
	#. The force of the key press advances the fast rotor one position. If the rotor wraps from Z to A, this advances the next rotor by one increment as well.
	#. An electric signal is fed into the wire corresponding to the key, which then flows through seven letter-substitution steps
		- Through the fast rotor from right to left
		- Through the medium rotor from right to left
		- Through the slow rotor from right to left
		- Through the reflector, which turns the signal around
		- Through the slow rotor from left to right
		- Through the medium rotor from left to right
		- Through the fast rotor from left to right and on to the lamp

## Encoding "A" {data-transition="slide-in fade-out"}
![\ ](../images/EnigmaInternals3.png){width=80%}

## Encoding "A" Again{data-transition="fade-in slide-out"}
![\ ](../images/EnigmaInternals4.png){width=80%}

## Project 4 Milestones

:::{style="font-size:.9em;"}

- Project 4 has a few more milestones than past projects, but each is still meant to give you a testable aspect of the program that you can bite off one piece at a time
	- Milestone 1: Create the keyboard
	- Milestone 2: Get mouse responsive keyboard keys
	- Milestone 3: Create the lamp panel
	- Milestone 4: Connect the keyboard to the lamp
	- Milestone 5: Add initial rotors
	- Milestone 6: Implement click actions for rotors
	- Milestone 7: Implement one stage in the encryption
	- Milestone 8: Implement the full encryption path
	- Milestone 9: Make the rotors advance properly each keypress
- Web examples exist for helping you test each step of the process, linked [here](https://willamette.edu/~esroberts/cs151/projects/Enigma/index.html) and in the guide.

:::

## Virtual Enigma Machine Pieces
\begin{tikzpicture}%%width=80%
[
box/.style={draw, MBlue, very thick, rounded corners, inner sep = 10pt, font=\tt\Large},
class/.style={box, fill=MBlue, text=black},
func/.style={box, MGreen, fill=MGreen, text=black},
]
\node[class] (em) at (0,0) {EnigmaMachine};
\node[class, right=of em](ek) {EnigmaKey};
\node[class, right=of ek](el) {EnigmaLamp};
\node[class, right=of el](er) {EnigmaRotor};
\node[class, above=of el](gc) {GCompound};
\draw[line width=5pt, -stealth, MGreen] (ek.north) |- (gc.west);
\draw[line width=5pt, -stealth, MGreen] (el.north) -- (gc.south);
\draw[line width=5pt, -stealth, MGreen] (er.north) |- (gc.east);
\node[func, below=1.5cm of em] (e) {Enigma};
\node[func, right=of e] (ec) {EnigmaConstants};
\end{tikzpicture}

## Who talks to Whom?
- It will be important to maintain an effective separation between the parts of the program responsible for storing state information and parts of the program responsible for updating the graphics window.
	- Failing to maintain this separation is a good way to find yourself in a convoluted mess real quick!
- The `EnigmaMachine` class is the brain of the operation and stores the model for the Enigma machine, serving as a relay point for information flow.
	- The `EnigmaKey` class should not communicate directly with `EnigmaLamp` or `EnigmaRotor`, but instead contact `EnigmaMachine`.
	- `EnigmaMachine` stores the relevant information and then passes on a message to the appropriate `EnigmaLamp` or `EnigmaRotor` object.
