// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';
import { badges } from '../objects';

import BADGE_IMAGES from '../../images/badges/badges.js';
import BADGE_INACTIVE_IMAGES from '../../images/badges-bw/badges.js';


export class BadgesView extends Component {

  renderBadge(b, active) {
    const TouchComponent = active ? TouchableHighlight : View;
    const images = active ? BADGE_IMAGES : BADGE_INACTIVE_IMAGES;
    const opacity = active ? 1 : 0.8;

    return <View style={[baseStyles.rowWrap, {height: 91}]} key={b.key}>
      <TouchComponent style={baseStyles.row}
                      onPress={() => { this.props.app.refs.badgeModal.queue(b) }}
                      underlayColor='rgba(255,255,255,0.2)'>
        <View style={styles.badgeRow}>
          <Image source={images[b.key]} style={[styles.badgeIcon, {opacity}]}/>
          <View style={styles.badgeText}>
            <Text style={baseStyles.heading}>{b.name}</Text>
            <Text style={baseStyles.text}>{b.description}</Text>
          </View>
        </View>
      </TouchComponent>
    </View>;
  }

  render() {
    let myBadges = this.props.app.state.badges;
    let rows = badges.map(b => this.renderBadge(b, myBadges.includes(b.key)));

    return (<View style={{flex: 1}}>
      <NavBar title="Badges"/>
      <ScrollView contentContainerStyle={baseStyles.view}>{rows}</ScrollView>
    </View>);
  }
}


const styles = StyleSheet.create({
  badgeIcon: {
    width: 60,
    height: 70,
    marginRight: 20
  },
  badgeRow: {
    flex: 1,
    flexDirection: 'row'
  },
  badgeText: {
    flexGrow: 1,
    flexShrink: 1
  }
});
