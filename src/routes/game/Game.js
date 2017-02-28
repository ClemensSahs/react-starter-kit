/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { GameMap } from '../../components/GameMap';
import s from './Game.css';

class Game extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      gameId: 1,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <GameMap id={this.state.gameId} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Game);
