import React from 'react';
import * as THREE from 'three';

class Resources extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    this.textureRepeat = new THREE.Vector2(0.008, 0.008);

    const x = 0;
    const y = 0;

    let californiaPts = [];

    californiaPts.push(new THREE.Vector2(610, 320));
    californiaPts.push(new THREE.Vector2(450, 300));
    californiaPts.push(new THREE.Vector2(392, 392));
    californiaPts.push(new THREE.Vector2(266, 438));
    californiaPts.push(new THREE.Vector2(190, 570));
    californiaPts.push(new THREE.Vector2(190, 600));
    californiaPts.push(new THREE.Vector2(160, 620));
    californiaPts.push(new THREE.Vector2(160, 650));
    californiaPts.push(new THREE.Vector2(180, 640));
    californiaPts.push(new THREE.Vector2(165, 680));
    californiaPts.push(new THREE.Vector2(150, 670));
    californiaPts.push(new THREE.Vector2(90, 737));
    californiaPts.push(new THREE.Vector2(80, 795));
    californiaPts.push(new THREE.Vector2(50, 835));
    californiaPts.push(new THREE.Vector2(64, 870));
    californiaPts.push(new THREE.Vector2(60, 945));
    californiaPts.push(new THREE.Vector2(300, 945));
    californiaPts.push(new THREE.Vector2(300, 743));
    californiaPts.push(new THREE.Vector2(600, 473));
    californiaPts.push(new THREE.Vector2(626, 425));
    californiaPts.push(new THREE.Vector2(600, 370));
    californiaPts.push(new THREE.Vector2(610, 320));

    for (let i = 0; i < californiaPts.length; i += 1) californiaPts[i].multiplyScalar(0.25);

    this.californiaPts = californiaPts;


    californiaPts = [];

    californiaPts.push(new THREE.Vector2(610, 320));
    californiaPts.push(new THREE.Vector2(450, 300));
    californiaPts.push(new THREE.Vector2(392, 392));
    californiaPts.push(new THREE.Vector2(266, 438));
    californiaPts.push(new THREE.Vector2(190, 570));
    californiaPts.push(new THREE.Vector2(190, 600));
    californiaPts.push(new THREE.Vector2(160, 620));
    californiaPts.push(new THREE.Vector2(160, 650));
    californiaPts.push(new THREE.Vector2(180, 640));
    californiaPts.push(new THREE.Vector2(165, 680));
    californiaPts.push(new THREE.Vector2(150, 670));
    californiaPts.push(new THREE.Vector2(90, 750));
    californiaPts.push(new THREE.Vector2(80, 750));
    californiaPts.push(new THREE.Vector2(50, 835));
    californiaPts.push(new THREE.Vector2(64, 870));
    californiaPts.push(new THREE.Vector2(60, 945));
    californiaPts.push(new THREE.Vector2(300, 945));
    californiaPts.push(new THREE.Vector2(300, 743));
    californiaPts.push(new THREE.Vector2(600, 473));
    californiaPts.push(new THREE.Vector2(626, 425));
    californiaPts.push(new THREE.Vector2(600, 370));
    californiaPts.push(new THREE.Vector2(610, 320));

    for (let i = 0; i < californiaPts.length; i += 1) californiaPts[i].multiplyScalar(0.25);

    this.californiaPts2 = californiaPts;

    return (
      <resources>
        <meshBasicMaterial
          resourceId="hoverMaterial"
          color={0xff0000}
          side={THREE.DoubleSide}
        />
        <meshPhongMaterial
          resourceId="phongMaterial"
          side={THREE.DoubleSide}
        >
          <textureResource
            resourceId="texture"
          />
        </meshPhongMaterial>
        <shape
          resourceId="california"
          points={this.californiaPts}
        />
        <shape
          resourceId="california2"
          points={this.californiaPts2}
        />
        <shape resourceId="triangle">
          <moveTo
            x={80}
            y={20}
          />
          <lineTo
            x={40}
            y={80}
          />
          <lineTo
            x={120}
            y={80}
          />
          <lineTo
            x={80}
            y={20}
          />
        </shape>
        <shape resourceId="heart">
          <moveTo
            x={x + 25}
            y={y + 25}
          />
          <bezierCurveTo
            cp1X={x + 25}
            cp1Y={y + 25}
            cp2X={x + 20}
            cp2Y={y}
            aX={x}
            aY={y}
          />
          <bezierCurveTo
            cp1X={x - 30}
            cp1Y={y}
            cp2X={x - 30}
            cp2Y={y + 35}
            aX={x - 30}
            aY={y + 35}
          />
          <bezierCurveTo
            cp1X={x - 30}
            cp1Y={y + 55}
            cp2X={x - 10}
            cp2Y={y + 77}
            aX={x + 25}
            aY={y + 95}
          />
          <bezierCurveTo
            cp1X={x + 60}
            cp1Y={y + 77}
            cp2X={x + 80}
            cp2Y={y + 55}
            aX={x + 80}
            aY={y + 35}
          />
          <bezierCurveTo
            cp1X={x + 80}
            cp1Y={y + 35}
            cp2X={x + 80}
            cp2Y={y}
            aX={x + 50}
            aY={y}
          />
          <bezierCurveTo
            cp1X={x + 35}
            cp1Y={y}
            cp2X={x + 25}
            cp2Y={y + 25}
            aX={x + 25}
            aY={y + 25}
          />
        </shape>
      </resources>);
  }
}

export default Resources;
