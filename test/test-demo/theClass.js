// class Pet {
//   constructor (resourece) {
//     console.log(`create a pet: ${resourece}`);
//   }
// }

// const pet = new Pet('dag') /// create a pet resourece


// class StroeData {
//   fetch() {
//     ajax(this.url, this.handleNewrecord)
//     // ajax(this.url, records => this.handleNewrecord(records))
//   }
//   handleNewrecord(){
    
//     this.records = records
//   }
// }

// const strodata = new StroeData()

// class Car {
//   honk() {
//     this.honkAudio.play()
//     console.log(123);
//   }
//   delayedHonk() {
//     // window.setTimeout(this.honk, 1000)
//     console.log(`nihao`);
//   }
// }

// const car = new Car()
// car.delayedHonk()
function Person(){
 
}

Person.prototype.name = 'zhangsang'
Person.prototype.add = function(){
  console.log(123);
}

let p1 = new Person()

console.log(p1);