// -----------------------------------------------------------------------------
// Polygon App - Polyhedron Rotation Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image } from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import IMAGES from '../images/rotations.js';


export class PolyhedronRotation extends Component {

  constructor(props) {
    super();
    this.images = IMAGES[props.p] || [];
    this.state = {index: 0};
  }

  componentDidMount() {
    this.setInterval(() => {
      let index = this.state.index + 1;
      if (index >= this.images.length) index = 0;
      this.setState({index})
    }, 33);  // ~30 frames per second
  }

  render() {
    return <Image {...this.props} source={this.images[this.state.index]}/>;
  }
}

reactMixin(PolyhedronRotation.prototype, TimerMixin);
