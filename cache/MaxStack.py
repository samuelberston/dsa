from sortedcontainers import SortedList

class MaxStack:

    def __init__(self):
        # Use SortedList for O(logN) insertion/deletion
        self.stack = SortedList() # store count, val in sorted order 
        self.values = SortedList() # store val, count in sorted order 
        self.cnt = 0 # increment count for stack order

    def push(self, x: int) -> None:
        self.stack.add((self.cnt, x))
        self.values.add((x, self.cnt))
        self.cnt += 1

    def pop(self) -> int:
        idx, val = self.stack.pop()
        self.values.remove((val, idx))
        return val

    def top(self) -> int:
        return self.stack[-1][1]

    def peekMax(self) -> int:
        return self.values[-1][0]

    def popMax(self) -> int:
        val, idx = self.values.pop()
        self.stack.remove((idx, val))
        return val