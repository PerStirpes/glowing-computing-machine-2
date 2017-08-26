Chapter 12. Algorithm Complexity
In this chapter, we will to cover the famous big-O notation (introduced in Chapter 10 , Sorting and Searching Algorithms) and the NP-Completeness theory and also take a look at how we can have some fun with algorithms and boost our knowledge to improve our programming and problem-solving skills.

Big-O notation
In Chapter 10 , Sorting and Searching Algorithms, we introduced the concept of big-O notation. What does this mean exactly? It is used to describe the performance or complexity of an algorithm.

When analyzing algorithms, the following classes of functions are the most commonly encountered:
Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

git remote add origin git@github.com:PerStirpes/Build-Algorithms.git
git push -u origin master

|Notation       |   Name
| ------------- |:-------------:| -----:|
| O(1) |Constant

|O(log(n))| Logarithmic

O((log(n))c)

Poly-logarithmic

O(n)

Linear

O(n2)

Quadratic

O(nc)

Polynomial

O(cn)

Exponential

Understanding big-O notation
How do we measure the efficiency of an algorithm? We usually use resources such as CPU (time) usage, memory usage, disk usage, and network usage. When talking about big-O notation, we usually consider CPU (time) usage.

Let's try to understand how big-O notation works using some examples.

O(1)
Consider the following function:

function increment(num){
  return ++num;
}
If we try to execute the increment(1) function, we will have an execution time equal to x. If we try to execute the increment function again with a different parameter (let's say num is 2), the execution time will also be x. The parameter does not matter; the performance of the function increment will be the same. For this reason, we can say the preceding function has a complexity of O(1) (which is constant).

O(N)
Now, let's use the sequential search algorithm we implemented in Chapter 10 , Sorting and Searching Algorithms, as an example:

function sequentialSearch(array, item){
  for (var i=0; i<array.length; i++){
    if (item === array[i]){ //{1}
      return i;
    }
  }
  return -1;
}
If we pass an array with 10 elements ([1, ..., 10]) to this function and look for element 1, in the first attempt, we will find the element we are looking for. Let's suppose the cost is 1 for each time we execute line {1}.

Now, let's suppose we are looking for element 11. Line {1} will be executed 10 times (it will iterate through all the values of the array and it will not find the value we are looking for; therefore, it will return -1). If line {1} has a cost of 1, executing it 10 times has a cost of 10, which is 10 times more than the first example we used.

Now, suppose the array has 1000 elements ([1, ..., 1000]). Searching for element 1001 will result in line {1} being executed 1000 times (and then returning -1).

Note that the total cost of execution of the sequentialSearch function depends on the number of elements of the array (size) and also on the value we are looking for. If the item we are looking for exists in the array, then how many times will line {1} be executed? If the item we are looking for does not exist, then the line {1} will be executed the size-of-the-array times, which we call the worst-case scenario.

Considering the worst-case scenario of the sequentialSearch function, if we have an array with size 10, the cost will be 10. If we have an array with size 1000, the cost will be 1000. We can conclude that the sequentialSearch function has a complexity of O(n)—n being the size of the array (input).

To see the preceding explanation in practice, let's modify the algorithm to calculate the cost (the worst-case scenario), as follows:

function sequentialSearch(array, item){
  var cost = 0;
  for (var i=0; i<array.length; i++){
    cost++;
    if (item === array[i]){ //{1}
      return i;
    }
  }
  console.log('cost for sequentialSearch with input size ' +
  array.length + ' is ' + cost);
  return -1;
}
Try executing the preceding algorithm using different input sizes so that you can see the different outputs.

O(N2)
For the O(n2) example, let's use the bubble sort algorithm:

function swap(array, index1, index2){
  var aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
}

function bubbleSort(array){
  var length = array.length;
  for (var i=0; i<length; i++){        //{1}
    for (var j=0; j<length-1; j++ ){ //{2}
      if (array[j] > array[j+1]){
        swap(array, j, j+1);
      }
    }
  }
}
Consider that lines {1} and {2} have a cost of 1 each. Let's modify the algorithm to calculate the cost as follows:

function bubbleSort(array){
  var length = array.length;
  var cost = 0;
  for (var i=0; i<length; i++){ //{1}
    cost++;
    for (var j=0; j<length-1; j++ ){ //{2}
      cost++;
      if (array[j] > array[j+1]){
        swap(array, j, j+1);
      }
    }
  }
  console.log('cost for bubbleSort with input size ' + length + '
  is ' + cost);
}
If we execute bubbleSort for an array with size 10, the cost will be 100 (102). If we execute bubbleSort for an array with size 100, the cost will be 10,000 (1002). Note that the execution will take even longer every time we increase the input size.

NOTE
Note that the code from the O(n) complexity has only one for loop, whereas O(n2) has two nested for loops. If the algorithm has three for loops iterating through the array, it will probably be O(n3).

Comparing complexities
We can compare the different big-O notation complexities mentioned previously using a chart as follows:

Comparing complexities
NOTE
This chart was also plotted using JavaScript! You can find the source code used to plot this chart inside the bigOChart folder under chapter12 of the sample code files included with this book.

In the following section, you will find a cheat sheet that shows the complexities of the algorithms we implemented in this book:

DATA STRUCTURES
The following table show the complexities for Data Structures:

Data Structure | Average Cases  |Worst Cases
| ------------- |:-------------:| -----:|
|Insert |Delete| Search | Insert | Delete | Search |  
| Array/ Stack/ Queue| O(1) | O(1) | | O(n) | O(1) |O(1) |O(n)

Linked List

O(1)

O(1)

O(n)

O(1)

O(1)

O(n)

Doubly Linked List

O(1)

O(1)

O(n)

O(1)

O(1)

O(n)

Hash Table

O(1)

O(1)

O(1)

O(n)

O(n)

O(n)

Binary Search Tree

O(log(n))

O(log(n))

O(log(n))

O(n)

O(n)

O(n)

AVL Tree

O(log(n))

O(log(n))

O(log(n))

O(log(n))

O(log(n))

O(log(n))

GRAPHS
The following table show the complexities for Graphs:

Node/ Edge Management

Storage Size

Add Vertex

Add Edge

Remove Vertex

Remove Edge

Query

Adjacency List

O (|V| + |E|)

O(1)

O(1)

O (|V| + |E|)

O(|E|)

O(|V|)

Adjacency Matrix

O(|V|2)

O(|V|2)

O(1)

O(|V|2)

O(1)

O(1)

SORTING ALGORITHMS
The following table show the complexities for Sorting Algorithms:

Algorithm (applied to Array)

Time Complexity


Best Cases

Average Cases

Worst Cases


Bubble Sort

O(n)

O(n2)

O(n2)

Selection Sort

O(n2)

O(n2)

O(n2)

Insertion Sort

O(n)

O(n2)

O(n2)

Merge Sort

O(n log(n))

O(n log(n))

O(n log(n))

Quick Sort

O(n log(n))

O(n log(n))

O(n2)

Heap Sort

O(n log(n))

O(n log(n))

O(n log(n))

Bucket Sort

O(n+k)

O(n+k)

O(n2)

Radix Sort

O(nk)

O(nk)

O(nk)

SEARCHING ALGORITHMS
The following table show the complexities for Searching Algorithms:

Algorithm

Data Structure

Worst Case

Sequential Search

Array

O(n)

Binary Search

Sorted Array

O(log(n))

Depth First Search (DFS)

Graph of |V| vertices and |E| edges

O(|V| + |E|)

Breadth First Search (BFS)

Graph of |V| vertices and |E| edges

O(|V| + |E|)

Introduction to the NP-Completeness theory
In general, we say an algorithm is efficient if it is O(nk) for some constant k, and this is called a polynomial algorithm.

Given a problem in which there is a polynomial algorithm even for the worst case, the algorithm is denoted by P (polynomial).

There is another set of algorithms called NP (nondeterministic polynomial). An NP problem is a problem for which the solution can be verified in a polynomial time.

If a problem P has an algorithm that runs in polynomial, we can also verify its solution in polynomial time. Then, we can conclude that P is subset of, or equal to NP. However, it is unknown whether P = NP.

NP-Complete problems are the hardest problems in an NP set. A decision problem L is NP-Complete if:

L is in NP (that is, any given solution for NP-complete problems can be verified quickly, but there is no known efficient solution).
Every problem in NP is reducible to L in polynomial time.
To understand what the reduction of a problem is, consider L and M as two decision problems. Suppose algorithm A solves L. That is, if y is an input for M, then algorithm B will answer Yes or No depending upon whether y belongs to M or not. The idea is to find a transformation from L to M so that the algorithm B can be part of an algorithm A to solve A.

We also have another set of problems called NP-Hard. A problem is NP-Hard if it follows property 2 (of NP-Complete), and it does not need to follow property 1. Therefore, NP-Complete set is also a subset of the NP-Hard set.

NOTE
Whether P = NP or not is one of the biggest questions in computer science. If someone finds the answer to this question, it would have a major impact in cryptography, algorithm research, artificial intelligence, and many other fields.

The following diagram represents the Euler diagram for the P , NP , NP-Complete , and NP-Hard problems, considering that P < > NP:

Introduction to the NP-Completeness theory
As examples of NP-Hard problems that are not NP-Complete problems, we can mention the halting problem and Boolean Satisfiability problem (SAT).

As examples of NP-Complete problems, we can also mention the subset sum problem, traveling salesman problem, and vertex cover problem.

NOTE
For more information about these problems, refer to  https://en.wikipedia.org/wiki/NP-completeness .

IMPOSSIBLE PROBLEMS AND HEURISTIC ALGORITHMS
Some of these problems we mentioned are impossible to solve. However, there are techniques that can be used to achieve an approximate solution in a satisfactory time. A technique would be using heuristic algorithms. A solution produced by heuristics might not be the best of all solutions, but it is good enough to solve the problem at the time.

Some examples of heuristics are local search, genetic algorithms, heuristics routing, and machine learning. For more information, take a look at  http://goo.gl/gxIu9w .

TIP
Heuristics are a great and fun way of trying to solve a problem. You can try to pick a problem and develop a heuristic for your college or master's degree thesis.
