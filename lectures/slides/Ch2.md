---
title: 'True and "True"'
author: Jed Rembold
date: September 10, 2021
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
- Problem Set 1 due on Monday night!
	- Feel free to email, direct message me on Discord, or post questions on Campuswire over the weekend if you get stuck on something
	- I'm still making it through giving feedback on PS0, so keep an eye out for that, if you haven't already received it
- Sections
	- Hopefully everyone made it to their sections
	- Be aware that all the section leaders have only had experience doing this remotely in the past, so it may take some adjustments to in-person
- Class Discord server invite went out on Wednesday evening
	- Section leaders were interested in having this to make it easier to answer your questions or help out remotely
- Polling: [rembold-class.ddns.net](http://rembold-class.ddns.net)

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
:::{.hpoll}
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

<!--
## Review Question
::::::cols
::::col
Examining the code to the right, what is the output value if I evaluate the expression `func2(10)`?


:::{.poll}
#. 6
#. 9
#. 16
#. 19
:::

::::

::::col
```python
def func1(x):
	return 3 + x

def func2(y):
	A = func1(y+1)
	A -= 5
	return A + y
```
::::
::::::
-->


## Built-ins
- All modern languages include a collection of pre-defined functions for convenience
- In Python, common build-in functions that operate on **numbers** include:

Function | Description
--- | ---
`abs(x)` | The absolute value of x
`max(x,y,...)` | The largest of all the arguments
`min(x,y,...)` | The smallest of all the arguments
`round(x)` | The value of x rounded to the nearest integer
`int(x)` | The value of x truncated to an integer
`float(x)` | The value of x as a decimal


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


## String Theory
- Would be nice to work with more interesting data than just numbers
- Everything internally is represented as sequences of binary numbers, but more useful to think abstractly about concepts initially
- First non-numeric data type to look at will be **strings**
	- Domain is all _sequences_ of characters
		- A single string is often comprised of multiple characters
	- Indicated in Python with pairs of quotes (single or double)

	```python
	"This is a great string!"
	'And this is also a string!'
	```

## String Functions
- Python has several built-in functions that are useful when working with strings

Function | Description
---|---
`len(s)` | Gets the number of characters in `s`
`str(x)` | Converts the value of `x` to a string
`int(s)` | Attempts to convert `s` to an integer
`float(s)` | Attempts to convert `s` to a float
`print(...)` | Prints all arguments separated by spaces
`input(prompt)` | Shows the user `prompt` and then reads in a typed string


## Stringy Operations
- Initially we will focus just on _concatenating_ strings, or combining them end to end
	- Many more operations we'll look at later in Ch 6
- Concatenate in Python using the `+` operator:

	```idle
	>>> print("ABC" + "DEF")
	ABCDEF
	```
- `+` with numbers gets you addition, `+` with strings gets you concatenation
- If you have mixed types and want concatenation, need to convert all to strings

	```idle
	>>> print("Catch" + str(-22))
	Catch-22
	```

## Boolean Expressions
- Python defines two types of operators that work with Boolean data: _relational operators_ and _logical operators_
- Relational operators compare values of other types and produce a `True`/`False` result:

	---- ----------------- - - - ---- --------------------
	`==` Equals                  `!=` Not equals
	 `<` Less than               `<=` Less than or equal too
	 `>` Greater than            `>=` Greater than or equal to
	---- ----------------- - - - ---- --------------------
- Be careful! `==` _compares_ two booleans. A single `=` _assigns_ a variable. The odds are high you'll use one when you meant the other at least once this semester!


## The Vulcan Way
- Logical operators act on Boolean pairings

	Operator | Description
	---|---
	`A and B` | True if both terms True, False otherwise
	`A or B` | True if _any_ term is True, False otherwise
	`not A` | True if A False, False if A True (opposite)

::: incremental
- Order of operations follows parentheses and then proceeds left to right
- Careful that `or` is still `True` if both options are `True` which is a little different than common English use
- Similarly, careful with combining `not` with `and` and `or`
	- "Not A or B" in common English is not the same as `not A or B`
:::

## Understanding Check
What is the final printed value in the code below?

:::: cols
::: col
:::::{.poll}
#. `True`
#. `False`
#. `"4Quiz"`
#. This would give an error
:::::
:::

::: {.col style="flex-grow:2;"}
```python
A = 10
B = 4
C = "Quiz"
A *= len(C)
if A > 40 and C != "C":
	print(str(B)+C)
else:
	print(A < B or not (C == "C"))

```
:::
::::

## Shorting the Circuit
- Python evaluates _and_ and _or_ operators using a strategy called _short-circuit mode_
- Only evaluates the right operand if it actually needs to
	- Example: if `n=0`, then the `x % n == 0` is never actually checked in the statement

		```python
		n != 0 and x % n == 0
		```

		since `n != 0` already is `False` and `False and ` _anything_ is always `False`
- Can use short-circuit to prevent errors: the above `x % n == 0` statement would have erred out if `n=0`




## Sentinels
- Many programs in programming can be approached similarly by using a particular _idiom_ or _pattern_
- A common one with repetition is to use a variable to keep track of the loop state until something particular happens (the sentinel is triggered)
<br><br>

```python
finished = False
while not finished:
	line = input("Enter a number: ")
	if line == "":
		finished = True
	else:
		print(line)
```


## Understanding Check
::::: cols

:::: col
```python
x = 7
y = 0
while x >= 0:
	y += x
	x -= 2
print(y)
```
::::

:::: col
What will the printed output of the code to the left?

:::{.poll}
#. 15
#. 16
#. 28
#. Infinite Loop
:::
::::

:::::


## The `range()` iterable
- Need an easy way to produce or describe a range of numeric values
- The built-in `range()` function handles this and produces the needed iterable object
- Takes 1, 2, or 3 arguments:
	- Start (default 0): where to start the sequence at
	- Stop (mandatory): the sequence ends just _below_ this value (does not include it!)
	- Step (default 1): what value the sequence counts by
<br><br>

:::{.block name='Warning!'}
Be careful, the `range` function will stop one step _before_ the final stop value.
:::


## For ranging examples
- Providing just a stop argument:

	```python
	for n in range(5):
		print(n)
	```
- Providing a start and stop:

	```python
	for n in range(1,11):
		print(n)
	```
- Providing a start, stop, and step:

	```python
	for n in range(10,0,-1):
		print(n)
	```


## Iterating over sequences
- We can also use a `for` loop to iterate directly over a sequence of values
- Python supports many different types of sequences, but thus far we only know about one: strings!
	- Recall strings are just a sequence of individual characters
- We can loop through a string to examine each individual character
- Example looping through to count occurrences of a given letter:

	```python
	def count_letters(letter, string):
		count = 0
		for character in string:
			if character == letter:
				count += 1
		return count
	```
