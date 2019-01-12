const arr = [5, 7, 2, 4];
const sum = arr.reduce((x, y) => (x += y), 0);
console.log(sum);

var arr2 = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 4, c: 3 }, { a: 7, b: 2, c: 7 }];

var keys = ['a', 'b', 'c', 'd'];

//result
//{a: 3, b:6, c:9}
const newArr = {};
const initialValue = 0;
for (let key in keys) {
  let sum2 = arr2.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue[keys[key]] || 0;
  }, initialValue);
  newArr[keys[key]] = sum2;
}
console.log(newArr); 
