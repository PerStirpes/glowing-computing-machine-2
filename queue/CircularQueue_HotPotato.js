// The circular queue - Hot Potato
// We also have another modified version of the queue implementation, which is the circular queue. An example of a circular queue is the Hot Potato game. In this game, children are organized in a circle, and they pass the hot potato to their neighbor as fast as they can. At a certain point of the game, the hot potato stops being passed around the circle of children, and the child that has the hot potato is removed from the circle. This action is repeated until there is only one child left (the winner).
//
// For this example, we will implement a simulation of the Hot Potato game:

function hotPotato(nameList, num) {
  let queue = new Queue();

  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  let eliminated = '';
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + ' was eliminated from the Hot Potato game.');
  }

  return queue.dequeue();
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
let winner = hotPotato(names, 7);
console.log('The winner is: ' + winner);
