// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { baseStyles } from '../styles';

const POLYGONS = require('../../data/polygons.json');
const POLYGON_IMAGES = require('../../images/polygons/polygons.js');
const LOGO = require('../../images/logo.png');

const ADD_CAMERA = require('../../images/icons/add-camera.png');
const ADD_POWERUP = require('../../images/icons/add-powerup.png');


export class HomeView extends Component {

  render() {
    let polygons = [];
    for (let p of POLYGONS) {
      let top = p.key === 3 ? 34 : p.key === 5 ? 30 : 26;
      let count = this.props.state.getShapeCount(p.key);
      polygons.push(<View style={[baseStyles.tileWrap, {height: 110}]} key={p.key}>
        <Image source={POLYGON_IMAGES[p.key]}/>
        <Text style={baseStyles.tileLabel}>{p.name}s</Text>
        <Text style={[baseStyles.heading, styles.count, {top}]}>{count}</Text>
      </View>);
    }

    return (<ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 80}}>
      <Image style={styles.logo} source={LOGO}/>
      <View style={baseStyles.grid}>{polygons}</View>
      <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigation.navigate('Camera') }} activeOpacity={1}>
        <Image source={ADD_CAMERA}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigation.navigate('Powerup') }} activeOpacity={1}>
        <Image source={ADD_POWERUP}/>
      </TouchableOpacity>
    </ScrollView>);
  }
}


const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
    marginTop: 30,
    marginBottom: 30
  },
  addButton: {
    width: 220,
    height: 48,
    margin: 10,
    opacity: 0.6
  },
  count: {
    position: 'absolute',
    fontSize: 22,
    width: 100,
    opacity: 0.9,
    textAlign: 'center'
  }
});
