class Vehicle {
  constructor() {
    this.passengers = [];
    console.log('Vehicle created');
  }

  addPassenger(p) {
    this.passengers.push(p);
  }
}

class Car extends Vehicle { // Car를 Vehicle의 서브클래스로 만듬.
  constructor() {
    super();  // 슈퍼클래스의 생성자를 호출하는 특별한 함수.
              // 서브클래스에서는 이 함수를 반드시 호출해야 한다.
    console.log('Car created');
  }

  deployAirbags() {
    console.log('BWOOSH!');
  }
}

const v = new Vehicle();
v.addPassenger('Frank');
v.addPassenger('Judy');
v.passengers; // ['Frank', 'Judy']
const c = new Car();
c.addPassenger('Alice');
c.addPassenger('Cameron');
c.passengers; // ['Alice', 'Cameron']
c.deployAirbags(); // 'BWOOSH!'

class InsurancePolicy {
  constructor() {

  }
}
function makeInsurable(o) {
  o.addInsurancePolicy = function(p) {
    this.insurancePolicy = p;
  }
  o.getInsurancePolicy = function() {
    return this.insurancePolicy;
  }
  o.isInsured = function() {
    return !!this.insurancePolicy;
  }
}
makeInsurable(Car);