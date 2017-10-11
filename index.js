let store = {meals: [], customers: [], employers: [], deliveries: []}


let customerId = 1

class Customer {
  constructor(name, employer) {
    this.name = name
    this.employer = employer
    this.id = customerId++
    store.customers.push(this)
  }
  meals() {
    let arr = []
    let deliveries = this.deliveries();
    for (const delivery of deliveries){
      arr.push(delivery.meal())
    }
    return arr
  }
  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    let meals = this.meals()
    let prices = []
    for (const meal of meals) {
       prices.push(meal.price)
     }
     return prices.reduce(function (memo, price) {
       return memo + price
     })
   }

}

let mealId = 1

class Meal {
  constructor(title, price, customer) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
    if(customer){
      this.customerId = customer.id
    }
  }
  customers() {
    let arr = []
    let deliveries = this.deliveries();
    for (const delivery of deliveries){
      arr.push(delivery.customer())
    }
    return arr
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return this.id === delivery.mealId
    });
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
    return b.price - a.price;
    })
  }
}

let employerId = 1

class Employer {
  constructor(name) {
    this.name = name
    this.id = employerId++
    store.employers.push(this)
  }
  mealTotals(){

  }
}

let deliveryId = 1

class Delivery {
  constructor(meal, customer) {
    this.id = deliveryId++
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)

  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    });
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    });
  }

}
