// -----------------------------------------------------------------------------
// Polygon App - Polyhedron Detail View
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, TouchableHighlight, Text, View, Image, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

import { PolyhedronRotation } from './polyhedron-rotation.js';
import { PolyhedronNet } from './polyhedron-net.js';
const BACKGROUND = require('../images/background.jpg');


export class PolyhedronView extends Component {
  render() {
    let p = this.props.polyhedron;

    let backButton = {
      title: 'Back',
      handler: () => { this.props.navigator.pop(); }
    };

    return (
      <Image source={BACKGROUND} style={{flex: 1, width: null, height: null}} resizeMode="cover">
        <NavigationBar title={{title: p.name, style: {color: '#fff'}}} leftButton={backButton} statusBar={{style: 'light-content'}} tintColor='#1F2E3E'/>
        <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          <PolyhedronRotation p={p.key} style={{width: 320, height: 320, margin: 20}}/>
          <PolyhedronNet p={p} shapes={this.props.shapes}/>
        </ScrollView>
      </Image>)
  }
}


const styles = StyleSheet.create({
  view: {
    backgroundColor: '#00a',
    flex: 1,
  },
  tile: {
    margin: 10,
    width: 100,
    height: 100,
    alignItems: 'center'
  }
});
