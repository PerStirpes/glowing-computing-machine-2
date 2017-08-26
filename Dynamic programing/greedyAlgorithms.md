Greedy algorithms
A greedy algorithm follows the problem-solving heuristic of making the locally optimal choice (the best solution at the time) at each stage with the hope of finding a global optimum (global best solution). It does not evaluate the bigger picture like a dynamic programming algorithm does.

Let's take a look at how we can solve the min-coin change and knapsack problems we covered in the dynamic programming topic using the greedy approach.

NOTE
We covered some other greedy algorithms in this book in  **Chapter 9 , Graphs, such as Dijkstra's algorithm, Prim's algorithm, and Kruskal's algorithm.**

The min-coin change problem
The min-coin change problem can also be resolved with a greedy algorithm. Most of the time, the result is also optimal, but for some denominations, the result will not be optimal.

Let's take a look at the algorithm:
```js
function MinCoinChange(coins){
  var coins = coins; //{1}

  this.makeChange = function(amount) {
    var change = [],
    total = 0;
    for (var i=coins.length; i>=0; i--){ //{2}
      var coin = coins[i];
      while (total + coin <= amount) { //{3}
        change.push(coin);           //{4}
        total += coin;               //{5}
      }
    }
    return change;
  };
}
```
Note that the greedy version of MinCoinChange is much simpler than the DP one. Similar to the dynamic programming approach, we will instantiate MinCoinChange by passing the denominations as a parameter (line {1}).

For each coin (line {2}, starting from the biggest one to the smallest one), we will add the coin value to total, and total needs to be less than amount (line {3}). We will add coin to the result (line {4}) and also to total (line {5}).

As you can see, the solution is very simple. We will start with the coin with the greatest value and give the change that is possible with this coin. When we cannot give more coins for the current coin value, we will start giving change with the coin that has the second greatest value and so on.

To test the code, we will use the same code we used in the DP approach, as follows:

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));
The result will also be [25, 10, 1], the same result that we got using DP. The following diagram exemplifies how the algorithm is executed:

The min-coin change problem
However, if we use the [1, 3, 4] denomination and execute the preceding greedy algorithm, we will get [4, 1, 1] as the result. If we use the dynamic programming solution, we will get [3, 3] as the result, which is the optimal result.

Greedy algorithms are simpler and also faster than dynamic programming algorithms. However, as we can note, it does not give the optimal answer all the time. However, on average, it would output an acceptable solution for the time it takes to execute.

The fractional knapsack problem
The algorithm to solve the fractional knapsack problem is a little different from the dynamic programming version. While in the 0-1 knapsack problem we can only use the whole item to fill the knapsack, in the fractional knapsack problem, we can use fractions of the items. Let's use the same example we used before to compare the differences, as follows:

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

In the dynamic programming example, we considered that the knapsack could only carry a weight of 5. For this example, we can say that the best solution would be filling the knapsack with items 1 and 2, which together have a weight of 5 and a total value of 7.

If we consider the same capacity for the fractional knapsack problem, we will have the same output. So, let's consider the capacity as 6 instead of 5.

In this case, the solution would be to use items 1 and 2 and only 25% of item 3. This would give a maximum value of 8.25 with a total weight of 6.

Let's take a look at the following algorithm:

function knapSack(capacity, values, weights) {
  var n = values.length,
  load = 0, i = 0, val = 0;

  for (i=0; i<n && load < capacity; i++) { //{1}

    if (weights[i] <= (capacity-load)) { //{2}
      val += values[i];
      load += weights[i];
    } else {
      var r = (capacity-load)/weights[i]; //{3}
      val += r * values[i];
      load += weights[i];
    }
  }
  return w;
}
The following is the explanation:

Line {1}: While the total load is less than the capacity, we will iterate the items
Line {2}: If we can use the total weight of the item, then we will add it to the total value (val) and update the current load of the knapsack
Line {3}: If we cannot use the total weight of the item, we will calculate what is the ratio (r) that we can use
If we apply the same capacity 6 to the 0-1 knapsack problem, we will see that items 1 and 3 will be selected as part of the solution. In this case, we have two different outputs for the same problem but using different approaches to solve the problem.
