/* eslint-disable */
import React from "react";
import classNames from "classnames";
import "./styles.scss";


function Coin({ coin, onClick }) {

  const cssClass = classNames({
    'b-coin': true,
  });

  const onCoinClick = () => {
    onClick(coin);
  };

  return (
    <div className={cssClass} onClick={onCoinClick}>
      {coin.title}
    </div>
  );
}


Coin.propTypes = {
  coin: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

export default Coin;
