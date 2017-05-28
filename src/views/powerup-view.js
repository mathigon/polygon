// -----------------------------------------------------------------------------
// Polygon App - Powerup View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar';

import BACKGROUND from '../../images/background.jpg';
import POWERUPS from '../../data/powerups.js';
const POWERUP_IMAGES = require('../../images/powerups/powerups.js');


export class PowerupView extends Component {

  renderTile(p) {
    return <TouchableOpacity style={styles.tileTarget} key={p.key}
                             onPress={() => { this.props.modal.open(p) }}>
      <View style={styles.tile}>
        <Image style={styles.tileImage} source={POWERUP_IMAGES[p.key - 1]}/>
        <Text style={styles.tileLabel}>{p.name}</Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    let powerups = [];
    for (let p of POWERUPS) {
      powerups.push(this.renderTile(p));
    }

    return (
      <Image source={BACKGROUND} style={{flex: 1, width: null, height: null}} resizeMode="cover">
        <NavBar title="Power-ups" navigator={this.props.navigator}/>
        <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 36}}>
          <View style={styles.grid}>{powerups}</View>
        </ScrollView>
      </Image>)
  }
}


const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  tileTarget: {
    width: 110,
    height: 130,
  },
  tile: {
    width: 90,
    height: 110,
    margin: 10
  },
  tileImage: {
    width: 90,
    height: 90,
  },
  tileLabel: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir-Book'
  }
});
