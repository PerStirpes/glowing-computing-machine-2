// Part I
// //pivotIndex___nonRepeatingSubstring (Week 1 Day 4)
// Write a function called pivotIndex which accepts an array of integers, and returns the pivot index where the sum of the items to the left equal to the sum of the items to the right. If there are more than one valid pivot index, return the smallest value.
// Constraints:
//
// Time Complexity: O(N)
// Space Complexity: O(1)
//
// Sample Input / Output:
//
// pivotIndex([1,2,1,6,3,1]) // 3
// pivotIndex([5,2,7]) // -1  no valid pivot index
// pivotIndex([-1,3,-3,2]) // 1 valid pivot at 2: -1 + 3 = 2 however there is a smaller valid pivot at 1: -1 = -3 + 2
//
// Part II
//
// Write a function called nonRepeatSubstring which accepts a string and returns the longest substring where the characters in the substring do not repeat. Non-repeating characters means there are no two consecutive letters that are the same.
// You can assume the input string only has lowercase letters.
//
// Constraints:
//
// Time Complexity: O(N)
// Space Complexity: O(N)
//
// Sample Input / Output:
//
// nonRepeatSubstring('abb') // 'ab'
// nonRepeatSubstring('abccde') // 'abc'   'abc' and 'cde' are equally as long, however 'abc' is leftmost
// nonRepeatSubstring('aaaabbbb') // 'ab'  'ab' is the longest substring without repeating characters

function pivotIndex(array, sum = 0, leftSum = 0, rightSum = 0) {
  array.forEach(element => (sum += element));

  for (var idx = 0; idx < array.length - 1; idx++) {
    rightSum = sum - leftSum - array[idx];
    if (leftSum === rightSum) {
      return idx;
    }
    leftSum += array[idx];
  }
  return -1;
}

function nonRepeatSubstring(str, longest = '', build = '') {
  for (var i = 0; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      if (build.length > longest.length) {
        longest = build;
      }
    } else {
      build += str[i];
    }
  }
  return longest;
}
// Model solution
function pivotIndex(nums) {
  let index = -1;
  if (nums.length < 1) {
    return index;
  } else if (nums.length === 1) {
    return 0;
  }
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  let startSum = nums[0];
  let endSum;
  for (let i = 1; i < nums.length - 1; i++) {
    endSum = totalSum - startSum - nums[i];
    if (endSum === startSum) {
      return i;
    } else {
      startSum += nums[i];
    }
  }
  return index;
}

function nonRepeatSubstring(str) {
  if (str.length <= 1) {
    return str;
  }
  let sub = '';
  let currSub = str[0];
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      if (currSub.length > sub.length) {
        sub = currSub;
      }
      currSub = str[i];
    } else {
      currSub += str[i];
    }
  }
  if (currSub.length > sub.length) {
    sub = currSub;
  }
  return sub;
}
