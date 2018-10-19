const d = new Date();
console.log(d); // 타임존이 들어간 그레고리력 날짜
console.log(d.valueOf()); // 유닉스 타임스탬프

// Date 객체 만들기
// 자바스크립트에서 월은 0부터 시작
console.log(new Date(2018, 9, 20, 1, 26, 5, 500));

// Moment.js
// npm install --save moment-timezone
const moment = require('moment-timezone');

// moment.tz 특정 타임존 서버 날짜 생성
// toDate() : Moment.js 객체를 자바스크립트 Date 객체로 반환
const los_d = moment.tz([2016, 3, 27, 9, 19], 'America/Los_Angeles').toDate();
const seoul_d = moment.tz([2016, 3, 27, 9, 19], 'Asia/Seoul').toDate();
console.log(los_d);
console.log(seoul_d);

// json으로 바로 날짜를 다룰 수는 없지만 전송된 문자열에서 날짜 복구는 가능
const before = { d: new Date() };
console.log(before.d instanceof Date); // true
const json = JSON.stringify(before);
const after = JSON.parse(json);
console.log(after.d instanceof Date); // false
after.d = new Date(after.d);
console.log(after.d instanceof Date); // true

// format
const now = new Date();
console.log(moment(now).format('YYYY-MM-DD HH:mm:ss'));
console.log(moment(now).format('dddd, MMMM [the] Do, YYYY'));

// 날짜 연산 (체인 가능)
let m = moment(); // 현재
m.add(3, 'days');
m.subtract(2, 'years');
console.log(m);

m = moment(); // reset
m.startOf('year');
m.endOf('month');
console.log(m);

// fromNow
moment()
  .subtract(5, 'minute')
  .fromNow();
