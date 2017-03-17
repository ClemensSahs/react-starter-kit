/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

class MainButton extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <div title="Forschung">Fab</div>
        <div title="Diplomatie">Dip</div>
        <div title="Handel">tra</div>
        <div title="Bauen">bau</div>
        <div title="Equipment">equ</div>
        <div title="DivisionsPlaner">dpm</div>
        <div title="ArmeePlanner">apm</div>
      </div>
    );
  }
}

export default MainButton;
