#enter your birthday here (will be used to generate random numbers)
d, m, y = 10, 10, 2001

# init the random number generator
import random
random.seed(d+m+y); r_range = (1, 9)

x1 = Value(random.randint(*r_range)); x1.label='x1'
x2 = Value(random.randint(*r_range)); x2.label='x2'
x3 = Value(random.randint(*r_range)); x3.label='x3'
w1 = Value(random.randint(*r_range)); w1.label='w1'
w2 = Value(random.randint(*r_range)); w2.label='w2'
w3 = Value(random.randint(*r_range)); w3.label='w3'
b = Value(random.randint(*r_range));  b.label='b'

x1w1 = x1*w1; x1w1.label='x1w1'
x2w2 = x2*w2; x2w2.label='x2w2'
x3w3 = x3*w3; x3w3.label='x3w3'
sums = (x1w1 + x2w2) + (x3w3 + b); sums.label='sum'
o = sums * Value(0.25); o.label='o'
o.label='o'

# Todo: what are the gradients?
# o.grad = 1.0 ... and so on
o.grad = 1.0



draw_dot(o)