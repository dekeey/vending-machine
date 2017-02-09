import { COINS } from '../../config/config';
import { createMessage } from '../utils/message';

class Cashier {
  constructor() {

    this.data = {
      balance : 0
    };

    this.successListeners = [];
    this.failureListerers = [];
    this.acceptCoins = [COINS.KINDNESS, COINS.HALF_KINDNESS, COINS.QUARTER_OF_KINDNESS]
  }

  addSuccessListener(listener) {
    this.successListeners.push(listener);
  }

  addFailureListener(listener) {
    this.failureListerers.push(listener);
  }

  publishSuccess(message) {
    this.successListeners.forEach((listener) => listener(message))
  }

  publishFailure(message) {
    this.failureListerers.forEach((listener) => listener(message))
  }

  insertCoin(coin) {
    if (this.acceptCoins.indexOf(coin) > -1) {
      this.data.balance += coin.value;
      this.publishSuccess(createMessage('Coin accepted', coin))

    } else {
      this.publishFailure(createMessage('Coin was rejected', coin))
    }
  }

  getData() {
    let balance = this.data.balance;
    return new Promise(( resolve ) => {
      // call to the hardware or something else, resolve with the data if OK, reject if not
      resolve({
        balance
      })
    });
  }

  pay(value) {
    return new Promise((resolve, reject) => {
      // call to the payment api or something else, response with new balance if OK, with error if not
      if (this.data.balance >= value) {
        this.data.balance -= value;
        resolve(createMessage('Payment was accepted', this.data))
      } else {
        reject(createMessage('Not enough kindness', this.data))
      }
    });
  }
}

/**
 * export as singleton
 * @type {Cashier}
 */
export let cashier = new Cashier();