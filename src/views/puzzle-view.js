// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableHighlight, Text, View, StyleSheet } from 'react-native';


export class PuzzleView extends Component {

  render() {
    return (<View style={styles.view}>
      <Text style={styles.title}>Share</Text>
    </View>);
  }
}


const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir-Book'
  }
});
