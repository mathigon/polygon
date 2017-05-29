// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';

const MOMATH = require('../../images/momath.png');
const MATHIGON = require('../../images/mathigon.png');


export class AboutView extends Component {

  renderLink(name) {
    return <TouchableOpacity style={[baseStyles.rowWrap, {height: 45}]} key={name}>
      <View style={baseStyles.row}>
        <Text style={[baseStyles.text, {fontSize: 16}]}>{name}</Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    return (<View style={{flex: 1}}>
      <NavBar title="More"/>
      <View style={styles.view}>
        {this.renderLink('What are Polygons and Polyhedra?')}
        {this.renderLink('What are Platonic and Archimedean solids?')}
        {this.renderLink('Help and Support')}
        {this.renderLink('Credits')}
        <View style={styles.imageRow}>
          <Image source={MOMATH} style={styles.image}/>
          <Image source={MATHIGON} style={styles.image}/>
        </View>
      </View>
    </View>);
  }
}


const styles = StyleSheet.create({
  view: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  imageRow: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-around'
  },
  image: {
    width: 100,
    height: 100
  }
});
