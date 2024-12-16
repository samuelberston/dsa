from sortedcontainers import SortedList

class MaxStack:
    def __init__(self):
        self.stack  = SortedList()
        self.values = SortedList()
        self.count  = 0

    def push(self, val):
        self.stack.add((self.count, val));
        self.values.add((val, self.count));
        self.count++
    
    def pop(self):
        cnt, val = self.stack.pop()
        self.values.remove((val, cnt))
        return val

    def popMax(self):
        val, cnt = self.values.pop()
        self.stack.remove((cnt, val))
        return val

    def peekMax(self):
        return self.values[-1][0]

    def top(self):
        return self.stack[-1][0]

# MaxStack driver code
obj = MaxStack()
obj.push(5)
obj.push(1)
obj.push(5)
print(obj.top())
print(obj.popMax())
print(obj.top())
print(obj.peekMax())
print(obj.pop())
print(obj.top())
