/* eslint-disable */

export const config  = {

  MACHINE_ID: '1', //uuid of the machine
  RACKS: {
    A: {
      LITERAL: 'A',
      SLOTS_NUMBER: 5
    },
    B: {
      LITERAL: 'B',
      SLOTS_NUMBER: 4
    },
  }

};


export const COINS = {
  KINDNESS : {title : 'Kindness', value : 1.00},
  HALF_KINDNESS : {title : 'Half Kindness', value : 0.50},
  QUARTER_OF_KINDNESS : {title : 'Quarter of Kindness', value : 0.25}
};

export const PRODUCTS = {
  CANDY : {title : 'CANDY of Happiness', price : 1.00},
  COKE : {title : 'COKE of Friendship', price : 0.50},
  CHIPS : {title : 'CHIPS of the Fortune', price : 0.25},
  NOTHING: {title: 'NOTHING', price: 0},
};

export const ANALYTICS_EVENT_TYPES = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};
