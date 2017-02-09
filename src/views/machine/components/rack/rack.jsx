/* eslint-disable */
import React from "react";
import classNames from "classnames";
import Slot from '../slot/slot'
import "./styles.scss";

function Rack({ slots }) {

  const cssClass = classNames({
    'b-rack': true,
  });

  return (
    <div className={cssClass}>
      {slots.length > 0 &&
        slots.map((slot, index) =>
          <Slot key={index}
                slot={slot}
          />
        )
      }
    </div>
  );
}


Rack.propTypes = {
  slots: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default Rack;
