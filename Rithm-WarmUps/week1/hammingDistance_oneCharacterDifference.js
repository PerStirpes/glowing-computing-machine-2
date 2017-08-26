// Please implement the following functions:
//
// 1. Hamming Distance (https://en.wikipedia.org/wiki/Hamming_distance).
//
// This function takes in two strings of equal length, and calculates the distance between them. Here, "distance" is defined as the number of characters that differ at the same position. The function should ignore case.
//
// If the inputs do not have the same length, the function should return "Input strings must have the same length."
//
// Examples:
//
// hammingDistance("hello", "jello") // 1
// hammingDistance("cool", "kewl") // 3
// hammingDistance("sweet", "Sweet") // 0
// hammingDistance("yoyo", "yoyoyo") // "Input strings must have the same length."
//
// 2. Implement a function called
//
// oneCharDifference
//
// which checks whether there two strings differ by a single character.
//
// The difference may consist of one character being added, removed, or replaced, in which case the function must return true. In all other cases it must return false. As with hammingDistance, this function should ignore case.
//
// Examples:
//
// oneCharDifference("grate", "grape") // true
// oneCharDifference("male", "maple") // true
// oneCharDifference("help", "helping") // false
// oneCharDifference("boom", "boo") // true
// oneCharDifference("same", "same") // false

const toLc = str => str.toLowerCase();

hammingDistance = (str1, str2, difference = 0) => {
  str1 = toLc(str1);
  str2 = toLc(str2);
  if (str1.length !== str2.length) {
    return 'Input strings must have the same length.';
  }
  for (var i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      difference++;
    }
  }
  return difference;
};
///

oneCharDifference = (str1, str2, counter = 0) => {
  let shortStr = str1.length <= str2.length ? toLc(str1) : toLc(str2);

  let longStr = str1.length > str2.length ? toLc(str1) : toLc(str2);

  if (hammingDistance(shortStr, longStr) > 1 || shortStr === longStr)
    return false;
  if (hammingDistance(shortStr, longStr) === 1) return true;

  for (let i = 0; i < longStr.length; i++) {
    if (shortStr.charAt(i - counter) !== longStr.charAt(i)) {
      counter++;
    }
    if (counter > 1) {
      return false;
    }
  }
  return true;
};

//Model solution
function hammingDistance(str1, str2) {
  if (str1.length !== str2.length)
    return 'Input strings must have the same length.';
  var diff = 0;
  for (var i = 0; i < str1.length; i++) {
    if (str1[i].toLowerCase() !== str2[i].toLowerCase()) diff++;
  }
  return diff;
}

function oneCharDifference(str1, str2) {
  // case 1: strings have the same length
  if (str1.length === str2.length) {
    return hammingDistance(str1, str2) === 1;
  }

  var short = str1.length < str2.length ? str1 : str2;
  var long = short === str1 ? str2 : str1;
  // case 2: string lengths differ by more than 1
  if (long.length - short.length > 1) return false;

  // case 3: string lengths differ by exactly 1
  var diff = 0;
  for (var i = 0; i < short.length; i++) {
    var char = short[i].toLowerCase();
    if (char !== long[i + diff].toLowerCase()) {
      diff++;
      if (diff > 1 || char !== long[i + diff].toLowerCase()) return false;
    }
  }
  return true;
}
