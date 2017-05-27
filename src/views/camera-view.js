// -----------------------------------------------------------------------------
// Polygon App - Shape Collection Views
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { TouchableOpacity, Vibration, Text, View, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';


export class CameraView extends Component {

  onBarCodeRead(result) {
    let _this = this;

    setTimeout(function() {
      Vibration.vibrate();
      _this.props.navigator.pop();
      _this.props.state.addShape(result.data);
    }, 1000);
  }

  render() {
    return (<View style={styles.camera}>

      <Camera onBarCodeRead={x => { this.onBarCodeRead(x); }} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
        <TouchableOpacity onPress={() => { this.props.navigator.pop(); }}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </Camera>

    </View>)
  }
}


const styles = StyleSheet.create({
  camera: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  }
});
