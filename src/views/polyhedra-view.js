// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import ImageSequence from 'react-native-image-sequence';

import FALLBACKS from '../../images/placeholders/placeholders.js';
import ROTATIONS from '../../images/rotations.js';

import { PlatonicSolids, ArchimedeanSolids } from '../components/polyhedron.js'


export class PolyhedraView extends Component {
  goToView(p) {
    this.props.navigator.push({name: 'Polyhedron', polyhedron: p});
  }

  renderProgressBar(progress) {
    if (progress >= 1) return;
    return (<View style={styles.progressbarWrap}>
      <View style={[styles.progressbar, {width: 58 * progress}]}/>
    </View>);
  }

  renderImage(p, progress) {
    if (progress < 1) return <Image source={FALLBACKS[p]} style={{width: 80, height: 80, opacity: 0.7}}/>;
    return <ImageSequence images={ROTATIONS[p]} style={{width: 80, height: 80}}/>;
  }

  renderGrid(polyhedra, height) {
    let result = [];
    for (let p of polyhedra) {
      let progress = p.progress(this.props.state.shapes);
      result.push(
        <TouchableHighlight style={[styles.tile, {height}]} key={p.key} onPress={() => { this.goToView(p) }}>
          <View style={{alignItems: 'center'}}>
            {this.renderImage(p.key, progress)}
            <Text style={styles.label}>{p.shortName}</Text>
            {this.renderProgressBar(progress)}
          </View>
        </TouchableHighlight>);
    }
    return result;
  }

  render() {
    return (<ScrollView contentContainerStyle={styles.view}>
      <Text style={[styles.title, {marginTop: 40}]}>Platonic Solids</Text>
      <View style={styles.grid}>{this.renderGrid(PlatonicSolids, 110)}</View>
      <Text style={styles.title}>Archimedean Solids</Text>
      <View style={styles.grid}>{this.renderGrid(ArchimedeanSolids, 135)}</View>
    </ScrollView>);
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
