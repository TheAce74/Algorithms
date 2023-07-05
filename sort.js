//sort algorithms declaration

//driver code
const arr = [];
for (let i = 0; i <= 100; i++) {
  arr.push(i);
}
arr.sort(() => Math.random() - 0.5);

console.log(arr);
