class Car {
  static getNextVin() {
    return Car.nextVin++; // this.nextVin++ 도 가능하나, 정적메서드라는 점을 상기하기 위해 클래스 명 사용을 권장.
  }
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.vin = Car.getNextVin();
  }
  static areSimilar(car1, car2) {
    return car1.make === car2.make && car1.model === car2.model;
  }
  static areSame(car1, car2) {
    return car1.vin === car2.vin;
  }
}
Car.nextVin = 0;

const car1 = new Car('Tesla', 'S');
const car2 = new Car('Mazda', '3');
const car3 = new Car('Mazda', '3');

car1.vin;
car2.vin;
car3.vin;

Car.areSimilar(car1, car2);
Car.areSimilar(car2, car3);
Car.areSame(car2, car3);
Car.areSame(car2, car2);

// car1.areSimilar(car1, car2);