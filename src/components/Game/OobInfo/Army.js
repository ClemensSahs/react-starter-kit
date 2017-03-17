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

class Army extends React.Component {
  static propTypes = {
    army: PropTypes.instanceOf(Map).isRequired,
    oobData: PropTypes.instanceOf(Map).isRequired,
  };
  handleClick(army) {

  }

  render() {
    const {
      army,
      oobData,
      ...rest
    } = this.props;

    console.log('army', army, army.get('armyCorpList'), army.get('armyCorpList').length);
    return (
      <div {...this.props}>{army.get('armyCorpList').length}</div>
    );
  }
}

export default Army;
