//search algorithms declaration
function linearSearchLoop(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) return `The item ${item} is located at index ${i}`;
  }
  return `item ${item} not found`;
}

function linearSearchRecursion(arr, item, i = 0) {
  if (i === arr.length) return `item ${item} not found`;
  if (arr[i] === item) return `The item ${item} is located at index ${i}`;
  else return linearSearchRecursion(arr, item, ++i);
}

function binarySearch(arr, item, left = 0, right) {
  right = !Object.is(right, undefined) ? right : arr.length - 1;
  let mid = Math.floor((left + right) / 2);
  if (arr[mid] === item) {
    return `The item ${item} is located at index ${mid}`;
  } else if (arr[mid] < item) {
    left = mid + 1;
    return binarySearch(arr, item, left, right);
  } else if (arr[mid] > item) {
    right = mid - 1;
    return binarySearch(arr, item, left, right);
  } else {
    return `item ${item} not found`;
  }
}

function jumpSearchLoop(arr, item) {
  const BLOCK_SIZE = 5;
  for (let i = 0; i < arr.length; i += BLOCK_SIZE) {
    if (arr[i] === item) {
      return `The item ${item} is located at index ${i}`;
    } else if (arr[i] > item) {
      const linear = () => {
        const taken = arr.slice(i - BLOCK_SIZE);
        const skipped = arr.slice(0, i - BLOCK_SIZE).length;
        for (let j = 0; j < taken.length; j++) {
          if (taken[j] === item)
            return `The item ${item} is located at index ${j + skipped}`;
        }
        return `item ${item} not found`;
      };
      return linear();
    }
  }
}

function jumpSearchRecursion(arr, item, i = 0) {
  const BLOCK_SIZE = 5;
  if (arr[i] === item) {
    return `The item ${item} is located at index ${i}`;
  } else if (arr[i] > item) {
    const taken = arr.slice(i - BLOCK_SIZE);
    const skipped = arr.slice(0, i - BLOCK_SIZE).length;
    const linear = (j) => {
      if (j === taken.length) return `item ${item} not found`;
      if (taken[j] === item)
        return `The item ${item} is located at index ${j + skipped}`;
      else return linear(++j);
    };
    return linear(0);
  } else {
    i += BLOCK_SIZE;
    return jumpSearchRecursion(arr, item, i);
  }
}

//driver code
const arr = [];
for (let i = 0; i <= 100; i++) {
  arr.push(i);
}
const item = Math.floor(Math.random() * 101);

console.log(linearSearchLoop(arr, item));
console.log(linearSearchRecursion(arr, item));
console.log(binarySearch(arr, item));
console.log(jumpSearchLoop(arr, item));
console.log(jumpSearchRecursion(arr, item));
