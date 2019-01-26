function* rainbow() {
  yield 'red';
  yield 'orange';
}


function* interrogate() {
  const name = yield console.log('What is your name?');
  const color = yield console.log(`What is ${name}'s favorite color?`);
  return console.log(`${name}'s favorite color is ${color}.`);
}

const it = interrogate();
it.next();
it.next('jugyoeng');
it.next('lavendar');

function testA() {
  console.log('123');
  return '123';
}

function testB(a) {
  console.log(a);
}
function* iteratorFnTest() {
  const a = yield testA();
  yield testB(`${a}`);
}

const it2 = iteratorFnTest();
const a = it2.next()
console.log('its2 : ', a.value);
it2.next(a.value);