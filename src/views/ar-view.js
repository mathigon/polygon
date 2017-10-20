import React, { Component } from 'react';
import { View } from 'react-native';
import { ARKit } from 'react-native-arkit';

import { NavBar } from '../components/navbar'
import { baseStyles } from '../styles';


export class ARView extends Component {
  render() {
    const p = this.props.navigation.state.params.polyhedron;
    const file = `Polyhedra.scnassets/${p.key}.scn`;

    return (<View style={baseStyles.dynamicView}>
      <NavBar title="Polygon" navigation={this.props.navigation}/>
      <ARKit style={{ flex: 1 }} debug planeDetection lightEstimation>
        <ARKit.Model position={{ x: 0, y: 0, z: -2, frame: 'local' }}
                     model={{file, scale: 1 }}/>
      </ARKit>
    </View>)
  }
}
