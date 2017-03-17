/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Game from './Game';

export default {

  path: '/game',

  async action() {
    const gameId = 1;
    return {
      title: 'HOI Browser',
      component: <Game gameId={gameId} />,
    };
  },

};
