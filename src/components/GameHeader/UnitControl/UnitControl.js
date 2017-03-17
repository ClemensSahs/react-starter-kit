/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

class UnitControl extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <div>land</div>
        <div>water</div>
        <div>air</div>
      </div>
    );
  }
}

export default UnitControl;
