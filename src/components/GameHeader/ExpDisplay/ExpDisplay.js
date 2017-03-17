/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

class ExpDisplay extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <div title="Land Erfahrunug">12</div>
        <div title="Luft Erfahrunug">32</div>
        <div title="See Erfahrunug">12</div>
      </div>
    );
  }
}

export default ExpDisplay;
