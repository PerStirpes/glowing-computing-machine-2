Implement a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

Examples:

isSubsequence('hello', 'hello world'); // true
isSubsequence('sing', 'sting'); // true
isSubsequence('abc', 'abracadabra'); // true
isSubsequence('abc', 'acb'); // false - order matters!

BONUS:

Solve this problem in O(1) space complexity, and O(n + m) time complexity, where n is the length of the first string and m is the length of the second string.

function isSubsequence(s, t) {
  var match = 0;

  for (var i = 0; i < t.length; i++) {
    if (s[match] === t[i]) {
      match++;
    }
  }

  return s.length === match;
}

//Model Solution
function isSubsequence(str1, str2) {
  var i = 0;
  var j = 0;
  if (!str1) return true;
  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}
