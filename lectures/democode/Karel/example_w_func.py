import karel

def main():
    turn_right()
    move()
    turn_left()
    move()
    move()
    turn_right()
    move()
    pick_beeper()
    turn_right()
    move()
    move()
    put_beeper()

def turn_right():
    turn_left()
    turn_left()
    turn_left()

