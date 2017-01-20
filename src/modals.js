// -----------------------------------------------------------------------------
// Polygon App - Tab Bar Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modalbox';

const POLYGON_IMAGES = require('../images/polygons/polygons.js');


export class PolygonModal extends Component {

  open() {
    this.refs.me.open();
  }

  render() {
    return (
      <Modal style={styles.modal} position={'center'} ref={'me'}>
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>You've added a new {this.props.polygon.name} to your library!</Text>
          <Image source={POLYGON_IMAGES[this.props.polygon.key]} style={{height: 80, width: 80}}/>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: {
    height: 240,
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
    textAlign: 'center',
    fontFamily: 'Avenir-Book'
  }
});
