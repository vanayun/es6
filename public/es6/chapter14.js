// setInterval & clearInterval
// setInterval은 정해진 주기마다 호출 clearInterval을 사용할 때 까지 실행
const start = new Date();
let i = 0;
const intervalId = setInterval(function() {
  let now = new Date();
  if (now.getMinutes() !== start.getMinutes() || ++i > 10)
    return clearInterval(intervalId);
  console.log(`${i}: ${now}`);
}, 5 * 1000);

// 스코프와 비동기적 실행
// 함수를 호출하면 항상 클로저가 만들어짐
function countdown() {
  // let i; 이렇게 밖에다 선언하면 -1이 6번 실행됨.
  console.log('CountDown:');
  for (let i = 5; i >= 0; i--) {
    // i는 블록 스코프 변수
    // 2. loop안에서 만드는 콜백은 모두 i에 접근 가능하며 접근 하는 i는 모두 똑같은 i이다.
    setTimeout(function() {
      console.log(i === 0 ? 'GO!' : i);
    }, (5 - i) * 1000);
  }
}
countdown(); // 1. 호출 시 변수 i가 들어있는 클로저 생성
// 콜백은 자신이 선언한 스코프(클로저)에 있는 것에 접근 할 수 있다.
// 따라서 i의 값은 콜백이 실제 실행되는 순간마다 다를 수 있다.

// Promise (성공:resolve, 실패:reject 콜백 함수가 있는 Promise 인스턴스 반환). 현재 진행 상황은 알 수 없음.
function countdown2(seconds) {
  return new Promise(function(resolve, reject) {
    for (let i = seconds; i >= 0; i--) {
      setTimeout(function() {
        if (i === 13) return reject(new Error('Oh my god'));
        if (i > 0) console.log(i + '...');
        else resolve(console.log('GO2!'));
      }, (seconds - i) * 1000);
    }
  });
}
const cf = countdown2(15);
cf.then(function() {
  console.log('countdown completed successfully');
}).catch(function(err) {
  console.log('countdown experienced an error:' + err.message);
});

// event
const EventEmitter = require('events').EventEmitter;
class CountDown extends EventEmitter {
  constructor(seconds, superstitious) {
    super();
    this.seconds = seconds;
    this.superstitious = !!superstitious;
  }
  go() {
    const countdown = this;
    const timeoutIds = [];
    return new Promise(function(resolve, reject) {
      for (let i = countdown.seconds; i >= 0; i--) {
        timeoutIds.push(
          setTimeout(function() {
            if (countdown.superstitious && i === 13) {
              // 대기중인 타임아웃을 모두 취소한다.
              timeoutIds.forEach(clearTimeout);
              return reject(new Error('Oh my God!!!'));
            }
            countdown.emit('tick', i);
            if (i === 0) resolve();
          }, (countdown.seconds - i) * 1000)
        );
      }
    });
  }
}
const c = new CountDown(5);
c.on('tick', function(i) {
  if (i > 0) console.log(i + '~~~');
});
c.go()
  .then(function() {
    console.log('GO~~!!');
  })
  .catch(function(err) {
    console.error(err.message);
  });

// 제너레이터 사용으로 await 처럼 구현해보자(feat. Q 프라미스 라이브러리)
function nfcall(f, ...args) {
  return new Promise(function(resolve, reject) {
    f.call(null, ...args, function(err, ...args) {
      if (err) return reject(err);
      resolve(args.length < 2 ? args[0] : args);
    });
  });
}

function ptimeout(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay);
  });
}

function grun(g) {
  const it = g();
  (function iterate(val) {
    const x = it.next(val);
    if (!x.done) {
      if (x.value instanceof Promise) {
        x.value.then(iterate).catch(err => it.throw(err));
      } else {
        setTimeout(iterate, 0, x.value);
      }
    }
  })();
}

// function* theFutureIsNow() {
// const dataA = yield nfcall(fs.readFile, 'a.txt');
// const dataB = yield nfcall(fs.readFile, 'b.txt');
// const dataC = yield nfcall(fs.readFile, 'c.txt');
// yield ptimeout(60 * 1000);
// yield nfcall(fs.writeFile, 'd.txt', dataA + dataB + dataC);
// }

grun(theFutureIsNow);
// **제너레이터 실행기를 직접 만들지 마세요.
// promise.all을 사용해 구현 가능. 배열에 들어있던 순서대로 반환한다.

function* theFutureIsNow() {
  const data = yield Promise.all([
    nfcall(fs.readFile, 'a.txt'),
    nfcall(fs.readFile, 'b.txt'),
    nfcall(fs.readFile, 'c.txt')
  ]);
  yield ptimeout(60 * 1000);
  yield nfcall(fs.writeFile, 'd.txt', data[0] + data[1] + data[2]);
}
