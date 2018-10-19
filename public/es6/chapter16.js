// 고정 소수점 (반올림)
const x = 19.51;
console.log(x.toFixed(3));

// 지수 표기법 (반올림)
const x1 = 3800.5;
console.log(x1.toExponential(4));

// 고정 전체 자리수 (반올림)
let x2 = 100;
console.log(x2.toPrecision(5));

// 다른 진수
const x3 = 12;
console.log(x3.toString(2));

Math.abs(x); // 절댓값
Math.sign(x); // x의 부호 음수면 -1, 양수면 1
Math.ceil(x); // x의 올림
Math.floor(x); // x의 내림
Math.trunc(x); // x의 버림
Math.round(x); // x의 반올림
Math.min(x1, x2); // 매개변수 중 최소값
Math.max(x1, x2); // 매개변수 중 최대값

Math.random(); // 난수 0이상 ~ 1미만
x + (x2 - x) * Math.random(); // x이상 x2미만
x + Math.floor((x2 - x) * Math.random()); // x이상 x2미만의 정수
x + Math.floor((x2 - x + 1) * Math.random()); // x이상 x2이하의 정수
