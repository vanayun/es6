require('core-js/fn/array/values');

// iterator 지금 어디 있는지 파악. 책갈피 개념
const book = [
  'Twinkle, twinkle, little bat!',
  'How I wonder what you\'re at!',
  'Up above the world you fly,',
  'Like a tea tray in the sky.',
  'Twinkle, twinkle, little bat!',
  'How I wonder what you\'re at!'
];

// 이터레이터는 모두 독립적이다.
const it = book.values();
let current = it.next();
while (!current.done) {
  console.log(current.value);
  current = it.next();
}

class Log {
  constructor() {
    this.messages = [];
  }
  add(message) {
    this.messages.push({ message, timestamp: Date.now() });
  }
  [Symbol.iterator]() {
    let i = 0;
    const messages = this.messages;
    return {
      next() {
        if (i >= messages.length) return { value: undefined, done: true };
        return { value: messages[i++], done: false };
      }
    };
  }
}

const log = new Log();
log.add('first day at sea');
log.add('spotted whale');
log.add('spotted another vessel');

for (let entry of log) {
  console.log(`${entry.message} @ ${entry.timestamp}`);
}
console.log(log.messages);

// generator는 iterator를 사용해 자신의 실행을 제어하는 함수
// 도입된 새로운 두 가지 개념
// 1. 함수 실행을 개별적 단계로 나눠 함수의 실행을 제어함
// 2. 실행 중인 함수와 통신
// 예외 - 제너레이터는 언제든 호출자에게 제어권을 넘길 수 있다.
//     - 호출 즉시 실행되지 않는다. 대신 이터레이터를 반환하고 next 메서드를 호출함에 따라 실행된다.
// 문법 : function*
function* rainbow() {
  yield 'red';
  yield 'orange';
  yield 'yellow';
  yield 'green';
  yield 'blue';
  yield 'indigo';
  yield 'violet';
}
for (let color of rainbow()) {
  console.log(color);
}

// 제너레이터와 호출자 사이에서 양방향 통신이 가능
function* interrogate() {
  const name = yield 'what is your name?';
  const color = yield 'what is your favorite color?';
  return `${name}'s favorite color is ${color}`;
}

const it2 = interrogate();
console.log(it2.next());
console.log(it2.next('vana'));
console.log(it2.next('Lavender'));

// 제너레이터가 반환하는 값을 사용하려 할 때는 yield를 쓰고,
// 중간에 종료하는 목적으로 return을 사용하며 중요한 값을 반환해선 안된다.
// return을 쓸 때는 반환값을 쓰지 않는 습관을 들이자.
