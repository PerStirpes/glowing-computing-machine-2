// Implement the following function:
//
// 1. Truncate.
//
// Given a string and a number n, truncate the string to a shorter string containing at most n characters.
//If the string gets truncated, the truncated return string should have a "..." at the end.
//  Because of this, the smallest number passed in as a second argument should be 3.
//
// Examples:
//
// truncate("Hello World", 6) // "Hel..."
// truncate("Problem solving is the best!", 10) // "Problem..."
// truncate("Yo", 100) // "Yo"
// truncate("Super cool", 3) // "..."
// truncate("Super cool", 2) // "Truncation must be at least 3 characters."
//
// Implement this function in two ways: iteratively and recursively

function truncateIteratively(string, number) {
  // good luck. add any arguments you deem necessary.
  // check to see if the number is < 3
  if (string.length < number) {
    return string;
  } else if (number < 3) {
    return 'Truncation must be at least 3 characters.';
  } else {
    return string.slice(0, number >= 3 ? number - 3 : number) + '...';
  }
}

function truncateRecursively(string, number) {
  // good luck. add any arguments you deem necessary.
  if (number < 3) {
    return 'Truncation must be at least 3 characters.';
  }
  if (number === 3) {
    return '...';
  }
  if (string.length < number) {
    return string;
  }

  return string[0].concat(truncateRecursively(string.slice(1), number - 1));
}

// Model solution

function truncateIteratively(str, n) {
  if (n < 3) return 'Truncation must be at least 3 characters.';
  if (n > str.length + 2) return str;
  return str.slice(0, n - 3) + '...';
}

function truncateRecursively(str, n) {
  if (n < 3) return 'Truncation must be at least 3 characters.';
  if (n > str.length + 2) return str;
  if (n === 3) return '...';
  return str[0] + truncateRecursively(str.slice(1), n - 1);
}
