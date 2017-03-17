/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import {
  Map,
} from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


import { GameMap } from '../../components/GameMap';
import {
  SummaryInfo,
  MainButton,
  SpeedControl,
  UnitControl,
  ExpDisplay,
} from '../../components/GameHeader';

import {
  OobInfo,
  OobQuick,
  Info,
} from '../../components/Game';

import s from './Game.css';
import * as mockData from './mock-data';

class Game extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      gameId: 1,
      currentArmyGroup: 1,
      oobData: this.getMockedOobData(),
    };
  }

  getMockedOobDataCreateMap = data => data.reduce(
      (acc, item) => (
        acc.set(item.id, Map(item))
      ),
      Map({}),
    )

  getMockedOobData = () => {
    let oobData = Map({
      theaterList: Map({}),
      armyGroupList: Map({}),
      armyList: Map({}),
      armyCorpList: Map({}),
      divList: Map({}),
    });


    oobData = oobData.set('theaterList', this.getMockedOobDataCreateMap(mockData.TheaterList));
    oobData = oobData.set('armyGroupList', this.getMockedOobDataCreateMap(mockData.ArmyGroupList));
    oobData = oobData.set('armyList', this.getMockedOobDataCreateMap(mockData.ArmyList));
    oobData = oobData.set('armyCorpList', this.getMockedOobDataCreateMap(mockData.ArmyCorpList));
    oobData = oobData.set('divList', this.getMockedOobDataCreateMap(mockData.DivList));

    return oobData;
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.header}>
          <div className={cx(s.flag, s.headerItem)}>
            <i>DE</i>
          </div>

          <div className={s.headerItem}>
            <SummaryInfo className={s.summaryInfo} />
            <MainButton className={s.mainButton} />
          </div>

          <div className={s.headerCenter}>
            <ExpDisplay />
          </div>

          <div className={s.rightControl}>
            <SpeedControl className={s.speedControl} />
            <UnitControl className={s.unitControlButtons} />
          </div>
        </div>

        <Info className={s.info} />

        <GameMap className={s.map} gameId={this.state.gameId} />

        <OobInfo className={s.oobInfo} oobData={this.state.oobData} />
        <OobQuick className={s.oobQuick} />
        <mapModes className={s.mapModes} />
      </div>
    );
  }
}

export default withStyles(s)(Game);
