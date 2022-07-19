---
title: "Doing More"
author: Jed Rembold
date: December 8, 2021
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
- Adventure Game Project due on Friday night
- Guidelines and learning objectives for the final will get posted today
- On Friday we'll wrap up a bit early to get a class picture and leave you time to fill out the class eval that should have been emailed to you a few weeks back, so please show up!
- Polling: [rembold-class.ddns.net](http://rembold-class.ddns.net)

<!--
## Review Question {data-notes="Solution: {['A', 'B']: {1, 2}}"}

::::::cols
::::{.col style="flex-grow:.7;"}
The node class to the right for a linked list has a mystery static method at the bottom. What does it do?

:::{.poll style="font-size:0.9em;"}
#. Adds a new node named `A` at the end of the chain that starts with `C`
#. Adds a new node named `A` after the node named `B` in the chain that starts with `C`
#. Adds a new node named `A` before the node named `B` in the chain that starts with `C`
#. Replaces the node named `B` with the node named `A` in the chain that starts with `C`
:::
::::

::::col
```{.python style="max-height:900px; font-size:0.7em; line-height:1.15em"}
class Node:
    def __init__(self, name, link=None):
        self._name = name #str
        self._link = link #Node

    def get_name(self):
        return self._name

    def get_link(self):
        return self._link

    def set_link(self, new_link):
        self._link = new_link

    @staticmethod
    def mystery(A, B, C):
        cur = C
        while cur.get_name() != B:
            cur = cur.get_link()
        D = cur.get_link()
        new = Node(A, D)
        cur.set_link(new)
```

::::
::::::
-->

## Review Question {data-notes="Solution: 17 times!"}
The code for the main function of Merge Sort looked like below:
```{.python data-line-numbers=""}
def merge_sort(array):
    if len(array) > 1:
        mid = len(array)//2
        a1 = array[:mid]
        a2 = array[mid:]
        merge_sort(a1)
        merge_sort(a2)
        merge(array, a1, a2)
L = [45, 32, 68, 78, 12, 95, 312, 4, 32]
merge_sort(L)
```
How many times (including line 10) does `merge_sort` get called before the list is sorted?

:::{.hpoll }
#. 1
#. 8
#. 12
#. 17
:::

## Diff Libraries for Diff Uses
::::::cols
::::col
- The Web
	- Requests
	- BeautifulSoup
	- Scrapy
	- Django and Flask
- Math, Science and Analytics
	- Numpy
	- Matplotlib
	- Scipy
	- Sympy
	- Pandas

::::

::::col
- Automation
	- Pyautogui
	- Selenium
- Games and Applications
	- Arcade
	- PyGame
	- wxPython
	- tkinter
- Images
	- Pillow
	- OpenCV
::::
::::::


## Requests
- Responsible for interacting with http webpages
- Generally used to download some information from the web
- Most frequently use the `get` method to download a url

	```python
	response = requests.get("desired_url")
	```
	- Returns a special request object, with lots of info about the response
	- Can get the decoded text portion by accessing the `text` attribute

	```python
	print(response.text)
	```

## Beautiful Soup
- The text returned by `requests` is generally raw HTML
- You _could_ parse this yourself, but using a parser like BeautifulSoup can greatly streamline things
	- This is especially true if you are needing to do more complicated actions
	- BeautifulSoup is another great example of an abstract data type!
- You pass in HTML and are returned a custom soup object with many useful methods built in
- One of the more common things you'd want to do with the HTML is find certain elements on the page

	```python
	soup.find_all('tag_name', more_filters)
	```
	- Returns a list of everything that meets your requirements

## Topic Finder
- Let's write a program to search all the lecture slides on the class webpage for a specific topic
- Will require a few steps:
	#. Download the main Lecture page
	#. Find all the slide links on the page
	#. For each link, download _that_ page
	#. Search that page for signs of the desired topic and print out if found
- If we were going to run a bunch of searches, it would make more sense to download everything once at the start, but we won't worry about that here.

## Topic Finder Code
```{.python style="max-height:900px; font-size:0.65em; line-height:1.2em;"}
import requests
from bs4 import BeautifulSoup


def topic_finder():
	def is_lecture_link(tag):
		""" Filters out anchor tags with Lecture in the text. """
		return tag.name == "a" and "Lecture" in tag.text

    def find_lecture_containing(topic):
		""" Returns a list of lectures that contain the desired topic string. """
        lectures = []
        for lecture in lecture_links:
            content = requests.get("https:/" + lecture.get("href")).text
            if topic.lower() in content.lower():
                lectures.append((lecture.text, "https:/" + lecture.get("href")))
        return lectures

    url = "http://willamette.edu/~jjrembold/classes/cs151/slides/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text)
    lecture_links = soup.find_all(is_lecture_link)

    finished = False
    while not finished:
        target = input("\nWhat topic are you looking for? ")
        if target == "":
            finished = True
        else:
            found = find_lecture_containing(target)
            for lecture in reversed(found):
                name, url = lecture
                print(f"{name}: {url}")

if __name__ == '__main__':
	topic_finder()
```

## General Automation
- There are **many** libraries and API's you can use with Python to control or automate things
- Sometimes though, nothing exists and you need something more primative
- The `PyAutoGUI` library gives you methods to simulate moving and clicking the mouse and pressing keys on the keyboard
	- Will need to install through either pip or conda
- **Important!**
	- Should always have an emergency escape if you start automating the mouse and keyboard!
	- `PyAutoGUI` has a failsafe if you slam the mouse into one of the window corners

## Common Methods

Command|Description
---|-----
`.click()` | Clicks the mouse at the current location
`.mouseDown()` | Presses the mouse button down
`.mouseUp()` | Releases the mouse button
`.moveTo(x,y)` | Moves to the coordinate (x,y)
`.move(dx, dy)` | Moves from current position `dx` horizontally and `dy` vertically
`.drag(dx,dy)` | Clicks the mouse down and moves `dx` over and `dy` down
`.position()` | Gets the current mouse position
`.write(text)` | Presses the keys represented in the string text


## PyAutoGUI Art
- Perhaps easiest to demonstrate with a simple drawing program
- Because it is just moving the mouse, should work with _any_ drawing program: Paint, Photoshop, Krita, etc
- Initially we'd like to draw a rectangular spiral
- Then can add changing colors if time

## Retangular Spiral
```{.python style="max-height:900px;"}
import pyautogui as pag

CHANGE = 50

pag.countdown(10)
pag.click()  # Click to make the window active.
distance = 500
while distance > 0:
	pag.drag(distance, 0, duration=0.5)  # Move right.
	distance -= CHANGE
	pag.drag(0, distance, duration=0.5)  # Move down.
	pag.drag(-distance, 0, duration=0.5)  # Move left.
	distance -= CHANGE
	pag.drag(0, -distance, duration=0.5)  # Move up.
```
