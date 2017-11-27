// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, Linking, ListView, TouchableHighlight, ScrollView } from 'react-native';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';

const MOMATH = require('../../images/links/momath.png');
const MATHIGON = require('../../images/links/mathigon.png');
const IMAGINARY = require('../../images/links/imaginary.png');


function openLink(url) {
  Linking.openURL(url);
}

export class AboutView extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  renderLink(name) {
    return <View style={baseStyles.rowWrap}>
      <TouchableHighlight style={baseStyles.row} onPress={() => {}} underlayColor='rgba(255,255,255,0.2)'>
        <Text style={[baseStyles.text, {fontSize: 16}]}>{name}</Text>
      </TouchableHighlight>
    </View>;
  }

  render() {
    return (<View style={{flex: 1}}>
      <NavBar title="More"/>
      <ScrollView contentContainerStyle={baseStyles.view}>
        {this.renderLink('Polygons and Polyhedra')}
        {this.renderLink('Platonic and Archimedean solids')}
        {this.renderLink('Help and Support')}
        {this.renderLink('Credits')}
        <View style={styles.links}>
          <View style={styles.image} onPress={() => { Linking.openURL('https://momath.org') }} activeOpacity={0.5}>
            <Image source={MOMATH}/>
          </View>
          <View style={styles.image} onPress={() => { Linking.openURL('https://mathigon.org') }} activeOpacity={0.5}>
            <Image source={MATHIGON}/>
          </View>
          <View style={styles.image} onPress={() => { Linking.openURL('https://imaginary.org') }} activeOpacity={0.5}>
            <Image source={IMAGINARY}/>
          </View>
        </View>
      </ScrollView>
    </View>);
  }
}


const styles = StyleSheet.create({
  links: {
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    width: 220,
    height: 64,
    margin: 10
  }
});
