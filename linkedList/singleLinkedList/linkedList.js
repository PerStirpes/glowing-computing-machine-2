function LinkedList() {
  let Node = function(element) {
    // {1}
    this.element = element;
    this.next = null;
  };

  let length = 0; // {2}
  let head = null; // {3}
  this.append = function(element) {
    // append(element): This adds a new item to the end of the list.
    let node = new Node(element), //The first thing we need to do is to create the Node item passing element as its value (line {1}).
      current;
    //Let's implement the first scenario first: adding an element when the list is empty. When we create a LinkedList object, the head will point to null:
    if (head === null) {
      //first node on list
      // If the head element is null (the list is empty-line {3}), it means we are adding the first element to the list. So, all we have to do is point the head element to the node element.
      head = node;
      // The next node element will be null automatically (check the source code from the previous topic).
    } else {
      current = head; //To add an element to the end of the list, we first need to find the last element. Remember that we only have a reference to the first element (line {4}), so we need to iterate through the list until we find the last item. To do so, we need a variable that points to the current item of the list (line {2}).

      //loop the list until find last item
      while (current.next) {
        //When looping through the list, we know we'll reached its end when the current.next element is null.
        current = current.next;
      }

      //get last item and assign next to added item to make the link
      current.next = node; //  Then, all we have to do is link the current element's (which is the last one) next pointer to the node we want to add to the list (line {5}).
    }

    length++; //update size of list//we cannot forget to increment the size of the list so that we can control it and easily get the list size (line {6}).
  };

  this.insert = function(position, element) {
    // insert(position, element): This inserts a new item at a specified position in the list.
    //check for out-of-bounds values
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0;

      if (position === 0) {
        //add on first position

        node.next = current;
        head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }

      length++; //update size of list

      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;

      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        //link previous with current's next - skip it to remove
        previous.next = current.next;
      }

      length--;

      return current.element;
    } else {
      return null;
    }
  };
  this.removeAt = function(position) {
    // removeAt(position): This removes an item from a specified position in the list.
    //check for out-of-bounds values
    //check for out-of-bounds values
    if (position > -1 && position < length) {
      // {1}

      let current = head, // {2}
        previous, // {3}
        index = 0; // {4}

      //removing first item
      if (position === 0) {
        // {5}
        head = current.next;
      } else {
        while (index++ < position) {
          // {6}

          previous = current; // {7}
          current = current.next; // {8}
        }

        //link previous with current's next: skip it to remove
        previous.next = current.next; // {9}
      }

      length--; // {10}

      return current.element;
    } else {
      return null; // {11}
    }
  };
  this.remove = function(element) {
    // remove(element): This removes an item from the list.
    let index = this.indexOf(element);
    return this.removeAt(index);
  };

  this.indexOf = function(element) {
    // indexOf(element): This returns the index of the element in the list. If the element is not in the list, it returns -1.
    let current = head,
      index = 0;

    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1;
  };

  this.isEmpty = function() {
    // isEmpty(): This returns true if the linked list does not contain any elements and false if the size of the linked list is bigger than 0.
    return length === 0;
  };

  this.size = function() {
    // size(): This returns the number of elements the linked list contains. It is similar to the length property of the array.
    return length;
  };

  this.getHead = function() {
    return head;
  };

  this.toString = function() {
    // toString(): As the list uses a Node class as an item, we need to overwrite the default toString method inherited from the JavaScript object to output only the element values.
    let current = head,
      string = '';

    while (current) {
      string += current.element + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  };

  this.print = function() {
    console.log(this.toString());
  };
}

// For the LinkedList data structure, we need a helper class called Node (line {1}). The Node class represents the item that we want to add to the list. It contains an element attribute, which is the value that we want to add to the list, and a next attribute, which is the pointer that contains the link to the next node item of the list.
//
// There is also the length property (line {2}) in the LinkedList class (internal/private variable) that stores the number of items we have on the list.
//
// Another important note is that we need to store a reference for the first node as well. To do this, we can store this reference inside a variable that we will call head (line {3}).
//
// Then we have the methods of the LinkedList class. Let's see what each method will be responsible for before we implement each one:
//
// test for append method
let list = new LinkedList();
list.append(15);
list.append(10);
