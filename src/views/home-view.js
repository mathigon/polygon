// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { baseStyles } from '../styles';

const POLYGONS = require('../../data/polygons.json');
const POLYGON_IMAGES = require('../../images/polygons/polygons.js');
const LOGO = require('../../images/logo.png');

const ICONS = [require('../../images/icons/camera.png'),
  require('../../images/icons/exchange.png'),
  require('../../images/icons/puzzle.png')];


export class HomeView extends Component {

  render() {
    let polygons = [];
    for (let p of POLYGONS) {
      let top = p.key == 3 ? 34 : p.key == 5 ? 30 : 26;
      let count = this.props.state.getShapeCount(p.key);
      polygons.push(<View style={[baseStyles.tileWrap, {height: 110}]} key={p.key}>
        <Image source={POLYGON_IMAGES[p.key]}/>
        <Text style={baseStyles.tileLabel}>{p.name}s</Text>
        <Text style={[baseStyles.heading, styles.count, {top}]}>{count}</Text>
      </View>);
    }

    return (<View style={baseStyles.scrollView}>
      <Image style={styles.logo} source={LOGO}/>
      <View style={baseStyles.grid}>{polygons}</View>
      <Text style={baseStyles.title}>Collect more shapes:</Text>
      <View style={styles.addButtons}>
        <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigator.push({name: 'Camera'}) }}><Image source={ICONS[0]}/></TouchableOpacity>
        <TouchableOpacity style={styles.addButton}><Image source={ICONS[1]}/></TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigator.push({name: 'Powerup'}) }}><Image source={ICONS[2]}/></TouchableOpacity>
      </View>
    </View>);
  }
}


const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
    marginTop: 30,
    marginBottom: 30
  },
  addButtons: {
    flexDirection: 'row'
  },
  addButton: {
    width: 60,
    height: 60,
    margin: 10
  },
  count: {
    position: 'absolute',
    fontSize: 22,
    width: 100,
    opacity: 0.9,
    textAlign: 'center'
  }
});
