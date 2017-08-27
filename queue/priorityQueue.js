// The priority queue
// As queues are largely applied in Computer Science and also in our lives, there are some modified versions of the default queue that we implemented in the previous topic.
// One modified version is the priority queue. Elements are added and removed based on a priority. An example from real life is the boarding line at the airport. The first class and business class passengers get priority over the coach class passengers. In some countries, elderly people and pregnant women (or women with newborn children) also get priority over other passengers for boarding
// Another example from real life is the waiting room for patients in a hospital (emergency department). Patients that are in a severe condition are seen by a doctor prior to patients in a less severe condition. Usually, a nurse will do the triage and assign a code to the patient depending on the severity of the condition.
// There are two options when implementing a priority queue: you can set the priority and add the element at the correct position, or you can queue the elements as they are added to the queue, and remove them according to priority. For this example, we will add the elements at their correct position, so we can dequeue them by default:

//example of min priority queue:we are adding the element with the lower value (1 has higher priority) to the front of the queue.
function PriorityQueue() {
  let items = [];

  function QueueElement(element, priority) {
    // {1}
    this.element = element;
    this.priority = priority;
  }

  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority);

    let added = false;
    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        // {2}
        items.splice(i, 0, queueElement); // {3}
        added = true;
        break; // {4}
      }
    }
    if (!added) {
      items.push(queueElement); //{5}
    }
  };

  this.dequeue = function() {
    return items.shift();
  };

  this.front = function() {
    return items[0];
  };

  this.isEmpty = function() {
    return items.length == 0;
  };

  this.size = function() {
    return items.length;
  };

  this.print = function() {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element}  - ${items[i].priority}`);
    }
  };
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue('John', 2);
priorityQueue.enqueue('Jack', 1);
priorityQueue.enqueue('Camila', 1);
priorityQueue.print();

// The difference between the implementation of the default Queue and PriorityQueue classes is that we need to create a special element (line {1}) to be added to PriorityQueue. This element contains the element that we want to add to the queue (it can be any type), plus the priority on the queue.
// First we need to compare its priority to the rest of the elements (line {2}). When we find an item that has a higher priority than the element we are trying to add, then we insert the new element one position before (with this logic, we also respect the other elements with the same priority, but which were added to the queue first). To do this, we can use the splice method from the JavaScript array class that you learned about in Chapter 2 , Arrays. Once we find an element with a higher priority, we insert the new element (line{3}), and we stop looping the queue (line {4}). This way, our queue will also be sorted and organized by priority.
// Also, if the priority we are adding is greater than any priority already added, or if the queue is empty, we simply add to the end of the queue (line {5}):

// The priority queue we implemented is called a min priority queue,
// because we are adding the element with the lower value (1 has higher priority) to the front of the queue. There is also the max priority queue, which, instead of adding the element with the lower value to front of the queue, adds the element with the greater value to the front of the queue.
