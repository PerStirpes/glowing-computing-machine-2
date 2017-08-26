// Implement a function called addUpTo which takes a number as an argument and adds up all the whole numbers from 1 up to and including the number passed in.
//
// Some edge cases to consider:
//
// If the argument passed in is not a number, the function should return NaN.
// If the argument passed in is less than 1, the function should return 0.
// If the argument passed in is not a whole number, the function should add up all the whole numbers between 1 and the largest whole number less than the argument passed in.

function addUpTo(num) {
  var sum = 0;
  for (var i = num; i > 0; i--) {
    sum += Math.floor(i);
  }
  return sum;
}

Recursive;
function addUpTo(num) {
  if (typeof num !== 'number') {
    return NaN;
  }
  num = Math.floor(num);
  return num < 1 ? 0 : num + addUpTo(num - 1);
}

// Model Solution
function addUpTo(num) {
  // good luck. add any arguments you deem necessary.
  if (typeof num !== 'number') return NaN;
  if (num < 1) return 0;
  var floored = Math.floor(num);
  return floored * (floored + 1) / 2;
}

//Examples:

addUpTo(5); // 15, since 1 + 2 + 3 + 4 + 5 = 15
addUpTo(10); // 55
addUpTo('three'); // NaN
addUpTo(null); // NaN
addUpTo(0); // 0
addUpTo(-100); // 0
addUpTo(3.4); // 6
addUpTo(5.9999999); // 15
