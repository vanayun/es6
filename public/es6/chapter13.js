// 함수 이름을 정할 때는 다른 사람이 함수 이름만 봐도 함수에 대해 이해할 수 있도록 하자.
function printLeapYearStatus() {
  const year = new Date().getFullYear();
  if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
  else if (year % 100 != 0) console.log(`${year} IS a leap year.`);
  else if (year % 400 != 0) console.log(`${year} is NOT a leap year.`);
  else console.log(`${year} IS a leap year`);
}

printLeapYearStatus();

// 순수함 함수로 바꿨을 경우
function isLeapYear(year) {
  if (year % 4 !== 0) return false;
  else if (year % 100 != 0) return true;
  else if (year % 400 != 0) return false;
  else return true;
}
console.log(isLeapYear(2018));

// IIFE(즉시 호출하는 함수 표현식)와 비동기 코드
// 블록 스코프가 도입되기 전에 함수를 더 써서 사용했는데
// 함수 하나 더 쓰면 스코프 생성 각 단계에 i 값이 클로저에 캡처됨.
// 스코프와 변수가 총 7개씩 만들어짐 (하나는 외부 스코프 나머지 여섯개는 loopBody 호출 시)
// function loopBody(i) {
//   setTimeout(function() {
//     console.log(i === 0 ? 'go!' : i);
//   }, (5 - i) * 1000);
// }
// var i;
// for (i = 5; i >= 0; i--) {
//   loopBody(i);
// }
// 아래와 같이 for문 안에 let 키워드를 사용하면 루프의 단계마다 i의 복사본 생성.
// setTimeout이 실행될 때는 독립 스코프에서 변수를 받는다.
for (let i = 5; i >= 0; i--) {
  setTimeout(function() {
    console.log(i === 0 ? 'go!' : i);
  }, (5 - i) * 1000);
}

// 배열안의 함수 -> 파이프라인 만들기
const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI / 4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
  function rotate(p) {
    return {
      x: p.x * cos(theta) - p.y * sin(theta),
      y: p.x * sin(theta) + p.y * cos(theta)
    };
  },
  function scale(p) {
    return { x: p.x * zoom, y: p.y * zoom };
  },
  function translate(p) {
    return { x: p.x + offset[0], y: p.y + offset[1] };
  }
];
const p = { x: 1, y: 1 };
let p2 = p;
for (let i = 0; i < pipeline.length; i++) {
  p2 = pipeline[i](p2);
  console.log(p2);
}

// 함수를 반환하는 함수
function sum(arr, f) {
  if (typeof f != 'function') f = x => x;
  return arr.reduce((a, x) => (a += f(x)), 0);
}
function newSummer(f) {
  return arr => sum(arr, f);
}

const sumOfSquares = newSummer(x => x * x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
console.log(sumOfSquares([1, 2, 3]));
console.log(sumOfCubes([1, 2, 3]));

// 재귀
function fact(n) {
  if (n === 1) return 1;
  return n * fact(n - 1);
}
console.log(fact(3));
