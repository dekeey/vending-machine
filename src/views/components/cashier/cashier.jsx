/* eslint-disable */
import React from "react";
import classNames from "classnames";
import { connect } from 'react-redux';
import { getCashierInfo } from '../../../core/redux/cashier/index'
import { cashier } from '../../../core/api/index';
import { COINS } from '../../../core/config/config'
import Coin from '../coin/coin'

import "./styles.scss";

class Cashier extends React.Component {

  onCoinClick(coin) {
    cashier.insertCoin(coin);
  }

  render() {

    const cssClass = classNames({
      'b-cashier': true,
    });

    let { cashierInfo } = this.props;

    return (
      <div className={cssClass}>
        <div className='b-cashier__balance'>
          Balance: <span className='b-cashier__balance-sum'>{ cashierInfo.balance } K</span>
        </div>
        <div className='b-cashier__coins'>
          <div className='b-cashier__coins-text'>
            Insert a coin:
          </div>
          <div className='b-cashier__coins-item'>
            <Coin coin={COINS.KINDNESS} onClick={::this.onCoinClick}/>
          </div>
          <div className='b-cashier__coins-item'>
            <Coin coin={COINS.HALF_KINDNESS} onClick={::this.onCoinClick}/>
          </div>
          <div className='b-cashier__coins-item'>
            <Coin coin={COINS.QUARTER_OF_KINDNESS} onClick={::this.onCoinClick}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cashierInfo: getCashierInfo(state),
  };
};


export default connect(
  mapStateToProps,
  null
)(Cashier);
