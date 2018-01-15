// -----------------------------------------------------------------------------
// Polygon App - Polyhedron Detail View
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NavBar } from '../components/navbar';
import ImageSequence from 'react-native-image-sequence';
import { baseStyles } from '../styles';

import { PolyhedronNet } from '../components/polyhedron-net.js';

import BACKGROUND from '../../images/background.jpg';
import POLYGONS from '../../data/polygons.json';
import ROTATIONS from '../../images/rotations.js';
// import AR_IMAGE from '../../images/icons/view-in-ar.png';

// const supportsAR = false; //(Platform.OS === 'ios') && (+Platform.Version.split('.')[0] >= 11);


export class PolyhedronView extends Component {

  renderMoreText(polyhedron) {
    let progress = polyhedron.progress(this.props.screenProps.app.state);

    let missing = Math.round((1 - progress) * polyhedron.total);
    if (!missing) return null;

    let text = (missing === 1) ? 'just one more polygon' : missing + ' more polygons';

    return <View style={styles.missing}>
      <Text style={[baseStyles.text, {fontWeight: 'bold', fontSize: 16}]}>You need {text}!</Text>
    </View>;
  }

  renderDescription(polyhedron) {
    let faces = POLYGONS.filter(p => polyhedron.faces[p.key])
      .map(p => polyhedron.faces[p.key] + ' ' + p.name + 's')
      .join(', ').replace(/,([^,]*)$/, ' and$1');

    return <Text style={[baseStyles.text, styles.text]}>The {polyhedron.name} consists of {faces}. It has {polyhedron.total} faces, {polyhedron.total + polyhedron.vertices - 2} edges and {polyhedron.vertices} vertices.</Text>;
  }

  render() {
    const p = this.props.navigation.state.params.polyhedron;

    /* const ARButton = supportsAR ?
      <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigation.navigate('AR', {polyhedron: p}) }} activeOpacity={1}>
        <Image source={AR_IMAGE}/>
      </TouchableOpacity> : null; */

    return (
      <Image source={BACKGROUND} style={baseStyles.dynamicView} resizeMode="cover">
        <NavBar title={p.name} navigation={this.props.navigation}/>
        <ScrollView contentContainerStyle={[baseStyles.view, {alignItems: 'center'}]}>
          <ImageSequence images={ROTATIONS[p.key]} style={styles.rotation}/>
          <View style={styles.net}><PolyhedronNet p={p} app={this.props.screenProps.app}/></View>
          {this.renderMoreText(p)}
          {this.renderDescription(p)}
          <Text style={[baseStyles.text, styles.text]}>{p.description}</Text>
        </ScrollView>
      </Image>)
  }
}


const styles = StyleSheet.create({
  rotation: {
    width: 320,
    height: 320,
    margin: 20
  },
  net: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  },
  addButton: {
    width: 160,
    height: 48,
    opacity: 0.6,
    marginTop: 14
  },
  missing: {
    backgroundColor: '#c00',
    borderRadius: 3,
    marginLeft: 24,
    marginRight: 24,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 24
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 16
  },
});
