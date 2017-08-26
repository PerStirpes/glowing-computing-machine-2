// Instructions from your teacher:
// Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.
//
// countZeroes([1,1,1,1,0,0]) // 2
// countZeroes([1,0,0,0,0]) // 4
// countZeroes([0,0,0]) // 3
// countZeroes([1,1,1,1]) // 0
//
// Time Complexity - O(log n)

function countZeroes(arr, target, low = 0, high = arr.length - 1, result = 0) {
  if (arr[0] === 0) {
    return arr.length;
  }
  while (low <= high) {
    let mid = (low + high) >> 1;
    if (arr[mid] === 0) {
      if (arr[mid - 1] === 1) {
        return arr.length - mid;
      }
      high -= 1;
    } else {
      low += 1;
    }
  }
  return result;
}

// Model solution
function countZeroes(arr) {
  // add whatever parameters you deem necessary - good luck!
  let firstZero = findFirst(arr);
  if (firstZero === -1) return 0;

  return arr.length - firstZero;
}

function findFirst(arr, low = 0, high = arr.length - 1) {
  if (high >= low) {
    let mid = low + Math.floor((high - low) / 2);
    if ((mid === 0 || arr[mid - 1] === 1) && arr[mid] === 0) {
      return mid;
    } else if (arr[mid] === 1) {
      return findFirst(arr, mid + 1, high);
    }
    return findFirst(arr, low, mid - 1);
  }
  return -1;
}
