---
title: "A Graphical Hierarchy"
author: Jed Rembold
date: September 15, 2021
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
- Problem Set 2 released!
	- You should be good to go on the first 2 problems
	- We'll have most of the tools for the third problem after today
- Small sections meeting today or tomorrow!
- CS Tea tomorrow!
	- 11:30am out on the Ford patio
	- Pizza!!
	- Information on DS and CS going forward at Willamette
- Polling: [rembold-class.ddns.net](http://rembold-class.ddns.net)

## Review Question {data-notes="Answer is B, as it would not print the 0"}
Which of the below blocks of code would print something different than the others?

::::: cols

:::: col
:::{.block name=A}
```python
for n in range(10):
	if n % 2 == 0:
		print(n)
```
:::
:::{.block name=B}
```python
for i in range(0,10,2):
	if i > 0:
		print(i)
```
:::
::::

:::: col
:::{.block name=C}
```python
for j in range(0,20,4):
	L = j // 2
	print(L)

```
:::
:::{.block name=D}
```python
for k in range(0,10):
	if not k % 2 > 0:
		print(k)
```
:::
::::
:::::

## A quick regression
::::::cols
::::col
- Karel could only use `if` and `else`
- Python also supports as `elif` statement
- Let's you chain together multiple mutually exclusive condition checks
- You can include as many `elif` chained statements as you want
::::

::::col
```{.python style='max-height:900px; font-size:0.75em'}
if condition_1:
	# Run this code if 
	# condition 1 is true
elif condition_2:
	# This code runs if 
	# condition 1 is false
	# but condition 2 is true
elif condition_3:
	# Runs if both condition 1
	# and 2 fail but condition
	# 3 is true
else:
	# This code runs if 
	# all above conditions 
	# fail
```

::::
::::::

## The Portable Graphics Library
- Built atop Tkinter
- The library (`pgl.py`) is available on the website
	- Put it in the same folder as your code, and then you can import it
- Operates on the idea of a collage or cork-board

![Test](../images/CorkBoard.svg)

- Note that newer objects can obscure older objects. This layering arrangement is called the _stacking order_.


## The Pieces
- At its simplest then, we have two main parts:
	- The window (or felt-board/cork-board)
		- Created with the `GWindow` function
		- Takes two arguments: a width and a height in pixels
	- The contents
		- A wide assortment of shapes and lines that can be added to the scene
		- Control over where they are placed, how large they are, what color they are, etc


## Blue Rectangle!
```{.python data-line-numbers="1|3,4|6|7|8|9|10|11"}
from pgl import GWindow, GRect

GW_WIDTH = 500
GW_HEIGHT = 200

gw = GWindow(GW_WIDTH, GW_HEIGHT)
rect = GRect(150, 50 ,200, 100)
rect.set_color("Blue")
rect.set_filled(True)
gw.add(rect)
```


## The Coordinate System
![PGL Coordinates](../images/pgl_coordinates.svg)

- Positions and distances on the screen are measured in terms of pixels
- The location of the origin and orientation of the y-axis are **different from math**!
	- Origin is in the upper left instead of lower left
	- Y-values increase as you move downwards

## Other Simple Objects
Functions to create simple geometric objects:
<br>

- Rectangles!
	- `GRect( x, y, width, height )`
	- Creates a rectangle whose upper left corner is at (x,y) of the specified size
- Circles/Ovals!
	- `GOval( x, y, width, height )`
	- Creates an oval that fits inside the rectangle with the same dimensions
	- Placement based on the upper left corner of that enclosing rectangle
- Lines!
	- `GLine( x1, y1, x2, y2 )`
	- Creates a line extending from (x1, y1) to (x2, y2)

## Understanding Check
Which of the below images would be produced by the following code?
```python
gw = GWindow(200,200)
for c in range(0,10):
    for r in range(0,10):
        rect = GRect(20*c,20*r,20,20)
        if (r+c) % 2 != 0:
            rect.set_filled(True)
    gw.add(rect)
```

:::cols

::::col
![A](../images/PGL_Review_1.png){width=80%}
::::
::::col
![B](../images/PGL_Review_2.png){width=80%}
::::
::::col
![C](../images/PGL_Review_3.png){width=80%}
::::
::::col
![D](../images/PGL_Review_4.png){width=80%}
::::

:::


## Classification
::::cols
:::col
- In the mid-18th century, Scandinavian botanist Carl Linnaeus revolutionized the field of biology by developing a new system for classifying plants and animals in a way that revealed their structural relationships.
- Recognized that organisms fit into a hierarchy in which the placement of individual species reflects their anatomical similarities.
- Paved the way for Darwin's theory of evolution a century later
:::
:::col
![Carl Linnaeus](../images/Carl_Linneaus.jpg){width=70%}
:::
::::


## Biological Hierarchy
![](../images/animal_hierarchy.svg)


## Instance vs Pattern
- Important to distinguish between a class of object and a specific instance of that class
	- Iridomyrmex purpureus is a class of ant, not an individual ant
	- There can be many individual ants, all sharing the same class
- Each ant is said to be an _instance_ of a particular class
- An individual ant belongs to a species class of purpureus, family of Formicidae, Phylum of Arthropoda, etc


## The `GObject` Hierarchy
- The types of graphical objects form a hierarchy:

![](../images/GObject_Hierarchy.svg)

- The `GObject` class represents the collection of all graphical objects
- The `GFillableObject` class represents those that have a fillable interior


## Interacting with the `GWindow`
- We've already shown creation:

```python
gw = GWindow(width, height)
```
- You have several more operations that you can apply to the `GWindow` object:

-------------------------------------- -------------------------------------
       `gw.add(object)`{.no-highlight} Adds an object to the window
 `gw.add(object, x, y)`{.no-highlight} Adds an object to the window after moving it to (x,y)
    `gw.remove(object)`{.no-highlight} Removes an object from the window
       `gw.get_width()`{.no-highlight} Returns the width of the graphics window in pixels
      `gw.get_height()`{.no-highlight} Returns the height of the graphics window in pixels
-------------------------------------- -------------------------------------


## Interacting with `GObject`s
- The following operations apply to all GObjects,  where `object`{.no-highlight} is the name of any specific instance.

---------------------------------------- ----------------------------
         `object.get_x()`{.no-highlight} Returns the x coordinate of this object
         `object.get_y()`{.no-highlight} Returns the y coordinate of this object
     `object.get_width()`{.no-highlight} Returns the width of this object
    `object.get_height()`{.no-highlight} Returns the height of this object
`object.set_color(color)`{.no-highlight} Sets the color of the object to the specified color
---------------------------------------- ----------------------------

- All coordinates and distances are measured in pixels


## Interacting with `GFillableObject`s
- Fillable GObjects have a smaller subset of commands that also apply to them.
- Initially the only fillable objects available to you are rectangles and ovals

--------------------------------------------- ----------------------------
     `object.set_filled(bool)`{.no-highlight} Sets the fill state of the object
`object.set_fill_color(color)`{.no-highlight} Sets the color to be used to fill the interior, otherwise same as the outer line
     `object.get_fill_color()`{.no-highlight} Gets the current color used to display the object interior
          `object.is_filled()`{.no-highlight} Returns True or False depending on whether the object is currently filled
--------------------------------------------- ----------------------------

## Smile!
::::cols
:::{.col style="flex-grow:1.5"}

```python
gw = GWindow(400, 400)

head = GOval(20, 20, 360, 360)
head.set_fill_color("yellow")
head.set_filled(True)
gw.add(head)

reye = GOval(110, 100, 40, 40)
reye.set_filled(True)
gw.add(reye)

leye = GOval(250, 100, 40, 40)
leye.set_filled(True)
gw.add(leye)

mouth = GLine(150, 250, 250, 250)
mouth.set_line_width(5)
gw.add(mouth)
```
:::
:::col

![\ ](../images/smile_face.png){width=80%}

:::
::::

## Label It!
- Sometimes you need to add some text to the window
- Can display any string using `GLabel` using the following format:

```python
msg = GLabel(string_to_add, x_location, y_location)
```
- Here `string_to_add` is the text you want to display, and `x_location` and `y_location` are the (x,y) coordinates of where you want to place the string


## Label Geometry
- The `GLabel` class relies on some geometrical concepts that are derived from classical typesetting
	- The _baseline_ is the imaginary line on which the characters rest
	- The _origin_ is the point on the baseline at which the text begins
	- The _width_ is the horizontal distance from the origin to the end of the text
	- The _height_ of the font is the distance between adjacent baselines
	- The _ascent_ is the distance the characters rise above the baseline
	- The _descent_ is the distance the characters drop below the baseline
<br><br>

![\ ](../images/GLabel_Geometry.svg)


## Interacting with Labels
- A `GLabel` has several special methods that you can use to interact with it
	- You can use: `get_width()`, `get_height()`, `get_ascent()`, and `get_descent()` methods to obtain the geometric properties
	- You can set a special font for the label using
	
	```python
	labelname.set_font(font)
	```
	- The font is a string comprised of the following elements:
		- The _font style_, which is usually blank or `italic`
		- The _font weight_, which is usually blank or `bold`
		- The _font size_, which is a number followed by the units (typically `pt`, `px`, or `em`)
		- The _font family_, which is the name of the font. Because what fonts are available can differ from machine to machine, the family is usually a sequence of fonts separated by commas
		- The font family sequence usually ends with a standard family (`serif`, `sans-serif`, or `monospace`) to ensure that the label can display

## Label Example
```python
gw = GWindow(500, 200)
msg = GLabel("hello world!", 50, 100)
msg.set_font("italic bold 80px 'times new roman'")
gw.add(msg)
```
<br><br>

![A bold new (friendly) world](../images/hello_world_font.png){width=50%}


## Centering a `GLabel`
- Frequently useful to center within the window or some shape
- To center properly, you need to know the label dimensions, but you can't determine the dimensions until after you've created the label!
- The main idea then is to:
	- Create a `GLabel` without setting its location
	- Call the `.set_font()` method to set the desired font (which could change the size)
	- Determine the horizontal position of the origin by subtracting half the width from the desired location x
	- Determine the vertical position of the baseline by adding half the ascent to the desired location y
	- Add the `GLabel` at the newly calculated position


## Centering Example
```python
gw = GWindow(500, 200)
msg = GLabel("hello world!")
msg.set_font("italic bold 20px 'times new roman'")
x = 250 - msg.get_width() / 2
y = 100 + msg.get_ascent() / 2
gw.add(msg, x, y)
```
