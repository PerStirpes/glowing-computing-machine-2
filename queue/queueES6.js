//As we learned in Chapter 3 , Stacks, we can also write the same Queue class using the ECMAScript 6 syntax.
//In this approach, we will use a WeakMap to keep the property items private,
//and we will also use an outer function (closure) to encapsulate the Queue class.

//The code is presented as follows:

let Queue2 = (function() {
  const items = new WeakMap();

  class Queue2 {
    constructor() {
      items.set(this, []);
    }

    enqueue(element) {
      let q = items.get(this);
      q.push(element);
    }

    dequeue() {
      let q = items.get(this);
      let r = q.shift();
      return r;
    }

    front() {
      let q = items.get(this);
      return q[0];
    }

    isEmpty() {
      return items.get(this).length == 0;
    }

    size() {
      let q = items.get(this);
      return q.length;
    }

    clear() {
      items.set(this, []);
    }

    print() {
      console.log(this.toString());
    }

    toString() {
      return items.get(this).toString();
    }
  }
  return Queue2;
})();
//You can use either of the Queue class that we created; the output of our tests will be the same.

//example
let queue = new Queue2();
console.log(queue.isEmpty()); //outputs true
queue.enqueue('John');
queue.enqueue('Jack');
queue.print();
queue.enqueue('Camila');
queue.print();
console.log(queue.size()); //outputs 3
console.log(queue.isEmpty()); //outputs false
queue.dequeue();
queue.dequeue();
queue.print();
