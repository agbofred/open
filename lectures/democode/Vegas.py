def vegas(x):
    y = 2
    for i in range(5):
        x = x + y
    return x

x = 3
z = vegas(x)
print('z =', z)
print('x =', x)
