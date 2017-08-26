// 1. The first element in the array should be n.
//
// 2. After the first element, each subsequent element should be equal to:
//   - Half the previous element, if the previous element is even,
//   - Three times the previous element plus one, if the previous element is odd.
// Note that in either case, the result should be an integer.
//
// 3. The last element in the array should be 1. When you encounter your first 1, you should push it to the array and return the array.
//
// Examples:
//
// collatzSequence(4); // [4, 2, 1]
// collatzSequence(6); // [6, 3, 10, 5, 16, 8, 4, 2, 1]
// collatzSequence(7); // [7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]
// collatzSequence(0); // "Input must be a positive whole number."
// collatzSequence([]); // "Input must be a positive whole number."
//
// (For more, see https://en.wikipedia.org/wiki/Collatz_conjecture)
//
// You should implement this function in two ways: iteratively and recursively.

function collatzSequenceIterative(num) {
  var array = [num];
  if (num < 1 || num % 1 !== 0) {
    return 'Input must be a positive whole number.';
  }

  while (num !== 1) {
    num = num % 2 === 0 ? num / 2 : num * 3 + 1;

    array.push(num);
  }
  return array;
}

function collatzSequenceRecursive(num) {
  var array = [num];
  if (num < 1 || num % 1 !== 0) {
    return 'Input must be a positive whole number.';
  }
  while (num != 1) {
    num = num % 2 === 0 ? num / 2 : num * 3 + 1;

    array.push(num);
    collatzSequenceRecursive(num);
  }
  return array;
}

//model solution
function collatzSequenceIterative(num) {
  if (!(Number.isInteger(num) && num > 0))
    return 'Input must be a positive whole number.';
  var numArr = [num];
  while (num !== 1) {
    num = num % 2 === 1 ? 3 * num + 1 : num / 2;
    numArr.push(num);
  }
  return numArr;
}

function collatzSequenceRecursive(num) {
  if (!(Number.isInteger(num) && num > 0))
    return 'Input must be a positive whole number.';
  if (num === 1) return [1];
  return [num].concat(
    collatzSequenceRecursive(num % 2 ? 3 * num + 1 : num / 2)
  );
}
