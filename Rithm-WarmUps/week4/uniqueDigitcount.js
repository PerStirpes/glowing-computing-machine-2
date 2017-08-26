function uniqueDigitCount(number) {
  var count = 0;
  if (number < 1) return 0;

  for (var i = 1; i <= number; i++) {
    count += cruncher(i);
  }
  return count;
}

function cruncher(number) {
  var uniqueSoFar = 9;
  if (number === 1) return 10;

  for (var i = 1; i < number; i++) {
    uniqueSoFar *= 9 - i + 1;
  }
  return uniqueSoFar;
}

// Write a function called uniqueDigitCount which takes in an exponent and returns a count of all numbers from 0 up to 10^(exponent) that have unique digits. This range should include 0 but exclude the largest value.

// Examples:

// uniqueDigitCount(1);
// // 10, every number from 0 to 9 has unique digits

// uniqueDigitCount(2);
// // 91, every number from 0 to 99 has unique digits
// // except for 11, 22, 33, 44, 55, 66, 77, 88, 99

// If you pass in a number less than 1, return 0.

// Watch out for your time complexity! As a bonus, try to solve this problem in constant time (the last test checks for this; you can view it as a bonus).

//Model solution
// option 1 - build up the counts
function uniqueDigitCount(exp) {
  if (exp < 1) return 0;
  if (exp === 1) return 10;
  var newUniques = 0;
  if (exp <= 10) {
    newUniques = 9;
    for (var i = 9; i >= Math.max(9 - exp + 2, 1); i--) {
      newUniques *= i;
    }
  }
  return uniqueDigitCount(exp - 1) + newUniques;
}

// option 2 - if you know the counts, store them!
// function uniqueDigitCount(exp) {
//   if (exp < 1) return 0;
//   var counts = [
//     10,
//     91,
//     739,
//     5275,
//     32491,
//     168571,
//     712891,
//     2345851,
//     5611771,
//     8877691
//   ];
//   return (exp < 10) ? counts[exp - 1] : counts[9];
// }
