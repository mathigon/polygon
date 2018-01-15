// -----------------------------------------------------------------------------
// Polygon - SVG Polyhedron Net Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import { polygons } from '../objects';


export class PolyhedronNet extends Component {
  render() {
    let polygon = this.props.p;
    let state = this.props.app.state;
    let paths = [];

    for (let p of polygons) {
      let points = polygon.net[p.key];
      if (!points) continue;

      let collected = p.getCount(state);
      for (let i=0; i<points.length; ++i) {
        let fill = (i < collected) ? p.color : '#00081D';
        paths.push(<Path key={p.key + '-' + i} d={points[i]} stroke="#fff" stroke-width="1" fill={fill}/>)
      }
    }

    return <Svg width={polygon.netSize[0]} height={polygon.netSize[1]}>{paths}</Svg>;
  }
}
