Stacks have a variety of applications in real-world problems. They can be used for backtracking problems to remember tasks or paths visited, and to undo actions (we will learn how to apply this example when we discuss graphs and backtracking problems later on this book). The Java and C# programming languages use stacks to store variables and method calls and there is a stack overflow exception that can be thrown specially when working with recursive algorithms (which we will cover later on this book as well).

Now that we know how to use the Stack class, let's use it to solve some Computer Science problems. In this section, we will learn the three most famous algorithm examples of using a stack. We will cover the decimal to binary problem, where we will also transform the algorithm to a base converter algorithm, the balanced parenthesis problem, and, finally, we will learn how to solve the tower of Hanoi problem using stacks.

##Decimal to binary
You are probably already aware of the decimal base. However, binary representation is very important in Computer Science, as everything in a computer is represented by binary digits (0 and 1). Without the ability to convert back and forth between decimal and binary numbers, it would be a little bit difficult to communicate with a computer.

To convert a decimal number to a binary representation, we can divide the number by 2 (binary is a base 2 number system) until the division result is 0. As an example, we will convert the number 10 into binary digits:

This conversion is one of the first things you learn in college (Computer Science classes). The following is our algorithm:


```
function divideBy2(decNumber){

  var remStack = new Stack(),
  rem,
  binaryString = '';

  while (decNumber > 0){ //{1} //(line {1}), we get the remainder of the division (mod), and push it to the stack
    rem = Math.floor(decNumber % 2); //{2} we get the remainder of the division (mod),
    remStack.push(rem); //{3} and push it to the stack
    decNumber = Math.floor(decNumber / 2); //{4}  //we update the number that will be divided by 2
    //An important observation: JavaScript has a numeric data type, but it does not distinguish integers from floating points.
  }

  while (!remStack.isEmpty()){ //{5} Finally, we pop the elements from the stack until it is empty
    binaryString += remStack.pop().toString();// concatenating the elements removed from the stack into a string (line {5})
  }

  return binaryString;
}
```

In this preceding code, while the division result is not zero (line {1}), we get the remainder of the division (mod), and push it to the stack (lines {2} and {3}), and finally, we update the number that will be divided by 2 (line {4}). An important observation: JavaScript has a numeric data type, but it does not distinguish integers from floating points. For this reason, we need to use the Math.floor function to obtain only the integer value from the division operations. Finally, we pop the elements from the stack until it is empty, concatenating the elements that were removed from the stack into a string (line {5}).

We can try the previous algorithm, and output its result on the console using the following code:

##THE BASE CONVERTER ALGORITHM
We can easily modify the previous algorithm to make it work as a converter from decimal to any base. Instead of dividing the decimal number by 2, we can pass the desired base as an argument to the method and use it in the divisions, as shown in the following algorithm:
```
function baseConverter(decNumber, base){

  var remStack = new Stack(),
  rem,
  baseString = '',
  digits = '0123456789ABCDEF'; //{6}

  while (decNumber > 0){
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }

  while (!remStack.isEmpty()){
    baseString += digits[remStack.pop()]; //{7}
  }

  return baseString;
}

//We can use the previous algorithm, and output its result on the console as follows:

console.log(divideBy2(233));
console.log(divideBy2(10));
console.log(divideBy2(1000));
```
There is one more thing we need to change. In the conversion from decimal to binary, the remainders will be 0 or 1; in the conversion from decimal to octagonal, the remainders will be from 0 to 8, but in the conversion from decimal to hexadecimal, the remainders can be 0 to 8 plus the letters A to F (values 10 to 15). For this reason, we need to convert these values as well (lines {6} and {7}).

##THE BASE CONVERTER ALGORITHM
We can easily modify the previous algorithm to make it work as a converter from decimal to any base. Instead of dividing the decimal number by 2, we can pass the desired base as an argument to the method and use it in the divisions, as shown in the following algorithm:
```
function baseConverter(decNumber, base){

  var remStack = new Stack(),
  rem,
  baseString = '',
  digits = '0123456789ABCDEF'; //{6}

  while (decNumber > 0){
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }

  while (!remStack.isEmpty()){
    baseString += digits[remStack.pop()]; //{7}
  }

  return baseString;
}
```
There is one more thing we need to change. In the conversion from decimal to binary, the remainders will be 0 or 1; in the conversion from decimal to octagonal, the remainders will be from 0 to 8, but in the conversion from decimal to hexadecimal, the remainders can be 0 to 8 plus the letters A to F (values 10 to 15). For this reason, we need to convert these values as well (lines {6} and {7}).
