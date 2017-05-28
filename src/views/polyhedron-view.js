// -----------------------------------------------------------------------------
// Polygon App - Polyhedron Detail View
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar';
import ImageSequence from 'react-native-image-sequence';

import { PolyhedronNet } from '../components/polyhedron-net.js';

import BACKGROUND from '../../images/background.jpg';
import POLYGONS from '../../data/polygons.json';
import ROTATIONS from '../../images/rotations.js';


export class PolyhedronView extends Component {

  renderMoreText(polyhedron) {
    let progress = polyhedron.progress(this.props.state);
    let missing = Math.round((1 - progress) * polyhedron.total);
    if (missing == 1) return <Text style={styles.text}>You need just one more shape!</Text>;
    if (missing > 1) return <Text style={styles.text}>You need {missing} more shapes!</Text>;
  }

  renderDescription(polyhedron) {
    let faces = POLYGONS.filter(p => p.key in polyhedron.faces).map(p => {
      return polyhedron.faces[p.key] + ' ' + p.name + 's';
    }).join(', ').replace(/,([^,]*)$/, ' and$1');

    return <Text style={styles.text}>The {polyhedron.name} consists of {faces}. It has {polyhedron.total} faces, {polyhedron.total + polyhedron.vertices - 2} edges and {polyhedron.vertices} vertices.</Text>;
  }

  render() {
    let p = this.props.polyhedron;

    return (
      <Image source={BACKGROUND} style={{flex: 1, width: null, height: null}} resizeMode="cover">
        <NavBar title={p.name} navigator={this.props.navigator}/>
        <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 36}}>
          <ImageSequence images={ROTATIONS[p.key]} style={{width: 320, height: 320, margin: 20}}/>
          <PolyhedronNet p={p} state={this.props.state}/>
          {this.renderMoreText(p)}
          {this.renderDescription(p)}
          <Text style={styles.text}>{p.description}</Text>
        </ScrollView>
      </Image>)
  }
}


const styles = StyleSheet.create({
  text: {
    color: '#fff',
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book'
  }
});
