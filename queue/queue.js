function Queue() {
  let items = [];

  this.enqueue = function(element) {
    items.push(element);
  };

  this.dequeue = function() {
    return items.shift();
  };

  this.front = function() {
    return items[0];
  };

  this.isEmpty = () => items.length == 0;

  this.clear = function() {
    items = [];
  };

  this.size = function() {
    return items.length;
  };
  this.size = () => items.length;

  this.print = () => console.log(items.toString());
}
