---
title: "What is your type?"
author: Jed Rembold
date: September 8, 2021
slideNumber: true
theme: "python_monokai"
highlightjs-theme: monokai
width: 1920
height: 1200
transition: fade
hash: true
history: false

---


## Announcements
- Problem Set 1 is posted
	- Due at the end of Monday
- I'm working through getting feedback out on PS0. There are a lot of you!
- Small sections happening today or tomorrow!
	- Make sure you show up at the necessary time and place!
- Moving back into the book today, catching information and details from Ch 1 that we haven't yet talked about
- Polling: [rembold-class.ddns.net](http://rembold-class.ddns.net)

## Review Question {data-notes="Solution: C"}
::::::cols
::::col
Karel starts in the empty world shown at one of the marked positions and runs the below code. One of the starting positions will result in an error before the code finishes. Which one?
```{.python style="font-size:0.9em"}
for i in range(3):
	move()
	turn_left()
	for i in range(2):
		if front_is_blocked():
			turn_around()
		move()
	turn_right()
```
::::

::::col
\begin{tikzpicture}%%width=100%
\karelgrid[MGreen]{5}{5}
\karelmark[fill=MYellow]{1}{1}{0}
\node[xshift=-0.5mm] at (1,1) {A};
\karelmark[fill=MOrange]{2}{2}{90}
\node[yshift=-0.5mm] at (2,2) {B};
\karelmark[fill=MBlue]{5}{3}{180}
\node[xshift=0.5mm] at (5,3) {D};
\karelmark[fill=MPurple]{3}{2}{-90}
\node[yshift=0.5mm] at (3,2) {C};

\end{tikzpicture}
::::

::::::



## Data Types
- Generally, the data processed by computers can take on many forms
- A _data type_ defines the common characteristics of some data values that have a certain form or purpose.
	- Ex: a whole number or integer has certain characteristics common to all integers
- A data type has a _domain_, which is the set of all potential values that would belong to that type.
	- Ex: 0,1,2,3,4,5,6,7,...
- A data type has a _set of operations_ that define how those values can be manipulated
	- Ex: You can add two whole numbers (5+2)

## Numeric Types
- Initially, we'll focus on the numeric types
- Python has 3 data types for representing numbers:
	- `int`{.python} for integers and whole numbers

		```python
		1, 2, 3, 10, 1001010101, -231
		```

	- `float`{.python} for numbers containing a decimal point

		```python
		1.23, 3.14, 10.001, 0.0, -8.23
		```

	- `complex`{.python} for numbers with an imaginary component (which we won't deal with)

---

## Expressions
- Python describes computation using _arithmetic expressions_, which consist of _terms_ joined by _operators_
	- Very similar to how a logical English sentence has nouns connected by verbs
- A term in an expression can be:
	- an explicit numeric value (called a literal) like 1 or 3.14
	- a variable name serving as a placeholder to a value
	- a value resulting from the output of a function call
	- another expression enclosed in parentheses
- Operators are mostly the common ones found from arithmetic, but with a few extras, as we'll see on the next slide
- The result of an expression will have a data type that generally depends on both the operation done and the input data types

---

## Integer and Float Operations
- `i + j`  the _sum_ of `i` and `j`[]{.orange}
- `i - j`  the _difference_ between `i` and `j`[]{.orange}
- `i * j`  the _product_ of `i` and `j`[]{.orange}
- `i // j`  the _floor division_ of `i` by `j`[]{.orange}
- `i / j`  the _division_ of `i` by `j`[†]{.orange}
- `i % j`  the _remainder_ when `i` is divided by `j`[]{.orange}
- `i ** j`  `i` to the _power_ of `j`[]{.orange}

<br>
<hr>
<br>
[]{.orange} -- Returns `int` if both `i` and `j` are integers, `float` otherwise

[†]{.orange} -- Returns `float` always

## Order of Operations
- Basic order of operations applies just like in math!
- Operations in parentheses done first
- Without parentheses, order of operations proceeds as:
	- `**` (exponents)
	- `-n` (negative numbers)
	- `*`, `/`, `//`, `%`, executed from left to right
	- `+` and `-`, executed from left to right


## Understanding Check {data-notes="Solution: 15"}
What is the value of the below expression?

``` {.python}
1 * 2 * 3 + (4 + 5) % 6 + (7 * 8) // 9
```
:::{.poll}
#. 15
#. 18.22
#. 42
#. 83
:::


## Tis Variable 
- One of the terms that can appear in expressions is what we term a variable
- A _variable_ is a placeholder or nametag for a value that can be updated as the program progresses
- Envision as a named box capable of storing a value
		\begin{tikzpicture}%%width=20%, alt='Will this work?, data-id=box'
			\useasboundingbox (-2,-1) rectangle (2,1.5);
			\node[draw, very thick, MGreen, minimum width=3cm, minimum height=1.5cm, font=\LARGE](box) {42};
			\node[MGreen, anchor=south west, inner sep=0pt, yshift=1mm] at (box.north west) {Name};
		\end{tikzpicture}
- Each variable has the following attributes:
	- A _name_: which enables you to tell variables apart
	- A _value_: which represents the current contents of the variable
- A variable's name is fixed, but the value can change whenever you _assign_ a new value to the variable

## Making Assignments
- You create a variable by assigning it a value with Python's _assignment statement_ `=`:
```python
variable_name = expression
```
- Python first computes the value of the righthand side of the equals and then assigns to the name on the left
	- The same variable can appear on both sides of the equals!
	```python
	total = total + value
	```

## Ephemeral Variables
- When you assign a new value to a variable, the old value is lost
```{.idle style='font-size:0.8em'}
>>> A = 10
>>> print(A)
10
>>> A = A + 5
>>> print(A)
15
```
- Variables defined in terms of others do **not** get automatically updated
```{.idle style="font-size:0.8em"}
>>> A = 10
>>> B = A + 2
>>> A = 8
>>> print(B)
12
```

## The Power of Names 
- Names for variables, functions, and classes are called _identifiers_
- Composed of letters, numbers and underscores, but **can not start with a number**
- A variety of different conventions to mark word boundaries:
	- _Snake case_ uses underscores: `this_is_amazing`
	- _Camel case_ uses uppercase: `thisIsAmazing`
- We will aim to follow the following conventions:
	- Variable and function names will use snake case
	- Constant variables will use all uppercase and underscores: `MAX_WIDTH`
	- Class names will use camel case and begin with a capital letter
- Capitalization matters! `radius` and `Radius` are different variable names!
- **Pick meaningful variable names!**

## Shorthand and Multiple
- It is very common to want to adjust an existing variable
```python
balance = balance + deposit
```
- Python gives you a shorter expression to describe this relationship:
```python
balance += deposit
```
- You can do this with any operation (op) following the general form:
```python
variable op= expression
```
- You can name multiple variables at once by separating with commas

	```python
	A, B, C = 1, 2, 3
	``` 
	- All the expressions on the right are computed before being assigned to the left variables

## Understanding Check! {data-notes="Solution: 40"}
What is the final printed value of `A` in the code below?
```idle
>>> A = 10
>>> B = 4
>>> C = A * B
>>> A -= B
>>> A, B, C = C, A, B
>>> print(A)
??
```
:::{.poll}
#. 4
#. 10
#. 30
#. 40
:::

## What is your Function?
- As discussed in the context of Karel, a _function_ is a sequence of commands that have been collected together and given a name.
- Unlike in Karel though, functions typically go beyond that and can have inputs and outputs

\begin{tikzpicture}%%width=70%
\draw[very thick, rounded corners, MGreen] (0,0) rectangle +(3,2);
\node[MGreen, anchor=south west] at (0,2) {Function};
\node[draw, very thick, MBlue, rounded corners, minimum size=1cm] at (1.5,1) {Contents};
\draw[very thick, MYellow, -stealth] (-2,1) -- +(2.25,0) node[above, pos=.25] {Inputs};
\draw[very thick, MRed, -stealth] (2.75,1) -- +(2.25,0) node[above, pos=.75] {Outputs};
\end{tikzpicture}

## Writing your own functions
- The general form of a function definition looks like:

	``` {.python}
	def name(parameter_list):
		#statements in function body
	```
	- `name` is your chosen name for the function
	- `parameter_list`{.no-highlight} is a comma-separated list of **variable names** that will hold each input value
- You can return or output a value from the function by including a return statement

	```python
	return expression
	```
	- `expression` is the value you want to return or output
	- If no `return` statement is included, Python will by default return `None`


## Simple function examples
- Convert Fahrenheit temperatures to their Celsius equivalent

	```python
	def f_to_c(f):
		return 5 / 9 * (f - 32)
	```
	- Using the function:

		```python
		print(f_to_c(45))
		```
- Computes the volume of a cylinder of height `h` and radius `r`

	```python
	def cylinder_volume(r, h):
		return 3.14159 * r**2 * h
	```
	- Using the function:

		```python
		print(cylinder_volume(2,10))
		```

<!-- Didn't get past this point in class -->



## Built-ins
- All modern languages include a collection of pre-defined functions for convenience
- In Python, common build-in functions that operate on numbers include:

Function | Description
--- | ---
`abs(x)` | The absolute value of x
`max(x,y,...)` | The largest of all the arguments
`min(x,y,...)` | The smallest of all the arguments
`round(x)` | The value of x rounded to the nearest integer
`int(x)` | The value of x truncated to an integer
`float(x)` | The value of x as a decimal

<!--
## Running a Program
- Python programs specify what part of the code is supposed to be when a program is run using a few special lines at the end of the program

	```python
	if __name__ == '__main__':
		function_to_run()
	```
	- `function_to_run` is the name of whatever function you want to execute when the program is run
- Patterns of this sort are commonly called _boilerplate_
	- Less important to fully understand all the pieces of it now
	- Is important to understand what it is doing and how to implement it correctly

## Visiting the library(ies)
- A huge strength of Python is that it offers a very large number of code collections called _libraries_
	- Can save you the effort from writing that code yourself!
- Requires you to _import_ that library, which can take several different forms
	- Most common is to use `import` to grab everything in a library

		```python
		import math
		```
		- You must then access any function in that library using its _fully qualified name_, which includes the library name (`var = math.sqrt(4)`)
	- Can also use `from ... import` to grab specific functions from the library

		```python
		from math import sqrt
		```
		- You do not need to use the library name then when you call it (`var = sqrt(4)`)


## Useful `math` definitions

Code | Description
--- | ---
`math.pi` | The mathematical constant $\pi$
`math.e` | The mathematical constant $e$
`math.sqrt(x)` | The square root of x
`math.log(x)` | The natural logarithm of x
`math.log10(x)` | The base 10 logarithm of x
`math.sin(x)` | The sine of x in radians
`math.cos(x)` | The cosine of x in radians
`math.asin(x)` | The arcsin of x
`math.degrees(x)` | Converts from radians to degrees
`math.radians(x)` | Converts from degrees to radians




## An adding program

``` {.python style="max-height: 100%"}
# File: AddTwoIntegers.py

"""
This program adds two integers entered by the user.
"""

def add_two_integers():
	print("This program adds two integers.")
	n1 = int(input("Enter n1? "))
	n2 = int(input("Enter n2? "))
	total = n1 + n2
	print("The sum is", total)

# Startup boilerplate
if __name__ == '__main__':
	add_two_integers()
```
-->
