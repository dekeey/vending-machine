export const machineActions = {

  UPDATE_DATA: 'MACHINE/UPDATE_DATA',
  UPDATE_SLOT_DATA: 'MACHINE/UPDATE_SLOT_DATA',
  PURCHASE_REQUEST: 'MACHINE/PURCHASE',

  updateData: () => {
    return {
      type: machineActions.UPDATE_DATA
    }
  },

  updateSlotData: (rackLiteral, slotIndex) => {
    return {
      type: machineActions.UPDATE_SLOT_DATA,
      payload: {
        rackLiteral,
        slotIndex
      }
    }
  },

  purchase: (rackLiteral, slotIndex) => {
    return {
      type: machineActions.PURCHASE_REQUEST,
      payload: {
        rackLiteral,
        slotIndex
      }
    }
  },

};