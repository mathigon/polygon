// -----------------------------------------------------------------------------
// Polygon App - Polyhedron Detail View
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Button, Platform } from 'react-native';
import { NavBar } from '../components/navbar';
import ImageSequence from 'react-native-image-sequence';
import { baseStyles } from '../styles';

import { PolyhedronNet } from '../components/polyhedron-net.js';

import BACKGROUND from '../../images/background.jpg';
import POLYGONS from '../../data/polygons.json';
import ROTATIONS from '../../images/rotations.js';

const supportsAR = (Platform.OS === 'ios');


export class PolyhedronView extends Component {

  renderMoreText(polyhedron) {
    let progress = polyhedron.progress(this.props.screenProps.state);

    let missing = Math.round((1 - progress) * polyhedron.total);
    if (!missing) return null;

    let text = (missing === 1) ? 'just one more polygon' : missing + ' more polygons';

    return <View style={styles.missing}>
      <Text style={[baseStyles.text, {fontWeight: 'bold'}]}>You need {text}!</Text>
    </View>;
  }

  renderDescription(polyhedron) {
    let faces = POLYGONS.filter(p => p.key in polyhedron.faces).map(p => {
      return polyhedron.faces[p.key] + ' ' + p.name + 's';
    }).join(', ').replace(/,([^,]*)$/, ' and$1');

    return <Text style={[baseStyles.text, styles.text]}>The {polyhedron.name} consists of {faces}. It has {polyhedron.total} faces, {polyhedron.total + polyhedron.vertices - 2} edges and {polyhedron.vertices} vertices.</Text>;
  }

  render() {
    const p = this.props.navigation.state.params.polyhedron;
    const state = this.props.screenProps.state;

    const ARButton = supportsAR ?
      <Button onPress={() => { this.props.navigation.navigate('AR', {polyhedron: p}); }} title="View in AR"/> : null;

    return (
      <Image source={BACKGROUND} style={baseStyles.dynamicView} resizeMode="cover">
        <NavBar title={p.name} navigation={this.props.navigation}/>
        <ScrollView contentContainerStyle={[baseStyles.view, {alignItems: 'center'}]}>
          <ImageSequence images={ROTATIONS[p.key]} style={styles.rotation}/>
          <View style={styles.net}><PolyhedronNet p={p} state={state}/></View>
          <View style={{margin: 24}}>{ARButton}</View>
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
    marginRight: 24
  },
  missing: {
    flex: 1,
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
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12
  },
});
