// -----------------------------------------------------------------------------
// Polygon App - Powerup View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';

import BACKGROUND from '../../images/background.jpg';
import POWERUPS from '../../data/powerups.js';
const POWERUP_IMAGES = require('../../images/powerups/powerups.js');


export class PowerupView extends Component {

  renderTile(p) {
    return <TouchableOpacity style={baseStyles.tileWrap} key={p.key}
                             onPress={() => { this.props.modal.open(p) }}>
      <View style={[baseStyles.tile, {height: 130}]}>
        <Image style={styles.image} source={POWERUP_IMAGES[p.key - 1]}/>
        <Text style={baseStyles.tileLabel}>{p.name}</Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    let powerups = [];
    for (let p of POWERUPS) {
      powerups.push(this.renderTile(p));
    }

    return (
      <Image source={BACKGROUND} style={baseStyles.dynamicView} resizeMode="cover">
        <NavBar title="Power-ups" navigator={this.props.navigator}/>
        <ScrollView contentContainerStyle={baseStyles.scrollView}>
          <View style={[baseStyles.view, baseStyles.grid]}>{powerups}</View>
        </ScrollView>
      </Image>)
  }
}


const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
  }
});
