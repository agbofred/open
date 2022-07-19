import karel

def fill_two_potholes():
    """Fills potholes on 2nd and 5th Avenues."""
    move()
    fill_pothole()
    move()
    move()
    move()
    fill_pothole()
    move()


def fill_pothole():
    """Fills the pothole underneath Karel."""
    turn_right()
    move()
    put_beeper()
    turn_around()
    move()
    turn_right()

def turn_right():
    """Turns Karel to the right 90 deg."""
    turn_left()
    turn_left()
    turn_left()

def turn_around():
    """Turns Karel 180 deg around."""
    turn_left()
    turn_left()
