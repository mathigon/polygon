// -----------------------------------------------------------------------------
// Polygon App - Tab Bar Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Modal from 'react-native-modalbox';


export class PolygonModal extends Component {

  render() {
    return (
      <Modal style={styles.modal} position={'center'}>
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>You've added a new {this.props.polygon.name} to your library!</Text>
          <Svg height="60" width="60"><Polygon points={this.props.polygon.points} fill={this.props.polygon.color}/></Svg>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: {
    height: 200,
    backgroundColor: 'transparent'
  },
  modalBody: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#eee",
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 10
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
});
