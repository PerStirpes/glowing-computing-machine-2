Dynamic programming
Dynamic programming (DP) is an optimization technique used to solve complex problems by breaking them in to smaller subproblems.

We covered some dynamic programming techniques earlier in this book. One problem we solved with dynamic programming was DFS in Chapter 9 , Graphs.

NOTE
Note that the dynamic programming approach is different from the divide-and-conquer approach (as we used for the merge sort and quick sort algorithms). While the divide and conquer approach breaks the problem into independent subproblems and then combines the solutions, dynamic programming breaks the problem into dependent subproblems.

Another example is the Fibonacci problem we solved in the previous section. We broke the Fibonacci problem into smaller problems, as shown in the diagram of this section.

There are three important steps we need to follow when solving problems with DP:

Define the subproblems.
Implement the recurrence that solves the subproblems (in this step, we need to follow the steps for recursion that we discussed in the previous section).
Recognize and solve the base cases.
There are some famous problems that can be solved with dynamic programming:

The knapsack problem: In this problem, given a set of items, each one with a value and volume, the goal is to determine the best collection of items out of the set in a way to maximize the total value. The constraint of the problem is that the total volume needs to be the volume supported by the "knapsack" or less.
The longest common subsequence: This consists of finding the longest subsequence (a sequence that can be derived from another sequence by deleting some elements without changing the order of the remaining elements) common to all sequences in a set of sequences.
Matrix chain multiplication: In this problem, given a sequence of matrices, the goal is to find the most efficient way to multiply these matrices (with as few operations as possible). The multiplication is not performed; the solution is finding the sequences in each of the matrices that need to be multiplied.
Coin change: This consists of finding how many different ways we can make change in a particular amount of cents using a given amount of set denominations d1...dn.
All-pairs shortest paths in a graph: This consists of finding the shortest path from vertex u to vertex v for all pairs of vertices (u,v). You learned about this problem in Chapter 9, Graphs using the Floyd-Warshall algorithm.
We will cover these problems in the next topics.

TIP
These problems and their solutions are very common in programming the interviews of big companies such as Google, Amazon, Microsoft, Oracle, and so on.

The minimum coin change problem
The minimum coin change problem is a variation of the coin change problem. The coin change problem consists of finding out in how many ways we can make change for a particular amount of cents using a given amount of set denominations d1... dn. The minimum coin change problem consists of finding the minimum number of coins needed to make a particular amount of cents using a given amount of set denominations d1... dn.

For example, the United States has the following denominations (coins): d1 = 1; d2 = 5; d3 = 10; and d4 = 25.

If we need to make change for 36 cents, we can use 1 quarter (25), 1 dime (10), and 1 penny (1).

How do we transform this solution into an algorithm?

The min-coin change solution consists of finding the minimum number of coins for n. But to do this, first we need to find the solution for every x < n. Then, we can build up the solution out of the solutions for smaller values.

Let's take a look at the algorithm:

```js
function MinCoinChange(coins){
  var coins = coins; //{1}
  var cache = {};    //{2}

  this.makeChange = function(amount) {
    var me = this;
    if (!amount) { //{3}
      return [];
    }
    if (cache[amount]) { //{4}
      return cache[amount];
    }
    var min = [], newMin, newAmount;
    for (var i=0; i<coins.length; i++){ //{5}
      var coin = coins[i];
      newAmount = amount - coin;  //{6}
      if (newAmount >= 0){
        newMin = me.makeChange(newAmount); //{7}
      }
      if (
        newAmount >= 0 && //{8}
        (newMin.length < min.length-1 || !min.length)//{9}
        && (newMin.length || !newAmount) //{10})
        {
          min = [coin].concat(newMin); //{11}
          console.log('new Min ' + min + ' for ' + amount);
        }
    }
    return (cache[amount] = min); //{12}
  };
}
```

To be more organized, we created a class that will solve the min-coin change problem, given the denominations. Let's go through the algorithm step by step.

Our MinCoinChange class receives the coins parameter (line {1}), which represents the denominations of our problem. For the US coin system, it would be [1, 5, 10, 25]. We can pass any denominations that we like. Also, to be more efficient and not recalculate values, we will keep cache (line {2}).

Then, we have the makeChange method, which is also recursive and is the method that will solve the problem for us. First, if amount is not positive (< 0), then we will return an empty array (line {3}); at the end of the execution of this method, we will return an array with the amount of each coin that can be used to make change (the minimum amount of coins). Next, we will check cache. If the result is already cached (line {4}), then we will simply return its value; otherwise, we execute the algorithm.

To help us further, we will solve the problem based on the coins parameter (denominations). So, for each coin (line {5}), we will calculate newAmount (line {6}), which will decrease the value until we reach the minimum amount of change we can give (remember that this algorithm will calculate all makeChange results for x < amount). If newAmount is a valid value (positive value), then we will calculate the result for it as well (line {7}).

At the end, we will verify whether newAmount is valid, whether minValue (the minimum amount of coins) is the best result, and whether minValue and newAmount are valid values (line {10}). If all the verifications are positive, it means we have a better result than previously (line {11}. For example, for 5 cents, we can give 5 pennies or 1 nickel, 1 nickel being the best solution). At the end, we will return the final result (line {12}).

Let's test this algorithm via the following code:

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));
Note that if we inspect the cache variable, it will hold all the results for 1 to 36 cents. The result for the preceding code will be [1, 10, 25].

In the source code of this book, you will find some extra lines of code that will output the steps of this algorithm. For example, if we use the denominations 1, 3, and 4 and execute the algorithm for the amount 6, we will produce the following output:

new Min 1 for 1
new Min 1,1 for 2
new Min 1,1,1 for 3
new Min 3 for 3
new Min 1,3 for 4
new Min 4 for 4
new Min 1,4 for 5
new Min 1,1,4 for 6
new Min 3,3 for 6
[3, 3]
So, for the amount 6, the best solution is giving two coins of value 3.

The knapsack problem
The knapsack problem is a combinatorial optimization problem. It can be described as follows: given a fixed-size knapsack with a capacity to carry W amount of weight and a set of items that have a value and weight, find the best solution in a way to fill the knapsack with the most valuable items so that the total weight is less than or equal to W.

Here, we have an example:

Item #

Weight

Value

1

2

3

2

3

4

3

4

5

Consider that the knapsack can only carry a weight of 5. For this example, we can say that the best solution would be filling the knapsack with items 1 and 2, which together have a weight of 5 and a total value of 7.

NOTE
There are two versions of this problem. The 0-1 version, in which we can only fill the knapsack with the whole item, and the fractional knapsack problem, in which we can take fractions of the items. For this example, we will work with the 0-1 version of the problem. The fractional version cannot be solved with dynamic programming, but it can be solved with a greedy algorithm, which you will learn later on in this chapter.

Let's take a look at the knapsack algorithm, as follows:
```js
function knapSack(capacity, weights, values, n) {

  var i, w, a, b, kS = [];

  for (i = 0; i <= n; i++) { //{1}
    kS[i] = [];
  }

  for (i = 0; i <= n; i++){
    for (w = 0; w <= capacity; w++){
      if (i == 0 || w == 0){ //{2}
        kS[i][w] = 0;
      } else if (weights[i-1] <= w){ //{3}
        a = values[i-1] + kS[i-1][w-weights[i-1]];
        b = kS[i-1][w];
        kS[i][w] = (a > b) ? a : b; //{4} max(a,b)
      } else{
        kS[i][w] = kS[i-1][w]; //{5}
      }
    }
  }
  return kS[n][capacity]; //{6}
}
```
Let's take a look at how this algorithm works:

Line {1}: First, we will initialize the matrix that will be used to find the solution. This matrix is ks[n+1][capacity+1].
Line {2}: We will ignore the first column and row of the matrix so that we can work only with indexes different from 0.
Line {3}: Item i can only be part of the solution if its weight is less than the constraint (capacity); otherwise, the total weight will be bigger than the capacity, and this cannot happen. When this happens, we will simply ignore its value and use the previous one (line {5}).
Line {4}: When we find that an item can be part of solution, we will choose the one with the maximum value.
Line {6}: The solution can be found in the last cell of the two-dimensional table, which is found in the lower-right corner of the table.
We can test the following algorithm using our initial example:

var values = [3,4,5],
weights = [2,3,4],
capacity = 5,
n = values.length;
console.log(knapSack(capacity, weights, values, n)); //outputs 7
The following diagram exemplifies the construction of the kS matrix for our example:

The knapsack problem
Note that this algorithm only outputs the maximum value that can be carried by the knapsack but not the actual items. We can add the following additional function to find the items that are part of the solution:

```
function findValues(n, capacity, kS, weights, values){
  var i=n, k=capacity;
  console.log('Items that are part of the solution:');

  while (i>0 && k>0){
    if (kS[i][k] !== kS[i-1][k]){
      console.log('item '+i+' can be part of solution w,v: ' +
      weights[i-1] + ',' + values[i-1]);
      i--;
      k = k - kS[i][k];
    } else {
      i--;
    }
  }
}
```
We can call this function right before line {7} of the knapsack function. If we execute the complete algorithm, we will have the following output:

Items that are part of the solution:
item 2 can be part of solution w,v: 4,3
item 1 can be part of solution w,v: 3,2
Total value that can be carried: 7
NOTE
The knapsack problem can also be written recursively. You can find the recursive version within the source code bundle of this book.

The longest common subsequence
Another DP problem that is very often used in programming challenge problems is the longest common subsequence (LCS). This problems consists of finding the length of the longest sub­sequence in two string sequences. The longest subsequence is a sequence that appears in the same relative order but not necessarily contiguous (not substring) in both strings.

Consider the following example:

The longest common subsequence
Now, let's take a look at the following algorithm:
```
function lcs(wordX, wordY) {

  var m = wordX.length,
  n = wordY.length,
  l = [],
  i, j, a, b;

  for (i = 0; i <= m; ++i) {
    l[i] = [];
    //{1}
    for (j = 0; j <= n; ++j) {
      l[i][j] = 0;
      //{2}
    }
  }

  for (i=0; i<=m; i++) {
    for (j=0; j<=n; j++) {
      if (i == 0 || j == 0){
        l[i][j] = 0;
      } else if (wordX[i-1] == wordY[j-1]) {
        l[i][j] = l[i-1][j-1] + 1;
        //{3}
        } else {
          a = l[i-1][j];
          b = l[i][j-1];
          l[i][j] = (a > b) ? a : b; //max(a,b)
          //{4}
        }
      }
    }
    //{5}
    return l[m][n];
}
```
If we compare the knapsack problem with the LCS algorithm, we will notice that both are very similar. This technique is called memoization, which consists of building the solution from a top manner, and the solution is given in the lower-right corner of the table/matrix.

Like, the knapsack problem algorithm, this approach only outputs the length of the LCS, but not the actual LCS algorithm. To be able to extract this information, we need to modify our algorithm a little bit by declaring a new matrix called solution. Note that in our code, there are some comments, and we need to replace the comments with the following code:

Line {1}: solution[i] = [];
Line {2}: solution[i][j] = '0';
Line {3}: solution[i][j] = 'diagonal';
Line {4}: solution[i][j]=(l[i][j] == l[i-1][j]) ? 'top' : 'left';
Line {5}: printSolution(solution, l, wordX, wordY, m, n);
The printSolution function is given as follows:

```
function printSolution(solution, l, wordX, wordY, m, n){

  var a = m, b = n, i, j,
  x = solution[a][b],
  answer = '';

  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }
  console.log('lcs: '+ answer);
}
```
We can add the char to the answer whenever the direction of the solution matrix is diagonal.

If we execute the preceding algorithm using the 'acbaed' and 'abcadf' strings, we will get the output 4. The matrix l that was used to build the result will look similar to the following. We can use the additional algorithm to back track the LCS value, as well (this is highlighted in the following figure):

The longest common subsequence
From the preceding matrix, we know that the LCS algorithm is acad with length 4.

NOTE
The LCS problem can also be written recursively. You can find the recursive version within the source code bundle of this book.

Matrix chain multiplication
Matrix chain multiplication is another famous problem that can be solved with dynamic programming. The problem consists of finding the best way (order) of multiplying a set of matrices.

Let's try to understand the problem a little better. To multiply two matrices, A being a matrix m by n and B a matrix m by p. The result is matrix C, n by p.

Now, consider that we want to multiply A*B*C*D. As multiplication is associative, we can multiple these matrices in any order. So, let's consider the following:

A is a 10 by 100 matrix
B is a 100 by 5 matrix
C is a 5 by 50 matrix
D is a 50 by 1 matrix
The result is a A*B*C*D 10 by 1 matrix
Within this example, there are five ways of doing this multiplication:

(A(B(CD))): The total of the multiplications is 1,750.
((AB)(CD)): The total of the multiplications is 5,300.
(((AB)C)D): The total of the multiplications is 8,000.
((A(BC))D): The total of the multiplications is 75,500.
(A((BC)D)): The total of the multiplications is 31,000.
The order of the multiplication can make a difference in the total number of multiplications performed. So, how can we create an algorithm to find the minimum number of operations? The matrix chain multiplication algorithm is given as follows:
```
function matrixChainOrder(p, n) {
  var i, j, k, l, q, m = [];

  for (i = 1; i <= n; i++){
    m[i] = [];
    m[i][i] = 0;
  }

  for (l=2; l<n; l++) {
    for (i=1; i<=n-l+1; i++) {
      j = i+l-1;
      m[i][j] = Number.MAX_SAFE_INTEGER;
      for (k=i; k<=j-1; k++) {
        q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]; //{1}
        if (q < m[i][j]){
          m[i][j] = q;
          //{2}
        }
      }
    }
  }
  //{3}
  return m[1][n-1];
}
```
The most important line of this code is line {1} because this is the one doing all the magic, meaning it calculates the number of multiplications of a given parenthesis order and stores the value in the auxiliary matrix m.

If we execute the preceding algorithm to our initial example, we will have the output 7500, as we mentioned before being the minimum number of operations. Take a look at this:

var p = [10, 100, 5, 50, 1],
n = p.length;
console.log(matrixChainOrder(p, n));
However, this algorithm does not provide us with the order of the parenthesis of the optimal solution either. We can make some changes to our code to be able to get this information.

First, we need to declare and initialize an auxiliary matrix s via the following code:
```
var s=[];
for (i = 0; i <= n; i++){
  s[i] = [];
  for (j=0; j<=n; j++){
    s[i][j] = 0;
  }
}
```
Then, on line {2} of the matrixChainOrder function, we will add the following code:

s[i][j]=k;
On line {3}, we will call the function that will print the parenthesis for us, as follows:

printOptimalParenthesis(s, 1, n-1);
Finally, we will have the printOptimalParenthesis function, which would be as follows:
```
function printOptimalParenthesis(s, i, j){
  if(i == j) {
    console.log("A[" + i + "]");
  } else {
    console.log("(");
    printOptimalParenthesis(s, i, s[i][j]);
    printOptimalParenthesis(s, s[i][j] + 1, j);
    console.log(")");
  }
}
```
If we execute the modified algorithm, we will also get the optimal order of the parenthesis, (A[1](A[2](A[3]A[4]))), which can be translated to (A(B(CD))).
