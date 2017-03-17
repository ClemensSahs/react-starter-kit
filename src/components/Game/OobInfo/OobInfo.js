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
import {
  Map,
} from 'immutable';
import Theater from './Theater';

class OobInfo extends React.Component {
  static propTypes = {
    oobData: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const {
      oobData,
      ...rest
    } = this.props;

    console.log('theaterList', oobData.getIn(['theaterList']));
    return (
      <div {...rest}>
        {oobData.getIn(['theaterList']).map((theater, key, object) => (<Theater oobData={oobData} theater={theater} />))}

        <div>add Theater</div>
      </div>
    );
  }
}

export default OobInfo;
