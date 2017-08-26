//* If you read into the requirements you can realize that
//instead of doing actual re-arrangments you simply need to
// check if they have *exactly* the same characters.

function areAnagrams(s1, s2) {

  var charCount = new Map();
  for (var char of s1.split('')) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (var char of s2.split('')) {
    if (!charCount.has(char)) {
      return false;
    }
    charCount.set(char, charCount.get(char) - 1);
  }
  return Array.from(charCount.values()).every(val => val === 0);
}

export function areAnagrams(s1: string, s2: string): boolean {
  //create a map
  const charCount = new Map<string, number>();
 //iterate through all the characters in string 1.
 //For each character in string 1
  for (const char of s1.split('')) {
  //   * We set the character count for this character.
    charCount.set(char,
      //* We get the previous value,
      (charCount.get(char)
      // If there was no previous value we initializing it to 0
        || 0)
        //* Finally we increment the previous count by 1.
              + 1);
  }
// * repeat the process for the second string.
//Iterating through all the characters in the second string.
  for (const char of s2.split('')) {

      // * if there is no key for it from string 1.
      //Then we know we don't have an anagram.
          if (!charCount.has(char)) return false;
  //   * Otherwise simply decrement the count
    charCount.set(char, charCount.get(char) - 1);
  }


  // * Finally we go through all the values in the characterCount map
  //   * and simply make sure that every value is 0.
  //   * This ensures that we saw an equal number of character counts in string 1 (during incrementing) and string 2 (during decrementing).
// * Finally we go through all the values in the characterCount map
  //   * and simply make sure that every value is 0.
  return Array.from(charCount.values()).every(val => val === 0);
}


// * We start by creating a map to track this character count.
//  We initialize it to a map with string keys and number values.
// * We go ahead and iterate through all the characters in string 1.
//   * For each character in string 1
//   * We set the character count for this character.
//   * We get the previous value, If there was no previous value we initializing it to 0
//   * Finally we increment the previous count by 1.
// * We repeat the process for the second string. Iterating through all the characters in the second string.
//   * if there is no key for it from string 1. Then we know we don't have an anagram.
//   * Otherwise simply decrement the count
// * Finally we go through all the values in the characterCount map
//   * and simply make sure that every value is 0.
//   * This ensures that we saw an equal number of character counts in string 1 (during incrementing) and string 2 (during decrementing).
