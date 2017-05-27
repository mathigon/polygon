// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, TouchableHighlight, Text, View, StyleSheet } from 'react-native';

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
      let count = this.props.state.shapes[p.key].length;
      polygons.push(<View style={styles.tile} key={p.key}>
        <Image source={POLYGON_IMAGES[p.key]}/>
        <Text style={styles.label}>{p.name}s</Text>
        <View style={[styles.badge, {top}]}><Text style={styles.badgeText}>{count}</Text></View>
      </View>);
    }

    return (<View style={styles.view}>
      <Image style={styles.logo} source={LOGO}/>
      <View style={styles.grid}>{polygons}</View>
      <Text style={styles.title}>Collect more shapes:</Text>
      <View style={styles.addButtons}>
        <TouchableHighlight style={styles.addButton} onPress={() => { this.props.navigator.push({name: 'Camera'}) }}><Image source={ICONS[0]}/></TouchableHighlight>
        <TouchableHighlight style={styles.addButton}><Image source={ICONS[1]}/></TouchableHighlight>
        <TouchableHighlight style={styles.addButton} onPress={() => { this.props.state.addShape('s-3-' + Math.random()); }}><Image source={ICONS[2]}/></TouchableHighlight>
      </View>
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
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    margin: 8,
    width: 100,
    height: 110,
    alignItems: 'center'
  },
  label: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir-Book'
  },

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

  badge: {
    position: 'absolute',
    left: 32,
    width: 36,
    alignItems: 'center'
  },
  badgeText: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 22,
    opacity: 0.9,
    fontFamily: 'Avenir-Book'
  },

});
