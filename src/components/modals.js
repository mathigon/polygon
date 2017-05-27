// -----------------------------------------------------------------------------
// Polygon App - Tab Bar Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modalbox';

const POLYGON_IMAGES = require('../../images/polygons/polygons.js');


class AbstractModal extends Component {
  open(data) {
    this.data = data;
    this.refs.me.open();
  }
  render() {
    return (<Modal style={styles.modal} position={'center'} ref={'me'}>
      <View style={styles.modalBody}>{this.renderBody()}</View>
    </Modal>);
  }
}


export class PolygonModal extends AbstractModal {
  renderBody() {
    if (!this.data) return null;
    return (<View>
      <Image source={POLYGON_IMAGES[this.data.key]} style={{height: 80, width: 80}}/>
      <Text style={styles.modalText}>You’ve added a new {this.data.name} to your library!</Text>
    </View>);
  }
}

export class PolyhedronModal extends AbstractModal {
  renderBody() {
    if (!this.data) return null;
    return (<View>
      <Text>TODO Image!</Text>
      <Text style={styles.modalText}>You've completed the {this.data.name}!</Text>
    </View>);
  }
}

export class BadgeModal extends AbstractModal {
  renderBody() {
    if (!this.data) return null;
    return (<View>
      <Text>TODO Image!</Text>
      <Text style={styles.modalText}>You've completed the {this.data.name}!</Text>
    </View>);
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
