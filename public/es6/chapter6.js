// js에서는 함수도 객체 => 넘기거나 할당 가능.
function getGreeting() {
  return 'Hello vana';
}
getGreeting(); // 함수 호출 실행되며 return 반환
getGreeting; // 함수 참조 실행 안함

const f = getGreeting;
f(); // 다른 이름으로 함수를 참조하여 호출 가능

// 객체 프로퍼티에 할당 가능
const o = {};
o.f = getGreeting;
o.f();

// 배열 요소에 할당 가능
const arr = [1, 2, 3];
arr[1] = getGreeting;
arr[1]();

// 매개변수 해체 - 객체, 배열 가능, 확산 연산자 사용하여 남는 매개변수를 이용 가능
function getSentence({ subject, verb, object }) {
  return `${subject} ${verb} ${object}`;
}
const sentence = {
  subject: 'I',
  verb: 'love',
  object: 'you'
};

getSentence(sentence); // I love you

// 매개변수에 기본값 지정 가능
function setDefault(a, b = 'default', c = 3) {
  return `${a} - ${b} - ${c}`;
}
setDefault(5, 6); // 5 - 6 - 3
setDefault(5); // 5 - default - 3

// 화살표 표기법
const f1 = function() {
  return 'hello!';
};
// const f1 = () => 'hello!';
f1();
const f2 = function(name) {
  return `hello ${name}!`;
};
// const f2 = name => `hello ${name}!`;
f2();

const f3 = function(a, b) {
  return a + b;
};
// const f3 = (a, b) => a + b;
f3();

// 화살표 함수는 this가 다른 변수처럼 정적(lexically)으로 묶인다 -> 내부 함수 안에서만 this 사용 가능.
// 화살표 함수는 객체 생성자로 사용할 수 없다.

// call, apply, bind
// call - 모든 함수에서 사용 가능 this를 특정 값으로 지정 가능
const bruce = { name: 'Bruce' };
function greet() {
  return `Hello ${this.name}!`;
}
// const greet = () => `Hello ${this.name}!`; 이렇게 쓰면 안된다
console.log(greet.call(bruce));

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
  console.log(bruce);
}

// apply는 call과 거의 같지만 매개변수를 배열로 받는다는 차이가 있다.
// function.apply(this, [ex1, ex2])
update.apply(bruce, [1955, 'actor']);

const sortArr = [2, 3, -5, 15, 7];
// Math.min, Math.max 는 this와 관계없이 동작해서 this를 null로 사용
console.log(Math.min.apply(null, sortArr)); // -5
console.log(Math.max.apply(null, sortArr)); // 15
// Math는 this 값이 무엇이든 상관없어서 apply안쓰고 확산 연산자 사용으로 쓰는게 편함.
console.log(Math.min(...sortArr));

//bind를 사용하면 this값을 영구히 바꿀 수 있기때문에 주의해야한다.
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949('singer, songwriter');
console.log(bruce);

const items = ['Widget', 'gadget'];
const prices = [9.95, 22.95];
// const cart = items.map((x, i) => ({ name: x, price: prices[i] }));

const cart = items.map(function(x, i) {
  return { name: x, price: prices[i] };
});
console.log(cart);
