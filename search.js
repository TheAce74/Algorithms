//search algorithms declaration
/*
Dev Note:
The arrays passed into all the search algorithms here (except the linear search) must be sorted in
ascending order
*/
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

function binarySearchLoop(arr, item, left = 0, right) {
  right = !Object.is(right, undefined) ? right : arr.length - 1;
  while (right >= left) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === item) {
      return `The item ${item} is located at index ${mid}`;
    } else if (arr[mid] < item) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return `item ${item} not found`;
}

function binarySearchRecursion(arr, item, left = 0, right) {
  right = !Object.is(right, undefined) ? right : arr.length - 1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === item) {
    return `The item ${item} is located at index ${mid}`;
  } else if (arr[mid] < item) {
    left = mid + 1;
    return binarySearchRecursion(arr, item, left, right);
  } else if (arr[mid] > item) {
    right = mid - 1;
    return binarySearchRecursion(arr, item, left, right);
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

function interpolationSearchLoop(arr, item, low = 0, high) {
  high = !Object.is(high, undefined) ? high : arr.length - 1;
  while (high >= low) {
    let position = Math.floor(
      low + ((item - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
    if (arr[position] === item) {
      return `The item ${item} is located at index ${position}`;
    } else if (arr[position] < item) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return `item ${item} not found`;
}

function interpolationSearchRecursion(arr, item, low = 0, high) {
  high = !Object.is(high, undefined) ? high : arr.length - 1;
  const position = Math.floor(
    low + ((item - arr[low]) * (high - low)) / (arr[high] - arr[low])
  );
  if (arr[position] === item) {
    return `The item ${item} is located at index ${position}`;
  } else if (arr[position] < item) {
    low = position + 1;
    return interpolationSearchRecursion(arr, item, low, high);
  } else if (arr[position] > item) {
    high = position - 1;
    return interpolationSearchRecursion(arr, item, low, high);
  } else {
    return `item ${item} not found`;
  }
}

function exponentialSearchLoop(arr, item) {
  let exponent = 0;
  const binary = (arr, item, lower, upper) => {
    while (upper >= lower) {
      let middle = Math.floor((lower + upper) / 2);
      if (arr[middle] === item) {
        return `The item ${item} is located at index ${middle}`;
      } else if (arr[middle] < item) {
        lower = middle + 1;
      } else {
        upper = middle - 1;
      }
    }
    return `item ${item} not found`;
  };
  while (2 ** (exponent - 1) <= arr.length) {
    exponent++;
    if (arr[0] === item) {
      return `The item ${item} is located at index 0`;
    } else if (arr[2 ** exponent] === item) {
      return `The item ${item} is located at index ${2 ** exponent}`;
    } else if (arr[2 ** exponent] > item) {
      return binary(arr, item, 2 ** (exponent - 1), 2 ** exponent);
    } else {
      return binary(arr, item, 2 ** exponent, arr.length - 1);
    }
  }
}

function exponentialSearchRecursion(arr, item, exponent = 0) {
  if (2 ** (exponent - 1) > arr.length) return `item ${item} not found`;
  const binary = (arr, item, lower, upper) => {
    const middle = Math.floor((lower + upper) / 2);
    if (arr[middle] === item) {
      return `The item ${item} is located at index ${middle}`;
    } else if (arr[middle] < item) {
      lower = middle + 1;
      return binary(arr, item, lower, upper);
    } else if (arr[middle] > item) {
      upper = middle - 1;
      return binary(arr, item, lower, upper);
    } else {
      return `item ${item} not found`;
    }
  };
  if (arr[0] === item) {
    return `The item ${item} is located at index 0`;
  } else if (arr[2 ** exponent] === item) {
    return `The item ${item} is located at index ${2 ** exponent}`;
  } else if (arr[2 ** exponent] > item) {
    return binary(arr, item, 2 ** (exponent - 1), 2 ** exponent);
  } else if (arr[2 ** exponent] < item && arr[arr.length - 1] > item) {
    return binary(arr, item, 2 ** exponent, arr.length - 1);
  } else {
    return exponentialSearchRecursion(arr, item, ++exponent);
  }
}

function sublistSearchLoop(sublist, list) {
  for (let i = 0; i < list.length; i++) {
    if (sublist[0] === list[i]) {
      for (let j = 1, k = i + 1; j < sublist.length; j++, k++) {
        if (sublist[j] !== list[k]) return "List not found";
      }
      return "List found";
    } else {
      continue;
    }
  }
  return "List not found";
}

//driver code
const arr = [];
for (let i = 0; i <= 100; i++) {
  arr.push(i);
}
const item = Math.floor(Math.random() * 101);
const subArr = arr.slice(item);

console.log(linearSearchLoop(arr, item));
console.log(linearSearchRecursion(arr, item));
console.log(binarySearchLoop(arr, item));
console.log(binarySearchRecursion(arr, item));
console.log(jumpSearchLoop(arr, item));
console.log(jumpSearchRecursion(arr, item));
console.log(interpolationSearchLoop(arr, item));
console.log(interpolationSearchRecursion(arr, item));
console.log(exponentialSearchLoop(arr, item));
console.log(exponentialSearchRecursion(arr, item));
console.log(sublistSearchLoop(subArr, arr));
