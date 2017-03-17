/* eslint-disable */

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Army from './Army';

class ArmyGroup extends React.Component {
  static propTypes = {
    armyGroup: PropTypes.instanceOf(Map).isRequired,
    oobData: PropTypes.instanceOf(Map).isRequired,
  };


  handleClick(army) {

  }

  render() {
    const {
      armyGroup,
      oobData,
      ...rest
    } = this.props;

    return (
      <div {...this.props}>
        <i className="fa fa-cog" aria-hidden="true" />
        <div className="name">{armyGroup.get('name')}</div>
        {armyGroup.get('armyList').map((armyId) => {
          const army = oobData.getIn(['armyList']).get(armyId);
          return (
            <Army oobData={oobData} army={army} />
          );
        })}
      </div>
    );
  }
}
/*

{oobData.getIn(['armyGroupList']).map((army) => {
  console.log();
   return (<div onClick={() => this.handleClick(army)} />);
})}

 {armyList.map(army => (
  <div onClick={() => this.handleClick(army)} />
))}

*/

export default ArmyGroup;
