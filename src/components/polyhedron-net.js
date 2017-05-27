// -----------------------------------------------------------------------------
// Polygon App - Polyhedron SVG Net Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const POLYGONS = require('../../data/polygons.json');


export class PolyhedronNet extends Component {
  render() {
    let polygon = this.props.p;

    let paths = [];
    for (let p of POLYGONS) {
      if (p.key in polygon.net) {
        let points = polygon.net[p.key];
        for (let i=0; i<points.length; ++i) {
          let collected = (i < this.props.shapes[p.key].length);
          let fill = collected ? p.color : '#00081D';
          paths.push(<Path key={p.key + '-' + i} d={points[i]} stroke="#fff" stroke-width="1" fill={fill}/>)
        }
      }
    }

    return <Svg height={polygon.netSize[1]} width={polygon.netSize[0]}>{paths}</Svg>;
  }
}
