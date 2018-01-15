// -----------------------------------------------------------------------------
// Polygon App - Shape Collection Views
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Vibration, View, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';
import { NavBar } from '../components/navbar'
import { baseStyles } from '../styles';

let BLOCKED = false;


export class CameraView extends Component {

  onBarCodeRead(result) {
    if (BLOCKED) return;
    BLOCKED = true;

    Vibration.vibrate();
    this.props.navigation.goBack();
    this.props.app.addShape(result.data);

    // Hacky way to avoid onBarCodeRead triggering multiple times.
    setTimeout(() => { BLOCKED = false; }, 5000);
  }

  // barCodeTypes={['aztec']}
  render() {
    return (<View style={baseStyles.dynamicView}>
      <NavBar title="Camera" navigation={this.props.navigation}/>
      <Camera onBarCodeRead={x => this.onBarCodeRead(x)} style={styles.camera}>
        <View style={styles.rectangle}/>
      </Camera>
    </View>)
  }
}

const styles = StyleSheet.create({
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
