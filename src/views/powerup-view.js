// -----------------------------------------------------------------------------
// Polygon - Powerup View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';
import { powerups } from '../objects';

import BACKGROUND from '../../images/background.jpg';
const POWERUP_IMAGES = require('../../images/powerups/powerups.js');
const POWERUP_IMAGES_BW = require('../../images/powerups-bw/powerups.js');
const POWERUP_LOCK =   require('../../images/powerups/powerup-lock.png');


export class PowerupView extends Component {

  renderTile(p, i) {
    const app = this.props.screenProps.app;
    const solved = app.state.powerups.length;

    const Wrap = (i > solved) ? View : TouchableOpacity;
    const image = (i < solved) ? POWERUP_IMAGES[p.key - 1] :
      (i === solved) ? POWERUP_IMAGES_BW[p.key - 1] : POWERUP_LOCK;

    return (
      <Wrap style={styles.tile} key={p.key} activeOpacity={0.5}
            onPress={() => { app.refs.powerupModal.queue(p) }}>
        <Image source={image}/>
      </Wrap>);
  }

  render() {
    let rows = powerups.map((p, i) => this.renderTile(p, i));

    return (
      <Image source={BACKGROUND} style={baseStyles.dynamicView} resizeMode="cover">
        <NavBar title="Powerups" navigation={this.props.navigation}/>
        <ScrollView contentContainerStyle={[baseStyles.view, baseStyles.grid]}>{rows}</ScrollView>
      </Image>)
  }
}


const styles = StyleSheet.create({
  tile: {
    width: 90,
    height: 90,
    margin: 10
  }
});
