Introduction to functional programming
So far in this book, we have used a paradigm called imperative programming. In imperative programming, we code each step of the program, describing in detail what needs to be done and in which order it needs to be done.

In this topic, we will introduce a new paradigm called functional programming. Functional programming was a paradigm used especially by academics, and thanks to modern languages such as Python and Ruby, it started becoming popular among industry developers as well. And thankfully, we can use JavaScript to program functionally, leveraging its ES6 capabilities as well.

Functional versus imperative programming
Developing in the functional paradigm is not difficult; it is just a matter of getting used to how the paradigm works. Let's code an example to note the differences.

Consider that we need to print all the elements of an array. We can use imperative programming and declare the following function:

var printArray = function(array){
  for (var i=0; i<array.length; i++){
    console.log(array[i]);
  }
};
printArray([1, 2, 3, 4, 5]);
In the preceding code, we iterated the array and logged each of the items.

Now, let's try converting the example to functional programming. In functional programming, the functions are the rockstars. We need to focus on what needs to be described, not how. Let's go back to the phrase "we iterated the array and logged each of the items." So, the first thing we will focus on is iterating the data, and then we will take action on it, which is logging the items. The following function will be responsible for iterating the array:

var forEach = function(array, action){
  for (var i=0; i<array.length; i++){
    action(array[i]);
  }
};
Then, we will create another function that will be responsible for logging the array elements to the console (we can consider it a callback function), as follows:

var logItem = function (item) {
  console.log(item);
};
Finally, we can use the functions we declared, a follows:

forEach([1, 2, 3, 4, 5], logItem);
Looking closely only at the preceding code, we can describe that we will log each item of the array to the console. And we have our first functional programming example!

A few things to keep in mind:

The main goal is to describe the data and the transformation we need to apply on this data
The order of the execution of the program has low importance, while the steps and their order are very important in imperative programming
Functions and data collections are the rockstars in functional programming
We can use and abuse functions and recursion in functional programming, while the loops, assignments, conditionals, and also functions are used in imperative programming
ES2015 and functional programming
With the new ES2015 functionalities, developing functional programs in JavaScript is even easier. Let's consider an example.

Consider we want to find the minimum value of an array. In imperative programming, to perform this task, we simply need to iterate throughout the array and verify that the current minimum value is bigger than the value of the array; if so, we will assign the new minimum value, as follows:

var findMinArray = function(array){
  var minValue = array[0];
  for (var i=1; i<array.length; i++){
    if (minValue > array[i]){
      minValue = array[i];
    }
  }
   return minValue;
};
console.log(findMinArray([8,6,4,5,9])); //outputs 4
To perform the same task in functional programming, we can use the Math.min function, passing all the elements of the array to be compared. To transform the array into single elements, we can use the ES2015 destructing operator (...), as in the following example:

const min_ = function(array){
  return Math.min(...array)
};
console.log(min_([8,6,4,5,9])); //outputs 4
Using ES2015 arrow functions, we can simplify the preceding code a little bit more:

const min = arr => Math.min(...arr);
console.log(min([8,6,4,5,9]));
The JavaScript functional toolbox - map, filter, and reduce
The map, filter, and reduce functions (which you learned about in Chapter 2, Arrays) are the base of functional programming.

Using the map function, we can transform or map a collection of data into another collection of data. Let's take a look at an example using imperative programming:

var daysOfWeek = [
  {name: 'Monday', value: 1},
  {name: 'Tuesday', value: 2},
  {name: 'Wednesday', value: 7}
];

var daysOfWeekValues_ = [];
for (var i = 0; i < daysOfWeek.length; i++) {
  daysOfWeekValues_.push(daysOfWeek[i].value);
}
Now let's consider the same example using functional programming, as follows:

var daysOfWeekValues = daysOfWeek.map(function(day) {
  return day.value;
});
console.log(daysOfWeekValues);
Using the filter function, we can filter values out of a collection. Let's consider an example:

var positiveNumbers_ = function(array){
  var positive = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] >= 0){
      positive.push(array[i]);
    }
  }
  return positive;
}
console.log(positiveNumbers_([-1,1,2,-2]));
We can write the same code using the functional paradigm, as follows:

var positiveNumbers = function(array){
  return array.filter(function(num){
  return num >= 0;
  })
};
console.log(positiveNumbers([-1,1,2,-2]));
Also, using the reduce function, we can reduce a collection to a specific value. For example, let's take a look at how to sum the values of an array:

var sumValues = function(array){
  var total = array[0];
  for (var i=1; i<array.length; i++){
    total += array[i];
  }
  return total;
};
console.log(sumValues([1, 2, 3, 4, 5]));
We can also write the preceding code as follows:

var sum_ = function(array){
  return array.reduce(function(a, b){
  return a + b;
  })
};
console.log(sum_([1, 2, 3, 4, 5]));
We can also mix these functions with the ES2015 functionalities, such as the destructuring operator and arrow functions, via the following code:

const sum = arr => arr.reduce((a, b) => a + b);
console.log(sum([1, 2, 3, 4, 5]));
Let's take a look at another example. Consider that we need to write a function to concatenate several arrays. To do so, we can create another array that will contain all the elements from the other arrays. We can execute the following code using the imperative paradigm:

var mergeArrays_ = function(arrays){
  var count = arrays.length,
  newArray = [],
  k =0;
  for (var i=0; i<count; i++){
    for (var j=0; j<arrays[i].length; j++){
      newArray[k++] = arrays[i][j];
    }
  }
  return newArray;
};
console.log(mergeArrays_([[1, 2, 3], [4, 5], [6]]));
Note that in this example, we are declaring variables and using loops. Now, let's execute the code written before using functional JavaScript programming, as follows:

var mergeArraysConcat = function(arrays){
  return arrays.reduce( function(p,n){
  return p.concat(n);
  });
};
console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]));
The preceding code does exactly the same task, but it is function-oriented. We can also simplify the code even more with ES2015, as shown by the following code:

const mergeArrays = (...arrays) => [].concat(...arrays);
console.log(mergeArrays([1, 2, 3], [4, 5], [6]));
From 11 lines of code to only one!

NOTE
If you want to practice JavaScript functional programming a little bit more, you can try these exercises (which are very fun to do!): http://reactivex.io/learnrx/

JavaScript functional libraries and data structures
There are some great JavaScript libraries that support the functional paradigm with utility functions and also functional data structures. In the following list, you can find some of the most famous functional JavaScript libraries:

Underscode.js: http://underscorejs.org/
Bilby.js: http://bilby.brianmckenna.org/
Lazy.js: http://danieltao.com/lazy.js/
Bacon.js: https://baconjs.github.io/
Fn.js: http://eliperelman.com/fn.js/
Functional.js: http://functionaljs.com/
Ramda.js: http://ramdajs.com/0.20.1/index.html
Mori: http://swannodette.github.io/mori/
NOTE
If you are interested in learning more about JavaScript functional programming, take a look at this book, also by Packt: https://www.packtpub.com/web-development/functional-programming-javascript
