import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Rack from './components/rack/rack';
import Cashier from '../components/cashier/cashier';
import InfoDisplay from '../components/info-display/info-display';
import { getMachineInfo } from '../../core/redux/machine/index'
import { getInfoDisplayData } from '../../core/redux/info-display/index'
import './styles.scss';

class Machine extends React.Component {

  render() {

    const cssClass = classNames({
      'b-machine': true,
    });

    let { machineInfo, infoDisplay } = this.props;

    return (
      <div className={cssClass}>
        <div className='b-machine__info-display'>
          <InfoDisplay message={infoDisplay.message}/>
        </div>
        <div className='b-machine__racks'>
          {Object.keys(machineInfo).map((rackLiteral, index) => {
              let rack = machineInfo[rackLiteral];
              return (
                <Rack
                  slots={rack}
                  key={index}
                />
              )
            }
          )}
        </div>
        <div className='b-machine__cashier'>
          <Cashier/>
        </div>
      </div>
    );
  }
}

Machine.propTypes = {
  machineInfo: React.PropTypes.object,
  infoDisplay: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    machineInfo: getMachineInfo(state),
    infoDisplay: getInfoDisplayData(state)
  };
};


export default connect(
  mapStateToProps,
  null
)(Machine);
