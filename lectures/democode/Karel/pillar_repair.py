import karel

def main():
    """Moves across the screen, repairing pillars as it goes."""
    while front_is_clear():
        repair_pillar()
        move()
    repair_pillar()

def repair_pillar():
    """Checks for and extends any existing pillars"""
    turn_left()
    extend_existing_pillar()
    turn_around()
    extend_existing_pillar()
    turn_left()

def extend_existing_pillar():
    """ Extends any existing pillars. """
    while front_is_clear():
        if beepers_present():
            move()
            if no_beepers_present():
                put_beeper()
        else:
            move()


def turn_around():
    """Turns Karel around 180 deg."""
    turn_left()
    turn_left()
