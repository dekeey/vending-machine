import { machineActions } from './actions'
import { vendingMachine } from '../../api/index'

export const initialState = {
};

export function machineReducer (state = initialState, {type, payload} ) {


  switch (type) {
    case machineActions.UPDATE_DATA:
      return {...state, ...vendingMachine.getMachineData()};

    case machineActions.UPDATE_SLOT_DATA: {
      let newState = {...state};
      newState[payload.rackLiteral][payload.slotIndex] =
        vendingMachine.getSlotDataByIndex(payload.rackLiteral, payload.slotIndex);
      return newState;
    }

    default:
      return state
  }
}