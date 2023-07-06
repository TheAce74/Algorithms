//utility functions
function reverseLoop(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.unshift(arr[i]);
  }
  return result;
}

function reverseRecursion(arr) {
  const reversed = [];
  const add = (n) => {
    if (n === arr.length) {
      return;
    } else {
      reversed.unshift(arr[n]);
      add(++n);
    }
  };
  add(0);
  return reversed;
}

//sort algorithms declaration
/*
Dev note: The sort algorithms below return arrays sorted in ascending order by default, by passing a
second argument (i.e. for the isAscending parameter) as false, the arrays are returned in descending
order
*/
function bubbleSortLoop(arr, isAscending = true) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        arr.splice(j, 2, arr[j + 1], arr[j]);
      } else {
        continue;
      }
    }
  }
  if (isAscending) return arr;
  return reverseLoop(arr);
}

//driver code
const arr = [];
for (let i = 0; i <= 100; i++) {
  arr.push(i);
}
arr.sort(() => Math.random() - 0.5);

//[8, 2, 6, 4, 5], false - testing purposes

console.log(bubbleSortLoop(arr));
