# Sorting and Searching Algorithms
Suppose we have a telephone agenda (or a notebook) that does not have any sorting order. When you need to add a contact with telephone numbers, you simply write it down in the next available slot. Suppose you also have a high number of contacts in your contact list. On any ordinary day, you need to find a particular contact and his/her telephone number. However, as the contact list is not organized in any order, you have to check it contact by contact until you find the desired one. This approach is horrible, don't you agree? Imagine that you have to search for a contact in Yellow Pages and it is not organized! It could take forever!

For this reason, among others, we need to organize sets of information, such as the information we have stored in data structures. Sorting and searching algorithms are widely used in the daily problems we have to solve.

In this chapter, you will learn about the most commonly used sorting and searching algorithms, such as the bubble sort, selection sort, insertion sort, merge sort, quick sort, and heap sort as well as the sequential and binary search algorithms.

The sorting algorithms
From this introduction, you should understand that you need to learn how to sort first and then search for the information given. In this section, we will cover some of the most well-known sorting algorithms in computer science. We will start with the slowest one, and then we will cover some better algorithms.

Before we get started with the sorting algorithms, let's create an array (list) to represent the data structure that we want to sort and search, as follows:
```
function ArrayList(){

  var array = []; //{1}

  this.insert = function(item){ //{2}
    array.push(item);
  };

  this.toString= function(){ //{3}
    return array.join();
  };
}
```
As you can note, ArrayList is a simple data structure that stores the items in an array (line {1}). We only have an insert method to add elements to our data structure (line {2}), which simply uses the native push method of the JavaScript Array class that we covered in Chapter 2 , Arrays. Finally, to help us verify the result, the toString method (line {3}) concatenates all the array's elements into a single string so that we can easily output the result in the browser's console using the join method from the native JavaScript Array class.

NOTE
The join method joins the elements of an array into a string and returns the string.

Note that this ArrayList class does not have any method to remove data or insert it into specific positions. We want to keep it simple so that we can focus on the sorting and searching algorithms. We will add all the sorting and searching methods to this class.

Now, we can get started!

The bubble sort
When people first start learning sorting algorithms, they usually learn the bubble sort algorithm first, because it is the simplest of all the sorting algorithms. However, it is one of the worst-case sorting algorithms with respect to runtime, and you will see why.

The bubble sort algorithm compares every two adjacent items and swaps them if the first one is bigger than the second one. It has this name because the items tend to move up into the correct order, like bubbles rising to the surface.

Let's implement the bubble sort algorithm as follows:

this.bubbleSort = function(){
  var length = array.length;           //{1}
  for (var i=0; i<length; i++){        //{2}
    for (var j=0; j<length-1; j++ ){ //{3}
      if (array[j] > array[j+1]){  //{4}
        swap(array, j, j+1);     //{5}
      }
    }
  }
};
First, let's declare a variable called length, which will store the size of the array (line {1}). This step will help us to get the size of the array on lines {2} and {3}, and this step is optional. Then, we will have an outer loop (line {2}) that will iterate the array from its first position to the last one, controlling how many passes are done in the array (which should be one pass per item of the array as the number of passes is equal to the size of the array). Then, we have an inner loop (line {3}) that will iterate the array starting from its first position to the penultimate item that will actually do the comparison between the current item and the next one (line {4}). If the items are out of order (that is, the current one is bigger than the next one), then we will swap them (line {5}), meaning that the value of the j+1 position will be transferred to the j position and vice versa.

Now, we need to declare the swap function (a private function that is available only to the code inside the ArrayList class):

var swap = function(array, index1, index2){
  var aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
};
To make the swap, we need a temporary variable to store the value of one of the items in. We will use this method for other sorting methods as well, and this is the reason we will declare this swap code into a function so that we can reuse it.

If we use ES6 (ECMAScript 2015), we can replace the preceding function with the following code (which uses the enhanced object properties that you learned in Chapter 1, JavaScript — A Quick Overview ):

[array[index1], array[index2]] = [array[index2], array[index1]];
The following diagram illustrates the bubble sort in action:

The bubble sort
Each different section in the preceding diagram represents a pass made by the outer loop (line {2}), and each comparison between two adjacent items is made by the inner loop (line {3}).

To test the bubble sort algorithm and get the same results shown by the diagram, we will use the following code:

function createNonSortedArray(size){ //{6}
  var array = new ArrayList();
  for (var i = size; i> 0; i--){
    array.insert(i);
  }
  return array;
}

var array = createNonSortedArray(5); //{7}
console.log(array.toString());       //{8}

array.bubbleSort();                  //{9}
console.log(array.toString());       //{10}
To help us test the sorting algorithms that you will learn in this chapter, we will create a function that will automatically create a nonsorted array with the size that is passed by the parameter (line {6}). If we pass 5 as the parameter, the function will create the following array for us: [5, 4, 3, 2, 1]. Then, all we have to do is call this function and store its return value in a variable that contains the instance of the ArrayList class initialized with some numbers (line {7}). Just to make sure we have an unsorted array, we will output the array's content on console (line {8}), call the bubble sort method (line {9}), and output the array's content on console again so that we can verify that the array was sorted (line {10}).

NOTE
You can find the complete source code of the ArrayList class and the testing code (with additional comments) on the source code that you downloaded from the support page (or from the GitHub repository).

Note that when the algorithm executes the second pass of the outer loop (the second section of the previous diagram), the numbers 4 and 5 are already sorted. Nevertheless, on subsequent comparisons, we will keep comparing them even if the comparison is not needed. For this reason, we will make a small improvement on the bubble sort algorithm.

THE IMPROVED BUBBLE SORT
If we subtract the number of passes from the inner loop, we will avoid all the unnecessary comparisons made by the inner loop (line {1}):

this.modifiedBubbleSort = function(){
  var length = array.length;
  for (var i=0; i<length; i++){
    for (var j=0; j<length-1-i; j++ ){ //{1}
      if (array[j] > array[j+1]){
        swap(j, j+1);
      }
    }
  }
};
The following diagram exemplifies how the improved bubble sort works:

The improved bubble sort
NOTE
Note that we did not compare the numbers that are already in place. Even though we made this small change to improve the bubble sort algorithm a little bit, it is not a recommended algorithm. It has a complexity of O(n 2).

We will talk more about the big O notation in Chapter 12, Algorithm complexity, to learn more about algorithms.

The selection sort
The selection sort algorithm is an in-place comparison sort algorithm. The general idea of the selection sort is to find the minimum value in the data structure, place it in the first position, then find the second minimum value, place it in the second position, and so on.

The following is the source code for the selection sort algorithm:

this.selectionSort = function(){
  var length = array.length,            //{1}
  indexMin;
  for (var i=0; i<length-1; i++){       //{2}
    indexMin = i;                     //{3}
    for (var j=i; j<length; j++){     //{4}
      if(array[indexMin]>array[j]){ //{5}
        indexMin = j;             //{6}
      }
    }
    if (i !== indexMin){              //{7}
      swap(i, indexMin);
    }
  }
};
First, we will declare some of the variables that we will use in the algorithm (line {1}). Then, we have an outer loop (line {2}) that will iterate the array and control the passes (that is, which n th value of the array we need to find next or the next min value). We will assume that the first value of the current pass is the minimum value of the array (line {3}). Then, starting from the current i value to the end of the array (line {4}), we will compare whether the value in the  j position is less than the current minimum value (line {5}); if this is true, we will change the value of the minimum to the new minimum value (line {6}). When we get out of the inner loop (line {4}), we will have the nth minimum value of the array. Then, if the minimum value is different from the original minimum value (line {7}), we will swap them.

To test the selection sort algorithm, we can use the following code:

array = createNonSortedArray(5);
console.log(array.toString());
array.selectionSort();
console.log(array.toString());
The following diagram exemplifies the selection sort algorithm in action based on our array, which is used in the preceding code [5, 4, 3, 2, 1]:

The selection sort
The arrows at the bottom of the array indicate the positions currently in consideration to find the minimum value (inner loop: line {4}), and each step of the preceding diagram represents the outer loop (line {2}).

The selection sort is also an algorithm of complexity O(n 2). Similar to the bubble sort, it contains two nested loops that are responsible for the quadratic complexity. However, the selection sort performs worse than the insertion sort algorithm that you will learn next.

The insertion sort
The insertion sort algorithm builds the final sorted array one item at a time. It assumes that the first element is already sorted. Then, a comparison with the second item is performed: should the second item stay in its place or be inserted before the first item? So, the first two items will get sorted, he comparison will take place with the third item (that is, should it be inserted in the first, second, or third position?), and so on.

The following code represents the insertion sort algorithm:

this.insertionSort = function(){
  var length = array.length,            //{1}
  j, temp;
  for (var i=1; i<length; i++){         //{2}
    j = i;                            //{3}
    temp = array[i];                  //{4}
    while (j>0 && array[j-1] > temp){ //{5}
      array[j] = array[j-1];        //{6}
      j--;
    }
    array[j] = temp;                  //{7}
  }
};
As usual, the first line of the algorithm is used to declare the variables we will use in the source code (line {1}). Then, we will iterate the array to find the correct place for the ith item (line {2}). Note that we started from the second position (index 1), instead of position 0 (as we considered the first item already sorted). Then, we  initiated an auxiliary variable with the value of i (line {3}), and we also stored the value in a temporary value (line {4}) so that we can insert it in the correct position later. The next step is finding the correct place to insert the item. As long as the j variable is bigger than 0 (because the first index of the array is 0 and there is no negative index) and the previous value in the array is bigger than the value we are comparing (line {5}), we will shift the previous value to the current position (line {6}) and decrease the value of j. At the end, we will insert the value in its correct position.

The following diagram exemplifies the insertion sort in action:

The insertion sort
For example, suppose the array we are trying to sort is [3, 5, 1, 4, 2]. These values will be carried out in the steps performed by the insertion sort algorithm, as described in the following steps:

The value 3 is already sorted, so we will start sorting the second value of the array, which is the value 5. The value 3 is less than the value 5, so 5 stays in the same place (meaning the second position of the array). The values 3 and 5 are already sorted.
The next value to be sorted and inserted in the correct place is 1 (which is currently in the third position of the array). The value 5 is greater than 1, so 5 is shifted to the third position. We need to analyze whether 1 should be inserted in the second position—is 1 greater than 3? It's not, so the value 3 gets shifted to the second position. Next, we need to verify that 1 is inserted in the first position of the array. As 0 is the first position and there isn't a negative position, 1 needs to be inserted on the first position. The values 1, 3, and 5 are sorted.
We move to the next value: 4. Should the value 4 stay in the current position (index 3), or does it need to be moved to a lower position? The value 4 is less than 5, so 5 will get shifted to index 3. Should we insert 4 in the index 2? The value 4 is greater than 3, so 4 is inserted in position 3 of the array.
The next value to be inserted is 2 (position 4 of array). The value 5 is greater than 2, so 5 gets shifted to the index 4. The value 4 is greater than 2, so 4 will also get shifted (position 3). The value 3 is also greater than 2, and 3 also gets shifted. The value 1 is less than 2, so 2 is inserted at the second position of the array. Thus, the array is sorted.
This algorithm has a better performance than the selection and bubble sort algorithms when sorting small arrays.

The merge sort
The merge sort algorithm is the first sorting algorithm that can be used in the real world. The three first sorting algorithms that you learned in this book do not give good performance, but the merge sort gives a good performance with a complexity of O(n log n).

NOTE
The JavaScript Array class defines a sort function (Array.prototype.sort) that can be used to sort arrays using JavaScript (with no need to implement the algorithm ourselves). ECMAScript does not define which sorting algorithm needs to be used, so each browser can implement its own algorithm. For example, Mozilla Firefox uses the merge sort as the Array.prototype.sort implementation, while Chrome uses a variation of the quick sort (which you will learn next).

The merge sort is a divide-and-conquer algorithm. The idea behind it is to divide the original array into smaller arrays until each small array has only one position and then merge these smaller arrays into bigger ones until we have a single big array at the end that is sorted.

Because of the divide-and-conquer approach, the merge sort algorithm is also recursive, as follows:

this.mergeSort = function(){
  array = mergeSortRec(array);
};
As in the previous chapters, whenever we implement a recursive function, we always implement a helper function that will be executed. For the merge sort, we will do the same. We will declare the mergeSort method that will be available for use, and the mergeSort method will call mergeSortRec, which is a recursive function:

var mergeSortRec = function(array){
  var length = array.length;
  if(length === 1) {      //{1}
    return array;       //{2}
  }
  var mid = Math.floor(length / 2),     //{3}
  left = array.slice(0, mid),       //{4}
  right = array.slice(mid, length); //{5}

  return merge(mergeSortRec(left), mergeSortRec(right)); //{6}
};
The merge sort will transform a bigger array into smaller arrays until they have only one item in them. As the algorithm is recursive, we need a stop condition—that is, if the array has a size equal to 1 (line {1}). If positive, we will return the array with size 1 (line {2}) because it is already sorted.

If the array is bigger than 1, then we will split it into smaller arrays. To do so, first we need to find the middle of the array (line {3}), and once we find the middle, we will split the array into two smaller arrays, which we will call left (line {4}) and right (line {5}). The left array comprises of elements from index 0 to the middle index, and the right array consists of elements from the middle index to the end of the original array.

The next steps will be to call the merge function (line {6}), which will be responsible for merging and sorting the smaller arrays into bigger ones until we have the original array sorted and back together. To keep breaking the original array into smaller pieces, we will recursively call mergeSortRec again, passing the smaller array to the left as a parameter and another call for the array to the right. Execute the following code:

var merge = function(left, right){
  var result = [], // {7}
  il = 0,
  ir = 0;

  while(il < left.length && ir < right.length) { // {8}
    if(left[il] < right[ir]) {
      result.push(left[il++]);  // {9}
    } else{
      result.push(right[ir++]); // {10}
    }
  }

  while (il < left.length){    // {11}
    result.push(left[il++]);
  }

  while (ir < right.length){   // {12}
    result.push(right[ir++]);
  }

  return result; // {13}
};
The merge function receives two arrays and merges them into a bigger array. During the merge is when the sorting happens. First, we need to declare a new array that will be created for the merge and also declare two variables (line {7}) that will be used to iterate the two arrays (the left and right arrays). While we can iterate through the two arrays (line {8}), we will compare whether the item from the left array is less than the item from the right array. If positive, we will add the item from the left array to the merged result array and also increment the variable that is used to iterate the array (line {9}); otherwise, we will add the item from the right array and increment the variable that is used to iterate the array (line {10}).

Next, we will add every remaining item from the left array (line {11}) to the merged result array and do the same for the remaining items from the right array (line {12}). At the end, we will return a merged array as the result (line {13}).

If we execute the mergeSort function, this is how it will be executed:

The merge sort
Note that first the algorithm splits the original array until it has smaller arrays with a single element, and then it starts merging. While merging, it does the sorting as well until we have the original array completely back together and sorted.

The quick sort
The quick sort is probably the most used sorting algorithm. It has a complexity of O(n log n), and it usually performs better than other O(n log n) sorting algorithms. Similarly to the merge sort, it also uses the divide-and-conquer approach, dividing the original array into smaller ones (but without splitting them as the merge sort does) to do the sorting.

The quick sort algorithm is a little bit more complex than the other ones you have learned so far. Let's learn it step by step, as follows:

First, we need to select an item from the array called pivot, which is the middle item in the array.
We will create two pointers—the left-hand side one will point to the first item of the array, and the right-hand side one will point to the last item of the array. We will move the left pointer until we find an item that is bigger than the pivot, and we will also move the right pointer until we find an item that is less than the pivot and swap them. We will repeat this process until the left-hand side pointer passes the right-hand side pointer. This process helps to have values lower than the pivot before the pivot and values greater than the pivot after the pivot. This is called the partition operation.
Next, the algorithm repeats the previous two steps for smaller arrays (subarrays with smaller values and then subarrays with greater values) until the arrays are completely sorted.
Let's start the implementation of the quick sort via the following code:

this.quickSort = function(){
  quick(array,  0, array.length - 1);
};
Similarly to the merge sort, we will start declaring the main method that will call the recursive function, passing the array that we want to sort along with index 0 and its last position (because we want to have the whole array sorted, not only a subset of it), as follows:

var quick = function(array, left, right){

  var index; //{1}

  if (array.length > 1) { //{2}

    index = partition(array, left, right); //{3}

    if (left < index - 1) {           //{4}
      quick(array, left, index - 1);     //{5}
    }

    if (index < right) {                   //{6}
      quick(array, index, right);        //{7}
    }
  }
};
First, we will have the index variable (line {1}), which will help us separate the subarray with smaller and greater values so that we can recursively call the quick function again. We will obtain the index value as the return value of the partition function (line {3}).

If the size of the array is larger than 1 (because an array with a single element is already sorted at line {2}), we will execute the partition operation on the given subarray (the first call will pass the complete array) to obtain index (line {3}). If a subarray with smaller elements exists (line {4}), we will repeat the process for the subarray (line {5}). We will do the same thing for the subarray with greater values. If there is any subarray with a greater value (line {6}), we will repeat the quick sort process (line {7}) as well.

THE PARTITION PROCESS
The first thing we need to do is choose the pivot element. There are a few ways in which we can do this. The simplest one is selecting the first item of the array (the leftmost item). However, studies show that this is not a good selection if the array is almost sorted, causing the worst behavior of the algorithm. Another approach is selecting a random item of the array or the middle item.

Now, let's take a look at the partition process:

var partition = function(array, left, right) {

  var pivot = array[Math.floor((right + left) / 2)], //{8}
  i = left,                                      //{9}
  j = right;                                     //{10}

  while (i <= j) {                //{11}
    while (array[i] < pivot) {  //{12}
      i++;
    }
    while (array[j] > pivot) {  //{13}
      j--;
    }
    if (i <= j) { //{14}
      swap(array, i, j); //{15}
      i++;
      j--;
    }
  }
  return i; //{16}
};
For this implementation, we will select the middle item as pivot (line {8}). We will also initiate the two pointers: left (low at line {9}) with the first element of the array and right (high at line {10}) with the last element of the array.

While the left and right pointers do not cross each other (line {11}), we will execute the partition operation. First, until we find an element that is greater than pivot (line {12}), we will shift the left pointer. We will do the same with the right pointer until we find an element that is less than pivot, and we will shift the right pointer as well (line {13}).

When the left pointer is greater than pivot and the right pointer is lower than pivot, we will compare whether the left pointer index is bigger than the right pointer index (line {14}), meaning whether the left item is greater than the right item (in value). We will swap these (line {15}), shift both the pointers, and repeat the process (starting again at line {11}).

At the end of the partition operation, we will return the index of the left pointer that will be used to create the subarrays in line {3}.

The swap function is the same we created for the bubble sort algorithm at the beginning of this chapter. We can also replace this function with the following ES6 code:

[array[index1], array[index2]] = [array[index2], array[index1]];
THE QUICK SORT IN ACTION
Let's take a look at the quick sort algorithm in action step by step:

The quick sort in action
Given the [3, 5, 1, 6, 4, 7, 2] array, the preceding diagram represents the first execution of the partition operation.

The following diagram exemplifies the execution of the partition operation for the first subarray of lower values (note that 7 and 6 are not part of the subarray):

The quick sort in action
Next, we will continue creating subarrays, as seen in the following diagram but now with greater values than the subarray of the preceding diagram (the lower subarray with value 1 does not need to be partitioned because it only contains one item):

The quick sort in action
The lower subarray [2, 3] from the ([2, 3, 5, 4]) subarray continues to be partitioned (line {5} from the algorithm):

The quick sort in action
Then, the greater subarray [5, 4] from the [2, 3, 5, 4] subarray also continues to be partitioned (line {7} from the algorithm), as shown in the following diagram:

The quick sort in action
At the end, the greater subarray [6, 7] will also suffer the partition operation, completing the execution of the quick sort algorithm.

The heap sort
The heap sort is another efficient algorithm. The algorithm has this name because it sorts the array as if it were a binary tree. To do so, we need to manage the array as a binary tree considering the following information:

Index 0 is the root of the tree
The parent of any node N is N/2 (with the exception of the root node)
The left-hand side child of a node L is 2*L
The right-hand child of a node R is 2*R+1
So for example, we can consider the [3,5,1,6,4,7,2] array as the following tree:

The heap sort
The heap sort algorithm is given as follows:

this.heapSort = function(){
  var heapSize = array.length;
  buildHeap(array); //{1}

  while (heapSize > 1) {
    heapSize--;
    swap(array, 0, heapSize);    //{2}
    heapify(array, heapSize, 0); //{3}
  }
};
The first step is to build the heap structure (line {1}) in a way that array[parent(i)] ≥ array[i].

Then, as the second step, we will swap the first position (the bigger value in the array) with the last position of the current heap (line {2}). This way, the biggest value will be placed at its sorted position.

Step {2} might cancel the heap property. For this reason, we need to run a function called heapify that will transform the array into a heap again, meaning it will get the root of the current heap (the smaller value) and push it into the bottom of the tree again.

The buildHeap function is given as follows:

var buildHeap = function(array){
  var heapSize = array.length;
  for (var i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, heapSize, i);
  }
};
If we apply the preceding function to the [3,5,1,6,4,7,2] array, we will have the following steps until the heap is built:

The heap sort
Finally, we will have the heapify function similar to the following:

var heapify = function(array, heapSize, i){
  var left = i * 2 + 1,
  right = i * 2 + 2,
  largest = i;

  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }

  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(array, i, largest);
    heapify(array, heapSize, largest);
  }
};
After the heap is ready, we can start the heap sort algorithm. These will be the steps {2} and {3} applied to the array.

The heap sort
The counting, bucket, and radix sorts (the distribution sorts)
So far, you have learned how to sort an array without using any auxiliary data structure. There is also another type of sorting algorithm called the distribution sort in which the data is distributed from the original array in multiple intermediate structures (buckets), which are then gathered and placed on the original array.

The most famous distribution algorithms are the counting sort, bucket sort, and radix sort. These three algorithms are very similar.

NOTE
We will not cover these algorithms in this book. However, you can find the algorithms and examples within the source code bundle of this book or in the Github repository at https://github.com/loiane/javascript-datastructures-algorithms .cx
