function countUniqueValues(arr, count = arr.length, first = 0, second = 1) {
  while (second < arr.length - 1) {
    if (arr[first] === arr[second]) {
      count--;
    }
    first++;
    second++;
  }
  return count;
}
//
// console.log(countUniqueValues([1]))
//
// Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.
//
// countUniqueValues([1,1,1,1,1,2]) // 2
// countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
// countUniqueValues([]) // 0
// countUniqueValues([-2,-1,-1,0,1]) // 4
//
// Time Complexity - O(n)
// Space Complexity - O(n)
//
// Bonus
//
// You must do this with constant or O(1) space and O(n) time.

//Model solution
function countUniqueValues(arr) {
  // O(n) space
  // return new Set(arr).size;
  // O(1) space
  if (arr.length === 0) return 0;
  var i = 0;
  for (var j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}
