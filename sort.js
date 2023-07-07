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

function bubbleSortRecursion(arr, isAscending = true) {
  const outer = (arr, i) => {
    if (i === arr.length) {
      if (isAscending) return arr;
      return reverseRecursion(arr);
    } else {
      const inner = (arr, i, j) => {
        if (j === arr.length - i) return arr;
        if (arr[j] > arr[j + 1]) arr.splice(j, 2, arr[j + 1], arr[j]);
        return inner(arr, i, ++j);
      };
      return outer(inner(arr, i, 0), ++i);
    }
  };
  return outer(arr, 0);
}

function insertionSortLoop(arr, isAscending = true) {
  let current;
  for (let i = 0; i < arr.length; i++) {
    current = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = current;
  }
  if (isAscending) return arr;
  return reverseLoop(arr);
}

function insertionSortRecursion(arr, isAscending = true, i = 0, current) {
  let j;
  if (i === arr.length) {
    if (isAscending) return arr;
    return reverseLoop(arr);
  } else {
    current = arr[i];
    j = i - 1;
    const insert = () => {
      if (j < 0 || arr[j] < current) return;
      arr[j + 1] = arr[j];
      j -= 1;
      insert();
    };
    insert();
    arr[j + 1] = current;
    return insertionSortRecursion(arr, isAscending, ++i, current);
  }
}

function mergeSort(arr, isAscending = true) {
  const merge = (left, right, arr) => {
    let i = 0,
      l = 0,
      r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        arr[i] = left[l];
        i++;
        l++;
      } else {
        arr[i] = right[r];
        i++;
        r++;
      }
    }
    while (l < left.length) {
      arr[i] = left[l];
      i++;
      l++;
    }
    while (r < right.length) {
      arr[i] = right[r];
      i++;
      r++;
    }
    if (isAscending) return arr;
    return reverseLoop(arr);
  };
  if (arr.length <= 1) return;
  const mid = Math.round(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  mergeSort(left, isAscending);
  mergeSort(right, isAscending);
  return merge(left, right, arr);
}

//driver code
const arr = [];
for (let i = 0; i <= 100; i++) {
  arr.push(i);
}
arr.sort(() => Math.random() - 0.5);

//[8, 2, 6, 4, 5], false - testing purposes

console.log(bubbleSortLoop(arr));
console.log(bubbleSortRecursion(arr));
console.log(insertionSortLoop(arr));
console.log(insertionSortRecursion(arr));
console.log(mergeSort(arr));
