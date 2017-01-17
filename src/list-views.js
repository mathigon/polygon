// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const POLYGONS = require('../data/polygons.json');
const POLYGON_IMAGES = require('../images/polygons/polygons.js');
const LOGO = require('../images/logo.png');

import { PlatonicSolids, ArchimedeanSolids } from './polyhedron.js'
import { PolyhedronRotation } from './polyhedron-rotation.js'


// -----------------------------------------------------------------------------
// Polygon List View Class

export class PolygonListView extends Component {

  render() {
    let polygons = [];
    for (let p of POLYGONS) {
      let count = this.props.shapes[p.key].length;
      polygons.push(<View style={styles.tile} key={p.key}>
        <Image source={POLYGON_IMAGES[p.key]}/>
        <Text style={styles.label}>{p.name}s</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>
      </View>);
    }

    return (<View style={styles.view}>
      <Image style={styles.logo} source={LOGO}/>
      <View style={styles.grid}>{polygons}</View>
      <Text style={styles.title}>Collect more shapes:</Text>
      <View style={styles.addButtons}>
        <TouchableHighlight style={styles.addButton} onPress={() => { this.props.navigator.push({name: 'Camera'}) }}><View/></TouchableHighlight>
        <TouchableHighlight style={styles.addButton}><View/></TouchableHighlight>
        <TouchableHighlight style={styles.addButton} onPress={() => { this.props.addShape('s-3-' + Math.random()); }}><View/></TouchableHighlight>
      </View>
    </View>);
  }
}


// -----------------------------------------------------------------------------
// Polyhedron List View Class

export class PolyhedronListView extends Component {
  goToView(p) {
    this.props.navigator.push({name: 'PolyhedronDetail', polyhedron: p});
  }

  renderProgressBar(p) {
    let progress = p.progress(this.props.shapes);
    if (progress >= 1) return;
    return (<View style={styles.progressbarWrap}>
      <View style={[styles.progressbar, {width: 58 * progress}]}/>
    </View>);
  }

  renderGrid(polyhedra) {
    let result = [];
    for (let p of polyhedra) {
      result.push(
        <TouchableHighlight style={styles.tile} key={p.key} onPress={() => { this.goToView(p) }}>
          <View style={{alignItems: 'center'}}>
            <PolyhedronRotation p={p.key} style={{width: 80, height: 80}}/>
            <Text style={styles.label}>{p.name}</Text>
            {this.renderProgressBar(p)}
          </View>
        </TouchableHighlight>);
    }
    return result;
  }

  render() {
    return (<ScrollView contentContainerStyle={styles.view}>
      <Text style={styles.title}>Platonic Solids</Text>
      <View style={styles.grid}>{this.renderGrid(PlatonicSolids)}</View>
      <Text style={styles.title}>Archimedean Solids</Text>
      <View style={styles.grid}>{this.renderGrid(ArchimedeanSolids)}</View>
    </ScrollView>);
  }
}


// -----------------------------------------------------------------------------
// Styles

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
    color: '#fff'
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    margin: 8,
    width: 100,
    height: 120,
    alignItems: 'center'
  },
  label: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 13
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
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 30
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 23,
    height: 23,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#d00',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },

  progressbarWrap: {
    width: 60,
    height: 6,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 3,
    marginTop: 4
  },
  progressbar: {
    height: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  }

});
