1. Implement a function called

areThereDuplicates

which checks whether there are any duplicates among the arguments passed in. The function should either run in O(n) time and O(n) space or O(n log n) time and O(1) space.

Examples:

areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true
areThereDuplicates('a', 'b', 'c', 'a') // true

2. Add commas.

This function takes in a number and formats that number so that it has commas after every third digit to the left of the decimal point. You can assume that all numbers are non-negative.
Examples:

addCommas(1) // "1"
addCommas(1000) // "1,000"
addCommas(123456789) // "123,456,789"
addCommas(3.141592) // "3.141592"
addCommas(54321.99) // "54,321.99"

function areThereDuplicates(...args) {
  // good luck. (supply any arguments you deem necessary.)
  obj = {}
  var result = false
  args.forEach(function(x){
    if(obj[x] === x){
     result = true
    } else {
      obj[x] = x;
    }
  })
  return result;
}

function addCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");

// return number.toLocaleString( 'en-IN', {maximumSignificantDigits: 17})
  // var newstring = '';

  // if (number.toString().length <= 3) {
  //   return number;
  // }

  // var numbSplit = number.toString().split('.');
  // var count;

  // for (var i = 0 ; i <  numbSplit[0].length - 1; i ++) {
  //   count++
  //   if(count === 3){
  //     count = 0
  //   }
  //   if (i = numbSplit[0].length - 1) {
  //     continue;
  //   }
  //     newstring +=
  //       numbSplit[0][i].substring(0, i) +
  //       ',' +
  //       numbSplit[0][i].substring(numbSplit[0][i].length - i);

  // }
  // return newstring + numbSplit[1];
  // // good luck. (supply any arguments you deem necessary.)
}

// Model solution
function areThereDuplicates() {
  // return new Set(args).size !== args.length


  // Ok ok....
  var sorted = args.sort((a,b) => a > b);
  var start = 0;
  var next = 1;
  while(next < sorted.length){
    if(sorted[start] === sorted[next]){
        return true
    }
    start++
    next++
  }
  return false
}

function addCommas(num) {
  var strNum = num.toString();
  if(strNum.length < 3) return strNum;

  var finalStr = '';
  var decimalSplit = strNum.split('.');
  var counter = 0;

  function parseValues(start){
     for(var i = start.length-1; i >= 0; i--){
      counter++
      if(counter % 3 === 0 && i > 0){
        finalStr = "," + strNum[i] + finalStr
      } else {
        finalStr = strNum[i] + finalStr
      }
    }
  }

  if(decimalSplit.length === 1){
    parseValues(strNum)
    return finalStr;
  } else {
    parseValues(decimalSplit[0])
    return finalStr + "." + decimalSplit[1];
  }
}
