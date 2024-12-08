public class MaxStackDemo {
    public static void main(String[] args) {
        MaxStack stack = new MaxStack();
        
        // Push some elements
        System.out.println("Pushing elements: 5, 1, 7, 3, 8, 4");
        stack.push(5);
        stack.push(1);
        stack.push(7);
        stack.push(3);
        stack.push(8);
        stack.push(4);
        
        // Demonstrate operations
        System.out.println("\nTop element: " + stack.top());        // Should print 4
        System.out.println("Maximum element: " + stack.peekMax());  // Should print 8
        
        System.out.println("\nPopping maximum element: " + stack.popMax()); // Should remove and return 8
        System.out.println("New maximum element: " + stack.peekMax());      // Should print 7
        
        System.out.println("\nPopping top element: " + stack.pop());        // Should remove and return 4
        System.out.println("New top element: " + stack.top());              // Should print 3
        
        // Push more elements after removals
        System.out.println("\nPushing new element: 10");
        stack.push(10);
        System.out.println("New maximum element: " + stack.peekMax());      // Should print 10
        System.out.println("Top element: " + stack.top());                  // Should print 10
    }
} 