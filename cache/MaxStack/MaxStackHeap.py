import heapq

class MaxStackHeap:
    def __init__(self):
        self.heap = []
        self.stack = []
        self.count = 0
        self.deleted = set()

    def push(self, val):
        heapq.heappush(self.heap, (-val, -self.count)) # heapq is a min heap, so we use negative values to simulate a max heap
        self.stack.append((val, self.count))
        self.count += 1

    def pop(self):
        # Check removed
        while self.stack and self.stack[-1][1] in self.deleted:
            self.stack.pop()
        val, cnt = self.stack.pop()
        self.deleted.add(cnt)
        return val

    def popMax(self):
        while self.heap and self.heap[-1][1] in self.deleted:
            heapq.heappop(self.heap)
        val, cnt = heapq.heappop(self.heap)
        self.deleted.add(cnt)
        return -val
    
    def top(self):
        while self.stack and self.stack[-1][1] in self.deleted:
            self.stack.pop()
        return self.stack[-1][0]
    
    def peekMax(self):
        while self.heap and self.heap[-1][1] in self.deleted:
            heapq.heappop(self.heap)
        val, cnt = self.heap[-1]
        return -val
    
    
# MaxStackHeap driver code
maxStack = MaxStackHeap()
maxStack.push(5)
maxStack.push(1)
maxStack.push(5)
print(maxStack.top())
print(maxStack.popMax())
print(maxStack.top())
print(maxStack.peekMax())
print(maxStack.pop())
print(maxStack.top())