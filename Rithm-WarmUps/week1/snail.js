// Instructions from your teacher:
//
// Write a function called snail which Given an n x n array, returns the array elements arranged from outermost elements to the middle element, traveling clockwise.
// snail([[1,2,3],[4,5,6],[7,8,9]] ) // [1,2,3,6,9,8,7,4,5]
//
// snail([[1,2,3],[8,9,4],  [7,6,5]]) // [1,2,3,4,5,6,7,8,9]
//
// snail([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]])
// // [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]

snail = function(array) {
  var snailBait = [];
  while (array.length > 0) {
    //rip out first array
    snailBait = snailBait.concat(array.shift());

    // pop off the last element in remaining arrays
    for (var i in array) {
      snailBait = snailBait.concat(array[i].pop());
    }

    if (array.length > 0) {
      // rip off the new last array, reverse add on
      snailBait = snailBait.concat(array.pop().reverse());

      for (var i in array.reverse()) {
        // remove first elements
        snailBait = snailBait.concat(array[i].shift());
      }
      // reverse the array
      array.reverse();
    }
  }
  return snailBait;
};

///Model Solution

// Approach 1: iterative
function snail(array) {
  var result;
  while (array.length) {
    // Steal the first row.
    result = result ? result.concat(array.shift()) : array.shift();
    // Steal the right items.
    for (var i = 0; i < array.length; i++) result.push(array[i].pop());
    // Steal the bottom row.
    result = result.concat((array.pop() || []).reverse());
    // Steal the left items.
    for (var i = array.length - 1; i >= 0; i--) result.push(array[i].shift());
  }
  return result;
}

// Approach 2: recursive
// function snail(array) {
//   if (array.length === 1) return array[0];
//   if (array.length === 2) return array.shift().concat(array.pop().reverse());
//   return array.shift().concat(
//     array.map(row => row.pop()),
//     array.pop().reverse(),
//     array.map(row => row.shift()).reverse(),
//     snail(array)
//   )
// }
