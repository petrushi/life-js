for x in range(1,100):
    for y in range(20,100):
        summed = x+y
        multiplied = x*y
        if multiplied - summed == 2500:
            print(x, y)
            break
            