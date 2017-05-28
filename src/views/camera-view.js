// -----------------------------------------------------------------------------
// Polygon App - Shape Collection Views
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Vibration, View, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar'
import Camera from 'react-native-camera';


export class CameraView extends Component {

  onBarCodeRead(result) {
    setTimeout(() => {
      Vibration.vibrate();
      this.props.navigator.pop();
      this.props.state.addShape(result.data);
    }, 1000);
  }

  render() {
    return (<View style={styles.view}>
      <NavBar title="Camera" navigator={this.props.navigator}/>
      <Camera onBarCodeRead={x => { this.onBarCodeRead(x); }} style={styles.camera}>
        <View style={styles.rectangle}/>
      </Camera>
    </View>)
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: null,
    width: null
  },
  camera: {
    alignItems: 'center',
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center'
  },
  rectangle: {
    backgroundColor: 'transparent',
    borderColor: '#00FF00',
    borderWidth: 2,
    height: 250,
    width: 250
  }
});
