/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

class SummaryInfo extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <div title="nationaler zusammenhalt">90%</div>
        <div title="politial power">132</div>
        <div title="manpower">1.000M</div>
        <div title="Fabrik">82</div>
      </div>
    );
  }
}

export default SummaryInfo;
