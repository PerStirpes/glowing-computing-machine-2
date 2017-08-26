// Part I
//
// Write a function called twoArrayObject which accepts to arrays of varying lengths.The first array consists of keys and the second one consists of values. Your function should return an object created from the keys and values. If there are not enough values, the rest of keys should have a value of null. If there not enough keys, just ignore the rest of values.
//
// twoArrayObject(['a', 'b', 'c', 'd'], [1, 2, 3]) // {'a': 1, 'b': 2, 'c': 3, 'd': null}
// twoArrayObject(['a', 'b', 'c']  , [1, 2, 3, 4]) // {'a': 1, 'b': 2, 'c': 3}
// twoArrayObject(['x', 'y', 'z']  , [1,2]) // {'x': 1, 'y': 2, 'z': null}
//
// Part II
//
// Write a function called validParentheses that takes a string of parentheses, and determines if the order of the parentheses is valid. validParentheses should return true if the string is valid, and false if it's invalid.
//

function twoArrayObject(array, _array) {
  return array.reduce(function(acc, curr, idx) {
    if (_array[idx] === undefined) {
      _array[idx] = null;
    }
    acc[curr] = _array[idx];

    return acc;
  }, {});
}

//twoArrayObject(['a', 'b', undefined], [1, 2, 3])
//twoArrayObject(['a', 'b', 'c', 'd'], [1, 2, 3]) // {'a': 1, 'b': 2, 'c': 3, 'd': null}
//twoArrayObject(['a', 'b', 'c']  , [1, 2, 3, 4]) // {'a': 1, 'b': 2, 'c': 3}
//twoArrayObject(['x', 'y', 'z']  , [1,2]) // {'x': 1, 'y': 2, 'z': null}

function validParentheses(parens) {
  var splitParens = parens.split('');
  var leftParen = [];
  var rightParen = [];

  for (var i = 0; i < splitParens.length; i++) {
    if (splitParens[0] === ')') return false;

    if (splitParens[i] === '(') {
      leftParen.push(splitParens[i]);
    } else {
      rightParen.push(splitParens[i]);
    }
  }
  return leftParen.length === rightParen.length;
}

// validParentheses("()") // true
// validParentheses(")(()))") // false
// validParentheses("(") // false
// validParentheses("(())((()())())") // true
// validParentheses('))((') // false
// validParentheses('())(') // false
// validParentheses('()()()()())()(') // false

//Model Solution

function twoArrayObject(keys, values) {
  var obj = {};

  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = i < values.length ? values[i] : null;
  }

  return obj;
}

function validParentheses(parens) {
  var count = 0;
  for (var i = 0; i < parens.length; i++) {
    if (parens[i] == '(') count++;
    if (parens[i] == ')') count--;
    if (count < 0) return false;
  }

  return count === 0;
}

function validParentheses(parens, count = 0) {
  if (parens[0] == '(') count++;
  if (parens[0] == ')') count--;
  if (count < 0) return false;
  if (parens.length) return validParentheses(parens.slice(1), count);
  return count === 0;
}
