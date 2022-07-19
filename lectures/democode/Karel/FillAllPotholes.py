import karel


def main():
    """
    Fills any number of potholes at any location!
    """
    while front_is_clear():
        if right_is_clear():
            fill_pothole()
        move()


def fill_pothole():
    """
    Fills a single pothole and returns to where
    it started.
    """
    turn_right()
    move()
    put_beeper()  # assuming infinite beepers available
    turn_around()
    move()
    turn_right()


def turn_right():
    """Turns Karel 90 deg to the right."""
    turn_left()
    turn_left()
    turn_left()


def turn_around():
    """Turns Karel 180 deg around."""
    turn_left()
    turn_left()
