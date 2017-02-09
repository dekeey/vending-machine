/* eslint-disable */
import React from "react";
import classNames from "classnames";
import { connect } from 'react-redux';
import "./styles.scss";
import { machineActions } from '../../../../core/redux/machine/index'

class Slot extends React.Component {

  render() {
    let { slot } = this.props;
    let { product, quantity, rackLiteral, slotIndex } = slot;

    const cssClass = classNames({
      'b-slot': true,
    });

    const slotClick = () => {
      this.props.purchase(rackLiteral, slotIndex);
    };

    return (
    <div className={cssClass} onClick={slotClick}>
      <div className='b-slot__item-title'>{ product.title }</div>
      <div className='b-slot__item-quantity'>{quantity}</div>

      <div className='b-slot__info'>
        <div className='b-slot__info-place'>{ rackLiteral + '' + slotIndex }</div>
        <div className='b-slot__info-price'>
          { product.price } K
        </div>
      </div>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSlotData: (rackLiteral, slotIndex) =>
      dispatch(machineActions.updateSlotData(rackLiteral, slotIndex)),
    purchase: (rackLiteral, slotIndex) =>
      dispatch(machineActions.purchase(rackLiteral, slotIndex)),
  }
};


Slot.propTypes = {
  slot: React.PropTypes.object.isRequired
};



export default connect(
  null,
  mapDispatchToProps
)(Slot);
