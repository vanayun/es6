// 객체 선언
const obj = { b: 2, c: 3, d: 4 };

// 해체 할당
const { a, b, c } = obj;
console.log(a, b, c);
// a; undefined
// b; 2
// c; 3
// d; d is not defined

const obj2 = { e: 2, f: 3, g: 4 };
let f, g, h;
// {f,g,h} = obj2;  error
({ f, g, h } = obj2); // 동작함
console.log(f, g, h);

// 배열 선언
const arr = [1, 2, 3];

// 배열 해체 할당
let [x, y] = arr;
console.log(x, y);

// 확산 연산자 사용하면 남은 요소를 새 배열에 할당 할 수 있다.
const arr2 = [1, 2, 3, 4, 5];
let [i, j, k, ...rest] = arr2;
console.log(i, j, k, rest); // 1 2 3 [ 4, 5 ]

let z1 = 5,
  z2 = 10;
[z1, z2] = [z2, z1];
console.log(z1, z2); // 10 5
