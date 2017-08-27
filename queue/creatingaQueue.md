<!-- JavaScript task queues
Since we are using JavaScript in this book, why not explore a little bit more how the language works?

When we open a new tab in the browser, a task queue is created. This is because only a single thread handles all the tasks for a single tab, and it is called an event loop. The browser is responsible for several tasks, such as rendering the HTML, executing JavaScript code commands, handling user interaction (user input, mouse clicks, and so on), executing and processing asynchronous requests. You can learn more about the event loop at the following link: https://goo.gl/ayF840 .
https://www.youtube.com/watch?v=8aGhZQkoFbQ  Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014
It is really nice to know that a popular and powerful language such as JavaScript uses such a basic data structure to handle internal control. -->

#Creating a queue
We are now going to create our own class to represent a queue. Let's start from the basics and declare our class:
```
function Queue() {
  //properties and methods go here
}
```
First, we need a data structure that will store the elements of the queue. We can use an array to do it, just like we used it for the Stack class in the previous chapter (you will notice the Queue and Stack class are very similar, just the principles for adding and removing the elements are different):

let items = [];
Next, we need to declare the methods available for a queue:

* enqueue(element(s)): This adds a new item (or several items) at the back of the queue.
* dequeue(): This removes the first item from the queue (the item that is in the front of the queue). It also returns the removed element.
* front(): This returns the first element from the queue, the first one added, and the first one that will be removed from the queue. The queue is not modified (it does not remove the element; it only returns the element for information purposes-very similar to the peek method from the Stack class).
* isEmpty(): This returns true if the queue does not contain any elements, and false if the queue is bigger than 0.
* size(): This returns the number of elements the queue contains. It is similar to the length property of the array.
Enqueue elements to the queue
The first method that we will implement is the enqueue method. This method will be responsible for adding new elements to the queue with one very important detail-we can only add new items to the end of the queue:
```
this.enqueue = function(element){
  items.push(element);
};
```
As we are using an array to store the elements for the stack, we can use the push method from the JavaScript array class that we covered in Chapter 2 , Arrays, and also in Chapter 3 , Stacks.

Dequeue elements from the queue
Next, we are going to implement the dequeue method. This method is responsible for removing the items from the queue. As the queue uses the FIFO principle, the first item that we added is the one that is removed. For this reason, we can use the shift method from the JavaScript array class that we also covered in Chapter 2 , Arrays. If you remember, the shift method removes the element that is stored at the index 0 (first position) of the array:
```
this.dequeue = function(){
  return items.shift();
};
```
With the enqueue and dequeue methods being the only methods available for adding and removing items from the queue, we assured the FIFO principle for our own Queue class.

Peeking the element from the front of the queue
Now, let's implement some additional helper methods for our class. If we want to know what the front item of our queue is, we can use the front method. This method will return the item from the front of the queue (index 0 of the array):
```
this.front = function(){
  return items[0];
};
```
Verifying if the queue is empty
The next method is the isEmpty method, which returns true if the queue is empty, and false otherwise (note that this method is the same as the one in the Stack class):
```
this.isEmpty = function(){
  return items.length == 0;
};
```
For the isEmpty method, we can simply verify that the length of the internal array is 0.

Like the length property of the array class, we can also implement the same for our Queue class. The size method is also the same for the Stack class:
```
this.size = function(){
  return items.length;
};
```
Printing the elements of the queue
And we are done! Our Queue class is implemented. Just like we did for the Stack class, we can also add the print method:
```
this.print = function(){
  console.log(items.toString());
};
```
And now we are really done!

NOTE
The Queue and Stack class are very similar. The only difference is the dequeue and front methods, which is because of the difference between the FIFO and LIFO principles.

USING THE QUEUE CLASS
The first thing we need to do is instantiate the Queue class that we just created. Next, we can verify that it is empty (the output is true, because we have not added any elements to our queue yet):
```
    let queue = new Queue();
    console.log(queue.isEmpty()); //outputs true
    ```
Next, let's add some elements to it (let's enqueue the elements "John" and "Jack"—you can add any element type to the queue):
```
queue.enqueue("John");
queue.enqueue("Jack");
Let's add another element:

queue.enqueue("Camila");
Let's also execute some other commands:

queue.print();
console.log(queue.size()); //outputs 3
console.log(queue.isEmpty()); //outputs false
queue.dequeue();
queue.dequeue();
queue.print();
```
If we ask to print the contents of the queue, we will get John, Jack, and Camila. The size of the queue will be 3, because we have three elements queued in it (and it is also not going to be empty).

The following diagram exemplifies all the enqueue operations we executed so far, and the current status of our queue:

Using the Queue class
Next, we asked to dequeue two elements (the dequeue method is executed twice). The following diagram exemplifies the dequeue method execution:

Using the Queue class
And when we finally ask to print the content of the queue again, we only have the element Camila. The first two queued elements were dequeued; the final element queued to the data structure is the last one that will be dequeued from it. That is, we follow the FIFO principle.
