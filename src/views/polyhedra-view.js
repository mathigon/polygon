// -----------------------------------------------------------------------------
// Polygon - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import ImageSequence from 'react-native-image-sequence';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';
import { platonicSolids, archimedeanSolids } from '../objects'

import FALLBACKS from '../../images/placeholders/placeholders';
import ROTATIONS from '../../images/rotations';


function renderProgressBar(progress) {
  if (progress >= 1) return;
  return (<View style={styles.progressbarWrap}>
    <View style={[styles.progressbar, {width: 58 * progress}]}/>
  </View>);
}

function renderImage(p, progress) {
  if (progress < 1) return <Image source={FALLBACKS[p]} style={[styles.image, {opacity: 0.7}]}/>;
  if (Platform.OS === 'android') return <Image source={ROTATIONS[p][0]} style={styles.image}/>;
  return <ImageSequence images={ROTATIONS[p]} style={styles.image}/>;
}


export class PolyhedraView extends Component {

  goToView(p) {
    this.props.navigation.navigate('Polyhedron', {polyhedron: p});
  }

  renderGrid(polyhedra, height) {
    let rows = [];
    for (let p of polyhedra) {
      let progress = p.progress(this.props.app.state);
      rows.push(
        <TouchableOpacity style={[baseStyles.tileWrap, {height}]} key={p.key} onPress={() => this.goToView(p)} activeOpacity={0.5}>
          <View style={baseStyles.tile}>
            {renderImage(p.key, progress)}
            <Text style={baseStyles.tileLabel}>{p.shortName}</Text>
            {renderProgressBar(progress)}
          </View>
        </TouchableOpacity>);
    }
    return rows;
  }

  render() {
    return (<View style={{flex: 1}}>
      <NavBar title="Polyhedra"/>
      <ScrollView contentContainerStyle={baseStyles.view}>
        <Text style={baseStyles.title}>Platonic Solids</Text>
        <View style={baseStyles.grid}>{this.renderGrid(platonicSolids, 115)}</View>
        <Text style={baseStyles.title}>Archimedean Solids</Text>
        <View style={baseStyles.grid}>{this.renderGrid(archimedeanSolids, 130)}</View>
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
