// push(element(s)): This adds a new item (or several items) to the top of the stack.
// pop(): This removes the top item from the stack. It also returns the removed element.
// peek(): This returns the top element from the stack. The stack is not modified (it does not remove the element; it only returns the element for information purposes).
// isEmpty(): This returns true if the stack does not contain any elements, and false if the size of the stack is bigger than 0.
// clear(): This removes all the elements of the stack.
// size(): This returns the number of elements that the stack contains. It is similar to the length property of an array.

function Stack() {
  let items = [];

  this.push = function(element) {
    items.push(element);
  };

  this.pop = function() {
    return items.pop();
  };

  this.peek = function() {
    return items[items.length - 1];
  };

  this.isEmpty = function() {
    return items.length == 0;
  };

  this.size = function() {
    return items.length;
  };

  this.clear = function() {
    items = [];
  };

  this.print = function() {
    console.log(items.toString());
  };

  this.toString = function() {
    return items.toString();
  };
}

let stack = new Stack();
console.log(stack.isEmpty()); //outputs true

// We created a Stack function that can be used as a sort of class;
// since JavaScript functions have constructors, we can simulate the class behavior.
//We declared a variable named items that is private and only accessible to the Stack function/class.
//THIS approach creates a copy of the variable items for each class instance created.
//Therefore, it does not escalate well in case we need to use several instances of the Stack class at the same time.
//
// Using the ES6 syntax and compare its pros and cons against the approach we used in this chapte

//Using this approach, we cannot declare variables in the body of the class as other languages (Java, C++, C#), so we need to declare them inside the class constructor (line {1}), and
// we can make a reference to the variable using this.name_of_Variable in other functions of the class.
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  print() {
    console.log(this.toString());
  }

  toString() {
    return this.items.toString();
  }
}

// Although the code looks cleaner and it is more beautiful, the variable items are public.
// The ES6 classes are prototype based. Although a prototype-based class saves memory and escalates better than function-based classes, this approach does not allow us to declare private properties (variables) or methods. And, in this case, we want the user of the Stack class to have access only to the methods we are exposing in the class. Otherwise, it is possible to remove elements from the middle of the stack (since we are using an array to store its values), and we do not want to allow this action.

// ES6 CLASSES WITH SCOPED SYMBOLS
// ES6 introduced a new primitive type called Symbol that is immutable, and it can be used as an object property.
// Let's see how we can use it to declare the items property in the Stack class:

let _items = Symbol(); //{1}

class Stack2 {
  constructor() {
    this[_items] = []; //{2}
  }

  push(element) {
    this[_items].push(element);
  }

  pop() {
    return this[_items].pop();
  }

  peek() {
    return this[_items][this[_items].length - 1];
  }

  isEmpty() {
    return this[_items].length == 0;
  }

  size() {
    return this[_items].length;
  }

  clear() {
    this[_items] = [];
  }

  print() {
    console.log(this.toString());
  }

  toString() {
    return this[_items].toString();
  }
}
// In the preceding code, we declare the variable _items as a Symbol (line {1}), and initiate its value inside the class constructor (line {2}).
//To access the variable _items, we simply need to replace all this.items occurrences with this[_items].
//
// This approach provides a false class private property, because the method Object.getOwnPropertySymbols was also introduced in ES6,
// and it can be used to retrieve all the property Symbols declared in the class.
//An example of how we can explore and hack the Stack class is given as follows:

let stack = new Stack();
stack.push(5);
stack.push(8);
let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length); // 1
console.log(objectSymbols); // [Symbol()]
console.log(objectSymbols[0]); // Symbol()
stack[objectSymbols[0]].push(1);
stack.print(); //outputs 5, 8, 1

// ES6 CLASSES WITH WEAKMAP
// There is one data type we can use to ensure that the property will be private in a class,
// and it is called WeakMap. We will explore the Map data structure in detail in Chapter 7 ,
// Dictionaries and Hashes, but for now, we need to know that a WeakMap can store a key/value pair,
// where the key is an object and the value can be any data type.
// Let's see what the Stack class would look like if we use WeakMap to store the items variable:

const items = new WeakMap();

class Stack {
  constructor() {
    items.set(this, []);
  }
  push(element) {
    let s = items.get(this);

    s.push(element);
  }
  pop() {
    let s = items.get(this);
    let r = s.pop();
    return r;
  }
  //other methods
}

let Stack3 = (function() {
  const items = new WeakMap(); //{1} In line {1}, we declare the items variable as a WeakMap

  class Stack3 {
    constructor() {
      items.set(this, []); //{2} In line {2}, we set the items value inside the constructor by setting this (reference to the Stack class) as the key of the WeakMap and the array that represents the stack as its value
    }

    push(element) {
      let s = items.get(this); //{3} In line {3}, we retrieve the value of the items by retrieving the value from the WeakMap, that is, by passing this as the key (that we set in line {2})
      s.push(element);
    }

    pop() {
      let s = items.get(this);
      let r = s.pop();
      return r;
    }

    peek() {
      let s = items.get(this);
      return s[s.length - 1];
    }

    isEmpty() {
      return items.get(this).length == 0;
    }

    size() {
      let s = items.get(this);
      return s.length;
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

  return Stack3;
})();

// Now we know that the items property is truly private in the Stack class.
// But there is one more step we need to do.
// Right now, the items variable is still declared outside the Stack class, so anyone can change it.
// We will wrap the Stack class with a closure (an outer function), so the WeakMap has scope only inside the function:

let Stack = (function() {
  const items = new WeakMap();
  class Stack {
    constructor() {
      items.set(this, []);
    }
    //other methods
  }
  return Stack; //{5} When the constructor of the Stack function is called, it will return an instance of the Stack class (line {5}).
})();
// Now the Stack class has a private property named items. It is still an ugly solution, but it works regarding the privacy of the properties. However, with this approach, it is not possible to inherit the private properties if we extend this class; we cannot have it all!
//
// If we compare the preceding code with the code that we initially used in this chapter to declare the Stack class, we will notice some similarities:

// The truth is that although, ES 6 introduced the class syntax,
// we still cannot declare private properties or methods as it is possible in other programming languages.
// There are different approaches with which we can achieve the same result,
// but each one has its pros and cons regarding a simpler syntax or performance.
// Which approach is better? It depends on how you use the algorithms presented in this book in real-life projects.
// It depends on the volume of data you will be dealing with, on the number of instances that you need of the classes we create, among other constraints.
// Ultimately, the decision is yours.
//
