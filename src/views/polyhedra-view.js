// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar';
import ImageSequence from 'react-native-image-sequence';
import { baseStyles } from '../styles';

import FALLBACKS from '../../images/placeholders/placeholders.js';
import ROTATIONS from '../../images/rotations.js';

import { PlatonicSolids, ArchimedeanSolids } from '../components/polyhedron.js'


export class PolyhedraView extends Component {
  goToView(p) {
    this.props.navigation.navigate('Polyhedron', {polyhedron: p});
  }

  renderProgressBar(progress) {
    if (progress >= 1) return;
    return (<View style={styles.progressbarWrap}>
      <View style={[styles.progressbar, {width: 58 * progress}]}/>
    </View>);
  }

  renderImage(p, progress) {
    if (progress < 1) return <Image source={FALLBACKS[p]} style={[styles.image, {opacity: 0.7}]}/>;
    return <ImageSequence images={ROTATIONS[p]} style={styles.image}/>;
  }

  renderGrid(polyhedra, height) {
    let result = [];
    for (let p of polyhedra) {
      let progress = p.progress(this.props.state);
      result.push(
        <TouchableOpacity style={[baseStyles.tileWrap, {height}]} key={p.key} onPress={() => { this.goToView(p) }} activeOpacity={0.5}>
          <View style={baseStyles.tile}>
            {this.renderImage(p.key, progress)}
            <Text style={baseStyles.tileLabel}>{p.shortName}</Text>
            {this.renderProgressBar(progress)}
          </View>
        </TouchableOpacity>);
    }
    return result;
  }

  render() {
    return (<View style={{flex: 1}}>
      <NavBar title="Polyhedra"/>
      <ScrollView contentContainerStyle={baseStyles.view}>
        <Text style={baseStyles.title}>Platonic Solids</Text>
        <View style={baseStyles.grid}>{this.renderGrid(PlatonicSolids, 115)}</View>
        <Text style={baseStyles.title}>Archimedean Solids</Text>
        <View style={baseStyles.grid}>{this.renderGrid(ArchimedeanSolids, 130)}</View>
      </ScrollView>
    </View>);
  }
}


const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
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
