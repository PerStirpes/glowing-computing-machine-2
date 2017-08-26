// //PART II
//
// Write a function called sameFrequency. Given two positive integers,  find out if the two numbers have the same frequency of digits.
//
// Your solution MUST have the following complexities:
//
// Time: O(N)
//
// Sample Input:
//
// sameFrequency(182,281) // true
// sameFrequency(34,14) // false
// sameFrequency(3589578, 5879385) // true
// sameFrequency(22,222) // false

function sameFrequency(n1, n2) {
  s1 = n1.toString();
  s2 = n2.toString();
  const charCount = new Map();
  for (const char of s1.split('')) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  for (const char of s2.split('')) {
    if (!charCount.has(char)) return false;
    charCount.set(char, charCount.get(char) - 1);
  }
  return Array.from(charCount.values()).every(val => val === 0);
}
