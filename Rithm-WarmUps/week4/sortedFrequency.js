// Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array 
//
// sortedFrequency([1,1,2,2,2,2,3],2) // 4
// sortedFrequency([1,1,2,2,2,2,3],3) // 1
// sortedFrequency([1,1,2,2,2,2,3],1) // 2
// sortedFrequency([1,1,2,2,2,2,3],4) // -1
//
// Time Complexity - O(log n)


//refactor
function sortedFrequency(arr, target){
	let first = findFirstLastOccurances(arr, target);
	if(first === -1) return - 1;

	let last = findFirstLastOccurances(arr, target, false)
	return last - first + 1;
}

function findFirstLastOccurances(arr, target, flag=true, low = 0, high = arr.length - 1,  result = -1 ) {
    while (low <= high) {
        let mid = (low + high) >> 1;
        if (arr[mid] === target) {
            result = mid
            flag ? high = mid - 1 : low = mid + 1;
        } else if (arr[mid] > target) {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
    return result
}


// function sortedFrequencyLast(arr, target, low=0, high=arr.length-1, result= -1) {
// // last occurence
//     while (low <= high) {
//         var mid = (low + high) >> 1;
//         if (arr[mid] === target) {
//             result = mid
//             low = mid + 1
//         } else if (arr[mid] > target) {
//             high = mid - 1
//         } else {
//             low = mid + 1
//         }
//     }
//     return result
// }

// function sortedFrequencyFirst(arr, target, low=0, high=arr.length-1, result= -1) {
// // first occurence
//     while (low <= high) {
//         var mid = (low + high) >> 1;
//         if (arr[mid] === target) {
//             result = mid
//             high = mid - 1
//         } else if (arr[mid] > target) {
//             high = mid - 1
//         } else {
//             low = mid + 1
//         }
//     }
//     return result
// }


// function sortedFrequency(arr, target, low=0, high=arr.length-1, result= -1){
// 	var last = sortedFrequencyLast(arr, target, low=0, high=arr.length-1, result= -1)
// 	var first = sortedFrequencyFirst(arr, target, low=0, high=arr.length-1, result= -1);
// 	if(last === -1 && first === -1){
// 	    return -1;
// 	}
// 	return last - first + 1;
// }

//Model solution

function sortedFrequency(arr, num){
  let firstIdx = findFirst(arr,num);
  if(firstIdx == -1) return firstIdx;
  let lastIdx = findLast(arr,num);
  return lastIdx-firstIdx+1;
}

function findFirst(arr, num, low=0, high=arr.length-1){
  if(high >= low){
    let mid = Math.floor((low+high) / 2)
    if((mid === 0 || num > arr[mid-1]) && arr[mid] === num){
      return mid;
    } else if(num > arr[mid]){
      return findFirst(arr, num, mid+1, high)
    } else {
      return findFirst(arr, num, low, mid-1)
    }
  }
  return -1
}

function findLast(arr, num, low=0, high=arr.length-1){
  if(high >= low){
    let mid = Math.floor((low+high) / 2)
    if((mid === arr.length-1 || num < arr[mid+1]) && arr[mid] === num){
      return mid;
    } else if(num < arr[mid]){
      return findLast(arr, num, low, mid-1)
    } else {
      return findLast(arr, num, mid+1, high)
    }
  }
  return -1
}
