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
import ArmyGroup from './ArmyGroup';

class Theater extends React.Component {
  static propTypes = {
    theater: PropTypes.instanceOf(Map).isRequired,
    oobData: PropTypes.instanceOf(Map).isRequired,
  };

  handleClick() {

  }

  render() {
    const {
      name,
      theater,
      oobData,
      ...rest
    } = this.props;

    return (
      <div {...rest}>
        <i className="fa fa-cog" aria-hidden="true" />
        <div className="name">{theater.get('name')}</div>
        {theater.get('armyGroupList').map((armyGroupId) => {
          const armyGroup = oobData.getIn(['armyGroupList']).get(armyGroupId);
          return (
            <ArmyGroup oobData={oobData} armyGroup={armyGroup} />
          );
        })}

        <div>add ArmyGroup</div>
      </div>
    );
  }
}

/**


  {oobData.getIn(['armyGroupList']).map((armyGroup) => {
    return (<ArmyGroup oobData={oobData} armyGroup={armyGroup} />);
  })}
*/

export default Theater;
