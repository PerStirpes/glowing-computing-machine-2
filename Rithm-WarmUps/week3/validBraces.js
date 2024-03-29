// Write a function called validBraces that takes a string of braces, and determines if the order of the braces is valid. validBraces should return true if the string is valid, and false if it's invalid.
//
// This problem is similar to validParenthesis, but introduces four new characters. Open and closed brackets, and open and closed curly braces. All input strings will be nonempty, and will only consist of:
//
// - open parentheses '('
// - closed parentheses ')'
// - open brackets '['
// - closed brackets ']'
// - open curly braces '{'
// - closed curly braces '}'

validBraces("()") // true
validBraces("[]") // true
validBraces("{}") // true
validBraces("(){}[]") // true
validBraces("([{}])") // true
validBraces("({})[({})]") // true
validBraces("(({{[[]]}}))") // true
validBraces("{}({})[]") // true

validBraces(")(}{][") // false
validBraces("())({}}{()][][") // false
validBraces("(((({{") // false
validBraces("}}]]))}])") // false
validBraces("(}") // false
validBraces("[(])") // false

BONUS - Solve this in O(n) Time

function validBraces(string){
  while (string.length !== 0) {
    if (string.includes('()')) {
      string = string.replace('()', '');
    } else if (string.includes('[]')) {
      string = string.replace('[]', '');
    } else if (string.includes('{}')) {
      string = string.replace('{}', '');
    } else {
      return false;
    }
  }
  return true;
}



// function validBraces(string) {

//   var matches = {
//         '(': ')',
//         '[': ']',
//         '{': '}',
//     };

//     var openBraces = new Set(['(', '[', '{']);
//     var closeBraces = new Set([')', ']', '}']);

//     bracesStack = [];

//     for (var i = 0; i < string.length; i++) {
//         var brace = string.charAt(i);

//         if (openBraces.has(brace)) {
//             bracesStack.push(brace);
//         } else if (closeBraces.has(brace)) {
//             if (!bracesStack.length) {
//                 return false;
//             } else {
//                 lastUnclosedOpener = bracesStack.pop();
//                 if (matches[lastUnclosedOpener] !== brace) {
//                     return false;
//                 }
//             }
//         }
//     }
//     return bracesStack.length === 0;
// }


//Model Soultion
function validBraces(str){
    const matches = {
        ')' : '(',
        ']' : '[',
        '}' : '{'
    };
    const stack = [];
    for (let i = 0; i < str.length; ++i)
        if (str[i] === '(' || str[i] === '[' || str[i] === '{') stack.push(str[i]);
        else if (stack[stack.length-1] === matches[str[i]]) stack.pop();
        else return false;

    return stack.length === 0;
}
