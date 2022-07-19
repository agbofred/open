---
title: "Scoping out Functions"
author: Jed Rembold
date: September 20, 2021
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
- I'm still working through the PS1 feedback!
- Problem Set 2 is due tonight at midnight
- Problem Set 3 will be posted tomorrow, and is the last PS before the first project!
- No lab today! I'll be in my office during those hours if you have questions!
- Polling: [rembold-class.ddns.net](http://rembold-class.ddns.net)


## Review Question {data-notes="Answer: None of the above, as nothing is returned"}
:::: cols
::: col
When the final line of the code to the right is run, what type of variable is `x`?

:::::{.poll}
#. `integer`{.no-highlight}
#. `float`{.no-highlight}
#. `string`{.no-highlight}
#. None of the above
:::::
:::

::: col
```python
def func(A):
	m = str(A)
	n = m + m + m
	print(n)

y = 5.0
x = func(y)
print(type(x))
```
:::
::::

## Parameter Purposes
- Often functions need some sort of outside input in order to be useful
- It is necessary for them to know enough details so that they can carry out the requested task, but not so many that the function becomes annoying to use
	- Imagine you were trying to accomplish the task yourself!
	- What is the minimum amount of information you would need to know?
- The minimum necessary information needed for the function to accomplish its task is generally the information conveyed in the parameters
- There is always a balance
	- More parameters makes your function more general, to be used elsewhere
	- More parameters are tedious and potentially error prone to enter if unnecessary


## Jockeying for Position
- So far we have used a positional way to assign arguments to parameters
	- First argument to first parameter, second to second parameter, etc

	```python-repl
	>>> def func( first, second, third ):
			print( first, second, third )
	>>> func(1,2,3)
	1 2 3
	>>> func(2,6,4)
	2 6 4
	```

## The Word is Key
- Arguments may also be specified by a _keyword_, in which the caller precedes the argument with a parameter name and equals sign
- Always stores the argument value in the specified parameter

```python-repl
>>>  def func( first, second, third ):
		print( first, second, third )
>>>  func(third=4, first=2, second=6)
2 6 4
```
- Keyword arguments can appear in any order
- **All keyword arguments must come after any positional arguments!**

## Default Slide Title
- Python allows you to specify a default value for a parameter, which is will use if one is not directly supplied
- Do so by adding an equals sign and a value after the parameter name
	- So you define default values when you define the function
```python
def introduction(name='Jed', age=36):
	print('My name is ', name, ' and I am ', age)
```
- If providing any parameters after a default parameter, you must indicate them through keywords
```{.python-repl style="max-height: 300px"}
>>> introduction()
My name is Jed and I am 36
>>> introduction('Bob', 25)
My name is Bob and I am 25
>>> introduction('Larry')
My name is Larry and I am 36
>>> introduction(age=68)
My name is Jed and I am 68
```


## Returning Graphics
- You can `return` any type of variable from a function, including `GObject` graphical objects
- Can be useful to write simple functions that bundle together common tasks
- For instance, to create a filled circle centered at some location:
```python
def make_filled_circ(x_cent, y_cent, radius, color='black'):
	circle = GOval(
				  x_cent-radius, y_cent-radius, 
				  2*radius, 2*radius
				  )
	circle.set_color(color)
	circle.set_filled(True)
	return circle
```

## Poll!
:::::cols
:::col
```python
def Vegas(x):
	y = 2
	for i in range(5):
		x += y
	return x

x = 3
z = Vegas(x)
print('z =', z)
print('x =', x)
```
:::
:::col
Consider the code to the left. When the final value of `x` is printed, what will its value be?

::::poll
#. 3
#. 5
#. 13
#. `None`{.no-highlight}
::::
:::
:::::


## Stacks and Scopes
- Functions really do work as self-contained little boxes or environments!
	- "What happens in `Vegas` stays in `Vegas`...
- Whenever Python enters a new function, you can envision that it gets out a fresh new board to keep track of that function's variables
	- What happens on that board does NOT affect whatever might have been defined or happened on other boards
	- Each board is commonly called a _stack frame_
- When Python finishes with a function and returns, the board or stack frame for that function is **thrown away**!


## Taking a Walk through Vegas
We'll annotate the stack frames by hand as the earlier code runs:

```{.python data-line-numbers=1-11|1|7|8|2|3|4|3|4|3|4|3|4|3|4|3|5|9|10 style="max-height:800px"}
def Vegas(x):
	y = 2
	for i in range(5):
		x += y
	return x

x = 3
z = Vegas(x)
print('z =', z)
print('x =', x)
```

## Summary of a Function Call 

:::{.incremental style='font-size:.8em'}
#. Evaluate the arguments in the context of the caller
#. Reserve space for the function in a new stack frame
#. Copy each positional argument to the corresponding parameter variable
#. Copy each keyword argument to the parameter with that name
#. For parameters with default values, if not already assigned, assign those values
#. Evaluate statements in the function body, using current stack frame to look up values of local variables
#. On encountering a `return`, compute the return value and substitute that value in place of the function call
#. Remove the stack frame
#. Return to the caller, continuing from just after the function call
:::

## Understanding Check {data-notes="Answer is 27"}

::::::cols
::::col
Riddle me this. What would be the printed value of z at the end of the code to the right?

:::{.poll}
#. 27
#. 25
#. 19
#. None of the above
:::

::::

::::col
```python
def f(x,y):
	z = (x + 3) ** 2
	return y + z

x = 1
z = x + f(y=x,x=2)
print(z)

```

::::
::::::

## Name Resolution and Scope
- When Python encounters a variable name in a program, it looks for where the variable was defined in an expanding search:
	1. **Local** - The local context is all the variables defined within the current function. This includes variables appearing as a parameter!
	2. **Enclosing** - The enclosing context consists of the names defined in a function enclosing the current one.
	3. **Global** - The global context consists of names defined outside of any function or imported into the current module.
	4. **Built-in** - The last place Python looks is in the names of any built-in functions, like `abs`, `str`, `print`, etc.
- The part of a program in which a name is defined in called its _scope_

## Scoping Example
```{.python style='max-height:900px'}
def func1(x,y):
	return z + func2(x,y)

def func2(x,y):
	def func3(x):
		return (y + x) ** 2

	z = x - func3(y)
	return z - y


z = 1
print(func1(2,z))
```

## Local Variables
- In Python, assigning any value to a variable means that the variable is assumed to be _local_
	- This generally makes sense, as you would not want more specific functions overriding variables in other areas
- Can lead to issues though:
```{.python .badcode}
def increment():
	x = x + 1

x = 0
increment()
```
- There are a few ways to address this, but we'll focus on one in particular when it comes to PGL



<!--

## Libraries and Interfaces
::::cols
:::col
- Modern programming depends on the use of libraries. When writing a program, you usually write only a fraction of the code.
- Libraries can be viewed from two perspectives:
	- Code that uses a library is called a _client_.
	- Code for the library itself is called the _implementation_
- The point where the client and the implementation meet is called the _interface_ and serves as both a barrier and a communication channel
:::
:::col

![](../images/Interface.png)

:::
::::


## Nondeterministic Programming
- Before writing our own library, helps to have more examples than just `math`
- Let's look at the built-in `random` library, which lets us simulate random processes
- Programs that involve random processes that cannot be predicted in advance are said to be _nondeterministic_
- Nondeterministic behavior is essential to many applications. 
	- Many games would not be enjoyable if they behaved the exact same way every playthrough
	- Important practical uses in simulations, computer security, and algorithm research


## Important Functions in `random`

:::{style='font-size: 80%'}

- Random Integers

|                          |                                                             |
| :---                     | :------                                                     |
| `randint(minv, maxv)`    | Returns an integer between minv and maxv, inclusive         |
| `randrange(limit)`       | Returns an integer from 0 up to but not including limit     |
| `randrange(start,limit)` | Returns an integer from start up to but not including limit |

- Random Floats

|                       |                                               |
| :---                  | :---                                          |
| `random()`            | Returns a random number between 0 and 1       |
| `uniform(minv, maxv)` | Returns a random number between minv and maxv |

- Random from lists

|                     |                                              |
| :---                | :---                                         |
| `choice(a_list)`    | Returns a random element from `a_list`       |
| `sample(a_list, k)` | Returns a list of `k` elements from `a_list` |
| `shuffle(a_list)`   | Randomly reorders the elements of `a_list`   |

:::

-->
