---
title: "My first slides"
author: Jed Rembold
date: Friday, August 7, 2020
slideNumber: true
theme: solarized
highlightjs-theme: nord
width: 1920
height: 1080
transition: fade
---


## Announcements
- Welcome to CS-151: Intro to Programming with Python!
- Things to do:
	- Access the course webpage at [http://www.willamette.edu/~jjrembold/classes/cs151/cs151/](http://www.willamette.edu/~jjrembold/classes/cs151/cs151/)
		- Also link to from WISE
	- Read over the full syllabus
	- Get yourself a copy of the book
	- Make sure you can find and access the class forum on Discord
	- Bring phone or computer for polling questions in the future
- Homework
	- HW1 will be posted later this week
	- Will work in lab today to make sure you are setup with everything you need and have been introduced to the process

---

## Slide header 2

:::: {.columns}

::: {.col .theorem}
We will use a theorem

$$\sum_i^{10} 5i^2 + 4$$
:::

::: {.col}
- here I will
- include some more things
- that I want
:::
::::

---

## Code Test!
Here we have some code:

``` {.python-repl data-line-numbers="-|1-3|4,5|6-7|9-15|16-22"}
>>> A = 10
>>> A
10
>>> int(23.45)
23
>>> type(A)
int
>>> # this is a comment! 123
>>> for i in range(5):
		print(i)
0
1
2
3
4
>>> for i in range(5):
		print(i)
0
1
2
3
4
>>> print("yay this works!")
yay this works!
```

:::notes
Here I should talk about some things
:::

---

## Code Animation { data-auto-animate=""}
``` {.python-repl .numberLines data-id="code-animation"}
>>> print(10+3)
```

---

## Code Animation { data-auto-animate=""}
``` {.python-repl .numberLines data-id="code-animation"}
>>> print(10+3)
13
```

---

## Extra inline test
What about if I want code inline like this: `print(10)`{.python}? How can that work?
