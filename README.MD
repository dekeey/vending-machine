# Vending Machine

Vending Machine Basic API implementation, user interface lovely made with React, Redux, Redux Saga. [Live demo](https://vending-machine-react-redux.herokuapp.com).


Stack
-----

- **React**
- **React Redux** = simple and productive state management
- **Redux Saga** = clean, readable and highly scalable solution for async actions 
- **Babel**
- **Webpack**


Quick Start
-----------

```shell
$ git clone https://github.com/dekeey/vending-machine.git
$ cd vending-machine
$ npm install
$ npm start
```


NPM Commands
------------

|Command|Description|
|---|---|
|npm start|Start webpack development server @ **localhost:3000**|
|npm run build|Build production bundles to **./build** directory|

NOTE
------------
Since trying to implement an abstract vending machine, i decided to base on some real world examples.


![screenshot](https://4.bp.blogspot.com/-4csMlJfkQmY/V1OWyxuth_I/AAAAAAAAGHM/xiFI5uavJ3YrZtuhrv-eIdLIuM2fGbzTgCLcB/s1600/Design%2BVending%2BMachine%2Bin%2BJava.jpg)


1. If we look on that machine, we can see that it has a number of racks, which have a number of slots.
2. The number of slots on each rack can be different, so you can sell "big" and "small" products simultaneously.
3. So, we have two coordinates "rack literal" and "slot number" to operate with.
4. If i was an owner of vending machine, it would be nice to be notified about all the events happened with all possible data, including the slot coordinates.
5. If i would have such a data, i could split test product positioning inside the machine to generate more income




API
------------

### vendingMachine.

#####getSlotDataByIndex(rackLiteral, slotIndex)
  
  returns an object with a slot data
  
  ```javascript
    {
      rackLiteral,
      slotIndex,
      product,
      quantity
    }
```

#####getMachineData()
  
  returns an object with all content from all racks

#####loadProduct(rack, slotNumber, product, quantity)
  
  load a product to specified slot

#####giveProduct(rackLiteral, slotIndex)
  
  give one product from specified slot

####example
  ```javascript
import { vendingMachine } from './core/api/index';

console.log(vendingMachine.getMachineData());
```

#### cashier.

#####addSuccessListener(listener)
subscribe the listener(function) to a success events from cashier, e.g. coin was accepted

#####  addFailureListener(listener)
same but for errors

#####  insertCoin(coin)
insert coin, if the coin is good, the balance will be increased and the "Success Listeners" will be executed

#####  getData()
get the cashier data (balance)

#####  pay(value)
pay from balance. Returns a promise, which resolved with message if ok, rejected if not

####example
  ```javascript
import { cashier } from '../../../core/api/index';
import { COINS } from '../../../core/config/config'

cashier.insertCoin(COINS.KINDNESS);

```
