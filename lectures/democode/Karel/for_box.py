import karel

def main():
    """Draw a 4x4 square in the world."""
    position()
    draw_box()

def position():
    """Move to starting corner of box."""
    move()
    move()
    turn_left()
    move()
    move()
    turn_right()

def turn_right():
    """Turns Karel 90 deg to the right."""
    turn_left()
    turn_left()
    turn_left()

def draw_box():
    """Draws a box with 4 equal sides in a CCW direction."""
    for i in range(4):
        draw_6_line()
        turn_left()

def draw_6_line():
    """Draws a straight line of 6 beepers, if space."""
    for i in range(5):
        if no_beepers_present():
            put_beeper()
        if front_is_clear():
            move()
    if no_beepers_present():
        put_beeper()

