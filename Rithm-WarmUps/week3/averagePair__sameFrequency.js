// PART I
//
// Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.
//
// Your solution MUST have the following complexities:
//
// Time: O(N)
// Space: O(1)
//
// Sample Input:
//
// averagePair([1,2,3],2.5) // true
// averagePair([1,3,3,5,6,7,10,12,19],8) // true
// averagePair([-1,0,3,4,5,6], 4.1) // false
// averagePair([],4) // false
//
// PART II
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


function averagePair(arr,target){
  var i = Math.floor(arr.length / 2);
  var j = i + 1;
  var avg;
  while (i >= 0 && j < arr.length) {
    avg = arr[i] + arr[j] / 2;
    if(avg == target) {
      return true;
    } else if (avg < target) {
      j++;
    } else {
      i--;
    }
  }
  return false;
}

// function sameFrequency(n1, n2){
//   if (n1.length !== n2.length) {
//     return false;
//   }
//   str1 = n1.toString();
//   str2 = n2.toString();
//   obj1 = {};
//   for (var i = 0; i < str1.length; i++) {
//     if(str1[i] in obj1) {
//       obj1[str1[i]] += 1;
//     } else {
//       obj1[str1[i]] = 1;
//     }
//   }
//   obj2 = {};
//   for (i = 0; i < str2.length; i++) {
//     if(str2[i] in obj2) {
//       obj2[str2[i]] += 1;
//     } else {
//       obj2[str2[i]] = 1;
//     }
//   }
//   for (var item in obj1) {
//     if(obj1[item] !== obj2[item] || !(item in obj2)) {
//       return false;
//     }
//   }
//   return true;
// }

function sameFrequency(n1, n2) {
    s1 = n1.toString()
    s2 = n2.toString()
    const charCount = new Map();
    for (const char of s1.split('')) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    for (const char of s2.split('')) {
        if (!charCount.has(char))
            return false;
        charCount.set(char, charCount.get(char) - 1);
    }
    return Array.from(charCount.values()).every(val=>val === 0);
}

//model Solution

function averagePair(arr, num){
  let start = 0
  let end = arr.length-1;
  while(start < end){
    let avg = (arr[start]+arr[end]) / 2
    if(avg === num) return true;
    else if(avg < num) start++
    else end--
  }
  return false;
}

function sameFrequency(num1, num2){
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if(strNum1.length !== strNum2.length) return false;

  let countNum1 = {};
  let countNum2 = {};

  for(let i = 0; i < strNum1.length; i++){
    /*if (countNum1[strNum1[i]] === undefined) {
      countNum1[strNum1[i]] = 0
    }
    countNum1[strNum1[i]]++;*/
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1
  }

  for(let j = 0; j < strNum1.length; j++){
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1
  }

  for(let key in countNum1){
    if(countNum1[key] !== countNum2[key]) return false;
  }

  // for(let key in countNum2){
  //   if(countNum1[key] !== countNum2[key]) return false;
  // }
  return true;
}
